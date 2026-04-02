'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, Paper, InputAdornment, TextField } from '@mui/material';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

const apps = [
  {
    name: 'Low Ox Life',
    type: 'iOS App',
    slug: 'low-ox-life',
    description: 'Premium oxalate tracking and health insights',
    href: '/support/low-ox-life',
  },
  {
    name: 'Bio Break',
    type: 'iOS App',
    slug: 'bio-break',
    description: 'Bathroom health tracking and hydration insights',
    href: '/support/bio-break',
  },
];

export default function SupportPage() {
  const [query, setQuery] = useState('');

  const filtered = apps.filter((app) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return app.name.toLowerCase().includes(q) || app.type.toLowerCase().includes(q);
  });

  return (
    <Box component="main">

      {/* Page Header */}
      <Box
        component="header"
        sx={{
          py: { xs: 4, md: 6 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              gap: 3,
            }}
          >
            <Typography variant="h1" sx={{ flex: 1, m: 0 }}>Support</Typography>
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for your app..."
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', md: 400 },
                '& .MuiOutlinedInput-root': { borderRadius: '50px' },
              }}
              aria-label="Search for your app"
            />
            {/* Spacer on desktop */}
            <Box sx={{ flex: { md: 1 }, display: { xs: 'none', md: 'block' } }} />
          </Box>
        </Container>
      </Box>

      {/* Apps Section */}
      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 672, mx: 'auto' }}>

            {/* Label + count badge */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Apps</Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 24,
                  height: 24,
                  px: 1,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'primary.main',
                  bgcolor: 'rgba(20,184,166,0.1)',
                  borderRadius: '9999px',
                }}
              >
                {apps.length}
              </Box>
            </Box>

            {/* App list */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filtered.map((app) => (
                <Paper
                  key={app.slug}
                  component={Link}
                  href={app.href}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: { xs: 2.5, md: 3 },
                    textDecoration: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
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
                      color="primary"
                      sx={{ display: 'block', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}
                    >
                      {app.type}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{app.name}</Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: 'text.disabled', transition: 'color 0.2s, transform 0.2s' }} />
                </Paper>
              ))}

              {filtered.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No apps found matching your search.
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* General Support */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: 'grey.50',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>General Support</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Need help with something else?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button component={Link} href="/contact" variant="outlined">
                Contact Us
              </Button>
              <Button component={Link} href="/legal" variant="outlined">
                Legal Documents
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
