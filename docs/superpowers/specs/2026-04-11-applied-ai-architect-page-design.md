# Applied AI Architect Page — Design Spec

## Context

BFL Design is positioning "Applied AI Architect" as its primary service offering. The homepage POV section has a badge linking to this service, but it currently points to `/transformation` which is a general "fix the system" deep dive. This new page is a dedicated service page that defines what Applied AI Architecture is, what the role does, and drives visitors to book a discovery call.

**Voice:** Warm, conversational, direct (StoryBrand framework)
**URL:** `/applied-ai-architect`
**Goal:** Book a discovery call
**Audience:** Mix of ops/IT leaders, founders/executives, product/design leads

## Page Structure

Linear StoryBrand flow — one continuous narrative scroll.

### Section 1: Hero (DarkHeroSection)

- **Badge:** "Applied AI Architecture" (teal chip, matching POV section badge style)
- **Headline:** "Your system needs an architect."
- **Sub:** "AI doesn't fail because of the model. It fails because nobody designed the system it runs inside."
- **No CTA button** — let the narrative pull visitors down

Uses `DarkHeroSection` component with large display typography, matching the transformation page hero pattern.

### Section 2: Agitate (light bg)

StoryBrand role: **Stakes — what happens without architecture**

- **Header:** "You've seen this before."
- **Staccato lines:**
  - "AI pilot launches. Looks promising."
  - "Six months later, it's still a pilot."
  - "Nobody can explain why it hasn't scaled."
  - "The model works fine. The system around it doesn't."
- **Closing (bold):** "Without architecture, AI stays stuck in demo mode."

### Section 3: What Applied AI Architecture Is (alt bg)

StoryBrand role: **Solution positioning**

- **Header:** "Applied AI Architecture"
- **Body:** "It's the practice of designing the system that AI operates inside. Not the model. Not the prompt. The decisions, workflows, ownership structures, and data flows that determine whether AI actually delivers."
- **Three key points** (card/bullet pattern):
  1. **"System design, not tool selection"** — "We don't recommend platforms. We restructure how work moves so AI has something real to plug into."
  2. **"Strategy, design, engineering, and distribution — one practice"** — "Most teams split these across roles that don't talk to each other. Here, one practice holds all four — so the system you get is coherent from strategy through distribution."
  3. **"Operational, not theoretical"** — "We work inside your real environment. Not an idealized version of it. The architecture has to hold under the conditions you actually operate in."

### Section 4: What an Applied AI Architect Does (light bg)

StoryBrand role: **Capability — defining the role**

- **Header:** "What an Applied AI Architect does"
- **Body:** "An Applied AI Architect operates across the entire system — from strategy to distribution. Deep enough to build in every layer. Broad enough to see how they connect."
- **Three facets:**
  1. **"Reads the real system"** — "Maps how work actually moves, where decisions stall, and where AI is being forced into places it doesn't fit. Not from documentation. From the inside."
  2. **"Designs architecture that holds"** — "Structures decision flows, ownership, data paths, and integration points so AI operates within real conditions — not idealized ones."
  3. **"Ships what was designed"** — "Strategy, design, engineering, and distribution happen in one loop. No translation layers. No gap between the plan and what gets built."

### Section 5: What Changes (light bg)

StoryBrand role: **Positive end result**

- **Header:** "What changes"
- **Outcome lines:**
  - "AI projects stop stalling at the pilot stage."
  - "Decisions flow through the system instead of around it."
  - "Teams stop debating tools and start delivering."
  - "The system supports the work — and the AI — at scale."
- **Closing (bold):** "That's what architecture makes possible."

### Section 6: CTA (DarkHeroSection)

StoryBrand role: **Call to action**

- **Lead:** "If your AI investments aren't producing results, the system is the place to start."
- **Headline:** "Book a discovery call."
- **Sub:** "30 minutes. No pitch. We'll look at your system together and figure out what's underneath."
- **Primary CTA button:** "Book a Call" → Google Meet scheduling link (placeholder `#book` until real link provided)
- **Secondary link:** "Or start with a message →" → `/contact`

## Routing Change

Update `src/components/sections/POVSection.tsx` badge link from `/transformation` to `/applied-ai-architect`.

## Files to Create/Modify

- **Create:** `src/app/applied-ai-architect/page.tsx` — new page
- **Modify:** `src/components/sections/POVSection.tsx` — update badge href
- **Modify:** `src/models/navigation.ts` — not needed for initial launch; page is accessed via the homepage POV badge link. Navigation placement can be added later if the page proves valuable.

## Design Patterns to Follow

- Use `DarkHeroSection` for hero and closing CTA (matching transformation page)
- Inline MUI styling with design tokens from `src/theme/tokens.ts`
- `Container maxWidth="lg"` for content sections
- Staccato lines pattern (used in transformation page)
- Card/bullet pattern (used in WhatWeDoSection for the three-point sections)
- Page metadata with SEO-friendly title and description

## What We're NOT Building

- No new components — use existing DarkHeroSection and MUI primitives
- No animations or reveal effects (keep it simple)
- No booking integration — just a link to Google Meet (placeholder for now)
- No changes to the transformation page — it stays as-is alongside this new page

## Verification

1. `npm run build` — no errors
2. Visual review at `/applied-ai-architect` — narrative flows, copy reads naturally
3. Verify POV section badge on homepage now links to new page
4. Check CTA buttons work (primary → placeholder, secondary → /contact)
5. Mobile responsive check — sections stack cleanly
