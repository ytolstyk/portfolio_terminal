import type { CommandResult } from '@/types/terminal'

export function exit(): CommandResult {
  return {
    lines: [{ type: 'system', content: 'Closing terminal...' }],
    shouldExit: true,
  }
}
