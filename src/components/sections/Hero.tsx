'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Link from 'next/link';
import { colors, typography, spacing, motion } from '@/theme/tokens';
import { useThemeMode } from '@/viewmodels/useThemeMode';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  // Staggered reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-scrub: only scrub the active video, start as soon as it's ready
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = heroRef.current;
    const activeVideo = isDark ? darkVideoRef.current : lightVideoRef.current;
    if (!hero || !activeVideo) return;

    let ready = false;
    let animId: number | null = null;
    let targetTime = 0;
    let currentTime = 0;

    const startScrub = () => {
      ready = true;
      activeVideo.pause();
      // Set initial position
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (heroHeight * 0.6)));
      currentTime = progress * activeVideo.duration;
      targetTime = currentTime;
      activeVideo.currentTime = currentTime;
    };

    const onScroll = () => {
      if (!ready) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (heroHeight * 0.6)));
      targetTime = progress * activeVideo.duration;
    };

    // Smooth lerp loop for buttery scrub
    const tick = () => {
      if (ready && Math.abs(targetTime - currentTime) > 0.01) {
        currentTime += (targetTime - currentTime) * 0.15;
        activeVideo.currentTime = currentTime;
      }
      animId = requestAnimationFrame(tick);
    };

    if (activeVideo.readyState >= 1) {
      startScrub();
    } else {
      activeVideo.addEventListener('loadedmetadata', startScrub, { once: true });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      activeVideo.removeEventListener('loadedmetadata', startScrub);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDark]);

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
        alignItems: 'flex-start',
        pt: { xs: '20vh', md: '18vh' },
        overflow: 'hidden',
        // Dark fallback bg so there's no white flash before video loads
        bgcolor: colors.surface.videoBg,
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
          muted
          playsInline
          preload={isDark ? 'metadata' : 'auto'}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isDark ? 'none' : 'block',
          }}
        />
        {/* Dark mode video */}
        <Box
          component="video"
          ref={darkVideoRef}
          src="/videos/hero-scroll-dark.webm"
          muted
          playsInline
          preload={isDark ? 'auto' : 'metadata'}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isDark ? 'block' : 'none',
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
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
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
              sx={{ mb: 4, maxWidth: 500, mx: 'auto', fontSize: typography.sizes.lg, color: 'rgba(255,255,255,0.85)' }}
            >
              We help teams build systems that work.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', ...revealStyle(200) }}>
            <Button
              component={Link}
              href="/transformation"
              variant="contained"
              size="large"
              sx={{
                textTransform: 'none',
                bgcolor: colors.button.primary.bg,
                color: '#fff',
                '&:hover': { bgcolor: colors.button.primary.hover },
              }}
            >
              <PlayArrowRoundedIcon sx={{ fontSize: 20, mr: 0.5 }} />
              Watch 30sec Intro
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
          bottom: spacing[12],
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
