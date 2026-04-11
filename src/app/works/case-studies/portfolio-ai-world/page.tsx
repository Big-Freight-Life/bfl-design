'use client';

import { Box, Grid, Typography } from '@mui/material';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleSection from '@/components/articles/ArticleSection';
import ArticleCTA from '@/components/articles/ArticleCTA';
import PullQuote from '@/components/articles/PullQuote';
import ChapterSection from '@/components/articles/ChapterSection';

// ── Constants ──────────────────────────────────────────────────────────────

const CYAN = '#0ea5e9';

// ── Shared styles ──────────────────────────────────────────────────────────

const bodyText = {
  fontSize: { xs: '1rem', md: '1.0625rem' },
  lineHeight: 1.75,
  color: 'text.secondary',
  mb: 3,
};

const labelStyle = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  mb: 1.5,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function PortfolioAIWorldPage() {
  return (
    <Box>

      {/* ── Hero ── */}
      <ArticleHero
        gradient="linear-gradient(135deg, #0ea5e9, #0284c7)"
        category="Meta Case Study"
        categoryColor="#38bdf8"
        title="Designing a Portfolio When Anyone Can Build Anything"
        subtitle="How bfl.design went from a portfolio to a distribution system — and what that required giving up."
        date="2026"
      />

      {/* ── Section 1: Opening (no title) ── */}
      <ArticleSection maxWidth="44rem">
        {/* Centered opening */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            The website you&rsquo;re looking at could have been generated in minutes. A dozen AI
            tools can scaffold a portfolio site before your coffee gets cold.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: CYAN,
              fontWeight: 700,
              letterSpacing: '0.01em',
              mb: 4,
            }}
          >
            So why did an Applied AI Architect spend months designing one?
          </Typography>
          <Typography sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, color: 'text.secondary' }}>
            Because the site isn&rsquo;t the product. The system the site runs on is.
          </Typography>
        </Box>

        {/* Left-aligned body copy */}
        <Typography sx={bodyText}>
          Every agency site faces the same trap: you design it for yourself. You organize it around
          your history, your process, your values. You tell your story.
        </Typography>
        <Typography sx={{ ...bodyText, fontWeight: 600, color: 'text.primary' }}>
          Nobody visits an agency site to hear the agency&rsquo;s story.
        </Typography>
        <Typography sx={bodyText}>
          They visit because something in their organization is broken and they&rsquo;re trying to
          figure out if you understand the problem well enough to fix it. They&rsquo;re scanning for
          signal&nbsp;&mdash; does this person get what I&rsquo;m dealing with? Every second spent on
          &ldquo;About Us&rdquo; before addressing &ldquo;Your Problem&rdquo; is a second closer to
          the back button.
        </Typography>
        <Typography sx={bodyText}>
          The WordPress version of this site made that mistake. It was organized around
          projects&nbsp;&mdash; a carousel of work samples, a grid of case studies, a timeline of
          experience. It answered &ldquo;what has this person done?&rdquo; which is the wrong
          question. The right question is &ldquo;does this person understand what I need?&rdquo;
        </Typography>
        <Typography sx={{ ...bodyText, fontWeight: 600, color: 'text.primary', mb: 0 }}>
          That&rsquo;s not a redesign problem. It&rsquo;s a system architecture problem.
        </Typography>
      </ArticleSection>

      {/* ── Section 2: Brief ── */}
      <ArticleSection bg="alt" maxWidth="56rem">
        <ChapterSection id="brief" title="Brief">
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              {
                label: 'Challenge',
                body: 'Build a professional distribution channel for an applied AI architecture practice — not a portfolio that showcases past work, but a system that drives conversations with the right people.',
              },
              {
                label: 'Constraint',
                body: 'The site must demonstrate the same principles we sell: system-level thinking, clear decision architecture, and AI that actually fits. If we can\u2019t do it for ourselves, why would anyone hire us?',
              },
              {
                label: 'Success',
                body: 'A visitor should understand what Applied AI Architecture is, why their system needs it, and feel compelled to start a conversation — in one scroll.',
              },
            ].map(({ label, body }) => (
              <Grid key={label} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px',
                    p: 3,
                    height: '100%',
                  }}
                >
                  <Typography sx={{ ...labelStyle, color: CYAN }}>
                    {label}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}
                  >
                    {body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </ChapterSection>
      </ArticleSection>

      {/* ── Section 3: From Portfolio to Distribution Architecture ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="architecture" title="From Portfolio to Distribution Architecture">
          <Typography sx={bodyText}>
            A portfolio displays work. A distribution system moves people from awareness to action
            through a designed sequence of decisions. The difference isn&rsquo;t cosmetic&nbsp;&mdash;
            it&rsquo;s structural.
          </Typography>
          <Typography sx={bodyText}>
            We applied the StoryBrand framework&nbsp;&mdash; a narrative structure that positions the
            customer as the hero and the business as the guide. But applying a framework is easy. The
            hard part is what it forces you to give up.
          </Typography>

          {/* What we cut */}
          <Typography
            variant="h3"
            sx={{ fontSize: '1.125rem', fontWeight: 600, mb: 3, mt: 5 }}
          >
            What we cut
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ borderLeft: `3px solid ${CYAN}`, pl: 3 }}>
              <Typography sx={bodyText}>
                The original homepage opened with &ldquo;The problem was always there. AI just made
                it visible.&rdquo; It was philosophical, atmospheric, smart. It also put the focus on
                an abstract observation instead of the visitor&rsquo;s specific pain. The new
                headline: &ldquo;Your AI strategy isn&rsquo;t broken. Your system is.&rdquo; Direct.
                About them, not us. The old headline was better writing. The new headline is better
                architecture.
              </Typography>
            </Box>
            <Box sx={{ borderLeft: `3px solid ${CYAN}`, pl: 3 }}>
              <Typography sx={bodyText}>
                The about page had six sections. Each was well-written. Consolidating to five meant
                killing copy I was proud of&nbsp;&mdash; the origin story, the &ldquo;what makes this
                different&rdquo; section. The site got better every time I cut something I liked.
              </Typography>
            </Box>
            <Box sx={{ borderLeft: `3px solid ${CYAN}`, pl: 3 }}>
              <Typography sx={{ ...bodyText, mb: 0 }}>
                The case study carousel title was &ldquo;Not theory. Actual systems.&rdquo; Accurate,
                but self-congratulatory. It became &ldquo;Here&rsquo;s what it looks like.&rdquo; The
                content proves the claim; the title doesn&rsquo;t need to.
              </Typography>
            </Box>
          </Box>

          {/* System decisions */}
          <Typography
            variant="h3"
            sx={{ fontSize: '1.125rem', fontWeight: 600, mb: 3, mt: 5 }}
          >
            System decisions
          </Typography>

          <Typography
            variant="h3"
            sx={{ fontSize: '1.0625rem', fontWeight: 600, mb: 1 }}
          >
            MVVM
          </Typography>
          <Typography sx={bodyText}>
            Models are pure TypeScript. Viewmodels are React hooks. Views are components. When we
            rewrote all the copy across 14 files using StoryBrand, zero viewmodels or models changed.
            The content lived in the view layer where it belongs.
          </Typography>

          <Typography
            variant="h3"
            sx={{ fontSize: '1.0625rem', fontWeight: 600, mb: 1 }}
          >
            Design tokens
          </Typography>
          <Typography sx={bodyText}>
            Every color, spacing value, and typography setting comes from tokens.ts. The site
            supports light and dark modes. When we added the Applied AI Architect page with a
            different accent color, it was a one-line change. Invest in the constraint system early.
            Every shortcut becomes a bug when the system changes.
          </Typography>

          <Typography
            variant="h3"
            sx={{ fontSize: '1.0625rem', fontWeight: 600, mb: 1 }}
          >
            Static generation
          </Typography>
          <Typography sx={{ ...bodyText, mb: 0 }}>
            Every page that can be static is static. This site runs on Vercel&rsquo;s hobby
            plan&nbsp;&mdash; no ops team. Static pages don&rsquo;t fail. They don&rsquo;t have cold
            starts. They don&rsquo;t cost money per request. For a small practice, reliability at
            zero marginal cost is survival architecture.
          </Typography>
        </ChapterSection>
      </ArticleSection>

      {/* ── Section 4: How AI Operates Inside This System ── */}
      <ArticleSection bg="alt" maxWidth="52rem">
        <ChapterSection id="ai-model" title="How AI Operates Inside This System">
          <Typography sx={{ ...bodyText, mb: 5 }}>
            This site was not &ldquo;AI-assisted.&rdquo; It was built through an agentic
            collaboration model where AI operates as a full implementation partner within a designed
            system of constraints and verification.
          </Typography>

          {/* Two panels */}
          <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '12px',
                  p: 3,
                  height: '100%',
                }}
              >
                <Typography sx={{ ...labelStyle, color: 'text.secondary' }}>
                  What AI Holds
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                  {[
                    'Implementation (React, MUI, TypeScript)',
                    'Build verification (compile, catch regressions)',
                    'Deployment pipeline (commit, push, Vercel)',
                    'Parallel execution (multiple pages simultaneously)',
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
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  bgcolor: `${CYAN}12`,
                  border: '1px solid',
                  borderColor: `${CYAN}40`,
                  borderRadius: '12px',
                  p: 3,
                  height: '100%',
                }}
              >
                <Typography sx={{ ...labelStyle, color: CYAN }}>
                  What I Hold
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                  {[
                    'Strategy and positioning (StoryBrand, service definition)',
                    'Architecture decisions (MVVM, component boundaries)',
                    'Design judgment (visual identity, voice, what to cut)',
                    'Quality review (every line ships reviewed)',
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
            </Grid>
          </Grid>

          <Typography sx={{ ...bodyText, mb: 5 }}>
            This isn&rsquo;t delegation by convenience. It&rsquo;s delegation by
            design&nbsp;&mdash; the same way an architect doesn&rsquo;t lay bricks but is
            responsible for every brick being in the right place.
          </Typography>

          {/* Callout: What surprised me */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: '12px',
              p: 3,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                ...labelStyle,
                color: '#14B8A6',
                mb: 2,
              }}
            >
              What surprised me
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}>
              The bottleneck is never the code. It&rsquo;s the spec. A vague spec produces vague
              code that takes three rounds to fix. A precise spec produces working code on the first
              pass. The quality of AI output is a direct function of the quality of the system it
              operates inside&nbsp;&mdash; which is, of course, the thesis of everything we sell.
            </Typography>
          </Box>

          {/* Callout: What failed */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: '12px',
              p: 3,
            }}
          >
            <Typography
              sx={{
                ...labelStyle,
                color: '#f59e0b',
                mb: 2,
              }}
            >
              What failed
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'text.secondary' }}>
              Early in the build, I let an agent make copy decisions. It produced technically
              correct, generically professional text that sounded like every other agency site. AI is
              a fast, reliable implementer. It is not a strategist, a voice, or a taste-maker. The
              moment I tried to use it as one, the output degraded. The lesson: the value of the
              human in the loop isn&rsquo;t &ldquo;checking AI&rsquo;s work.&rdquo; It&rsquo;s
              holding the decisions that AI isn&rsquo;t equipped to make.
            </Typography>
          </Box>
        </ChapterSection>
      </ArticleSection>

      {/* ── Section 5: Outcomes and Observations ── */}
      <ArticleSection maxWidth="44rem">
        <ChapterSection id="outcomes" title="Outcomes and Observations">
          <Typography sx={bodyText}>
            Before: A WordPress theme organized around projects and skills. No narrative arc. No
            positioning. No clear reason to choose this practice over any other.
          </Typography>
          <Typography sx={{ ...bodyText, mb: 4 }}>
            After: A distribution system where every page serves a function in a conversion
            architecture:
          </Typography>

          {/* Result items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {[
              'The homepage moves visitors from problem recognition through thesis to action in one scroll',
              'A dedicated service page defines Applied AI Architecture with enough specificity that visitors self-qualify',
              'Three newsletter articles establish thought leadership — each a standalone argument',
              'Four case study pages prove the work with real projects, real decisions, real outcomes',
              'Every page ends with a CTA calibrated to where the reader is in the journey',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography
                  sx={{
                    color: CYAN,
                    fontWeight: 700,
                    lineHeight: 1.75,
                    flexShrink: 0,
                  }}
                >
                  &mdash;
                </Typography>
                <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'text.secondary' }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography sx={{ fontSize: '1.0625rem', lineHeight: 1.75, fontWeight: 700, color: 'text.primary', mb: 0 }}>
            The site went from answering &ldquo;what has this person done?&rdquo; to answering
            &ldquo;does this person understand what I need?&rdquo; That&rsquo;s not a content change.
            It&rsquo;s an architecture change.
          </Typography>

          {/* Divider */}
          <Box sx={{ height: '1px', bgcolor: 'divider', my: 5 }} />

          {/* Observations */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              {
                n: '01',
                title: 'Your own site is the hardest client engagement.',
                desc: 'You can\u2019t hide behind a brief. Every decision reflects your actual thinking, not your aspirational thinking. If the methodology doesn\u2019t survive contact with your own work, it doesn\u2019t survive.',
              },
              {
                n: '02',
                title: 'Cutting good work is the real design skill.',
                desc: 'The site got better every time I cut something I liked. This is the part of design that AI can\u2019t do: knowing what not to ship.',
              },
              {
                n: '03',
                title: 'The spec is the architecture.',
                desc: 'In agentic development, the quality of the output is determined before a single line of code is written. Writing the spec is the architectural work. The implementation is mechanical.',
              },
              {
                n: '04',
                title: 'One person with a designed system outperforms a team without one.',
                desc: 'This site \u2014 strategy, design, engineering, content, deployment \u2014 was built by one person with an AI collaboration model. Not because one person is better than a team, but because the system eliminated handoff friction.',
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

      {/* ── Section 6: Closing ── */}

      {/* Part A: Centered closing */}
      <ArticleSection bg="alt" maxWidth="44rem">
        <Box sx={{ textAlign: 'center', maxWidth: '44rem', mx: 'auto' }}>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.8, color: 'text.secondary', mb: 3 }}
          >
            This site is itself a case study in the thesis we sell.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.8, color: 'text.secondary', mb: 3 }}
          >
            AI didn&rsquo;t make this site good. The system the AI operated inside made it
            good&nbsp;&mdash; clear specs, verification loops, human judgment at every decision
            point, and an architecture designed for the constraints of a one-person practice.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.8, color: 'text.secondary', mb: 4 }}
          >
            Take the AI away, and the methodology still works. It just takes longer. Put the AI into
            a bad system&nbsp;&mdash; vague specs, no review, no architectural thinking&nbsp;&mdash;
            and it produces confident mediocrity at scale.
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
            The technology isn&rsquo;t the differentiator. The system is. That&rsquo;s true for this
            site, and it&rsquo;s true for yours.
          </Typography>

          {/* Part B: Small centered note */}
          <Typography
            sx={{
              fontSize: '0.9375rem',
              fontStyle: 'italic',
              color: 'text.secondary',
            }}
          >
            This site was designed, built, and shipped by one person with an AI
            collaborator&nbsp;&mdash; because the process is the proof.
          </Typography>
        </Box>
      </ArticleSection>

      {/* Part C: CTA */}
      <ArticleCTA
        headline="This is what Applied AI Architecture looks like."
        sub="One person. Strategy to distribution. If your system needs the same treatment, let's talk."
        buttonText="Talk to an Architect"
        buttonHref="/applied-ai-architect"
        secondaryText="Or start with a message →"
        secondaryHref="/contact"
      />

    </Box>
  );
}
