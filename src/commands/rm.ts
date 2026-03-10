import type { CommandResult } from '@/types/terminal'

const DRAMATIC = [
  'Gone. Reduced to atoms.',
  'Deleted into the void. No backsies.',
  'It never existed. The filesystem agrees.',
  'Yeeted into /dev/null. RIP.',
  'Sent to the shadow realm.',
]

export function rm(args: string[]): CommandResult {
  if (!args.length) {
    return {
      lines: [{ type: 'error', content: 'rm: missing operand' }],
    }
  }

  const rfFlag = args.includes('-rf') || args.includes('-r') || args.includes('-f')
  const targets = args.filter((a) => !a.startsWith('-'))

  if (!targets.length) {
    return {
      lines: [{ type: 'error', content: 'rm: missing operand' }],
    }
  }

  const target = targets[0]
  const epitaph = DRAMATIC[Math.floor(Math.random() * DRAMATIC.length)]

  if (rfFlag && (target === '/' || target === '~')) {
    return {
      lines: [
        { type: 'error', content: `rm: refusing to remove '${target}': this is not that kind of portfolio` },
        { type: 'system', content: 'Nice try though.' },
      ],
    }
  }

  return {
    lines: [
      { type: 'success', content: `removed: ${target}` },
      { type: 'output', content: epitaph },
    ],
  }
}
