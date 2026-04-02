'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';
import { colors, typography, shadows, motion } from '@/theme/tokens';

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
        tabIndex={0}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          scrollSnapType: { xs: 'none', sm: 'x proximity' },
          pb: 4,
          display: 'flex',
          gap: { xs: 2, md: 3 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          // Align first card with section title using container-matching padding
          px: {
            xs: 2,
            sm: 3,
            md: `max(calc((100vw - 1200px) / 2 + 32px), 32px)`,
          },
          '&:focus-visible': {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: '4px',
          },
        }}
      >
        {caseStudies.map((study) => (
          <Box
            key={study.title}
            component={Link}
            href={study.link}
            sx={{
              flex: '0 0 auto',
              // Match WordPress: 85vw width, max 939px, responsive
              width: {
                xs: 'calc(100vw - 48px)',
                sm: '85vw',
                md: '85vw',
                lg: '85vw',
              },
              maxWidth: 939,
              aspectRatio: { xs: 'auto', sm: '16 / 9' },
              minHeight: { xs: 300, sm: 'auto' },
              borderRadius: { xs: 0, sm: '20px', lg: '24px' },
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              textDecoration: 'none',
              color: '#fff',
              backgroundImage: study.imageUrl
                ? `url(${study.imageUrl})`
                : 'none',
              background: study.imageUrl
                ? undefined
                : study.gradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              p: { xs: 0, sm: 4, lg: '40px' },
              scrollSnapAlign: { xs: 'none', sm: 'start' },
              scrollSnapStop: { xs: 'normal', sm: 'always' },
              transition: `transform ${motion.duration.fast} ${motion.easing.outExpo}, box-shadow ${motion.duration.fast} ${motion.easing.outExpo}`,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: shadows.xl,
              },
            }}
          >
            {/* Dark overlay gradient — matches WordPress exactly */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.85) 100%)',
                borderRadius: 'inherit',
                zIndex: 0,
                pointerEvents: 'none',
                // Hide overlay on mobile (≤480px) where cards have different layout
                display: { xs: 'none', sm: 'block' },
              }}
            />

            {/* Mobile: separate image card */}
            {study.imageUrl && (
              <Box
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: '16px',
                  backgroundImage: `url(${study.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                }}
              />
            )}

            {/* Card content */}
            <Box
              sx={{
                flexShrink: 0,
                maxWidth: 600,
                position: 'relative',
                zIndex: 1,
                p: { xs: 0, sm: 0 },
                pt: { xs: 2, sm: 0 },
                mb: { xs: 0, sm: 3, lg: 4 },
              }}
            >
              {/* Label / eyebrow */}
              <Typography
                component="span"
                sx={{
                  display: 'inline-block',
                  fontSize: { xs: typography.sizes.sm, sm: typography.sizes.base },
                  fontWeight: typography.weights.medium,
                  letterSpacing: { xs: '0.08em', sm: '0.05em' },
                  textTransform: 'uppercase',
                  color: { xs: 'text.secondary', sm: 'rgba(255,255,255,0.8)' },
                  mb: 1.5,
                }}
              >
                {study.label}
              </Typography>

              {/* Title */}
              <Typography
                variant="h3"
                sx={{
                  fontSize: {
                    xs: typography.sizes.xl,
                    sm: typography.sizes['2xl'],
                  },
                  fontWeight: typography.weights.medium,
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                  mb: 1.5,
                  color: { xs: 'text.primary', sm: '#fff' },
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {study.title}
              </Typography>

              {/* Excerpt */}
              <Typography
                variant="body2"
                sx={{
                  color: { xs: 'text.secondary', sm: 'rgba(255,255,255,0.8)' },
                  lineHeight: 1.7,
                  mb: { xs: 1, sm: 2 },
                  fontSize: { xs: typography.sizes.lg, sm: typography.sizes.base },
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 2, sm: 3 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {study.excerpt}
              </Typography>

              {/* Year / metadata */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: { xs: 'text.tertiary', sm: 'rgba(255,255,255,0.6)' },
                    fontSize: typography.sizes.base,
                  }}
                >
                  {study.year}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Mobile CTA — visible only on small screens */}
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
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
