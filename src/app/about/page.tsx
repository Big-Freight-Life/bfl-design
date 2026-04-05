'use client';

import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { colors, darkColors, typography } from '@/theme/tokens';

const credentials = [
  {
    issuer: 'MIT CSAIL',
    title: 'Human-Computer Interaction for UX Design',
    href: 'https://www.credential.net/ac2075af-00de-4419-9840-35759ab5d09f',
  },
  { issuer: 'IBM', title: 'AI Product Manager' },
  { issuer: 'Stanford Online', title: 'AI in Healthcare' },
  { issuer: 'Wharton (UPenn)', title: 'AI Strategy and Governance' },
  { issuer: 'CDI', title: 'Certified Conversation Designer' },
];

const whereWeWork = [
  'enterprise systems',
  'multi-team workflows',
  'AI-driven products',
  'operational platforms where decisions carry real weight',
];

export default function AboutPage() {
  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          py: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden',
        }}
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
              We design how systems think.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {[
                'Not just how they look.',
                'Not just how they function.',
                'How decisions are made.',
                'How work moves.',
                'How AI operates within real environments.',
              ].map((line) => (
                <Typography
                  key={line}
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.7,
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Section 1 — What This Is */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 4 }}
            >
              Most teams don&#39;t struggle to build.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3, fontSize: '1.0625rem' }}>
              They struggle to make everything work together.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
              {[
                'AI accelerated execution.',
                'It didn\u2019t solve alignment.',
                'It didn\u2019t define ownership.',
                'It didn\u2019t fix broken systems.',
              ].map((line) => (
                <Typography key={line} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {line}
                </Typography>
              ))}
            </Box>
            <Typography
              variant="body1"
              sx={{ color: (theme) => theme.palette.mode === 'dark' ? darkColors.button.secondary.text : colors.button.primary.bg, fontWeight: 500, fontSize: '1.0625rem' }}
            >
              That gap is where we work.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Section 2 — What We Do */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 4 }}
            >
              We practice Applied AI Architecture.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4, fontSize: '1.0625rem' }}>
              Where experience design, product strategy, and AI are not separate tracks—but part of the same system.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, fontSize: '1.0625rem' }}>
              We step into environments where:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4, color: 'text.secondary' }}>
              {[
                'decisions don\u2019t connect',
                'workflows break under pressure',
                'AI is introduced without structure',
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 0.5 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '1.0625rem' }}>
              Then we redesign the system itself—so everything works as one.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Section 3 — How We Think */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 4 }}
            >
              Most teams focus on outputs. We design the system that produces them.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, fontSize: '1.0625rem' }}>
              Because:
            </Typography>
            <Box sx={{ pl: 3, borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`, mb: 4 }}>
              {[
                'AI without structure creates noise',
                'tools without alignment create friction',
                'speed without clarity creates risk',
              ].map((line) => (
                <Typography key={line} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.0625rem' }}>
                  {line}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1, fontSize: '1.0625rem' }}>
              We don&#39;t start with features.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1, fontSize: '1.0625rem' }}>
              We start with how the system actually behaves.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '1.0625rem' }}>
              Then we make it coherent.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Section 4 — What Makes This Different */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 3 }}
            >
              This is system-level architecture for applied AI.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 4 }}>
              {[
                'This is not traditional UX.',
                'This is not AI implementation.',
                'This is not another layer of tooling.',
              ].map((line) => (
                <Typography key={line} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {line}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, fontSize: '1.0625rem' }}>
              Where:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4, color: 'text.secondary' }}>
              {[
                'workflows are mapped as they truly operate',
                'decision points are made visible',
                'ownership is clearly defined',
                'AI is embedded where it strengthens\u2014not replaces\u2014thinking',
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 0.5 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '1.0625rem' }}>
              The result is not more output. It&#39;s a system that can scale, adapt, and hold under complexity.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Section 5 — Where We Work */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 4 }}
            >
              Our work lives inside complex environments.
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {whereWeWork.map((item) => (
                <Grid size={{ xs: 12, sm: 6 }} key={item}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '0.75rem',
                      height: '100%',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{item}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1, fontSize: '1.0625rem' }}>
              Not simplified use cases.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '1.0625rem' }}>
              Real systems. Real constraints.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Meet the Founder */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                component="img"
                src="/images/ray-butler-profile.png"
                alt="Ray Butler"
                sx={{
                  width: '100%',
                  maxWidth: 320,
                  borderRadius: '1.5rem',
                  display: 'block',
                  mx: 'auto',
                }}
              />
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
                Ray is a design technologist who works across product design, engineering, and system
                architecture. He designs and builds iOS applications for health and wellness, moving
                from concept to production independently.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 4 }}>
                His training spans human-computer interaction, AI strategy, and conversation design.
                What defines his work is the ability to ship products that are precise enough to
                trust and clear enough to use.
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

      {/* Credentials */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 5, fontWeight: 600 }}>
              Credentials
            </Typography>
            <Grid container spacing={2}>
              {credentials.map((cred) => (
                <Grid size={{ xs: 12, sm: 6 }} key={cred.issuer}>
                  <Paper
                    component={cred.href ? 'a' : 'div'}
                    href={cred.href}
                    target={cred.href ? '_blank' : undefined}
                    rel={cred.href ? 'noopener noreferrer' : undefined}
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '0.75rem',
                      display: 'block',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      '&:hover': cred.href
                        ? { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(20,184,166,0.12)' }
                        : {},
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.08em', display: 'block', mb: 0.5 }}
                    >
                      {cred.issuer}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {cred.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Section 6 — Closing */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, mb: 1, fontSize: '1.0625rem' }}>
              Most organizations are moving faster than their systems can support.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, mb: 4, fontSize: '1.0625rem' }}>
              That&#39;s where things break. Not because of effort—but because the foundation isn&#39;t designed to hold.
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#fff', fontWeight: 600, mb: 1 }}
            >
              We design that foundation.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.primary.main, fontWeight: 500, fontSize: '1.0625rem' }}
            >
              This is where our work begins.
            </Typography>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
