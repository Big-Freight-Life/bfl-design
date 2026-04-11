'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { colors, gradients, typography as typographyTokens } from '@/theme/tokens';

interface ArticleCTAProps {
  headline: string;
  sub: string;
  buttonText: string;
  buttonHref: string;
  secondaryText?: string;
  secondaryHref?: string;
  gradient?: string;
  accentColor?: string;
}

export default function ArticleCTA({
  headline,
  sub,
  buttonText,
  buttonHref,
  secondaryText,
  secondaryHref,
  gradient = gradients.darkHero,
  accentColor = colors.button.primary.bg,
}: ArticleCTAProps) {
  return (
    <Box
      component="section"
      sx={{
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 12, md: 20 },
      }}
    >
      {/* Dot-matrix texture */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Headline */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
            fontWeight: typographyTokens.weights.bold,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: typographyTokens.letterSpacing.tight,
            mb: 3,
          }}
        >
          {headline}
        </Typography>

        {/* Sub */}
        <Typography
          sx={{
            fontSize: { xs: '1.125rem', md: '1.375rem' },
            color: 'grey.400',
            lineHeight: 1.5,
            maxWidth: '36rem',
            mb: { xs: 5, md: 6 },
          }}
        >
          {sub}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Button
            component={Link}
            href={buttonHref}
            variant="contained"
            size="large"
            sx={{
              bgcolor: accentColor,
              color: '#fff',
              px: 5,
              py: 1.75,
              fontSize: '1.0625rem',
              '&:hover': { bgcolor: accentColor, filter: 'brightness(0.85)' },
            }}
          >
            {buttonText}
          </Button>

          {secondaryText && secondaryHref && (
            <Button
              component={Link}
              href={secondaryHref}
              variant="text"
              size="large"
              sx={{
                color: 'grey.300',
                fontSize: '1.0625rem',
                '&:hover': { color: '#fff', bgcolor: 'transparent' },
              }}
            >
              {secondaryText}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
