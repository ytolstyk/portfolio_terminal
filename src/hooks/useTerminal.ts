import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTerminalContext } from '@/context/TerminalContext'
import { useAppContext } from '@/context/AppContext'
import { dispatch as dispatchCommand } from '@/commands/index'
import type { OutputLine } from '@/types/terminal'

export function useTerminal() {
  const { state, dispatch } = useTerminalContext()
  const { setTerminalVisible } = useAppContext()
  const navigate = useNavigate()

  const executeCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return

      const inProject = state.currentPath.startsWith('~/projects/')
      const pushLines = (lines: OutputLine[]) =>
        dispatch({ type: inProject ? 'PUSH_PROJECT_LINES' : 'PUSH_LINES', lines })

      // Push the command line itself
      const commandLine: OutputLine = {
        id: crypto.randomUUID(),
        type: 'command',
        content: trimmed,
      }
      pushLines([commandLine])

      // Push to history
      dispatch({ type: 'PUSH_HISTORY', command: trimmed })

      // Reset grep filter before every non-grep command
      const isGrep = trimmed.toLowerCase().startsWith('grep')
      if (!isGrep) {
        dispatch({ type: 'SET_GREP_FILTER', filter: null })
      }

      // Run the command
      const result = dispatchCommand(trimmed, state)

      if (result.shouldClear) {
        dispatch({ type: inProject ? 'CLEAR_PROJECT_OUTPUT' : 'CLEAR_OUTPUT' })
        return
      }

      if (result.shouldExit) {
        const exitLines: OutputLine[] = result.lines.map((l) => ({ ...l, id: crypto.randomUUID() }))
        if (exitLines.length > 0) pushLines(exitLines)
        if (inProject) {
          setTimeout(() => {
            dispatch({ type: 'SET_PATH', path: '~' })
            navigate('/')
          }, 400)
        } else {
          setTimeout(() => setTerminalVisible(false), 400)
        }
        return
      }

      if (result.setGrepFilter !== undefined) {
        dispatch({ type: 'SET_GREP_FILTER', filter: result.setGrepFilter })
      }

      if (result.updatePath) {
        dispatch({ type: 'SET_PATH', path: result.updatePath })
      }

      const outputLines: OutputLine[] = result.lines.map((l) => ({
        ...l,
        id: crypto.randomUUID(),
      }))

      if (outputLines.length > 0) {
        pushLines(outputLines)
      }

      if (result.openUrl) {
        window.open(result.openUrl, '_blank', 'noopener,noreferrer')
      }

      if (result.navigationTarget != null) {
        navigate(result.navigationTarget)
      }
    },
    [state, dispatch, navigate, setTerminalVisible]
  )

  return { state, executeCommand }
}
