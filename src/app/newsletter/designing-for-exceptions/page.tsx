'use client';

import { Box, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import CaseStudyBlock from '@/components/articles/CaseStudyBlock';

// ── Constants ──────────────────────────────────────────────────────────────

const AMBER = '#d97706';

// ── Page ───────────────────────────────────────────────────────────────────

export default function DesigningForExceptionsPage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(135deg, #fafaf9, #f5f5f4)"
        lightMode={true}
        category="Resilience"
        categoryColor={AMBER}
        title="Designing for Exceptions"
        subtitle="Not the Happy Path"
        date="April 2026"
        readTime="12 min read"
      />

      {/* ── 2. The Reality Split ── */}
      <ArticleSection maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 4 }}
        >
          The Reality Split
        </Typography>

        {/* Two-column comparison */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
            mb: 6,
          }}
        >
          {/* Happy Path box */}
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '12px',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 2,
              }}
            >
              Happy Path
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '3.5rem', md: '5rem' },
                fontWeight: 800,
                lineHeight: 1,
                color: 'text.secondary',
                mb: 1,
              }}
            >
              20%
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary' }}>
              of reality
            </Typography>
          </Box>

          {/* Exceptions box */}
          <Box
            sx={{
              border: `2px solid ${AMBER}`,
              borderRadius: '12px',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: AMBER,
                mb: 2,
              }}
            >
              Exceptions
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '3.5rem', md: '5rem' },
                fontWeight: 800,
                lineHeight: 1,
                color: AMBER,
                mb: 1,
              }}
            >
              80%
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', color: AMBER }}>
              of reality
            </Typography>
          </Box>
        </Box>

        <PullQuote
          quote="The happy path describes what was planned. The exception paths reveal what the system is."
          color={AMBER}
        />

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
        >
          This is a familiar distributed-systems stance: design for partial failure, retries, timeouts,
          missing dependencies, and ambiguous state. In AI systems, exceptions dominate because the world
          is adversarial, noisy, and underspecified.
        </Typography>
      </ArticleSection>

      {/* ── 3. Why Exceptions Dominate in AI ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          Why Exceptions Dominate in AI
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}
        >
          In AI systems, exceptions aren&rsquo;t edge cases. They&rsquo;re the primary operating condition.
        </Typography>

        {[
          {
            label: 'Ambiguous inputs',
            detail:
              'Users omit details, use slang, or provide contradictory information. What looks like a clear question to a human is often deeply underspecified.',
          },
          {
            label: 'Model uncertainty',
            detail:
              'Models have uncertainty and occasional mode collapse behaviors that are hard to predict. Fluency masks wrongness.',
          },
          {
            label: 'Retrieval failure',
            detail:
              'No relevant documents found, stale documents, wrong chunking. RAG doesn\u2019t guarantee the right context reaches the model.',
          },
          {
            label: 'System failures',
            detail:
              'Upstream and downstream services fail: timeouts, rate limits, outages. The AI layer inherits every fragility beneath it.',
          },
        ].map(({ label, detail }, idx) => (
          <Box
            key={idx}
            sx={{
              pl: 3,
              borderLeft: `3px solid ${AMBER}`,
              mb: idx < 3 ? 4 : 0,
              pb: idx < 3 ? 4 : 0,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: '1.0625rem', color: 'text.primary' }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: '1rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {detail}
            </Typography>
          </Box>
        ))}
      </ArticleSection>

      {/* ── 4. Case Studies ── */}
      <ArticleSection maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          Case Studies
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 2 }}
        >
          Three different domains, same lesson.
        </Typography>

        <CaseStudyBlock
          company="McDonald's / IBM"
          title="Drive-thru ordering is an exception-dense environment"
          description="Noise, accents, interruptions, menu complexity, tight latency expectations. Every order is a potential exception. McDonald's ended the pilot — not because the AI didn't work in demos, but because demos aren't drive-thrus."
          diagnosis="The happy path (clear voice, simple order, quiet environment) is the minority case. Real conditions are dominated by exceptions the system wasn't designed for."
          pattern="Uncertainty-first dialogue: explicit confirmation steps for low-confidence intents, seamless handoff to humans as a designed state, metrics tied to order correctness."
          accentColor={AMBER}
        />

        <CaseStudyBlock
          company="Air Canada"
          title="A policy contradiction the chatbot couldn't handle"
          description="When a customer asked about bereavement fares, the chatbot gave information that contradicted the airline's actual policy. The exception — a policy edge case — triggered legal, trust, and cost exposure."
          diagnosis="The system had no way to recognize that it was in uncertain territory. Instead of escalating or expressing uncertainty, it generated a confident answer."
          pattern="Confidence gating: route uncertain answers to escalation rather than improvisation. Treat 'I can't verify this' as a first-class output state."
          accentColor={AMBER}
        />

        <CaseStudyBlock
          company="Stitch Fix"
          title="Exceptions and nuance as a feature, not a bug"
          description="Their 'expert-in-the-loop' approach treats taste, tone, and context as primary realities — not edge cases to be smoothed over. Human judgment and algorithmic generation are intentionally combined."
          diagnosis="Instead of trying to eliminate exceptions, they designed the system to embrace them. Domain experts define quality criteria and review outputs."
          pattern="Expert-in-the-loop: humans define quality, review outputs, and feed failure examples back into evaluation suites. Iterate on the definition of 'good' rather than trying to automate it away."
          accentColor={AMBER}
        />
      </ArticleSection>

      {/* ── 5. Exception-First Design Patterns ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          Exception-First Design Patterns
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}
        >
          Four patterns that shift the design stance from &ldquo;handle exceptions when they happen&rdquo; to
          &ldquo;design for exceptions first.&rdquo;
        </Typography>

        {[
          {
            label: 'Fallback design',
            detail:
              'Always maintain a deterministic baseline for core workflows. If the AI path fails, the user must still be able to complete the job. This is the non-negotiable minimum.',
          },
          {
            label: 'Uncertainty-first dialogue',
            detail:
              "Explicit confirmation steps for low-confidence intents. The system communicates what it\u2019s unsure about rather than guessing. \u2018I\u2019m not confident about this\u2019 is a better output than a wrong answer.",
          },
          {
            label: 'Human-in-the-loop',
            detail:
              'Design human oversight as the system, not as an escalation hack. Interface tools, competence, authority, and the ability to intervene or stop.',
          },
          {
            label: 'Confidence gating',
            detail:
              'Route outputs through confidence thresholds. High confidence \u2192 deliver. Medium \u2192 deliver with caveats. Low \u2192 escalate. Never deliver low-confidence outputs as if they\u2019re certain.',
          },
        ].map(({ label, detail }, idx) => (
          <Box
            key={idx}
            sx={{
              pl: 3,
              borderLeft: `3px solid ${AMBER}`,
              mb: idx < 3 ? 4 : 0,
              pb: idx < 3 ? 4 : 0,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: '1.0625rem', color: 'text.primary' }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: '1rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {detail}
            </Typography>
          </Box>
        ))}
      </ArticleSection>

      {/* ── 6. UX for Exceptions ── */}
      <ArticleSection maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          UX for Exceptions
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}
        >
          The most important AI UX isn&rsquo;t the &ldquo;magic answer.&rdquo; It&rsquo;s the recovery UI.
        </Typography>

        {[
          {
            label: 'Communicate uncertainty and boundaries',
            detail:
              'What the system can and can\u2019t do. Set expectations before failure, not after. Users who understand limits trust the system more than users who discover limits through errors.',
          },
          {
            label: 'Show provenance for high-stakes claims',
            detail:
              'Which documents were used, when they were last updated. Prevent overtrust by making the system\u2019s reasoning visible.',
          },
          {
            label: 'Provide controls',
            detail:
              'Undo, edit, confirm, and escalate. The user is never trapped in an AI-driven path. Every automated decision has a manual override.',
          },
        ].map(({ label, detail }, idx) => (
          <Box
            key={idx}
            sx={{
              pl: 3,
              borderLeft: `3px solid ${AMBER}`,
              mb: idx < 2 ? 4 : 0,
              pb: idx < 2 ? 4 : 0,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: '1.0625rem', color: 'text.primary' }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: '1rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {detail}
            </Typography>
          </Box>
        ))}

        <PullQuote
          quote="If you can only design one thing well, design the recovery path. That's where trust is won or lost."
          color={AMBER}
        />
      </ArticleSection>

      {/* ── 7. CTA ── */}
      <ArticleCTA
        gradient="linear-gradient(135deg, #78350f, #451a03)"
        headline="Exceptions are where systems prove themselves."
        sub="If your AI system only works on the happy path, it doesn't work yet."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        accentColor={AMBER}
        secondaryText="Or start with a message →"
        secondaryHref="/contact"
      />

    </Box>
  );
}
