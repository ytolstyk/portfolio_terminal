export type OutputLineType = 'output' | 'command' | 'error' | 'system' | 'success'

export interface OutputLine {
  id: string
  type: OutputLineType
  content: string
}

export interface Project {
  name: string
  displayName: string
  description: string
  language: string
  url: string
  readme: string
  year: number
  tags: string[]
}

export interface CommandResult {
  lines: Omit<OutputLine, 'id'>[]
  navigationTarget?: string | null
  shouldClear?: boolean
  setGrepFilter?: string | null
  updatePath?: string
}

export type TerminalPhase = 'boot' | 'ready'

export interface TerminalState {
  phase: TerminalPhase
  lines: OutputLine[]
  commandHistory: string[]
  currentPath: string
  grepFilter: string | null
}
