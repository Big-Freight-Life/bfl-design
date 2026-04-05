'use client';

import { Box, Container, Typography, Paper, Button, Chip } from '@mui/material';
import Link from 'next/link';

const releases = [
  {
    product: 'Low Ox Life',
    version: 'v4.2',
    date: 'March 2026',
    color: '#24A89C',
    href: '/products/low-ox-life',
    changes: [
      'New meal planner with AI-powered low-oxalate recipe suggestions',
      'Improved oxalate database with 200+ new food entries',
      'Apple Health integration for hydration tracking sync',
      'Redesigned daily log with faster data entry flow',
      'Bug fixes for calcium-to-oxalate ratio calculations',
    ],
  },
  {
    product: 'Bio Break',
    version: 'v2.1',
    date: 'March 2026',
    color: '#06B6D4',
    href: '/products/bio-break',
    changes: [
      'Added Bristol Stool Scale visual reference guide',
      'New weekly and monthly trend reports with exportable PDFs',
      'Medication tracking integration for correlating supplements with patterns',
      'Dark mode improvements across all screens',
      'Performance improvements for large data sets spanning 6+ months',
    ],
  },
  {
    product: '24H Urine Analysis',
    version: 'v1.2',
    date: 'March 2026',
    color: '#A855F7',
    href: '/products/24-hour-urine-analysis',
    changes: [
      'Side-by-side comparison view for multiple test results',
      'Reference range indicators with color-coded alerts',
      'New CSV import for lab results from major testing providers',
      'Shareable reports for sending results to your healthcare provider',
      'Improved onboarding flow with guided first-test walkthrough',
    ],
  },
];

export default function ProductReleasesPage() {
  return (
    <Box component="main">
      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(160deg, #1a1a1a 0%, #162221 100%)'
            : 'linear-gradient(160deg, #f9fafb 0%, #f0fdfa 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
                : 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 2,
              py: 0.75,
              bgcolor: 'rgba(20,184,166,0.1)',
              color: 'primary.main',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              mb: 3,
            }}
          >
            Changelog
          </Box>
          <Typography
            variant="h1"
            sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Product Releases
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            Latest updates and release notes for our products.
          </Typography>
        </Container>
      </Box>

      {/* Release Cards */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {releases.map((release) => (
              <Paper
                key={release.product}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { sm: 'center' },
                    justifyContent: 'space-between',
                    mb: 3,
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {release.product}
                    </Typography>
                    <Chip
                      label={release.version}
                      size="small"
                      sx={{
                        bgcolor: release.color,
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {release.date}
                  </Typography>
                </Box>

                <Box
                  component="ul"
                  sx={{ pl: 3, m: 0, mb: 3, color: 'text.secondary' }}
                >
                  {release.changes.map((change) => (
                    <Box component="li" key={change} sx={{ mb: 1 }}>
                      <Typography variant="body2">{change}</Typography>
                    </Box>
                  ))}
                </Box>

                <Link href={release.href} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View {release.product}
                  </Button>
                </Link>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
