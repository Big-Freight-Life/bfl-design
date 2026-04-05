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
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
