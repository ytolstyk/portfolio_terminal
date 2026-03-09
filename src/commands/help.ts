import type { CommandResult } from '@/types/terminal'

const COMMANDS = [
  ['ls', 'list all projects'],
  ['cd <name>', 'navigate into a project (or cd .. to go back)'],
  ['cat <name>', 'read a project README'],
  ['grep <pattern>', 'filter visible output by pattern'],
  ['pwd', 'print working directory'],
  ['whoami', 'display user info'],
  ['echo <text>', 'echo text to output'],
  ['history', 'show command history'],
  ['clear', 'clear the terminal output'],
  ['help', 'show this help message'],
]

export function help(): CommandResult {
  const lines: CommandResult['lines'] = [
    { type: 'system', content: 'Available commands:' },
    { type: 'output', content: '' },
  ]

  for (const [cmd, desc] of COMMANDS) {
    lines.push({
      type: 'output',
      content: `  ${cmd.padEnd(20)} ${desc}`,
    })
  }

  lines.push({ type: 'output', content: '' })

  return { lines }
}
