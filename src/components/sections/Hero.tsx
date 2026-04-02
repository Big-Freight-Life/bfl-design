'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { colors, typography, spacing } from '@/theme/tokens';

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '80vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.75rem)' },
              fontWeight: typography.weights.normal,
              lineHeight: typography.lineHeights.tight,
              mb: 1,
            }}
          >
            The problem was always there.
          </Typography>
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.75rem)' },
              fontWeight: typography.weights.bold,
              lineHeight: typography.lineHeights.tight,
              display: 'block',
              mb: 3,
            }}
          >
            AI just made it visible.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 500, fontSize: typography.sizes.lg }}
          >
            We help teams build systems that work.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/transformation"
              variant="contained"
              size="large"
              sx={{
                textTransform: 'none',
                bgcolor: colors.button.primary.bg,
                '&:hover': { bgcolor: colors.button.primary.hover },
              }}
            >
              Explore Transformation
            </Button>
            <Button
              component={Link}
              href="/works"
              variant="outlined"
              size="large"
              sx={{
                textTransform: 'none',
                borderColor: colors.button.primary.bg,
                color: colors.button.primary.bg,
                '&:hover': {
                  borderColor: colors.button.primary.hover,
                  bgcolor: colors.button.secondary.hover,
                },
              }}
            >
              See the Work
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: spacing[8],
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.secondary',
          opacity: 0.6,
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: typography.letterSpacing.wider }}>
          Scroll
        </Typography>
        <Box
          component="svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </Box>
      </Box>
    </Box>
  );
}
