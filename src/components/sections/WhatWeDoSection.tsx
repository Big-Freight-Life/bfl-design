'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import Link from 'next/link';
import { colors, typography, radius } from '@/theme/tokens';

const pillars = [
  {
    title: 'See the System',
    description: 'Understand how work actually moves—beyond documentation, into reality.',
    linkText: 'Step into the system',
    href: '/transformation',
  },
  {
    title: 'Reshape the System',
    description: 'Realign decisions, ownership, and structure so everything connects.',
    linkText: 'How we realign',
    href: '/transformation',
  },
  {
    title: 'Build What Holds',
    description: 'Design systems, tools, and AI that support the work at scale.',
    linkText: 'What we build',
    href: '/works',
  },
];

export default function WhatWeDoSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
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
            We step into the system as it exists.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontSize: typography.sizes.lg, fontWeight: typography.weights.medium }}
          >
            Not how it&apos;s documented, how it actually works.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: typography.sizes.base, lineHeight: typography.lineHeights.relaxed }}
          >
            Then we help teams realign it—so decisions connect, ownership is clear, and systems
            support the work they&apos;re meant to carry.
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
                  bgcolor: colors.gray[50],
                  height: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
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
