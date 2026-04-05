'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FeatureCard from '@/components/products/FeatureCard';
import type { FeatureItem } from '@/components/products/ProductFeatureGrid';

interface ProductFeatureGridAnimatedProps {
  features: FeatureItem[];
  accentColor: string;
  headline?: string;
  subheadline?: string;
}

/** Each card flies in from a unique direction with rotation */
const SCATTER = [
  { tx:  500, ty: 600, r: -22 },
  { tx: -420, ty: 700, r:  24 },
  { tx:  600, ty: 500, r:  18 },
  { tx: -550, ty: 650, r: -26 },
  { tx:  380, ty: 750, r:  20 },
  { tx: -480, ty: 550, r: -16 },
  { tx:  560, ty: 680, r:  28 },
  { tx: -600, ty: 580, r: -22 },
];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/** Respect prefers-reduced-motion */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function ProductFeatureGridAnimated({
  features,
  accentColor,
  headline = 'Everything You Need',
  subheadline,
}: ProductFeatureGridAnimatedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headProgress, setHeadProgress] = useState(0);
  const [gridProgress, setGridProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const onScroll = useCallback(() => {
    const vh = window.innerHeight;

    // Headline: based on section top
    const sectionEl = sectionRef.current;
    if (sectionEl) {
      const sr = sectionEl.getBoundingClientRect();
      // Start when section top hits 80% from top (20% scrolled in), complete at 20% from top
      const sRaw = 1 - (sr.top - vh * 0.2) / (vh * 0.6);
      setHeadProgress(Math.min(1, Math.max(0, sRaw)));
    }

    // Cards: longer scroll distance for slower, more deliberate animation
    const gridEl = gridRef.current;
    if (gridEl) {
      const gr = gridEl.getBoundingClientRect();
      // Start when grid top hits 95% from top (just enters viewport)
      const startAt = vh * 0.95;
      // End when grid top is above viewport — animation spans ~120% vh
      // so it plays out over a long, comfortable scroll
      const endAt = vh * -0.25;
      const gRaw = 1 - (gr.top - endAt) / (startAt - endAt);
      setGridProgress(Math.min(1, Math.max(0, gRaw)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // If reduced motion, skip all animation — show everything immediately
  if (reducedMotion) {
    return (
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            {headline}
          </Typography>
          {subheadline && (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
              {subheadline}
            </Typography>
          )}
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title} sx={{ display: 'flex' }}>
                <FeatureCard
                  title={f.title}
                  desc={f.desc}
                  tier={f.tier}
                  icon={f.icon}
                  accentColor={accentColor}
                  comingSoon={f.comingSoon}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  const headP = easeOutQuart(Math.min(1, headProgress));
  const subP = easeOutQuart(Math.min(1, Math.max(0, (headProgress - 0.2) / 0.8)));
  const eased = easeOutQuart(gridProgress);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50', overflow: 'clip' }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            opacity: headP,
            transform: `translateY(${(1 - headP) * 60}px)`,
          }}
        >
          {headline}
        </Typography>
        {subheadline && (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{
              mb: 6,
              opacity: subP,
              transform: `translateY(${(1 - subP) * 40}px)`,
            }}
          >
            {subheadline}
          </Typography>
        )}
        <Grid ref={gridRef} container spacing={3}>
          {features.map((f, i) => {
            const s = SCATTER[i % SCATTER.length];
            // Heavier stagger — 12% per card for more sequential arrivals
            const staggerStart = 0.05 + i * 0.12;
            const cardRaw = (eased - staggerStart) / (1 - staggerStart);
            const cp = easeOutQuart(Math.min(1, Math.max(0, cardRaw)));

            const x = s.tx * (1 - cp);
            const y = s.ty * (1 - cp);
            const r = s.r * (1 - cp);
            const sc = 0.5 + 0.5 * cp;
            const op = Math.min(1, cp * 1.5);
            const blur = (1 - cp) * 6;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '100%',
                    transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${sc})`,
                    opacity: op,
                    filter: `blur(${blur}px)`,
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <FeatureCard
                    title={f.title}
                    desc={f.desc}
                    tier={f.tier}
                    icon={f.icon}
                    accentColor={accentColor}
                    comingSoon={f.comingSoon}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
