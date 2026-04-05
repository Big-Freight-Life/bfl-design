'use client';

import { Box, Container, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';

const profiles = [
  {
    title: 'A Solopreneur Wearing Every Hat',
    description:
      "You're building alone and need intelligent systems that multiply your capacity without multiplying your complexity.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'A Small Team Scaling Up',
    description:
      "You're growing fast and need systems that scale with you, not bolt-on tools that create more work.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Exploring AI Adoption',
    description:
      'You know AI can help, but you need someone to separate signal from noise and design systems that actually fit your operations.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Minority- or Founder-Led',
    description:
      'You operate with precision because the margin for error is smaller. You want a partner who understands that reality.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function ClientsPage() {
  return (
    <Box>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 14 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1 }}>
            Who We Serve
          </Typography>
          <Typography
            variant="h1"
            sx={{ mb: 3, maxWidth: 700, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Built for teams{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              doing meaningful work.
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 580 }}>
            We work with small and minority-owned businesses navigating complexity, adopting AI, and building intelligent systems they can trust.
          </Typography>
        </Container>
      </Box>

      {/* Who We Work With */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 720 }}>
            <Typography variant="h2" sx={{ mb: 3 }}>Who We Work With</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Big Freight Life is purpose-built for solopreneurs, founders, and operators running businesses in complex, real-world conditions. Whether you&apos;re a one-person operation or leading a growing team, constrained resources and increasing demands are the norm, not the exception.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Our clients want AI to support better decisions, not introduce new uncertainty. They value clarity, structure, and systems designed to evolve alongside their business.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Ideal Client Profiles */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: 'grey.50',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6 }}>
            We&apos;re a Good Fit If You&apos;re...
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {profiles.map((profile) => (
              <Paper
                key={profile.title}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box sx={{ color: 'primary.main' }}>{profile.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{profile.title}</Typography>
                <Typography variant="body2" color="text.secondary">{profile.description}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2 }}>Sound like you?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560, mx: 'auto' }}>
            Whether you&apos;re navigating AI adoption, redesigning a service, or building something new, we&apos;d love to hear from you.
          </Typography>
          <Button component={Link} href="/contact" variant="contained" size="large">
            Get in Touch
          </Button>
        </Container>
      </Box>

    </Box>
  );
}
