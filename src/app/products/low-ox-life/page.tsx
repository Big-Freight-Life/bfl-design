import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Low Ox Life | BFL Design',
  description: 'Low Ox Life is the only iOS app built on the Harvard 2023 Oxalate Table. Browse 400+ foods free, track daily oxalate intake, and sync across devices.',
};
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ProductHero from '@/components/products/ProductHero';
import ProductCta from '@/components/products/ProductCta';
import ProductSpotlightSection from '@/components/products/ProductSpotlightSection';
import ProductFeatureGrid from '@/components/products/ProductFeatureGrid';
import ProductPricingSection from '@/components/products/ProductPricingSection';
import ProductFaqSection from '@/components/products/ProductFaqSection';

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = '#24A89C';
const DARK = '#0B3733';
const GRADIENT = 'linear-gradient(135deg, #145c53 0%, #0B3733 45%, #1a0a3a 85%, #061a17 100%)';

const legalLinks = [
  { label: 'Privacy Policy', url: '/legal/low-ox-life-privacy' },
  { label: 'Terms of Service', url: '/legal/low-ox-life-terms' },
  { label: 'Apple EULA', url: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' },
  { label: 'Support', url: '/support/low-ox-life' },
];

const spotlights = [
  {
    title: 'Harvard Database',
    headline: '400+ Foods. One Search.',
    desc: 'Browse the complete Harvard 2023 Oxalate Table with serving sizes and oxalate content for every food. Search instantly and filter by oxalate level.',
    bg: 'background.default',
  },
  {
    title: 'Food Journal',
    headline: 'Log Meals. Track Intake.',
    desc: 'Add foods to your daily journal with one tap. Track your total oxalate intake over time with date navigation and daily summaries.',
    bg: DARK,
    dark: true,
  },
  {
    title: 'Cloud Sync',
    headline: 'Your Data. Every Device.',
    desc: 'Sign in with Apple and your journal, favorites, and custom foods sync seamlessly across all your devices.',
    bg: ACCENT,
    dark: true,
  },
];

const features = [
  { title: 'Quick Search', desc: 'Find any food instantly with fast, responsive search.', tier: 'Free', icon: <SearchIcon /> },
  { title: 'Smart Filters', desc: 'Filter by oxalate level (very low, low, moderate, high, very high).', tier: 'Free', icon: <FilterListIcon /> },
  { title: 'Journal History', desc: 'View past entries with date navigation.', tier: 'Starter', icon: <CalendarTodayIcon /> },
  { title: 'Custom Food Import', desc: 'Import your own food lists from CSV files.', tier: 'Pro', icon: <UploadFileIcon /> },
  { title: 'Grocery Lists', desc: 'Create and manage low-oxalate shopping lists.', tier: 'Pro', icon: <ShoppingCartIcon /> },
  { title: 'Insights & Trends', desc: 'Review pattern-based insights and monitor progress over time.', tier: 'Elite', icon: <BarChartIcon /> },
  { title: 'Recipe Builder', desc: 'Create and save custom recipes with automatic oxalate calculations.', tier: 'Elite', icon: <MenuBookIcon /> },
  { title: 'Oscar AI Assistant', desc: 'AI-powered guidance about oxalate management, powered by Google Gemini. Not medical advice.', tier: 'Elite', icon: <ChatBubbleIcon />, comingSoon: true },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Browse 400+ foods', 'Harvard 2023 Oxalate Table', 'Search & filter by level'],
  },
  {
    name: 'Starter',
    price: '$4.99',
    period: 'per month',
    highlighted: true,
    badge: 'Most Popular',
    features: ['Everything in Free', 'Food logging & journal', 'Journal history', 'Cloud sync across devices'],
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    features: ['Everything in Starter', 'Custom food imports (CSV)', 'Grocery list builder'],
  },
  {
    name: 'Elite',
    price: '$14.99',
    period: 'per month',
    features: ['Everything in Pro', 'Insights & trends', 'Recipe builder', 'Oscar AI assistant'],
  },
];

const faqs = [
  {
    question: 'What is Low Ox Life?',
    answer: 'Low Ox Life is an iOS app for managing oxalate intake. It provides access to the Harvard 2023 Oxalate Table with 400+ foods, complete with serving sizes and oxalate content.',
  },
  {
    question: 'Is Low Ox Life free?',
    answer: 'Yes, browsing the food database is completely free. The optional Starter subscription ($4.99/month or $49.99/year) adds food logging, journal history, and cloud sync.',
  },
  {
    question: "What's included free vs Starter?",
    answer: 'Free: Browse 400+ foods, search, and filter by oxalate level. Starter: Log food to your journal, view journal history with date navigation, and sync data across devices.',
  },
  {
    question: 'What about Pro and Elite subscriptions?',
    answer: 'Pro ($9.99/month) adds custom food list imports and grocery lists. Elite ($14.99/month) adds insights and trends, recipe builder, and the Oscar AI assistant (coming soon).',
  },
  {
    question: 'Is Low Ox Life medical advice?',
    answer: 'No. Low Ox Life is a tracking and reference tool for informational purposes only. Always consult your healthcare provider for medical guidance. This app does not diagnose, treat, or cure any condition.',
  },
  {
    question: 'What iOS version is required?',
    answer: 'Low Ox Life requires iOS 16.7 or later and is available for iPhone.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LowOxLifePage() {
  return (
    <Box>
      {/* Hero */}
      <ProductHero
        category="iOS App"
        name="Low Ox Life"
        tagline="Oxalate Management Companion"
        headline="Know Your Oxalates."
        subheadline="The only iOS app built on the Harvard 2023 Oxalate Table. Browse 400+ foods free, or upgrade to track your daily intake."
        ctaUrl="https://apps.apple.com/us/app/low-ox-life-list/id6748654148"
        ctaText="View in App Store"
        ctaExternal
        secondaryUrl="https://www.facebook.com/groups/lowoxlife"
        secondaryText="Join Facebook Community"
        price="Free"
        priceNote="Subscriptions starting at $4.99/month"
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
            Low Ox Life gives you evidence-based oxalate data at your fingertips. Search the complete
            Harvard 2023 database, filter by oxalate level, log meals to your journal, and sync across
            every device — designed for people who take their health seriously.
          </Typography>
        </Container>
      </Box>

      <ProductSpotlightSection spotlights={spotlights} accentColor={ACCENT} />

      <ProductFeatureGrid
        features={features}
        accentColor={ACCENT}
        subheadline="A complete suite of tools for managing your oxalate intake."
      />

      <ProductPricingSection tiers={pricingTiers} accentColor={ACCENT} />

      <ProductFaqSection faqs={faqs} accentColor={ACCENT} />

      {/* Final CTA */}
      <ProductCta
        headline="Start Tracking Today"
        description="Browse the Harvard 2023 Oxalate Table for free. Upgrade to Starter anytime to unlock food logging and cloud sync."
        ctaText="View in App Store"
        ctaUrl="https://apps.apple.com/us/app/low-ox-life-list/id6748654148"
        ctaExternal
        gradient={GRADIENT}
        accentColor={ACCENT}
        legalLinks={legalLinks}
      />
    </Box>
  );
}
