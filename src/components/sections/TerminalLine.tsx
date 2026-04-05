'use client';

import { CodeLine } from '@/models/terminalSequence';

// Theme-aware color set — must match the themes object in ClaudeTerminal
export interface ThemeColors {
  bg: string;
  titleBar: string;
  titleBarBorder: string;
  inputBg: string;
  inputBorder: string;
  text: string;
  textMuted: string;
  prompt: string;
  cursor: string;
  placeholder: string;
  helpText: string;
  keyword: string;
  string: string;
  function: string;
  type: string;
  comment: string;
  success: string;
  thinking: string;
  actionVerb: string;
}

export interface OutputEntry {
  id: number;
  type: string;
  data: Record<string, unknown>;
}

interface TerminalLineProps {
  entry: OutputEntry;
  t: ThemeColors;
}

export default function TerminalLine({ entry, t }: TerminalLineProps) {
  const { type, data } = entry;

  const syntaxColor = (c: string) => {
    const map: Record<string, string> = {
      keyword: t.keyword,
      string: t.string,
      function: t.function,
      type: t.type,
      comment: t.comment,
      default: t.text,
    };
    return map[c] || t.text;
  };

  switch (type) {
    case 'user-prompt':
      return (
        <>
          <span style={{ color: t.prompt, marginRight: 8 }}>&gt;</span>
          <span style={{ color: t.text }}>{data.text as string}</span>
        </>
      );
    case 'thinking':
      return (
        <>
          <span style={{ color: t.thinking, marginRight: 8, animation: 'pulse 1s ease-in-out infinite' }}>●</span>
          <span style={{ color: t.textMuted }}>{data.text as string}</span>
        </>
      );
    case 'response':
      return <span style={{ color: t.text }}>{data.text as string}</span>;
    case 'action':
      return (
        <>
          <span style={{ color: t.actionVerb, fontWeight: 600, marginRight: 8 }}>{data.verb as string}</span>
          <span style={{ color: t.text }}>{data.file as string}</span>
        </>
      );
    case 'code': {
      const line = data.line as CodeLine;
      if (line.parts) {
        return (
          <span style={{ fontFamily: "'SF Mono', 'Monaco', monospace" }}>
            {line.parts.map((part, i) => (
              <span key={i} style={{ color: syntaxColor(part.color) }}>{part.text}</span>
            ))}
          </span>
        );
      }
      if (line.text === '') return <>{'\u00A0'}</>;
      return (
        <span style={{ fontFamily: "'SF Mono', 'Monaco', monospace", color: syntaxColor(line.color || 'default') }}>
          {line.text}
        </span>
      );
    }
    case 'success':
      return (
        <>
          <span style={{ color: t.success, marginRight: 8 }}>✓</span>
          <span style={{ color: t.success }}>{data.text as string}</span>
        </>
      );
    case 'empty':
      return <>{'\u00A0'}</>;
    default:
      return null;
  }
}
