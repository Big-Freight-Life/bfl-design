import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

interface LegalLink {
  label: string;
  url: string;
}

interface ProductCtaProps {
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  ctaExternal?: boolean;
  /** Show official Apple App Store badge instead of regular button */
  appStoreBadge?: boolean;
  gradient: string;
  accentColor: string;
  legalLinks?: LegalLink[];
}

export default function ProductCta({
  headline,
  description,
  ctaText,
  ctaUrl,
  ctaExternal = false,
  appStoreBadge = false,
  gradient,
  accentColor,
  legalLinks,
}: ProductCtaProps) {
  return (
    <Box
      component="section"
      sx={{ background: gradient, color: '#fff', py: { xs: 8, md: 12 }, textAlign: 'center' }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ color: '#fff', mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
        >
          {headline}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}
        >
          {description}
        </Typography>
        {appStoreBadge ? (
          <Box
            component="a"
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-block', mb: 4 }}
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
            {...(ctaExternal ? { target: '_blank', rel: 'noopener' } : {})}
            variant="contained"
            size="large"
            sx={{
              bgcolor: accentColor,
              color: '#fff',
              fontWeight: 600,
              px: 5,
              py: 1.75,
              borderRadius: '8px',
              fontSize: '1rem',
              mb: 4,
              '&:hover': { bgcolor: accentColor, filter: 'brightness(1.1)' },
            }}
          >
            {ctaText}
          </Button>
        )}
        {legalLinks && legalLinks.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            {legalLinks.map((link) => (
              <Typography
                key={link.label}
                component="a"
                href={link.url}
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  '&:hover': { color: 'rgba(255,255,255,0.8)' },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
