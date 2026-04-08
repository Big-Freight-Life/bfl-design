/**
 * Raybot chat API — hardened lead-capture endpoint backed by Gemini 2.0 Flash.
 *
 * Security layers (in order, from outside in):
 *  1. Origin header check        — drops requests not coming from our domains
 *  2. Burst rate limit            — 20 requests/min per IP (Upstash)
 *  3. Daily request budget        — global kill switch via Upstash counter
 *  4. Body parse + shape validate — reject malformed payloads
 *  5. Input sanitization          — Unicode normalize, strip control/zero-width
 *  6. Conversation length cap     — hard limit on history turns
 *  7. Model call w/ tool use loop — Gemini handles capture_lead via function call
 *  8. Tool argument re-validation — every field re-checked server-side
 *  9. Disposable email block      — rejects burner emails
 * 10. Per-IP daily lead capture cap — max 3 captures/day per IP
 * 11. Generic error responses    — never leak provider error messages
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  GoogleGenAI,
  Type,
  type FunctionDeclaration,
  type Content,
  type FunctionCall,
} from '@google/genai';
import { Resend } from 'resend';
import { chatRateLimit, getClientIp } from '@/lib/rateLimit';
import { isAllowedOrigin } from '@/lib/chat/origin';
import { sanitizeUserText, sanitizeToolStringInput } from '@/lib/chat/sanitize';
import { validateLead } from '@/lib/chat/validation';
import { leadCaptureLimit, checkAndIncrementDailyBudget } from '@/lib/chat/limits';
import { buildRaybotSystemPrompt, PROMPT_VERSION } from '@/lib/chat/prompts';
import { MAX_MESSAGE_LENGTH } from '@/models/chat';

const MODEL = 'gemini-2.0-flash';
const MAX_OUTPUT_TOKENS = 1024;
const MAX_HISTORY_TURNS = 30;

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const captureLeadFunction: FunctionDeclaration = {
  name: 'capture_lead',
  description:
    'Capture a qualified lead. Call this ONLY after the visitor has shared their real name and email AND you have enough context to summarize what they are working on. NEVER call this with placeholder, test, or fabricated values. Call this AT MOST ONCE per conversation.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The visitor's real name as they provided it.",
      },
      email: {
        type: Type.STRING,
        description: "The visitor's real email address.",
      },
      summary: {
        type: Type.STRING,
        description:
          "A 1-3 sentence factual summary of what the visitor is working on, their problem, and what they want from Ray. Written in third person, no marketing language.",
      },
    },
    required: ['name', 'email', 'summary'],
  },
};

function generic(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

async function sendLeadEmail(
  name: string,
  email: string,
  summary: string,
): Promise<{ success: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_EMAIL;
  if (!apiKey || !toAddress) return { success: false };

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'BFL Chatbot <noreply@bfl.design>',
      to: [toAddress],
      subject: `New Raybot lead: ${name}`,
      text: `A new lead came in through Raybot.\n\nName: ${name}\nEmail: ${email}\n\nContext:\n${summary}\n\n— Raybot ${PROMPT_VERSION}`,
    });

    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhook) {
      await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `:robot_face: *Raybot lead* — ${name} <${email}>\n> ${summary}`,
        }),
      });
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function POST(req: NextRequest) {
  // ── 1. Origin check ────────────────────────────────────────────────────
  if (!isAllowedOrigin(req)) {
    return generic('Forbidden', 403);
  }

  // ── 2. Burst rate limit (per IP) ───────────────────────────────────────
  const ip = getClientIp(req);
  if (chatRateLimit) {
    const { success } = await chatRateLimit.limit(ip);
    if (!success) {
      return generic('Too many messages. Please slow down a bit.', 429);
    }
  }

  // ── 3. Daily budget kill switch ────────────────────────────────────────
  const budget = await checkAndIncrementDailyBudget();
  if (!budget.ok) {
    return generic(
      'Raybot is taking a quick break — please use the contact form instead.',
      503,
    );
  }

  // ── Provider key check ─────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generic('Chat is not configured.', 503);
  }

  // ── 4. Body parse + shape validation ───────────────────────────────────
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return generic('Invalid request body', 400);
  }

  const rawMessages = body.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return generic('messages array is required', 400);
  }
  if (rawMessages.length > MAX_HISTORY_TURNS) {
    return generic('Conversation too long', 400);
  }

  // ── 5 & 6. Sanitize each message and enforce shape/order ───────────────
  const sanitized: IncomingMessage[] = [];
  for (const m of rawMessages) {
    if (
      typeof m !== 'object' ||
      m === null ||
      (m.role !== 'user' && m.role !== 'assistant')
    ) {
      return generic('Invalid message shape', 400);
    }
    const { text } = sanitizeUserText(m.content, MAX_MESSAGE_LENGTH);
    if (text.length === 0) continue;
    sanitized.push({ role: m.role, content: text });
  }

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
    return generic('Last message must be from user', 400);
  }

  // ── 7. Build Gemini contents and call the model ────────────────────────
  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = buildRaybotSystemPrompt();

  // Convert internal {role: 'assistant'} → Gemini {role: 'model'}
  const contents: Content[] = sanitized.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  let leadCaptured = false;

  try {
    let response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.7,
        tools: [{ functionDeclarations: [captureLeadFunction] }],
      },
    });

    // ── 7a. Tool-use loop (single iteration is enough for capture_lead) ──
    let toolIterations = 0;
    const MAX_TOOL_ITERATIONS = 2;

    while (
      response.functionCalls &&
      response.functionCalls.length > 0 &&
      toolIterations < MAX_TOOL_ITERATIONS
    ) {
      toolIterations++;

      const calls: FunctionCall[] = response.functionCalls;

      // Append model's function call turn to conversation
      const modelContent: Content = {
        role: 'model',
        parts: response.candidates?.[0]?.content?.parts ?? [],
      };
      contents.push(modelContent);

      // Build function response parts
      const responseParts: Array<{
        functionResponse: { name: string; response: Record<string, unknown> };
      }> = [];

      for (const call of calls) {
        if (call.name !== 'capture_lead') {
          responseParts.push({
            functionResponse: {
              name: call.name ?? 'unknown',
              response: { error: 'Unknown function' },
            },
          });
          continue;
        }

        // ── 8. Re-validate every tool argument server-side ──────────────
        const args = (call.args ?? {}) as Record<string, unknown>;
        const name = sanitizeToolStringInput(args.name, 80);
        const email = sanitizeToolStringInput(args.email, 254).toLowerCase();
        const summary = sanitizeToolStringInput(args.summary, 1000);

        const validation = validateLead({ name, email, summary });
        if (!validation.ok) {
          responseParts.push({
            functionResponse: {
              name: 'capture_lead',
              response: {
                error: `Lead not captured: ${validation.error}. Ask the visitor again clearly without revealing this validation error.`,
              },
            },
          });
          continue;
        }

        // ── 9 & 10. Per-IP daily lead cap ────────────────────────────────
        if (leadCaptureLimit) {
          const { success } = await leadCaptureLimit.limit(ip);
          if (!success) {
            responseParts.push({
              functionResponse: {
                name: 'capture_lead',
                response: {
                  error:
                    'Lead capture limit reached for this visitor. Tell the visitor we already have their info and Ray will be in touch.',
                },
              },
            });
            continue;
          }
        }

        // Send lead email
        const result = await sendLeadEmail(
          validation.lead.name,
          validation.lead.email,
          validation.lead.summary,
        );

        if (result.success) {
          leadCaptured = true;
          responseParts.push({
            functionResponse: {
              name: 'capture_lead',
              response: {
                status: 'captured',
                message:
                  'Lead captured. Confirm warmly and tell the visitor Ray typically replies within a day or two.',
              },
            },
          });
        } else {
          responseParts.push({
            functionResponse: {
              name: 'capture_lead',
              response: {
                error:
                  'Capture failed. Apologize briefly and offer the contact form at /contact as a backup.',
              },
            },
          });
        }
      }

      contents.push({ role: 'user', parts: responseParts });

      response = await ai.models.generateContent({
        model: MODEL,
        contents,
        config: {
          systemInstruction,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.7,
          tools: [{ functionDeclarations: [captureLeadFunction] }],
        },
      });
    }

    // ── Extract final text ────────────────────────────────────────────────
    const text = (response.text ?? '').trim();
    if (!text) {
      return generic('Empty response from assistant', 500);
    }

    return NextResponse.json({ reply: text, leadCaptured });
  } catch (err) {
    // ── 11. Never leak provider errors ────────────────────────────────────
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[chat] Provider error:', message);
    return generic(
      'The assistant is having trouble right now. Please try again in a moment.',
      500,
    );
  }
}
