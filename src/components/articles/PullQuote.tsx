'use client';

import { Box, Typography } from '@mui/material';

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  color?: string;
}

export default function PullQuote({
  quote,
  attribution,
  color = '#14B8A6',
}: PullQuoteProps) {
  return (
    <Box
      component="blockquote"
      sx={{
        my: { xs: 4, md: 6 },
        mx: 0,
        pl: 3,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <Typography
        variant="h6"
        component="p"
        sx={{
          fontStyle: 'italic',
          color: 'text.secondary',
          lineHeight: 1.6,
        }}
      >
        {quote}
      </Typography>
      {attribution && (
        <Typography
          variant="body2"
          sx={{ mt: 1, color: 'text.secondary', fontStyle: 'normal' }}
        >
          — {attribution}
        </Typography>
      )}
    </Box>
  );
}
