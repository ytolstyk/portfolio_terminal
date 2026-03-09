import { useRef } from 'react'
import { TerminalHeader } from './TerminalHeader'
import { TerminalOutput } from './TerminalOutput'
import { TerminalInput } from './TerminalInput'
import { BootSequence } from './BootSequence'
import { useTerminalContext } from '@/context/TerminalContext'

export function Terminal() {
  const { state } = useTerminalContext()
  const bodyRef = useRef<HTMLDivElement>(null)

  const focusInput = () => {
    const input = bodyRef.current?.querySelector<HTMLInputElement>('.hidden-input')
    input?.focus()
  }

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
