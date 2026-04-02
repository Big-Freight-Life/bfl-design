import { Container, Typography } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';

export default function ClientsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Who We Serve" title="Our Clients" subtitle="Organizations we've worked with." />
      <Typography variant="body1" color="text.secondary">Page content coming soon.</Typography>
    </Container>
  );
}
