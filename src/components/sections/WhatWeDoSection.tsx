'use client';

import { Box, Typography, Container } from '@mui/material';
import { typography } from '@/theme/tokens';

export default function WhatWeDoSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 640, mx: 'auto', textAlign: 'center' }}>
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
      </Container>
    </Box>
  );
}
