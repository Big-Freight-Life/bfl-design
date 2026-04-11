'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { colors, typography as typographyTokens, gradients } from '@/theme/tokens';
import DarkHeroSection from '@/components/common/DarkHeroSection';

export default function TransformationPage() {
  return (
    <Box>

      {/* ── Hero ── */}
      <DarkHeroSection
        component="header"
        sx={{ pt: { xs: 16, md: 24 }, pb: { xs: 10, md: 16 } }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3.5rem', sm: '5rem', md: '7rem', lg: '8.5rem' },
              fontWeight: 700,
              color: '#fff',
              lineHeight: 0.95,
              letterSpacing: typographyTokens.letterSpacing.tighter,
              mb: { xs: 5, md: 6 },
            }}
          >
            Fix the
            <br />
            <Box
              component="span"
              sx={{
                color: colors.primary.main,
                display: 'inline-block',
              }}
            >
              system.
            </Box>
          </Typography>
        </Container>
      </DarkHeroSection>

      {/* ── Opening lines ── */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 500,
                color: 'text.primary',
                lineHeight: 1.4,
                mb: 5,
              }}
            >
              You&apos;ve probably tried more tools already.
            </Typography>

            {/* Staccato lines */}
            <Box sx={{ mb: 5 }}>
              {[
                'New platform. New integration. New AI pilot.',
                'But the same problems keep showing up.',
              ].map((line) => (
                <Typography
                  key={line}
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 0.75,
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>

            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.625rem' },
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.4,
              }}
            >
              That&apos;s not a tooling problem. That&apos;s a system problem.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'divider' }} />
      </Box>

      {/* ── What we do ── */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1,
              letterSpacing: typographyTokens.letterSpacing.tight,
              mb: { xs: 6, md: 8 },
            }}
          >
            What we do
          </Typography>

          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 500,
                color: 'text.primary',
                lineHeight: 1.5,
                mb: 5,
              }}
            >
              We go inside the system as it actually runs.
            </Typography>

            <Box sx={{ mb: 5, pl: { xs: 2, md: 4 }, borderLeft: (theme) => `3px solid ${theme.palette.primary.main}` }}>
              {[
                'Not the org chart.',
                'Not the slide deck.',
              ].map((line) => (
                <Typography
                  key={line}
                  sx={{
                    fontSize: { xs: '1.0625rem', md: '1.25rem' },
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>

            <Box sx={{ mb: 5 }}>
              {[
                'How work really moves.',
                'Where decisions stall.',
                'Where ownership disappears.',
              ].map((line) => (
                <Typography
                  key={line}
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 0.5,
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>

            <Typography
              sx={{
                fontSize: { xs: '1.375rem', md: '1.75rem' },
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.4,
                mb: 6,
              }}
            >
              Then we fix it.
            </Typography>

            {/* Bullet list — styled as cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                'We make the real workflow visible',
                'We reconnect decisions to the people who own them',
                'We give AI a foundation that actually holds',
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: colors.primary.main,
                      mt: '10px',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: '1.0625rem', md: '1.25rem' },
                      color: 'text.primary',
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'divider' }} />
      </Box>

      {/* ── What changes ── */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1,
              letterSpacing: typographyTokens.letterSpacing.tight,
              mb: { xs: 6, md: 8 },
            }}
          >
            What changes
          </Typography>

          <Box sx={{ maxWidth: '44rem' }}>
            {[
              'Decisions stop bouncing between teams.',
              'People know what they own \u2014 and what they don\u2019t.',
              'Work flows the way everyone assumed it already did.',
              'And AI starts doing what you brought it in to do.',
            ].map((line, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.375rem' },
                  color: idx === 3 ? 'text.primary' : 'text.secondary',
                  fontWeight: idx === 3 ? 600 : 400,
                  lineHeight: 1.6,
                  mb: 1.5,
                }}
              >
                {line}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Closing statement ── */}
      <DarkHeroSection
        component="section"
        gradient={gradients.darkHero}
        sx={{ py: { xs: 12, md: 20 } }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontSize: { xs: '1.25rem', md: '1.625rem' },
              color: 'grey.400',
              lineHeight: 1.5,
              maxWidth: '36rem',
              mb: 4,
            }}
          >
            When the system works, everything else follows.
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: typographyTokens.letterSpacing.tighter,
              mb: { xs: 5, md: 6 },
            }}
          >
            Start with what&apos;s
            <br />
            <Box component="span" sx={{ color: colors.primary.main }}>
              real.
            </Box>
          </Typography>

          <Button
            component={Link}
            href="/contact"
            variant="contained"
            size="large"
            sx={{
              bgcolor: colors.button.primary.bg,
              color: '#fff',
              px: 5,
              py: 1.75,
              fontSize: '1.0625rem',
              '&:hover': { bgcolor: colors.button.primary.hover },
            }}
          >
            Start a Conversation
          </Button>
        </Container>
      </DarkHeroSection>

    </Box>
  );
}
