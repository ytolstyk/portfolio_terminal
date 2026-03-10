import type { CommandResult } from '@/types/terminal'

const PAGES: Record<string, string[]> = {
  ls: [
    'LS(1)                    Fake Manual                    LS(1)',
    '',
    'NAME',
    '     ls — list projects (the good ones, at least)',
    '',
    'SYNOPSIS',
    '     ls',
    '',
    'DESCRIPTION',
    '     Lists projects this engineer is not embarrassed to show you.',
    '     Projects deemed "learning experiences" have been omitted.',
    '',
    'EXIT STATUS',
    '     0  Always. Positivity only.',
  ],
  sudo: [
    'SUDO(8)                  Fake Manual                   SUDO(8)',
    '',
    'NAME',
    '     sudo — attempt to feel powerful',
    '',
    'SYNOPSIS',
    '     sudo <command>',
    '',
    'DESCRIPTION',
    '     Prefixes a command with a vague sense of authority.',
    '     In this terminal, authority is an illusion.',
    '     Visitor accounts are read-only. Always have been.',
    '',
    'SEE ALSO',
    '     whoami(1), dreams(7)',
  ],
  git: [
    'GIT(1)                   Fake Manual                   GIT(1)',
    '',
    'NAME',
    '     git — the stupid content tracker (their words, not mine)',
    '',
    'SYNOPSIS',
    '     git <subcommand> [--please]',
    '',
    'DESCRIPTION',
    '     A distributed version control system widely used for',
    '     storing half-finished features and passive-aggressive',
    '     commit messages.',
    '',
    'COMMON SUBCOMMANDS',
    '     commit -m "fix"     industry standard',
    '     push --force        career-limiting move',
    '     blame               the real reason it exists',
  ],
}

const GENERIC = (cmd: string) => [
  `${cmd.toUpperCase()}(1)               Fake Manual               ${cmd.toUpperCase()}(1)`,
  '',
  'NAME',
  `     ${cmd} — does something, probably`,
  '',
  'DESCRIPTION',
  `     No manual entry for ${cmd}.`,
  '     RTFM is a myth in this terminal.',
  '     Have you tried Stack Overflow?',
  '',
  'BUGS',
  '     Likely yes.',
]

export function man(args: string[]): CommandResult {
  if (!args.length) {
    return {
      lines: [
        { type: 'error', content: 'What manual page do you want?' },
        { type: 'system', content: 'Try: man ls, man sudo, man git' },
      ],
    }
  }

  const page = PAGES[args[0]] ?? GENERIC(args[0])

  return {
    lines: [
      ...page.map((line) => ({ type: 'output' as const, content: line })),
      { type: 'output', content: '' },
      { type: 'system', content: '(END) — press q to quit (jk, just type another command)' },
    ],
  }
}
