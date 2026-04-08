'use client';

import { useEffect, useRef, useState, KeyboardEvent, FormEvent } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MAX_MESSAGE_LENGTH } from '@/models/chat';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  accentColor: string;
}

export default function ChatInput({ onSend, disabled, accentColor }: ChatInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const wasDisabled = useRef(disabled);

  // Restore focus to the input when the bot finishes replying. Disabling a
  // focused element drops focus, so without this the visitor has to click
  // the field again to send another message.
  useEffect(() => {
    if (wasDisabled.current && !disabled) {
      inputRef.current?.focus();
    }
    wasDisabled.current = disabled;
  }, [disabled]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Cmd/Ctrl+Enter or plain Enter (without Shift) sends
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isOverLimit = value.length > MAX_MESSAGE_LENGTH;
  const canSend = value.trim().length > 0 && !disabled && !isOverLimit;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        p: 1.5,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? 'Thinking...' : 'Type your message...'}
        disabled={disabled}
        multiline
        maxRows={4}
        fullWidth
        variant="outlined"
        size="small"
        error={isOverLimit}
        autoFocus
        helperText={
          isOverLimit
            ? `${value.length} / ${MAX_MESSAGE_LENGTH}`
            : undefined
        }
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: '0.9375rem',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'grey.50',
          },
        }}
        slotProps={{
          input: {
            'aria-label': 'Type your message',
          },
        }}
      />
      <IconButton
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        sx={{
          bgcolor: accentColor,
          color: '#fff',
          width: 40,
          height: 40,
          borderRadius: '12px',
          flexShrink: 0,
          '&:hover': { bgcolor: accentColor, filter: 'brightness(1.1)' },
          '&:disabled': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'grey.300',
            color: 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <SendIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}
