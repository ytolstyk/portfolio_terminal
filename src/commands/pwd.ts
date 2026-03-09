import type { CommandResult, TerminalState } from '@/types/terminal'

export function pwd(state: TerminalState): CommandResult {
  const home = '/home/visitor'
  const path =
    state.currentPath === '~'
      ? home
      : state.currentPath.replace('~', home)

  return {
    lines: [{ type: 'output', content: path }],
  }
}
