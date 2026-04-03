# Raybot — AI Chat Assistant for Big Freight Life

## Overview

Raybot is a standalone AI chat assistant deployed at `raybot.bfl.design`. It represents Ray Butler in conversation — answering questions about BFL's services, generating system diagrams, and capturing leads. Built as a separate project from bfl-design for security isolation.

## Stack

- **Framework:** Next.js 15 (App Router), TypeScript
- **UI:** MUI 6 (consistent with bfl-design)
- **AI Model:** Google Gemini Flash (`gemini-2.0-flash`)
- **Voice Output:** ElevenLabs TTS (Rachel voice, ID: `21m00Tcm4TlvDq8ikWAM`)
- **Voice Input:** Web Speech API (browser-native)
- **Diagrams:** Mermaid.js
- **Email:** Resend API
- **Hosting:** Vercel (free tier), repo `bfl-raybot`, domain `raybot.bfl.design`

## Architecture

Separate Vercel project and GitHub repo (`Big-Freight-Life/bfl-raybot`). No shared infrastructure with bfl-design. If raybot goes down or gets abused, bfl.design is unaffected.

No database. Conversations live in sessionStorage only. Lead submissions go to Resend email + Slack webhook. Nothing persisted server-side.

## Page Layout

Single-page app with two panels:

### Left Panel — Chat
Full-height chat interface matching the WordPress chatbot design:
- Chat messages with typewriter effect (semantic chunking, punctuation pauses)
- Thinking dots animation (3 animated dots during AI processing)
- Action buttons per message: copy, regenerate, like/dislike
- Input area at bottom: textarea + clear button + mic button + voice toggle
- Lead capture form appears inline when handoff is triggered

### Right Panel — Sidebar
Diagram output area:
- Renders Mermaid.js diagrams based on conversation context
- Updates when the bot includes a Mermaid code block in its response
- Empty state with subtle placeholder until first diagram is generated
- Fullscreen/zoom option on diagrams

### Mobile
Sidebar hidden, chat goes full-width. Diagrams appear inline within chat messages instead of in the sidebar.

### Header
Minimal — "raybot" branding + link back to bfl.design.

## Chat Behavior

### AI Configuration
- Model: `gemini-2.0-flash`
- Max tokens: 500
- Temperature: 0.7

### Knowledge Base
Ported from WordPress `chatbot-knowledge.php` and improved. Includes:
- Company info, services, capabilities
- Ray Butler bio and background
- Personality guidelines
- Handoff trigger definitions

### Personality
Represents Ray directly — conversational, knowledgeable, professional but approachable. First-person ("I specialize in...").

### Conversation History
- Session-based using sessionStorage
- Cleared on browser close
- Max 50 messages
- History sent with each API call for context

### Typewriter Effect
Semantic chunking with natural timing:
- 50-150ms per chunk
- +80ms pause after sentences (`.!?`)
- +30ms pause after commas
- +120ms pause after paragraphs
- Slight randomization for human feel

### Diagram Generation
When the conversation involves workflows, systems, or processes, the bot includes a Mermaid code block in its response. The app detects fenced code blocks with `mermaid` language tag and renders them in the sidebar (desktop) or inline (mobile).

### Handoff Triggers
When the user asks about pricing, custom projects, hiring, or scheduling — the bot presents two lead capture options:
1. **Send an email** — inline form with name, email, message fields. Submitted via Resend API + Slack webhook notification.
2. **Book a call** — opens configurable Google Calendar appointment scheduling link in new tab.

## Voice Features

### Voice Input (Speech-to-Text)
- Web Speech API (browser-native, free)
- Mic button activates listening
- Transcribed text populates the input field
- User can edit before sending
- If browser doesn't support Web Speech API, mic button is hidden

### Voice Output (Text-to-Speech)
- ElevenLabs API
- Rachel voice (ID: `21m00Tcm4TlvDq8ikWAM`)
- Voice settings: stability 0.5, similarity boost 0.75
- Bot responses converted to audio and played automatically when unmuted
- Speaker/mute toggle button
- Only generates TTS when voice is unmuted (cost control)

## API Routes

```
app/api/
  chat/route.ts        # POST: send message + history to Gemini, return response
  tts/route.ts         # POST: convert text to speech via ElevenLabs
  lead/route.ts        # POST: capture lead via Resend email + Slack webhook
  feedback/route.ts    # POST: record like/dislike on responses
```

## Security & Cost Controls

### Rate Limiting
- Chat endpoint: 20 messages/hour per IP
- Lead capture: 3 submissions/hour per IP
- Implemented via in-memory store in API routes

### Spending Caps
- Gemini: Monthly budget cap in Google Cloud console. If exceeded, bot returns friendly "I'm taking a break" message.
- ElevenLabs: Free tier ~10K characters/month. Disable TTS gracefully if quota hit.

### Input Sanitization
- Strip HTML/scripts from user messages before sending to Gemini
- System prompt instructs model to stay in character and refuse off-topic requests
- No tool access or code execution capabilities given to the model

### Access
- Public, no authentication required
- Rate limiting is the primary abuse prevention mechanism

## Environment Variables

```
GEMINI_API_KEY=           # Google AI Studio API key
ELEVENLABS_API_KEY=       # ElevenLabs API key
RESEND_API_KEY=           # Resend email API key
CONTACT_EMAIL=            # Email to receive lead submissions
SLACK_WEBHOOK_URL=        # Slack notification webhook
CALENDAR_URL=             # Google Calendar appointment scheduling link
```

## Directory Structure

```
src/
  app/
    page.tsx                    # Main chat page
    layout.tsx                  # Root layout with MUI theme
    api/
      chat/route.ts             # Gemini chat endpoint
      tts/route.ts              # ElevenLabs TTS endpoint
      lead/route.ts             # Lead capture endpoint
      feedback/route.ts         # Feedback endpoint
  components/
    ChatPanel.tsx               # Left panel — full chat interface
    ChatMessage.tsx             # Individual message bubble
    ChatInput.tsx               # Input area with mic/clear/voice toggle
    DiagramSidebar.tsx          # Right panel — Mermaid renderer
    LeadCaptureForm.tsx         # Inline lead form (email + calendar)
    ThinkingDots.tsx            # Loading animation
    ActionButtons.tsx           # Copy, regenerate, like/dislike
    Header.tsx                  # Minimal header bar
  lib/
    gemini.ts                   # Gemini API client
    elevenlabs.ts               # ElevenLabs TTS client
    knowledge.ts                # System prompt + knowledge base
    rate-limit.ts               # IP-based rate limiter
  theme/
    theme.ts                    # MUI theme (matches bfl-design tokens)
    tokens.ts                   # Design tokens subset
```

## Deployment

- Push to `Big-Freight-Life/bfl-raybot` on GitHub
- Vercel auto-deploys from `main` branch
- Domain: `raybot.bfl.design` pointed to Vercel
- Environment variables set in Vercel project settings
