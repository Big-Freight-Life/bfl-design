'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import SectionHeader from '@/components/common/SectionHeader';
import FaqAccordion from '@/components/products/FaqAccordion';

// ─── Product data ────────────────────────────────────────────────────────────

const products = [
  {
    type: 'iOS App',
    title: 'Low Ox Life',
    excerpt:
      'Browse the Harvard 2023 Oxalate Table for free. Upgrade for food logging, journal history, and cloud sync.',
    price: 'Download for free',
    url: '/products/low-ox-life',
  },
  {
    type: 'iOS App',
    title: 'Bio Break',
    excerpt:
      'Track bathroom habits, food, and symptoms to understand your digestive health. Free with Apple Watch companion.',
    price: 'Free to start',
    url: '/products/bio-break',
  },
  {
    type: 'iOS App',
    title: '24H Urine Analysis',
    excerpt:
      'AI-powered analysis turns complex 24-hour urine test results into clear, actionable health insights.',
    price: 'Free to try',
    url: '/products/24-hour-urine-analysis',
  },
];

const faqs = [
  {
    question: 'What format are the templates in?',
    answer:
      'Templates are available in Figma, Notion, and PDF formats depending on the product. Each listing specifies the included formats.',
  },
  {
    question: 'Do you offer team licenses?',
    answer:
      'Yes, team licenses are available for organizations. Contact us for volume pricing and custom licensing options.',
  },
  {
    question: 'Are updates included?',
    answer:
      'All products include free updates for the lifetime of the product. You will receive notifications when new versions are available.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        component="header"
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          py: { xs: 12, md: 18 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
            }}
          >
            Products
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>
            Tools, templates, and apps for everyday life and work.
          </Typography>
        </Container>
      </Box>

      {/* Products Grid */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.title}>
                <Box
                  component={Link}
                  href={product.url}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 3,
                    borderRadius: '1.25rem',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'grey.100',
                      borderRadius: '0.75rem',
                      height: 160,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.disabled">
                      App preview
                    </Typography>
                  </Box>
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <Chip
                      label={product.type}
                      size="small"
                      sx={{ width: 'fit-content', fontSize: '0.7rem', fontWeight: 600 }}
                    />
                    <Typography variant="h6" fontWeight={700}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flex: 1, lineHeight: 1.6 }}>
                      {product.excerpt}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 3,
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                      <Typography variant="body2">Learn more</Typography>
                      <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <SectionHeader
            overline="FAQ"
            title="Frequently Asked Questions"
          />
          <FaqAccordion faqs={faqs} />
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'primary.dark',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={700} sx={{ color: '#fff', mb: 2 }}>
            Need Something Custom?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', mb: 4 }}>
            If you need a custom solution or have specific requirements, let&#39;s talk.
          </Typography>
          <Box
            component={Link}
            href="/contact"
            sx={{
              display: 'inline-block',
              px: 5,
              py: 1.75,
              bgcolor: '#fff',
              color: 'primary.dark',
              fontWeight: 700,
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1rem',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            Get in Touch
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
