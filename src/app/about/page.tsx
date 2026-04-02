import { Box, Container, Typography, Grid, Paper, Button, Link } from '@mui/material';

const credentials = [
  {
    issuer: 'MIT CSAIL',
    title: 'Human-Computer Interaction for UX Design',
    href: 'https://www.credential.net/ac2075af-00de-4419-9840-35759ab5d09f',
  },
  { issuer: 'IBM', title: 'AI Product Manager' },
  { issuer: 'Stanford Online', title: 'AI in Healthcare' },
  { issuer: 'Wharton (UPenn)', title: 'AI Strategy and Governance' },
  { issuer: 'CDI', title: 'Certified Conversation Designer' },
];

export default function AboutPage() {
  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          py: { xs: 12, md: 18 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2.25rem, 5vw, 3.5rem)' },
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            Designing clarity{' '}
            <Box component="span" sx={{ color: '#14B8A6' }}>
              into complexity.
            </Box>
          </Typography>
        </Container>
      </Box>

      {/* Introduction */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem' }}>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', lineHeight: 1.625, mb: 3, fontWeight: 600 }}
            >
              Big Freight Life is an AI-native design company building intelligent products that
              people actually trust.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', lineHeight: 1.625, mb: 3, color: 'text.secondary' }}
            >
              We help small and minority-owned businesses design intelligent systems—systems where
              human judgment, system behavior, and AI capabilities work together as complexity
              scales.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 2 }}>
              As small teams adopt AI, they often encounter fragmented tools, evolving rules, and
              limited visibility into how decisions actually play out. Without the margin for error
              that scale provides, even small misalignments can have outsized consequences.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.primary', fontWeight: 500 }}>
              That&#39;s where our work begins.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Our Perspective */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
            <Typography variant="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Our Perspective
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 3 }}>
              AI is often introduced as a feature. Design is often treated as decoration. In
              practice, this leads to automation layered onto systems that were never fully
              understood in the first place.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary' }}>
              As systems grow, cause and effect become harder to see. Speed increases, but shared
              understanding does not. When structure is missing, AI amplifies confusion instead of
              reducing it.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* What We Do Differently */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
              {/* Decorative rings visual */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 260,
                }}
              >
                <Box sx={{ position: 'relative', width: 220, height: 220 }}>
                  {[220, 160, 100].map((size, i) => (
                    <Box
                      key={size}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        border: '1.5px solid',
                        borderColor: i === 0 ? 'grey.200' : i === 1 ? '#14B8A6' : '#0D9488',
                        opacity: i === 0 ? 0.5 : 0.7,
                      }}
                    />
                  ))}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#14B8A6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
              <Typography variant="h2" sx={{ mb: 3, fontWeight: 600 }}>
                What We Do Differently
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 3 }}>
                We design intelligent systems around how decisions are made, not just how workflows
                are documented.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 3 }}>
                Before automation, we make system behavior understandable. Human judgment stays
                visible where it matters, and AI is treated as a participant in the system—not a
                replacement for thinking. Exceptions are not edge cases; they reveal how the system
                actually operates.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary' }}>
                Our work spans experience design, system architecture, and applied AI, with a single
                focus: helping teams build systems they can trust and evolve over time.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Who This Work Is For */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
            <Typography variant="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Who This Work Is For
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 3 }}>
              Big Freight Life works with small and minority-owned businesses operating in complex,
              real-world conditions—growing teams, constrained resources, and increasing operational
              demands.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary' }}>
              This work is for founders and leaders who want AI to support better decisions, not
              introduce new uncertainty.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Meet the Founder */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                component="img"
                src="/images/ray-butler-profile.png"
                alt="Ray Butler"
                sx={{
                  width: '100%',
                  maxWidth: 320,
                  borderRadius: '1.5rem',
                  display: 'block',
                  mx: 'auto',
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', letterSpacing: '0.1em', display: 'block', mb: 1 }}
              >
                Meet the Founder
              </Typography>
              <Typography variant="h2" sx={{ mb: 0.5, fontWeight: 600 }}>
                Ray Butler
              </Typography>
              <Typography variant="body1" sx={{ color: '#14B8A6', fontWeight: 500, mb: 3 }}>
                Designer, Builder, Founder
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 2 }}>
                Ray is a design technologist who works across product design, engineering, and system
                architecture. He designs and builds iOS applications for health and wellness, moving
                from concept to production independently.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.625, color: 'text.secondary', mb: 4 }}>
                His training spans human-computer interaction, AI strategy, and conversation design.
                What defines his work is the ability to ship products that are precise enough to
                trust and clear enough to use.
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
                  borderColor: '#117680',
                  color: '#117680',
                  '&:hover': { borderColor: '#0e5f67', bgcolor: 'rgba(17,118,128,0.04)' },
                }}
              >
                Connect on LinkedIn
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Credentials */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 5, fontWeight: 600 }}>
              Credentials
            </Typography>
            <Grid container spacing={2}>
              {credentials.map((cred) => (
                <Grid size={{ xs: 12, sm: 6 }} key={cred.issuer}>
                  <Paper
                    component={cred.href ? 'a' : 'div'}
                    href={cred.href}
                    target={cred.href ? '_blank' : undefined}
                    rel={cred.href ? 'noopener noreferrer' : undefined}
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: '0.75rem',
                      display: 'block',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      '&:hover': cred.href
                        ? { borderColor: '#14B8A6', boxShadow: '0 4px 12px rgba(20,184,166,0.12)' }
                        : {},
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: '#14B8A6',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      {cred.issuer}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {cred.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Closing */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, color: 'grey.400', mb: 1.5, fontWeight: 400 }}
            >
              Complexity is unavoidable.
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, color: '#fff', fontWeight: 500 }}
            >
              Designing for it is a choice.
            </Typography>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
