'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { colors, typography, spacing, motion } from '@/theme/tokens';
import { useThemeMode } from '@/viewmodels/useThemeMode';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const [videosReady, setVideosReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { mode } = useThemeMode();

  // Staggered reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Wait for video metadata to load
  useEffect(() => {
    const light = lightVideoRef.current;
    const dark = darkVideoRef.current;
    if (!light || !dark) return;

    let lightReady = false;
    let darkReady = false;

    const checkReady = () => {
      if (lightReady && darkReady) setVideosReady(true);
    };

    const onLightLoaded = () => { lightReady = true; checkReady(); };
    const onDarkLoaded = () => { darkReady = true; checkReady(); };

    if (light.readyState >= 1) { lightReady = true; } else { light.addEventListener('loadedmetadata', onLightLoaded); }
    if (dark.readyState >= 1) { darkReady = true; } else { dark.addEventListener('loadedmetadata', onDarkLoaded); }
    checkReady();

    return () => {
      light.removeEventListener('loadedmetadata', onLightLoaded);
      dark.removeEventListener('loadedmetadata', onDarkLoaded);
    };
  }, []);

  // Scroll-scrub: frame-by-frame video playback tied to scroll position
  useEffect(() => {
    if (!videosReady) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = heroRef.current;
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;
    if (!hero || !lightVideo || !darkVideo) return;

    lightVideo.pause();
    darkVideo.pause();

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const heroHeight = hero.offsetHeight;
        // Video plays through its full duration over 60% of hero scroll
        const progress = Math.max(0, Math.min(1, -rect.top / (heroHeight * 0.6)));

        lightVideo.currentTime = progress * lightVideo.duration;
        darkVideo.currentTime = progress * darkVideo.duration;

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [videosReady]);

  const revealStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity ${motion.duration.reveal} ${motion.easing.outExpo} ${delay}ms, transform ${motion.duration.reveal} ${motion.easing.outExpo} ${delay}ms`,
  });

  const heroRevealStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
    transition: `opacity ${motion.duration.dramatic} ${motion.easing.outExpo}, transform ${motion.duration.dramatic} ${motion.easing.outExpo}`,
  };

  return (
    <Box
      component="section"
      ref={heroRef}
      sx={{
        position: 'relative',
        minHeight: { xs: 600, md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video background layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Light mode video */}
        <Box
          component="video"
          ref={lightVideoRef}
          src="/videos/hero-scroll.webm"
          poster="/images/hero-watch.png"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: mode === 'dark' ? 'none' : 'block',
          }}
        />
        {/* Dark mode video */}
        <Box
          component="video"
          ref={darkVideoRef}
          src="/videos/hero-scroll-dark.webm"
          poster="/images/hero-watch.png"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: mode === 'dark' ? 'block' : 'none',
          }}
        />
      </Box>

      {/* Semi-transparent overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: 800 }}>
          <Box sx={heroRevealStyle}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.75rem)' },
                fontWeight: typography.weights.normal,
                lineHeight: typography.lineHeights.tight,
                color: '#fff',
                mb: 1,
              }}
            >
              The problem was always there.
            </Typography>
            <Typography
              variant="h1"
              component="span"
              sx={{
                fontSize: { xs: '2rem', md: 'clamp(2rem, 4vw, 2.75rem)' },
                fontWeight: typography.weights.bold,
                lineHeight: typography.lineHeights.tight,
                color: '#fff',
                display: 'block',
                mb: 3,
              }}
            >
              AI just made it visible.
            </Typography>
          </Box>

          <Box sx={revealStyle(100)}>
            <Typography
              variant="body1"
              sx={{ mb: 4, maxWidth: 500, fontSize: typography.sizes.lg, color: 'rgba(255,255,255,0.85)' }}
            >
              We help teams build systems that work.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', ...revealStyle(200) }}>
            <Button
              component={Link}
              href="/transformation"
              variant="contained"
              size="large"
              sx={{
                textTransform: 'none',
                bgcolor: colors.button.primary.bg,
                '&:hover': { bgcolor: colors.button.primary.hover },
              }}
            >
              Explore Transformation
            </Button>
            <Button
              component={Link}
              href="/works"
              variant="outlined"
              size="large"
              sx={{
                textTransform: 'none',
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              See the Work
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: spacing[10],
          left: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: 'rgba(255,255,255,0.6)',
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(-50%)' : 'translateX(-50%) translateY(40px)',
          transition: `opacity ${motion.duration.reveal} ${motion.easing.outExpo} 300ms, transform ${motion.duration.reveal} ${motion.easing.outExpo} 300ms`,
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: typography.letterSpacing.wider }}>
          Scroll
        </Typography>
        {/* Animated scroll line */}
        <Box
          sx={{
            width: 1,
            height: 40,
            background: `linear-gradient(to bottom, ${colors.primary.main}, transparent)`,
            '@keyframes scrollPulse': {
              '0%': { opacity: 1, transform: 'scaleY(0)', transformOrigin: 'top' },
              '50%': { opacity: 1, transform: 'scaleY(1)', transformOrigin: 'top' },
              '51%': { opacity: 1, transform: 'scaleY(1)', transformOrigin: 'bottom' },
              '100%': { opacity: 0, transform: 'scaleY(0)', transformOrigin: 'bottom' },
            },
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </Box>
    </Box>
  );
}
