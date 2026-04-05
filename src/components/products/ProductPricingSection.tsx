import { Box, Container, Grid, Typography } from '@mui/material';
import PricingTier from '@/components/products/PricingTier';

export interface PricingTierItem {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

interface ProductPricingSectionProps {
  tiers: PricingTierItem[];
  accentColor: string;
  headline?: string;
  subheadline?: string;
  /** MUI Grid size for each card. Defaults to { xs: 12, sm: 6, md: 3 } */
  cardSize?: { xs?: number; sm?: number; md?: number };
  /** Whether to center-justify the grid (useful when there are fewer cards) */
  justify?: 'flex-start' | 'center';
}

/**
 * Renders the "Simple Pricing" section used on product pages.
 */
export default function ProductPricingSection({
  tiers,
  accentColor,
  headline = 'Simple Pricing',
  subheadline = "Start free. Upgrade when you\u2019re ready.",
  cardSize = { xs: 12, sm: 6, md: 3 },
  justify = 'flex-start',
}: ProductPricingSectionProps) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
        >
          {headline}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          {subheadline}
        </Typography>
        <Grid container spacing={3} justifyContent={justify} alignItems="stretch">
          {tiers.map((tier) => (
            <Grid size={cardSize} key={tier.name}>
              <PricingTier
                name={tier.name}
                price={tier.price}
                period={tier.period}
                features={tier.features}
                highlighted={tier.highlighted}
                badge={tier.badge}
                accentColor={accentColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
