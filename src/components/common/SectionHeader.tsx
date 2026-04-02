import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ overline, title, subtitle }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {overline && (
        <Typography variant="overline" color="primary" sx={{ mb: 1, display: 'block' }}>
          {overline}
        </Typography>
      )}
      <Typography variant="h2" sx={{ mb: subtitle ? 2 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
