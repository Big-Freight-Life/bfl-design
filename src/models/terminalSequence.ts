// Pure TypeScript — no React, no hooks, no MUI

export interface CodePart {
  text: string;
  color: 'keyword' | 'string' | 'function' | 'type' | 'comment' | 'default';
}

export interface CodeLine {
  text?: string;
  color?: 'keyword' | 'string' | 'function' | 'type' | 'comment' | 'default';
  parts?: CodePart[];
}

export interface SequenceItem {
  type: 'human' | 'thinking' | 'agent' | 'action' | 'code' | 'success' | 'empty';
  text?: string;
  verb?: string;
  file?: string;
  lines?: CodeLine[];
}

export const terminalConfig = {
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

// Intentionally a short, fully self-contained Python snippet. Every symbol
// is imported or defined in the same module so a reader inspecting the
// code won't find undefined references, missing __init__s, or handwaved
// framework calls. The code is decorative but still has to be correct.
export const sequence: SequenceItem[] = [
  { type: 'human', text: 'build a triage function with routing fallback' },
  { type: 'thinking', text: 'Scaffolding handler routing...' },
  { type: 'action', verb: 'Write', file: 'src/triage.py' },
  { type: 'code', lines: [
    // from typing import Callable
    { parts: [
      { text: 'from', color: 'keyword' },
      { text: ' typing ', color: 'default' },
      { text: 'import', color: 'keyword' },
      { text: ' Callable', color: 'type' },
    ]},
    { text: '', color: 'default' },
    // Routes = dict[str, Callable]
    { parts: [
      { text: 'Routes', color: 'type' },
      { text: ' = ', color: 'default' },
      { text: 'dict', color: 'type' },
      { text: '[', color: 'default' },
      { text: 'str', color: 'type' },
      { text: ', ', color: 'default' },
      { text: 'Callable', color: 'type' },
      { text: ']', color: 'default' },
    ]},
    { text: '', color: 'default' },
    // def classify(text: str) -> str:
    { parts: [
      { text: 'def', color: 'keyword' },
      { text: ' classify', color: 'function' },
      { text: '(text: ', color: 'default' },
      { text: 'str', color: 'type' },
      { text: ') -> ', color: 'default' },
      { text: 'str', color: 'type' },
      { text: ':', color: 'default' },
    ]},
    //     """Plug in your LLM classifier."""
    { parts: [
      { text: '    ', color: 'default' },
      { text: '"""Plug in your LLM classifier."""', color: 'string' },
    ]},
    //     return "general"
    { parts: [
      { text: '    ', color: 'default' },
      { text: 'return', color: 'keyword' },
      { text: ' ', color: 'default' },
      { text: '"general"', color: 'string' },
    ]},
    { text: '', color: 'default' },
    // def triage(text: str, routes: Routes) -> Callable:
    { parts: [
      { text: 'def', color: 'keyword' },
      { text: ' triage', color: 'function' },
      { text: '(text: ', color: 'default' },
      { text: 'str', color: 'type' },
      { text: ', routes: ', color: 'default' },
      { text: 'Routes', color: 'type' },
      { text: ') -> ', color: 'default' },
      { text: 'Callable', color: 'type' },
      { text: ':', color: 'default' },
    ]},
    //     intent = classify(text)
    { parts: [
      { text: '    intent = ', color: 'default' },
      { text: 'classify', color: 'function' },
      { text: '(text)', color: 'default' },
    ]},
    //     return routes.get(intent, routes["escalate"])
    { parts: [
      { text: '    ', color: 'default' },
      { text: 'return', color: 'keyword' },
      { text: ' routes.', color: 'default' },
      { text: 'get', color: 'function' },
      { text: '(intent, routes[', color: 'default' },
      { text: '"escalate"', color: 'string' },
      { text: '])', color: 'default' },
    ]},
  ]},
  { type: 'success', text: 'Created src/triage.py' },
];
