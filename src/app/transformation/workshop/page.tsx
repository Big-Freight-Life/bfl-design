import { Container, Typography } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';

export default function WorkshopPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Learning" title="Online Design Course" subtitle="Learn system design principles." />
      <Typography variant="body1" color="text.secondary">Page content coming soon.</Typography>
    </Container>
  );
}
