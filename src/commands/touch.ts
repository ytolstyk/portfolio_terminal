import type { CommandResult } from '@/types/terminal'

export function touch(args: string[]): CommandResult {
  if (!args.length) {
    return {
      lines: [{ type: 'error', content: 'touch: missing operand' }],
    }
  }

  const file = args[0]

  return {
    lines: [
      { type: 'success', content: `touched: ${file}` },
      {
        type: 'output',
        content: `Gently caressed ${file} into existence. It is empty but full of potential.`,
      },
    ],
  }
}
