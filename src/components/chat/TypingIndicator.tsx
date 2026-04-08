'use client';

import { Box } from '@mui/material';

interface TypingIndicatorProps {
  /** Color of the dots. Defaults to a muted text color. */
  color?: string;
}

/**
 * Three-dot typing indicator rendered inside a bot-style message bubble.
 * Matches the visual shape of an assistant ChatMessage so the hand-off
 * from "bot is thinking" to "bot replied" feels like the same UI
 * element just getting its content filled in.
 */
export default function TypingIndicator({ color }: TypingIndicatorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 1.5,
        animation: 'typingBubbleIn 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        '@keyframes typingBubbleIn': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: '18px 18px 18px 4px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'grey.100',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          '@keyframes dotPulse': {
            '0%, 80%, 100%': {
              opacity: 0.3,
              transform: 'translateY(0)',
            },
            '40%': {
              opacity: 1,
              transform: 'translateY(-3px)',
            },
          },
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: color ?? 'text.secondary',
              animation: 'dotPulse 1.2s infinite ease-in-out',
              animationDelay: `${i * 160}ms`,
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
                opacity: 0.6,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
