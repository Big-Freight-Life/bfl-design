'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const quickHelpCards = [
  {
    title: 'Restore Purchases',
    description: (
      <>
        <strong>Settings &gt; Account &gt; Restore Purchases</strong> to restore your subscription on a new device.
      </>
    ),
  },
  {
    title: 'Manage Subscription',
    description: (
      <>
        <strong>iPhone Settings &gt; Apple ID &gt; Subscriptions</strong> to cancel or modify.
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
    title: 'Reset Data',
    description: (
      <>
        <strong>Settings &gt; Data &gt; Clear Cache</strong> to clear cached data. Tracked entries stay safe.
      </>
    ),
  },
];

const faqTabs = [
  {
    label: 'Billing',
    faqs: [
      {
        q: 'How do I cancel my subscription?',
        a: 'Subscriptions are managed through Apple. Go to iPhone Settings > [Your Name] > Subscriptions, find Low Ox Life, and tap "Cancel Subscription." Your access continues until the end of the current billing period.',
      },
      {
        q: 'How do I get a refund?',
        a: 'Refunds are processed by Apple. Visit reportaproblem.apple.com, sign in with your Apple ID, find your Low Ox Life purchase, and request a refund.',
      },
      {
        q: 'Can I share my subscription with family?',
        a: 'Low Ox Life supports Family Sharing. If Family Sharing is enabled on your Apple ID, family members can access your subscription at no additional cost.',
      },
    ],
  },
  {
    label: 'Data & Sync',
    faqs: [
      {
        q: 'Where is my data stored?',
        a: 'Your food journal, recipes, custom foods, and grocery lists are stored securely on our servers and sync automatically across all your devices when you sign in with your Low Ox Life account. App preferences (theme, language) also sync via iCloud. All data is encrypted in transit (TLS 1.3) and at rest (AES-256).',
      },
      {
        q: "My data isn't syncing between devices",
        a: "Make sure you're signed into the same Low Ox Life account on all devices. Check your internet connection and try pulling down to refresh. If preferences (theme, language) aren't syncing, also verify iCloud is enabled: iPhone Settings > [Your Name] > iCloud > Apps Using iCloud.",
      },
      {
        q: 'How do I export my data?',
        a: 'Go to Account > Privacy Settings > Export Data to download all your data. Choose JSON (for backup) or CSV (for spreadsheets). You can save directly to iCloud Drive or share to any app. Exports include journal entries, recipes, custom food lists, and grocery lists.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. All data is encrypted in transit and at rest. Your health data is stored securely and is never shared with third parties. You can delete your account and all associated data at any time from Account settings.',
      },
    ],
  },
  {
    label: 'Tracking',
    faqs: [
      {
        q: 'How accurate is the oxalate data?',
        a: 'Our database is compiled from peer-reviewed research and updated regularly. However, oxalate content can vary based on growing conditions, preparation methods, and portion sizes. Use the data as a guide, not medical advice.',
      },
      {
        q: "A food I eat isn't in the database",
        a: 'You can request foods to be added by emailing appsupport@bigfreightlife.com with the food name and any source information you have. We prioritize adding commonly requested items.',
      },
      {
        q: 'What do the oxalate levels mean?',
        a: 'Low: Less than 5mg per serving. Medium: 5-15mg per serving. High: 15-50mg per serving. Very High: More than 50mg per serving. Your daily target depends on your individual health situation.',
      },
    ],
  },
  {
    label: 'AI Chat',
    faqs: [
      {
        q: 'How does the AI assistant work?',
        a: "The AI assistant helps answer questions about oxalates, suggest low-oxalate alternatives, and provide meal planning guidance. It's powered by advanced language models but is not a substitute for medical advice.",
      },
      {
        q: 'Is my chat history private?',
        a: 'Chat conversations are processed to provide responses but are not stored permanently or used for training. Your privacy is important to us.',
      },
    ],
  },
];

export default function LowOxLifeSupportPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(160deg, #1a1a1a 0%, #162226 100%)'
            : 'linear-gradient(160deg, #f0fdfa 0%, #e0f2fe 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'primary.main',
                mb: 1.5,
              }}
            >
              iOS App
            </Typography>
            <Typography
              variant="h1"
              sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}
            >
              Low Ox Life Support
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
              href="mailto:appsupport@bigfreightlife.com?subject=Low%20Ox%20Life%20Support"
              sx={{
                display: 'inline-block',
                color: 'primary.main',
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
                  Have an idea to improve Low Ox Life? Found a bug? Email us with your feedback. Please include:
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
