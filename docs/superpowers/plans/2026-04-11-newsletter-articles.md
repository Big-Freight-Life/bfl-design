# Newsletter Articles — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 3 high-end, visually unique article pages at `/newsletter/*` with a shared component library, and wire them into the newsletter page's Articles tab.

**Architecture:** Custom page files per article (not MDX) sharing reusable article components in `src/components/articles/`. Each article has a distinct visual identity (Article 1: dark/teal, Article 2: light/amber, Article 3: dark/red). Mermaid.js loaded dynamically for diagram rendering.

**Tech Stack:** Next.js 16 App Router, MUI 7, TypeScript, mermaid.js (dynamic import), design tokens from `src/theme/tokens.ts`

**Content source:** Research document provided by user in conversation. Each article draws from specific sections of this document. The research content is referenced in task descriptions — agents should ask the team lead for the full research text if needed.

---

## File Structure

### New files to create:

```
src/components/articles/
  ArticleHero.tsx          — Full-width hero with gradient, category label, title, subtitle, metadata
  PullQuote.tsx            — Styled blockquote with colored left border
  StatCard.tsx             — Large metric with label and accent color
  StatGrid.tsx             — Responsive grid wrapper for StatCards
  CaseStudyBlock.tsx       — Case study with title, company, description, diagnosis, pattern
  ComparisonTable.tsx      — Styled comparison table (dark/light mode aware)
  MermaidDiagram.tsx       — Client-side Mermaid renderer with caption
  ArticleCTA.tsx           — End-of-article CTA block
  ImagePlaceholder.tsx     — Decorative placeholder for future images
  ArticleSection.tsx       — Section wrapper with consistent padding and bg variants

src/app/newsletter/
  ai-is-not-a-feature/page.tsx
  designing-for-exceptions/page.tsx
  small-teams-ai-decisions/page.tsx
```

### Files to modify:

```
src/app/newsletter/page.tsx  — Wire article card links to real routes
```

---

### Task 1: Shared article components — layout primitives

**Files:**
- Create: `src/components/articles/ArticleHero.tsx`
- Create: `src/components/articles/ArticleSection.tsx`
- Create: `src/components/articles/ArticleCTA.tsx`

- [ ] **Step 1: Create ArticleHero component**

Create `src/components/articles/ArticleHero.tsx` — a full-width hero with gradient background, category dot+label, large title, subtitle, and optional date/readTime metadata. Accepts `lightMode` prop for Article 2's light background. Uses design tokens for typography.

- [ ] **Step 2: Create ArticleSection component**

Create `src/components/articles/ArticleSection.tsx` — section wrapper with `bg` prop ('default' | 'alt' | 'dark'), consistent `py` spacing, Container maxWidth="lg", and inner Box with configurable maxWidth (default '44rem').

- [ ] **Step 3: Create ArticleCTA component**

Create `src/components/articles/ArticleCTA.tsx` — dark gradient section with headline, sub text, primary Button (contained), optional secondary text link. Accepts `accentColor` for per-article theming.

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

- [ ] **Step 5: Commit**

```bash
git add src/components/articles/ArticleHero.tsx src/components/articles/ArticleSection.tsx src/components/articles/ArticleCTA.tsx
git commit -m "Add article layout primitives: ArticleHero, ArticleSection, ArticleCTA"
```

---

### Task 2: Shared article components — content blocks

**Files:**
- Create: `src/components/articles/PullQuote.tsx`
- Create: `src/components/articles/StatCard.tsx`
- Create: `src/components/articles/StatGrid.tsx`
- Create: `src/components/articles/CaseStudyBlock.tsx`
- Create: `src/components/articles/ComparisonTable.tsx`
- Create: `src/components/articles/ImagePlaceholder.tsx`

- [ ] **Step 1: Create PullQuote** — styled blockquote with colored left border, italic text, optional attribution. Props: `quote`, `attribution?`, `color?` (default teal).

- [ ] **Step 2: Create StatCard and StatGrid** — StatCard: large value + label + accent color in a dark glassmorphic card. StatGrid: responsive CSS grid (3-col desktop, 1-col mobile) wrapper.

- [ ] **Step 3: Create CaseStudyBlock** — card with company label (accent colored), title, description, diagnosis section (accent left border), transferable pattern section. Props: `title`, `company`, `description`, `diagnosis`, `pattern`, `accentColor?`.

- [ ] **Step 4: Create ComparisonTable** — styled HTML table with header row (alt bg), hover row highlights, dark/light mode aware. Props: `headers: string[]`, `rows: string[][]`.

- [ ] **Step 5: Create ImagePlaceholder** — decorative box with aspect ratio, gradient bg, centered "Image" label, optional caption below. Props: `aspectRatio?`, `caption?`, `gradient?`.

- [ ] **Step 6: Verify build passes**

Run: `npm run build`

- [ ] **Step 7: Commit**

```bash
git add src/components/articles/PullQuote.tsx src/components/articles/StatCard.tsx src/components/articles/StatGrid.tsx src/components/articles/CaseStudyBlock.tsx src/components/articles/ComparisonTable.tsx src/components/articles/ImagePlaceholder.tsx
git commit -m "Add article content components: PullQuote, StatCard, CaseStudy, ComparisonTable, ImagePlaceholder"
```

---

### Task 3: MermaidDiagram component

**Files:**
- Create: `src/components/articles/MermaidDiagram.tsx`

- [ ] **Step 1: Install mermaid**

Run: `npm install mermaid`

- [ ] **Step 2: Create MermaidDiagram component**

Create `src/components/articles/MermaidDiagram.tsx` — client-side Mermaid renderer. Uses `useEffect` + dynamic `import('mermaid')` to avoid SSR. Reads MUI theme mode to set Mermaid theme (dark/default). Renders SVG into a ref container. Shows "Loading diagram..." placeholder. Accepts `chart` (Mermaid definition string) and `caption?`. Wraps output in a styled container with border-radius and border.

Note: Uses mermaid's `render()` API which returns SVG strings — the rendered SVG is set via the container ref's DOM API. This is safe because mermaid.render() produces trusted SVG output, not user-supplied HTML.

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/articles/MermaidDiagram.tsx package.json package-lock.json
git commit -m "Add MermaidDiagram component with dynamic import and dark mode support"
```

---

### Task 4: Article 1 — "AI Is Not a Feature"

**Files:**
- Create: `src/app/newsletter/ai-is-not-a-feature/page.tsx`

**Visual identity:** Dark backgrounds (`#0f172a`, `#1e293b`), teal accents (`#14B8A6`), technical editorial.

- [ ] **Step 1: Create the article page**

Create `src/app/newsletter/ai-is-not-a-feature/page.tsx` using the shared components. Content from the research document:

**Metadata:** title "AI Is Not a Feature | BFL Design", description about bolt-on failures and AI-first design.

**Sections:**
1. **ArticleHero** — gradient: `linear-gradient(135deg, #0f172a, #1e293b)`, category: "Systems" (teal), title: "AI Is Not a Feature", subtitle from research exec summary, date: "April 2026", readTime: "15 min read"
2. **The Thesis** (ArticleSection bg="dark") — Three thesis points from research problem framing, styled as bold statements
3. **The Bolt-On Failure Mode** (ArticleSection bg="alt") — ComparisonTable with 5-row bolt-on vs AI-first table from research (Dimension / Bolt-on / AI-first / Failure mode columns). PullQuote about hidden technical debt.
4. **Case Studies** (ArticleSection) — Three CaseStudyBlocks with teal accent: Air Canada chatbot liability, McDonald's drive-thru pilot ended, Zillow Offers wind-down. Content from research case study sections.
5. **The Architecture** (ArticleSection bg="dark") — MermaidDiagram with the AI-first architecture flowchart from research. Explanatory text about orchestrator pattern, thin-waist contracts, tool isolation.
6. **AI-First Successes** (ArticleSection bg="alt") — GitHub Copilot productivity study and Stitch Fix expert-in-the-loop, framed as "augmentation + verification" pattern.
7. **The Dashboard** (ArticleSection bg="dark") — HTML/CSS 2x2 grid of metric panels (Outcomes, Reliability, Quality, Safety/Cost) with example metrics from research. MermaidDiagram with observability stack flowchart.
8. **ArticleCTA** — headline: "Your system needs an architect.", sub: links to /applied-ai-architect and /contact

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Route `/newsletter/ai-is-not-a-feature` in output.

- [ ] **Step 3: Commit**

```bash
git add src/app/newsletter/ai-is-not-a-feature/
git commit -m "Add Article 1: AI Is Not a Feature"
```

---

### Task 5: Article 2 — "Designing for Exceptions"

**Files:**
- Create: `src/app/newsletter/designing-for-exceptions/page.tsx`

**Visual identity:** Light backgrounds (`#fafaf9`, `#f5f5f4`, white), amber accents (`#d97706`), warm editorial.

- [ ] **Step 1: Create the article page**

**Metadata:** title "Designing for Exceptions, Not the Happy Path | BFL Design"

**Sections:**
1. **ArticleHero** — gradient: `linear-gradient(135deg, #fafaf9, #f5f5f4)`, lightMode: true, category: "Resilience" (amber), title: "Designing for Exceptions", subtitle: "Not the Happy Path"
2. **The Reality Split** (ArticleSection) — Visual showing Happy Path 20% vs Exceptions 80% as styled boxes. PullQuote (amber): "The happy path describes what was planned..."
3. **Why Exceptions Dominate** (ArticleSection bg="alt") — Four exception categories as styled blocks: ambiguous inputs, model uncertainty, retrieval failure, system failures
4. **Case Studies** (ArticleSection) — Three CaseStudyBlocks with amber accent: McDonald's (exception-dense environment), Air Canada (policy contradiction), Stitch Fix (exceptions as feature)
5. **Exception-First Patterns** (ArticleSection bg="alt") — 4 pattern cards: Fallback design, Uncertainty-first dialogue, Human-in-the-loop, Confidence gating. Each with name, description, when to use.
6. **UX for Exceptions** (ArticleSection) — HAI guidelines, recovery UI principles: communicate uncertainty, show provenance, provide controls. PullQuote from HAI concept.
7. **ArticleCTA** — gradient with amber tint, link to /applied-ai-architect, accentColor: '#d97706'

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/app/newsletter/designing-for-exceptions/
git commit -m "Add Article 2: Designing for Exceptions"
```

---

### Task 6: Article 3 — "Why Small Teams Can't Afford Bad AI Decisions"

**Files:**
- Create: `src/app/newsletter/small-teams-ai-decisions/page.tsx`

**Visual identity:** Dark backgrounds (`#0c0a09`, `#1c1917`), red accents (`#ef4444`), data-heavy, SRE-inspired.

- [ ] **Step 1: Create the article page**

**Metadata:** title "Why Small Teams Can't Afford Bad AI Decisions | BFL Design"

**Sections:**
1. **ArticleHero** — gradient: `linear-gradient(180deg, #0c0a09, #1c1917)`, category: "Survival" (red), title + subtitle from research
2. **The Thin-Margin Reality** (ArticleSection bg="dark") — StatGrid with 3 StatCards: "55.8%" teal, "$881M" amber, "0%" red. Text about thin buffers from research.
3. **Cost Risk** (ArticleSection bg="dark") — Variable spend explanation, budgeted routing pattern from research
4. **Latency Risk** (ArticleSection bg="dark") — p95 discussion, streaming/async/timeout patterns from research. PullQuote on tail latency.
5. **Error Budgets** (ArticleSection bg="dark") — Custom error budget burn rate visualization: styled HTML progress bar (green→amber→red gradient, 87% filled). SLO/error-budget explanation from research.
6. **Governance** (ArticleSection bg="dark") — Minimum viable governance for small teams, NIST AI RMF simplified from research
7. **The Roadmap** (ArticleSection bg="dark") — MermaidDiagram: Gantt timeline from research. ComparisonTable: implementation roadmap by team size (small/medium/large). Implementation checklist as styled list.
8. **ArticleCTA** — accentColor: '#ef4444', link to /applied-ai-architect and /contact

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/app/newsletter/small-teams-ai-decisions/
git commit -m "Add Article 3: Why Small Teams Can't Afford Bad AI Decisions"
```

---

### Task 7: Wire newsletter page to article routes

**Files:**
- Modify: `src/app/newsletter/page.tsx`

- [ ] **Step 1: Add href to ResourceItem and article data**

In `src/app/newsletter/page.tsx`:
- Add `href?: string` to the `ResourceItem` interface (around line 60)
- Add href values to the 3 article items in `resourceTabs[0].items`:
  - "AI Is Not a Feature" → `/newsletter/ai-is-not-a-feature`
  - "Designing for Exceptions..." → `/newsletter/designing-for-exceptions`
  - "Why Small Teams..." → `/newsletter/small-teams-ai-decisions`

- [ ] **Step 2: Make Read button navigate when href exists**

Import `Link` from `next/link`. In the resource card rendering, conditionally wrap the "Read" button with `component={Link} href={item.href}` when `item.href` is defined.

- [ ] **Step 3: Verify build and navigation**

Run: `npm run build && npm run dev`
Visit `/newsletter`, click each article's Read button → navigates to correct article.

- [ ] **Step 4: Commit**

```bash
git add src/app/newsletter/page.tsx
git commit -m "Wire newsletter article cards to real article routes"
```

---

### Task 8: Final verification and deploy

- [ ] **Step 1: Full build** — `npm run build`, all 3 routes compile
- [ ] **Step 2: Visual review** — check all 3 articles render, Mermaid loads, mobile responsive
- [ ] **Step 3: Push and deploy** — `git push origin master && vercel deploy --prod`
