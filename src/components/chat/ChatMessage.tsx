'use client';

import { Box, Typography } from '@mui/material';
import type { ChatMessage as ChatMessageType } from '@/models/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  accentColor: string;
}

export default function ChatMessage({ message, accentColor }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          maxWidth: '85%',
          px: 2,
          py: 1.25,
          borderRadius: isUser
            ? '18px 18px 4px 18px'
            : '18px 18px 18px 4px',
          bgcolor: isUser
            ? accentColor
            : (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'grey.100',
          color: isUser ? '#fff' : 'text.primary',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.9375rem',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
}
