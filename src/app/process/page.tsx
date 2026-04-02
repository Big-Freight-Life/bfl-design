import { Box, Container, Typography, Button, List, ListItem } from '@mui/material';

const pillars = [
  {
    label: 'Reality',
    title: 'How work actually moves—beyond documentation, into execution.',
    body: "We map the system as it behaves, not as it's described. Because what's written down is rarely what's happening.",
  },
  {
    label: 'Alignment',
    title: 'Where decisions connect and ownership becomes clear.',
    body: "We fix the gaps between teams, tools, and decisions. So work flows without friction or confusion.",
  },
  {
    label: 'Structure',
    title: 'What holds everything together as complexity grows.',
    body: "We design systems, tools, and AI that reinforce how work actually moves. Not fight against it.",
  },
];

const failureReasons = [
  "decisions don't connect",
  "ownership isn't clear",
  "work moves differently than it's described",
];

const alignmentBenefits = [
  'decisions move faster',
  'AI becomes useful',
  'teams operate with confidence',
];

export default function ProcessPage() {
  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 18 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '45rem', mx: 'auto' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.5rem', md: 'clamp(1.5rem, 2.5vw, 1.875rem)' },
                fontWeight: 500,
                color: 'text.primary',
                lineHeight: 1.375,
                mb: 0.5,
              }}
            >
              We start with what&#39;s already in motion.
            </Typography>

            {[
              'Not the roadmap.',
              'Not the documentation.',
              'The actual flow of work.',
              'The decisions being made.',
              'The gaps no one owns.',
            ].map((line) => (
              <Typography
                key={line}
                variant="body1"
                sx={{
                  fontSize: '1.25rem',
                  lineHeight: 1.625,
                  color: 'text.secondary',
                  mb: 0.5,
                }}
              >
                {line}
              </Typography>
            ))}

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                lineHeight: 1.625,
                color: 'text.primary',
                mt: 4,
                mb: 0.5,
              }}
            >
              From there, we make it work.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                lineHeight: 1.625,
                color: 'text.primary',
              }}
            >
              so the system supports the outcomes it&#39;s meant to produce.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Three Pillars */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '45rem', mx: 'auto' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'text.primary',
                mb: 6,
                letterSpacing: '-0.025em',
              }}
            >
              How the system gets fixed
            </Typography>

            {pillars.map((pillar, idx) => (
              <Box
                key={pillar.label}
                sx={{ mb: idx < pillars.length - 1 ? 8 : 0 }}
              >
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'text.disabled',
                    mb: 1.5,
                  }}
                >
                  {pillar.label}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.375rem', md: 'clamp(1.375rem, 2.5vw, 1.5rem)' },
                    fontWeight: 500,
                    color: 'text.primary',
                    lineHeight: 1.375,
                    mb: 2,
                  }}
                >
                  {pillar.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', lineHeight: 1.625 }}
                >
                  {pillar.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Systems Fail */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          borderTop: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '45rem', mx: 'auto' }}>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', color: 'text.primary', lineHeight: 1.625, mb: 0.5 }}
            >
              Most systems don&#39;t fail because of tools.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.125rem', color: 'text.secondary', lineHeight: 1.625, mb: 4 }}
            >
              They fail because:
            </Typography>

            <List disablePadding sx={{ mb: 6 }}>
              {failureReasons.map((item) => (
                <ListItem
                  key={item}
                  disablePadding
                  sx={{
                    py: 1,
                    pl: 3,
                    position: 'relative',
                    '&::before': {
                      content: '"\\2014"',
                      position: 'absolute',
                      left: 0,
                      color: 'text.disabled',
                    },
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.625 }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', color: 'text.primary', lineHeight: 1.625, mb: 0.5, mt: 6 }}
            >
              AI doesn&#39;t fix that.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.125rem', color: 'text.secondary', lineHeight: 1.625, mb: 6 }}
            >
              It amplifies it.
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.375rem', md: 'clamp(1.375rem, 2.5vw, 1.5rem)' },
                fontWeight: 500,
                color: 'text.primary',
                mt: 6,
                lineHeight: 1.375,
              }}
            >
              Alignment is what scales.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* What Alignment Enables */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '45rem', mx: 'auto' }}>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', color: 'text.primary', lineHeight: 1.625, mb: 0.5 }}
            >
              When the system is clear:
            </Typography>

            <List disablePadding sx={{ mt: 2, mb: 3 }}>
              {alignmentBenefits.map((item) => (
                <ListItem
                  key={item}
                  disablePadding
                  sx={{
                    py: 1,
                    pl: 3,
                    position: 'relative',
                    '&::before': {
                      content: '"\\2014"',
                      position: 'absolute',
                      left: 0,
                      color: '#14B8A6',
                      opacity: 0.7,
                    },
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.625 }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Typography
              variant="body1"
              sx={{ fontSize: '1.125rem', color: 'text.disabled', fontStyle: 'italic', mt: 3 }}
            >
              Without it, nothing holds.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Closing CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          borderTop: '1px solid',
          borderColor: 'grey.200',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '45rem', mx: 'auto' }}>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', color: 'text.secondary', lineHeight: 1.625, mb: 0.5 }}
            >
              If the system isn&#39;t working,
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.25rem', color: 'text.primary', lineHeight: 1.625, mb: 6 }}
            >
              it wasn&#39;t designed to.
            </Typography>

            <Button
              component="a"
              href="/architect"
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
              Meet the Applied AI Architect
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
