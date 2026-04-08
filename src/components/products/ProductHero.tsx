'use client';

import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import Link from 'next/link';

interface ProductHeroProps {
  category: string;
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  ctaUrl: string;
  ctaText: string;
  ctaExternal?: boolean;
  /** Show official Apple App Store badge instead of regular button */
  appStoreBadge?: boolean;
  secondaryUrl?: string;
  secondaryText?: string;
  price: string;
  priceNote?: string;
  gradient: string;
  accentColor: string;
}

export default function ProductHero({
  category,
  name,
  tagline,
  headline,
  subheadline,
  ctaUrl,
  ctaText,
  ctaExternal = false,
  appStoreBadge = false,
  secondaryUrl,
  secondaryText,
  price,
  priceNote,
  gradient,
  accentColor,
}: ProductHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        background: gradient,
        color: '#fff',
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ maxWidth: 640 }}>
          <Chip
            label={category}
            size="small"
            sx={{
              bgcolor: `${accentColor}33`,
              color: accentColor,
              border: `1px solid ${accentColor}66`,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              width: 'fit-content',
            }}
          />
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.1,
                mb: 0.5,
              }}
            >
              {headline}
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, mb: 0 }}
            >
              {name} — {tagline}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
            }}
          >
            {subheadline}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            {appStoreBadge ? (
              <Box
                component="a"
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'block' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={156}
                  height={52}
                  loading="lazy"
                  decoding="async"
                />
              </Box>
            ) : (
              <Button
                component={ctaExternal ? 'a' : Link}
                href={ctaUrl}
                {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: accentColor,
                  color: '#fff',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: accentColor, filter: 'brightness(1.1)' },
                }}
              >
                {ctaText}
              </Button>
            )}
            {secondaryUrl && secondaryText && (
              <Button
                component="a"
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.6)', bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                {secondaryText}
              </Button>
            )}
          </Stack>
          <Box>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}
            >
              {price}
              {priceNote && ` · ${priceNote}`}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
