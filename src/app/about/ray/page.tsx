import type { Metadata } from 'next';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import Image from 'next/image';
import { gradients } from '@/theme/tokens';
import DarkHeroSection from '@/components/common/DarkHeroSection';

export const metadata: Metadata = {
  title: 'Ray Butler | BFL Design',
  description: 'Ray Butler is a design technologist and founder of Big Freight Life, specializing in GenAI experience design, system architecture, and applied AI for complex operational environments.',
};

const chapters = [
  {
    number: '01',
    title: 'Background',
    lead: 'I design GenAI experiences by combining service design, UX generalist practice, and system architecture.',
    body: [
      'My work focuses on how intelligent systems behave within real services—across workflows, roles, and decision points—not just how they appear on screen.',
      'This includes shaping AI participation, defining human oversight, and ensuring experiences remain understandable and trustworthy as complexity grows.',
    ],
  },
  {
    number: '02',
    title: 'Experience',
    lead: "I've worked on GenAI-enabled and enterprise systems where decisions are distributed, exceptions are common, and outcomes compound over time.",
    body: [
      'My experience includes collaborating with product, engineering, operations, and leadership teams to design AI-assisted workflows with clear human oversight.',
      'The work often sits between strategy and delivery—connecting intent to implementation while staying grounded in operational reality.',
    ],
  },
  {
    number: '03',
    title: 'Approach',
    lead: 'GenAI experiences require more than good interfaces—they require disciplined system design.',
    body: [
      'My approach focuses on understanding system behavior before introducing intelligence. That means identifying decision points, defining where AI should participate, and designing for confidence, override, and accountability.',
      'This allows teams to move forward with intention instead of reacting to downstream consequences.',
    ],
  },
];

const expertiseAreas = [
  {
    title: 'Strategy',
    tagline: 'Vision to Execution',
    desc: 'Clarifying where GenAI creates real value. I help teams define use cases, constraints, and success criteria before committing to models or tooling.',
    skills: ['Product Strategy', 'Roadmap Development', 'Stakeholder Alignment'],
  },
  {
    title: 'Facilitation',
    tagline: 'Aligning Teams',
    desc: 'Aligning people around intelligent systems. I facilitate cross-functional conversations that surface assumptions and establish shared understanding.',
    skills: ['Workshop Design', 'Design Sprints', 'Consensus Building'],
  },
  {
    title: 'Design',
    tagline: 'End-to-End Experience',
    desc: 'GenAI experience and service design, from research to deployment. This includes service blueprints, interaction models, and AI decision flows.',
    skills: ['Service Design', 'UX Architecture', 'AI Workflows'],
  },
  {
    title: 'Execution',
    tagline: 'Concept to Reality',
    desc: 'From concept to operational reality. I stay close to implementation to ensure designs remain usable, trustworthy, and grounded once deployed.',
    skills: ['Implementation', 'Quality Assurance', 'Iteration'],
  },
];

const pullQuotes = [
  '"I design systems that support better decisions, not just faster ones."',
  '"AI should augment judgment, not replace it. Automation should earn its place."',
];

export default function RayPage() {
  return (
    <Box>

      {/* Hero */}
      <DarkHeroSection
        component="section"
        gradient={gradients.darkHero135Ray}
        sx={{ py: { xs: 10, md: 16 } }}
        dotMatrix={false}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src="/images/ray-butler-profile.png"
                  alt="Ray Butler"
                  width={380}
                  height={380}
                  priority
                  style={{
                    width: '100%',
                    maxWidth: 380,
                    height: 'auto',
                    borderRadius: '1.5rem',
                    display: 'block',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  display: 'block',
                  mb: 2,
                }}
              >
                Design Technologist
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 3rem)' },
                  fontWeight: 600,
                  color: '#fff',
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                I design systems
                <br />
                that design themselves.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'grey.400', fontSize: '1.125rem', mb: 4 }}
              >
                My number one goal is to figure out your real problem.
              </Typography>
              <Button
                component="a"
                href="https://www.linkedin.com/in/braybutler/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  '&:hover': { borderColor: '#14B8A6', bgcolor: 'rgba(20,184,166,0.08)' },
                }}
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>
        </Container>
      </DarkHeroSection>

      {/* Narrative Chapters */}
      {chapters.map((chapter, idx) => (
        <Box key={chapter.number}>
          <Box
            component="section"
            sx={{
              py: { xs: 8, md: 12 },
              bgcolor: idx % 2 === 0 ? 'background.default' : 'grey.50',
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 4 }}>
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.main', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em' }}
                >
                  {chapter.number}
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 600 }}>
                  {chapter.title}
                </Typography>
              </Box>
              <Grid container spacing={6} alignItems="center">
                <Grid size={{ xs: 12, md: 5 }}>
                  <Box
                    sx={{
                      height: 280,
                      borderRadius: '1rem',
                      bgcolor: 'grey.200',
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: '1.125rem', fontWeight: 500, color: 'text.primary', mb: 2, lineHeight: 1.625 }}
                  >
                    {chapter.lead}
                  </Typography>
                  {chapter.body.map((p, i) => (
                    <Typography key={i} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.625, mb: 1.5 }}>
                      {p}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Pull Quote between chapters (not after last) */}
          {idx < chapters.length - 1 && (
            <Box
              component="section"
              sx={{
                py: { xs: 6, md: 8 },
                bgcolor: idx % 2 === 0 ? 'grey.50' : 'background.default',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Container maxWidth="lg">
                <Box sx={{ maxWidth: '48rem', mx: 'auto', textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: 'text.primary',
                      lineHeight: 1.5,
                    }}
                  >
                    {pullQuotes[idx]}
                  </Typography>
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      ))}

      {/* Areas of Focus */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', letterSpacing: '0.1em', fontWeight: 600, display: 'block', mb: 1 }}
            >
              Areas of Focus
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 600 }}>
              Where I create impact
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {expertiseAreas.map((area) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={area.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '1rem',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: '#14B8A6',
                      boxShadow: '0 4px 20px rgba(20,184,166,0.12)',
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 600, mb: 0.5 }}>
                    {area.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'primary.main', fontWeight: 500, mb: 2, display: 'block' }}
                  >
                    {area.tagline}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.625, mb: 2 }}>
                    {area.desc}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                    {area.skills.map((skill) => (
                      <Box
                        component="li"
                        key={skill}
                        sx={{
                          fontSize: '0.8125rem',
                          color: 'text.secondary',
                          py: 0.5,
                          borderTop: '1px solid',
                          borderColor: 'grey.100',
                          '&:first-of-type': { borderTop: 'none' },
                        }}
                      >
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}
