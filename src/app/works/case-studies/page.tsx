import { Container } from '@mui/material';
import { cookies } from 'next/headers';
import SectionHeader from '@/components/common/SectionHeader';
import AuthGate from '@/components/case-studies/AuthGate';

export default async function CaseStudiesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('cs_session');
  const isAuthenticated = session?.value === 'authenticated';

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SectionHeader overline="Portfolio" title="Case Studies" subtitle="Detailed project work for our clients." />
    </Container>
  );
}
