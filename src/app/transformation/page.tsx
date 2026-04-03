'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

const narrativeBlocks: { text: string[]; accent?: boolean; list?: boolean; closing?: boolean; coda?: boolean }[] = [
  {
    text: [
      "Then AI gets introduced, and everything breaks in new ways.",
      "Not because the technology is wrong. Because the system was never designed to support it.",
    ],
  },
  {
    accent: true,
    text: ["AI is not the product. It's the output."],
  },
  {
    text: ["What matters is everything that comes before it:"],
  },
  {
    list: true,
    text: [
      "how decisions are made",
      "how information flows",
      "who owns what",
      "what happens when something goes wrong",
    ],
  },
  {
    text: [
      "Without that, AI doesn't scale. It fragments.",
      "Another tool. Another dashboard. Another system no one fully trusts.",
    ],
  },
  {
    text: [
      "Most companies try to solve this by adding more. More tools. More automation. More layers.",
      "But complexity doesn't fix misalignment. It amplifies it.",
    ],
  },
  {
    accent: true,
    text: ["The result isn't transformation. It's acceleration without direction."],
  },
  {
    text: [
      "Real transformation is quieter than that.",
      "It starts by making the system visible. Where decisions actually happen. Where breakdowns occur. Where ownership is missing.",
      "Not in theory. In practice.",
    ],
  },
  {
    text: ["Because until the system is understood, nothing built on top of it will hold."],
  },
  {
    accent: true,
    text: ["This is where most teams get stuck."],
  },
  {
    text: [
      "Not because they lack effort, but because they're inside the system they're trying to fix.",
      "They can feel the friction. They can see the symptoms. But they can't always see the structure causing it.",
    ],
  },
  {
    text: [
      "Change requires distance.",
      "A way to step outside the system without losing the context inside it.",
    ],
  },
  {
    text: [
      "To map what's actually happening. To redefine ownership. To reconnect decisions, data, and execution.",
      "Not as an abstract exercise, but alongside the people responsible for making it work.",
    ],
  },
  {
    text: [
      "From there, structure emerges. Clear ownership. Defined processes. Connected systems.",
      "Not as documentation for its own sake, but as a foundation for how the team operates.",
    ],
  },
  {
    text: ["So when AI is introduced, it has something to attach to. Something to reinforce. Something to scale."],
  },
  {
    accent: true,
    text: ["The shift isn't just technical. It's organizational."],
  },
  {
    list: true,
    text: ["How teams think.", "How they decide.", "How they move."],
  },
  {
    text: ["Because a system is only as strong as the people responsible for it."],
  },
  {
    text: [
      "The companies that move forward aren't the ones adopting the fastest. They're the ones who understand: AI doesn't create capability. It exposes it.",
    ],
  },
  {
    text: [
      "If the system is strong, AI accelerates it.",
      "If the system is weak, AI reveals it.",
    ],
  },
  {
    text: [
      "Transformation, then, isn't about deploying tools. It's about reshaping how a team operates so the system they depend on actually works.",
      "The processes. The ownership. The integration between them.",
    ],
  },
  {
    text: ["Because that's where decisions are made. That's where trust is built. That's where scale becomes possible."],
  },
  {
    closing: true,
    text: ["AI is the output.", "The system is the product."],
  },
  {
    coda: true,
    text: ["This is where our work begins."],
  },
];

export default function TransformationPage() {
  return (
    <Box component="main">

      {/* Hero */}
      <Box
        component="header"
        sx={{
          py: { xs: 10, md: 16 },
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '52rem' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: 'clamp(2.25rem, 5vw, 3.5rem)' },
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              The System Was Never{' '}
              <Box component="span" sx={{ color: '#14B8A6', display: 'block' }}>
                Designed for AI
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: 'grey.400', lineHeight: 1.625 }}
            >
              Most teams don&#39;t fail at AI. They fail at the structure that&#39;s supposed to support it.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Introduction with Video */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 8 },
              alignItems: 'center',
            }}
          >
            {/* Video placeholder */}
            <Box
              sx={{
                flex: { md: 1 },
                width: '100%',
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16 / 10',
                bgcolor: 'grey.200',
              }}
            >
              <Box
                component="img"
                src="/images/transformation-dancer.jpg"
                alt="Transformation video preview"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Play button overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover svg circle': { fill: 'rgba(0,0,0,0.5)' },
                }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="39" stroke="white" strokeWidth="2" fill="rgba(0,0,0,0.3)" />
                  <path d="M32 24L56 40L32 56V24Z" fill="white" />
                </svg>
              </Box>
            </Box>

            {/* Text content */}
            <Box sx={{ flex: { md: 1 } }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 500,
                  color: 'text.primary',
                  lineHeight: 1.5,
                  mb: 2,
                }}
              >
                Transformation doesn&#39;t fail because of AI.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.375rem' },
                  color: '#117680',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  mb: 4,
                }}
              >
                It fails because the system underneath never changed.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.625, fontSize: '1.0625rem' }}
              >
                Most organizations don&#39;t have a technology problem. They have a structure problem. Decisions
                live in one place. Data lives in another. Ownership is unclear. Processes are undocumented.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Narrative Prose */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '44rem', mx: 'auto' }}>
            {narrativeBlocks.map((block, idx) => {
              if (block.closing) {
                return (
                  <Box
                    key={idx}
                    sx={{
                      my: 6,
                      py: 4,
                      borderTop: '2px solid',
                      borderBottom: '2px solid',
                      borderColor: '#14B8A6',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1 }}
                    >
                      {block.text[0]}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1.5,
                      }}
                    >
                      {block.text[1]}
                    </Typography>
                  </Box>
                );
              }

              if (block.coda) {
                return (
                  <Typography
                    key={idx}
                    variant="body1"
                    sx={{
                      color: '#117680',
                      fontWeight: 500,
                      fontSize: '1.0625rem',
                      lineHeight: 1.625,
                      mt: 4,
                    }}
                  >
                    {block.text[0]}
                  </Typography>
                );
              }

              if (block.accent) {
                return (
                  <Box key={idx} sx={{ my: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1.125rem', md: '1.25rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1.5,
                        pl: 3,
                        borderLeft: '3px solid #14B8A6',
                      }}
                    >
                      {block.text[0]}
                    </Typography>
                  </Box>
                );
              }

              if (block.list) {
                return (
                  <Box key={idx} sx={{ my: 3, pl: 3 }}>
                    {block.text.map((line) => (
                      <Typography
                        key={line}
                        variant="body1"
                        sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 0.5 }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                );
              }

              return (
                <Box key={idx} sx={{ my: 3 }}>
                  {block.text.map((line) => (
                    <Typography
                      key={line}
                      variant="body1"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1 }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          bgcolor: 'background.default',
          borderTop: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 2 }}>
            Ready to look at the system?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: '36rem', mx: 'auto', mb: 4, lineHeight: 1.625 }}
          >
            Whether you&#39;re rethinking how your team works or figuring out where AI actually fits, we
            can help.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component="a"
              href="/contact"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#117680',
                color: '#fff',
                px: 4,
                py: 1.5,
                '&:hover': { bgcolor: '#0e5f67' },
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/transformation/workshop"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#117680',
                color: '#117680',
                px: 4,
                py: 1.5,
                '&:hover': { borderColor: '#0e5f67', bgcolor: 'rgba(17,118,128,0.04)' },
              }}
            >
              View Workshop Details →
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
