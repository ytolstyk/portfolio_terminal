import type { CommandResult } from '@/types/terminal'

export function echo(args: string[]): CommandResult {
  return {
    lines: [{ type: 'output', content: args.join(' ') }],
  }
}
