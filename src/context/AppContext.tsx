import { createContext, useContext, useState, type ReactNode } from 'react'

interface AppContextValue {
  terminalVisible: boolean
  setTerminalVisible: (v: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [terminalVisible, setTerminalVisible] = useState(true)
  return (
    <AppContext.Provider value={{ terminalVisible, setTerminalVisible }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
