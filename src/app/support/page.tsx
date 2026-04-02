import { Container, Typography } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';

export default function SupportPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Help" title="Support" subtitle="Get help with our products." />
      <Typography variant="body1" color="text.secondary">Page content coming soon.</Typography>
    </Container>
  );
}
