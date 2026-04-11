'use client';

import { Box, Typography } from '@mui/material';

interface StatsBarProps {
  stats: { value: string; label: string }[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <Box
      sx={(theme) => ({
        bgcolor:
          theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        py: { xs: 4, md: 6 },
        px: { xs: 3, md: 6 },
        display: { xs: 'grid', md: 'flex' },
        gridTemplateColumns: { xs: 'repeat(2, 1fr)' },
        gap: { xs: 3, md: 0 },
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
      })}
    >
      {stats.map((stat, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: { md: 4 },
            borderRight: {
              xs: 'none',
              md:
                i < stats.length - 1
                  ? '1px solid'
                  : 'none',
            },
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              lineHeight: 1.2,
            }}
          >
            {stat.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 0.5,
              fontSize: '0.8125rem',
            }}
          >
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
