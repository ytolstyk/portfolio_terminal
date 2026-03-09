import type { OutputLine } from '@/types/terminal'
import { renderWithLinks } from '@/lib/renderWithLinks'

interface Props {
  line: OutputLine
}

export function TerminalOutputLine({ line }: Props) {
  return (
    <div className={`output-line output-line--${line.type}`}>
      {line.content ? renderWithLinks(line.content) : '\u00A0'}
    </div>
  )
}
