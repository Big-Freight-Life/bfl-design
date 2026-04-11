'use client';

import { Box, Container } from '@mui/material';

interface ArticleSectionProps {
  children: React.ReactNode;
  bg?: 'default' | 'alt' | 'dark';
  maxWidth?: string;
}

export default function ArticleSection({
  children,
  bg = 'default',
  maxWidth = '44rem',
}: ArticleSectionProps) {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        py: { xs: 8, md: 14 },
        bgcolor:
          bg === 'default'
            ? 'background.default'
            : bg === 'alt'
              ? theme.palette.mode === 'dark'
                ? 'grey.900'
                : 'grey.50'
              : '#0f172a',
        color: bg === 'dark' ? '#fff' : undefined,
      })}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth }}>{children}</Box>
      </Container>
    </Box>
  );
}
