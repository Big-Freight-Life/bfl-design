import { createTheme } from '@mui/material/styles';
import { colors, darkColors, typography, breakpoints, radius } from './tokens';

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
    primary: { main: colors.primary.main, dark: colors.primary.dark, light: colors.primary.light, contrastText: colors.button.primary.text },
    secondary: { main: colors.accent.purple },
    error: { main: colors.semantic.error },
    warning: { main: colors.semantic.warning },
    success: { main: colors.semantic.success },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: colors.gray[900], secondary: colors.gray[700] },
    divider: colors.gray[200],
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: colors.button.primary.text,
          '&:hover': { color: colors.button.primary.text },
        },
      },
    },
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
    background: { default: darkColors.bg.default, paper: darkColors.bg.paper },
    text: { primary: darkColors.bg.text, secondary: darkColors.bg.textSecondary },
    divider: darkColors.bg.divider,
    grey: {
      50: '#1e1e1e',
      100: '#252525',
      200: '#333333',
      300: '#404040',
      400: '#525252',
      500: '#6b7280',
      600: '#9ca3af',
      700: '#d1d5db',
      800: '#e5e7eb',
      900: '#171717',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: colors.button.primary.text,
          '&:hover': { color: colors.button.primary.text },
        },
      },
    },
  },
});
