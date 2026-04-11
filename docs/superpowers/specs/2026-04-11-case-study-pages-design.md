# Case Study Pages Migration — Design Spec

## Context

The homepage carousel has 6 case study cards. 4 have broken/placeholder links pointing to WordPress URLs that don't exist on the Next.js site. Content for 3 case studies exists in WordPress templates and needs to be migrated. The 4th (PlanFlow) is new content not yet written.

## Scope

Migrate 3 case study pages from WordPress templates:
1. **Hyland OnBase Integration** — from `template-case-study-hyland.php`
2. **Hyland for Workday Integration** — from `template-case-study-style3.php`
3. **Salesforce Migration** — from `template-case-study-style1.php`

Also fix all broken links in the case-study model.

## Decisions

- **URL structure:** `/works/case-studies/[slug]`
- **Slugs:** `hyland-onbase-salesforce`, `hyland-for-workday`, `salesforce-migration`
- **Visual identity:** Unique per case study (different gradients/accents)
- **Components:** Reuse article components where they fit, build case-study-specific ones for gaps
- **StoryBrand voice:** Rewrite copy to match the warm, direct site voice

## New Components Needed

### StatsBar (`src/components/articles/StatsBar.tsx`)
Horizontal row of stat items (value + label). Used across all case studies.
- Props: `stats: { value: string; label: string }[]`
- Responsive: horizontal on desktop, 2-col grid on mobile

### ChapterSection (`src/components/articles/ChapterSection.tsx`)
Content section with anchor ID for navigation. Simpler than ArticleSection — just an ID'd wrapper for in-page linking.
- Props: `id: string`, `title: string`, `children: React.ReactNode`

## Reuse From Existing Article Components
- ArticleHero — hero with gradient, category, title, subtitle, metadata
- ArticleSection — section wrapper with bg variants
- ArticleCTA — end-of-page CTA
- PullQuote — for featured quotes
- ImagePlaceholder — for image slots
- StatCard + StatGrid — for numbers sections (Workday page)

## Case Study 1: Hyland OnBase Integration

**Route:** `/works/case-studies/hyland-onbase-salesforce`
**Visual:** Purple gradient (`#7c3aed` → `#4f46e5`), split hero feel
**Source:** `template-case-study-hyland.php`

**Content (from WordPress, rewritten to match voice):**
- Category: "Enterprise Integration"
- Title: "Hyland OnBase Integration for Salesforce"
- Subtitle: "Enterprise document management meets CRM. Seamlessly."
- Client: Hyland Software, Inc. | Timeline: 18 months | Role: Lead UX Designer
- Stats: 3 Industries, Zero Custom Code, Native Lightning UX, Live on AppExchange
- Sections: The Challenge, The Approach, The Solution, Technical Integration, Results by Industry, What We Learned
- Full content from WordPress template (paragraphs, callouts, results cards, learnings)
- External link: Salesforce AppExchange listing
- CTA: Link to /applied-ai-architect

## Case Study 2: Hyland for Workday Integration

**Route:** `/works/case-studies/hyland-for-workday`
**Visual:** Dark immersive (`#0f172a` → `#1e293b`), teal accents
**Source:** `template-case-study-style3.php`

**Content (from WordPress):**
- Category: "Enterprise Integration"
- Title: "Hyland for Workday Integration"
- Subtitle: "Unified content management. Seamless user experience."
- Client: Hyland Software | Industry: Enterprise Software | Duration: 18 Months | Services: Integration Design, UX Strategy
- Big numbers: Zero Custom Code, SSO, 2 Platforms Unified, AI Ready Architecture
- Sections: The Challenge, The Goal, The Approach, Results
- Content from WordPress template
- CTA: Link to /applied-ai-architect

## Case Study 3: Salesforce Migration

**Route:** `/works/case-studies/salesforce-migration`
**Visual:** Blue gradient (`#0ea5e9` → `#0284c7`), editorial feel
**Source:** `template-case-study-style1.php`

**Content (from WordPress):**
- Category: "Healthcare SaaS / CRM Migration"
- Title: "Seamless Salesforce Migration"
- Subtitle: "Designed for clarity. Built for adoption."
- Client: AtlasMed Solutions
- Stats: 1.2M+ Records Migrated, 98.9% Data Fidelity, 81% Daily Active Users, 30% Productivity Increase
- Sections: The Challenge, The Goal, The Approach, Results, Impact, Learnings
- Content from WordPress template
- CTA: Link to /applied-ai-architect

## Case Study Model Updates

Fix links in `src/models/case-study.ts`:
- PlanFlow: keep `#` (no page yet)
- Portfolio: change to `#` (no page yet)
- Hyland OnBase: `/works/case-studies/hyland-onbase-salesforce`
- Hyland Workday: `/works/case-studies/hyland-for-workday` (fix existing URL)
- Salesforce Migration: `/works/case-studies/salesforce-migration`

## Files to Create
```
src/components/articles/StatsBar.tsx
src/components/articles/ChapterSection.tsx
src/app/works/case-studies/hyland-onbase-salesforce/layout.tsx
src/app/works/case-studies/hyland-onbase-salesforce/page.tsx
src/app/works/case-studies/hyland-for-workday/layout.tsx
src/app/works/case-studies/hyland-for-workday/page.tsx
src/app/works/case-studies/salesforce-migration/layout.tsx
src/app/works/case-studies/salesforce-migration/page.tsx
```

## Files to Modify
```
src/models/case-study.ts — fix broken links
```

## What We're NOT Building
- No PlanFlow or Portfolio case study pages (no content yet)
- No sticky TOC sidebar (keep it simple for now)
- No case study pagination (prev/next links)
- No image assets — use ImagePlaceholder throughout

## Verification
1. `npm run build` — all 3 routes compile
2. Homepage carousel cards link to correct pages
3. Each case study renders with its unique visual identity
4. Mobile responsive
5. No 404s from any carousel card link
