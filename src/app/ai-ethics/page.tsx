'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const principles = [
  {
    title: 'Transparency',
    description:
      'We disclose when and how AI is used in our products and processes. You will never have to guess whether AI played a role — we tell you upfront.',
  },
  {
    title: 'Human Oversight',
    description:
      'AI assists, humans decide. Every AI-generated output is reviewed, validated, and approved by a real person before it reaches our users or goes into production.',
  },
  {
    title: 'Privacy First',
    description:
      'No user data is ever used for AI training. Your personal information stays yours. We build features that respect your privacy by default, not as an afterthought.',
  },
  {
    title: 'Accuracy & Honesty',
    description:
      'We verify AI outputs against trusted sources and never present AI-generated content as human-written without review. Accuracy is non-negotiable in health-related apps.',
  },
  {
    title: 'Fairness',
    description:
      'We actively test for bias in AI-assisted features and data. Every user deserves equitable outcomes regardless of background, and we build our tools with that standard.',
  },
  {
    title: 'Continuous Learning',
    description:
      'AI ethics is a moving target. We stay current with emerging best practices, revisit our policies regularly, and evolve our approach as the technology and its implications mature.',
  },
];

const usageTabs = [
  {
    label: 'Product Development',
    heading: 'AI-Assisted, Human-Built',
    description:
      'We use AI to accelerate code review, catch bugs early, generate test cases, and explore implementation approaches. Every line of code that ships is reviewed, tested, and approved by our development team.',
    bullets: [
      'Code review and refactoring suggestions',
      'Automated test generation and edge case discovery',
      'Rapid prototyping and technical exploration',
      'Documentation drafting and maintenance',
    ],
  },
  {
    label: 'Content & Copy',
    heading: 'Drafted by AI, Shaped by Humans',
    description:
      'AI helps us draft initial content faster, but every word you read has been edited, fact-checked, and refined by a human. We never publish raw AI output. Our voice, tone, and accuracy standards are set by people.',
    bullets: [
      'Initial content drafts and outlines',
      'Grammar and clarity improvements',
      'Research summarization for blog posts',
      'All health-related claims verified against peer-reviewed sources',
    ],
  },
  {
    label: 'Design',
    heading: 'AI Explores, Humans Craft',
    description:
      'We use AI to explore visual concepts, generate layout options, and brainstorm ideas quickly. But the final designs you see in our products are crafted by human designers who understand context, accessibility, and brand.',
    bullets: [
      'Rapid concept exploration and moodboarding',
      'Layout and component pattern suggestions',
      'Color palette and typography experimentation',
      'All final UI decisions made by human designers',
    ],
  },
  {
    label: 'Data Analysis',
    heading: 'Insights From Data, Not Identities',
    description:
      "When we use AI for data analysis, we work exclusively with anonymized, aggregated data. AI helps us spot trends and surface insights that improve our products — never to identify, profile, or target individual users.",
    bullets: [
      'Aggregated usage pattern analysis',
      'Feature adoption and UX improvement insights',
      'Anonymized crash and performance diagnostics',
      'No individual user data ever processed by AI',
    ],
  },
];

const chartBars = [
  { name: 'Code Review', pct: 40 },
  { name: 'Content Writing', pct: 30 },
  { name: 'Visual Design', pct: 15 },
  { name: 'User Research', pct: 10 },
  { name: 'Strategic Decisions', pct: 5 },
];

const pledgeItems = [
  'We will always disclose AI involvement in our products and content.',
  'We will never use your personal data to train AI models.',
  'Every AI output will be reviewed by a qualified human before publication.',
  'Health-related content will always be verified against peer-reviewed sources.',
  'We will regularly review and update this policy as AI technology evolves.',
  'We will proactively test for and address bias in AI-assisted features.',
];

export default function AIEthicsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          py: { xs: 10, md: 16 },
          minHeight: { md: '60vh' },
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(160deg, #f9fafb 0%, #f0fdfa 100%)',
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Grid pattern */}
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
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 2,
              py: 0.75,
              bgcolor: 'rgba(20,184,166,0.1)',
              color: 'primary.main',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              mb: 3,
            }}
          >
            Our Commitment
          </Box>
          <Typography
            variant="h1"
            sx={{ mb: 3, maxWidth: 700, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Built With AI. Guided By Principles.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            We believe AI is a powerful tool — not a replacement for human judgment. At Big Freight Life, we use AI thoughtfully across our products and processes, with clear boundaries, full transparency, and an unwavering commitment to our users.
          </Typography>
        </Container>
      </Box>

      {/* Core Principles */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 1 }}>Our Core Principles</Typography>
            <Typography variant="body1" color="text.secondary">
              Six commitments that guide every decision we make about AI.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {principles.map((p) => (
              <Paper
                key={p.title}
                sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.description}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How We Use AI */}
      <Box
        component="section"
        sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" sx={{ mb: 1 }}>How We Use AI</Typography>
            <Typography variant="body1" color="text.secondary">
              AI plays a supporting role across our workflow. Here is exactly where and how.
            </Typography>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            {usageTabs.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>

          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>{usageTabs[activeTab].heading}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {usageTabs[activeTab].description}
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0, color: 'text.secondary' }}>
              {usageTabs[activeTab].bullets.map((b) => (
                <li key={b}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>{b}</Typography>
                </li>
              ))}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* AI Involvement Chart */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" sx={{ mb: 1 }}>AI Involvement Across Our Work</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: 'auto' }}>
              A transparent look at how much AI contributes to different areas of our business. Human judgment leads every category.
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 700, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {chartBars.map((bar) => (
              <Box key={bar.name}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{bar.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{bar.pct}%</Typography>
                </Box>
                <Box sx={{ height: 8, bgcolor: 'grey.200', borderRadius: '9999px', overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${bar.pct}%`,
                      bgcolor: 'primary.main',
                      borderRadius: '9999px',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
            Percentages represent estimated AI involvement. All work is ultimately reviewed and approved by humans.
          </Typography>
        </Container>
      </Box>

      {/* Our Pledge */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'grey.900',
          color: 'common.white',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" sx={{ color: 'common.white', mb: 1 }}>Our Pledge to You</Typography>
            <Typography sx={{ color: 'grey.400', maxWidth: 560, mx: 'auto' }}>
              We hold ourselves to these commitments as we integrate AI into our work. This is our promise — and our accountability.
            </Typography>
          </Box>

          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: 'grey.800', border: '1px solid', borderColor: 'grey.700' }}>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {pledgeItems.map((item) => (
                <Box component="li" key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'primary.light', mt: 0.25, flexShrink: 0, fontSize: 20 }} />
                  <Typography sx={{ color: 'grey.200' }}>{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'grey.500', display: 'block', mt: 4 }}>
              Last updated: March 2026
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Contact CTA */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2 }}>Questions About Our AI Practices?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 520, mx: 'auto' }}>
            We welcome questions, feedback, and conversation about how we use AI. Transparency means being open to dialogue.
          </Typography>
          <Button component={Link} href="/contact" variant="contained" size="large">
            Get in Touch
          </Button>
        </Container>
      </Box>

    </Box>
  );
}
