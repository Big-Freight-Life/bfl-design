'use client';

import { Box, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import ImagePlaceholder from '@/components/articles/ImagePlaceholder';
import StatsBar from '@/components/articles/StatsBar';
import ChapterSection from '@/components/articles/ChapterSection';

const ACCENT = '#0ea5e9';

export default function SalesforceMigrationPage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(135deg, #0ea5e9, #0284c7)"
        category="Healthcare SaaS / CRM Migration"
        categoryColor="#38bdf8"
        title="Seamless Salesforce Migration"
        subtitle="Designed for clarity. Built for adoption."
        date="2025"
        readTime="Client: AtlasMed Solutions"
      />

      {/* ── 2. Stats Bar ── */}
      <ArticleSection maxWidth="56rem">
        <StatsBar
          stats={[
            { value: '1.2M+', label: 'Records Migrated' },
            { value: '98.9%', label: 'Data Fidelity' },
            { value: '81%', label: 'Daily Active Users' },
            { value: '30%', label: 'Productivity Increase' },
          ]}
        />
      </ArticleSection>

      {/* ── 3. The Challenge ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="challenge" title="The Challenge">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.75,
              color: 'text.primary',
              mb: 3,
            }}
          >
            AtlasMed Solutions, a growing healthcare SaaS company, had reached the limits of its
            legacy systems.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 4 }}
          >
            Sales operated in Zoho CRM. Support relied on a custom ERP. Marketing data lived
            elsewhere. Teams worked hard — but not together.
          </Typography>

          <Box
            component="ul"
            sx={{ m: 0, pl: 0, listStyle: 'none', mb: 4 }}
          >
            {[
              'Leadership lacked a real-time view of the business',
              'Users struggled with inconsistent workflows across systems',
              'Legacy architecture wasn\'t built to scale with the company',
            ].map((item) => (
              <Box
                key={item}
                component="li"
                sx={{
                  fontSize: { xs: '1rem', md: '1.0625rem' },
                  lineHeight: 1.75,
                  color: 'text.secondary',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  '&::before': {
                    content: '"→"',
                    color: ACCENT,
                    fontWeight: 700,
                    flexShrink: 0,
                    mt: '2px',
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Box>

          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.0625rem' },
              lineHeight: 1.75,
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            AtlasMed needed more than a migration. They needed a single system people would
            actually use.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 4. Image: Legacy Landscape ── */}
      <ArticleSection maxWidth="52rem">
        <ImagePlaceholder
          caption="Legacy system landscape before migration"
          gradient="linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.10) 100%)"
        />
      </ArticleSection>

      {/* ── 5. The Goal ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="goal" title="The Goal">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.75,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Replace fragmented tools with a unified Salesforce platform — without losing data,
            disrupting teams, or sacrificing usability.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            Success wouldn&rsquo;t be measured by go-live alone, but by how people worked
            afterward.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 6. The Approach ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="approach" title="The Approach">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            We started with discovery — not configuration. Before touching Salesforce, we spent
            two weeks mapping stakeholders across sales, support, and leadership. Each team had
            different mental models of the same data. Understanding that gap was the first design
            decision.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            The data migration itself involved over 1.2 million records spanning accounts,
            contacts, cases, and custom objects from Zoho and the legacy ERP. We built a
            phased migration pipeline with per-record validation, transformation rules, and
            automated reconciliation reports. Nothing moved without a checksum.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            Custom objects and workflow automation were designed around how teams actually
            worked — not how Salesforce expected them to work. That meant field-level interviews,
            workflow observation sessions, and prototype reviews before a single Flow was deployed.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            User adoption was treated as a first-class design concern from day one. We ran
            role-based training, produced plain-language documentation, and embedded a feedback
            loop during the first 30 days post-launch. The goal wasn&rsquo;t a clean cutover —
            it was a system people would choose to use.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 7. Image: Unified Dashboard ── */}
      <ArticleSection maxWidth="52rem">
        <ImagePlaceholder
          caption="Unified Salesforce dashboard designed for daily use"
          gradient="linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.10) 100%)"
        />
      </ArticleSection>

      {/* ── 8. Results ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="results" title="Results">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            98.9% data fidelity wasn&rsquo;t a target — it was a constraint. In healthcare SaaS,
            a record that migrates incorrectly isn&rsquo;t just a data error. It&rsquo;s a broken
            relationship, a missed follow-up, a support case that falls through the cracks. Getting
            the data right was the foundation everything else was built on.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            81% daily active users is the number we&rsquo;re most proud of. Most CRM rollouts
            plateau at adoption rates that look fine in a report but reveal themselves in
            workarounds — spreadsheets, sticky notes, tribal knowledge. AtlasMed&rsquo;s teams
            actually showed up in Salesforce, every day, because the system made their work
            easier.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            The 30% productivity increase emerged from eliminating the switching cost between
            systems. Time previously spent copying data between Zoho, the ERP, and spreadsheets
            was reclaimed. That&rsquo;s not automation — that&rsquo;s just removing friction that
            should never have existed.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 9. Impact ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="impact" title="Impact">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            For the first time, AtlasMed&rsquo;s leadership had a live, unified view of the
            business. Pipeline health, support queue depth, and customer health scores lived in
            one place — visible without a dashboard request or a data export. Decisions that used
            to take days of preparation now happened in the room.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            Beyond the numbers, the migration created a foundation for growth. New hires onboard
            to a single system. Sales, support, and marketing share a common language around the
            same data. When AtlasMed is ready to add the next capability — AI-assisted forecasting,
            deeper integrations, expanded reporting — the platform is ready for it.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 10. What We Learned ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="learnings" title="What We Learned">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              {
                num: '01',
                heading: 'Migration is a design problem, not just a data problem',
                body: 'Field mapping and ETL pipelines are necessary — but the real work is understanding how people think about their data and designing a system that matches that mental model.',
              },
              {
                num: '02',
                heading: 'Adoption starts before go-live',
                body: 'The teams who showed up on launch day were the ones who had been involved in the design process. Inclusion builds ownership, and ownership drives use.',
              },
              {
                num: '03',
                heading: 'Data fidelity is trust — lose the data, lose the team',
                body: 'A single high-profile data error can undo months of goodwill. The 98.9% fidelity rate wasn\'t just technical accuracy — it was the credibility that made adoption possible.',
              },
              {
                num: '04',
                heading: 'The system people use is the system you designed for them',
                body: 'If users work around your system, the system failed — regardless of what went live. Design for the actual workflow, not the ideal workflow.',
              },
            ].map(({ num, heading, body }) => (
              <Box key={num} sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 800,
                    color: ACCENT,
                    lineHeight: 1,
                    flexShrink: 0,
                    opacity: 0.6,
                    minWidth: '2.5rem',
                  }}
                >
                  {num}
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.0625rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    {heading}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: '0.9375rem', md: '1rem' }, lineHeight: 1.75, color: 'text.secondary' }}
                  >
                    {body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 11. Pull Quote ── */}
      <ArticleSection maxWidth="44rem">
        <PullQuote
          quote="A migration isn't done when the data moves. It's done when people stop asking for the old system."
          color={ACCENT}
        />
      </ArticleSection>

      {/* ── 12. CTA ── */}
      <ArticleCTA
        headline="Complex migrations don't have to be painful."
        sub="Let's talk about making your next platform transition smooth."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        accentColor={ACCENT}
        secondaryText="Or start with a message →"
        secondaryHref="/contact"
      />

    </Box>
  );
}
