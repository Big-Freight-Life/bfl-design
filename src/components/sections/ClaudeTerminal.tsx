'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '@/viewmodels/useThemeMode';
import { sequence, terminalConfig } from '@/models/terminalSequence';
import TerminalLine, { OutputEntry, ThemeColors } from './TerminalLine';

// Theme-aware color sets matching WordPress
const themes: Record<'light' | 'dark', ThemeColors> = {
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

export default function ClaudeTerminal() {
  const [entries, setEntries] = useState<OutputEntry[]>([]);
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('Try "design an agent workflow"');
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const runningRef = useRef(false);
  const cancelRef = useRef(false);
  const pendingTimeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const { mode } = useThemeMode();

  const t = themes[mode === 'dark' ? 'dark' : 'light'];

  const addEntry = useCallback((type: string, data: Record<string, unknown>) => {
    const id = lineIdRef.current++;
    setEntries((prev) => [...prev, { id, type, data }]);
  }, []);

  const delay = useCallback((ms: number) => new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => {
      pendingTimeoutsRef.current.delete(id);
      if (cancelRef.current) {
        reject(new Error('cancelled'));
      } else {
        resolve();
      }
    }, ms);
    pendingTimeoutsRef.current.add(id);
  }), []);

  const typeText = useCallback(async (text: string) => {
    setPlaceholder('');
    for (let i = 0; i <= text.length; i++) {
      setInputText(text.slice(0, i));
      await delay(terminalConfig.humanTypingSpeed + Math.random() * terminalConfig.humanTypingVariation);
    }
    await delay(150);
    setInputText('');
    setPlaceholder('Try "design an agent workflow"');
    addEntry('user-prompt', { text });
  }, [addEntry, delay]);

  const runSequence = useCallback(async () => {
    for (const item of sequence) {
      switch (item.type) {
        case 'human':
          await typeText(item.text!);
          await delay(terminalConfig.responseDelay);
          break;
        case 'thinking':
          addEntry('thinking', { text: item.text });
          await delay(terminalConfig.thinkingDuration);
          break;
        case 'agent':
          addEntry('response', { text: item.text });
          await delay(terminalConfig.responseDelay);
          break;
        case 'action':
          addEntry('action', { verb: item.verb, file: item.file });
          await delay(300);
          break;
        case 'code':
          for (const line of item.lines!) {
            addEntry('code', { line });
            await delay(terminalConfig.codeLineDelay);
          }
          break;
        case 'success':
          addEntry('success', { text: item.text });
          await delay(terminalConfig.blockPause);
          break;
        case 'empty':
          addEntry('empty', {});
          await delay(150);
          break;
      }
    }
  }, [addEntry, delay, typeText]);

  // Observe visibility — only run the sequence while the terminal is
  // actually in the viewport. Avoids burning CPU on an animation nobody
  // can see and prevents the visitor from landing on a random mid-loop
  // state when they scroll down.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (runningRef.current) return;
    runningRef.current = true;
    cancelRef.current = false;
    const pendingTimeouts = pendingTimeoutsRef.current;

    const run = async () => {
      try {
        // Start fresh every time the terminal re-enters view so visitors
        // always see the sequence from the beginning. Awaited so the
        // reset isn't a synchronous setState inside the effect body.
        await Promise.resolve();
        setEntries([]);
        lineIdRef.current = 0;
        await delay(terminalConfig.initialDelay);
        while (runningRef.current) {
          await runSequence();
          await delay(terminalConfig.loopDelay);
          setEntries([]);
          lineIdRef.current = 0;
        }
      } catch {
        // Cancellation rejection — view exited or component unmounted.
      }
    };
    run();

    return () => {
      runningRef.current = false;
      cancelRef.current = true;
      pendingTimeouts.forEach((id) => clearTimeout(id));
      pendingTimeouts.clear();
    };
  }, [isInView, runSequence, delay]);

  return (
    <Box
      ref={containerRef}
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

      {/* Output — no scroll, content that overflows the fixed-height
          container is clipped. The sequence loops/resets so visitors
          always see a fresh start when they scroll into view. */}
      <Box
        ref={outputRef}
        sx={{
          flex: 1,
          overflow: 'hidden',
          px: 2,
          py: 1.5,
        }}
      >
        <Box sx={{ color: t.helpText, mb: 1 }}>? for shortcuts</Box>
        {entries.map((entry) => (
          <Box key={entry.id} sx={{ minHeight: entry.type === 'empty' ? '0.5em' : 'auto', py: '1px' }}>
            <TerminalLine entry={entry} t={t} />
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
