'use client';

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

  return (
    <>
      {/* Preview bubble — slides out next to the icon on first visit */}
      {showFirstVisitNotice && !isOpen && (
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
        }}
      >
        {/* Pulse rings — only show when notification active and reduced motion is off */}
        {showFirstVisitNotice && (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              pointerEvents: 'none',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `2px solid ${ACCENT}`,
                opacity: 0,
                animation: 'chatPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
              },
              '&::after': {
                animationDelay: '1.2s',
              },
              '@keyframes chatPulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 0.6,
                },
                '100%': {
                  transform: 'scale(1.8)',
                  opacity: 0,
                },
              },
              '@media (prefers-reduced-motion: reduce)': {
                display: 'none',
              },
            }}
          />
        )}

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
