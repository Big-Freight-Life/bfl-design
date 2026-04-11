'use client';

import { Box, Container, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { colors, darkColors, gradients } from '@/theme/tokens';
import DarkHeroSection from '@/components/common/DarkHeroSection';

export default function AboutPage() {
  return (
    <Box>

      {/* Hero */}
      <DarkHeroSection
        component="section"
        gradient={gradients.darkHero135Mid}
        sx={{ py: { xs: 12, md: 20 } }}
        dotMatrix={false}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '52rem' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: 'clamp(2.25rem, 5vw, 3.5rem)' },
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1.2,
                mb: 4,
              }}
            >
              We&apos;ve been inside systems like yours.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.7,
                mb: 1,
              }}
            >
              Big Freight Life is an applied AI architecture practice.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#fff',
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 500,
                lineHeight: 1.7,
              }}
            >
              We help organizations fix the systems that AI is supposed to run on.
            </Typography>
          </Box>
        </Container>
      </DarkHeroSection>

      {/* Section 2 — The Problem */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 4 }}
            >
              Nobody planned for this.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4 }}>
              Systems evolved. Layer by layer. Tool by tool. Team by team.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4 }}>
              Until decisions stopped connecting, ownership got fuzzy, and work started moving differently than anyone described.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4 }}>
              AI didn&apos;t cause this. It just made it impossible to ignore.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                Better UX didn&apos;t fix it.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                More tools didn&apos;t fix it.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                AI on its own definitely didn&apos;t fix it.
              </Typography>
            </Box>
            <Box sx={{ pl: 3, borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`, mb: 4 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.0625rem', fontStyle: 'italic' }}>
                From designing interfaces &rarr;
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, fontSize: '1.0625rem', fontWeight: 500, fontStyle: 'italic' }}>
                to designing how the system itself operates.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Section 3 — What We Do */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 4 }}
            >
              We work where it&apos;s messy&mdash;
              <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                {' '}not where it&apos;s clean.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4, fontSize: '1.0625rem' }}>
              We step into the system as it actually runs &mdash; enterprise systems, operational workflows, AI-driven products &mdash; and redesign it so everything connects.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, fontSize: '1.0625rem' }}>
              We start with what&apos;s actually happening:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4, color: 'text.secondary' }}>
              {[
                'How work moves',
                'Where decisions stall',
                'Where ownership disappears',
                'Where AI is being forced into the wrong places',
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 0.5 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1, fontSize: '1.0625rem' }}>
              Then we restructure it so the system supports the work it&apos;s meant to carry.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '1.0625rem', mb: 4 }}>
              We call this Applied AI Architecture.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '1.0625rem' }}>
              The result: fewer disconnected tools, clearer decision paths, and a system that can actually support AI. Because AI only works as well as the system underneath it.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Meet the Founder */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src="/images/ray-butler-profile.png"
                  alt="Ray Butler"
                  width={320}
                  height={320}
                  style={{
                    width: '100%',
                    maxWidth: 320,
                    height: 'auto',
                    borderRadius: '1.5rem',
                    display: 'block',
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', letterSpacing: '0.1em', display: 'block', mb: 1 }}
              >
                Meet the Founder
              </Typography>
              <Typography variant="h2" sx={{ mb: 0.5, fontWeight: 600 }}>
                Ray Butler
              </Typography>
              <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 500, mb: 3 }}>
                Designer, Builder, Founder
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 2 }}>
                Ray has spent his career inside complex systems &mdash; designing, building, and fixing how they actually work. Not the interface. The system underneath.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 2 }}>
                His work centers on Applied AI Architecture: structuring systems so AI operates clearly, predictably, and within real-world conditions.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 4 }}>
                He helps organizations stop working around their systems and start working through them.
              </Typography>
              <Button
                component="a"
                href="https://www.linkedin.com/in/braybutler/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                sx={(theme) => ({
                  borderColor: theme.palette.mode === 'dark' ? darkColors.button.secondary.text : colors.button.primary.bg,
                  color: theme.palette.mode === 'dark' ? darkColors.button.secondary.text : colors.button.primary.bg,
                  '&:hover': {
                    borderColor: theme.palette.mode === 'dark' ? darkColors.button.primary.hover : colors.button.primary.hover,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(26,154,166,0.08)' : 'rgba(17,118,128,0.04)',
                  },
                })}
              >
                Connect on LinkedIn
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section 6 — Closing */}
      <DarkHeroSection
        component="section"
        gradient={gradients.darkHero135}
        sx={{ py: { xs: 10, md: 16 } }}
        dotMatrix={false}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, mb: 4, fontSize: '1.0625rem' }}>
                You&apos;re moving fast. Your system isn&apos;t keeping up.
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#fff', fontWeight: 600, mb: 1 }}
              >
                We design the foundation that makes everything else possible.
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, mb: 5, fontSize: '1.0625rem' }}>
                Without it, nothing holds.
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
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ borderLeft: { md: '1px solid rgba(255,255,255,0.12)' }, pl: { md: 5 } }}>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', display: 'block', mb: 3 }}>
                  Contact
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, mb: 0.5 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                    Big Freight Life LLC
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                    1351 N Buckner Blvd #180397
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                    Dallas, TX 75218
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, mb: 0.5 }}>
                    Email
                  </Typography>
                  <Box
                    component="a"
                    href="mailto:hello@bflux.co"
                    sx={{ color: colors.primary.main, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}
                  >
                    hello@bflux.co
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, mb: 0.5 }}>
                    Business Hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                    Monday &ndash; Friday, 9am &ndash; 6pm CT
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </DarkHeroSection>

    </Box>
  );
}
