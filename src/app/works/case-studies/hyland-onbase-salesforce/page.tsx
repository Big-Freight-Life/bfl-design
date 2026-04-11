'use client';

import { Box, Grid, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import ImagePlaceholder from '@/components/articles/ImagePlaceholder';
import StatsBar from '@/components/articles/StatsBar';
import ChapterSection from '@/components/articles/ChapterSection';

// ── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { value: '3', label: 'Industries' },
  { value: 'Zero', label: 'Custom Code' },
  { value: 'Native', label: 'Lightning UX' },
  { value: 'Live', label: 'AppExchange' },
];

const accentColor = '#a78bfa';

// ── Page ───────────────────────────────────────────────────────────────────

export default function HylandOnbaseSalesforcePage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(135deg, #7c3aed, #4f46e5)"
        category="Enterprise Integration"
        categoryColor={accentColor}
        title="Hyland OnBase Integration for Salesforce"
        subtitle="Enterprise document management meets CRM. Seamlessly."
        date="2025"
        readTime="Client: Hyland Software, Inc."
      />

      {/* ── 2. StatsBar ── */}
      <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 }, maxWidth: '1024px', mx: 'auto' }}>
        <StatsBar stats={stats} />
      </Box>

      {/* ── 3. The Challenge ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="challenge" title="The Challenge">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Enterprise organizations using both Hyland OnBase and Salesforce faced a persistent problem: constant context switching between applications.
          </Typography>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 4 }}
          >
            Sales teams couldn&rsquo;t quickly access customer contracts. Service agents struggled to retrieve supporting documentation. The disconnect between content management and CRM was costing organizations time and money.
          </Typography>

          <Box
            component="ul"
            sx={{
              m: 0,
              pl: 0,
              listStyle: 'none',
              mb: 4,
            }}
          >
            {[
              'Users switching between applications multiple times per task',
              'Manual data entry errors across disconnected systems',
              'No unified search across content and CRM records',
              'Complex custom API implementations required for any integration',
            ].map((point) => (
              <Box
                key={point}
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
                    color: accentColor,
                    fontWeight: 700,
                    flexShrink: 0,
                    mt: '2px',
                  },
                }}
              >
                {point}
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
            Hyland needed more than an integration. They needed a product that felt native to Salesforce.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 4. Image ── */}
      <Box sx={{ px: { xs: 3, md: 6 }, maxWidth: '1024px', mx: 'auto' }}>
        <ImagePlaceholder
          caption="Context switching between OnBase and Salesforce before integration"
          gradient="linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.10) 100%)"
        />
      </Box>

      {/* ── 5. The Approach ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <ChapterSection id="approach" title="The Approach">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'text.primary',
              mb: 4,
            }}
          >
            We treated the integration as a product experience, not just a technical connection.
          </Typography>

          {/* Numbered principles */}
          <Box sx={{ mb: 5 }}>
            {[
              { num: '01', label: 'Zero context switching' },
              { num: '02', label: 'Intelligent automation' },
              { num: '03', label: 'Admin-friendly config' },
            ].map(({ num, label }, idx) => (
              <Box
                key={num}
                sx={{
                  mb: idx < 2 ? 2 : 0,
                  pb: idx < 2 ? 2 : 0,
                  borderBottom: idx < 2 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: accentColor,
                    minWidth: '2rem',
                  }}
                >
                  {num}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.0625rem' },
                    fontWeight: 600,
                    color: 'text.primary',
                    lineHeight: 1.6,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Sub-sections */}
          {[
            {
              title: 'Discovery & Research',
              body: 'We conducted user interviews across Financial Services, Healthcare, and Retail — the three verticals Hyland identified as highest priority. Common pain points emerged quickly: document retrieval latency, manual file attachment workflows, and the cognitive overhead of maintaining two separate sessions.',
            },
            {
              title: 'Design System Alignment',
              body: 'The integration had to feel like Salesforce — not like a foreign application embedded in it. We mapped every component to the Salesforce Lightning Design System, matching spacing, typography, interaction patterns, and accessibility standards exactly.',
            },
            {
              title: 'Progressive Disclosure',
              body: 'Enterprise software often overwhelms users with configuration options upfront. We designed the interface to reveal complexity only when needed, surfacing advanced options for admins while keeping the end-user experience clean and focused.',
            },
          ].map(({ title, body }) => (
            <Box key={title} sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 600, fontSize: { xs: '1.125rem', md: '1.25rem' }, mb: 1.5, color: 'text.primary' }}
              >
                {title}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
              >
                {body}
              </Typography>
            </Box>
          ))}
        </ChapterSection>
      </ArticleSection>

      {/* ── 6. The Solution ── */}
      <ArticleSection maxWidth="52rem">
        <ChapterSection id="solution" title="The Solution">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'text.primary',
              mb: 5,
            }}
          >
            Four core capabilities that transformed how enterprises manage content within Salesforce.
          </Typography>

          {[
            {
              title: 'Drag-and-Drop Document Management',
              body: 'Users can upload documents directly within Salesforce records — no switching to OnBase, no separate login. Files are automatically stored in OnBase and linked to the relevant CRM record, making document retrieval instant from within the account, contact, or opportunity view.',
            },
            {
              title: 'Intelligent Field Mapping',
              body: 'The integration automatically maps Salesforce record data to OnBase document keywords. When a document is uploaded against a Salesforce account, the account ID, name, and relevant metadata are passed automatically — eliminating manual indexing and reducing entry errors.',
            },
            {
              title: 'Unified Search',
              body: 'A single search interface within Salesforce surfaces both CRM data and OnBase documents simultaneously. Users can filter by document type, date range, or record association without leaving the Salesforce environment.',
            },
            {
              title: 'Out-of-Box Configuration',
              body: 'Admins can configure the integration through a point-and-click interface — no custom development required. Connection settings, field mappings, document type filters, and user permissions are all managed through a dedicated admin panel built natively in Salesforce.',
            },
          ].map(({ title, body }) => (
            <Box key={title} sx={{ mb: 4, pb: 4, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none', mb: 0, pb: 0 } }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 600, fontSize: { xs: '1.125rem', md: '1.25rem' }, mb: 1.5, color: 'text.primary' }}
              >
                {title}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
              >
                {body}
              </Typography>
            </Box>
          ))}
        </ChapterSection>
      </ArticleSection>

      {/* ── 7. Image ── */}
      <Box sx={{ px: { xs: 3, md: 6 }, maxWidth: '1024px', mx: 'auto' }}>
        <ImagePlaceholder
          caption="Drag-and-drop document management within Salesforce Lightning"
          gradient="linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.10) 100%)"
        />
      </Box>

      {/* ── 8. Technical Integration ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <ChapterSection id="technical" title="Technical Integration">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'text.primary',
              mb: 4,
            }}
          >
            Enterprise-grade architecture designed for security, scalability, and reliability.
          </Typography>

          {/* Integration stack callout */}
          <Box
            sx={{
              borderLeft: `3px solid ${accentColor}`,
              pl: 3,
              py: 2,
              mb: 5,
              bgcolor: 'rgba(167,139,250,0.06)',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: accentColor,
                mb: 1.5,
              }}
            >
              Integration Stack
            </Typography>
            {[
              'Hyland Identity Provider',
              'Hyland API Server',
              'IIS Web Application',
              'OnBase Foundation EP2+',
            ].map((item) => (
              <Box
                key={item}
                component="div"
                sx={{
                  fontSize: '0.9375rem',
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::before': {
                    content: '"·"',
                    color: accentColor,
                    fontWeight: 700,
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Box>

          {/* Sub-sections */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 600, fontSize: { xs: '1.125rem', md: '1.25rem' }, mb: 1.5, color: 'text.primary' }}
            >
              Salesforce Compatibility
            </Typography>
            <Typography
              sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
            >
              The integration is built as a managed package for Salesforce AppExchange, compatible with Salesforce Lightning Experience. It supports both Salesforce Classic and Lightning, ensuring enterprise customers on either platform can adopt without infrastructure changes. API communication between Salesforce and OnBase uses REST with OAuth 2.0 authentication via the Hyland Identity Provider.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 600, fontSize: { xs: '1.125rem', md: '1.25rem' }, mb: 1.5, color: 'text.primary' }}
            >
              Security & Compliance
            </Typography>
            <Typography
              sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
            >
              All document transactions are encrypted in transit and at rest. User permissions are enforced at both the Salesforce and OnBase layers — ensuring that document access respects the organization&rsquo;s existing OnBase security groups. The integration is designed to meet the compliance requirements of Financial Services, Healthcare (HIPAA), and Retail customers.
            </Typography>
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 9. Results by Industry ── */}
      <ArticleSection maxWidth="56rem">
        <ChapterSection id="results" title="Results by Industry">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'text.primary',
              mb: 5,
            }}
          >
            The integration now serves enterprise customers across three key verticals on the Salesforce AppExchange.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 5 }}>
            {[
              {
                industry: 'Financial Services',
                useCases: ['Loan document management', 'Customer onboarding packets', 'Compliance documentation', 'Audit trail retrieval'],
              },
              {
                industry: 'Healthcare',
                useCases: ['Patient records linked to CRM', 'Claims documentation', 'Care coordination files', 'Provider credentialing'],
              },
              {
                industry: 'Retail',
                useCases: ['Vendor documentation', 'Contract management', 'Supplier relationships', 'Purchase order archives'],
              },
            ].map(({ industry, useCases }) => (
              <Grid key={industry} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px',
                    p: 3,
                    height: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: accentColor,
                      mb: 2,
                    }}
                  >
                    {industry}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                    {useCases.map((uc) => (
                      <Box
                        key={uc}
                        component="li"
                        sx={{
                          fontSize: '0.875rem',
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          mb: 0.75,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                          '&::before': {
                            content: '"·"',
                            color: accentColor,
                            fontWeight: 700,
                            flexShrink: 0,
                          },
                        }}
                      >
                        {uc}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            The product launched on the Salesforce AppExchange with a starting price of $20/user/month for enterprises with 25+ users.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 10. What We Learned ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="learnings" title="What We Learned">
          <Box>
            {[
              { num: '01', label: 'Integration UX is product UX', body: 'The experience of connecting two systems is a product in itself. Users don\u2019t distinguish between the integration layer and the applications it connects — they experience a single unified workflow, or they don\u2019t.' },
              { num: '02', label: 'Native feel matters more than feature count', body: 'Enterprise buyers consistently prioritized how the integration felt over the breadth of its feature set. A smaller set of capabilities that matched Salesforce Lightning patterns outperformed feature-rich alternatives that felt foreign.' },
              { num: '03', label: 'Admin experience determines implementation success', body: 'The end-user experience is only as good as the admin experience that configures it. Organizations with clear, intuitive admin tooling deployed faster, made fewer configuration errors, and required less support.' },
              { num: '04', label: 'Cross-industry research reveals universal patterns', body: 'Despite significant differences between Financial Services, Healthcare, and Retail workflows, the core pain points were nearly identical: retrieval latency, manual indexing, and context switching. Universal solutions solve universal problems.' },
            ].map(({ num, label, body }, idx) => (
              <Box
                key={num}
                sx={{
                  mb: idx < 3 ? 4 : 0,
                  pb: idx < 3 ? 4 : 0,
                  borderBottom: idx < 3 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: accentColor,
                      minWidth: '2rem',
                      pt: '3px',
                    }}
                  >
                    {num}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.0625rem' },
                      fontWeight: 600,
                      color: 'text.primary',
                      lineHeight: 1.5,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '0.9375rem', md: '1rem' },
                    lineHeight: 1.75,
                    color: 'text.secondary',
                    pl: '2.5rem',
                  }}
                >
                  {body}
                </Typography>
              </Box>
            ))}
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 11. PullQuote ── */}
      <ArticleSection maxWidth="44rem">
        <PullQuote
          quote="When systems are designed to work together seamlessly, users stop thinking about tools and start focusing on outcomes."
          color={accentColor}
        />
      </ArticleSection>

      {/* ── 12. CTA ── */}
      <ArticleCTA
        headline="Ready to integrate your enterprise systems?"
        sub="Let\u2019s discuss how thoughtful design can bridge complex platforms."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        accentColor="#7c3aed"
        secondaryText="Or start with a message \u2192"
        secondaryHref="/contact"
        gradient="linear-gradient(135deg, #7c3aed, #4f46e5)"
      />

    </Box>
  );
}
