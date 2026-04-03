# BFL Design — Claude Code Instructions

## Project Overview

Next.js portfolio and agency site for Big Freight Life (Ray Butler) at `bfl.design`. Migrated from WordPress theme (`bfluxco-master`).

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **UI:** MUI 6 (Material UI) with custom theme
- **Architecture:** MVVM — Models (`src/models/`), ViewModels (`src/viewmodels/`), Views (`src/components/`)
- **Blog:** MDX files in `content/blog/`
- **Hosting:** Vercel (Hobby plan), domain `bfl.design`

## Key Patterns

### MVVM Rules
1. Views never import Models directly — use ViewModels (hooks)
2. ViewModels never return JSX — return data and callbacks
3. Models are pure TypeScript — no React, no hooks, no MUI
4. Components over ~150 lines should be split

### Design Tokens
All colors, typography, spacing are in `src/theme/tokens.ts`. Use tokens instead of hardcoded values. The MUI theme is in `src/theme/theme.ts`.

### Container Width
- MUI `Container maxWidth="lg"` maps to custom breakpoint `lg: 1024px`
- Footer and header use `layout.containerMaxWidth` = `1400px`
- The carousel uses a CSS calc to align with Container content edges

### Primary Button Color
- Button background: `#117680` (colors.button.primary.bg)
- Always white text on primary buttons (set in theme override)

## Deployment Pipeline

1. Edit locally in `/Users/raybutler/development/bfl-design`
2. Commit & push to GitHub: `Big-Freight-Life/bfl-design` (branch: `master`)
3. Vercel auto-deploys from `master`, or force deploy with `vercel deploy --prod`
4. Live at: https://bfl-design.vercel.app (custom domain: bfl.design pending)

## Related Projects

- **WordPress (legacy):** `/Users/raybutler/development/bfluxco-master` — reference for visual design matching
- **Raybot:** `/Users/raybutler/development/bfl-raybot` — AI chat assistant at `raybot.bfl.design`

## Directory Structure

```
src/
  app/                    # Next.js App Router pages
  models/                 # Pure TypeScript data layer
  viewmodels/             # React hooks connecting models to views
  components/
    layout/               # Header, Footer, MobileTabBar, MobileDrawer
    sections/             # Homepage sections (Hero, CaseStudyCarousel, etc.)
    common/               # MegaMenu, shared components
    products/             # Product page components
    contact/              # Contact form
    blog/                 # Blog components
  theme/
    tokens.ts             # Design tokens
    theme.ts              # MUI theme (light/dark)
    ThemeRegistry.tsx      # Client ThemeProvider wrapper
```

## Important Notes

- WordPress template at `bfluxco-master` is the visual reference — match its design
- The megamenu opens on hover (100ms delay) with slide-up animation
- Carousel cards use a nested scroll structure (outer overflow container + inner track with padding)
- Dark mode is supported via `useThemeMode` hook
