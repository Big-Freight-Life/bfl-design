import { Box, Container, Typography, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ProductHero from '@/components/products/ProductHero';
import FeatureCard from '@/components/products/FeatureCard';
import PricingTier from '@/components/products/PricingTier';
import FaqAccordion from '@/components/products/FaqAccordion';
import ProductCta from '@/components/products/ProductCta';

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
    bg: '#0B3733',
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
    <Box component="main">
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

      {/* Feature Spotlights */}
      {spotlights.map((s) => (
        <Box
          key={s.title}
          component="section"
          sx={{
            py: { xs: 8, md: 12 },
            bgcolor: s.bg,
            color: s.dark ? '#fff' : 'inherit',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: s.dark ? 'rgba(255,255,255,0.6)' : ACCENT,
                    letterSpacing: '0.1em',
                    mb: 1,
                    display: 'block',
                  }}
                >
                  {s.title}
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  sx={{
                    color: s.dark ? '#fff' : 'text.primary',
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 2,
                  }}
                >
                  {s.headline}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: s.dark ? 'rgba(255,255,255,0.75)' : 'text.secondary',
                    lineHeight: 1.7,
                    fontSize: '1.05rem',
                  }}
                >
                  {s.desc}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    bgcolor: s.dark ? 'rgba(255,255,255,0.08)' : 'grey.100',
                    borderRadius: '1.5rem',
                    height: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color={s.dark ? 'rgba(255,255,255,0.3)' : 'text.disabled'}>
                    App screenshot
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}

      {/* Feature Grid */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Everything You Need
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            A complete suite of tools for managing your oxalate intake.
          </Typography>
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
                <FeatureCard
                  title={f.title}
                  desc={f.desc}
                  tier={f.tier}
                  icon={f.icon}
                  accentColor={ACCENT}
                  comingSoon={f.comingSoon}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing */}
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
            Start free. Upgrade when you&#39;re ready.
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {pricingTiers.map((tier) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tier.name}>
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

      {/* FAQ */}
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
