'use client';

import { Box, Container, Typography, Paper } from '@mui/material';
import Link from 'next/link';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using any website, application, or service provided by Big Freight Life LLC ("BFL," "we," "us," or "our"), including bfl.design, Low Ox Life, Bio Break, and 24H Urine Analysis, you agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, you may not access or use our services. We recommend that you review these terms periodically, as your continued use of our services constitutes acceptance of any changes.',
    ],
  },
  {
    title: 'Description of Services',
    content: [
      'Big Freight Life LLC provides digital products and services focused on health tracking and wellness. Our current product offerings include Low Ox Life (oxalate tracking), Bio Break (bowel movement tracking), and 24H Urine Analysis (urine test result management).',
      'Our products are designed to help you track and understand personal health data. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.',
      'We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice. We will make reasonable efforts to notify you of significant changes.',
    ],
  },
  {
    title: 'User Accounts',
    content: [
      'Some of our services may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      'You agree to provide accurate and complete information when creating an account and to update your information as necessary. You must notify us immediately of any unauthorized use of your account.',
      'We reserve the right to suspend or terminate your account if we reasonably believe you have violated these terms or if your account has been compromised.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content, designs, logos, trademarks, software, and other intellectual property associated with our services are owned by Big Freight Life LLC or our licensors and are protected by applicable intellectual property laws.',
      'You are granted a limited, non-exclusive, non-transferable license to use our services for personal, non-commercial purposes. You may not copy, modify, distribute, sell, or lease any part of our services without our prior written consent.',
      'Any feedback, suggestions, or ideas you provide to us about our services may be used by us without any obligation to compensate you.',
    ],
  },
  {
    title: 'User Responsibilities',
    content: [
      'You agree to use our services only for lawful purposes and in accordance with these terms. You may not use our services to transmit harmful, threatening, or objectionable content, or to interfere with the operation of our services.',
      'You are solely responsible for the data you enter into our products. We recommend maintaining your own backups of important health data.',
      'You agree not to attempt to reverse engineer, decompile, or otherwise attempt to extract the source code of our software, except as permitted by applicable law.',
    ],
  },
  {
    title: 'Health Disclaimer',
    content: [
      'Our products provide tools for personal health data tracking and management. The information provided through our services is for informational purposes only and should not be considered medical advice.',
      'Big Freight Life LLC is not a healthcare provider. We do not diagnose, treat, or cure any medical condition. Always consult with a qualified healthcare professional before making decisions about your health based on data from our products.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, Big Freight Life LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or related to your use of our services.',
      'Our total liability for any claims arising under these terms shall not exceed the amount you paid us, if any, for access to our services during the twelve months preceding the claim.',
      'Some jurisdictions do not allow the exclusion or limitation of certain damages. In such cases, our liability will be limited to the greatest extent permitted by applicable law.',
    ],
  },
  {
    title: 'Indemnification',
    content: [
      'You agree to indemnify and hold harmless Big Freight Life LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your use of our services or your violation of these terms.',
    ],
  },
  {
    title: 'Changes to Terms',
    content: [
      'We reserve the right to modify these Terms of Service at any time. When we make changes, we will update the "Last updated" date at the top of this page and, for significant changes, notify you via email or a prominent notice on our website.',
      'Your continued use of our services after any changes to these terms constitutes your acceptance of the revised terms.',
    ],
  },
  {
    title: 'Governing Law',
    content: [
      'These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.',
      'Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Dallas County, Texas.',
    ],
  },
  {
    title: 'Severability',
    content: [
      'If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about these Terms of Service, please contact us:',
    ],
    contact: true,
  },
];

export default function TermsPage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
                : 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography
            variant="h1"
            sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Terms of Service
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            Please read these terms carefully before using our products and services.
            By using our services, you agree to be bound by these terms.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Last updated: April 2026
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {sections.map((section) => (
              <Box key={section.title} sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {section.title}
                </Typography>
                {section.content.map((paragraph, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1.5, lineHeight: 1.7 }}
                  >
                    {paragraph}
                  </Typography>
                ))}
                {section.contact && (
                  <Paper
                    sx={{
                      p: 3,
                      mt: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Big Freight Life LLC
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      1351 N Buckner Blvd #180397
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Dallas, TX 75218
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email:{' '}
                      <Box
                        component="a"
                        href="mailto:privacy@bflux.co"
                        sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        privacy@bflux.co
                      </Box>
                    </Typography>
                  </Paper>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Related Links */}
      <Box
        component="section"
        sx={{
          py: { xs: 5, md: 7 },
          bgcolor: 'action.hover',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Related Legal Documents
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/legal" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                  Product-Specific Legal Policies
                </Typography>
              </Link>
              <Link href="/ai-ethics" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                  AI Ethics Policy
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
