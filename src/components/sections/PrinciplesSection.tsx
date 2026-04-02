'use client';

import { Box, Typography, Container } from '@mui/material';
import { colors, typography, spacing } from '@/theme/tokens';

// Each industry gets a unique font style — matching WordPress logo-style-1 through 10
const industries = [
  { name: 'FINANCE', fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: '0.05em' },
  { name: 'HEALTHCARE', fontFamily: "Georgia, serif", fontWeight: 400, letterSpacing: '0.2em', fontStyle: 'italic' },
  { name: 'HUMAN RESOURCES', fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: '0.3em' },
  { name: 'TECHNOLOGY', fontFamily: "system-ui, sans-serif", fontWeight: 300, letterSpacing: '0.4em' },
  { name: 'RETAIL', fontFamily: "'Times New Roman', serif", fontWeight: 700, letterSpacing: '0.1em', fontVariant: 'small-caps' as const },
  { name: 'MANUFACTURING', fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 800, letterSpacing: '0.02em' },
  { name: 'LOGISTICS', fontFamily: "'Lucida Console', monospace", fontWeight: 400, letterSpacing: '0.25em', textTransform: 'lowercase' as const },
  { name: 'EDUCATION', fontFamily: "Impact, sans-serif", fontWeight: 400, letterSpacing: '0.08em' },
  { name: 'GEN AI', fontFamily: "'Palatino Linotype', serif", fontWeight: 600, letterSpacing: '0.15em' },
  { name: 'INTEGRATIONS', fontFamily: "'Segoe UI', sans-serif", fontWeight: 200, letterSpacing: '0.35em' },
];

export default function PrinciplesSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      {/* What's Breaking */}
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 640,
            mx: 'auto',
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: typography.sizes['3xl'], md: typography.sizes['4xl'] },
              fontWeight: typography.weights.semibold,
              mb: 3,
            }}
          >
            What&apos;s Actually Breaking
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontSize: typography.sizes.lg }}
          >
            Teams don&apos;t struggle because they lack tools. They struggle because:
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {[
              "Decisions aren't connected",
              "Ownership isn't clear",
              "Systems don't reflect how work actually happens",
            ].map((item) => (
              <Box
                key={item}
                component="li"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body1" color="text.secondary">
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            So progress looks like movement—but doesn&apos;t hold.
          </Typography>
        </Box>
      </Container>

      {/* Industry Statement */}
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            fontWeight: typography.weights.bold,
            fontSize: typography.sizes.sm,
            color: 'text.primary',
            mb: 4,
            letterSpacing: typography.letterSpacing.widest,
            textTransform: 'uppercase',
          }}
        >
          Different domains. Same system problem.
        </Typography>
      </Container>

      {/* Industry Logo Carousel — each in a unique font */}
      <Box
        sx={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: spacing[8], md: spacing[12], lg: spacing[16] },
            alignItems: 'center',
            width: 'max-content',
            animation: { xs: 'marquee 45s linear infinite', md: 'marquee 60s linear infinite' },
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
            '&:hover': {
              animationPlayState: 'paused',
            },
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...industries, ...industries].map((item, index) => (
            <Typography
              key={`${item.name}-${index}`}
              component="span"
              sx={{
                fontSize: { xs: 'clamp(2rem, 5vw, 3.5rem)', md: 'clamp(2rem, 5vw, 3.5rem)' },
                fontFamily: item.fontFamily,
                fontWeight: item.fontWeight,
                letterSpacing: item.letterSpacing,
                fontStyle: item.fontStyle || 'normal',
                fontVariant: item.fontVariant || 'normal',
                textTransform: item.textTransform || 'uppercase',
                color: colors.gray[300],
                whiteSpace: 'nowrap',
                px: 2,
                userSelect: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: colors.gray[500],
                },
              }}
            >
              {item.name}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
