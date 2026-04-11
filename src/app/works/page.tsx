'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { colors } from '@/theme/tokens';

const moreWork = [
  {
    title: 'Enterprise Content Platform Transformation',
    type: 'Enterprise system redesign',
    description: 'A global platform where workflows and decisions were disconnected.\n\nWe made the system visible, aligned ownership, and restructured how work moved.',
    href: '/works/case-studies',
  },
  {
    title: 'AI-Powered Customer Support Redesign',
    type: 'AI + workflow integration',
    description: 'Support workflows broke under scale.\nAI introduced more noise instead of clarity.\n\nWe restructured the system so AI supported real decision paths.',
    href: '/works/case-studies',
  },
];

export default function WorksPage() {
  return (
    <Box>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h1"
              sx={{ mb: 2, fontSize: { xs: '2rem', md: 'clamp(2.25rem, 5vw, 3.5rem)' }, fontWeight: 600 }}
            >
              Selected work
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              This isn&apos;t a portfolio.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              It&apos;s what happens when you fix the system first.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Featured */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 6 }}>Featured</Typography>

            <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 600, mb: 1 }}>
              An enterprise platform where nothing connected
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', mb: 4 }}>
              Enterprise Content Platform — Hyland Software
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 4 }}>
              <Typography variant="body1" color="text.secondary">Workflows were fragmented.</Typography>
              <Typography variant="body1" color="text.secondary">Decisions didn&apos;t connect.</Typography>
              <Typography variant="body1" color="text.secondary">Complexity slowed everything down.</Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We stepped into how the system actually worked — not how it was documented.
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, m: 0, mb: 5 }}>
              {[
                'Mapped the real flow of work',
                'Identified where decisions broke down',
                'Aligned ownership across teams',
                'Restructured the system to support consistent execution',
              ].map((item) => (
                <li key={item}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>{item}</Typography>
                </li>
              ))}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, fontSize: '1.125rem' }}>Result</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 4 }}>
              <Typography variant="body1" color="text.secondary">Clearer workflows.</Typography>
              <Typography variant="body1" color="text.secondary">Fewer breakdowns.</Typography>
              <Typography variant="body1" color="text.secondary">A system that supports decision-making instead of slowing it down.</Typography>
            </Box>

            <Box
              component={Link}
              href="/works/case-studies"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: colors.button.primary.bg,
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: colors.button.primary.hover },
              }}
            >
              → View case study
            </Box>
          </Box>
        </Container>
      </Box>

      {/* More work */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 6 }}>More work</Typography>

            {moreWork.map((item, i) => (
              <Box
                key={item.title}
                sx={{
                  mb: i < moreWork.length - 1 ? 6 : 0,
                  pb: i < moreWork.length - 1 ? 6 : 0,
                  borderBottom: i < moreWork.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', mb: 3 }}>
                  {item.type}
                </Typography>
                {item.description.split('\n').map((line, j) => (
                  <Typography
                    key={j}
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: line === '' ? 2 : 0.5 }}
                  >
                    {line || '\u00A0'}
                  </Typography>
                ))}
                <Box
                  component={Link}
                  href={item.href}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mt: 3,
                    color: colors.button.primary.bg,
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': { color: colors.button.primary.hover },
                  }}
                >
                  → View case study
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* What this work reflects */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 4 }}>What this work reflects</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Every system looks different.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              But the pattern is always the same:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, m: 0, mb: 4 }}>
              {[
                'Decisions don\'t land',
                'Nobody\'s sure who owns what',
                'The way work moves doesn\'t match anyone\'s plan',
              ].map((item) => (
                <li key={item}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>{item}</Typography>
                </li>
              ))}
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              We fix the pattern, not the symptoms.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 14 },
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Recognize the pattern?</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Let&apos;s find out what&apos;s underneath yours.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              sx={{
                bgcolor: colors.button.primary.bg,
                color: colors.button.primary.text,
                '&:hover': { bgcolor: colors.button.primary.hover },
              }}
            >
              Start a conversation
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
