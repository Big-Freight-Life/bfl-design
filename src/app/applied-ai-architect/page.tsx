'use client';

import { Box, Container, Typography, Button, Chip, Grid } from '@mui/material';
import Link from 'next/link';
import { colors, typography, gradients, radius } from '@/theme/tokens';
import DarkHeroSection from '@/components/common/DarkHeroSection';

const keyPoints = [
  {
    title: 'System design, not tool selection',
    description:
      'We don\u2019t recommend platforms. We restructure how work moves so AI has something real to plug into.',
  },
  {
    title: 'Strategy, design, engineering, and distribution \u2014 one practice',
    description:
      'Most teams split these across roles that don\u2019t talk to each other. Here, one practice holds all four \u2014 so the system you get is coherent from strategy through distribution.',
  },
  {
    title: 'Operational, not theoretical',
    description:
      'We work inside your real environment. Not an idealized version of it. The architecture has to hold under the conditions you actually operate in.',
  },
];

const facets = [
  {
    title: 'Reads the real system',
    description:
      'Maps how work actually moves, where decisions stall, and where AI is being forced into places it doesn\u2019t fit. Not from documentation. From the inside.',
  },
  {
    title: 'Designs architecture that holds',
    description:
      'Structures decision flows, ownership, data paths, and integration points so AI operates within real conditions \u2014 not idealized ones.',
  },
  {
    title: 'Ships what was designed',
    description:
      'Strategy, design, engineering, and distribution happen in one loop. No translation layers. No gap between the plan and what gets built.',
  },
];

export default function AppliedAIArchitectPage() {
  return (
    <Box>

      {/* ── Section 1: Hero ── */}
      <DarkHeroSection
        component="header"
        sx={{ pt: { xs: 16, md: 24 }, pb: { xs: 10, md: 16 } }}
      >
        <Container maxWidth="lg">
          <Chip
            label="Applied AI Architecture"
            size="small"
            sx={{
              bgcolor: colors.badge.meet,
              color: '#fff',
              fontWeight: typography.weights.semibold,
              fontSize: typography.sizes.xs,
              height: 24,
              mb: 4,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: typography.letterSpacing.tighter,
              mb: { xs: 4, md: 5 },
            }}
          >
            Your system needs
            <br />
            an architect.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: 'grey.400',
              lineHeight: 1.6,
              maxWidth: '40rem',
            }}
          >
            AI doesn&apos;t fail because of the model. It fails because nobody
            designed the system it runs inside.
          </Typography>
        </Container>
      </DarkHeroSection>

      {/* ── Section 2: Agitate ── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                mb: 5,
              }}
            >
              You&apos;ve seen this before.
            </Typography>
            <Box sx={{ mb: 5 }}>
              {[
                'AI pilot launches. Looks promising.',
                'Six months later, it\u2019s still a pilot.',
                'Nobody can explain why it hasn\u2019t scaled.',
                'The model works fine. The system around it doesn\u2019t.',
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
              Without architecture, AI stays stuck in demo mode.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'divider' }} />
      </Box>

      {/* ── Section 3: What Applied AI Architecture Is ── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          py: { xs: 10, md: 16 },
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        }}
      >
        {/* Claude sparkle — top right */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 24, md: 40 },
            right: { xs: 24, md: 48 },
            opacity: 0.12,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" fill="#D97706" />
          </svg>
        </Box>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: typography.letterSpacing.tight,
                mb: 4,
              }}
            >
              Applied AI Architecture
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              It&apos;s the practice of designing the system that AI operates
              inside. Not the model. Not the prompt. The decisions, workflows,
              ownership structures, and data flows that determine whether AI
              actually delivers.
            </Typography>
          </Box>
        </Container>

        <Container maxWidth={false} sx={{ maxWidth: '1600px' }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {keyPoints.map((point) => (
              <Grid key={point.title} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: { xs: 4, md: 5 },
                    borderRadius: radius.card,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 4px 24px rgba(0,0,0,0.4)'
                        : '0 4px 24px rgba(0,0,0,0.06)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: typography.sizes.lg,
                      fontWeight: typography.weights.semibold,
                      mb: 1.5,
                      lineHeight: typography.lineHeights.tight,
                    }}
                  >
                    {point.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: typography.lineHeights.relaxed,
                      fontSize: typography.sizes.base,
                    }}
                  >
                    {point.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'divider' }} />
      </Box>

      {/* ── Section 4: What an Applied AI Architect Does ── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: typography.letterSpacing.tight,
                mb: 4,
              }}
            >
              What an Applied AI Architect does
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              An Applied AI Architect operates across the entire system &mdash;
              from strategy to distribution. Deep enough to build in every layer.
              Broad enough to see how they connect.
            </Typography>
          </Box>

          <Box sx={{ maxWidth: '44rem' }}>
            {facets.map((facet, idx) => (
              <Box
                key={facet.title}
                sx={{
                  mb: idx < facets.length - 1 ? 5 : 0,
                  pb: idx < facets.length - 1 ? 5 : 0,
                  borderBottom:
                    idx < facets.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  {facet.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, fontSize: '1.0625rem' }}
                >
                  {facet.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'divider' }} />
      </Box>

      {/* ── Section 5: What Changes ── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: typography.letterSpacing.tight,
              mb: { xs: 6, md: 8 },
            }}
          >
            What changes
          </Typography>

          <Box sx={{ maxWidth: '44rem' }}>
            {[
              'AI projects stop stalling at the pilot stage.',
              'Decisions flow through the system instead of around it.',
              'Teams stop debating tools and start delivering.',
              'The system supports the work \u2014 and the AI \u2014 at scale.',
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
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.625rem' },
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.4,
                mt: 4,
              }}
            >
              That&apos;s what architecture makes possible.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Section 6: CTA ── */}
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
            If your AI investments aren&apos;t producing results, the system is
            the place to start.
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: typography.letterSpacing.tighter,
              mb: { xs: 2, md: 3 },
            }}
          >
            Book a discovery call.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: 'grey.400',
              lineHeight: 1.5,
              maxWidth: '36rem',
              mb: { xs: 5, md: 6 },
            }}
          >
            30 minutes. No pitch. We&apos;ll look at your system together and
            figure out what&apos;s underneath.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3 }}>
            <Button
              component="a"
              href="#book"
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
              Book a Call
            </Button>
            <Box
              component={Link}
              href="/contact"
              sx={{
                color: 'grey.400',
                fontSize: '1.0625rem',
                textDecoration: 'none',
                '&:hover': { color: '#fff' },
              }}
            >
              Or start with a message &rarr;
            </Box>
          </Box>
        </Container>
      </DarkHeroSection>

    </Box>
  );
}
