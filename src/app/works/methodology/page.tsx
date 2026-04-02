'use client';

import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import Link from 'next/link';
import SectionHeader from '@/components/common/SectionHeader';

const steps = [
  {
    num: '01',
    title: 'Discover',
    description:
      'We begin by deeply understanding your challenge, context, and constraints. This involves stakeholder interviews, research, and analysis to ensure we\'re solving the right problem.',
    bullets: ['Stakeholder interviews', 'Research & analysis', 'Problem definition'],
  },
  {
    num: '02',
    title: 'Define',
    description:
      'With a clear understanding of the problem, we define success criteria and explore potential directions. This phase ensures alignment before committing to a direction.',
    bullets: ['Success criteria', 'Direction exploration', 'Stakeholder alignment'],
  },
  {
    num: '03',
    title: 'Design',
    description:
      'This is where ideas take shape. Through iterative design and prototyping, we develop solutions that address the core challenge while meeting business objectives.',
    bullets: ['Ideation & concepts', 'Prototyping', 'Iterative refinement'],
  },
  {
    num: '04',
    title: 'Deliver',
    description:
      'The final phase focuses on implementation support and knowledge transfer. I ensure your team has everything needed to move forward successfully.',
    bullets: ['Final deliverables', 'Implementation support', 'Knowledge transfer'],
  },
];

const principles = [
  {
    title: 'Clarity Over Complexity',
    description: 'Simple solutions that are understood and adopted beat complex solutions that gather dust.',
  },
  {
    title: 'Collaboration Is Key',
    description: 'The best solutions emerge when diverse perspectives come together with a shared purpose.',
  },
  {
    title: 'Progress Over Perfection',
    description: 'Iteration and learning beat waiting for the perfect solution that never ships.',
  },
];

export default function MethodologyPage() {
  return (
    <Box component="main">

      {/* Page header */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <SectionHeader
            overline="Portfolio"
            title="Methodology"
            subtitle="A proven approach to solving complex business challenges through strategic design thinking."
          />
        </Container>
      </Box>

      {/* Methodology Overview */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>How I Work</Typography>
            <Typography variant="body1" color="text.secondary">
              Every project is unique, but my approach follows a proven framework that ensures we understand the problem deeply before jumping to solutions.
            </Typography>
          </Box>

          {/* Process steps */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <Box
                  key={step.num}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  {/* On even steps, image comes first on desktop */}
                  {isEven && (
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        bgcolor: 'grey.200',
                        aspectRatio: '4/3',
                        borderRadius: 3,
                        order: { md: -1 },
                      }}
                    />
                  )}

                  <Box>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                      {step.num}
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 2 }}>{step.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, m: 0, color: 'text.secondary' }}>
                      {step.bullets.map((b) => (
                        <li key={b}>
                          <Typography variant="body2">{b}</Typography>
                        </li>
                      ))}
                    </Box>
                  </Box>

                  {/* On odd steps, image comes after content */}
                  {!isEven && (
                    <Box
                      sx={{
                        bgcolor: 'grey.200',
                        aspectRatio: '4/3',
                        borderRadius: 3,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Guiding Principles */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6 }}>Guiding Principles</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {principles.map((p) => (
              <Paper key={p.title} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.description}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2 }}>Ready to Apply This Approach?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560, mx: 'auto' }}>
            Let&apos;s discuss how this methodology can be applied to your specific challenges.
          </Typography>
          <Button component={Link} href="/contact" variant="contained" size="large">
            Start a Conversation
          </Button>
        </Container>
      </Box>

    </Box>
  );
}
