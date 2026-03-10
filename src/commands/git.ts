import type { CommandResult } from '@/types/terminal'

const FAKE_LOG = [
  'commit a1b2c3d (HEAD -> main, origin/main)',
  'Author: Yuriy Tolstykh <yuriy@ytolstyk.dev>',
  'Date:   Mon Mar 10 09:41:00 2026',
  '',
  '    feat: make everything look cooler',
  '',
  'commit d4e5f6a',
  'Author: Yuriy Tolstykh <yuriy@ytolstyk.dev>',
  'Date:   Sun Mar 9 22:13:00 2026',
  '',
  '    fix: remove console.log that definitely wasn\'t supposed to ship',
  '',
  'commit 7890abc',
  'Author: Yuriy Tolstykh <yuriy@ytolstyk.dev>',
  'Date:   Sat Mar 8 18:05:00 2026',
  '',
  '    chore: update deps (held breath, nothing exploded)',
]

export function git(args: string[]): CommandResult {
  const sub = args[0]?.toLowerCase()

  switch (sub) {
    case 'status':
      return {
        lines: [
          { type: 'output', content: 'On branch main' },
          { type: 'output', content: "Your branch is up to date with 'origin/main'." },
          { type: 'output', content: '' },
          { type: 'success', content: 'nothing to commit, working tree clean' },
          { type: 'system', content: '(portfolio looking pristine, as always)' },
        ],
      }

    case 'log':
      return {
        lines: [
          ...FAKE_LOG.map((line) => ({
            type: (line.startsWith('commit') ? 'success' : 'output') as 'success' | 'output',
            content: line || ' ',
          })),
          { type: 'system', content: '(end of log — scrolling back in time costs extra)' },
        ],
      }

    case 'diff':
      return {
        lines: [
          { type: 'output', content: 'No changes detected.' },
          { type: 'system', content: "You haven't broken anything yet. Impressive." },
        ],
      }

    case 'add':
      return {
        lines: [
          { type: 'success', content: `Staged: ${args.slice(1).join(' ') || '.'}` },
          { type: 'system', content: 'Now commit before you lose your nerve.' },
        ],
      }

    case 'commit': {
      const msgIdx = args.indexOf('-m')
      const msg = msgIdx !== -1 ? args.slice(msgIdx + 1).join(' ') || undefined : undefined
      return {
        lines: [
          { type: 'success', content: `[main a1b2c3d] ${msg ?? 'your message here'}` },
          { type: 'output', content: ' 1 file changed, 1 insertion(+)' },
          { type: 'system', content: 'Committed. No take-backs.' },
        ],
      }
    }

    case 'push':
      return {
        lines: [
          { type: 'output', content: 'Enumerating objects: 3, done.' },
          { type: 'output', content: 'Writing objects: 100% (3/3), 512 bytes | 512.00 KiB/s' },
          { type: 'success', content: 'main -> main' },
          { type: 'system', content: "It's out there now. No pressure." },
        ],
      }

    case 'pull':
      return {
        lines: [
          { type: 'output', content: "From github.com:ytolstyk/portfolio" },
          { type: 'success', content: 'Already up to date.' },
          { type: 'system', content: "You're living in the present. Rare." },
        ],
      }

    case 'branch':
      return {
        lines: [
          { type: 'success', content: '* main' },
          { type: 'system', content: '(one branch to rule them all)' },
        ],
      }

    case 'checkout':
    case 'switch': {
      const target = args[1]
      if (!target) {
        return {
          lines: [{ type: 'error', content: "error: you can't check out thin air" }],
        }
      }
      return {
        lines: [
          { type: 'success', content: `Switched to branch '${target}'` },
          { type: 'system', content: 'Identity crisis averted.' },
        ],
      }
    }

    case 'stash':
      return {
        lines: [
          { type: 'success', content: 'Saved working directory and index state WIP on main' },
          { type: 'system', content: 'Stashed. Out of sight, out of mind.' },
        ],
      }

    case 'clone':
      return {
        lines: [
          { type: 'output', content: "Cloning into '...'..." },
          { type: 'output', content: 'remote: Counting objects: 1337, done.' },
          { type: 'success', content: 'Receiving objects: 100% (1337/1337), done.' },
          { type: 'system', content: 'Imitation is the sincerest form of flattery.' },
        ],
      }

    default:
      if (!sub) {
        return {
          lines: [
            { type: 'system', content: 'Usage: git <command>' },
            { type: 'output', content: '' },
            { type: 'output', content: '  status      see how tidy things are' },
            { type: 'output', content: '  log         relive the past' },
            { type: 'output', content: '  diff        spot what changed' },
            { type: 'output', content: '  add         stage your changes' },
            { type: 'output', content: '  commit      make it official' },
            { type: 'output', content: '  push        ship it' },
            { type: 'output', content: '  pull        sync up' },
            { type: 'output', content: '  branch      see your branches' },
            { type: 'output', content: '  checkout    switch context' },
            { type: 'output', content: '  stash       hide the mess' },
            { type: 'output', content: '  clone       copy someone else\'s homework' },
          ],
        }
      }
      return {
        lines: [
          { type: 'error', content: `git: '${sub}' is not a git command` },
          { type: 'system', content: "Did you mean: git gud?" },
        ],
      }
  }
}
