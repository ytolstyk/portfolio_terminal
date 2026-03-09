import { useBootSequence } from '@/hooks/useBootSequence'
import { useTerminalContext } from '@/context/TerminalContext'
import { TerminalOutput } from './TerminalOutput'

export function BootSequence() {
  useBootSequence()
  const { state } = useTerminalContext()

  if (state.phase === 'ready') return null

  return (
    <TerminalOutput lines={state.lines} grepFilter={null} />
  )
}
