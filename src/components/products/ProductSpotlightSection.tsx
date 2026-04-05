'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';

export interface SpotlightItem {
  title: string;
  headline: string;
  desc: string;
  bg: string;
  /** If true, renders white text and light-on-dark palette */
  dark?: boolean;
  /** Path to device screenshot image */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
}

interface ProductSpotlightSectionProps {
  spotlights: SpotlightItem[];
  accentColor: string;
}

/**
 * Apple-style stacked card spotlights. Each card is position:sticky so it
 * pins in place while the next card scrolls up and overlaps it. Earlier cards
 * scale down slightly and dim to create depth.
 */
export default function ProductSpotlightSection({
  spotlights,
  accentColor,
}: ProductSpotlightSectionProps) {
  const CARD_TOP_BASE = 64; // px — first card sticks at this offset
  const CARD_TOP_STEP = 16; // px — each subsequent card sticks a bit lower
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState<number[]>(() =>
    spotlights.map(() => 0),
  );

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const onScroll = () => {
      const next = els.map((el, i) => {
        const rect = el.getBoundingClientRect();
        const stickyTop = CARD_TOP_BASE + i * CARD_TOP_STEP;
        // How far past its sticky point has the card been scrolled?
        // 0 = just arrived, 1 = fully covered by the next card
        const cardH = rect.height;
        const scrolledPast = stickyTop - rect.top;
        return Math.min(1, Math.max(0, scrolledPast / cardH));
      });
      setProgress(next);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [spotlights.length]);

  return (
    <Box
      sx={{
        // Extra bottom padding so the last card has room to fully display
        pb: { xs: 2, md: 4 },
      }}
    >
      {spotlights.map((s, i) => {
        const stickyTop = CARD_TOP_BASE + i * CARD_TOP_STEP;
        const p = progress[i] ?? 0;
        // Earlier cards scale down and dim as they get covered
        const scale = 1 - p * 0.05;
        const brightness = 1 - p * 0.3;

        return (
          <Box
            key={s.title}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[i] = el;
            }}
            component="section"
            sx={{
              position: 'sticky',
              top: stickyTop,
              zIndex: i + 1,
              // Rounded card aesthetic
              mx: { xs: 1, sm: 2, md: 4 },
              mb: { xs: 2, md: 3 },
              borderRadius: { xs: '1.25rem', md: '1.75rem' },
              overflow: 'hidden',
              boxShadow: `0 8px 32px rgba(0,0,0,${0.08 + i * 0.04})`,
              transform: `scale(${scale})`,
              filter: `brightness(${brightness})`,
              transition: 'transform 0.1s linear, filter 0.1s linear',
              willChange: 'transform, filter',
              bgcolor: s.bg,
              color: s.dark ? '#fff' : 'inherit',
            }}
          >
            <Box sx={{ py: { xs: 6, md: 10 } }}>
              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={6}
                  alignItems="center"
                  direction={i % 2 === 0 ? 'row' : 'row-reverse'}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: s.dark
                          ? 'rgba(255,255,255,0.6)'
                          : accentColor,
                        letterSpacing: '0.1em',
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      {s.title}
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight={700}
                      sx={{
                        color: s.dark ? '#fff' : 'text.primary',
                        fontSize: { xs: '1.75rem', md: '2.25rem' },
                        mb: 2,
                      }}
                    >
                      {s.headline}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: s.dark
                          ? 'rgba(255,255,255,0.75)'
                          : 'text.secondary',
                        lineHeight: 1.7,
                        fontSize: '1.05rem',
                      }}
                    >
                      {s.desc}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.imageAlt || `${s.title} screenshot`}
                          width={340}
                          height={695}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: 500,
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            bgcolor: s.dark
                              ? 'rgba(255,255,255,0.08)'
                              : 'grey.100',
                            borderRadius: '1.5rem',
                            height: 320,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            color={
                              s.dark
                                ? 'rgba(255,255,255,0.3)'
                                : 'text.disabled'
                            }
                          >
                            App screenshot
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
