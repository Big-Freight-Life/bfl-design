'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const quickHelpCards = [
  {
    title: 'Restore Purchases',
    description: (
      <>
        <strong>Settings &gt; Account &gt; Restore Purchases</strong> to restore your Pro subscription on a new device.
      </>
    ),
  },
  {
    title: 'Manage Subscription',
    description: (
      <>
        <strong>iPhone Settings &gt; Apple ID &gt; Subscriptions</strong> to cancel or modify your Pro plan.
      </>
    ),
  },
  {
    title: 'Check Version',
    description: (
      <>
        <strong>Settings &gt; About</strong> to see your current app version. Keep updated for latest features.
      </>
    ),
  },
  {
    title: 'iCloud Sync',
    description: (
      <>
        <strong>Settings &gt; Sync</strong> to enable iCloud sync across iPhone and Apple Watch (Pro feature).
      </>
    ),
  },
];

const faqTabs = [
  {
    label: 'Billing',
    faqs: [
      {
        q: 'How do I cancel my Pro subscription?',
        a: 'Subscriptions are managed through Apple. Go to iPhone Settings > [Your Name] > Subscriptions, find Bio Break, and tap "Cancel Subscription." Your Pro access continues until the end of the current billing period.',
      },
      {
        q: 'How do I get a refund?',
        a: 'Refunds are processed by Apple. Visit reportaproblem.apple.com, sign in with your Apple ID, find your Bio Break purchase, and request a refund.',
      },
      {
        q: 'Is the free tier really free?',
        a: 'Yes. The free tier includes the hydration dashboard, quick logging for both types, Bristol Stool Scale, calendar heat map, smart reminders, and the full Apple Watch companion app. No time limits, no ads.',
      },
    ],
  },
  {
    label: 'Data & Sync',
    faqs: [
      {
        q: 'Where is my data stored?',
        a: 'Your data is stored locally on your device by default. With Pro, you can enable iCloud sync to keep data in sync across iPhone and Apple Watch. All data is encrypted at rest on your device and encrypted in transit via iCloud.',
      },
      {
        q: "My data isn't syncing between devices",
        a: "Make sure you have a Pro subscription and iCloud sync is enabled in Settings > Sync. Verify iCloud is enabled on your device: iPhone Settings > [Your Name] > iCloud > Apps Using iCloud. Try pulling down to refresh.",
      },
      {
        q: 'How do I export my data?',
        a: 'With Pro, go to Settings > Export Data to download your logs as CSV or PDF. Reports include timestamps, Bristol Stool types, urine color, urgency, hydration, and notes — ready to share with your healthcare provider.',
      },
      {
        q: 'Is my data private?',
        a: 'Absolutely. Bio Break is private by default — all data is encrypted at rest on your device. There are no ads, no third-party analytics, and no tracking. iCloud sync uses end-to-end encryption.',
      },
    ],
  },
  {
    label: 'Tracking',
    faqs: [
      {
        q: 'What is the Bristol Stool Scale?',
        a: 'The Bristol Stool Scale is a medical classification system that categorizes stool into 7 types based on form and consistency. Types 1-2 indicate constipation, Types 3-4 are considered normal, and Types 5-7 indicate loose stools. Bio Break uses this standard to help you track patterns over time.',
      },
      {
        q: 'How do I log a break?',
        a: 'From the Today dashboard, tap Log BB1 (urination) or Log BB2 (bowel movement). You can add optional details like urgency, color, Bristol type, and notes. The whole process takes just seconds.',
      },
      {
        q: 'What do the urine color indicators mean?',
        a: 'Urine color is a common indicator of hydration levels. Pale/clear indicates good hydration, while dark yellow or amber may suggest dehydration. Bio Break provides a color reference chart to help you track over time. This is for informational purposes only — consult your doctor for medical concerns.',
      },
    ],
  },
  {
    label: 'Apple Watch',
    faqs: [
      {
        q: 'How does the Apple Watch app work?',
        a: "The Apple Watch companion app lets you log breaks directly from your wrist. You can log BB1 and BB2, view time since last break, see today's count, and check your 7-day average. It includes 4 complication families for your watch face.",
      },
      {
        q: 'Is the Apple Watch app included in the free tier?',
        a: 'Yes. The full Apple Watch companion app is included in the free tier. You can log breaks, view stats, and use complications at no cost.',
      },
    ],
  },
];

export default function BioBreakSupportPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f5e9 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Box
              component={Link}
              href="/support"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 4,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} />
              Support
            </Box>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#4CAF50',
                mb: 1.5,
              }}
            >
              iOS App
            </Typography>
            <Typography
              variant="h1"
              sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}
            >
              Bio Break Support
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}>
              Find answers, manage your account, or get in touch with our team.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Quick Help */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 1 }}>Quick Help</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
              Common actions at a glance.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {quickHelpCards.map((card) => (
              <Box
                key={card.title}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">{card.description}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQs */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: 'grey.50',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 1 }}>Frequently Asked Questions</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Browse by category to find what you need.
            </Typography>

            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}
            >
              {faqTabs.map((tab) => (
                <Tab key={tab.label} label={tab.label} />
              ))}
            </Tabs>

            <Box>
              {faqTabs[activeTab].faqs.map((faq) => (
                <Accordion
                  key={faq.q}
                  disableGutters
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 1,
                    borderRadius: '8px !important',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Need more help?</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Reach out directly and we&apos;ll get back to you.
            </Typography>
            <Box
              component="a"
              href="mailto:appsupport@bigfreightlife.com?subject=Bio%20Break%20Support"
              sx={{
                display: 'inline-block',
                color: '#4CAF50',
                fontWeight: 500,
                fontSize: '1.125rem',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              appsupport@bigfreightlife.com
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 5 }}>
              We typically respond within 24-48 hours.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
              }}
            >
              <Box sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Submit Feedback</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Have an idea to improve Bio Break? Found a bug? Email us with your feedback. Please include:
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  <li><Typography variant="body2" color="text.secondary">A clear description of the feature or issue</Typography></li>
                  <li><Typography variant="body2" color="text.secondary">Why it would be helpful</Typography></li>
                  <li><Typography variant="body2" color="text.secondary">Any screenshots or examples</Typography></li>
                </Box>
              </Box>
              <Box sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Beta Testing</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Want early access to new features? Join our TestFlight beta program to test upcoming releases before they&apos;re public.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email us with &quot;Beta Request&quot; in the subject to request access.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
