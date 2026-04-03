'use client';

import { useRef, useCallback } from 'react';
import { Box, Typography, Container, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { colors, typography, shadows, motion, layout } from '@/theme/tokens';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'prev' | 'next') => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]') as HTMLElement;
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24; // card width + gap
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }, []);

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

      {/* Carousel scroll container (like WordPress .case-carousel) */}
      <Box
        ref={scrollRef}
        role="region"
        aria-label="Case studies carousel"
        tabIndex={0}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '&:focus-visible': {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: '4px',
          },
        }}
      >
        {/* Carousel track (like WordPress .case-carousel-track) — padding lives here */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: '12px', sm: 2, md: '24px' },
            scrollSnapType: { xs: 'none', sm: 'x proximity' },
            pt: 2,
            pb: 4,
            // Align first card with Container maxWidth="lg" (1024px) content edge
            pl: {
              xs: `max(16px, calc((100vw - 1024px) / 2 + 16px))`,
              sm: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
              md: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
              lg: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            },
            pr: 2,
            width: 'max-content',
          }}
        >
        {caseStudies.map((study) => (
          <Box
            key={study.title}
            data-card
            component={Link}
            href={study.link}
            sx={{
              flex: '0 0 auto',
              // Match WordPress: 85vw width, max 939px, responsive
              width: {
                xs: 'calc(100vw - 48px)',
                sm: '85vw',
                md: '70vw',
                lg: '60vw',
                xl: 939,
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
              background: study.imageUrl ? 'transparent' : study.gradient,
              position: 'relative',
              p: { xs: 0, sm: 4, lg: '40px' },
              scrollSnapAlign: { xs: 'none', sm: 'start' },
              scrollSnapStop: { xs: 'normal', sm: 'always' },
              transition: `box-shadow ${motion.duration.fast} ${motion.easing.outExpo}`,
              '&:hover': {
                boxShadow: shadows.xl,
              },
              // Whirlpool animation on the background image
              '&:hover .card-bg-image': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {/* Background image layer — animated on hover */}
            {study.imageUrl && (
              <Box
                className="card-bg-image"
                sx={{
                  position: 'absolute',
                  inset: '-10%',
                  backgroundImage: `url(${study.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: 0,
                  display: { xs: 'none', sm: 'block' },
                }}
              />
            )}

            {/* Dark overlay gradient */}
            <Box
              className="card-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.85) 100%)',
                borderRadius: 'inherit',
                zIndex: 1,
                pointerEvents: 'none',
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
                zIndex: 2,
                p: { xs: 0, sm: 0 },
                pt: { xs: 2, sm: 0 },
                mb: { xs: 0, sm: 3, lg: 4 },
              }}
            >
              {/* Label / eyebrow — small, uppercase, medium weight, muted */}
              <Typography
                component="span"
                sx={{
                  display: 'inline-block',
                  fontSize: { xs: typography.sizes.sm, sm: typography.sizes.base },
                  fontWeight: typography.weights.medium,
                  letterSpacing: { xs: '0.08em', sm: '0.05em' },
                  textTransform: 'uppercase',
                  color: { xs: 'text.secondary', sm: '#d4d4d8' },
                  opacity: { sm: 0.8 },
                  mb: 1.5,
                }}
              >
                {study.label}
              </Typography>

              {/* Title — large, medium weight, tighter tracking */}
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
                  color: { xs: 'text.primary', sm: '#e5e5e5' },
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {study.title}
              </Typography>

              {/* Excerpt — body size, normal weight, relaxed line height */}
              <Typography
                variant="body1"
                sx={{
                  color: { xs: 'text.secondary', sm: '#d4d4d4' },
                  fontWeight: typography.weights.normal,
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

              {/* Year / metadata — small, lighter color */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: { xs: 'text.tertiary', sm: '#a3a3a3' },
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.normal,
                  }}
                >
                  {study.year}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        </Box>
      </Box>

      {/* Nav arrows */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        <IconButton
          onClick={() => scroll('prev')}
          aria-label="Previous case study"
          sx={{
            border: `1px solid`,
            borderColor: 'divider',
            width: 40,
            height: 40,
            '&:hover': { borderColor: 'text.secondary' },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          onClick={() => scroll('next')}
          aria-label="Next case study"
          sx={{
            border: `1px solid`,
            borderColor: 'divider',
            width: 40,
            height: 40,
            '&:hover': { borderColor: 'text.secondary' },
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </IconButton>
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
