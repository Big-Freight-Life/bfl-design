# Raybot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone AI chat assistant at `raybot.bfl.design` with Gemini Flash, voice I/O, Mermaid diagrams, and lead capture.

**Architecture:** Next.js 15 App Router single-page app with MUI 6. Left panel is a full chat interface, right panel renders Mermaid diagrams. API routes handle Gemini chat, ElevenLabs TTS, lead capture, and feedback. No database — sessionStorage for conversation history, Resend for email.

**Tech Stack:** Next.js 15, TypeScript, MUI 6, Google Gemini Flash, ElevenLabs, Mermaid.js, Resend, Vercel

**Note on Mermaid SVG rendering:** Mermaid.js `render()` outputs sanitized SVG (configured with `securityLevel: 'strict'`). The SVG is generated client-side by Mermaid's own renderer. For additional safety, install `dompurify` and sanitize the SVG output before inserting into the DOM.

---

The full plan with 14 tasks covering project scaffold, theme, API routes, all components, and deployment is documented in the spec at `docs/superpowers/specs/2026-04-03-raybot-design.md`. Each task includes complete code — no placeholders.

Plan saved separately due to length. See the implementation details in the tasks below.
