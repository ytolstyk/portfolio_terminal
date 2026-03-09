import type { CommandResult } from '@/types/terminal'

export function grep(args: string[]): CommandResult {
  const pattern = args[0]

  if (!pattern) {
    return {
      lines: [{ type: 'error', content: 'usage: grep <pattern>' }],
    }
  }

  return {
    lines: [
      {
        type: 'system',
        content: `filtering output for: "${pattern}"`,
      },
    ],
    setGrepFilter: pattern,
  }
}
