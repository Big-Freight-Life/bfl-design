'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, Paper, TextField } from '@mui/material';

const valueCards = [
  {
    title: 'Product Updates',
    description: 'Be the first to know about new features and app releases across Low Ox Life, Bio Break, and more.',
  },
  {
    title: 'Design Insights',
    description: 'Behind-the-scenes looks at our design process, decisions, and the thinking behind every pixel.',
  },
  {
    title: 'Health Tech Trends',
    description: 'Curated insights on health tracking, wellness technology, and the future of personal health data.',
  },
  {
    title: 'Exclusive Content',
    description: 'Early access to articles, guides, and resources before they go public on the blog.',
  },
];

const topics = [
  { tag: 'UX Design', date: 'Mar 2026', title: "How We Designed Low Ox Life's Search Experience" },
  { tag: 'Best Practices', date: 'Feb 2026', title: '5 Principles of Health App UX' },
  { tag: 'Accessibility', date: 'Feb 2026', title: 'Building Accessible iOS Apps: Our Approach' },
  { tag: 'Industry', date: 'Jan 2026', title: 'The Future of Personal Health Data' },
  { tag: 'Case Study', date: 'Jan 2026', title: "From Idea to App Store: Bio Break's Journey" },
  { tag: 'Privacy', date: 'Dec 2025', title: 'Privacy-First Design in Health Tech' },
];

const stats = [
  { label: 'Published', value: 'Bi-weekly' },
  { label: 'Avg. read time', value: '4 min' },
  { label: 'Topics covered', value: '50+' },
  { label: 'Open rate', value: '68%' },
];

const testimonials = [
  {
    text: 'The perfect blend of design thinking and practical health tech insights. Every issue teaches me something new.',
    author: 'App Developer',
  },
  {
    text: 'I look forward to every issue. Concise, actionable, and beautifully designed.',
    author: 'Product Designer',
  },
  {
    text: 'Finally a newsletter that respects my inbox and my time. Quality over quantity, every single issue.',
    author: 'Health Tech Founder',
  },
];

function SignupForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
            <Button type="submit" variant="contained" size="large" sx={{ whiteSpace: 'nowrap' }}>
              Subscribe
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
            Join 500+ readers. No spam. Unsubscribe anytime.
          </Typography>
        </>
      )}
    </Box>
  );
}

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
            {/* Content */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1 }}>
                Newsletter
              </Typography>
              <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Design, Health Tech &amp; Product Updates
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
                Get behind-the-scenes insights on building iOS apps, health tech product design, and curated industry trends — delivered straight to your inbox.
              </Typography>
              <SignupForm id="nl-email-hero" />
            </Box>

            {/* Illustration */}
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
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 1 }}>What You&apos;ll Get</Typography>
            <Typography variant="body1" color="text.secondary">
              Every issue is packed with actionable insights you can use right away.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {valueCards.map((card) => (
              <Paper key={card.title} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">{card.description}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Topics */}
      <Box
        component="section"
        sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 1 }}>Topics We Cover</Typography>
            <Typography variant="body1" color="text.secondary">
              A look at recent newsletter topics to give you a taste of what&apos;s inside.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {topics.map((topic) => (
              <Paper key={topic.title} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    {topic.tag}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{topic.date}</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{topic.title}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 4,
            }}
          >
            {stats.map((stat) => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 0.5 }}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box
        component="section"
        sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6 }}>What Readers Say</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {testimonials.map((t) => (
              <Paper
                key={t.author}
                component="blockquote"
                sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', m: 0 }}
              >
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  — {t.author}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 14 },
          borderTop: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(160deg, #f0fdfa 0%, #f9fafb 100%)',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Don&apos;t Miss the Next Issue</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 500, mx: 'auto' }}>
              Join a growing community of designers, developers, and health tech enthusiasts.
            </Typography>
            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              <SignupForm id="nl-email-cta" />
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
