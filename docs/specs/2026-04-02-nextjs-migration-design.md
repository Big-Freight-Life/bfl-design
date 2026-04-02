# BFL Design — Next.js Migration Spec

## Overview

Migrate bflux.co from a WordPress theme to a Next.js static site deployed on Vercel. Keep the current visual design. Drop WordPress entirely.

## Projects

Two separate repos, two Vercel projects:

| Repo | Domain | Purpose |
|------|--------|---------|
| `bfl-design` | bfl.design | Main portfolio/agency site |
| `bfl-raybot` | raybot.bfl.design | AI chatbot ("talk to Ray") |

This spec covers `bfl-design` only. `bfl-raybot` will get its own spec.

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** MUI 6 (Material UI) with custom theme
- **Language:** TypeScript
- **Blog:** MDX files in `content/blog/`
- **Contact form:** Resend (email) + Slack webhook
- **Case study auth:** Next.js middleware + API route (password → session cookie)
- **Hosting:** Vercel (Hobby plan, free)
- **Domain:** bfl.design

## Architecture: MVVM

The codebase follows **Model-View-ViewModel** for clean separation of concerns:

- **Model** — Data types, API clients, and business logic. No UI knowledge.
- **View** — React components. Display only. No business logic, no direct data fetching.
- **ViewModel** — Custom hooks that connect Models to Views. Handle state, data fetching, and transformations.

### Rules

1. **Views never import Models directly.** Views consume ViewModels via hooks.
2. **ViewModels never import Views.** They return data and callbacks, not JSX.
3. **Models are framework-agnostic.** Pure TypeScript — no React, no hooks, no MUI.
4. **One ViewModel per feature area.** Colocated with the feature it serves.
5. **Components are small and focused.** If a component exceeds ~150 lines, split it.

### Directory Structure

```
src/
  models/                     # Data layer (pure TypeScript)
    blog.ts                   # Blog post types, MDX loader, sorting
    case-study.ts             # Case study types, auth logic
    contact.ts                # Contact form types, validation, API client
    product.ts                # Product types and data
    navigation.ts             # Nav structure data

  viewmodels/                 # State + logic (React hooks)
    useBlog.ts                # Blog list/detail state
    useCaseStudyAuth.ts       # Auth state, login handler
    useContactForm.ts         # Form state, validation, submit handler
    useNavigation.ts          # Mobile drawer state, active route
    useThemeMode.ts           # Dark/light mode toggle

  components/                 # View layer (React + MUI)
    layout/
      Header.tsx              # Main nav with megamenus
      Footer.tsx              # Footer with nav columns
      MobileTabBar.tsx        # Bottom tab bar
      MobileDrawer.tsx        # Slide-up "More" drawer
    sections/
      Hero.tsx                # Homepage hero with dark mode video
      CaseStudyCarousel.tsx   # Horizontal scroll case studies
      SectionNav.tsx          # Section navigation
    blog/
      PostCard.tsx            # Blog post preview card
      PostLayout.tsx          # MDX blog post wrapper
    products/
      ProductHeader.tsx       # Mobile back button + product name overlay
    case-studies/
      AuthGate.tsx            # Password protection form
    contact/
      ContactForm.tsx         # Form with validation
    common/
      MegaMenu.tsx            # Dropdown panel system
      CaseCard.tsx            # Portfolio/work cards
      SectionHeader.tsx       # Reusable section headers
```

### Example Flow: Contact Form

```
ContactForm.tsx (View)
  └─ useContactForm() (ViewModel)
       ├─ manages form state, field validation
       ├─ calls submitContact() on submit
       └─ returns { fields, errors, isSubmitting, handleSubmit }
            └─ submitContact() (Model)
                 ├─ validates payload
                 ├─ POST /api/contact
                 └─ returns success/error
```

## Page Routes

```
app/
  page.tsx                            # Home
  blog/
    page.tsx                          # Blog index
    [slug]/page.tsx                   # Blog post (MDX)
  works/
    page.tsx                          # Works/portfolio
    case-studies/page.tsx             # Case studies (password-protected)
    methodology/page.tsx              # Methodology
  transformation/
    page.tsx                          # Transformation
    workshop/page.tsx                 # Workshop
  products/
    page.tsx                          # Products overview
    low-ox-life/page.tsx              # Low Ox Life
    bio-break/page.tsx                # Bio Break
    24-hour-urine-analysis/page.tsx   # 24H Urine Analysis
  about/
    page.tsx                          # About overview
    ray/page.tsx                      # About Ray
  support/
    page.tsx                          # Support hub
    low-ox-life/page.tsx              # Low Ox Life support
    bio-break/page.tsx                # Bio Break support
  contact/page.tsx                    # Contact
  process/page.tsx                    # Design Process
  newsletter/page.tsx                 # Newsletter
  ai-ethics/page.tsx                  # AI Ethics
  clients/page.tsx                    # Who We Serve
  legal/
    page.tsx                          # Legal hub
    low-ox-life-privacy/page.tsx      # Low Ox Life privacy
    low-ox-life-terms/page.tsx        # Low Ox Life terms
    bio-break-privacy/page.tsx        # Bio Break privacy
    bio-break-terms/page.tsx          # Bio Break terms
    24h-urine-privacy/page.tsx        # 24H Urine privacy
    24h-urine-terms/page.tsx          # 24H Urine terms
```

## MUI Theme

Custom theme matching the current brand:

- Design tokens ported from existing CSS variables (colors, spacing, typography, font weights)
- Dark mode support
- Mobile-first breakpoints matching current design (480px primary breakpoint)
- Brand colors: site primary palette plus product colors (Low Ox Life teal `#24A89C`, etc.)

## API Routes

```
app/api/
  contact/route.ts          # POST: validate form → send email via Resend + post to Slack webhook
  case-study-auth/route.ts  # POST: validate password → set httpOnly session cookie
```

## Case Study Authentication

- Next.js middleware checks for a valid session cookie on `/works/case-studies/*` routes
- If no cookie, redirect to a login page with email + password form
- API route validates credentials, sets an httpOnly cookie
- Same pattern as the current WordPress `BFLUXCO_Client_Access` class

## Blog System

- Posts written as MDX files in `content/blog/`
- Frontmatter for title, date, description, tags
- Static generation at build time via `generateStaticParams`
- Blog index reads all MDX files and lists them sorted by date

## Contact Form

- MUI form component with client-side validation
- Fields: name, email, project type (select), subject, message
- Submit hits `/api/contact` which:
  1. Validates and sanitizes input server-side
  2. Sends formatted email via Resend API
  3. Posts notification to Slack webhook
  4. Returns success/error response

## Navigation

- **Desktop:** Header with logo, 4 main nav items (Works, Transformation, Products, About), Contact button. Products and About open megamenu panels.
- **Mobile:** Bottom tab bar (Home, Blog, Works, Contact) + slide-up drawer for remaining items (Products, About, Support, Transformation, Privacy, Terms).
- **Footer:** Works column, About column, bottom legal links.

All navigation is component-based.

## Deployment

- Push to `Big-Freight-Life/bfl-design` on GitHub
- Vercel auto-deploys from `main` branch
- Preview deployments for every PR/branch
- Domain: bfl.design pointed to Vercel

## Migration Strategy

Port pages one section at a time from the WordPress PHP templates to React components. Content is hardcoded in components (same approach as current PHP templates). Visual design stays the same — replicate existing CSS using MUI theme tokens and styled components.

## Out of Scope

- `bfl-raybot` (separate spec)
- CMS or admin interface
- E-commerce or payments
- User accounts (beyond case study password gate)
- Analytics (can add Vercel Analytics later)
