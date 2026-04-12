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
        minHeight: { md: 430 },
      }}
    >
      {/* Diamond plate background — full width */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.paper : '#d8d8d8',
          backgroundImage: (theme) => {
            const highlight = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)';
            const shadow = theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)';
            const midtone = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
            return `
              url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='10' cy='10' rx='4' ry='1.5' transform='rotate(45 10 10)' fill='${encodeURIComponent(highlight)}' /%3E%3Cellipse cx='10' cy='10' rx='3.5' ry='1' transform='rotate(45 10 10)' fill='${encodeURIComponent(shadow)}' style='transform-origin:10px 10px;transform:rotate(45deg) translate(0.5px,0.5px)' /%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='10' cy='10' rx='4' ry='1.5' transform='rotate(-45 10 10)' fill='${encodeURIComponent(highlight)}' /%3E%3Cellipse cx='10' cy='10' rx='3.5' ry='1' transform='rotate(-45 10 10)' fill='${encodeURIComponent(shadow)}' style='transform-origin:10px 10px;transform:rotate(-45deg) translate(0.5px,0.5px)' /%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='${encodeURIComponent(midtone)}' /%3E%3Crect x='0' y='0' width='2' height='2' fill='${encodeURIComponent(highlight)}' opacity='0.3' /%3E%3C/svg%3E")
            `;
          },
          backgroundSize: '20px 20px, 20px 20px, 4px 4px',
          backgroundPosition: '0 0, 10px 10px, 0 0',
          zIndex: 0,
        }}
      />

      {/* Terminal — positioned on the right half, flush to screen edge */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '40%',
          display: { xs: 'none', md: 'flex' },
          bgcolor: (theme) => theme.palette.mode === 'dark' ? colors.surface.diamondPlate.dark : colors.surface.diamondPlate.light,
          zIndex: 1,
        }}
      >
        <ClaudeTerminal />
      </Box>

      {/* Content — uses Container for consistent padding */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          py: { xs: 8, md: 0 },
          minHeight: { md: 520 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ maxWidth: { md: '60%' }, pr: { md: 6 } }}>
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
            The technology isn&apos;t the problem.
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
            The system it runs inside is.
            <br />
            That&apos;s what we fix.
          </Typography>
          <Box sx={{ mb: 4 }} />

          <Box
            component={Link}
            href="/applied-ai-architect"
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
              label="Now Available"
              size="small"
              sx={{
                bgcolor: colors.badge.meet,
                color: (theme) => theme.palette.mode === 'dark' ? '#000' : '#fff',
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
      </Container>
    </Box>
  );
}
