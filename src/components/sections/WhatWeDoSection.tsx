'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import Link from 'next/link';
import { colors, typography, radius } from '@/theme/tokens';

const pillars = [
  {
    title: 'Map the Real Flow',
    description: 'We see how work actually moves — where decisions stall, where ownership disappears, where people route around the system.',
    linkText: 'How we start',
    href: '/transformation',
  },
  {
    title: 'Restructure What\u2019s Broken',
    description: 'We realign decisions, ownership, and process so the system supports the work instead of fighting it.',
    linkText: 'How we realign',
    href: '/transformation',
  },
  {
    title: 'Make AI Fit',
    description: 'Once the system holds, AI stops being a bolt-on and becomes an accelerant.',
    linkText: 'See the results',
    href: '/works',
  },
];

export default function WhatWeDoSection() {
  return (
    <Box component="section" sx={{ pt: { xs: 12, md: 18 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ maxWidth: 640, mx: 'auto', textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: typography.sizes['3xl'], md: typography.sizes['4xl'] },
              fontWeight: typography.weights.semibold,
              mb: 3,
              lineHeight: typography.lineHeights.snug,
            }}
          >
            Here&apos;s how we fix it.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontSize: typography.sizes.lg, fontWeight: typography.weights.medium }}
          >
            We step into your system as it actually runs — not the org chart, not the docs.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: typography.sizes.base, lineHeight: typography.lineHeights.relaxed }}
          >
            Then we restructure it so decisions flow, ownership is clear, and AI has something real to run on.
          </Typography>
        </Box>

        {/* Three pillar cards */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {pillars.map((pillar) => (
            <Grid key={pillar.title} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: radius.card,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 4px 24px rgba(0,0,0,0.4)'
                      : '0 4px 24px rgba(0,0,0,0.06)',
                  height: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(0,0,0,0.5)'
                        : '0 8px 32px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: typography.sizes.xl,
                    fontWeight: typography.weights.semibold,
                    mb: 1.5,
                    lineHeight: typography.lineHeights.tight,
                  }}
                >
                  {pillar.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: typography.lineHeights.relaxed,
                    fontSize: typography.sizes.base,
                    mb: 2,
                    flex: 1,
                  }}
                >
                  {pillar.description}
                </Typography>
                <Typography
                  component={Link}
                  href={pillar.href}
                  sx={{
                    color: colors.button.primary.bg,
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.medium,
                    textDecoration: 'none',
                    '&:hover': { color: colors.button.primary.hover },
                  }}
                >
                  {pillar.linkText} →
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
