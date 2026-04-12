'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { typography } from '@/theme/tokens';

const tagline = 'BUILT FOR HOW WORK ACTUALLY MOVES.';

export default function BrandWordmark() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Observe when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  // Typing animation — plays once when in view
  useEffect(() => {
    if (!isInView || hasPlayed) return;

    let i = 0;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      if (cancelled) return;
      if (i <= tagline.length) {
        setDisplayText(tagline.slice(0, i));
        i++;
        timeoutId = setTimeout(type, 60);
      } else {
        setHasPlayed(true);
      }
    };

    timeoutId = setTimeout(type, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isInView, hasPlayed]);

  // Blinking cursor — continuous loop
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 'clamp(2.5rem, 10vw, 7rem)', md: 'clamp(4rem, 8vw, 8rem)' },
          fontWeight: typography.weights.bold,
          letterSpacing: typography.letterSpacing.tight,
          lineHeight: 1,
          color: 'text.primary',
          mb: 3,
          px: 2,
        }}
      >
        BIG FREIGHT LIFE
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: typography.sizes.sm, md: typography.sizes.base },
          letterSpacing: typography.letterSpacing.widest,
          color: 'text.secondary',
          fontWeight: typography.weights.medium,
          minHeight: '1.5em',
        }}
      >
        {displayText}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '2px',
            height: '1.1em',
            bgcolor: 'text.secondary',
            opacity: showCursor ? 1 : 0,
            ml: '2px',
            verticalAlign: 'text-bottom',
            transition: 'opacity 0.1s',
          }}
        />
      </Typography>
    </Box>
  );
}
