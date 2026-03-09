import type { CommandResult, TerminalState } from '@/types/terminal'

export function history(state: TerminalState): CommandResult {
  if (state.commandHistory.length === 0) {
    return {
      lines: [{ type: 'output', content: '(no commands in history)' }],
    }
  }

  const lines = state.commandHistory
    .slice()
    .reverse()
    .map((cmd, i) => ({
      type: 'output' as const,
      content: `  ${String(i + 1).padStart(3)}  ${cmd}`,
    }))

  return { lines }
}
