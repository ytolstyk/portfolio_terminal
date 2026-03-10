import type { CommandResult } from '@/types/terminal'

export function mkdir(args: string[]): CommandResult {
  if (!args.length) {
    return {
      lines: [{ type: 'error', content: 'mkdir: missing operand' }],
    }
  }

  const dir = args[0]

  return {
    lines: [
      { type: 'success', content: `created: ${dir}/` },
      {
        type: 'output',
        content: `Directory ${dir}/ built from scratch. No furniture included.`,
      },
    ],
  }
}
