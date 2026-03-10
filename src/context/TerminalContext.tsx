import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { OutputLine, TerminalPhase, TerminalState } from '@/types/terminal'

type Action =
  | { type: 'BOOT_COMPLETE' }
  | { type: 'PUSH_LINES'; lines: OutputLine[] }
  | { type: 'CLEAR_OUTPUT' }
  | { type: 'SET_PATH'; path: string }
  | { type: 'SET_GREP_FILTER'; filter: string | null }
  | { type: 'PUSH_HISTORY'; command: string }

const initialState: TerminalState = {
  phase: 'boot' as TerminalPhase,
  lines: [],
  commandHistory: [],
  currentPath: '~',
  grepFilter: null,
}

function reducer(state: TerminalState, action: Action): TerminalState {
  switch (action.type) {
    case 'BOOT_COMPLETE':
      return { ...state, phase: 'ready' }

    case 'PUSH_LINES':
      return {
        ...state,
        lines: [...state.lines, ...action.lines].slice(-300),
      }

    case 'CLEAR_OUTPUT':
      return { ...state, lines: [], grepFilter: null }

    case 'SET_PATH':
      return { ...state, currentPath: action.path }

    case 'SET_GREP_FILTER':
      return { ...state, grepFilter: action.filter }

    case 'PUSH_HISTORY':
      return {
        ...state,
        commandHistory: [action.command, ...state.commandHistory].slice(0, 50),
      }

    default:
      return state
  }
}

interface TerminalContextValue {
  state: TerminalState
  dispatch: React.Dispatch<Action>
}

const TerminalContext = createContext<TerminalContextValue | null>(null)

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TerminalContext.Provider value={{ state, dispatch }}>
      {children}
    </TerminalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTerminalContext() {
  const ctx = useContext(TerminalContext)
  if (!ctx) throw new Error('useTerminalContext must be used within TerminalProvider')
  return ctx
}
