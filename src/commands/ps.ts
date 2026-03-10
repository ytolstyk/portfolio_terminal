import type { CommandResult } from '@/types/terminal'

export function ps(): CommandResult {
  return {
    lines: [
      { type: 'output', content: '  PID TTY          TIME CMD' },
      { type: 'output', content: '    1 ??       0:00.01 launchd (definitely not spying)' },
      { type: 'output', content: '   42 ??       9:09.42 existential-crisis --daemon' },
      { type: 'output', content: '  137 ??       0:00.03 coffee-monitor (idle, waiting)' },
      { type: 'output', content: '  404 ??       ∞:∞∞.∞∞ motivation (not found)' },
      { type: 'output', content: '  418 ??       0:00.00 im-a-teapot' },
      { type: 'output', content: '  512 ??       3:14.15 typescript-compiler (zombie)' },
      { type: 'output', content: '  666 ??       6:66.66 node_modules/.bin/webpack' },
      { type: 'output', content: '  777 ??       0:01.23 portfolio-visitor (you)' },
      { type: 'output', content: '  999 ??       0:00.77 dream-job-search --background' },
      { type: 'output', content: '' },
      { type: 'system', content: '10 processes. 9 suspicious. 1 welcome.' },
    ],
  }
}
