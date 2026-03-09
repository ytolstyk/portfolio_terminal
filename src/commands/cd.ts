import { getProject } from '@/data/projects'
import type { CommandResult, TerminalState } from '@/types/terminal'

export function cd(args: string[], state: TerminalState): CommandResult {
  const target = args[0]

  if (!target || target === '~' || target === '/') {
    return {
      lines: [],
      navigationTarget: '/',
      updatePath: '~',
    }
  }

  if (target === '..') {
    if (state.currentPath === '~') {
      return { lines: [{ type: 'output', content: '~' }] }
    }
    return {
      lines: [],
      navigationTarget: '/',
      updatePath: '~',
    }
  }

  const project = getProject(target)
  if (!project) {
    return {
      lines: [
        {
          type: 'error',
          content: `bash: cd: ${target}: No such file or directory`,
        },
      ],
    }
  }

  return {
    lines: [],
    navigationTarget: `/projects/${project.name}`,
    updatePath: `~/projects/${project.name}`,
  }
}
