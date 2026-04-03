'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { typography } from '@/theme/tokens';

const tagline = 'DRIVE THE SYSTEM BEHIND THE WORK.';

export default function BrandWordmark() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    let i = 0;
    let typing = true;

    const type = () => {
      if (i <= tagline.length) {
        setDisplayText(tagline.slice(0, i));
        i++;
        setTimeout(type, 60);
      } else {
        // Pause, then restart
        setTimeout(() => {
          i = 0;
          setDisplayText('');
          setTimeout(type, 500);
        }, 3000);
      }
    };

    setTimeout(type, 1000);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      typing = false;
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <Box
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
            opacity: showCursor ? 1 : 0,
            ml: '1px',
            color: 'text.secondary',
          }}
        >
          |
        </Box>
      </Typography>
    </Box>
  );
}
