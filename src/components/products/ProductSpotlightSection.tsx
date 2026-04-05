import { Box, Container, Grid, Typography } from '@mui/material';

export interface SpotlightItem {
  title: string;
  headline: string;
  desc: string;
  bg: string;
  /** If true, renders white text and light-on-dark palette */
  dark?: boolean;
}

interface ProductSpotlightSectionProps {
  spotlights: SpotlightItem[];
  accentColor: string;
}

/**
 * Renders alternating feature spotlight rows — each with a text column and a
 * placeholder screenshot box. Used by the product pages (Low Ox Life, Bio Break).
 */
export default function ProductSpotlightSection({
  spotlights,
  accentColor,
}: ProductSpotlightSectionProps) {
  return (
    <>
      {spotlights.map((s) => (
        <Box
          key={s.title}
          component="section"
          sx={{
            py: { xs: 8, md: 12 },
            bgcolor: s.bg,
            color: s.dark ? '#fff' : 'inherit',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: s.dark ? 'rgba(255,255,255,0.6)' : accentColor,
                    letterSpacing: '0.1em',
                    mb: 1,
                    display: 'block',
                  }}
                >
                  {s.title}
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  sx={{
                    color: s.dark ? '#fff' : 'text.primary',
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 2,
                  }}
                >
                  {s.headline}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: s.dark ? 'rgba(255,255,255,0.75)' : 'text.secondary',
                    lineHeight: 1.7,
                    fontSize: '1.05rem',
                  }}
                >
                  {s.desc}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    bgcolor: s.dark ? 'rgba(255,255,255,0.08)' : 'grey.100',
                    borderRadius: '1.5rem',
                    height: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    color={s.dark ? 'rgba(255,255,255,0.3)' : 'text.disabled'}
                  >
                    App screenshot
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}
    </>
  );
}
