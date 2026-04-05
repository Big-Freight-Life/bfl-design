import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Bio Break | BFL Design',
  description: 'Bio Break is an iOS app for tracking bathroom habits, food, and symptoms. Understand your digestive health patterns with Apple Watch support and private iCloud sync.',
};
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CloudIcon from '@mui/icons-material/Cloud';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ProductHero from '@/components/products/ProductHero';
import ProductCta from '@/components/products/ProductCta';
import ProductSpotlightSection from '@/components/products/ProductSpotlightSection';
import ProductFeatureGridAnimated from '@/components/products/ProductFeatureGridAnimated';
import ProductPricingSection from '@/components/products/ProductPricingSection';
import ProductFaqSection from '@/components/products/ProductFaqSection';

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = '#0891B2';
const GRADIENT = 'linear-gradient(135deg, #0c3d4a 0%, #0a2333 50%, #061520 100%)';

const legalLinks = [
  { label: 'Privacy Policy', url: '/legal/bio-break-privacy' },
  { label: 'Terms of Service', url: '/legal/bio-break-terms' },
  { label: 'Apple EULA', url: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' },
  { label: 'Support', url: '/support/bio-break' },
];

const spotlights = [
  {
    title: 'Pattern Insights',
    headline: 'Understand Your Patterns.',
    desc: 'See your activity trends over time with daily comparison charts, 7-day averages, and intelligent hydration insights powered by your data.',
    bg: 'background.default',
    dark: false,
    image: '/images/products/biobreak-insights-device.png',
    imageAlt: 'Bio Break Insights - Weekly activity charts, heart rate trends, and personalized health insights',
  },
  {
    title: 'Activity History',
    headline: 'Every Break. Tracked.',
    desc: 'Browse your entries by date with quick filter chips for BB1, BB2, Food, and more. Each entry shows status tags at a glance.',
    bg: '#0a2333',
    dark: true,
    image: '/images/products/biobreak-history-device.png',
    imageAlt: 'Bio Break History - Daily log entries with BB1 and BB2 filter chips, status tags, and date navigation',
  },
  {
    title: 'Community Stats',
    headline: 'See How You Compare.',
    desc: 'Compare your average interval, peak hour, and urgency against anonymous community averages. Plus a monthly heat map calendar to visualize your activity at a glance.',
    bg: ACCENT,
    dark: true,
    image: '/images/products/biobreak-reports-device.png',
    imageAlt: 'Bio Break Community - Compare your stats against community averages with monthly heat map calendar',
  },
];

const features = [
  { title: 'Bristol Stool Scale', desc: 'Medical-grade reference built in. Track bowel movements using the standard Bristol Stool Scale (Types 1–7).', tier: 'Free', icon: <ListAltIcon /> },
  { title: 'Food & Symptom Tracking', desc: 'Log meals, symptoms, and medications alongside your bathroom habits for a complete picture.', tier: 'Free', icon: <RestaurantMenuIcon /> },
  { title: 'iCloud Sync', desc: 'Sync your data across iPhone and Apple Watch with end-to-end encrypted iCloud.', tier: 'Free', icon: <CloudIcon /> },
  { title: 'Smart Reminders', desc: 'Hydration reminders with quiet hours so you only get nudged when it matters.', tier: 'Free', icon: <NotificationsIcon /> },
  { title: 'Pattern Insights', desc: 'Trend analysis and pattern-based insights to help you understand your body over time.', tier: 'Pro', icon: <BarChartIcon /> },
  { title: 'Community Stats', desc: 'Compare your patterns against anonymous, aggregated community averages. Fully opt-in.', tier: 'Pro', icon: <GroupIcon /> },
  { title: 'Health Summary Reports', desc: 'Export PDF and CSV reports to share with your healthcare provider. Professional-grade documentation.', tier: 'Pro', icon: <DescriptionIcon /> },
  { title: 'Calendar Heat Map', desc: 'Visualize your patterns at a glance with a color-coded calendar view.', tier: 'Pro', icon: <CalendarTodayIcon /> },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'BB1 quick logging',
      'Food & symptom tracking',
      'Bristol Stool Scale',
      'Smart reminders',
      'iCloud sync',
      'Apple Watch companion app',
    ],
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: 'per month',
    highlighted: true,
    badge: 'Full Experience',
    features: [
      'Everything in Free',
      'BB2 tracking',
      'Pattern insights & trends',
      'Community stats comparison',
      'Health summary reports (PDF/CSV)',
      'Calendar heat map',
    ],
  },
];

const faqs = [
  {
    question: 'What is Bio Break?',
    answer: 'Bio Break is a health tracking app that helps you monitor bathroom habits, food intake, and symptoms to gain insights into hydration levels, digestive health, and overall wellness patterns. It works on iPhone and Apple Watch.',
  },
  {
    question: 'Is Bio Break free?',
    answer: 'Yes. The free tier includes BB1 quick logging, food and symptom tracking, Bristol Stool Scale reference, smart reminders, iCloud sync, and the full Apple Watch companion app.',
  },
  {
    question: 'What does Pro add?',
    answer: 'Pro ($4.99/month with a 7-day free trial) adds BB2 tracking, pattern insights with trend analysis, anonymous community stats, health summary reports (PDF/CSV), and a calendar heat map.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely. Bio Break is private by default — all data is encrypted at rest on your device. There are no ads, no third-party analytics, and no tracking. iCloud sync uses end-to-end encryption.',
  },
  {
    question: 'Does it work on Apple Watch?',
    answer: "Yes. The full Apple Watch companion app lets you log breaks, view time since last break, see today's count, and check your 7-day average — all from your wrist. It includes 5 widgets across 4 complication families.",
  },
  {
    question: 'Is Bio Break medical advice?',
    answer: 'No. Bio Break is for informational and tracking purposes only. The Bristol Stool Scale and urine color references should not replace professional medical evaluation. Always consult a qualified healthcare provider.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BioBreakPage() {
  return (
    <Box>
      {/* Hero */}
      <ProductHero
        category="iOS App"
        name="Bio Break"
        tagline="Know Your Body Better"
        headline="Know Your Body Better."
        subheadline="Track bathroom habits, food, and symptoms on iPhone and Apple Watch. Understand your patterns and share reports with your doctor."
        ctaUrl="#"
        ctaText="View in App Store"
        ctaExternal
        price="Free"
        priceNote="Pro upgrade $4.99/month · 7-day free trial"
        gradient={GRADIENT}
        accentColor={ACCENT}
      />

      {/* Value Prop */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.8, color: 'text.secondary' }}
          >
            Bathroom habits say a lot about your health — but tracking them shouldn&#39;t feel awkward.
            Bio Break makes it simple, private, and insightful. Log in seconds, understand your
            patterns, and take better care of your body.
          </Typography>
        </Container>
      </Box>

      <ProductSpotlightSection spotlights={spotlights} accentColor={ACCENT} />

      <ProductFeatureGridAnimated
        features={features}
        accentColor={ACCENT}
        subheadline="Simple logging. Powerful insights. Designed for your privacy."
      />

      <ProductPricingSection
        tiers={pricingTiers}
        accentColor={ACCENT}
        cardSize={{ xs: 12, sm: 6, md: 4 }}
        justify="center"
      />

      <ProductFaqSection faqs={faqs} accentColor={ACCENT} />

      {/* Final CTA */}
      <ProductCta
        headline="Start Tracking for Free"
        description="Download Bio Break and start understanding your body. Upgrade to Pro anytime for insights, health summary reports, and community stats."
        ctaText="View in App Store"
        ctaUrl="#"
        ctaExternal
        gradient={GRADIENT}
        accentColor={ACCENT}
        legalLinks={legalLinks}
      />
    </Box>
  );
}
