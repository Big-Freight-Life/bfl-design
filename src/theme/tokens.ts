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

export const darkColors = {
  button: {
    primary: { bg: '#117680', hover: '#1a9aa6', text: '#ffffff' },
    secondary: { bg: 'rgba(255,255,255,0.1)', hover: 'rgba(255,255,255,0.15)', text: '#1a9aa6' },
    tertiary: { bg: 'rgba(255,255,255,0.08)', hover: 'rgba(255,255,255,0.15)', text: '#1a9aa6' },
  },
  primary: { main: '#2DD4BF', dark: '#14B8A6', light: '#5EEAD4' },
} as const;

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

export const spacing = {
  1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
  5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem',
  12: '3rem', 16: '4rem', 20: '5rem',
} as const;

export const radius = {
  sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem',
  '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem', full: '9999px',
  card: '1.5rem', cardLg: '2.125rem',
} as const;

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

export const motion = {
  easing: { outExpo: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  duration: {
    micro: '200ms', fast: '300ms', normal: '400ms', smooth: '500ms',
    reveal: '700ms', section: '1000ms', dramatic: '1400ms',
  },
  revealDistance: { default: '40px', sm: '20px' },
} as const;

export const zIndex = {
  dropdown: 100, sticky: 200, fixed: 300,
  modalBackdrop: 400, modal: 500, popover: 600, tooltip: 700,
} as const;

export const layout = {
  containerMaxWidth: '1400px',
  tabBarHeight: '64px',
} as const;

export const breakpoints = {
  xs: 0, sm: 480, md: 768, lg: 1024, xl: 1200, xxl: 1400,
} as const;
