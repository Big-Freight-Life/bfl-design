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
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const startAt = vh * 0.8;
    const endAt = vh * 0.1;
    const raw = 1 - (rect.top - endAt) / (startAt - endAt);
    setProgress(Math.min(1, Math.max(0, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const eased = easeOutQuart(progress);

  // Headline
  const headP = easeOutQuart(Math.min(1, progress * 3));
  const subP = easeOutQuart(Math.min(1, Math.max(0, (progress - 0.05) * 3)));

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
        <Grid container spacing={3}>
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
