'use client';

import { Box, Divider, Paper, Typography } from '@mui/material';
import { radius } from '@/theme/tokens';

interface CaseStudyBlockProps {
  title: string;
  company: string;
  description: string;
  diagnosis: string;
  pattern: string;
  accentColor?: string;
}

export default function CaseStudyBlock({
  title,
  company,
  description,
  diagnosis,
  pattern,
  accentColor = '#14B8A6',
}: CaseStudyBlockProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        my: { xs: 4, md: 6 },
        p: { xs: 3, md: 4 },
        borderRadius: radius.card,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: accentColor,
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}
      >
        {company}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
        {title}
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
        {description}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Diagnosis section */}
      <Box sx={{ pl: 3, borderLeft: `3px solid ${accentColor}`, mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          Diagnosis
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {diagnosis}
        </Typography>
      </Box>

      {/* Transferable Pattern section */}
      <Box sx={{ pl: 3, borderLeft: '3px solid', borderColor: 'divider' }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          Transferable Pattern
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {pattern}
        </Typography>
      </Box>
    </Paper>
  );
}
