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

export const sequence: SequenceItem[] = [
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
