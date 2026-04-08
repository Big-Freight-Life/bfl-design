import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { chatRateLimit, getClientIp } from '@/lib/rateLimit';
import { SYSTEM_PROMPT, MAX_MESSAGE_LENGTH } from '@/models/chat';

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 1024;
const MAX_HISTORY_TURNS = 30;

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const captureLeadTool: Anthropic.Tool = {
  name: 'capture_lead',
  description:
    'Capture a qualified lead. Call this ONLY after the visitor has shared their name, email, and you have enough context to summarize what they are working on. Never call this with placeholder or fabricated values.',
  input_schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The visitor\'s name as they provided it.',
      },
      email: {
        type: 'string',
        description: 'The visitor\'s email address.',
      },
      summary: {
        type: 'string',
        description:
          'A 1-3 sentence summary of what the visitor is working on, their problem, and what they want from Ray. Written in third person.',
      },
    },
    required: ['name', 'email', 'summary'],
  },
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendLeadEmail(
  name: string,
  email: string,
  summary: string,
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_EMAIL;
  if (!apiKey || !toAddress) {
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'BFL Chatbot <noreply@bfl.design>',
      to: [toAddress],
      subject: `New chatbot lead: ${name}`,
      text: `A new lead came in through the BFL chatbot.\n\nName: ${name}\nEmail: ${email}\n\nContext:\n${summary}`,
    });

    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhook) {
      await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `:robot_face: New chatbot lead from *${name}* (${email})\n> ${summary}`,
        }),
      });
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIp(req);
  if (chatRateLimit) {
    const { success } = await chatRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many messages. Please slow down a bit.' },
        { status: 429 },
      );
    }
  }

  // API key check
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Chat is not configured.' },
      { status: 503 },
    );
  }

  // Parse + validate body
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: 'messages array is required' },
      { status: 400 },
    );
  }

  // Sanitize: enforce role, length, role alternation
  const sanitized: IncomingMessage[] = [];
  for (const m of messages.slice(-MAX_HISTORY_TURNS)) {
    if (
      typeof m !== 'object' ||
      m === null ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid message shape' }, { status: 400 });
    }
    const content = m.content.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (content.length === 0) continue;
    sanitized.push({ role: m.role, content });
  }

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
    return NextResponse.json(
      { error: 'Last message must be from user' },
      { status: 400 },
    );
  }

  // Call Claude with tool use enabled
  const client = new Anthropic({ apiKey });

  try {
    let response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      tools: [captureLeadTool],
      messages: sanitized,
    });

    // Handle tool use loop (single iteration is enough for capture_lead)
    const conversationMessages: Anthropic.MessageParam[] = [...sanitized];
    let leadCaptured = false;

    while (response.stop_reason === 'tool_use') {
      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
      );

      // Add assistant turn with tool calls to conversation
      conversationMessages.push({
        role: 'assistant',
        content: response.content,
      });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const toolUse of toolUseBlocks) {
        if (toolUse.name === 'capture_lead') {
          const input = toolUse.input as {
            name?: string;
            email?: string;
            summary?: string;
          };

          const name = input.name?.trim() ?? '';
          const email = input.email?.trim() ?? '';
          const summary = input.summary?.trim() ?? '';

          if (!name || !email || !summary || !isValidEmail(email)) {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content:
                'Lead not captured: missing or invalid name, email, or summary. Ask the visitor again clearly.',
              is_error: true,
            });
            continue;
          }

          const result = await sendLeadEmail(name, email, summary);
          if (result.success) {
            leadCaptured = true;
            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content:
                'Lead captured successfully. Confirm to the visitor that Ray has been notified and typically replies within a day or two.',
            });
          } else {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: `Lead capture failed: ${result.error ?? 'unknown error'}. Apologize briefly and offer the contact form as a backup at /contact.`,
              is_error: true,
            });
          }
        } else {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: 'Unknown tool',
            is_error: true,
          });
        }
      }

      // Send tool results back to model for final response
      conversationMessages.push({
        role: 'user',
        content: toolResults,
      });

      response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        tools: [captureLeadTool],
        messages: conversationMessages,
      });
    }

    // Extract text from final response
    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    return NextResponse.json({
      reply: text,
      leadCaptured,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[chat] Anthropic error:', message);
    return NextResponse.json(
      { error: 'The assistant is having trouble right now. Please try again.' },
      { status: 500 },
    );
  }
}
