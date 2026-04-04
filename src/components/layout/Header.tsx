'use client';

import { useRef, useEffect, useCallback } from 'react';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MegaMenu from '@/components/common/MegaMenu';
import { useNavigation } from '@/viewmodels/useNavigation';
import { layout, colors, darkColors, motion } from '@/theme/tokens';

export default function Header() {
  const {
    primaryNav, secondaryNav, productsPanels, aboutPanels,
    activeMegamenu, activePanelId, setActivePanelId,
    openMegamenu, closeMegamenu, isActive, isParentActive,
  } = useNavigation();

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const scheduleClose = useCallback((delay: number) => {
    closeTimerRef.current = setTimeout(() => {
      closeMegamenu();
    }, delay);
  }, [closeMegamenu]);

  const handleTriggerEnter = useCallback((menu: 'products' | 'about') => {
    clearTimers();
    if (activeMegamenu && activeMegamenu !== menu) {
      // Switching between menus — open immediately
      openMegamenu(menu);
    } else if (!activeMegamenu) {
      // Opening fresh — short hover-intent delay
      openTimerRef.current = setTimeout(() => {
        openMegamenu(menu);
      }, 100);
    }
  }, [activeMegamenu, clearTimers, openMegamenu]);

  const handleTriggerLeave = useCallback(() => {
    clearTimers();
    scheduleClose(300);
  }, [clearTimers, scheduleClose]);

  const handleMenuEnter = useCallback(() => {
    clearTimers();
  }, [clearTimers]);

  const handleMenuLeave = useCallback(() => {
    clearTimers();
    scheduleClose(200);
  }, [clearTimers, scheduleClose]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMegamenu) {
        closeMegamenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeMegamenu, closeMegamenu]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar
        sx={{
          maxWidth: layout.containerMaxWidth,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3, lg: 4 },
          minHeight: { xs: 64, md: 72 },
        }}
      >
        {/* Logo + Brand */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'text.primary',
            mr: { md: 6, lg: 8 },
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/logo-teal.png"
            alt="Big Freight Life"
            width={24}
            height={24}
            style={{ display: 'block' }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap',
            }}
          >
            Big Freight Life
          </Typography>
        </Box>

        {/* Primary Nav */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, flex: 1 }}>
          {primaryNav.map((item) => {
            const active = item.megamenu ? isParentActive(item.megamenu) : isActive(item.href);
            const isOpen = activeMegamenu === item.megamenu;
            return (
            <Button
              key={item.label}
              component={item.megamenu ? 'button' : Link}
              href={item.megamenu ? undefined : item.href}
              onClick={item.megamenu ? () => {
                isOpen ? closeMegamenu() : openMegamenu(item.megamenu!);
              } : closeMegamenu}
              onMouseEnter={item.megamenu ? () => handleTriggerEnter(item.megamenu!) : undefined}
              onMouseLeave={item.megamenu ? handleTriggerLeave : undefined}
              sx={{
                color: 'text.primary',
                fontWeight: active || isOpen ? 600 : 500,
                textTransform: 'none',
                fontSize: '0.875rem',
                px: 2,
                py: 1.5,
                borderRadius: 0,
                position: 'relative',
                '&::after': (active || isOpen) ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '15%',
                  right: '15%',
                  height: 3,
                  bgcolor: colors.button.primary.bg,
                  borderRadius: '3px 3px 0 0',
                } : {},
                '&:hover': {
                  bgcolor: 'transparent',
                  ...(!active && !isOpen ? {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '15%',
                      right: '15%',
                      height: 3,
                      bgcolor: colors.gray[300],
                      borderRadius: '3px 3px 0 0',
                    },
                  } : {}),
                },
              }}
              endIcon={item.megamenu ? (
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: '1.2rem !important',
                    transition: `transform ${motion.duration.smooth} ${motion.easing.outExpo}`,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              ) : undefined}
            >
              {item.label}
            </Button>
            );
          })}
        </Box>

        {/* Right side buttons */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1.5, alignItems: 'center' }}>
          <Button
            component="a"
            href="https://bfl-raybot.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            endIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={(theme) => ({
              textTransform: 'none',
              color: theme.palette.mode === 'dark' ? darkColors.button.secondary.text : colors.button.primary.bg,
              fontSize: '0.8125rem',
              fontWeight: 500,
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(26,154,166,0.08)' : 'rgba(17,118,128,0.06)',
              },
            })}
          >
            Try Raybot
          </Button>
          {secondaryNav.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.href}
              variant="outlined"
              size="small"
              sx={(theme) => ({
                textTransform: 'none',
                borderColor: theme.palette.mode === 'dark' ? darkColors.button.secondary.text : colors.button.primary.bg,
                color: theme.palette.mode === 'dark' ? darkColors.button.secondary.text : colors.button.primary.bg,
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark' ? darkColors.button.primary.hover : colors.button.primary.hover,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(26,154,166,0.08)' : 'rgba(17,118,128,0.06)',
                },
              })}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
      {activeMegamenu === 'products' && (
        <MegaMenu title="Products" panels={productsPanels} activePanelId={activePanelId} onPanelHover={setActivePanelId} onClose={closeMegamenu} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} />
      )}
      {activeMegamenu === 'about' && (
        <MegaMenu title="About" panels={aboutPanels} activePanelId={activePanelId} onPanelHover={setActivePanelId} onClose={closeMegamenu} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} />
      )}
    </AppBar>
  );
}
