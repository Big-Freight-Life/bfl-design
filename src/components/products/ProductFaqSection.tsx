import { Box, Container, Typography } from '@mui/material';
import FaqAccordion from '@/components/products/FaqAccordion';

export interface FaqItem {
  question: string;
  answer: string;
}

interface ProductFaqSectionProps {
  faqs: FaqItem[];
  accentColor: string;
  headline?: string;
}

/**
 * Renders the FAQ section used on product pages (grey.50 background).
 */
export default function ProductFaqSection({
  faqs,
  accentColor,
  headline = 'Frequently Asked Questions',
}: ProductFaqSectionProps) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 6, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
        >
          {headline}
        </Typography>
        <FaqAccordion faqs={faqs} accentColor={accentColor} />
      </Container>
    </Box>
  );
}
