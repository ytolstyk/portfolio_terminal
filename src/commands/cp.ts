import type { CommandResult } from '@/types/terminal'

export function cp(args: string[]): CommandResult {
  if (args.length < 2) {
    return {
      lines: [{ type: 'error', content: 'cp: missing destination operand' }],
    }
  }

  const [src, dest] = args

  return {
    lines: [
      { type: 'success', content: `${src} → ${dest}` },
      {
        type: 'output',
        content: `Xeroxed ${src} into ${dest}. Legally distinct in all the ways that matter.`,
      },
    ],
  }
}
