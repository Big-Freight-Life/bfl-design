'use client';

import { Box, IconButton, Badge } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useChat } from '@/viewmodels/useChat';
import { colors } from '@/theme/tokens';
import ChatPanel from './ChatPanel';

const ACCENT = colors.button.primary.bg;

export default function ChatBubble() {
  const {
    messages,
    isLoading,
    error,
    isOpen,
    hasUnread,
    open,
    close,
    send,
    clear,
  } = useChat();

  return (
    <>
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
        <Badge
          color="error"
          variant="dot"
          invisible={!hasUnread}
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <IconButton
            onClick={open}
            aria-label="Open chat with BFL assistant"
            sx={{
              width: 56,
              height: 56,
              bgcolor: ACCENT,
              color: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease',
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
      )}
    </>
  );
}
