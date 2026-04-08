'use client';

import { useEffect, useRef } from 'react';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import type { ChatMessage as ChatMessageType } from '@/models/chat';

interface ChatPanelProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSend: (text: string) => void;
  onClose: () => void;
  onClear: () => void;
  accentColor: string;
}

export default function ChatPanel({
  messages,
  isLoading,
  error,
  onSend,
  onClose,
  onClear,
  accentColor,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or loading state changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Esc closes panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <Box
      role="dialog"
      aria-label="Chat with Raybot"
      sx={{
        position: 'fixed',
        bottom: { xs: 0, sm: 96 },
        right: { xs: 0, sm: 24 },
        width: { xs: '100%', sm: 380 },
        height: { xs: '100dvh', sm: 560 },
        maxHeight: { xs: '100dvh', sm: 'calc(100vh - 120px)' },
        bgcolor: 'background.paper',
        borderRadius: { xs: 0, sm: '20px' },
        boxShadow: '0 16px 60px rgba(0,0,0,0.25)',
        border: { xs: 0, sm: 1 },
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1300,
        overflow: 'hidden',
        animation: 'chatPanelIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        '@keyframes chatPanelIn': {
          '0%': { opacity: 0, transform: 'translateY(20px) scale(0.96)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            Raybot
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Ask about the work
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            onClick={onClear}
            aria-label="Reset conversation"
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <RestartAltIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            onClick={onClose}
            aria-label="Close chat"
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'background.default' : '#fafafa',
        }}
      >
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            message={m}
            accentColor={accentColor}
            onNavigate={onClose}
          />
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <CircularProgress size={14} sx={{ color: accentColor }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Thinking...
            </Typography>
          </Box>
        )}
        {error && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(244,67,54,0.12)'
                  : 'rgba(244,67,54,0.08)',
              border: '1px solid',
              borderColor: 'error.light',
            }}
          >
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          </Box>
        )}
      </Box>

      <ChatInput onSend={onSend} disabled={isLoading} accentColor={accentColor} />
    </Box>
  );
}
