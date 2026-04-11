'use client';

import { Box, Typography, Container, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { colors, typography } from '@/theme/tokens';
import { useCaseStudyCarousel } from '@/viewmodels/useCaseStudyCarousel';
import CaseStudyCard from './CaseStudyCard';

export default function CaseStudyCarousel() {
  const { caseStudies, scrollRef, scrollLeft, scrollRight } = useCaseStudyCarousel();

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
            Here&apos;s what it looks like.
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

      {/* Carousel scroll container */}
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
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: {
            xs: `max(16px, calc((100vw - 1024px) / 2 + 16px))`,
            sm: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            md: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            lg: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
          },
          scrollPaddingRight: {
            xs: `max(16px, calc((100vw - 1024px) / 2 + 16px))`,
            sm: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            md: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            lg: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
          },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '&:focus-visible': {
            outline: `2px solid ${colors.primary.main}`,
            outlineOffset: '4px',
          },
        }}
      >
        {/* Carousel track — padding aligns first card with Container maxWidth="lg" content edge */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: '12px', sm: 2, md: '24px' },
            pt: 2,
            pb: 4,
            pl: {
              xs: `max(16px, calc((100vw - 1024px) / 2 + 16px))`,
              sm: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
              md: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
              lg: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            },
            pr: {
              xs: `max(16px, calc((100vw - 1024px) / 2 + 16px))`,
              sm: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
              md: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
              lg: `max(24px, calc((100vw - 1024px) / 2 + 24px))`,
            },
            width: 'max-content',
            // Snap last card to its right edge so it lines up with the title
            '& > :last-child': {
              scrollSnapAlign: 'end',
            },
          }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.title} study={study} />
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
          onClick={scrollLeft}
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
          onClick={scrollRight}
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

      {/* Mobile CTA */}
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
