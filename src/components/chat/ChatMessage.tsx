'use client';

import { Fragment, type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import type { ChatMessage as ChatMessageType } from '@/models/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  accentColor: string;
  onNavigate?: () => void;
}

// Match internal paths like /contact or /works/case-studies. Stops at
// whitespace or punctuation that isn't part of a URL path so a trailing
// period or comma in the sentence doesn't get swallowed into the href.
const PATH_REGEX = /\/[a-z][a-z0-9-]*(?:\/[a-z][a-z0-9-]+)*/gi;

function renderWithLinks(
  text: string,
  linkColor: string,
  onNavigate?: () => void,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(PATH_REGEX)) {
    const matchIndex = match.index ?? 0;
    const href = match[0];
    if (matchIndex > lastIndex) {
      nodes.push(
        <Fragment key={`t-${lastIndex}`}>{text.slice(lastIndex, matchIndex)}</Fragment>,
      );
    }
    nodes.push(
      <Link
        key={`l-${matchIndex}`}
        href={href}
        onClick={onNavigate}
        style={{ color: linkColor, textDecoration: 'underline' }}
      >
        {href}
      </Link>,
    );
    lastIndex = matchIndex + href.length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

export default function ChatMessage({ message, accentColor, onNavigate }: ChatMessageProps) {
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
          maxWidth: isUser ? '85%' : '100%',
          width: isUser ? 'auto' : '100%',
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
          {isUser
            ? message.content
            : renderWithLinks(message.content, accentColor, onNavigate)}
        </Typography>
      </Box>
    </Box>
  );
}
