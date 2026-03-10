import type { CommandResult } from '@/types/terminal'

export function mv(args: string[]): CommandResult {
  if (args.length < 2) {
    return {
      lines: [{ type: 'error', content: 'mv: missing destination operand' }],
    }
  }

  const [src, dest] = args

  return {
    lines: [
      { type: 'success', content: `${src} → ${dest}` },
      {
        type: 'output',
        content: `Evicted ${src}. Relocated to ${dest}. Did not offer a U-Haul.`,
      },
    ],
  }
}
