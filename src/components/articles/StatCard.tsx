'use client';

import { Box, Typography } from '@mui/material';

interface StatCardProps {
  value: string;
  label: string;
  color?: string;
}

export default function StatCard({
  value,
  label,
  color = '#14B8A6',
}: StatCardProps) {
  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="p"
        sx={{
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          fontWeight: 700,
          color,
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="body2"
        sx={{ mt: 1, color: 'text.secondary' }}
      >
        {label}
      </Typography>
    </Box>
  );
}
