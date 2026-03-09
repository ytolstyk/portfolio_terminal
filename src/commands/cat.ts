import { getProject } from '@/data/projects'
import type { CommandResult } from '@/types/terminal'

export function cat(args: string[]): CommandResult {
  const target = args[0]

  if (!target) {
    return {
      lines: [{ type: 'error', content: 'usage: cat <project-name>' }],
    }
  }

  // strip trailing slash
  const name = target.replace(/\/$/, '')
  const project = getProject(name)

  if (!project) {
    return {
      lines: [
        {
          type: 'error',
          content: `cat: ${target}: No such file or directory`,
        },
      ],
    }
  }

  const readmeLines = project.readme.split('\n').map((line) => ({
    type: 'output' as const,
    content: line,
  }))

  return {
    lines: [
      { type: 'system', content: `==> ${project.name}/README.md <==` },
      ...readmeLines,
    ],
  }
}
