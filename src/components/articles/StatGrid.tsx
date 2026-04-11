'use client';

import { Box } from '@mui/material';

interface StatGridProps {
  children: React.ReactNode;
}

export default function StatGrid({ children }: StatGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
        my: { xs: 4, md: 6 },
      }}
    >
      {children}
    </Box>
  );
}
