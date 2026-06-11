import { createContext, useContext, useState, type ReactNode } from 'react'

interface AppContextValue {
  terminalVisible: boolean
  setTerminalVisible: (v: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const QUIET_PARAMS = new Set(['boring', 'minimal', 'simple', 'quiet', 'noterminal'])

function shouldSuppressTerminal() {
  const params = new URLSearchParams(window.location.search)
  for (const key of params.keys()) {
    if (QUIET_PARAMS.has(key.toLowerCase())) return true
  }
  return false
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [terminalVisible, setTerminalVisible] = useState(() => !shouldSuppressTerminal())
  return (
    <AppContext.Provider value={{ terminalVisible, setTerminalVisible }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
