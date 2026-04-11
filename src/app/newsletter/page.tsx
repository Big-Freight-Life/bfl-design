'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Button, TextField, Tab, Tabs, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { colors, darkColors } from '@/theme/tokens';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShareIcon from '@mui/icons-material/Share';

function SignupForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const btnColors = isDark ? darkColors.button.primary : colors.button.primary;

  return (
    <Box
      component="form"
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      noValidate
      aria-label="Newsletter signup"
    >
      {submitted ? (
        <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
          Thanks for subscribing!
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            id={id}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            autoComplete="email"
            fullWidth
            sx={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              whiteSpace: 'nowrap',
              bgcolor: btnColors.bg,
              color: btnColors.text,
              '&:hover': { bgcolor: btnColors.hover },
            }}
          >
            Subscribe
          </Button>
        </Box>
      )}
    </Box>
  );
}

interface ResourceItem {
  title: string;
  description: string;
  linkText: string;
  thumbnail?: boolean;
  href?: string;
}

const resourceTabs: { label: string; description: string; items: ResourceItem[] }[] = [
  {
    label: 'Articles',
    description: 'Short essays that clarify complex ideas and challenge assumptions about AI, design, and systems.',
    items: [
      { title: 'AI Is Not a Feature', description: 'Why treating AI as a bolt-on leads to fragile systems\u2014and what to design instead. Most teams start with the tool, not the problem. This essay explores what happens when AI is treated as infrastructure rather than decoration.', linkText: 'Read article', thumbnail: true, href: '/newsletter/ai-is-not-a-feature' },
      { title: 'Designing for Exceptions, Not the Happy Path', description: 'Why edge cases are often the clearest signal of how a system really works. The happy path tells you what was planned. The exceptions tell you what was overlooked\u2014and where trust breaks down.', linkText: 'Read article', thumbnail: true, href: '/newsletter/designing-for-exceptions' },
      { title: 'Why Small Teams Can\u2019t Afford Bad AI Decisions', description: 'How limited margin for error changes how AI should be designed and deployed. When you don\u2019t have a dedicated ML team or a budget to recover from failed experiments, every decision about automation carries real weight.', linkText: 'Read article', thumbnail: true, href: '/newsletter/small-teams-ai-decisions' },
    ],
  },
  {
    label: 'Guides',
    description: 'Step-by-step thinking tools for teams making real decisions under real constraints.',
    items: [
      { title: 'Designing Intelligent Systems for Small Businesses', description: 'A practical guide for founders and operators navigating AI adoption without enterprise teams or enterprise risk tolerance. Covers scoping, vendor evaluation, internal readiness, and how to build systems that stay manageable as they grow.', linkText: 'Read the guide', thumbnail: true },
      { title: 'A Small Business Guide to Responsible AI Adoption', description: 'How to introduce AI into your workflows without losing visibility, control, or trust. Step-by-step guidance on identifying use cases, setting boundaries, and maintaining accountability as automation expands.', linkText: 'View guide', thumbnail: true },
      { title: 'Evaluating AI Tools Without a Data Science Team', description: 'A practical approach to assessing AI products when you don\u2019t have specialized technical staff. Includes evaluation criteria, red flags to watch for, and questions to ask vendors before committing.', linkText: 'View guide', thumbnail: true },
    ],
  },
  {
    label: 'Frameworks',
    description: 'Models we use to make system behavior, responsibility, and decision-making visible.',
    items: [
      { title: 'When to Automate\u2014and When Not To', description: 'A decision framework to help teams evaluate whether automation will reduce complexity or introduce new risk. Walks through the key questions to ask before committing resources to any automation initiative.', linkText: 'View framework', thumbnail: true },
      { title: 'Human\u2013AI Responsibility Map', description: 'A framework for defining where human judgment ends, where AI assists, and where accountability lives. Useful for any team deploying AI into decision-making workflows where errors carry real consequences.', linkText: 'View framework', thumbnail: true },
      { title: 'Decision Visibility Model', description: 'A way to surface how decisions move through systems and where breakdowns are most likely to occur. Helps teams identify blind spots before they become incidents.', linkText: 'View framework', thumbnail: true },
    ],
  },
  {
    label: 'Templates',
    description: 'Simple, practical templates teams can use immediately.',
    items: [
      { title: 'AI Use Case Definition Template', description: 'A worksheet to clarify intent, constraints, and risk before introducing automation. Helps teams align on what problem they\u2019re solving and what success looks like before writing a single line of code.', linkText: 'Download', thumbnail: true },
      { title: 'Conversation Design Checklist', description: 'A checklist for designing AI-assisted conversations with clear boundaries and expectations. Covers intent mapping, fallback behavior, escalation paths, and how to handle uncertainty gracefully.', linkText: 'Download', thumbnail: true },
    ],
  },
  {
    label: 'Case Notes',
    description: 'Short reflections on real work\u2014focused on decisions and lessons, not polished success stories.',
    items: [
      { title: 'Why We Didn\u2019t Automate\u2014and What Changed Instead', description: 'A case note on choosing clarity over speed and the downstream impact of that decision. Sometimes the most valuable thing you can do is slow down and understand the system before changing it.', linkText: 'Read case note', thumbnail: true },
      { title: 'Making System Behavior Visible Prevented Escalations', description: 'What happened when a team modeled decision flow before deploying AI. By mapping how decisions actually moved through the organization, they caught failure modes that testing alone would have missed.', linkText: 'Read case note', thumbnail: true },
    ],
  },
];

const whatYoullGet = [
  'How systems actually break',
  'Where AI creates friction instead of value',
  'What changes when decisions, ownership, and workflows align',
];

const whoItsFor = [
  'Teams dealing with complexity.',
  'Leaders responsible for outcomes.',
  'People trying to make AI actually work inside real systems.',
];

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = resourceTabs[activeTab];

  return (
    <Box>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 14 },
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 6, md: 10 },
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1 }}>
                Newsletter
              </Typography>
              <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Not everything gets published.
              </Typography>
              <Box sx={{ mb: 4, maxWidth: 520 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Some of the most important work doesn&apos;t make it to the site.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  It happens earlier.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  While systems are being mapped.{' '}
                  While decisions are being challenged.{' '}
                  While things are still unclear.
                </Typography>
              </Box>
              <SignupForm id="nl-email-hero" />
            </Box>

            <Box
              sx={{
                width: { xs: 200, md: 280 },
                flexShrink: 0,
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                color: 'divider',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%">
                <rect x="10" y="40" width="180" height="110" rx="12" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" />
                <path d="M10 52 L100 110 L190 52" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="35" y="10" width="130" height="80" rx="8" fill={colors.primary.main} opacity="0.15" stroke={colors.primary.main} strokeWidth="1.5" />
                <line x1="55" y1="35" x2="145" y2="35" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                <line x1="55" y1="50" x2="125" y2="50" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
                <line x1="55" y1="65" x2="110" y2="65" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                <circle cx="30" cy="25" r="4" fill={colors.accent.cyan} opacity="0.6" />
                <circle cx="170" cy="20" r="3" fill={colors.accent.coral} opacity="0.5" />
                <circle cx="160" cy="130" r="5" fill={colors.accent.purple} opacity="0.4" />
              </svg>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Resource Library — Tabbed */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 1 }}>Resource Library</Typography>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 4,
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, minWidth: 'auto', px: 2 },
            }}
          >
            {resourceTabs.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {currentTab.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {currentTab.items.map((item) => (
              <Box
                key={item.title}
                sx={{
                  py: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover .resource-link': { color: 'primary.main' },
                  '&:hover .resource-thumb': { opacity: 0.85 },
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, alignItems: 'center' }}>
                  {item.thumbnail && (
                    <Box
                      className="resource-thumb"
                      sx={{
                        width: { xs: 100, sm: 140 },
                        flexShrink: 0,
                        aspectRatio: '16/9',
                        borderRadius: 1.5,
                        bgcolor: 'action.selected',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        transition: 'opacity 0.2s',
                        backgroundImage: `radial-gradient(circle at 30% 40%, ${alpha(colors.primary.main, 0.12)} 0%, transparent 60%)`,
                      }}
                    >
                      <Box
                        sx={{
                          width: '40%',
                          height: '40%',
                          borderRadius: 1,
                          border: '1.5px solid',
                          borderColor: 'divider',
                          opacity: 0.5,
                        }}
                      />
                    </Box>
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, maxWidth: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexShrink: 0 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ShareIcon sx={{ fontSize: 14 }} />}
                      sx={{ textTransform: 'none', fontWeight: 500, borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}
                    >
                      Share
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
                      {...(item.href ? { component: Link, href: item.href } : {})}
                    >
                      Read
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* What You'll Get */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h2" sx={{ mb: 4 }}>What you&apos;ll get</Typography>
            {whatYoullGet.map((item) => (
              <Typography key={item} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                {item}
              </Typography>
            ))}
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Not trends.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Not recycled takes.
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                The thinking behind the work.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Who This Is For */}
      <Box
        component="section"
        sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h2" sx={{ mb: 4 }}>Who this is for</Typography>
            {whoItsFor.map((line) => (
              <Typography key={line} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                {line}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
