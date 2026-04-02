'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const tiers = [
  {
    id: 'solo',
    label: 'Solo',
    price: '$299',
    priceNote: 'per person',
    title: '1:1 with Ray',
    desc: 'Personalized coaching sessions tailored to your goals. Work through your specific challenges with direct feedback.',
    features: [
      '4 weekly 1:1 sessions',
      'Personalized frameworks',
      'Async support between sessions',
      'Lifetime access to materials',
    ],
  },
  {
    id: 'team',
    label: 'Team',
    price: '$999',
    priceNote: 'per team (up to 8)',
    title: 'Team Cohort',
    desc: 'Bring your whole team through the course together. Shared exercises, group dynamics, and aligned frameworks.',
    features: [
      '4 weekly live sessions',
      'Team-specific exercises',
      'Group pricing (up to 8 seats)',
      'Shared workspace and recordings',
    ],
    default: true,
  },
  {
    id: 'family',
    label: 'Family',
    price: '$499',
    priceNote: 'per family (up to 5)',
    title: 'Family Plan',
    desc: 'Learn together as a family. Build shared decision-making habits and communication skills that stick at home.',
    features: [
      '4 weekly live sessions',
      'Family-friendly exercises',
      'Up to 5 family members',
      'Lifetime access to materials',
    ],
  },
];

const checklistItems = [
  {
    title: 'From Problem to System',
    body: 'Learn how to frame problems clearly, map complexity, and build repeatable workflows, from first principles to daily practice.',
  },
  {
    title: 'Real-World Exercises & Case Studies',
    body: 'Work through real scenarios, not hypotheticals. Every session includes hands-on exercises you can apply to your actual work immediately.',
  },
  {
    title: 'Practical, Hands-On Format',
    body: 'No lectures. No slide decks. Solidify your skills through live collaboration, peer feedback, and guided practice you can feel working.',
  },
  {
    title: '1:1 Feedback & Personalized Support',
    body: 'Get direct feedback on your frameworks and decisions. Small cohort size means real attention, not just content delivery.',
  },
  {
    title: 'Resources & Ongoing Community',
    body: 'Walk away with a personal library of frameworks and tools, plus access to the alumni community for continued support after the workshop ends.',
  },
];

const curriculumModules = [
  {
    title: 'Problem Framing & Systems Thinking',
    items: [
      'How to identify the real problem behind the obvious one',
      'Mapping systems: inputs, outputs, and feedback loops',
      'Framing exercises with real-world scenarios',
      'Building your personal problem-framing template',
    ],
  },
  {
    title: 'Decision Frameworks & Trade-offs',
    items: [
      'Decision matrices and weighted evaluation',
      'When to commit vs. when to keep options open',
      'Managing risk without paralysis',
      'Practice: making high-stakes calls with incomplete info',
    ],
  },
  {
    title: 'Communication, Feedback & Alignment',
    items: [
      'Structuring your message for clarity and impact',
      'Giving and receiving feedback that moves things forward',
      'Getting buy-in without selling',
      'Practice: alignment exercises in pairs and small groups',
    ],
  },
  {
    title: 'Building Your Repeatable System',
    items: [
      'Synthesizing your frameworks into a personal workflow',
      'Building habits that stick beyond the workshop',
      'Defining your ongoing practice and accountability plan',
      'Final exercise: present your system to the cohort',
    ],
  },
];

const audienceItems = [
  {
    title: 'Designers & Builders',
    body: "You're good at making things. This helps you decide what to make, and why, with more confidence.",
  },
  {
    title: 'Founders & Solopreneurs',
    body: "When every decision is yours, having a system to weigh trade-offs and move forward saves time and sanity.",
  },
  {
    title: 'Leaders & Managers',
    body: "Navigate team complexity, align stakeholders, and make better calls when the pressure is on.",
  },
];

const includedItems = [
  {
    title: 'Live Sessions',
    body: 'Weekly live sessions with real-time Q&A and group exercises.',
  },
  {
    title: 'Lifetime Access',
    body: 'All materials, recordings, and frameworks. Yours to keep forever.',
  },
  {
    title: 'Peer Community',
    body: 'Join a small, curated group of peers for accountability and support.',
  },
  {
    title: 'Certificate',
    body: 'Certificate of completion to share with your network.',
  },
];

const faqs = [
  {
    q: 'What if I miss a live session?',
    a: "All sessions are recorded and available within 24 hours. You'll have lifetime access to every recording, plus the exercises and materials. That said, the live experience is where the magic happens, so we encourage attending live whenever possible.",
  },
  {
    q: 'How much time do I need to commit each week?',
    a: 'Plan for about 3-4 hours per week: a 90-minute live session plus time for exercises and reflection. The work is designed to integrate into your existing projects, not add to your pile.',
  },
  {
    q: 'Are there any prerequisites?',
    a: "No specific background required. This workshop is designed for anyone who makes decisions about what to build, how to build it, or how to lead the people doing the building. Whether you're a designer, engineer, founder, or manager, the frameworks apply.",
  },
  {
    q: 'What will I actually build during the workshop?',
    a: "You'll build your own personal operating system, a documented set of frameworks, decision tools, and habits tailored to your work. By Week 4, you'll present it to the cohort and walk away with something you can use immediately.",
  },
  {
    q: 'How is this different from 1:1 coaching?',
    a: "Coaching is personalized and open-ended. We work on whatever you need. The workshop is structured, cohort-based, and curriculum-driven. You get the benefit of learning alongside peers, group exercises, and a defined progression. Many people do both.",
  },
  {
    q: "I'm not sure if this is right for me. Who is it for?",
    a: "If you're someone who makes things (products, teams, businesses, decisions) and you want a better system for doing it, this is for you. If you're looking for a quick hack or a certification to pad your resume, this probably isn't the right fit.",
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WorkshopPage() {
  const [activeTier, setActiveTier] = useState<string>('team');
  const currentTier = tiers.find((t) => t.id === activeTier) ?? tiers[1];

  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="header"
        sx={{
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
          py: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: 'clamp(2.25rem, 5vw, 3.5rem)' },
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.1,
                  mb: 4,
                }}
              >
                Design For The Rest Of Us
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box
                  component="img"
                  src="/images/ray-butler-profile.png"
                  alt="Ray Butler"
                  sx={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                />
                <Box>
                  <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
                    Ray Butler
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Designer and Founder, Big Freight Life
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', '&:hover': { borderColor: '#14B8A6' } }}
                >
                  View Syllabus
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', '&:hover': { borderColor: '#14B8A6' } }}
                >
                  Check Availability
                </Button>
              </Box>
            </Grid>

            {/* Pricing sidebar card in hero on desktop */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Tier selector */}
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  {tiers.map((tier) => (
                    <Button
                      key={tier.id}
                      variant={activeTier === tier.id ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => setActiveTier(tier.id)}
                      sx={{
                        flex: 1,
                        fontSize: '0.75rem',
                        ...(activeTier === tier.id
                          ? { bgcolor: '#117680', color: '#fff', '&:hover': { bgcolor: '#0e5f67' } }
                          : { borderColor: 'rgba(255,255,255,0.2)', color: 'grey.300' }),
                      }}
                    >
                      {tier.label}
                    </Button>
                  ))}
                </Box>

                {/* Pricing */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h2" sx={{ color: '#fff', fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                    {currentTier.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {currentTier.priceNote}
                  </Typography>
                </Box>

                <Typography variant="h3" sx={{ color: '#fff', fontSize: '1rem', fontWeight: 600, mb: 1 }}>
                  {currentTier.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', mb: 2, lineHeight: 1.625 }}>
                  {currentTier.desc}
                </Typography>

                <List disablePadding sx={{ mb: 3 }}>
                  {currentTier.features.map((f) => (
                    <ListItem key={f} disablePadding sx={{ py: 0.5, gap: 1, alignItems: 'flex-start' }}>
                      <Box sx={{ color: '#14B8A6', flexShrink: 0, mt: 0.25 }}>
                        <CheckIcon />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'grey.300' }}>
                        {f}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: '#117680', color: '#fff', '&:hover': { bgcolor: '#0e5f67' } }}
                >
                  Get Started
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Overview */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '52rem' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.375rem', md: '1.5rem' },
                fontWeight: 600,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Learn actionable systems-thinking skills to gain a competitive edge
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.625, mb: 2 }}>
              The people who consistently do great work aren&#39;t smarter, they think more clearly. They
              have systems for navigating ambiguity, making decisions under pressure, and communicating
              with precision.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.625, mb: 6 }}>
              In this intensive course you will build your own systems. Each week will be packed with
              practical frameworks, hands-on exercises, and 1:1 feedback to give you the instincts that
              make great work repeatable.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {checklistItems.map((item) => (
                <Box key={item.title} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: 'rgba(20,184,166,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#14B8A6',
                      mt: 0.25,
                    }}
                  >
                    <CheckIcon />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.625 }}>
                      {item.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Curriculum */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 4 }}>
            What we&#39;ll cover
          </Typography>
          <Box sx={{ maxWidth: '52rem' }}>
            {curriculumModules.map((mod) => (
              <Accordion
                key={mod.title}
                elevation={0}
                disableGutters
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: '0.5rem !important',
                  mb: 1.5,
                  '&::before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: '#14B8A6' },
                }}
              >
                <AccordionSummary
                  expandIcon={<AddIcon sx={{ color: 'text.secondary' }} />}
                  sx={{ px: 3, py: 1 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {mod.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <List disablePadding>
                    {mod.items.map((item) => (
                      <ListItem
                        key={item}
                        disablePadding
                        sx={{
                          py: 0.75,
                          pl: 2,
                          position: 'relative',
                          '&::before': {
                            content: '"\\2013"',
                            position: 'absolute',
                            left: 0,
                            color: 'text.disabled',
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Instructor */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 5 }}>
            Meet Your Instructor
          </Typography>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, sm: 'auto' }}>
              <Box
                component="img"
                src="/images/ray-butler-profile.png"
                alt="Ray Butler"
                sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
              <Button
                component="a"
                href="https://www.linkedin.com/in/raybutler"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ mt: 1.5, color: '#117680', p: 0, minWidth: 0, fontSize: '0.8125rem' }}
              >
                LinkedIn →
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                Ray Butler
              </Typography>
              <Typography variant="body2" sx={{ color: '#117680', fontWeight: 500, mb: 2 }}>
                Designer and Founder, Big Freight Life
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.625 }}>
                Ray sits at the intersection of design, engineering, and product strategy. His background
                spans from, human centered design (HCD), including design research, conversation design,
                systems thinking, and hands-on product development.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Who This Is For */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 5 }}>
            Built for people who build
          </Typography>
          <Grid container spacing={3}>
            {audienceItems.map((item) => (
              <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: '1rem',
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: '1.0625rem', fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.625 }}>
                    {item.body}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* What's Included */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 5 }}>
            Everything you need to level up
          </Typography>
          <Grid container spacing={3} sx={{ maxWidth: '52rem' }}>
            {includedItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6 }} key={item.title}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ color: '#14B8A6', flexShrink: 0, mt: 0.25 }}>
                    <CheckIcon />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.625 }}>
                      {item.body}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 5 }}>
            Common questions
          </Typography>
          <Box sx={{ maxWidth: '52rem' }}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.q}
                elevation={0}
                disableGutters
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: '0.5rem !important',
                  mb: 1.5,
                  '&::before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: '#14B8A6' },
                }}
              >
                <AccordionSummary
                  expandIcon={<AddIcon sx={{ color: 'text.secondary' }} />}
                  sx={{ px: 3, py: 1 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, color: '#fff', mb: 2 }}>
            Ready to transform how you work?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'grey.400', maxWidth: '36rem', mx: 'auto', mb: 4, lineHeight: 1.625 }}
          >
            Join the next cohort and build a system for doing your best work, every time.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#117680',
              color: '#fff',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': { bgcolor: '#0e5f67' },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

    </Box>
  );
}
