import type { Metadata } from 'next';
import { Container, Box } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | BFL Design',
  description: 'Start a conversation with Big Freight Life. If your AI investments aren\'t delivering, the problem might be the system. Let\'s find out.',
};

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <SectionHeader
        overline="Start a Conversation"
        title="Let's figure out what's underneath."
        subtitle="Tell me what's going on with your system. No pitch, no pressure — just a real conversation about what might be breaking and how to fix it."
      />
      <Box sx={{ mt: 4 }}>
        <ContactForm />
      </Box>
    </Container>
  );
}
