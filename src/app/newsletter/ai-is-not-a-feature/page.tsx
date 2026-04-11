'use client';

import { Box, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import CaseStudyBlock from '@/components/articles/CaseStudyBlock';
import ComparisonTable from '@/components/articles/ComparisonTable';
import MermaidDiagram from '@/components/articles/MermaidDiagram';

// ── Mermaid chart definitions ──────────────────────────────────────────────

const architectureChart = `flowchart TB
  U[User] --> UI[UI/Client]
  UI --> API[Product API]
  API --> ORCH[AI Orchestrator]
  ORCH --> ROUTE{Route by risk + task}
  ROUTE --> LLM[LLM]
  ROUTE --> SMALL[Cheaper model / cached path]
  ORCH --> RETR[Retrieval Layer]
  RETR --> KB[Knowledge base]
  RETR --> VEC[Vector index]
  ORCH --> VALID[Validators + schema checks]
  ORCH --> POLICY[Policy & security gates]
  ORCH --> FALLBACK[Fallbacks]
  FALLBACK --> BASE[Deterministic baseline]
  FALLBACK --> HUMAN[Human review queue]
  ORCH --> OBS[Observability]
  OBS --> LOGS[Traces + logs]
  OBS --> METRICS[Latency/cost/quality]
  OBS --> EVALS[Continuous eval harness]`;

const observabilityChart = `flowchart LR
  APP[AI App] --> OTEL[OTel Collector]
  OTEL --> METRICS[Metrics store]
  OTEL --> TRACES[Trace store]
  OTEL --> LOGS[Log store]
  METRICS --> DASH[Dashboards]
  TRACES --> DASH
  LOGS --> DASH
  METRICS --> ALERTS[Alert rules]
  ALERTS --> ONCALL[On-call]`;

// ── Data ───────────────────────────────────────────────────────────────────

const comparisonHeaders = ['Dimension', 'Bolt-on AI', 'AI-first System', 'Expected Failure'];

const comparisonRows = [
  [
    'Starting point',
    "Tool-first ('add a chatbot')",
    'Problem/workflow-first',
    'Impressive demo, negative ROI',
  ],
  [
    'Truth source',
    'Model memory + prompts',
    'Grounding + provenance + constraints',
    'Confident wrong answers',
  ],
  [
    'Exceptions',
    'Implicit, handled ad hoc',
    'Modeled states + recovery paths',
    'Brittle UX, trust collapse',
  ],
  [
    'Evaluation',
    "'Looks good in QA'",
    'Golden sets + continuous eval gates',
    'Regressions after updates',
  ],
  [
    'Ops posture',
    'Minimal telemetry',
    'Observability + budgets + alerts',
    'Silent drift, cost spikes',
  ],
];

const dashboardPanels = [
  {
    title: 'Outcomes',
    metrics: ['Task completion rate', 'Escalation rate', 'Redo / re-ask rate'],
  },
  {
    title: 'Reliability',
    metrics: ['p50 / p95 / p99 latency', 'Timeout rate', 'Tool-call failure rate'],
  },
  {
    title: 'Quality',
    metrics: ['Grounded-answer rate', 'Citation coverage', 'Human override rate'],
  },
  {
    title: 'Safety & Cost',
    metrics: [
      'Prompt-injection detections',
      'Policy violations',
      'Cost / request',
      'Cost / outcome',
    ],
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function AIIsNotAFeaturePage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(135deg, #0f172a, #1e293b)"
        category="Systems"
        categoryColor="#14B8A6"
        title="AI Is Not a Feature"
        subtitle="Designing AI-First Systems for Exceptions and Small-Team Reality"
        date="April 2026"
        readTime="15 min read"
      />

      {/* ── 2. The Thesis ── */}
      <ArticleSection maxWidth="44rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 5 }}
        >
          The Thesis
        </Typography>

        {[
          "AI is not a feature \u2014 shipping AI changes the architecture and the decision workflow. If you don\u2019t design the scaffolding, you inherit silent coupling and operational debt.",
          "Design for exceptions, not the happy path \u2014 reliability comes from explicitly designing non-ideal paths: uncertainty, missing info, adversarial inputs, outages.",
          "Small teams can\u2019t afford bad AI decisions \u2014 limited runway means thin error budgets. The right stance is graceful degradation, hard caps, high observability, and narrow scope.",
        ].map((statement, idx) => (
          <Box
            key={idx}
            sx={{
              mb: idx < 2 ? 4 : 0,
              pb: idx < 2 ? 4 : 0,
              borderBottom: idx < 2 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                lineHeight: 1.7,
                color: 'text.primary',
              }}
            >
              <Box component="span" sx={{ color: '#14B8A6', fontWeight: 700, mr: 1 }}>
                {idx + 1}.
              </Box>
              {statement}
            </Typography>
          </Box>
        ))}
      </ArticleSection>

      {/* ── 3. The Bolt-On Failure Mode ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          The Bolt-On Failure Mode
        </Typography>

        <Typography sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 4 }}>
          In production ML, systems accrue &lsquo;hidden technical debt&rsquo; — entanglement, boundary erosion,
          undeclared consumers, and configuration debt. These failure modes arise when ML is treated like a
          swappable component rather than a system.
        </Typography>

        <ComparisonTable headers={comparisonHeaders} rows={comparisonRows} />

        <PullQuote
          quote="Quick ML wins mask compounding maintenance costs due to glue code, pipeline complexity, and coupling loops."
          color="#14B8A6"
        />
      </ArticleSection>

      {/* ── 4. Case Studies ── */}
      <ArticleSection maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          Case Studies
        </Typography>

        <Typography sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 2 }}>
          Real incidents show the pattern clearly.
        </Typography>

        <CaseStudyBlock
          company="Air Canada"
          title="A chatbot gave misleading bereavement fare information"
          description="In Moffatt v. Air Canada (2024), a tribunal found the airline liable for its chatbot's inaccurate information about bereavement fares. The tribunal rejected the argument that the chatbot was a separate entity — customers shouldn't have to double-check one part of a site against another."
          diagnosis="The chatbot operated as a conversational veneer over policy without a constraint layer tying outputs to authoritative policy text, freshness validation, or confidence gating."
          pattern="Policy-constrained answering: retrieval over canonical sources, required citations for high-stakes claims, confidence gating that routes uncertain answers to escalation."
          accentColor="#14B8A6"
        />

        <CaseStudyBlock
          company="McDonald's / IBM"
          title="Drive-thru AI ordering pilot ended after multi-year test"
          description="McDonald's ended its AI-powered drive-thru voice ordering test with IBM after running the pilot since 2021. Drive-thru ordering is an exception-dense environment: noise, accents, interruptions, menu complexity, tight latency."
          diagnosis="Demos overrepresent the happy path. Real conditions — noise, accents, interruptions — reveal the system's true reliability limits."
          pattern="Uncertainty-first dialogue: explicit confirmation for low-confidence intents, seamless human handoff as a designed state, metrics tied to order correctness not just automation rate."
          accentColor="#14B8A6"
        />

        <CaseStudyBlock
          company="Zillow Group"
          title="iBuying program wound down after forecasting failures"
          description="Zillow wound down Zillow Offers after describing forecasting limitations and risk dynamics in its Q3 2021 shareholder letter. When model outputs drive capital deployment, error becomes balance-sheet exposure."
          diagnosis="When AI outputs drive capital deployment, 'AI as a feature' is an invalid framing. The model is a core component of a financial risk system that needs circuit breakers, stress tests, and governance."
          pattern="Financial circuit breakers: conservative operating bands, kill-switch governance, post-market monitoring and continuous compliance evaluation."
          accentColor="#14B8A6"
        />
      </ArticleSection>

      {/* ── 5. The Architecture ── */}
      <ArticleSection bg="alt" maxWidth="56rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          The Architecture
        </Typography>

        <Typography sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 4 }}>
          A central AI-first pattern is to separate &lsquo;model call&rsquo; from &lsquo;product decision.&rsquo; The orchestrator
          owns routing, retrieval, validation, policy gates, fallbacks, and observability.
        </Typography>

        <MermaidDiagram
          chart={architectureChart}
          caption="AI-first architecture: the orchestrator separates model calls from product decisions"
        />

        <Box sx={{ mt: 5 }}>
          {[
            {
              term: 'Thin-waist contracts',
              desc: 'Enforce structured outputs and validation rather than free-form text everywhere.',
            },
            {
              term: 'Tool isolation',
              desc: 'Treat tool invocation as privileged execution behind explicit allowlists and permission checks.',
            },
            {
              term: 'Observability by default',
              desc: 'Log and trace every decision pathway: routing, retrieval docs used, tool calls.',
            },
          ].map(({ term, desc }, idx) => (
            <Box
              key={idx}
              sx={{
                mb: idx < 2 ? 3 : 0,
                pb: idx < 2 ? 3 : 0,
                borderBottom: idx < 2 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'text.primary' }}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {term}
                </Box>
                {' '}—{' '}
                <Box component="span" sx={{ color: 'text.secondary' }}>
                  {desc}
                </Box>
              </Typography>
            </Box>
          ))}
        </Box>
      </ArticleSection>

      {/* ── 6. AI-First Successes ── */}
      <ArticleSection maxWidth="44rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          AI-First Successes
        </Typography>

        <Typography sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}>
          By contrast, AI-first successes share two properties: AI is embedded in a workflow with rapid human
          verification, and the organization treats evaluation as core infrastructure.
        </Typography>

        {[
          {
            title: 'GitHub Copilot',
            description:
              'A controlled experiment showed developers completed coding tasks 55.8% faster with Copilot. The key: AI is embedded in a high-feedback workflow (the IDE) where humans verify quickly. Autonomy is constrained — the system suggests, the human decides.',
          },
          {
            title: 'Stitch Fix',
            description:
              "Their 'expert-in-the-loop' approach intentionally combines human judgment with algorithmic generation. Humans define quality criteria, review outputs, and feed failure examples back into evaluation suites. Exceptions and nuance are treated as primary reality.",
          },
        ].map(({ title, description }, idx) => (
          <Box
            key={idx}
            sx={{
              mb: idx === 0 ? 5 : 0,
              pb: idx === 0 ? 5 : 0,
              borderBottom: idx === 0 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, fontWeight: 700, mb: 1.5 }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        ))}

        <PullQuote
          quote="Start with suggestion layers and progressively earn autonomy by passing eval gates and staying within error budgets."
          color="#14B8A6"
        />
      </ArticleSection>

      {/* ── 7. The Dashboard ── */}
      <ArticleSection bg="alt" maxWidth="56rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3 }}
        >
          The Dashboard
        </Typography>

        <Typography sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}>
          An AI-first dashboard should look more like an SRE dashboard than a model benchmark.
        </Typography>

        {/* 2×2 metric panels */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
            mb: 6,
          }}
        >
          {dashboardPanels.map(({ title, metrics }) => (
            <Box
              key={title}
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#14B8A6',
                  mb: 2,
                }}
              >
                {title}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                {metrics.map((metric) => (
                  <Box
                    key={metric}
                    component="li"
                    sx={{
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      mb: 0.5,
                      '&::before': {
                        content: '"·"',
                        mr: 1,
                        color: '#14B8A6',
                        fontWeight: 700,
                      },
                    }}
                  >
                    {metric}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <MermaidDiagram
          chart={observabilityChart}
          caption="Observability stack: OpenTelemetry → storage → dashboards + alerting"
        />
      </ArticleSection>

      {/* ── 8. CTA ── */}
      <ArticleCTA
        headline="Your system needs an architect."
        sub="If your AI investments aren't producing results, the system is the place to start."
        buttonText="Learn About Applied AI Architecture"
        buttonHref="/applied-ai-architect"
        secondaryText="Or start with a message →"
        secondaryHref="/contact"
        gradient="linear-gradient(135deg, #0f172a, #1e293b)"
        accentColor="#14B8A6"
      />

    </Box>
  );
}
