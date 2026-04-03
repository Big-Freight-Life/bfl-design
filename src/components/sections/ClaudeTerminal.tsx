'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '@/viewmodels/useThemeMode';

// Theme-aware color sets matching WordPress
const themes = {
  light: {
    bg: '#e8e8e8',
    titleBar: '#dcdcdc',
    titleBarBorder: 'rgba(0,0,0,0.08)',
    inputBg: '#e0e0e0',
    inputBorder: 'rgba(0,0,0,0.06)',
    text: '#383a42',
    textMuted: '#6b7280',
    prompt: '#4078f2',
    cursor: '#383a42',
    placeholder: '#999',
    helpText: '#999',
    keyword: '#a626a4',
    string: '#50a14f',
    function: '#4078f2',
    type: '#c18401',
    comment: '#6b7280',
    success: '#50a14f',
    thinking: '#c18401',
    actionVerb: '#4078f2',
  },
  dark: {
    bg: '#1e1e1e',
    titleBar: '#2d2d2d',
    titleBarBorder: 'rgba(255,255,255,0.06)',
    inputBg: '#252526',
    inputBorder: 'rgba(255,255,255,0.06)',
    text: '#d4d4d4',
    textMuted: '#888',
    prompt: '#569cd6',
    cursor: '#d4d4d4',
    placeholder: '#555',
    helpText: '#666',
    keyword: '#c586c0',
    string: '#ce9178',
    function: '#dcdcaa',
    type: '#4ec9b0',
    comment: '#6a9955',
    success: '#4ec9b0',
    thinking: '#dcdcaa',
    actionVerb: '#569cd6',
  },
};

type ThemeColors = typeof themes.light;

interface CodePart {
  text: string;
  color: 'keyword' | 'string' | 'function' | 'type' | 'comment' | 'default';
}

interface CodeLine {
  text?: string;
  color?: 'keyword' | 'string' | 'function' | 'type' | 'comment' | 'default';
  parts?: CodePart[];
}

interface SequenceItem {
  type: 'human' | 'thinking' | 'agent' | 'action' | 'code' | 'success' | 'empty';
  text?: string;
  verb?: string;
  file?: string;
  lines?: CodeLine[];
}

const config = {
  humanTypingSpeed: 2,
  humanTypingVariation: 1,
  linePause: 60,
  blockPause: 120,
  thinkingDuration: 500,
  responseDelay: 80,
  codeLineDelay: 10,
  initialDelay: 800,
  loopDelay: 2500,
};

const sequence: SequenceItem[] = [
  { type: 'human', text: 'build a multi-agent system for automated customer support with intent classification and escalation paths' },
  { type: 'thinking', text: 'Analyzing requirements...' },
  { type: 'agent', text: "Hey Ray! I'll design a multi-agent workflow with specialized handlers for triage, resolution, and escalation." },
  { type: 'action', verb: 'Planning', file: 'workflow architecture' },
  { type: 'empty' },
  { type: 'agent', text: 'The workflow will use three coordinated agents:' },
  { type: 'code', lines: [
    { text: '1. Triage Agent', color: 'type' },
    { text: '   → Classifies incoming requests', color: 'comment' },
    { text: '   → Routes to appropriate handler', color: 'comment' },
  ]},
  { type: 'code', lines: [
    { text: '2. Resolution Agent', color: 'type' },
    { text: '   → Handles common issues', color: 'comment' },
    { text: '   → Accesses knowledge base', color: 'comment' },
  ]},
  { type: 'code', lines: [
    { text: '3. Escalation Agent', color: 'type' },
    { text: '   → Complex issue handling', color: 'comment' },
    { text: '   → Human handoff when needed', color: 'comment' },
  ]},
  { type: 'empty' },
  { type: 'action', verb: 'Write', file: 'src/agents/triage.py' },
  { type: 'code', lines: [
    { parts: [{ text: 'from', color: 'keyword' }, { text: ' langchain.agents ', color: 'default' }, { text: 'import', color: 'keyword' }, { text: ' Agent', color: 'type' }] },
    { parts: [{ text: 'from', color: 'keyword' }, { text: ' langchain.tools ', color: 'default' }, { text: 'import', color: 'keyword' }, { text: ' Tool', color: 'type' }] },
    { text: '', color: 'default' },
    { parts: [{ text: 'class', color: 'keyword' }, { text: ' TriageAgent', color: 'type' }, { text: ':', color: 'default' }] },
    { parts: [{ text: '    ', color: 'default' }, { text: 'def', color: 'keyword' }, { text: ' classify', color: 'function' }, { text: '(self, request):', color: 'default' }] },
    { parts: [{ text: '        ', color: 'default' }, { text: '"""Route request to handler"""', color: 'string' }] },
    { parts: [{ text: '        intent = self.', color: 'default' }, { text: 'analyze', color: 'function' }, { text: '(request)', color: 'default' }] },
    { parts: [{ text: '        ', color: 'default' }, { text: 'return', color: 'keyword' }, { text: ' self.router[intent]', color: 'default' }] },
  ]},
  { type: 'success', text: 'Created src/agents/triage.py' },
  { type: 'empty' },
  { type: 'human', text: 'add try-catch error handling with fallback to human support queue' },
  { type: 'thinking', text: 'Adding error handling...' },
  { type: 'action', verb: 'Edit', file: 'src/agents/triage.py' },
  { type: 'code', lines: [
    { parts: [{ text: '        ', color: 'default' }, { text: 'try', color: 'keyword' }, { text: ':', color: 'default' }] },
    { parts: [{ text: '            intent = self.', color: 'default' }, { text: 'analyze', color: 'function' }, { text: '(request)', color: 'default' }] },
    { parts: [{ text: '        ', color: 'default' }, { text: 'except', color: 'keyword' }, { text: ' ClassificationError:', color: 'type' }] },
    { parts: [{ text: '            ', color: 'default' }, { text: 'return', color: 'keyword' }, { text: ' self.', color: 'default' }, { text: 'fallback_handler', color: 'function' }] },
  ]},
  { type: 'success', text: 'Updated src/agents/triage.py' },
  { type: 'empty' },
  { type: 'agent', text: 'Error handling added. The agent now gracefully handles classification failures.' },
];

// Store output as data, render with current theme colors
interface OutputEntry {
  id: number;
  type: string;
  data: Record<string, unknown>;
}

function RenderLine({ entry, t }: { entry: OutputEntry; t: ThemeColors }) {
  const { type, data } = entry;

  const syntaxColor = (c: string) => {
    const map: Record<string, string> = {
      keyword: t.keyword, string: t.string, function: t.function,
      type: t.type, comment: t.comment, default: t.text,
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

export default function ClaudeTerminal() {
  const [entries, setEntries] = useState<OutputEntry[]>([]);
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('Try "design an agent workflow"');
  const outputRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const runningRef = useRef(false);
  const { mode } = useThemeMode();

  const t = themes[mode === 'dark' ? 'dark' : 'light'];

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  const addEntry = useCallback((type: string, data: Record<string, unknown>) => {
    const id = lineIdRef.current++;
    setEntries((prev) => [...prev, { id, type, data }]);
    setTimeout(scrollToBottom, 10);
  }, [scrollToBottom]);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const typeText = useCallback(async (text: string) => {
    setPlaceholder('');
    for (let i = 0; i <= text.length; i++) {
      setInputText(text.slice(0, i));
      await delay(config.humanTypingSpeed + Math.random() * config.humanTypingVariation);
    }
    await delay(150);
    setInputText('');
    setPlaceholder('Try "design an agent workflow"');
    addEntry('user-prompt', { text });
  }, [addEntry]);

  const runSequence = useCallback(async () => {
    for (const item of sequence) {
      switch (item.type) {
        case 'human':
          await typeText(item.text!);
          await delay(config.responseDelay);
          break;
        case 'thinking':
          addEntry('thinking', { text: item.text });
          await delay(config.thinkingDuration);
          break;
        case 'agent':
          addEntry('response', { text: item.text });
          await delay(config.responseDelay);
          break;
        case 'action':
          addEntry('action', { verb: item.verb, file: item.file });
          await delay(300);
          break;
        case 'code':
          for (const line of item.lines!) {
            addEntry('code', { line });
            await delay(config.codeLineDelay);
          }
          break;
        case 'success':
          addEntry('success', { text: item.text });
          await delay(config.blockPause);
          break;
        case 'empty':
          addEntry('empty', {});
          await delay(150);
          break;
      }
    }
  }, [addEntry, typeText]);

  useEffect(() => {
    if (runningRef.current) return;
    runningRef.current = true;

    const run = async () => {
      await delay(config.initialDelay);
      while (runningRef.current) {
        await runSequence();
        await delay(config.loopDelay);
        setEntries([]);
        lineIdRef.current = 0;
      }
    };
    run();

    return () => { runningRef.current = false; };
  }, [runSequence]);

  return (
    <Box
      sx={{
        bgcolor: t.bg,
        borderRadius: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        fontFamily: "'SF Mono', 'Fira Code', 'Monaco', 'Inconsolata', monospace",
        fontSize: '0.8rem',
        lineHeight: 1.6,
        border: 'none',
        transition: 'background-color 0.3s ease',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        '@keyframes blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      }}
    >
      {/* Title bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          px: 1.5,
          py: 1,
          bgcolor: t.titleBar,
          borderBottom: `1px solid ${t.titleBarBorder}`,
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f57' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#febc2e' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28c840' }} />
      </Box>

      {/* Output */}
      <Box
        ref={outputRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 1.5,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box sx={{ color: t.helpText, mb: 1 }}>? for shortcuts</Box>
        {entries.map((entry) => (
          <Box key={entry.id} sx={{ minHeight: entry.type === 'empty' ? '0.5em' : 'auto', py: '1px' }}>
            <RenderLine entry={entry} t={t} />
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderTop: `1px solid ${t.inputBorder}`,
          bgcolor: t.inputBg,
        }}
      >
        <Box component="span" sx={{ color: t.prompt, mr: 1 }}>&gt;</Box>
        <Box sx={{ flex: 1, color: t.text, position: 'relative' }}>
          {inputText || (
            <span style={{ color: t.placeholder }}>{placeholder}</span>
          )}
          {inputText && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                bgcolor: t.cursor,
                ml: '1px',
                verticalAlign: 'text-bottom',
                animation: 'blink 1s step-end infinite',
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
