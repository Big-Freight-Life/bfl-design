'use client';

import { Box, Typography, Container, Chip } from '@mui/material';
import Link from 'next/link';
import { colors, typography } from '@/theme/tokens';
import ClaudeTerminal from './ClaudeTerminal';

export default function POVSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // Desktop: fixed height, side-by-side. Mobile: stacked.
        height: { xs: 'auto', md: 430 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left half: Text content with gray bg */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#e8e8e8',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          py: { xs: 8, md: 0 },
          px: { xs: 3, md: 0 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { md: 600 },
            ml: { md: 'auto' },
            px: { md: 8 },
            pr: { md: 10, lg: 12 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: typography.sizes['2xl'], md: typography.sizes['3xl'] },
              fontWeight: typography.weights.semibold,
              color: 'text.primary',
              mb: 2,
              lineHeight: typography.lineHeights.snug,
            }}
          >
            You need a designer.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 2,
              fontSize: typography.sizes.lg,
            }}
          >
            More AI. More automation. More layers.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: typography.sizes.base,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            But the issue isn&apos;t what&apos;s being added. It&apos;s what was never designed in the
            first place. That takes a different kind of designer.
          </Typography>

          <Box
            component={Link}
            href="/transformation"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              borderRadius: '9999px',
              border: `1px solid rgba(0,0,0,0.12)`,
              bgcolor: 'rgba(0,0,0,0.04)',
              px: 2.5,
              py: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.08)',
                borderColor: 'rgba(0,0,0,0.2)',
              },
            }}
          >
            <Chip
              label="New"
              size="small"
              sx={{
                bgcolor: colors.primary.main,
                color: '#fff',
                fontWeight: typography.weights.semibold,
                fontSize: typography.sizes.xs,
                height: 22,
              }}
            />
            <Typography
              component="span"
              sx={{
                color: 'text.primary',
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
              }}
            >
              Applied AI Architect
            </Typography>
            <Typography component="span" sx={{ color: 'text.secondary', fontSize: 14 }}>
              →
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right half: Animated terminal (full bleed) */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0e0e0e' : '#e8e8e8',
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <ClaudeTerminal />
      </Box>
    </Box>
  );
}
