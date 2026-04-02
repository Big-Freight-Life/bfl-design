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
          Alignment is what scales.
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
          Everything else breaks under pressure.
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
          Get in Touch
        </Button>
      </Container>
    </Box>
  );
}
