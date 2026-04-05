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
  { tx:  250, ty: 350, r: -16 },
  { tx: -200, ty: 420, r:  18 },
  { tx:  320, ty: 280, r:  12 },
  { tx: -280, ty: 380, r: -20 },
  { tx:  180, ty: 460, r:  14 },
  { tx: -240, ty: 300, r: -10 },
  { tx:  300, ty: 400, r:  22 },
  { tx: -320, ty: 340, r: -16 },
];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
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

  const onScroll = useCallback(() => {
    const vh = window.innerHeight;

    // Headline: based on section top
    const sectionEl = sectionRef.current;
    if (sectionEl) {
      const sr = sectionEl.getBoundingClientRect();
      const sRaw = 1 - (sr.top - vh * 0.3) / (vh * 0.7);
      setHeadProgress(Math.min(1, Math.max(0, sRaw)));
    }

    // Cards: start when grid top enters viewport, finish when grid bottom is visible
    const gridEl = gridRef.current;
    if (gridEl) {
      const gr = gridEl.getBoundingClientRect();
      // Start: grid top enters viewport bottom
      const start = gr.top - vh;
      // End: grid bottom is fully visible (at or above viewport bottom)
      const end = gr.bottom - vh;
      // When start→end goes from 0 to negative, progress goes 0→1
      const gRaw = start <= 0 ? Math.min(1, -start / (start - end || 1)) : 0;
      setGridProgress(Math.min(1, Math.max(0, gRaw)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const headP = easeOutQuart(Math.min(1, headProgress * 2));
  const subP = easeOutQuart(Math.min(1, Math.max(0, (headProgress - 0.1) * 2)));
  const eased = easeOutQuart(gridProgress);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}
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
            transform: `translateY(${(1 - headP) * 30}px)`,
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
              transform: `translateY(${(1 - subP) * 20}px)`,
            }}
          >
            {subheadline}
          </Typography>
        )}
        <Grid ref={gridRef} container spacing={3}>
          {features.map((f, i) => {
            const s = SCATTER[i % SCATTER.length];
            const staggerStart = 0.1 + i * 0.08;
            const cardRaw = (eased - staggerStart) / (1 - staggerStart);
            const cp = easeOutQuart(Math.min(1, Math.max(0, cardRaw)));

            const x = s.tx * (1 - cp);
            const y = s.ty * (1 - cp);
            const r = s.r * (1 - cp);
            const sc = 0.5 + 0.5 * cp;
            const op = Math.min(1, cp * 1.5);
            const blur = (1 - cp) * 6;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
                <Box
                  sx={{
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
