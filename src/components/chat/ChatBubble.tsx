'use client';

import { useEffect, useState } from 'react';
import { Box, IconButton, Badge, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useChat } from '@/viewmodels/useChat';
import { colors } from '@/theme/tokens';
import ChatPanel from './ChatPanel';

const ACCENT = colors.button.primary.bg;

const PREVIEW_TEXT = "👋 Have a question about Ray's work? Ask me anything.";

export default function ChatBubble() {
  const {
    messages,
    isLoading,
    error,
    isOpen,
    hasUnread,
    showFirstVisitNotice,
    dismissNotice,
    open,
    close,
    send,
    clear,
  } = useChat();

  const handleOpen = () => {
    if (showFirstVisitNotice) dismissNotice();
    open();
  };

  // Hide the bubble when the footer enters the viewport — uses
  // IntersectionObserver against the actual <footer> element so the
  // bubble never overlaps footer content regardless of footer height.
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      {
        // Trigger as soon as ANY part of the footer enters viewport
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Fast-scroll detection — fade bubble while scrolling rapidly so it
  // doesn't visually compete with content flying past. Comes back when
  // the visitor pauses for ~150ms.
  const [isFastScrolling, setIsFastScrolling] = useState(false);
  useEffect(() => {
    const FAST_THRESHOLD = 25; // px per scroll event
    const PAUSE_MS = 150;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastT;
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      lastT = now;

      // Velocity threshold: if we moved more than FAST_THRESHOLD px in <50ms
      if (dt < 50 && dy > FAST_THRESHOLD) {
        setIsFastScrolling(true);
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = setTimeout(() => setIsFastScrolling(false), PAUSE_MS);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, []);

  const isHidden = isFooterVisible;
  const isMuted = isFastScrolling && !isHidden;

  return (
    <>
      {/* Preview bubble — slides out next to the icon on first visit */}
      {showFirstVisitNotice && !isOpen && !isHidden && (
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 84, sm: 100 },
            right: { xs: 16, sm: 24 },
            maxWidth: 280,
            zIndex: 1199,
            display: { xs: 'none', sm: 'block' },
            animation:
              'previewBubbleIn 400ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both',
            '@keyframes previewBubbleIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(8px) scale(0.96)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <Box
            onClick={handleOpen}
            sx={{
              position: 'relative',
              bgcolor: 'background.paper',
              borderRadius: '16px 16px 4px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
              border: 1,
              borderColor: 'divider',
              p: 2,
              pr: 4.5,
              cursor: 'pointer',
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                '&:hover': { transform: 'none' },
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'text.primary',
              }}
            >
              {PREVIEW_TEXT}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dismissNotice();
              }}
              aria-label="Dismiss notification"
              size="small"
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 24,
                height: 24,
                color: 'text.secondary',
              }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Floating bubble button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: 1200,
          display: isOpen ? { xs: 'none', sm: 'block' } : 'block',
          opacity: isHidden ? 0 : isMuted ? 0.35 : 1,
          pointerEvents: isHidden ? 'none' : 'auto',
          transform: isHidden ? 'translateY(20px) scale(0.9)' : 'translateY(0) scale(1)',
          transition:
            'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'opacity 200ms ease',
            transform: 'none',
          },
        }}
      >
        <Badge
          color="error"
          badgeContent={hasUnread ? 1 : 0}
          invisible={!hasUnread}
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.7rem',
              fontWeight: 700,
              minWidth: 20,
              height: 20,
              border: '2px solid',
              borderColor: 'background.default',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            },
          }}
        >
          <IconButton
            onClick={handleOpen}
            aria-label="Open Raybot chat"
            sx={{
              width: 56,
              height: 56,
              bgcolor: ACCENT,
              color: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              transition:
                'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease',
              '&:hover': {
                bgcolor: ACCENT,
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
                filter: 'brightness(1.08)',
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                '&:hover': { transform: 'none' },
              },
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Badge>
      </Box>

      {isOpen && (
        <>
          {/* Backdrop — click outside to close */}
          <Box
            onClick={close}
            aria-hidden
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 1250,
              bgcolor: { xs: 'rgba(0,0,0,0.4)', sm: 'transparent' },
            }}
          />
          <ChatPanel
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={(text) => {
              void send(text);
            }}
            onClose={close}
            onClear={clear}
            accentColor={ACCENT}
          />
        </>
      )}
    </>
  );
}
