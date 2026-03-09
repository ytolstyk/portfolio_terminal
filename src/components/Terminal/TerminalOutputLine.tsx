import type { OutputLine } from '@/types/terminal'

interface Props {
  line: OutputLine
}

const urlRegex = /(https?:\/\/[^\s]+)/g

function renderContent(content: string) {
  const parts = content.split(urlRegex)
  return parts.map((part, i) =>
    /^https?:\/\/[^\s]+$/.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="terminal-link">{part}</a>
      : part
  )
}

export function TerminalOutputLine({ line }: Props) {
  return (
    <div className={`output-line output-line--${line.type}`}>
      {line.content ? renderContent(line.content) : '\u00A0'}
    </div>
  )
}
