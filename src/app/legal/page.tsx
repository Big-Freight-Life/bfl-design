'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShieldIcon from '@mui/icons-material/Shield';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

// ─── Product legal data ──────────────────────────────────────────────────────

const products = [
  {
    name: 'Low Ox Life',
    type: 'iOS App',
    description: 'Premium oxalate tracking and health insights',
    privacy: '/legal/low-ox-life-privacy',
    terms: '/legal/low-ox-life-terms',
  },
  {
    name: 'Bio Break',
    type: 'iOS App',
    description: 'Bathroom health tracking and hydration insights',
    privacy: '/legal/bio-break-privacy',
    terms: '/legal/bio-break-terms',
  },
  {
    name: '24H Urine Analysis',
    type: 'iOS App',
    description: 'AI-powered 24-hour urine lab report analysis',
    privacy: '/legal/24h-urine-privacy',
    terms: '/legal/24h-urine-terms',
  },
];

const APPLE_EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LegalPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <Box component="main">
      {/* Header */}
      <Box component="header" sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 0 },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                flex: { md: 1 },
              }}
            >
              Legal Documents
            </Typography>

            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for your product or service..."
              aria-label="Search for your product"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: { xs: '100%', md: 400 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  bgcolor: 'background.paper',
                },
              }}
            />

            {/* Spacer to balance layout on desktop */}
            <Box sx={{ flex: { md: 1 }, display: { xs: 'none', md: 'block' } }} />
          </Box>
        </Container>
      </Box>

      {/* Products Section */}
      <Box component="section" sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 600,
                mb: 3,
              }}
            >
              Products &amp; Services
              <Chip
                label={filtered.length}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Typography>

            <Stack spacing={2}>
              {filtered.map((product) => (
                <Paper
                  key={product.name}
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: '1rem',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {product.type}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ flexShrink: 0, flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      href={product.privacy}
                      size="small"
                      startIcon={<ShieldIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        fontWeight: 400,
                        borderRadius: '0.5rem',
                        '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
                      }}
                    >
                      Privacy Policy
                    </Button>
                    <Button
                      component={Link}
                      href={product.terms}
                      size="small"
                      startIcon={<DescriptionIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        fontWeight: 400,
                        borderRadius: '0.5rem',
                        '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
                      }}
                    >
                      Terms of Service
                    </Button>
                    <Button
                      component="a"
                      href={APPLE_EULA}
                      target="_blank"
                      rel="noopener"
                      size="small"
                      startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        fontWeight: 400,
                        borderRadius: '0.5rem',
                        '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
                      }}
                    >
                      Apple EULA
                    </Button>
                  </Stack>
                </Paper>
              ))}

              {filtered.length === 0 && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 6 }}
                >
                  No products found matching your search.
                </Typography>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* General Legal Documents */}
      <Box
        component="section"
        sx={{ py: { xs: 8, md: 10 }, bgcolor: 'action.hover', textAlign: 'center' }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            General Legal Documents
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looking for our company-wide policies?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/privacy"
              variant="outlined"
              sx={{ borderRadius: '0.5rem', textTransform: 'none', fontWeight: 600 }}
            >
              Privacy Policy
            </Button>
            <Button
              component={Link}
              href="/terms"
              variant="outlined"
              sx={{ borderRadius: '0.5rem', textTransform: 'none', fontWeight: 600 }}
            >
              Terms of Service
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Have Questions CTA */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Have Questions?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, mx: 'auto', maxWidth: 480 }}>
            If you have questions about our policies or need clarification, we are here to help.
          </Typography>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            size="large"
            sx={{ borderRadius: '0.5rem', textTransform: 'none', fontWeight: 600, px: 5 }}
          >
            Contact Us
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
