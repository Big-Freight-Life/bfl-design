'use client';

import { Box, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import ImagePlaceholder from '@/components/articles/ImagePlaceholder';
import StatCard from '@/components/articles/StatCard';
import StatGrid from '@/components/articles/StatGrid';
import ChapterSection from '@/components/articles/ChapterSection';

// ── Data ───────────────────────────────────────────────────────────────────

const metaItems = [
  { label: 'Client', value: 'Hyland Software' },
  { label: 'Industry', value: 'Enterprise Software' },
  { label: 'Duration', value: '18 Months' },
  { label: 'Services', value: 'Integration Design, UX Strategy' },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function HylandForWorkdayPage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(180deg, #0f172a, #1e293b)"
        category="Enterprise Integration"
        categoryColor="#14B8A6"
        title="Hyland for Workday Integration"
        subtitle="Unified content management. Seamless user experience."
        date="2025"
        readTime="Client: Hyland Software"
      />

      {/* ── 2. Stats ── */}
      <ArticleSection bg="dark" maxWidth="56rem">
        <StatGrid>
          <StatCard value="Zero" label="Custom Code Required" color="#14B8A6" />
          <StatCard value="SSO" label="Single Sign-On" color="#14B8A6" />
          <StatCard value="2" label="Platforms Unified" color="#14B8A6" />
        </StatGrid>
      </ArticleSection>

      {/* ── 3. Overview ── */}
      <ArticleSection bg="dark" maxWidth="44rem">
        <Typography
          sx={{
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.5,
            mb: 3,
          }}
        >
          Workday customers needed a way to capture, index, search, view, and manage content
          directly from their Workday screens — without custom development or middleware.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.0625rem' },
            lineHeight: 1.75,
            color: 'grey.400',
            mb: 5,
          }}
        >
          Documents lived in silos. HR and Finance teams toggled between systems. Content governance
          was fragmented. Hyland partnered with Workday to change that.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          {metaItems.map(({ label, value }) => (
            <Box
              key={label}
              sx={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                px: 2.5,
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#14B8A6',
                  mb: 0.5,
                }}
              >
                {label}
              </Typography>
              <Typography sx={{ fontSize: '0.9375rem', color: 'grey.300', fontWeight: 500 }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </ArticleSection>

      {/* ── 4. The Challenge ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="challenge" title="The Challenge">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            Enterprise HR and Finance teams run on Workday — but the documents that support their
            work lived somewhere else entirely. Onboarding packets, invoices, benefits forms,
            compliance records. Every time a user needed to reference a document, they left
            Workday, opened another system, searched, found (or didn&rsquo;t find) what they needed,
            and came back. Context switching wasn&rsquo;t a minor inconvenience — it was the job.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            Content governance was fragmented as a result. Documents uploaded in one system
            weren&rsquo;t indexed against the right Workday records. Audit trails were split across
            platforms. Retention policies couldn&rsquo;t be applied consistently because no single
            system had the full picture.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            Previous attempts at solving this had layered on middleware, custom connectors, and
            bespoke development that required ongoing maintenance and created new failure points.
            The solution wasn&rsquo;t more glue code. The solution was to close the gap entirely.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 5. The Goal ── */}
      <ArticleSection bg="dark" maxWidth="44rem">
        <ChapterSection id="goal" title="The Goal">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'grey.400', mb: 3 }}
          >
            Enable Workday users to capture, index, search, view, and manage Hyland-hosted content
            directly within the Workday interface — without ever leaving the platform. No middleware.
            No custom code. No separate login.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'grey.400', mb: 3 }}
          >
            Single sign-on was a non-negotiable. Users authenticated once through Workday and gained
            seamless access to their content in Hyland. The integration had to feel like a native
            Workday capability — not a third-party tool bolted on the side.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'grey.400' }}
          >
            The target was an experience so cohesive that users wouldn&rsquo;t think of it as an
            integration at all. Content management would simply be part of how Workday worked for them.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 6. The Approach ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="approach" title="The Approach">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            Design started with zero context switching as the hard constraint. If a user had to
            open a new tab, navigate to a separate URL, or authenticate again, the integration had
            failed. Every design decision was tested against that standard. The Workday UI patterns,
            interaction models, and visual language became the reference — not Hyland&rsquo;s own interface.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            On the configuration side, the goal was admin-friendly setup with no developer involvement.
            Hyland&rsquo;s admin tooling was extended to let IT teams map content types, define indexing
            fields, and configure which Workday business objects would surface related documents — all
            through a point-and-click interface. Implementation time dropped from weeks of custom
            development to hours of configuration.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            The architecture was designed to be AI-ready from the start. Content indexed through the
            integration would be available to future intelligent document processing and classification
            workflows without requiring a rebuild of the integration layer.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 7. Image ── */}
      <ArticleSection bg="dark" maxWidth="56rem">
        <ImagePlaceholder
          caption="Content management embedded directly into Workday screens"
          gradient="linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(30,41,59,0.80) 100%)"
        />
      </ArticleSection>

      {/* ── 8. Results ── */}
      <ArticleSection bg="dark" maxWidth="44rem">
        <ChapterSection id="results" title="Results">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'grey.400', mb: 3 }}
          >
            Hyland and Workday customers gained a unified platform where content lives alongside
            the business records it supports. HR teams onboard employees without leaving Workday.
            Finance teams process invoices with supporting documents surfaced inline. Compliance
            teams run audits against a single, consistent content trail.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'grey.400', mb: 3 }}
          >
            Context switching was eliminated for day-to-day content tasks. The SSO architecture
            meant zero additional credentials to manage. Configuration — not custom code — became
            the deployment model, which compressed implementation timelines and reduced reliance
            on specialized development resources.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'grey.400' }}
          >
            The integration architecture also positioned both platforms for AI-powered document
            intelligence — content properly indexed within a governed, accessible system is the
            prerequisite for automation that actually works.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 9. Pull Quote ── */}
      <ArticleSection bg="dark" maxWidth="44rem">
        <PullQuote
          quote="The best integration is one users forget is there. It just works."
          color="#14B8A6"
        />
      </ArticleSection>

      {/* ── 10. CTA ── */}
      <ArticleCTA
        headline="Complex systems don't have to feel complex."
        sub="Let's talk about making your platforms work together."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        secondaryText="Or start with a message →"
        secondaryHref="/contact"
        gradient="linear-gradient(180deg, #0f172a, #1e293b)"
        accentColor="#14B8A6"
      />

    </Box>
  );
}
