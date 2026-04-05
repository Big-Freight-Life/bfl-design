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
          bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.paper : '#d8d8d8',
          backgroundImage: (theme) => {
            const highlight = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)';
            const shadow = theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)';
            const midtone = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
            // Diamond plate pattern using layered SVG-encoded background images
            return `
              url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='10' cy='10' rx='4' ry='1.5' transform='rotate(45 10 10)' fill='${encodeURIComponent(highlight)}' /%3E%3Cellipse cx='10' cy='10' rx='3.5' ry='1' transform='rotate(45 10 10)' fill='${encodeURIComponent(shadow)}' style='transform-origin:10px 10px;transform:rotate(45deg) translate(0.5px,0.5px)' /%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='10' cy='10' rx='4' ry='1.5' transform='rotate(-45 10 10)' fill='${encodeURIComponent(highlight)}' /%3E%3Cellipse cx='10' cy='10' rx='3.5' ry='1' transform='rotate(-45 10 10)' fill='${encodeURIComponent(shadow)}' style='transform-origin:10px 10px;transform:rotate(-45deg) translate(0.5px,0.5px)' /%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='${encodeURIComponent(midtone)}' /%3E%3Crect x='0' y='0' width='2' height='2' fill='${encodeURIComponent(highlight)}' opacity='0.3' /%3E%3C/svg%3E")
            `;
          },
          backgroundSize: '20px 20px, 20px 20px, 4px 4px',
          backgroundPosition: '0 0, 10px 10px, 0 0',
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
            You don&apos;t need more tools.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 2,
              fontSize: typography.sizes.base,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The issue isn&apos;t what&apos;s being added.
            <br />
            It&apos;s what was never designed.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: typography.sizes.base,
              lineHeight: typography.lineHeights.relaxed,
              fontWeight: typography.weights.medium,
            }}
          >
            We fix that.
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
              border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? colors.surface.darkCard : colors.surface.lightCard,
              px: 2.5,
              py: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: (theme) => theme.palette.mode === 'dark' ? colors.surface.darkCardHover : colors.surface.lightCardHover,
                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
              },
            }}
          >
            <Chip
              label="Meet"
              size="small"
              sx={{
                bgcolor: colors.badge.meet,
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
          bgcolor: (theme) => theme.palette.mode === 'dark' ? colors.surface.diamondPlate.dark : colors.surface.diamondPlate.light,
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
