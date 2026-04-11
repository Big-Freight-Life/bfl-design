'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';
import { colors, typography } from '@/theme/tokens';

export default function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 20 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: typography.sizes['3xl'], md: typography.sizes['4xl'] },
            fontWeight: typography.weights.semibold,
            mb: 2,
            lineHeight: typography.lineHeights.tight,
          }}
        >
          Your system won&apos;t fix itself.
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: typography.sizes.lg,
            mb: 5,
            mx: 'auto',
            maxWidth: 480,
            lineHeight: typography.lineHeights.relaxed,
          }}
        >
          Let&apos;s figure out what&apos;s underneath.
        </Typography>
        <Button
          component={Link}
          href="/contact"
          variant="contained"
          size="large"
          sx={{
            textTransform: 'none',
            bgcolor: colors.button.primary.bg,
            fontSize: typography.sizes.base,
            px: 4,
            py: 1.5,
            '&:hover': { bgcolor: colors.button.primary.hover },
          }}
        >
          Start a Conversation
        </Button>
      </Container>
    </Box>
  );
}
