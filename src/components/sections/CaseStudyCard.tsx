'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { CaseStudy } from '@/models/case-study';
import { colors, typography, shadows, motion } from '@/theme/tokens';

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Box
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
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        transition: `box-shadow ${motion.duration.fast} ${motion.easing.outExpo}`,
        '&:hover': {
          boxShadow: shadows.xl,
        },
        // Zoom animation on the background image
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
        {/* Label / eyebrow */}
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
            color: { xs: 'text.primary', sm: '#e5e5e5' },
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

        {/* Year / metadata */}
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
  );
}
