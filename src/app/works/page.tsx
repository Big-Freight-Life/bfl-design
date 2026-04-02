import { Container, Typography } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';

export default function WorksPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Portfolio" title="Our Work" subtitle="Case studies and projects." />
      <Typography variant="body1" color="text.secondary">Page content coming soon.</Typography>
    </Container>
  );
}
