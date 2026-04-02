'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import { colors, typography, radius, shadows } from '@/theme/tokens';

const entryPoints = [
  {
    title: 'Reality',
    description: 'How work actually moves—beyond documentation.',
  },
  {
    title: 'Alignment',
    description: 'Where decisions connect and ownership is clear.',
  },
  {
    title: 'Structure',
    description: 'What holds the system together at scale.',
  },
];

export default function EntryPointsSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: colors.gray[50],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {entryPoints.map((point) => (
            <Grid key={point.title} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: radius.card,
                  bgcolor: '#fff',
                  boxShadow: shadows.sm,
                  height: '100%',
                  border: `1px solid ${colors.gray[100]}`,
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    boxShadow: shadows.md,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 3,
                    bgcolor: colors.primary.main,
                    borderRadius: '9999px',
                    mb: 3,
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: typography.sizes['2xl'],
                    fontWeight: typography.weights.semibold,
                    mb: 1.5,
                    lineHeight: typography.lineHeights.tight,
                  }}
                >
                  {point.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: typography.lineHeights.relaxed,
                    fontSize: typography.sizes.base,
                  }}
                >
                  {point.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
