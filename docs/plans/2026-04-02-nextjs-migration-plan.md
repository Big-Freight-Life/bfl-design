# BFL Design — Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate bflux.co from WordPress to a Next.js 15 site with MUI 6, MVVM architecture, deployed to Vercel.

**Architecture:** MVVM — Models (pure TS data/logic), ViewModels (React hooks), Views (MUI components). App Router with static generation. MDX blog. API routes for contact form and case study auth.

**Tech Stack:** Next.js 15, MUI 6, TypeScript, MDX, Resend, Vercel

**Reference:** Design spec at `docs/specs/2026-04-02-nextjs-migration-design.md`

**Source theme:** `/Users/raybutler/development/bfluxco-master` (WordPress theme to port from)

---

## Phase 1: Project Foundation

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/raybutler/development/bfl-design
npx create-next-app@latest . --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*"
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind: No
- `src/` directory: Yes
- App Router: Yes
- Import alias: `@/*`

- [ ] **Step 2: Install MUI and dependencies**

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify it runs**

```bash
npm run dev
```

Expected: Dev server starts at localhost:3000, default Next.js page renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with MUI 6"
```

---

### Task 2: MUI theme with design tokens

**Files:**
- Create: `src/theme/tokens.ts`
- Create: `src/theme/theme.ts`
- Create: `src/theme/ThemeRegistry.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create design tokens**

Create `src/theme/tokens.ts` — pure constants ported from the WordPress `_variables.css`:

```typescript
// src/theme/tokens.ts

// ── Colors ──────────────────────────────────────────────
export const colors = {
  primary: {
    main: '#14B8A6',
    dark: '#0D9488',
    light: '#2DD4BF',
    muted: '#99F6E4',
  },
  accent: {
    cyan: '#06B6D4',
    coral: '#F87171',
    purple: '#A855F7',
  },
  button: {
    primary: { bg: '#117680', hover: '#0e5f67', text: '#ffffff' },
    secondary: { bg: 'rgba(0,0,0,0.05)', hover: 'rgba(0,0,0,0.1)', text: '#117680' },
    tertiary: { bg: 'rgba(0,0,0,0.06)', hover: 'rgba(0,0,0,0.1)', text: '#117680' },
  },
  gray: {
    50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
    400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
    800: '#1f2937', 900: '#111827',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  product: {
    lowOxLife: { primary: '#24A89C', dark: '#0B3733', purple: '#35066B' },
  },
} as const;

// ── Dark mode overrides ─────────────────────────────────
export const darkColors = {
  button: {
    primary: { bg: '#117680', hover: '#1a9aa6', text: '#ffffff' },
    secondary: { bg: 'rgba(255,255,255,0.1)', hover: 'rgba(255,255,255,0.15)', text: '#1a9aa6' },
    tertiary: { bg: 'rgba(255,255,255,0.08)', hover: 'rgba(255,255,255,0.15)', text: '#1a9aa6' },
  },
  primary: { main: '#2DD4BF', dark: '#14B8A6', light: '#5EEAD4' },
} as const;

// ── Typography ──────────────────────────────────────────
export const typography = {
  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  monoFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
  sizes: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
    xl: '1.25rem', '2xl': 'clamp(1.375rem, 2.5vw, 1.5rem)',
    '3xl': 'clamp(1.75rem, 3.5vw, 1.875rem)', '4xl': 'clamp(2rem, 4vw, 2.25rem)',
    '5xl': '3rem', '6xl': '3.75rem', '7xl': '4.5rem',
  },
  weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeights: { none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2 },
  letterSpacing: {
    tighter: '-0.05em', tight: '-0.025em', normal: '0',
    wide: '0.025em', wider: '0.05em', widest: '0.1em',
  },
} as const;

// ── Spacing (4px base) ──────────────────────────────────
export const spacing = {
  1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
  5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem',
  12: '3rem', 16: '4rem', 20: '5rem',
} as const;

// ── Border Radius ───────────────────────────────────────
export const radius = {
  sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem',
  '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem', full: '9999px',
  card: '1.5rem', cardLg: '2.125rem',
} as const;

// ── Shadows ─────────────────────────────────────────────
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const darkShadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.4)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
} as const;

// ── Motion ──────────────────────────────────────────────
export const motion = {
  easing: { outExpo: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  duration: {
    micro: '200ms', fast: '300ms', normal: '400ms', smooth: '500ms',
    reveal: '700ms', section: '1000ms', dramatic: '1400ms',
  },
  revealDistance: { default: '40px', sm: '20px' },
} as const;

// ── Z-Index ─────────────────────────────────────────────
export const zIndex = {
  dropdown: 100, sticky: 200, fixed: 300,
  modalBackdrop: 400, modal: 500, popover: 600, tooltip: 700,
} as const;

// ── Layout ──────────────────────────────────────────────
export const layout = {
  containerMaxWidth: '1400px',
  tabBarHeight: '64px',
} as const;

// ── Breakpoints ─────────────────────────────────────────
export const breakpoints = {
  xs: 0, sm: 480, md: 768, lg: 1024, xl: 1200, xxl: 1400,
} as const;
```

- [ ] **Step 2: Create MUI theme**

Create `src/theme/theme.ts`:

```typescript
// src/theme/theme.ts
'use client';

import { createTheme } from '@mui/material/styles';
import { colors, darkColors, typography, breakpoints, shadows, darkShadows, radius } from './tokens';

const baseTheme = {
  breakpoints: {
    values: { xs: breakpoints.xs, sm: breakpoints.sm, md: breakpoints.md, lg: breakpoints.lg, xl: breakpoints.xl },
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1: { fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, lineHeight: typography.lineHeights.tight, letterSpacing: typography.letterSpacing.tight },
    h2: { fontSize: typography.sizes['3xl'], fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.tight, letterSpacing: typography.letterSpacing.tight },
    h3: { fontSize: typography.sizes['2xl'], fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.snug },
    h4: { fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.snug },
    h5: { fontSize: typography.sizes.lg, fontWeight: typography.weights.medium, lineHeight: typography.lineHeights.normal },
    h6: { fontSize: typography.sizes.base, fontWeight: typography.weights.medium, lineHeight: typography.lineHeights.normal },
    body1: { fontSize: typography.sizes.base, lineHeight: typography.lineHeights.normal },
    body2: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal },
    caption: { fontSize: typography.sizes.xs, lineHeight: typography.lineHeights.normal },
    overline: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, letterSpacing: typography.letterSpacing.widest, textTransform: 'uppercase' as const },
  },
  shape: { borderRadius: parseInt(radius.lg) * 16 },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: { main: colors.primary.main, dark: colors.primary.dark, light: colors.primary.light },
    secondary: { main: colors.accent.purple },
    error: { main: colors.semantic.error },
    warning: { main: colors.semantic.warning },
    success: { main: colors.semantic.success },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: colors.gray[900], secondary: colors.gray[700] },
    divider: colors.gray[200],
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: { main: darkColors.primary.main, dark: darkColors.primary.dark, light: darkColors.primary.light },
    secondary: { main: colors.accent.purple },
    error: { main: colors.semantic.error },
    warning: { main: colors.semantic.warning },
    success: { main: colors.semantic.success },
    background: { default: '#121212', paper: '#1a1a1a' },
    text: { primary: '#d4d4d4', secondary: '#a3a3a3' },
    divider: '#303030',
  },
});
```

- [ ] **Step 3: Create ThemeRegistry**

Create `src/theme/ThemeRegistry.tsx` — handles MUI + Emotion SSR with Next.js App Router:

```tsx
// src/theme/ThemeRegistry.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeMode } from '@/viewmodels/useThemeMode';
import { lightTheme, darkTheme } from './theme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 4: Create useThemeMode ViewModel**

Create `src/viewmodels/useThemeMode.ts`:

```typescript
// src/viewmodels/useThemeMode.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark';

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (stored) {
      setMode(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', next);
      return next;
    });
  }, []);

  return { mode, toggleMode };
}
```

- [ ] **Step 5: Update root layout**

Replace `src/app/layout.tsx`:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';

export const metadata: Metadata = {
  title: 'BFL Design',
  description: 'Big Freight Life — We help teams build systems that work.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Update homepage placeholder**

Replace `src/app/page.tsx`:

```tsx
// src/app/page.tsx
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1">BFL Design</Typography>
      <Typography variant="body1" color="text.secondary">
        Site migration in progress.
      </Typography>
    </Box>
  );
}
```

- [ ] **Step 7: Verify theme renders**

```bash
npm run dev
```

Expected: Page renders with Poppins font, teal primary color, MUI styling applied.

- [ ] **Step 8: Commit**

```bash
git add src/theme/ src/viewmodels/useThemeMode.ts src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add MUI theme with design tokens and dark mode support"
```

---

### Task 3: Navigation model

**Files:**
- Create: `src/models/navigation.ts`

- [ ] **Step 1: Create navigation data model**

```typescript
// src/models/navigation.ts

export interface NavItem {
  label: string;
  href: string;
  megamenu?: 'products' | 'about';
  children?: NavItem[];
}

export interface MegamenuPanel {
  id: string;
  label: string;
  href: string;
  description: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Our Work', href: '/works' },
  { label: 'Transformation', href: '/transformation' },
  { label: 'Products', href: '#', megamenu: 'products' },
  { label: 'About', href: '/about', megamenu: 'about' },
];

export const secondaryNav: NavItem[] = [
  { label: 'Contact', href: '/contact' },
];

export const productsPanels: MegamenuPanel[] = [
  { id: 'low-ox-life', label: 'Low Ox Life', href: '/products/low-ox-life', description: 'Track and manage oxalate intake with smart food logging.' },
  { id: 'bio-break', label: 'Bio Break', href: '/products/bio-break', description: 'Track bathroom health patterns and insights.' },
  { id: '24h-urine', label: '24-Hour Urine Analysis', href: '/products/24-hour-urine-analysis', description: 'Comprehensive urine analysis tracking.' },
  { id: 'product-releases', label: 'Product Releases', href: '/products/releases', description: 'Latest updates and release notes.' },
  { id: 'legal', label: 'Legal', href: '/legal', description: 'Privacy policies and terms of service.' },
];

export const aboutPanels: MegamenuPanel[] = [
  { id: 'about-us', label: 'About Us', href: '/about', description: 'Learn about Big Freight Life and our mission.' },
  { id: 'process', label: 'Process', href: '/process', description: 'How we approach system design and transformation.' },
  { id: 'ai-ethics', label: 'AI Ethics', href: '/ai-ethics', description: 'Our principles for responsible AI design.' },
  { id: 'newsletter', label: 'Our Newsletter', href: '/newsletter', description: 'Stay updated with our latest thinking.' },
  { id: 'online-design-course', label: 'Online Design Course', href: '/transformation/workshop', description: 'Learn system design principles.' },
  { id: 'support', label: 'Support', href: '/support', description: 'Get help with our products.' },
];

export const mobileTabItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Works', href: '/works' },
  { label: 'Contact', href: '/contact' },
];

export const mobileDrawerItems: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about', children: [
    { label: 'About Us', href: '/about' },
    { label: 'Who We Serve', href: '/clients' },
  ]},
  { label: 'Support', href: '/support' },
  { label: 'Transformation', href: '/transformation' },
];

export const mobileDrawerUtility: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export const footerNav = {
  works: [
    { label: 'Case Studies', href: '/works/case-studies' },
    { label: 'Products', href: '/products' },
    { label: 'Methodology', href: '/works/methodology' },
    { label: 'Articles', href: '/blog' },
  ],
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Who We Serve', href: '/clients' },
  ],
  legal: [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

/** Check if a given pathname matches a nav item (exact or starts-with for nested routes) */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}
```

- [ ] **Step 2: Commit**

```bash
git add src/models/navigation.ts
git commit -m "feat: add navigation data model"
```

---

### Task 4: useNavigation ViewModel

**Files:**
- Create: `src/viewmodels/useNavigation.ts`

- [ ] **Step 1: Create navigation ViewModel**

```typescript
// src/viewmodels/useNavigation.ts
'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  primaryNav, secondaryNav, productsPanels, aboutPanels,
  mobileTabItems, mobileDrawerItems, mobileDrawerUtility,
  footerNav, isActiveRoute,
} from '@/models/navigation';

export function useNavigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<'products' | 'about' | null>(null);
  const [activePanelId, setActivePanelId] = useState<string | null>(null);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const openMegamenu = useCallback((menu: 'products' | 'about') => {
    setActiveMegamenu(menu);
    const panels = menu === 'products' ? productsPanels : aboutPanels;
    setActivePanelId(panels[0]?.id ?? null);
  }, []);

  const closeMegamenu = useCallback(() => {
    setActiveMegamenu(null);
    setActivePanelId(null);
  }, []);

  const isActive = useCallback((href: string) => isActiveRoute(pathname, href), [pathname]);

  return {
    pathname,
    primaryNav,
    secondaryNav,
    productsPanels,
    aboutPanels,
    mobileTabItems,
    mobileDrawerItems,
    mobileDrawerUtility,
    footerNav,
    drawerOpen,
    toggleDrawer,
    closeDrawer,
    activeMegamenu,
    activePanelId,
    setActivePanelId,
    openMegamenu,
    closeMegamenu,
    isActive,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/viewmodels/useNavigation.ts
git commit -m "feat: add useNavigation ViewModel"
```

---

## Phase 2: Layout Components

### Task 5: Header component

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/common/MegaMenu.tsx`

- [ ] **Step 1: Create MegaMenu component**

```tsx
// src/components/common/MegaMenu.tsx
'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MegamenuPanel } from '@/models/navigation';

interface MegaMenuProps {
  title: string;
  panels: MegamenuPanel[];
  activePanelId: string | null;
  onPanelHover: (id: string) => void;
  onClose: () => void;
}

export default function MegaMenu({ title, panels, activePanelId, onPanelHover, onClose }: MegaMenuProps) {
  const activePanel = panels.find((p) => p.id === activePanelId) ?? panels[0];

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        display: 'flex',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        zIndex: 'modal',
      }}
    >
      {/* Left panel — nav index */}
      <Box sx={{ width: 280, borderRight: 1, borderColor: 'divider', py: 3, px: 2 }}>
        <Typography variant="overline" sx={{ px: 2, mb: 1, display: 'block', color: 'text.secondary' }}>
          {title}
        </Typography>
        {panels.map((panel) => (
          <Box
            key={panel.id}
            component={Link}
            href={panel.href}
            onClick={onClose}
            onMouseEnter={() => onPanelHover(panel.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderRadius: 1,
              textDecoration: 'none',
              color: activePanelId === panel.id ? 'primary.main' : 'text.primary',
              bgcolor: activePanelId === panel.id ? 'action.hover' : 'transparent',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography variant="body2" fontWeight={500}>{panel.label}</Typography>
            <ArrowForwardIcon sx={{ fontSize: 16, opacity: 0.5 }} />
          </Box>
        ))}
      </Box>

      {/* Right panel — contextual content */}
      <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" gutterBottom>{activePanel.label}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {activePanel.description}
        </Typography>
        <Button component={Link} href={activePanel.href} onClick={onClose} variant="text" color="primary">
          Learn more
        </Button>
      </Box>
    </Paper>
  );
}
```

- [ ] **Step 2: Create Header component**

```tsx
// src/components/layout/Header.tsx
'use client';

import { AppBar, Toolbar, Box, Button, Typography, IconButton } from '@mui/material';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MegaMenu from '@/components/common/MegaMenu';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout } from '@/theme/tokens';

export default function Header() {
  const {
    primaryNav, secondaryNav, productsPanels, aboutPanels,
    activeMegamenu, activePanelId, setActivePanelId,
    openMegamenu, closeMegamenu, isActive,
  } = useNavigation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ maxWidth: layout.containerMaxWidth, width: '100%', mx: 'auto', px: { xs: 2, md: 3, lg: 4 } }}>
        {/* Logo */}
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700, mr: 4 }}
        >
          BFL
        </Typography>

        {/* Primary nav — hidden on mobile */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, flex: 1 }}>
          {primaryNav.map((item) => (
            <Button
              key={item.label}
              component={item.megamenu ? 'button' : Link}
              href={item.megamenu ? undefined : item.href}
              onClick={item.megamenu ? () => {
                activeMegamenu === item.megamenu ? closeMegamenu() : openMegamenu(item.megamenu!);
              } : closeMegamenu}
              sx={{
                color: isActive(item.href) ? 'primary.main' : 'text.primary',
                fontWeight: isActive(item.href) ? 600 : 500,
                textTransform: 'none',
                fontSize: '0.875rem',
              }}
              endIcon={item.megamenu ? <KeyboardArrowDownIcon /> : undefined}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Secondary nav */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
          {secondaryNav.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.href}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>

      {/* Megamenus */}
      {activeMegamenu === 'products' && (
        <MegaMenu
          title="Products"
          panels={productsPanels}
          activePanelId={activePanelId}
          onPanelHover={setActivePanelId}
          onClose={closeMegamenu}
        />
      )}
      {activeMegamenu === 'about' && (
        <MegaMenu
          title="About"
          panels={aboutPanels}
          activePanelId={activePanelId}
          onPanelHover={setActivePanelId}
          onClose={closeMegamenu}
        />
      )}
    </AppBar>
  );
}
```

- [ ] **Step 3: Verify header renders**

```bash
npm run dev
```

Expected: Header with logo, nav items, megamenu dropdowns visible at desktop width.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx src/components/common/MegaMenu.tsx
git commit -m "feat: add Header with megamenu navigation"
```

---

### Task 6: Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
// src/components/layout/Footer.tsx
'use client';

import { Box, Typography, Grid, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout } from '@/theme/tokens';

export default function Footer() {
  const { footerNav } = useNavigation();

  return (
    <Box component="footer" sx={{ bgcolor: 'action.hover', color: 'text.secondary', py: 6 }}>
      <Box sx={{ maxWidth: layout.containerMaxWidth, mx: 'auto', px: { xs: 2, md: 3, lg: 4 } }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Works column */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ mb: 2, display: 'block' }}>Works</Typography>
            {footerNav.works.map((item) => (
              <MuiLink
                key={item.href}
                component={Link}
                href={item.href}
                underline="hover"
                sx={{ display: 'block', mb: 1, color: 'text.secondary', fontSize: '0.875rem' }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Grid>

          {/* About column */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ mb: 2, display: 'block' }}>About</Typography>
            {footerNav.about.map((item) => (
              <MuiLink
                key={item.href}
                component={Link}
                href={item.href}
                underline="hover"
                sx={{ display: 'block', mb: 1, color: 'text.secondary', fontSize: '0.875rem' }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Big Freight Life. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {footerNav.legal.map((item) => (
              <MuiLink
                key={item.href}
                component={Link}
                href={item.href}
                underline="hover"
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 7: Mobile tab bar and drawer

**Files:**
- Create: `src/components/layout/MobileTabBar.tsx`
- Create: `src/components/layout/MobileDrawer.tsx`

- [ ] **Step 1: Create MobileTabBar**

```tsx
// src/components/layout/MobileTabBar.tsx
'use client';

import { Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout } from '@/theme/tokens';

const icons = [HomeIcon, ArticleIcon, WorkIcon, PersonIcon];

export default function MobileTabBar() {
  const { mobileTabItems, toggleDrawer, isActive } = useNavigation();

  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'flex', lg: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: layout.tabBarHeight,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        zIndex: 'fixed',
        justifyContent: 'space-around',
        alignItems: 'center',
        px: 1,
      }}
    >
      {mobileTabItems.map((item, i) => {
        const Icon = icons[i];
        const active = isActive(item.href);
        return (
          <Box
            key={item.href}
            component={Link}
            href={item.href}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: active ? 'primary.main' : 'text.secondary',
              minWidth: 48,
              py: 1,
            }}
          >
            <Icon sx={{ fontSize: 24 }} />
            <Typography variant="caption" sx={{ fontSize: '0.625rem', mt: 0.25 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}

      {/* More button */}
      <Box
        component="button"
        onClick={toggleDrawer}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'text.secondary',
          minWidth: 48,
          py: 1,
        }}
      >
        <MoreVertIcon sx={{ fontSize: 24 }} />
        <Typography variant="caption" sx={{ fontSize: '0.625rem', mt: 0.25 }}>
          More
        </Typography>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Create MobileDrawer**

```tsx
// src/components/layout/MobileDrawer.tsx
'use client';

import { Drawer, Box, List, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import Link from 'next/link';
import { useNavigation } from '@/viewmodels/useNavigation';

export default function MobileDrawer() {
  const { drawerOpen, closeDrawer, mobileDrawerItems, mobileDrawerUtility, isActive } = useNavigation();

  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: '70vh',
          pb: 8, // space above tab bar
        },
      }}
    >
      {/* Drag handle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
        <Box sx={{ width: 32, height: 4, borderRadius: 2, bgcolor: 'divider' }} />
      </Box>

      <List sx={{ px: 1 }}>
        {mobileDrawerItems.map((item) => (
          <Box key={item.href}>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={closeDrawer}
              selected={isActive(item.href)}
              sx={{ borderRadius: 1 }}
            >
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
            {item.children?.map((child) => (
              <ListItemButton
                key={child.href}
                component={Link}
                href={child.href}
                onClick={closeDrawer}
                selected={isActive(child.href)}
                sx={{ pl: 4, borderRadius: 1 }}
              >
                <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
              </ListItemButton>
            ))}
          </Box>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      <List sx={{ px: 1 }}>
        {mobileDrawerUtility.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            onClick={closeDrawer}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/MobileTabBar.tsx src/components/layout/MobileDrawer.tsx
git commit -m "feat: add MobileTabBar and MobileDrawer components"
```

---

### Task 8: Wire layout together

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update root layout with all layout components**

Replace `src/app/layout.tsx`:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Box } from '@mui/material';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileTabBar from '@/components/layout/MobileTabBar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import { layout } from '@/theme/tokens';

export const metadata: Metadata = {
  title: 'BFL Design',
  description: 'Big Freight Life — We help teams build systems that work.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <Header />
          <Box component="main" sx={{ minHeight: '100vh', pb: { xs: layout.tabBarHeight, lg: 0 } }}>
            {children}
          </Box>
          <Footer />
          <MobileTabBar />
          <MobileDrawer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify full layout**

```bash
npm run dev
```

Expected: Header, footer, mobile tab bar (at narrow widths), and drawer all render.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire up Header, Footer, MobileTabBar, MobileDrawer in root layout"
```

---

## Phase 3: Common Components

### Task 9: SectionHeader and CaseCard

**Files:**
- Create: `src/components/common/SectionHeader.tsx`
- Create: `src/components/common/CaseCard.tsx`

- [ ] **Step 1: Create SectionHeader**

```tsx
// src/components/common/SectionHeader.tsx
import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ overline, title, subtitle }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {overline && (
        <Typography variant="overline" color="primary" sx={{ mb: 1, display: 'block' }}>
          {overline}
        </Typography>
      )}
      <Typography variant="h2" sx={{ mb: subtitle ? 2 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
```

- [ ] **Step 2: Create CaseCard**

```tsx
// src/components/common/CaseCard.tsx
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { radius } from '@/theme/tokens';

interface CaseCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
}

export default function CaseCard({ title, description, href, image, tags }: CaseCardProps) {
  return (
    <Card
      component={Link}
      href={href}
      sx={{
        textDecoration: 'none',
        borderRadius: radius.card,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
      }}
    >
      {image && (
        <CardMedia component="img" height={200} image={image} alt={title} />
      )}
      <CardContent>
        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            {tags.map((tag) => (
              <Typography key={tag} variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                {tag}
              </Typography>
            ))}
          </Box>
        )}
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/common/SectionHeader.tsx src/components/common/CaseCard.tsx
git commit -m "feat: add SectionHeader and CaseCard components"
```

---

## Phase 4: Homepage

### Task 10: Homepage hero and sections

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero component**

Port the hero section from `/Users/raybutler/development/bfluxco-master/front-page.php`:

```tsx
// src/components/sections/Hero.tsx
'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: { xs: '80vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800 }}>
          <Typography variant="overline" color="primary" sx={{ mb: 2, display: 'block' }}>
            Big Freight Life
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.25rem)' },
              mb: 2,
            }}
          >
            Your systems already know what&apos;s wrong.
          </Typography>
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.25rem)' },
              fontWeight: 700,
              display: 'block',
              mb: 3,
            }}
          >
            AI just made it visible.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
            We help teams build systems that work.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={Link} href="/contact" variant="contained" size="large" sx={{ textTransform: 'none' }}>
              Start a conversation
            </Button>
            <Button component={Link} href="/works" variant="outlined" size="large" sx={{ textTransform: 'none' }}>
              See our work
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Update homepage**

Replace `src/app/page.tsx`:

```tsx
// src/app/page.tsx
import Hero from '@/components/sections/Hero';

export default function Home() {
  return <Hero />;
}
```

Note: Additional homepage sections (case study carousel, etc.) will be added when those pages are built. Start with the hero to establish the pattern.

- [ ] **Step 3: Verify homepage**

```bash
npm run dev
```

Expected: Homepage renders with hero section, Poppins font, teal CTA buttons.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: add homepage with Hero section"
```

---

## Phase 5: Content Pages

### Task 11: Create page stubs for all routes

**Files:**
- Create: All page.tsx files listed in the spec's Page Routes section

- [ ] **Step 1: Create all page stub files**

Create a simple page stub for each route. Each stub follows this pattern:

```tsx
// Example: src/app/works/page.tsx
import { Container, Typography } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';

export default function WorksPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Portfolio" title="Our Work" subtitle="Case studies and projects." />
      <Typography variant="body1" color="text.secondary">Page content coming soon.</Typography>
    </Container>
  );
}
```

Create stubs for all routes:

- `src/app/works/page.tsx` — Our Work
- `src/app/works/case-studies/page.tsx` — Case Studies
- `src/app/works/methodology/page.tsx` — Methodology
- `src/app/transformation/page.tsx` — Transformation
- `src/app/transformation/workshop/page.tsx` — Workshop
- `src/app/products/page.tsx` — Products
- `src/app/products/low-ox-life/page.tsx` — Low Ox Life
- `src/app/products/bio-break/page.tsx` — Bio Break
- `src/app/products/24-hour-urine-analysis/page.tsx` — 24H Urine Analysis
- `src/app/about/page.tsx` — About
- `src/app/about/ray/page.tsx` — About Ray
- `src/app/support/page.tsx` — Support Hub
- `src/app/support/low-ox-life/page.tsx` — Low Ox Life Support
- `src/app/support/bio-break/page.tsx` — Bio Break Support
- `src/app/contact/page.tsx` — Contact
- `src/app/process/page.tsx` — Design Process
- `src/app/newsletter/page.tsx` — Newsletter
- `src/app/ai-ethics/page.tsx` — AI Ethics
- `src/app/clients/page.tsx` — Who We Serve
- `src/app/legal/page.tsx` — Legal Hub
- `src/app/legal/low-ox-life-privacy/page.tsx` — Low Ox Life Privacy
- `src/app/legal/low-ox-life-terms/page.tsx` — Low Ox Life Terms
- `src/app/legal/bio-break-privacy/page.tsx` — Bio Break Privacy
- `src/app/legal/bio-break-terms/page.tsx` — Bio Break Terms
- `src/app/legal/24h-urine-privacy/page.tsx` — 24H Urine Privacy
- `src/app/legal/24h-urine-terms/page.tsx` — 24H Urine Terms
- `src/app/blog/page.tsx` — Blog Index
- `src/app/blog/[slug]/page.tsx` — Blog Post (dynamic)

Each stub should have the correct page title and a placeholder body. Content will be ported from WordPress templates in subsequent tasks.

- [ ] **Step 2: Verify routing**

```bash
npm run dev
```

Navigate to `/works`, `/products/low-ox-life`, `/about/ray`, etc. Each should render its stub.

- [ ] **Step 3: Commit**

```bash
git add src/app/
git commit -m "feat: add page stubs for all routes"
```

---

## Phase 6: Blog System

### Task 12: Blog model and MDX setup

**Files:**
- Create: `src/models/blog.ts`
- Create: `content/blog/hello-world.mdx`
- Modify: `package.json` (add MDX deps)
- Modify: `next.config.ts`

- [ ] **Step 1: Install MDX dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
npm install -D @types/mdx
```

- [ ] **Step 2: Create blog model**

```typescript
// src/models/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        description: data.description ?? '',
        tags: data.tags ?? [],
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
```

- [ ] **Step 3: Create sample blog post**

```markdown
---
title: "Welcome to BFL Design"
date: "2026-04-02"
description: "Introducing our new site, built with Next.js."
tags: ["announcement"]
---

# Welcome

We've rebuilt our site from the ground up with Next.js, MUI, and a focus on performance.

Stay tuned for more updates.
```

Save to `content/blog/welcome.mdx`.

- [ ] **Step 4: Update blog index page**

Replace `src/app/blog/page.tsx`:

```tsx
// src/app/blog/page.tsx
import { Container, Typography, Box } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';
import { getAllPosts } from '@/models/blog';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Blog" title="Articles" subtitle="Thoughts on systems, design, and AI." />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {posts.map((post) => (
          <Box
            key={post.slug}
            component={Link}
            href={`/blog/${post.slug}`}
            sx={{ textDecoration: 'none', color: 'inherit', p: 3, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Typography variant="caption" color="text.secondary">{post.date}</Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>{post.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>{post.description}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
```

- [ ] **Step 5: Update blog post page**

Replace `src/app/blog/[slug]/page.tsx`:

```tsx
// src/app/blog/[slug]/page.tsx
import { Container, Typography, Box } from '@mui/material';
import { getAllSlugs, getPostBySlug } from '@/models/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="caption" color="text.secondary">{post.date}</Typography>
      <Typography variant="h1" sx={{ mt: 1, mb: 4 }}>{post.title}</Typography>
      <Box sx={{ '& p': { mb: 2, lineHeight: 1.7 }, '& h1,& h2,& h3': { mt: 4, mb: 2 } }}>
        <MDXRemote source={post.content} />
      </Box>
    </Container>
  );
}
```

- [ ] **Step 6: Install next-mdx-remote**

```bash
npm install next-mdx-remote
```

- [ ] **Step 7: Verify blog**

```bash
npm run dev
```

Navigate to `/blog` — should list the welcome post. Click into it — should render MDX content.

- [ ] **Step 8: Commit**

```bash
git add src/models/blog.ts src/app/blog/ content/blog/ package.json package-lock.json
git commit -m "feat: add blog system with MDX support"
```

---

## Phase 7: Contact Form

### Task 13: Contact form model, ViewModel, and API route

**Files:**
- Create: `src/models/contact.ts`
- Create: `src/viewmodels/useContactForm.ts`
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/app/api/contact/route.ts`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Install Resend**

```bash
npm install resend
```

- [ ] **Step 2: Create contact model**

```typescript
// src/models/contact.ts

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const PROJECT_TYPES = [
  'AI / Machine Learning',
  'System Design',
  'Experience Design',
  'Consulting',
  'Other',
] as const;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (!data.message.trim()) errors.message = 'Message is required';

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export async function submitContact(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    return { success: false, error: body.error ?? 'Failed to send message' };
  }

  return { success: true };
}
```

- [ ] **Step 3: Create useContactForm ViewModel**

```typescript
// src/viewmodels/useContactForm.ts
'use client';

import { useState, useCallback } from 'react';
import {
  ContactFormData, ContactFormErrors,
  validateContactForm, hasErrors, submitContact,
} from '@/models/contact';

const INITIAL_DATA: ContactFormData = {
  name: '', email: '', projectType: '', subject: '', message: '',
};

export function useContactForm() {
  const [fields, setFields] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = useCallback(<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateContactForm(fields);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitContact(fields);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setFields(INITIAL_DATA);
    } else {
      setSubmitError(result.error ?? 'Something went wrong');
    }
  }, [fields]);

  return { fields, errors, isSubmitting, submitted, submitError, updateField, handleSubmit };
}
```

- [ ] **Step 4: Create ContactForm component**

```tsx
// src/components/contact/ContactForm.tsx
'use client';

import {
  Box, TextField, Button, MenuItem, Alert, Typography,
} from '@mui/material';
import { useContactForm } from '@/viewmodels/useContactForm';
import { PROJECT_TYPES } from '@/models/contact';

export default function ContactForm() {
  const { fields, errors, isSubmitting, submitted, submitError, updateField, handleSubmit } = useContactForm();

  if (submitted) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        <Typography variant="body1" fontWeight={500}>Message sent!</Typography>
        <Typography variant="body2">Thanks for reaching out. I&apos;ll get back to you soon.</Typography>
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="Name"
          required
          fullWidth
          value={fields.name}
          onChange={(e) => updateField('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          label="Email"
          required
          fullWidth
          type="email"
          value={fields.email}
          onChange={(e) => updateField('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          inputProps={{ maxLength: 254 }}
        />
      </Box>

      <TextField
        label="Project Type"
        select
        fullWidth
        value={fields.projectType}
        onChange={(e) => updateField('projectType', e.target.value)}
      >
        <MenuItem value="">Select a type</MenuItem>
        {PROJECT_TYPES.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Subject"
        fullWidth
        value={fields.subject}
        onChange={(e) => updateField('subject', e.target.value)}
        inputProps={{ maxLength: 200 }}
      />

      <TextField
        label="Message"
        required
        fullWidth
        multiline
        rows={6}
        value={fields.message}
        onChange={(e) => updateField('message', e.target.value)}
        error={!!errors.message}
        helperText={errors.message}
        inputProps={{ maxLength: 5000 }}
      />

      {submitError && <Alert severity="error">{submitError}</Alert>}

      <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ textTransform: 'none', alignSelf: 'flex-start' }}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </Box>
  );
}
```

- [ ] **Step 5: Create API route**

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactForm, hasErrors } from '@/models/contact';

const resend = new Resend(process.env.RESEND_API_KEY);
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Server-side validation
  const errors = validateContactForm(data);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
  }

  // Sanitize
  const name = data.name.trim().slice(0, 100);
  const email = data.email.trim().slice(0, 254);
  const projectType = data.projectType?.trim().slice(0, 100) ?? '';
  const subject = data.subject?.trim().slice(0, 200) ?? 'New contact form submission';
  const message = data.message.trim().slice(0, 5000);

  try {
    // Send email via Resend
    await resend.emails.send({
      from: 'BFL Design <noreply@bfl.design>',
      to: [process.env.CONTACT_EMAIL ?? ''],
      subject: `Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\n${message}`,
    });

    // Post to Slack
    if (SLACK_WEBHOOK) {
      await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New contact from *${name}* (${email})\n*Type:* ${projectType}\n*Subject:* ${subject}\n> ${message.slice(0, 300)}`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

- [ ] **Step 6: Create .env.local template**

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=ray@bfl.design
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
```

Save as `.env.example` (committed) and `.env.local` (gitignored, actual keys).

- [ ] **Step 7: Update contact page**

Replace `src/app/contact/page.tsx`:

```tsx
// src/app/contact/page.tsx
import { Container, Box } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <SectionHeader
        overline="Get in Touch"
        title="Let's Build the Future Together"
        subtitle="Whether you're exploring AI-powered solutions, refining customer experiences, or designing intelligent systems, I'd love to hear about your vision."
      />
      <Box sx={{ mt: 4 }}>
        <ContactForm />
      </Box>
    </Container>
  );
}
```

- [ ] **Step 8: Commit**

```bash
git add src/models/contact.ts src/viewmodels/useContactForm.ts src/components/contact/ContactForm.tsx src/app/api/contact/route.ts src/app/contact/page.tsx .env.example
git commit -m "feat: add contact form with Resend email and Slack webhook"
```

---

## Phase 8: Case Study Authentication

### Task 14: Case study auth model, ViewModel, middleware, and API route

**Files:**
- Create: `src/models/case-study.ts`
- Create: `src/viewmodels/useCaseStudyAuth.ts`
- Create: `src/components/case-studies/AuthGate.tsx`
- Create: `src/app/api/case-study-auth/route.ts`
- Create: `src/middleware.ts`
- Modify: `src/app/works/case-studies/page.tsx`

- [ ] **Step 1: Create case study model**

```typescript
// src/models/case-study.ts

export interface CaseStudyCredentials {
  email: string;
  password: string;
}

export function validateCredentials(creds: CaseStudyCredentials): string | null {
  if (!creds.email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email)) return 'Invalid email';
  if (!creds.password) return 'Password is required';
  return null;
}

export async function authenticateCaseStudy(creds: CaseStudyCredentials): Promise<{ success: boolean; error?: string }> {
  const response = await fetch('/api/case-study-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    return { success: false, error: body.error ?? 'Authentication failed' };
  }

  return { success: true };
}
```

- [ ] **Step 2: Create useCaseStudyAuth ViewModel**

```typescript
// src/viewmodels/useCaseStudyAuth.ts
'use client';

import { useState, useCallback } from 'react';
import { CaseStudyCredentials, validateCredentials, authenticateCaseStudy } from '@/models/case-study';

export function useCaseStudyAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    const creds: CaseStudyCredentials = { email, password };
    const validationError = validateCredentials(creds);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await authenticateCaseStudy(creds);
    setIsSubmitting(false);

    if (result.success) {
      window.location.reload();
    } else {
      setError(result.error ?? 'Authentication failed');
    }
  }, [email, password]);

  return { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit };
}
```

- [ ] **Step 3: Create AuthGate component**

```tsx
// src/components/case-studies/AuthGate.tsx
'use client';

import { Box, TextField, Button, Alert, Typography, Paper } from '@mui/material';
import { useCaseStudyAuth } from '@/viewmodels/useCaseStudyAuth';

export default function AuthGate() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } = useCaseStudyAuth();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom>Client Access</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your credentials to view case studies.
        </Typography>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ textTransform: 'none' }}>
            {isSubmitting ? 'Authenticating...' : 'Access Case Studies'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
```

- [ ] **Step 4: Create auth API route**

```typescript
// src/app/api/case-study-auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Validate against env vars
  const validPassword = process.env.CASE_STUDY_PASSWORD;
  if (!validPassword || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Set httpOnly session cookie (expires in 7 days)
  const cookieStore = await cookies();
  cookieStore.set('cs_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 5: Create middleware**

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect case study routes
  if (pathname.startsWith('/works/case-studies')) {
    const session = request.cookies.get('cs_session');
    if (!session || session.value !== 'authenticated') {
      // Redirect to case studies page with auth gate
      const url = request.nextUrl.clone();
      url.pathname = '/works/case-studies';
      url.searchParams.set('auth', 'required');
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/works/case-studies/:path*'],
};
```

- [ ] **Step 6: Update case studies page**

Replace `src/app/works/case-studies/page.tsx`:

```tsx
// src/app/works/case-studies/page.tsx
import { Container } from '@mui/material';
import { cookies } from 'next/headers';
import SectionHeader from '@/components/common/SectionHeader';
import AuthGate from '@/components/case-studies/AuthGate';

export default async function CaseStudiesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('cs_session');
  const isAuthenticated = session?.value === 'authenticated';

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Portfolio" title="Case Studies" subtitle="Detailed project work for our clients." />
      {/* Case study content goes here */}
    </Container>
  );
}
```

- [ ] **Step 7: Add env vars to .env.example**

Add to `.env.example`:

```
CASE_STUDY_PASSWORD=your_password_here
```

- [ ] **Step 8: Commit**

```bash
git add src/models/case-study.ts src/viewmodels/useCaseStudyAuth.ts src/components/case-studies/AuthGate.tsx src/app/api/case-study-auth/route.ts src/middleware.ts src/app/works/case-studies/page.tsx .env.example
git commit -m "feat: add case study password authentication with middleware"
```

---

## Phase 9: GitHub and Deployment

### Task 15: Create GitHub repo and deploy to Vercel

**Files:**
- Create: `.env.example` (already created)
- Verify: `.gitignore` includes `.env.local`

- [ ] **Step 1: Verify .gitignore**

Confirm `.gitignore` includes:
```
.env.local
.env*.local
```

(This should already be in the Next.js default `.gitignore`.)

- [ ] **Step 2: Create GitHub repository**

```bash
cd /Users/raybutler/development/bfl-design
gh repo create Big-Freight-Life/bfl-design --public --source=. --push
```

- [ ] **Step 3: Deploy to Vercel**

Option A — Vercel CLI:
```bash
npm install -g vercel
vercel
```

Option B — Connect via Vercel dashboard:
1. Go to vercel.com/new
2. Import `Big-Freight-Life/bfl-design`
3. Framework: Next.js (auto-detected)
4. Add environment variables (RESEND_API_KEY, CONTACT_EMAIL, SLACK_WEBHOOK_URL, CASE_STUDY_PASSWORD)
5. Deploy

- [ ] **Step 4: Configure custom domain**

In Vercel dashboard: Settings > Domains > Add `bfl.design`
Update DNS at your registrar to point to Vercel.

- [ ] **Step 5: Verify deployment**

Visit the Vercel preview URL. Confirm:
- Homepage renders with hero
- Navigation works (header, mobile tab bar, drawer)
- All page stubs render
- Blog index shows the welcome post
- Contact form renders (won't send without env vars in prod)

- [ ] **Step 6: Commit any final tweaks**

```bash
git add -A
git commit -m "chore: finalize project for deployment"
git push
```

---

## Phase 10: Content Migration (page-by-page)

### Task 16: Port WordPress page content

This is the ongoing work of porting actual content from each WordPress PHP template into the corresponding Next.js page. Work through pages one section at a time:

- [ ] **Step 1: Port homepage sections** from `front-page.php` → `src/app/page.tsx`
- [ ] **Step 2: Port Works page** from `template-works.php` → `src/app/works/page.tsx`
- [ ] **Step 3: Port Transformation page** from `template-transformation.php` → `src/app/transformation/page.tsx`
- [ ] **Step 4: Port Products overview** from `template-products.php` → `src/app/products/page.tsx`
- [ ] **Step 5: Port Low Ox Life** from `template-product-low-ox-life.php` → `src/app/products/low-ox-life/page.tsx`
- [ ] **Step 6: Port Bio Break** from `template-product-bio-break.php` → `src/app/products/bio-break/page.tsx`
- [ ] **Step 7: Port About page** from `template-about.php` → `src/app/about/page.tsx`
- [ ] **Step 8: Port About Ray** from `template-about-person.php` → `src/app/about/ray/page.tsx`
- [ ] **Step 9: Port Process page** from `template-design-process.php` → `src/app/process/page.tsx`
- [ ] **Step 10: Port remaining pages** (Support, Legal, Newsletter, AI Ethics, Clients, Workshop, Methodology)
- [ ] **Step 11: Commit each section as completed**

Each port follows the same pattern: read the PHP template, extract the content and layout, rebuild as a React component using MUI, matching the existing visual design.
