import type { Metadata } from 'next';
import { Box } from '@mui/material';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileTabBar from '@/components/layout/MobileTabBar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import { layout } from '@/theme/tokens';

export const metadata: Metadata = {
  title: 'BFL Design | Applied AI Architecture & Design',
  description: 'Big Freight Life helps organizations design systems that actually work — applied AI architecture, workflow design, and operational clarity for complex environments.',
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
