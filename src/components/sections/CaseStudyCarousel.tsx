'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';
import { colors, typography, radius, shadows } from '@/theme/tokens';

interface CaseStudy {
  label: string;
  title: string;
  excerpt: string;
  year: string;
  imageUrl: string;
  link: string;
  gradient: string;
}

const caseStudies: CaseStudy[] = [
  {
    label: 'Creative Services',
    title: 'Designing a Portfolio When Anyone Can Build Anything',
    excerpt:
      'In a world where generative AI can produce websites in seconds, how do you make a portfolio that actually means something?',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    link: '/case-study-style-1/',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
  },
  {
    label: 'Enterprise Software',
    title: 'Hyland OnBase Integration',
    excerpt:
      'Enterprise document management meets Salesforce. Drag-and-drop content management with automatic indexing.',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    link: '/hyland-onbase-salesforce-integration/',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
  },
  {
    label: 'Enterprise Software',
    title: 'Hyland for Workday Integration',
    excerpt:
      'Unified content management embedded directly into Workday screens. No middleware. No custom code.',
    year: '2025',
    imageUrl: '',
    link: '/works/case-studies/hyland-for-workday-integration/',
    gradient: 'linear-gradient(180deg, #0f172a, #1e293b)',
  },
  {
    label: 'Case Study',
    title: 'Salesforce Migration Editorial',
    excerpt:
      'Designed for clarity. Built for adoption. A unified platform transformation.',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    link: '#',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
];

export default function CaseStudyCarousel() {
  return (
    <Box
      component="section"
      sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 16 } }}
    >
      {/* Section header */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 5,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: typography.sizes['3xl'], md: typography.sizes['4xl'] },
              fontWeight: typography.weights.semibold,
            }}
          >
            Not theory. Actual systems.
          </Typography>
          <Button
            component={Link}
            href="/works"
            variant="text"
            sx={{
              textTransform: 'none',
              color: colors.button.primary.bg,
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              fontWeight: typography.weights.medium,
              '&:hover': { bgcolor: 'transparent', color: colors.button.primary.hover },
            }}
          >
            View All Work →
          </Button>
        </Box>
      </Container>

      {/* Carousel track */}
      <Box
        role="region"
        aria-label="Case studies carousel"
        sx={{
          overflowX: 'auto',
          overflowY: 'visible',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          pb: 2,
          px: { xs: 2, md: 4 },
          display: 'flex',
          gap: 3,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {caseStudies.map((study) => (
          <Box
            key={study.title}
            component={Link}
            href={study.link}
            sx={{
              flexShrink: 0,
              width: { xs: 300, sm: 360, md: 400 },
              borderRadius: radius.card,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              color: '#fff',
              background: study.imageUrl
                ? `url(${study.imageUrl}) center/cover no-repeat`
                : study.gradient,
              position: 'relative',
              minHeight: 420,
              scrollSnapAlign: 'start',
              boxShadow: shadows.lg,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: shadows.xl,
              },
            }}
          >
            {/* Overlay for readability */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)',
                borderRadius: 'inherit',
              }}
            />
            {/* Card content */}
            <Box
              sx={{
                position: 'relative',
                mt: 'auto',
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                component="span"
                sx={{
                  display: 'inline-block',
                  fontSize: typography.sizes.xs,
                  fontWeight: typography.weights.semibold,
                  letterSpacing: typography.letterSpacing.widest,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  mb: 1,
                }}
              >
                {study.label}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: typography.sizes.lg, md: typography.sizes.xl },
                  fontWeight: typography.weights.semibold,
                  lineHeight: typography.lineHeights.snug,
                  mb: 1.5,
                  color: '#fff',
                }}
              >
                {study.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: typography.lineHeights.relaxed,
                  mb: 2,
                  fontSize: typography.sizes.sm,
                }}
              >
                {study.excerpt}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: typography.sizes.xs }}
              >
                {study.year}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Mobile CTA */}
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
          <Button
            component={Link}
            href="/works"
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderColor: colors.button.primary.bg,
              color: colors.button.primary.bg,
              '&:hover': {
                borderColor: colors.button.primary.hover,
                bgcolor: colors.button.secondary.hover,
              },
            }}
          >
            View All Work →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
