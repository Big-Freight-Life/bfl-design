import type { Metadata } from 'next';
import { Container, Box } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | BFL Design',
  description: 'Get in touch with Big Freight Life. Whether you\'re exploring AI-powered solutions or designing intelligent systems, we\'d love to hear about your vision.',
};

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <SectionHeader
        overline="Get in Touch"
        title="Let's Build the Future Together"
        subtitle="Whether you're exploring AI-powered solutions, refining customer experiences, or designing intelligent systems, I'd love to hear about your vision."
      />
      <Box sx={{ mt: 4 }}>
        <ContactForm />
      </Box>
    </Container>
  );
}
