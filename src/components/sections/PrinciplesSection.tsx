'use client';

import { Box, Typography, Container } from '@mui/material';
import { colors, typography, spacing } from '@/theme/tokens';

const industries = [
  'FINANCE',
  'HEALTHCARE',
  'HUMAN RESOURCES',
  'TECHNOLOGY',
  'RETAIL',
  'MANUFACTURING',
  'LOGISTICS',
  'EDUCATION',
  'GEN AI',
  'INTEGRATIONS',
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                  mb: 1,
                  color: 'text.secondary',
                  fontSize: typography.sizes.base,
                  '&::before': {
                    content: '"—"',
                    color: colors.primary.main,
                    flexShrink: 0,
                  },
                }}
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
            fontWeight: typography.weights.medium,
            fontSize: typography.sizes.lg,
            color: 'text.secondary',
            mb: 4,
            letterSpacing: typography.letterSpacing.wide,
          }}
        >
          Different domains. Same system problem.
        </Typography>
      </Container>

      {/* Industry Logo Carousel */}
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
            gap: spacing[8],
            width: 'max-content',
            animation: 'marquee 30s linear infinite',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...industries, ...industries].map((industry, index) => (
            <Typography
              key={`${industry}-${index}`}
              component="span"
              sx={{
                fontSize: { xs: typography.sizes.sm, md: typography.sizes.base },
                fontWeight: typography.weights.semibold,
                letterSpacing: typography.letterSpacing.widest,
                color: index % 3 === 0
                  ? colors.primary.main
                  : index % 3 === 1
                  ? 'text.primary'
                  : 'text.secondary',
                whiteSpace: 'nowrap',
                px: 2,
              }}
            >
              {industry}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
