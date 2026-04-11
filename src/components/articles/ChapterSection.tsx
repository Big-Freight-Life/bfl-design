'use client';

import { Box, Typography } from '@mui/material';

interface ChapterSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function ChapterSection({
  id,
  title,
  children,
}: ChapterSectionProps) {
  return (
    <Box component="section" id={id}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.5rem', md: '1.75rem' },
          fontWeight: 600,
          mb: 3,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
