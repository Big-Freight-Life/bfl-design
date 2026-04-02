import { Container, Typography } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';

export default function LowOxLifePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Product" title="Low Ox Life" subtitle="Track and manage oxalate intake." />
      <Typography variant="body1" color="text.secondary">Page content coming soon.</Typography>
    </Container>
  );
}
