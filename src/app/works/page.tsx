'use client';

import { Box, Container, Typography, Button, Paper, Divider } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CaseCard from '@/components/common/CaseCard';

const featuredProject = {
  title: 'Enterprise Content Platform Transformation',
  client: 'Hyland Software',
  excerpt:
    'How we redesigned information architecture and user workflows to reduce complexity and improve decision-making across a global enterprise platform.',
  href: '/works/case-studies',
};

const editorialItems = [
  { title: 'Enterprise Content Platform Transformation', type: 'Case Study', meta: 'Hyland Software', href: '/works/case-studies' },
  { title: 'AI-Powered Customer Support Redesign', type: 'Case Study', meta: 'TechCorp', href: '/works/case-studies' },
];

export default function WorksPage() {
  return (
    <Box component="main">

      {/* Featured Hero */}
      <Box
        component="header"
        sx={{
          py: { xs: 6, md: 10 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 0.5 }}>
              Featured
            </Typography>
            <Typography variant="h2">Spotlight Project</Typography>
          </Box>

          {/* Featured project card */}
          <Paper
            component={Link}
            href={featuredProject.href}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              textDecoration: 'none',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'box-shadow 0.3s ease',
              '&:hover': { boxShadow: 4 },
            }}
          >
            {/* Image placeholder */}
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                minHeight: { xs: 220, md: 320 },
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.disabled',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Typography variant="caption" color="primary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Case Study
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {featuredProject.client}
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {featuredProject.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {featuredProject.excerpt}
              </Typography>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 600 }}>
                View case study
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Selected Works — editorial list */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 8 } }}>

            {/* Left — heading + filter */}
            <Box sx={{ flexShrink: 0, width: { md: 240 } }}>
              <Typography variant="h2" sx={{ mb: 1 }}>Selected Works</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Choose a designer
              </Typography>
              <Box
                component="select"
                sx={{
                  width: '100%',
                  p: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                <option value="ray-butler">Ray Butler</option>
              </Box>
            </Box>

            {/* Right — editorial list */}
            <Box sx={{ flex: 1 }}>
              {/* Column headers */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 140px',
                  pb: 1.5,
                  mb: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
                  Title
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
                  Type
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
                  Date
                </Typography>
              </Box>

              {editorialItems.map((item, i) => (
                <Box
                  key={i}
                  component={Link}
                  href={item.href}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 140px',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.type}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.meta}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'grey.50',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Have a Complex Challenge?</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560, mx: 'auto' }}>
              Let&apos;s discuss how systems thinking and thoughtful design can help your organization navigate complexity.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Start a Conversation
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
