'use client';

import { Box, Typography, Container, Chip } from '@mui/material';
import Link from 'next/link';
import { colors, typography } from '@/theme/tokens';

export default function POVSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 16 },
        overflow: 'hidden',
        bgcolor: colors.gray[900],
        color: '#fff',
      }}
    >
      {/* Terminal background decoration */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
          fontSize: { xs: '0.65rem', md: '0.75rem' },
          lineHeight: 1.6,
          color: colors.primary.light,
          px: 4,
          overflow: 'hidden',
        }}
      >
        <Box component="pre" sx={{ whiteSpace: 'pre', m: 0 }}>
          {`> analyze system dependencies
  ✓ Mapping decision flows
  ✓ Surfacing ownership gaps
  ✓ Identifying bottlenecks

> design agent workflow
  ✓ Human–AI handoff points defined
  ✓ Escalation paths mapped
  ✓ Feedback loops established

? for shortcuts`}
        </Box>
      </Box>

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${colors.gray[900]} 50%, rgba(17,118,128,0.15) 100%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ maxWidth: 600 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: typography.sizes['2xl'], md: typography.sizes['3xl'] },
              fontWeight: typography.weights.semibold,
              color: '#fff',
              mb: 2,
              lineHeight: typography.lineHeights.snug,
            }}
          >
            Most companies try to fix things by adding more.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              mb: 2,
              fontSize: typography.sizes.lg,
            }}
          >
            More AI. More automation. More layers.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
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
              border: `1px solid rgba(255,255,255,0.15)`,
              bgcolor: 'rgba(255,255,255,0.06)',
              px: 2.5,
              py: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.25)',
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
                color: '#fff',
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
              }}
            >
              Applied AI Architect
            </Typography>
            <Typography component="span" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
              →
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
