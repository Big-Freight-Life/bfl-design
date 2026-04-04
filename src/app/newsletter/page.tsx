'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, useTheme } from '@mui/material';
import { colors, darkColors } from '@/theme/tokens';

function SignupForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const btnColors = isDark ? darkColors.button.primary : colors.button.primary;

  return (
    <Box
      component="form"
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      noValidate
      aria-label="Newsletter signup"
    >
      {submitted ? (
        <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
          Thanks for subscribing!
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              id={id}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              autoComplete="email"
              fullWidth
              sx={{ flex: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                whiteSpace: 'nowrap',
                bgcolor: btnColors.bg,
                color: btnColors.text,
                '&:hover': { bgcolor: btnColors.hover },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

const whatYoullGet = [
  'How systems actually break',
  'Where AI creates friction instead of value',
  'What changes when decisions, ownership, and workflows align',
];

const whoItsFor = [
  'Teams dealing with complexity.',
  'Leaders responsible for outcomes.',
  'People trying to make AI actually work inside real systems.',
];

export default function NewsletterPage() {
  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 14 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'grey.50',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 6, md: 10 },
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1 }}>
                Newsletter
              </Typography>
              <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Not everything gets published.
              </Typography>
              <Box sx={{ mb: 4, maxWidth: 520 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Some of the most important work doesn&apos;t make it to the site.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  It happens earlier.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  While systems are being mapped.{' '}
                  While decisions are being challenged.{' '}
                  While things are still unclear.
                </Typography>
              </Box>
              <SignupForm id="nl-email-hero" />
            </Box>

            <Box
              sx={{
                width: { xs: 200, md: 280 },
                flexShrink: 0,
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%">
                <rect x="10" y="40" width="180" height="110" rx="12" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                <path d="M10 52 L100 110 L190 52" stroke="#d1d5db" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="35" y="10" width="130" height="80" rx="8" fill="#14B8A6" opacity="0.15" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="55" y1="35" x2="145" y2="35" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                <line x1="55" y1="50" x2="125" y2="50" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
                <line x1="55" y1="65" x2="110" y2="65" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                <circle cx="30" cy="25" r="4" fill="#06B6D4" opacity="0.6" />
                <circle cx="170" cy="20" r="3" fill="#F87171" opacity="0.5" />
                <circle cx="160" cy="130" r="5" fill="#A855F7" opacity="0.4" />
              </svg>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* What You'll Get */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h2" sx={{ mb: 4 }}>What you&apos;ll get</Typography>
            {whatYoullGet.map((item) => (
              <Typography key={item} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                {item}
              </Typography>
            ))}
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Not trends.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Not recycled takes.
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                The thinking behind the work.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Who This Is For */}
      <Box
        component="section"
        sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h2" sx={{ mb: 4 }}>Who this is for</Typography>
            {whoItsFor.map((line) => (
              <Typography key={line} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                {line}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Join CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 14 },
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ maxWidth: 480 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Join</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Get it before it&apos;s obvious.
            </Typography>
            <SignupForm id="nl-email-cta" />
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
