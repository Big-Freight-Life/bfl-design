'use client';

import { Box, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import StatCard from '@/components/articles/StatCard';
import StatGrid from '@/components/articles/StatGrid';
import ComparisonTable from '@/components/articles/ComparisonTable';
import MermaidDiagram from '@/components/articles/MermaidDiagram';

// ── Constants ──────────────────────────────────────────────────────────────

const RED = '#ef4444';
const TEAL = '#14B8A6';
const AMBER = '#f59e0b';

// ── Data ───────────────────────────────────────────────────────────────────

const ganttChart = `gantt
  title AI-first delivery timeline
  dateFormat YYYY-MM-DD
  section Foundations
  Problem map + risk tiering          :a1, 2026-04-13, 14d
  Baseline + instrumentation          :a2, after a1, 14d
  section Scaffolding
  Retrieval + provenance              :b1, after a1, 21d
  Golden sets + eval gate             :b2, after a1, 21d
  Cost caps + error budget policy     :b3, after a1, 21d
  section Launch
  Internal beta + HITL queue          :c1, after b1, 14d
  External beta (gated traffic)       :c2, after c1, 14d
  section Hardening
  Exception-driven improvements       :d1, after c2, 28d
  Autonomy expansion (if earned)      :d2, after d1, 28d`;

const comparisonHeaders = ['Team Size', 'First 30–60 Days', 'Next 60–120 Days', 'Ongoing'];

const comparisonRows = [
  [
    'Small',
    'Narrow scope + deterministic fallback + cost caps + basic tracing',
    'Golden set + eval gate + error-budget policy',
    'Weekly incident/eval review; expand scope only after budget stability',
  ],
  [
    'Medium',
    'Central orchestrator + shared retrieval + standard logging',
    'Red-team + abuse suite; role-based permissions; monitoring',
    'Platform team owns evals/guardrails; product teams own outcomes',
  ],
  [
    'Large',
    'Governed platform with policy gates, audit logs, monitoring',
    'Compliance alignment for high-risk use; automated documentation',
    'Formal change management tied to error budgets and risk tier',
  ],
];

// ── Reusable styled list item ──────────────────────────────────────────────

function RedBorderItem({
  term,
  desc,
  last = false,
}: {
  term: string;
  desc: string;
  last?: boolean;
}) {
  return (
    <Box
      sx={{
        pl: 3,
        borderLeft: `3px solid ${RED}`,
        mb: last ? 0 : 4,
        pb: last ? 0 : 4,
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: '1.0625rem', color: '#fff' }}>
        {term}
      </Typography>
      <Typography sx={{ fontSize: '1rem', lineHeight: 1.75, color: '#94a3b8' }}>
        {desc}
      </Typography>
    </Box>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function SmallTeamsAIDecisionsPage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(180deg, #0c0a09, #1c1917)"
        category="Survival"
        categoryColor={RED}
        title="Why Small Teams Can't Afford Bad AI Decisions"
        subtitle="Error Budgets, Cost Caps, and the Thin-Margin Reality"
        date="April 2026"
        readTime="14 min read"
      />

      {/* ── 2. The Thin-Margin Reality ── */}
      <ArticleSection bg="dark" maxWidth="52rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 3, color: '#fff' }}
        >
          The Thin-Margin Reality
        </Typography>

        <StatGrid>
          <StatCard value="55.8%" label="Copilot speed gain in controlled study" color={TEAL} />
          <StatCard value="$881M" label="Zillow write-down from forecasting failures" color={AMBER} />
          <StatCard value="0%" label="Error budget remaining when it matters most" color={RED} />
        </StatGrid>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: '#e2e8f0', mb: 4 }}
        >
          Small teams operate with thin buffers: limited support capacity, limited PR resilience,
          and limited cash/compute headroom. If your AI capability increases incident load,
          escalations, or cost variance, it can destroy a small team even if the demo looks strong.
        </Typography>

        <PullQuote
          quote="A 'successful feature' can become a burn-rate accelerant if you don't cap and attribute costs by workflow."
          color={RED}
        />
      </ArticleSection>

      {/* ── 3. Cost Risk ── */}
      <ArticleSection bg="dark" maxWidth="52rem">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 3, color: '#fff' }}
        >
          Cost Risk: Variable Spend
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: '#e2e8f0', mb: 5 }}
        >
          LLM systems introduce variable costs driven by usage volume, prompt length,
          retrieval/tool calls, and retry behavior.
        </Typography>

        <RedBorderItem
          term="Budgeted routing"
          desc="Cheaper paths for low-risk tasks, strict caps for expensive routes"
        />
        <RedBorderItem
          term="Caching"
          desc="Cache where correctness allows — not every request needs a fresh LLM call"
        />
        <RedBorderItem
          term="Cost attribution"
          desc="Track cost per workflow, not just aggregate — know where money goes"
        />
        <RedBorderItem
          term="Graceful degradation"
          desc="When budgets are hit, degrade features rather than overspend"
          last
        />
      </ArticleSection>

      {/* ── 4. Latency Risk ── */}
      <ArticleSection bg="dark" maxWidth="52rem">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 3, color: '#fff' }}
        >
          Latency Risk: p95 Defines Trust
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: '#e2e8f0', mb: 5 }}
        >
          User trust is highly sensitive to tail latency. When AI adds retrieval, tool execution,
          and retries, p95/p99 can degrade sharply.
        </Typography>

        <RedBorderItem
          term="Streaming UX"
          desc="Show partial results as they arrive rather than waiting for complete responses"
        />
        <RedBorderItem
          term="Async workflows"
          desc="Move slow operations to background processing — don't block the user"
        />
        <RedBorderItem
          term="Timeouts + fallbacks"
          desc="Every tool call gets a timeout. When it fires, fall back to the deterministic path"
          last
        />

        <Box sx={{ mt: 4 }}>
          <PullQuote
            quote="If your p95 latency is bad, your product trust is bad. Users don't average their experience."
            color={RED}
          />
        </Box>
      </ArticleSection>

      {/* ── 5. Error Budgets ── */}
      <ArticleSection bg="dark" maxWidth="52rem">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 3, color: '#fff' }}
        >
          Error Budgets: The Survival Primitive
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: '#e2e8f0', mb: 5 }}
        >
          Error budgets translate reliability into an operational control: if you exceed budget,
          you freeze changes and address root causes. This maps directly onto AI releases and
          prompt/model changes.
        </Typography>

        {/* Error Budget Visualization */}
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            p: { xs: 3, md: 4 },
            mb: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#64748b',
              mb: 2,
            }}
          >
            Error Budget Burn Rate
          </Typography>

          {/* Progress bar track */}
          <Box
            sx={{
              height: 10,
              bgcolor: 'rgba(255,255,255,0.08)',
              borderRadius: 999,
              overflow: 'hidden',
              mb: 1.5,
            }}
          >
            {/* Inner fill at 87% */}
            <Box
              sx={{
                width: '87%',
                height: '100%',
                background: `linear-gradient(90deg, ${TEAL} 0%, ${AMBER} 60%, ${RED} 100%)`,
                borderRadius: 999,
              }}
            />
          </Box>

          {/* Labels */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Safe</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: RED, fontWeight: 700 }}>Frozen</Typography>
          </Box>

          <Typography sx={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
            At 87% burn rate, one more incident freezes all AI releases.
          </Typography>
        </Box>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: '#e2e8f0' }}
        >
          For small teams, error budgets prevent a common failure spiral: shipping AI increases
          incidents → incidents consume the team → product stagnates and trust erodes.
        </Typography>
      </ArticleSection>

      {/* ── 6. Governance ── */}
      <ArticleSection bg="dark" maxWidth="52rem">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 3, color: '#fff' }}
        >
          Minimum Viable Governance
        </Typography>

        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: '#e2e8f0', mb: 5 }}
        >
          Even if you&rsquo;re not in a regulated domain, adopting governance-lite protects you.
          The posture matters more than the paperwork.
        </Typography>

        <RedBorderItem
          term="Risk register"
          desc="What can go wrong, how likely, how severe. Update it when things actually go wrong."
        />
        <RedBorderItem
          term="Change log"
          desc="Every prompt change, model swap, or tool addition is logged with rationale."
        />
        <RedBorderItem
          term="Eval gates"
          desc="No change ships without passing the evaluation suite. No exceptions."
        />
        <RedBorderItem
          term="Incident response"
          desc="When something goes wrong, you have a process. Not a Slack thread."
          last
        />
      </ArticleSection>

      {/* ── 7. The Roadmap ── */}
      <ArticleSection bg="dark" maxWidth="56rem">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, mb: 3, color: '#fff' }}
        >
          Implementation Roadmap
        </Typography>

        <MermaidDiagram
          chart={ganttChart}
          caption="AI-first delivery timeline: foundations → scaffolding → controlled launch → hardening"
        />

        <Box sx={{ mt: 6 }}>
          <ComparisonTable headers={comparisonHeaders} rows={comparisonRows} />
        </Box>
      </ArticleSection>

      {/* ── 8. CTA ── */}
      <ArticleCTA
        gradient="linear-gradient(180deg, #1c1917, #0c0a09)"
        headline="Your margin for error is thin. Design accordingly."
        sub="If your AI investments aren't producing results, the system is the place to start."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        accentColor={RED}
        secondaryText="Or start with a message →"
        secondaryHref="/contact"
      />

    </Box>
  );
}
