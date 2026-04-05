'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700, color: 'text.disabled', lineHeight: 1 }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Button component={Link} href="/" variant="contained" size="large">
        Back to Home
      </Button>
    </Box>
  );
}
