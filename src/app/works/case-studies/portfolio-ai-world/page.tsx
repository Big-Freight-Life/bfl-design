'use client';

import { Box, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import ChapterSection from '@/components/articles/ChapterSection';

// ── Constants ──────────────────────────────────────────────────────────────

const CYAN = '#0ea5e9';

// ── Page ───────────────────────────────────────────────────────────────────

export default function PortfolioAIWorldPage() {
  return (
    <Box>

      {/* ── 1. Hero ── */}
      <ArticleHero
        gradient="linear-gradient(135deg, #0ea5e9, #0284c7)"
        category="Case Study"
        categoryColor="#38bdf8"
        title="Designing a Portfolio When Anyone Can Build Anything"
        subtitle="In a world where generative AI can produce websites in seconds, how do you make a portfolio that actually means something?"
        date="2025"
      />

      {/* ── 2. The Paradox ── */}
      <ArticleSection maxWidth="44rem">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              lineHeight: 1,
              color: CYAN,
              fontWeight: 700,
              mb: 2,
              fontFamily: 'Georgia, serif',
            }}
          >
            &ldquo;
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.375rem', md: '1.75rem' },
              fontWeight: 600,
              lineHeight: 1.5,
              color: 'text.primary',
              mb: 4,
            }}
          >
            The website you&rsquo;re looking at could have been generated in minutes. A dozen AI tools
            can scaffold a portfolio site before your coffee gets cold.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: CYAN,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            So why spend time designing one?
          </Typography>
        </Box>
      </ArticleSection>

      {/* ── 3. The Brief ── */}
      <ArticleSection bg="alt" maxWidth="56rem">
        <ChapterSection id="brief" title="The Brief">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gap: 2,
              mt: 4,
            }}
          >
            {[
              {
                label: 'Challenge',
                body: 'Create a portfolio for a design and strategy practice in 2025, when the very act of \u201cbuilding\u201d has been commoditized.',
              },
              {
                label: 'Constraint',
                body: 'The portfolio must demonstrate value that AI cannot replicate \u2014 not through complexity, but through clarity of thought.',
              },
              {
                label: 'Success',
                body: 'Someone viewing this site should understand not just what I do, but how I think.',
              },
            ].map(({ label, body }) => (
              <Box
                key={label}
                sx={{
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
                    color: CYAN,
                    mb: 1.5,
                  }}
                >
                  {label}
                </Typography>
                <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}>
                  {body}
                </Typography>
              </Box>
            ))}
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 4. The Problem with Portfolios Now ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="problem" title="The Problem with Portfolios Now">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            Traditional portfolios operate on a simple premise: show what you&rsquo;ve made, prove you can
            make things.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            This worked when making things was hard. But we&rsquo;re past that now.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 4 }}
          >
            The designer who can &ldquo;make a website&rdquo; competes with every person who can type a prompt.
            The strategist who can &ldquo;create a brand&rdquo; competes with tools that generate hundreds of
            options instantly.
          </Typography>
          <PullQuote
            quote="Production skill has become table stakes — necessary but insufficient. The new differentiator isn't what you can make. It's what you choose to make and why."
            color={CYAN}
          />
        </ChapterSection>
      </ArticleSection>

      {/* ── 5. Strategy: Demonstrate Judgment ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <ChapterSection id="strategy" title="Strategy: Demonstrate Judgment">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 3 }}
          >
            I approached this portfolio with a counter-intuitive strategy: be less impressive.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}
          >
            Most portfolios try to overwhelm &mdash; more projects, more animations, more proof. But in
            an AI world, volume is suspicious. Anyone can generate volume.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              {
                n: '01',
                title: 'Constraints over capabilities',
                desc: 'Showing what I chose not to do matters as much as what I did',
              },
              {
                n: '02',
                title: 'Process over polish',
                desc: 'The thinking behind decisions, documented in real-time',
              },
              {
                n: '03',
                title: 'Clarity over complexity',
                desc: 'Simple solutions to real problems, not complex solutions to manufactured ones',
              },
              {
                n: '04',
                title: 'Intention over execution',
                desc: 'Every element exists for a reason I can articulate',
              },
            ].map(({ n, title, desc }) => (
              <Box
                key={n}
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'flex-start',
                  pb: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none', pb: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: CYAN,
                    minWidth: '2rem',
                    pt: '2px',
                  }}
                >
                  {n}
                </Typography>
                <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {title}
                  </Box>
                  {' \u2014 '}
                  <Box component="span" sx={{ color: 'text.secondary' }}>
                    {desc}
                  </Box>
                </Typography>
              </Box>
            ))}
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 6. The Design System ── */}
      <ArticleSection maxWidth="52rem">
        <ChapterSection id="design-system" title="The Design System">
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Intentional Minimalism
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}
          >
            The visual design follows a principle I call earned simplicity &mdash; minimalism that comes
            from removing everything unnecessary, not from lacking ideas.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            {[
              {
                label: 'Typography',
                desc: 'One typeface (Poppins), used at carefully chosen scales. Not because I couldn\u2019t use more, but because more would be noise.',
              },
              {
                label: 'Color',
                desc: 'A restrained palette with a single accent color. The constraint forces hierarchy through layout and typography rather than visual decoration.',
              },
              {
                label: 'Space',
                desc: 'Generous whitespace isn\u2019t empty \u2014 it\u2019s the most intentional element on the page. It says: I don\u2019t need to fill every pixel to prove my worth.',
              },
              {
                label: 'Components',
                desc: 'A small set of patterns used consistently. The system is simple enough to hold in your head, complex enough to be flexible.',
              },
            ].map(({ label, desc }) => (
              <Box
                key={label}
                sx={{
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
                    color: CYAN,
                    mb: 1.5,
                  }}
                >
                  {label}
                </Typography>
                <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}>
                  {desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 7. The AI Collaboration Model ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <ChapterSection id="ai-collaboration" title="The AI Collaboration Model">
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary', mb: 5 }}
          >
            I used AI extensively to build this site. But how I used it matters.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mb: 5,
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(0,0,0,0.06)',
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
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                AI Handled
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                {[
                  'Code generation',
                  'CSS implementation',
                  'Repetitive template creation',
                  'Documentation drafting',
                ].map((item) => (
                  <Box
                    key={item}
                    component="li"
                    sx={{
                      fontSize: '0.9375rem',
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      mb: 0.75,
                      '&::before': {
                        content: '"·"',
                        mr: 1,
                        color: 'text.disabled',
                        fontWeight: 700,
                      },
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                bgcolor: `${CYAN}12`,
                border: '1px solid',
                borderColor: `${CYAN}40`,
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
                  color: CYAN,
                  mb: 2,
                }}
              >
                I Handled
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                {[
                  'Strategic direction',
                  'Design decisions',
                  'Quality judgment',
                  'Constraint definition',
                ].map((item) => (
                  <Box
                    key={item}
                    component="li"
                    sx={{
                      fontSize: '0.9375rem',
                      color: 'text.primary',
                      lineHeight: 1.6,
                      mb: 0.75,
                      '&::before': {
                        content: '"·"',
                        mr: 1,
                        color: CYAN,
                        fontWeight: 700,
                      },
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.75, color: 'text.secondary' }}
          >
            The collaboration model treated AI as a production partner, not a creative one. I made the
            decisions; AI made them real.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── 8. What I Learned ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="learnings" title="What I Learned">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
            {[
              {
                n: '01',
                title: 'Constraints are content',
                desc: 'The choices you don\u2019t make communicate as much as the ones you do.',
              },
              {
                n: '02',
                title: 'Process is the new portfolio',
                desc: 'Showing finished work is necessary but not sufficient. Documenting how you think \u2014 that\u2019s the differentiator.',
              },
              {
                n: '03',
                title: 'Speed changes the question',
                desc: 'When production is instant, the valuable skill shifts from \u201chow do I make this?\u201d to \u201cshould I make this at all?\u201d',
              },
              {
                n: '04',
                title: 'Transparency is trust',
                desc: 'In a world where AI-generation is suspected everywhere, honesty about the collaboration builds more trust than denial.',
              },
            ].map(({ n, title, desc }) => (
              <Box
                key={n}
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'flex-start',
                  pb: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none', pb: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: CYAN,
                    minWidth: '2rem',
                    pt: '2px',
                  }}
                >
                  {n}
                </Typography>
                <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'text.primary' }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {title}
                  </Box>
                  {' \u2014 '}
                  <Box component="span" sx={{ color: 'text.secondary' }}>
                    {desc}
                  </Box>
                </Typography>
              </Box>
            ))}
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── 9. The Meta-Lesson ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.8, color: 'text.secondary', mb: 4 }}
          >
            This portfolio is itself a case study in navigating the AI transition. The temptation is to
            compete with AI on its terms &mdash; more, faster, cheaper. But that&rsquo;s a losing game.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              fontWeight: 700,
              lineHeight: 1.6,
              color: 'text.primary',
              mb: 4,
            }}
          >
            The opportunity is to compete on different terms entirely: judgment, strategy, taste, context,
            relationship.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.8, color: 'text.secondary', mb: 4 }}
          >
            The website you&rsquo;re viewing isn&rsquo;t impressive because of what it is. It&rsquo;s
            useful because of what it tells you about how I work.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              fontWeight: 700,
              color: CYAN,
            }}
          >
            That&rsquo;s the portfolio that matters in 2026.
          </Typography>
        </Box>
      </ArticleSection>

      {/* ── 10. Principles for Designing in the AI Era ── */}
      <ArticleSection maxWidth="44rem">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: 5 }}
        >
          Principles for Designing in the AI Era
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
            {
              n: 1,
              title: 'Start with the question, not the output',
              desc: 'What does this need to communicate?',
            },
            {
              n: 2,
              title: 'Document your decisions',
              desc: 'The why matters more than the what',
            },
            {
              n: 3,
              title: 'Embrace constraints publicly',
              desc: 'Show what you chose not to do',
            },
            {
              n: 4,
              title: 'Be transparent about AI use',
              desc: 'Honesty builds trust',
            },
            {
              n: 5,
              title: 'Focus on judgment, not production',
              desc: 'Anyone can make things now',
            },
            {
              n: 6,
              title: 'Build for clarity, not impression',
              desc: 'In a world of noise, clarity is remarkable',
            },
          ].map(({ n, title, desc }, idx, arr) => (
            <Box
              key={n}
              sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
                pb: 3,
                borderBottom: idx < arr.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: CYAN,
                  minWidth: '1.75rem',
                  pt: '1px',
                }}
              >
                {n}.
              </Typography>
              <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'text.primary' }}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {title}
                </Box>
                {' \u2014 '}
                <Box component="span" sx={{ color: 'text.secondary' }}>
                  {desc}
                </Box>
              </Typography>
            </Box>
          ))}
        </Box>
      </ArticleSection>

      {/* ── 11. Footer Note ── */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'text.disabled',
            fontStyle: 'italic',
            lineHeight: 1.7,
          }}
        >
          This portfolio was designed by a human, built with AI assistance, and documented because the
          process matters as much as the result.
        </Typography>
      </ArticleSection>

      {/* ── 12. CTA ── */}
      <ArticleCTA
        headline="Ready to start your project?"
        sub="Let's discuss how thoughtful design can solve your challenges."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        accentColor={CYAN}
        secondaryText="Or start with a message \u2192"
        secondaryHref="/contact"
      />

    </Box>
  );
}
