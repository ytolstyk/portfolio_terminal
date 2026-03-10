import { useRef, useEffect } from 'react'
import { TerminalHeader } from './TerminalHeader'
import { TerminalOutput } from './TerminalOutput'
import { TerminalInput } from './TerminalInput'
import { BootSequence } from './BootSequence'
import { useTerminalContext } from '@/context/TerminalContext'
import { useAppContext } from '@/context/AppContext'

export function Terminal() {
  const { state } = useTerminalContext()
  const { terminalVisible } = useAppContext()
  const bodyRef = useRef<HTMLDivElement>(null)

  const focusInput = () => {
    const input = bodyRef.current?.querySelector<HTMLInputElement>('.hidden-input')
    input?.focus()
  }

  useEffect(() => {
    if (terminalVisible) {
      focusInput()
    }
  }, [terminalVisible])

  useEffect(() => {
    if (!terminalVisible) return
    const handleFocus = () => focusInput()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [terminalVisible])

  return (
    <div className="terminal-window">
      <TerminalHeader />
      <div
        ref={bodyRef}
        className="terminal-body"
        onClick={focusInput}
      >
        {state.phase === 'boot' ? (
          <BootSequence />
        ) : (
          <>
            <TerminalOutput lines={state.lines} grepFilter={state.grepFilter} />
            <TerminalInput />
          </>
        )}
      </div>
    </div>
  )
}
