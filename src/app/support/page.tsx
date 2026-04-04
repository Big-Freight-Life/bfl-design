'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { colors } from '@/theme/tokens';

const apps = [
  {
    name: 'Low Ox Life',
    type: 'iOS App',
    description: 'Premium oxalate tracking and health insights',
    href: '/support/low-ox-life',
  },
  {
    name: 'Bio Break',
    type: 'iOS App',
    description: 'Bathroom health tracking and hydration insights',
    href: '/support/bio-break',
  },
];

export default function SupportPage() {
  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="h1"
              sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}
            >
              Support
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}>
              Find answers, manage your account, or get in touch with our team.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Apps */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h2" sx={{ mb: 4 }}>Apps</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {apps.map((app) => (
                <Box
                  key={app.name}
                  component={Link}
                  href={app.href}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: { xs: 2.5, md: 3 },
                    textDecoration: 'none',
                    color: 'inherit',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: colors.button.primary.bg,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      '& .chevron': {
                        color: colors.button.primary.bg,
                        transform: 'translateX(2px)',
                      },
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: colors.button.primary.bg,
                        mb: 0.5,
                      }}
                    >
                      {app.type}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{app.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {app.description}
                    </Typography>
                  </Box>
                  <ChevronRightIcon
                    className="chevron"
                    sx={{ color: 'text.disabled', transition: 'color 0.2s, transform 0.2s', flexShrink: 0, ml: 2 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* General Support */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'grey.50',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>General Support</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Need help with something else?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                sx={{
                  bgcolor: colors.button.primary.bg,
                  color: colors.button.primary.text,
                  '&:hover': { bgcolor: colors.button.primary.hover },
                }}
              >
                Contact Us
              </Button>
              <Button
                component={Link}
                href="/legal"
                variant="outlined"
                sx={{
                  borderColor: colors.button.primary.bg,
                  color: colors.button.primary.bg,
                  '&:hover': { borderColor: colors.button.primary.hover, color: colors.button.primary.hover },
                }}
              >
                Legal Documents
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
