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
              Most teams don&apos;t have a tooling problem.
            </Typography>

            {/* Staccato lines */}
            <Box sx={{ mb: 5 }}>
              {[
                'Work moves.',
                'But decisions don\u2019t always connect.',
                'Ownership isn\u2019t always clear.',
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
              That&apos;s where things break.
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
              We step into how the system actually works.
            </Typography>

            <Box sx={{ mb: 5, pl: { xs: 2, md: 4 }, borderLeft: (theme) => `3px solid ${theme.palette.primary.main}` }}>
              {[
                'Not the roadmap.',
                'Not the documentation.',
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
                'The real flow of work.',
                'Where decisions happen.',
                'Where things slow down.',
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
                'We make work visible',
                'We align decisions and ownership',
                'We structure the system \u2014 so AI supports it, not fights it',
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
              'Work moves without getting stuck.',
              'Decisions are made with clarity.',
              'Ownership stays clear as things scale.',
              'AI fits into the system \u2014 instead of exposing its gaps.',
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
            Make the system
            <br />
            <Box component="span" sx={{ color: colors.primary.main }}>
              visible.
            </Box>
          </Typography>

          <Button
            component={Link}
            href="/transformation/workshop"
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
            View Workshop Details
          </Button>
        </Container>
      </DarkHeroSection>

    </Box>
  );
}
