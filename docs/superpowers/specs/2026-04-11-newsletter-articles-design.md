# Newsletter Articles — Design Spec

## Context

The newsletter page has three placeholder articles under the "Articles" tab that currently link nowhere:
1. "AI Is Not a Feature"
2. "Designing for Exceptions"
3. "Why Small Teams Can't Afford Bad AI Decisions"

A comprehensive research document exists with the thesis, evidence, case studies, frameworks, diagrams, and data that supports all three. The goal is to turn this into three high-end, stylish article pages — each with a unique visual identity — that replace the placeholders and establish BFL as a thought leader on AI-first system design.

## Decisions

- **Architecture:** Hybrid — custom page files per article with shared reusable components
- **URL structure:** `/newsletter/ai-is-not-a-feature`, `/newsletter/designing-for-exceptions`, `/newsletter/small-teams-ai-decisions`
- **Diagrams:** Mermaid.js rendered client-side
- **Voice:** Warm, conversational, direct (matching site-wide StoryBrand voice)

## Shared Component Library

Create `src/components/articles/` with these reusable components:

### ArticleHero
Full-width hero with gradient background, category label, title, subtitle, and optional metadata (date, read time).
- Props: `category`, `categoryColor`, `title`, `subtitle`, `date`, `readTime`, `gradient` (CSS gradient string)
- Pattern: Similar to DarkHeroSection but article-specific

### StatCard
Highlighted metric with large number, label, and optional accent color.
- Props: `value`, `label`, `color` (default teal)
- Used in: Article 3 heavily, Article 1 lightly

### StatGrid
Responsive grid wrapper for StatCards (3-col desktop, 1-col mobile).
- Props: `children`

### PullQuote
Styled blockquote with left border accent and attribution.
- Props: `quote`, `attribution` (optional), `color` (border accent, default teal)

### CaseStudyBlock
Case study card with title, company, what happened, diagnosis, and transferable pattern.
- Props: `title`, `company`, `description`, `diagnosis`, `pattern`
- Used in: All 3 articles

### ComparisonTable
Styled table for bolt-on vs AI-first comparisons.
- Props: `headers`, `rows` (array of arrays)
- Dark/light mode aware

### MermaidDiagram
Client-side Mermaid renderer with loading state and dark/light mode support.
- Props: `chart` (Mermaid string), `caption` (optional)
- Loads mermaid.js dynamically (next/dynamic or useEffect)
- Renders in a styled container matching article theme

### ArticleCTA
End-of-article call to action block.
- Props: `headline`, `sub`, `buttonText`, `buttonHref`, `secondaryText`, `secondaryHref`

### ImagePlaceholder
Styled placeholder for future images with aspect ratio, caption, and decorative gradient.
- Props: `aspectRatio` (e.g. "16/9"), `caption`, `gradient` (optional)

### ArticleSection
Wrapper for article content sections with consistent padding and max-width.
- Props: `children`, `bg` ("default" | "alt" | "dark"), `maxWidth` (default "44rem")

## Article 1: "AI Is Not a Feature"

**Route:** `/newsletter/ai-is-not-a-feature`
**File:** `src/app/newsletter/ai-is-not-a-feature/page.tsx`
**Visual identity:** Dark, technical, teal accents. Editorial authority.

### Hero
- Gradient: `linear-gradient(135deg, #0f172a, #1e293b)`
- Category: "Systems" (teal dot + teal text)
- Title: "AI Is Not a Feature"
- Subtitle: "Designing AI-First Systems for Exceptions and Small-Team Reality"
- Metadata: "April 2026 · 15 min read"

### Sections

1. **The Thesis** (dark bg)
   - Three-point summary using the research doc's thesis statements
   - Each point as a styled card/block

2. **The Bolt-On Failure Mode** (alt bg)
   - Text explaining "hidden technical debt" framing
   - ComparisonTable: Bolt-on AI vs AI-first system (5-row table from research)
   - PullQuote from the hidden technical debt paper concept

3. **Case Studies** (default bg)
   - Three CaseStudyBlocks: Air Canada, McDonald's, Zillow
   - Each with what happened, bolt-on diagnosis, transferable pattern

4. **The Architecture** (dark bg)
   - MermaidDiagram: AI-first architecture flowchart (from research doc)
   - Explanation of orchestrator pattern, thin-waist contracts, tool isolation

5. **What AI-First Looks Like** (alt bg)
   - Case studies of success: GitHub Copilot, Stitch Fix
   - Key insight: augmentation + verification > autonomous decision-making

6. **The Dashboard** (dark bg)
   - HTML/CSS grid mockup of monitoring dashboard (4 panels: Outcomes, Reliability, Quality, Safety/Cost)
   - MermaidDiagram: Observability stack
   - Metrics table from research

7. **CTA** (dark bg)
   - ArticleCTA linking to /applied-ai-architect and /contact

## Article 2: "Designing for Exceptions"

**Route:** `/newsletter/designing-for-exceptions`
**File:** `src/app/newsletter/designing-for-exceptions/page.tsx`
**Visual identity:** Light, editorial, warm amber accents. Clean typography-forward.

### Hero
- Gradient: `linear-gradient(135deg, #fafaf9, #f5f5f4)` (light) — dark text
- Category: "Resilience" (amber dot + amber text)
- Title: "Designing for Exceptions"
- Subtitle: "Not the Happy Path"
- Metadata: "April 2026 · 12 min read"

### Sections

1. **The Reality Split** (default bg)
   - Visual: "Happy Path 20% / Exceptions 80%" styled comparison (from mockup)
   - PullQuote: "The happy path describes what was planned. The exception paths reveal what the system is."
   - Text framing exceptions as the primary design target

2. **Why Exceptions Dominate in AI** (alt bg)
   - Four exception categories from research: ambiguous inputs, model uncertainty, retrieval failure, system failures
   - Styled as a list with icons or numbered blocks

3. **Case Studies** (default bg)
   - CaseStudyBlocks: McDonald's drive-thru (exception-dense environment), Air Canada (policy contradiction exception), Stitch Fix (exceptions as a feature)

4. **Exception-First Design Patterns** (alt bg)
   - Pattern cards for: Fallback design, Uncertainty-first dialogue, Human-in-the-loop, Confidence gating
   - Each pattern: name, description, when to use

5. **UX for Exceptions** (default bg)
   - Human-AI interaction guidelines framing
   - Recovery UI principles: communicate uncertainty, show provenance, provide controls
   - PullQuote from the HAI guidelines concept

6. **CTA** (amber-tinted bg)
   - ArticleCTA linking to /applied-ai-architect and /contact

## Article 3: "Why Small Teams Can't Afford Bad AI Decisions"

**Route:** `/newsletter/small-teams-ai-decisions`
**File:** `src/app/newsletter/small-teams-ai-decisions/page.tsx`
**Visual identity:** Dark, urgent, data-heavy. Red accents. SRE-inspired.

### Hero
- Gradient: `linear-gradient(180deg, #0c0a09, #1c1917)`
- Category: "Survival" (red dot + red text)
- Title: "Why Small Teams Can't Afford Bad AI Decisions"
- Subtitle: "Error Budgets, Cost Caps, and the Thin-Margin Reality"
- Metadata: "April 2026 · 14 min read"

### Sections

1. **The Thin-Margin Reality** (dark bg)
   - StatGrid with 3 stats: Copilot 55.8% speed gain, Zillow $881M write-down, error budget concept
   - Text framing small teams as operating with thin buffers

2. **Cost Risk** (alt dark bg)
   - Variable spend explanation
   - "Budgeted routing" pattern: cheaper paths for low-risk, strict caps, caching, graceful degradation
   - ComparisonTable or stat visualization

3. **Latency Risk** (dark bg)
   - p95 defines trust
   - Streaming UX, async workflows, timeouts + fallbacks
   - PullQuote on tail latency and user trust

4. **Error Budgets: The Survival Primitive** (alt dark bg)
   - Error budget visualization (burn rate meter from mockup)
   - Explanation of SLO/error-budget thinking mapped to AI releases
   - How budget exhaustion freezes risky changes

5. **Governance for Small Teams** (dark bg)
   - Minimum viable governance: risk register, change log, eval gates, incident response
   - NIST AI RMF framing simplified for small teams

6. **The Roadmap** (alt dark bg)
   - MermaidDiagram: Gantt timeline from research doc
   - Implementation table by team size (small/medium/large)
   - Implementation checklist as styled cards

7. **CTA** (dark bg, red accent)
   - ArticleCTA linking to /applied-ai-architect and /contact

## Newsletter Page Updates

### Wire placeholders to real articles
In `src/app/newsletter/page.tsx`, update the Articles tab items to link to the new routes:
- "AI Is Not a Feature" → `/newsletter/ai-is-not-a-feature`
- "Designing for Exceptions" → `/newsletter/designing-for-exceptions`
- "Why Small Teams Can't Afford Bad AI Decisions" → `/newsletter/small-teams-ai-decisions`

### Update "Read" button
Make the "Read" button on each card actually navigate to the article.

## Image Placeholders

Use `ImagePlaceholder` component throughout with descriptive captions. Examples:
- "Architecture whiteboard sketch" (Article 1)
- "Exception flow diagram on paper" (Article 2)
- "Dashboard monitoring screen" (Article 3)

These can be replaced with real images later without changing the page structure.

## Technical Notes

### Mermaid.js Integration
- Dynamic import to avoid SSR issues: `next/dynamic` with `ssr: false`
- Theme detection: read MUI theme mode and set Mermaid theme accordingly (dark/default)
- Container styling: match article theme with border-radius and padding

### Dark/Light Mode
- Article 1: Always dark (force dark palette for the page)
- Article 2: Always light (force light palette)
- Article 3: Always dark (force dark palette)
- Components must support being forced into a specific mode regardless of site theme

### Page Metadata
Each article page exports metadata for SEO:
- Title: Article title + " | BFL Design"
- Description: First ~160 chars of the article's thesis
- OpenGraph: title, description, type "article"

## Files to Create

```
src/components/articles/
  ArticleHero.tsx
  StatCard.tsx
  StatGrid.tsx
  PullQuote.tsx
  CaseStudyBlock.tsx
  ComparisonTable.tsx
  MermaidDiagram.tsx
  ArticleCTA.tsx
  ImagePlaceholder.tsx
  ArticleSection.tsx

src/app/newsletter/
  ai-is-not-a-feature/page.tsx
  designing-for-exceptions/page.tsx
  small-teams-ai-decisions/page.tsx
```

## Files to Modify

- `src/app/newsletter/page.tsx` — wire article placeholders to real routes

## What We're NOT Building

- No CMS or MDX for these articles — they're custom pages
- No comment system or social sharing integration
- No reading progress indicator
- No table of contents sidebar
- No print stylesheet
- No RSS feed changes

## Verification

1. `npm run build` — all 3 article routes compile
2. Visual review of each article at its URL
3. Newsletter page "Read" buttons navigate to correct articles
4. Mermaid diagrams render in both dark and light contexts
5. Mobile responsive — all sections stack cleanly
6. Image placeholders display at correct aspect ratios
7. StatCards, PullQuotes, CaseStudyBlocks render consistently across articles
