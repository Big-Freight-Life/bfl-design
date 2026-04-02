'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: { xs: '80vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800 }}>
          <Typography variant="overline" color="primary" sx={{ mb: 2, display: 'block' }}>
            Big Freight Life
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.25rem)' },
              mb: 2,
            }}
          >
            Your systems already know what&apos;s wrong.
          </Typography>
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.25rem)' },
              fontWeight: 700,
              display: 'block',
              mb: 3,
            }}
          >
            AI just made it visible.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
            We help teams build systems that work.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={Link} href="/contact" variant="contained" size="large" sx={{ textTransform: 'none' }}>
              Start a conversation
            </Button>
            <Button component={Link} href="/works" variant="outlined" size="large" sx={{ textTransform: 'none' }}>
              See our work
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
