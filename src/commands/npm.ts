import { getProject } from '@/data/projects'
import type { CommandResult, TerminalState } from '@/types/terminal'

function getProjectFromState(state: TerminalState) {
  const match = state.currentPath.match(/^~\/projects\/(.+)$/)
  if (!match) return undefined
  return getProject(match[1])
}

export function npm(args: string[], state: TerminalState): CommandResult {
  const sub = args[0]?.toLowerCase()

  if (sub === 'install' || sub === 'i' || sub === 'ci') {
    return {
      lines: [
        { type: 'output', content: 'npm warn deprecated existential-dread@1.0.0' },
        { type: 'output', content: 'added 847 packages in 4s' },
        { type: 'output', content: '' },
        { type: 'success', content: '0 vulnerabilities' },
        { type: 'system', content: "(we don't talk about the transitive ones)" },
      ],
    }
  }

  if (sub === 'run') {
    const script = args[1]?.toLowerCase()
    return handleScript(script, args.slice(2), state)
  }

  if (sub === 'start') {
    return handleScript('start', [], state)
  }

  if (sub === 'test') {
    return {
      lines: [
        { type: 'output', content: '> test' },
        { type: 'output', content: '' },
        { type: 'error', content: 'Error: no test specified' },
        { type: 'system', content: 'Writing tests is a form of self-care.' },
      ],
    }
  }

  if (sub === 'build') {
    return handleScript('build', [], state)
  }

  // npm with no args or unknown
  if (!sub) {
    return {
      lines: [
        { type: 'system', content: 'Usage: npm <command>' },
        { type: 'output', content: '' },
        { type: 'output', content: '  install       add 847 packages and a prayer' },
        { type: 'output', content: '  run <script>  run a lifecycle script' },
        { type: 'output', content: '  start         npm run start' },
        { type: 'output', content: '  build         bundle the hopes and dreams' },
        { type: 'output', content: '  test          verify the vibes' },
      ],
    }
  }

  return {
    lines: [
      { type: 'error', content: `npm: unknown command '${sub}'` },
      { type: 'system', content: 'Have you tried turning node_modules off and on again?' },
    ],
  }
}

function handleScript(script: string | undefined, _extraArgs: string[], state: TerminalState): CommandResult {
  const project = getProjectFromState(state)

  // dev / start: open project URL if in a project
  if (script === 'dev' || script === 'start') {
    if (project?.url) {
      return {
        lines: [
          { type: 'output', content: `> ${project.name}@1.0.0 ${script}` },
          { type: 'output', content: '' },
          { type: 'output', content: '  VITE v6.0.0  ready in 312ms' },
          { type: 'output', content: '' },
          { type: 'success', content: `  ➜  Local:   ${project.url}` },
          { type: 'system', content: '  opening in new tab...' },
        ],
        openUrl: project.url,
      }
    }
    return {
      lines: [
        { type: 'output', content: `> ${script}` },
        { type: 'output', content: '' },
        { type: 'output', content: '  VITE v6.0.0  ready in 312ms' },
        { type: 'success', content: '  ➜  Local:   http://localhost:5173/' },
        { type: 'system', content: "  (you'll have to start the server yourself — this is a portfolio, not a cloud)" },
      ],
    }
  }

  if (script === 'build') {
    return {
      lines: [
        { type: 'output', content: `> ${project?.name ?? 'app'}@1.0.0 build` },
        { type: 'output', content: '' },
        { type: 'output', content: 'vite v6.0.0 building for production...' },
        { type: 'output', content: '✓ 142 modules transformed.' },
        { type: 'output', content: 'dist/index.html          0.48 kB │ gzip:  0.31 kB' },
        { type: 'output', content: 'dist/assets/index.js   241.32 kB │ gzip: 78.42 kB' },
        { type: 'success', content: '✓ built in 1.84s' },
        { type: 'system', content: 'Shipped. Tell no one about the bundle size.' },
      ],
    }
  }

  if (script === 'lint') {
    return {
      lines: [
        { type: 'success', content: '0 problems found.' },
        { type: 'system', content: 'Your code is as clean as your commit history is not.' },
      ],
    }
  }

  if (script === 'preview') {
    return {
      lines: [
        { type: 'output', content: '  ➜  Local:   http://localhost:4173/' },
        { type: 'system', content: 'Preview mode — almost the real thing, but with more anxiety.' },
      ],
    }
  }

  if (!script) {
    return {
      lines: [
        { type: 'system', content: 'Available scripts:' },
        { type: 'output', content: '  dev       start dev server' },
        { type: 'output', content: '  build     production build' },
        { type: 'output', content: '  lint      check your life choices' },
        { type: 'output', content: '  preview   preview the build' },
      ],
    }
  }

  return {
    lines: [
      { type: 'error', content: `Missing script: "${script}"` },
      { type: 'system', content: 'npm ERR! Did you npm install? Did you though?' },
    ],
  }
}
