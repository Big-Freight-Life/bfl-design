'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';

// Syntax color tokens
const syntaxColors = {
  keyword: '#c586c0',
  string: '#ce9178',
  function: '#dcdcaa',
  type: '#4ec9b0',
  comment: '#6a9955',
  default: '#d4d4d4',
};

interface CodePart {
  text: string;
  color: keyof typeof syntaxColors | 'default';
}

interface CodeLine {
  text?: string;
  color?: keyof typeof syntaxColors | 'default';
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
  agentTypingSpeed: 1,
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

function renderCodeLine(line: CodeLine): React.ReactNode {
  if (line.parts) {
    return line.parts.map((part, i) => (
      <span key={i} style={{ color: syntaxColors[part.color] || syntaxColors.default }}>
        {part.text}
      </span>
    ));
  }
  if (line.text === '') return '\u00A0';
  return (
    <span style={{ color: syntaxColors[line.color || 'default'] }}>
      {line.text}
    </span>
  );
}

interface OutputLine {
  id: number;
  type: string;
  content: React.ReactNode;
}

export default function ClaudeTerminal() {
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('Try "design an agent workflow"');
  const outputRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const runningRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  const addLine = useCallback((type: string, content: React.ReactNode) => {
    const id = lineIdRef.current++;
    setOutputLines((prev) => [...prev, { id, type, content }]);
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
    addLine('user-prompt', (
      <>
        <span style={{ color: '#569cd6', marginRight: 8 }}>&gt;</span>
        <span>{text}</span>
      </>
    ));
  }, [addLine]);

  const runSequence = useCallback(async () => {
    for (const item of sequence) {
      switch (item.type) {
        case 'human':
          await typeText(item.text!);
          await delay(config.responseDelay);
          break;
        case 'thinking':
          addLine('thinking', (
            <>
              <span style={{ color: '#dcdcaa', marginRight: 8, animation: 'pulse 1s ease-in-out infinite' }}>●</span>
              <span style={{ color: '#888' }}>{item.text}</span>
            </>
          ));
          await delay(config.thinkingDuration);
          break;
        case 'agent':
          addLine('response', <span style={{ color: '#d4d4d4' }}>{item.text}</span>);
          await delay(config.responseDelay);
          break;
        case 'action':
          addLine('action', (
            <>
              <span style={{ color: '#569cd6', fontWeight: 600, marginRight: 8 }}>{item.verb}</span>
              <span style={{ color: '#d4d4d4' }}>{item.file}</span>
            </>
          ));
          await delay(300);
          break;
        case 'code':
          for (const line of item.lines!) {
            addLine('code', <span style={{ fontFamily: "'SF Mono', 'Monaco', monospace" }}>{renderCodeLine(line)}</span>);
            await delay(config.codeLineDelay);
          }
          break;
        case 'success':
          addLine('success', (
            <>
              <span style={{ color: '#4ec9b0', marginRight: 8 }}>✓</span>
              <span style={{ color: '#4ec9b0' }}>{item.text}</span>
            </>
          ));
          await delay(config.blockPause);
          break;
        case 'empty':
          addLine('empty', '\u00A0');
          await delay(150);
          break;
      }
    }
  }, [addLine, typeText]);

  useEffect(() => {
    if (runningRef.current) return;
    runningRef.current = true;

    const run = async () => {
      await delay(config.initialDelay);
      while (runningRef.current) {
        await runSequence();
        await delay(config.loopDelay);
        setOutputLines([]);
        lineIdRef.current = 0;
      }
    };
    run();

    return () => { runningRef.current = false; };
  }, [runSequence]);

  return (
    <Box
      sx={{
        bgcolor: '#1e1e1e',
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
          bgcolor: '#2d2d2d',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
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
        <Box sx={{ color: '#666', mb: 1 }}>? for shortcuts</Box>
        {outputLines.map((line) => (
          <Box key={line.id} sx={{ minHeight: line.type === 'empty' ? '0.5em' : 'auto', py: '1px' }}>
            {line.content}
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
          borderTop: '1px solid rgba(255,255,255,0.06)',
          bgcolor: '#252526',
        }}
      >
        <Box component="span" sx={{ color: '#569cd6', mr: 1 }}>&gt;</Box>
        <Box
          sx={{
            flex: 1,
            color: '#d4d4d4',
            position: 'relative',
          }}
        >
          {inputText || (
            <span style={{ color: '#555' }}>{placeholder}</span>
          )}
          {inputText && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                bgcolor: '#d4d4d4',
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
