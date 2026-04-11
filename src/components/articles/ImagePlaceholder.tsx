'use client';

import { Box, Typography } from '@mui/material';

interface ImagePlaceholderProps {
  aspectRatio?: string;
  caption?: string;
  gradient?: string;
}

export default function ImagePlaceholder({
  aspectRatio = '16/9',
  caption,
  gradient = 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(6,182,212,0.10) 100%)',
}: ImagePlaceholderProps) {
  return (
    <Box sx={{ my: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          aspectRatio,
          background: gradient,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontStyle: 'italic' }}
        >
          Image
        </Typography>
      </Box>
      {caption && (
        <Typography
          variant="caption"
          sx={{ display: 'block', mt: 1, color: 'text.secondary', textAlign: 'center' }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}
