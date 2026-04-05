'use client';

import { Box, Typography, Button } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </Typography>
      <Button variant="contained" size="large" onClick={reset}>
        Try Again
      </Button>
    </Box>
  );
}
