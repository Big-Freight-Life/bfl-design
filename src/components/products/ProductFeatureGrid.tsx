import { Box, Container, Grid, Typography } from '@mui/material';
import FeatureCard from '@/components/products/FeatureCard';

export interface FeatureItem {
  title: string;
  desc: string;
  tier: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

interface ProductFeatureGridProps {
  features: FeatureItem[];
  accentColor: string;
  headline?: string;
  subheadline?: string;
}

/**
 * Renders the "Everything You Need" feature grid used on product pages.
 */
export default function ProductFeatureGrid({
  features,
  accentColor,
  headline = 'Everything You Need',
  subheadline,
}: ProductFeatureGridProps) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
        >
          {headline}
        </Typography>
        {subheadline && (
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            {subheadline}
          </Typography>
        )}
        <Grid container spacing={3}>
          {features.map((f) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
              <FeatureCard
                title={f.title}
                desc={f.desc}
                tier={f.tier}
                icon={f.icon}
                accentColor={accentColor}
                comingSoon={f.comingSoon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
