import { useAppContext } from '@/context/AppContext'

export function TerminalHeader() {
  const { setTerminalVisible } = useAppContext()

  return (
    <div className="terminal-header">
      <div className="traffic-lights">
        <span
          className="dot dot-red"
          title="Close"
          onClick={() => setTerminalVisible(false)}
          style={{ cursor: 'pointer' }}
        >×</span>
        <span
          className="dot dot-yellow"
          title="Minimize"
          onClick={() => setTerminalVisible(false)}
          style={{ cursor: 'pointer' }}
        >–</span>
        <span className="dot dot-green" />
      </div>
      <span className="header-title">visitor@ytolstyk — bash</span>
    </div>
  )
}
