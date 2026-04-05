import { Box, Container, Typography, Paper } from '@mui/material';
import Link from 'next/link';

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly, such as when you create an account, contact us, subscribe to our newsletter, or use our products. This may include your name, email address, and any other information you choose to provide.',
      'We automatically collect certain technical information when you visit our website or use our apps, including your IP address, browser type, device information, operating system, and usage patterns through cookies and similar technologies.',
      'For our health-related products (Low Ox Life, Bio Break, 24H Urine Analysis), we may collect health data you voluntarily enter. This data is stored locally on your device and is never transmitted to our servers unless you explicitly opt in to cloud sync features.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'We use the information we collect to provide, maintain, and improve our products and services. This includes personalizing your experience, processing transactions, and communicating with you about updates, promotions, and support.',
      'We use analytics data in aggregate to understand how our products are used, identify trends, and make improvements. We do not use your personal data for AI model training. See our AI Ethics policy for more details.',
      'We may use your email address to send you product updates, newsletters, and marketing communications. You can opt out of these at any time by clicking the unsubscribe link in any email.',
    ],
  },
  {
    title: 'Information Sharing',
    content: [
      'We do not sell, rent, or trade your personal information to third parties. We may share information with trusted service providers who help us operate our business (e.g., hosting, analytics, email delivery), subject to strict confidentiality agreements.',
      'We may disclose your information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.',
      'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We implement industry-standard security measures to protect your personal information, including encryption in transit (TLS/SSL) and at rest, secure authentication, and regular security audits.',
      'Health data entered into our apps is stored locally on your device by default. If you enable cloud sync, your data is encrypted end-to-end before transmission and storage.',
      'While we take reasonable precautions to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'You have the right to access, correct, or delete your personal information at any time. You can manage most of your data directly through your account settings in our products.',
      'If you are a resident of California, you have additional rights under the CCPA, including the right to know what personal information we collect and the right to opt out of the sale of personal information (we do not sell personal information).',
      'If you are located in the European Economic Area, you have rights under the GDPR including the right to data portability, the right to restrict processing, and the right to lodge a complaint with a supervisory authority.',
      'To exercise any of these rights, contact us at privacy@bflux.co. We will respond to your request within 30 days.',
    ],
  },
  {
    title: 'Cookies and Tracking',
    content: [
      'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.',
      'We use third-party analytics services (such as Vercel Analytics) to help us understand website usage. These services may collect information about your visits to our site using cookies.',
    ],
  },
  {
    title: 'Children\'s Privacy',
    content: [
      'Our products and services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected information from a child under 13, we will delete it promptly.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use of our services after any changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about this Privacy Policy or our data practices, please contact us:',
    ],
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <Box component="main">
      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          background: 'linear-gradient(160deg, #f9fafb 0%, #f0fdfa 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
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
            Privacy Policy
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            Your privacy matters to us. This policy explains what information we collect,
            how we use it, and the choices you have.
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
          bgcolor: 'grey.50',
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
              <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                  Terms of Service
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
