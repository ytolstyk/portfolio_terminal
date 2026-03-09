import type { CommandResult } from '@/types/terminal'

export function whoami(): CommandResult {
  return {
    lines: [
      { type: 'success', content: 'visitor@ytolstyk' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Yuriy Tolstykh — Software Engineer' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Full-stack developer building web, mobile, and game tooling.' },
      { type: 'output', content: 'Passionate about real-time systems, audio, and interactive UIs.' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Languages: TypeScript, Kotlin, Python' },
      { type: 'output', content: 'Stack:     React, Node.js, Express, Vite' },
      { type: 'output', content: 'GitHub:    https://github.com/ytolstyk' },
      { type: 'output', content: '' },
      { type: 'system', content: "type 'ls' to see recent projects" },
    ],
  }
}
