'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { colors, typography as typographyTokens, motion } from '@/theme/tokens';
import { useRef, useEffect, useState, useCallback } from 'react';

const steps = [
  {
    number: '01',
    title: 'See the system',
    lead: 'We step into the system as it exists.',
    aside: ['Not the roadmap.', 'Not the documentation.'],
    closer: 'The real flow of work.',
    bullets: [
      'Where decisions are made',
      'Where work slows down',
      'Where ownership breaks',
    ],
    tag: 'This is where clarity begins.',
  },
  {
    number: '02',
    title: 'Align the system',
    lead: 'Once the system is visible, we realign it.',
    bullets: [
      'Clarify ownership',
      'Connect decisions across teams',
      'Remove gaps between tools and execution',
    ],
    tag: 'So work doesn\u2019t get stuck \u2014 and responsibility is clear.',
  },
  {
    number: '03',
    title: 'Structure the system',
    lead: 'Then we make it hold.',
    bullets: [
      'Design systems that support real workflows',
      'Integrate AI where it actually helps',
      'Ensure the system scales without breaking',
    ],
    tag: 'So the system carries the work \u2014 not the other way around.',
  },
];

const outcomes = [
  'Clear ownership',
  'Connected decisions',
  'Fewer breakdowns between teams',
  'AI that fits into the system',
];

function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function RevealBox({
  children,
  delay = 0,
  sx = {},
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  sx?: Record<string, unknown>;
  [key: string]: unknown;
}) {
  const { ref, visible } = useReveal(0.15);
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity ${motion.duration.reveal} ${motion.easing.outExpo} ${delay}ms, transform ${motion.duration.reveal} ${motion.easing.outExpo} ${delay}ms`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default function ProcessPage() {
  return (
    <Box component="main">

      {/* ── Hero ── */}
      <Box
        component="header"
        sx={{
          pt: { xs: 16, md: 24 },
          pb: { xs: 10, md: 16 },
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot matrix texture */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealBox>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '4.5rem', md: '6.5rem', lg: '8rem' },
                fontWeight: 700,
                color: '#fff',
                lineHeight: 0.95,
                letterSpacing: typographyTokens.letterSpacing.tighter,
                mb: { xs: 5, md: 6 },
              }}
            >
              How systems
              <br />
              get{' '}
              <Box component="span" sx={{ color: colors.primary.main }}>
                fixed.
              </Box>
            </Typography>
          </RevealBox>

          <RevealBox delay={200} sx={{ maxWidth: '36rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {[
                'Most systems don\u2019t break all at once.',
                'They drift.',
                'Decisions disconnect.',
                'Ownership becomes unclear.',
                'Work slows down.',
              ].map((line, idx) => (
                <Typography
                  key={line}
                  sx={{
                    fontSize: { xs: '1.0625rem', md: '1.25rem' },
                    color: idx === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                    fontWeight: idx === 0 ? 500 : 400,
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          </RevealBox>
        </Container>
      </Box>

      {/* ── Opening statement ── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <RevealBox sx={{ maxWidth: '44rem' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.375rem', md: '1.75rem' },
                fontWeight: 500,
                color: 'text.primary',
                lineHeight: 1.4,
                mb: 1.5,
              }}
            >
              We don&apos;t start with assumptions.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              We start with what&apos;s actually happening.
            </Typography>
          </RevealBox>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'grey.200' }} />
      </Box>

      {/* ── Three Steps ── */}
      {steps.map((step, idx) => (
        <Box
          key={step.number}
          component="section"
          sx={{
            py: { xs: 10, md: 16 },
            bgcolor: idx % 2 === 1 ? 'grey.50' : 'background.default',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 4, md: 8 },
                alignItems: 'flex-start',
              }}
            >
              {/* Large step number */}
              <RevealBox sx={{ flexShrink: 0 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '5rem', md: '7rem' },
                    fontWeight: 700,
                    lineHeight: 1,
                    color: colors.button.primary.bg,
                    opacity: 0.15,
                    letterSpacing: typographyTokens.letterSpacing.tighter,
                    userSelect: 'none',
                  }}
                >
                  {step.number}
                </Typography>
              </RevealBox>

              {/* Step content */}
              <Box sx={{ maxWidth: '40rem' }}>
                <RevealBox delay={100}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.1,
                      letterSpacing: typographyTokens.letterSpacing.tight,
                      mb: { xs: 3, md: 4 },
                    }}
                  >
                    {step.title}
                  </Typography>
                </RevealBox>

                <RevealBox delay={200}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.125rem', md: '1.375rem' },
                      fontWeight: 500,
                      color: 'text.primary',
                      lineHeight: 1.5,
                      mb: 3,
                    }}
                  >
                    {step.lead}
                  </Typography>
                </RevealBox>

                {/* Aside lines (step 01 only) */}
                {step.aside && (
                  <RevealBox delay={300}>
                    <Box
                      sx={{
                        pl: { xs: 2, md: 3 },
                        borderLeft: `3px solid ${colors.primary.main}`,
                        mb: 3,
                      }}
                    >
                      {step.aside.map((line) => (
                        <Typography
                          key={line}
                          sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            color: 'text.secondary',
                            lineHeight: 1.7,
                            fontStyle: 'italic',
                          }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  </RevealBox>
                )}

                {step.closer && (
                  <RevealBox delay={350}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.125rem', md: '1.25rem' },
                        fontWeight: 500,
                        color: 'text.primary',
                        lineHeight: 1.5,
                        mb: 3,
                      }}
                    >
                      {step.closer}
                    </Typography>
                  </RevealBox>
                )}

                {/* Bullet points */}
                <RevealBox delay={step.aside ? 400 : 300}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    {step.bullets.map((bullet) => (
                      <Box
                        key={bullet}
                        sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: colors.button.primary.bg,
                            mt: '10px',
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: '1.0625rem', md: '1.1875rem' },
                            color: 'text.secondary',
                            lineHeight: 1.6,
                          }}
                        >
                          {bullet}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </RevealBox>

                {/* Closing tag */}
                <RevealBox delay={step.aside ? 500 : 400}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      color: colors.button.primary.bg,
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.tag}
                  </Typography>
                </RevealBox>
              </Box>
            </Box>
          </Container>
        </Box>
      ))}

      {/* ── What you get ── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <RevealBox>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.1,
                letterSpacing: typographyTokens.letterSpacing.tight,
                mb: { xs: 2, md: 3 },
              }}
            >
              What you get
            </Typography>
          </RevealBox>

          <RevealBox delay={100}>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: 'text.secondary',
                lineHeight: 1.5,
                mb: { xs: 4, md: 5 },
                maxWidth: '36rem',
              }}
            >
              A system that reflects how work actually moves.
            </Typography>
          </RevealBox>

          <RevealBox delay={200}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                maxWidth: '40rem',
              }}
            >
              {outcomes.map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    px: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: '0.75rem',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: colors.button.primary.bg,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: '0.9375rem', md: '1.0625rem' },
                      fontWeight: 500,
                      color: 'text.primary',
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </RevealBox>
        </Container>
      </Box>

      {/* ── Divider ── */}
      <Box sx={{ mx: 'auto', maxWidth: '1024px', px: 3 }}>
        <Box sx={{ height: '1px', bgcolor: 'grey.200' }} />
      </Box>

      {/* ── Where we work ── */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <RevealBox sx={{ maxWidth: '44rem' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.375rem', md: '1.75rem' },
                fontWeight: 500,
                color: 'text.primary',
                lineHeight: 1.4,
                mb: 2,
              }}
            >
              We don&apos;t sit outside the system.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: 'text.secondary',
                lineHeight: 1.6,
                mb: 1,
              }}
            >
              We work inside it — with your team, your tools, and your constraints.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: colors.button.primary.bg,
                fontWeight: 500,
                lineHeight: 1.5,
                mt: 3,
              }}
            >
              That&apos;s how the changes hold.
            </Typography>
          </RevealBox>
        </Container>
      </Box>

      {/* ── Closing CTA ── */}
      <Box
        component="section"
        sx={{
          py: { xs: 12, md: 20 },
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot matrix texture */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <RevealBox>
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.625rem' },
                color: 'grey.400',
                lineHeight: 1.5,
                maxWidth: '36rem',
                mb: 4,
              }}
            >
              Start with the system.
            </Typography>
          </RevealBox>

          <RevealBox delay={150}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: typographyTokens.letterSpacing.tighter,
                mb: { xs: 5, md: 6 },
              }}
            >
              Make the system
              <br />
              <Box component="span" sx={{ color: colors.primary.main }}>
                visible.
              </Box>
            </Typography>
          </RevealBox>

          <RevealBox delay={300}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              sx={{
                bgcolor: colors.button.primary.bg,
                color: '#fff',
                px: 5,
                py: 1.75,
                fontSize: '1.0625rem',
                '&:hover': { bgcolor: colors.button.primary.hover },
              }}
            >
              Start a Conversation
            </Button>
          </RevealBox>
        </Container>
      </Box>

    </Box>
  );
}
