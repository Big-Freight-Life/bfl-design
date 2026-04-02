'use client';

import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import GrassIcon from '@mui/icons-material/Grass';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import VerifiedShieldIcon from '@mui/icons-material/VerifiedUser';
import PricingTier from '@/components/products/PricingTier';
import FaqAccordion from '@/components/products/FaqAccordion';

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = '#4F46E5';
const GRADIENT = 'linear-gradient(135deg, #1e1b4b 0%, #0f0e2a 60%, #07060f 100%)';

const legalLinks = [
  { label: 'Privacy Policy', url: '/legal/24h-urine-privacy' },
  { label: 'Terms of Service', url: '/legal/24h-urine-terms' },
  { label: 'Apple EULA', url: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' },
  { label: 'Support', url: '/support/24h-urine-analysis' },
];

const steps = [
  {
    number: 1,
    label: 'Scan',
    title: 'Scan',
    desc: 'Point your camera at your lab report. Our scanner automatically detects and captures every page.',
    icon: <CameraAltIcon sx={{ fontSize: 28 }} />,
  },
  {
    number: 2,
    label: 'Review',
    title: 'Review',
    desc: 'Verify the extracted values are correct. Edit anything the scanner missed.',
    icon: <DescriptionIcon sx={{ fontSize: 28 }} />,
  },
  {
    number: 3,
    label: 'Get Insights',
    title: 'Get Insights',
    desc: 'AI analyzes your results and delivers personalized health insights in seconds.',
    icon: <BoltIcon sx={{ fontSize: 28 }} />,
  },
];

const bentoItems = [
  {
    title: 'Risk Assessment',
    desc: 'Understand your risk levels for kidney stones, metabolic conditions, and more.',
    icon: <ShieldIcon sx={{ fontSize: 32, color: ACCENT }} />,
    large: true,
  },
  {
    title: 'Dietary Impact',
    desc: 'See how your diet affects your results with personalized nutrition guidance.',
    icon: <GrassIcon sx={{ fontSize: 32, color: ACCENT }} />,
    large: false,
  },
  {
    title: 'Doctor Prep',
    desc: 'Generate a preparation sheet with key talking points for your next appointment.',
    icon: <AssignmentIcon sx={{ fontSize: 32, color: ACCENT }} />,
    large: false,
  },
  {
    title: 'Trend Tracking',
    desc: 'Track changes over time and monitor your progress across multiple tests.',
    icon: <TrendingUpIcon sx={{ fontSize: 32, color: ACCENT }} />,
    large: true,
  },
];

const trustBadges = [
  { title: 'AES-256 Encryption', icon: <LockIcon sx={{ fontSize: 32 }} /> },
  { title: 'On-Device Processing', icon: <SmartphoneIcon sx={{ fontSize: 32 }} /> },
  { title: 'HIPAA-Aligned', icon: <VerifiedShieldIcon sx={{ fontSize: 32 }} /> },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['1 analysis credit', 'Basic risk insights', 'Value extraction'],
  },
  {
    name: 'Single Analysis',
    price: '$X',
    period: 'one-time',
    features: ['1 analysis credit', 'Full AI insights', 'Doctor prep sheet'],
  },
  {
    name: '3-Pack',
    price: '$X',
    period: 'one-time',
    badge: 'Save X%',
    features: ['3 analysis credits', 'Full AI insights', 'Doctor prep sheet', 'Trend tracking'],
  },
  {
    name: '24-Hour Pass',
    price: '$X',
    period: 'one-time',
    features: ['Unlimited for 24 hours', 'Full AI insights', 'Doctor prep sheet', 'Trend tracking'],
  },
  {
    name: 'Monthly',
    price: '$X',
    period: 'per month',
    highlighted: true,
    badge: 'Most Popular',
    features: ['Unlimited analyses', 'Full AI insights', 'Doctor prep sheet', 'Trend tracking', 'Priority support'],
  },
  {
    name: 'Annual',
    price: '$X',
    period: 'per year',
    badge: 'Save X%',
    features: ['Unlimited analyses', 'Full AI insights', 'Doctor prep sheet', 'Trend tracking', 'Priority support'],
  },
];

const faqs = [
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI is trained on established medical reference ranges and provides analysis consistent with standard lab interpretations. However, it is not a substitute for professional medical evaluation. Always consult your healthcare provider for diagnosis and treatment decisions.',
  },
  {
    question: 'What types of lab reports are supported?',
    answer: '24-Hour Urine Analysis supports standard 24-hour urine collection lab reports from major laboratories. The scanner recognizes common formats and extracts values including calcium, oxalate, citrate, uric acid, sodium, magnesium, phosphorus, and more.',
  },
  {
    question: 'Is my health data secure?',
    answer: 'Absolutely. All data is encrypted with AES-256 on your device. Personal information is stripped before any AI processing. We follow HIPAA-aligned security practices and never sell or share your health data.',
  },
  {
    question: 'Can I use this instead of seeing a doctor?',
    answer: 'No. This app is an educational tool designed to help you understand your lab results and prepare for conversations with your healthcare provider. It does not provide medical diagnoses, treatment recommendations, or replace professional medical care.',
  },
  {
    question: 'How do analysis credits work?',
    answer: 'Each analysis credit lets you scan one lab report and receive a full AI-powered interpretation. Free accounts include one credit. You can purchase additional credits individually, in packs, or subscribe for unlimited analyses.',
  },
  {
    question: 'Can I track results over time?',
    answer: 'Yes. The app stores your past analyses so you can compare results across multiple tests. The trend tracking feature highlights changes in your values and helps you monitor progress over time.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function UrineAnalysisPage() {
  return (
    <Box component="main" sx={{ '--product-accent': ACCENT } as React.CSSProperties}>

      {/* 1. Hero */}
      <Box
        component="section"
        sx={{
          background: GRADIENT,
          color: '#fff',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="overline"
                sx={{
                  color: `${ACCENT}cc`,
                  letterSpacing: '0.1em',
                  mb: 1,
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                iOS App
              </Typography>
              <Typography
                variant="h1"
                fontWeight={700}
                sx={{ color: '#fff', fontSize: { xs: '2rem', md: '3rem' }, mb: 1, lineHeight: 1.1 }}
              >
                24-Hour Urine Analysis
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: `${ACCENT}bb`, fontWeight: 400, mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}
              >
                Understand Your Lab Results in Minutes
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', lineHeight: 1.7, mb: 4 }}
              >
                AI-powered analysis turns complex 24-hour urine test results into clear, actionable health insights.
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component="a"
                  href="#"
                  target="_blank"
                  rel="noopener"
                  sx={{ display: 'block' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    width={156}
                    height={52}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Free to try
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              {/* Animated step cards */}
              <Stack spacing={2}>
                {steps.map((s) => (
                  <Box
                    key={s.number}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2.5,
                      borderRadius: '1rem',
                      bgcolor: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        bgcolor: `${ACCENT}33`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ACCENT,
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                        Step {s.number}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#fff' }}>
                        {s.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. The Problem */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontStyle: 'italic',
                mb: 3,
                lineHeight: 1.5,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', md: '1.75rem' },
              }}
            >
              &ldquo;Your lab report arrives. Pages of numbers, ranges, and medical terminology. What does it all mean?&rdquo;
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
              24-hour urine tests generate dense reports with dozens of values. Understanding what falls
              outside normal ranges, what those ranges mean for your health, and what to discuss with
              your doctor can feel overwhelming. You deserve clarity.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* 3. How It Works — Timeline */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 8, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            How It Works
          </Typography>
          <Stack spacing={6}>
            {steps.map((step, i) => (
              <Grid
                container
                spacing={4}
                alignItems="center"
                key={step.number}
                direction={i % 2 === 0 ? 'row' : 'row-reverse'}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: `${ACCENT}18`,
                        border: `2px solid ${ACCENT}44`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ACCENT,
                        flexShrink: 0,
                        fontWeight: 700,
                        fontSize: '1.25rem',
                      }}
                    >
                      {step.number}
                    </Box>
                    <Box>
                      <Box sx={{ color: ACCENT, mb: 1 }}>{step.icon}</Box>
                      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {step.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      bgcolor: 'grey.100',
                      borderRadius: '1.5rem',
                      height: 240,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.disabled">
                      App screenshot
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* 4. AI-Powered Insights — Bento Grid */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 6, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            AI-Powered Insights
          </Typography>
          <Grid container spacing={3}>
            {bentoItems.map((item) => (
              <Grid size={{ xs: 12, sm: item.large ? 8 : 4 }} key={item.title}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '1.25rem',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.08)' },
                  }}
                >
                  {item.icon}
                  <Typography variant="h5" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 5. Privacy / Trust */}
      <Box
        component="section"
        sx={{ py: { xs: 8, md: 12 }, background: GRADIENT, color: '#fff' }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ color: '#e0e7ff', mb: 6, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Your Privacy, Our Priority
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {trustBadges.map((badge) => (
              <Grid size={{ xs: 12, sm: 4 }} key={badge.title}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: `${ACCENT}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: `${ACCENT}dd`,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {badge.icon}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#fff' }}>
                    {badge.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: 'rgba(255,255,255,0.55)', mt: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}
          >
            Your health data never leaves your device unencrypted. We use military-grade encryption
            and strip all personal information before AI analysis.
          </Typography>
        </Container>
      </Box>

      {/* 6. Pricing */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Simple Pricing
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            Start free. Pay only for what you need.
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {pricingTiers.map((tier) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tier.name}>
                <PricingTier
                  name={tier.name}
                  price={tier.price}
                  period={tier.period}
                  features={tier.features}
                  highlighted={tier.highlighted}
                  badge={tier.badge}
                  accentColor={ACCENT}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 7. FAQ */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 6, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Frequently Asked Questions
          </Typography>
          <FaqAccordion faqs={faqs} accentColor={ACCENT} />
        </Container>
      </Box>

      {/* 8. Final CTA */}
      <Box
        component="section"
        sx={{ py: { xs: 8, md: 12 }, background: GRADIENT, color: '#fff', textAlign: 'center' }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{ color: '#fff', mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
          >
            Take Control of Your Health Data
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}
          >
            Scan your lab report. Understand your results. Prepare for your next appointment.
          </Typography>
          <Box
            component="a"
            href="#"
            target="_blank"
            rel="noopener"
            sx={{ display: 'inline-block', mb: 4 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              width={156}
              height={52}
            />
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
            {legalLinks.map((link) => (
              <Typography
                key={link.label}
                component="a"
                href={link.url}
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  '&:hover': { color: 'rgba(255,255,255,0.8)' },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
