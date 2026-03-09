import { ScrollArea } from '@/components/ui/scroll-area'
import { TerminalOutputLine } from './TerminalOutputLine'
import { useAutoScroll } from '@/hooks/useAutoScroll'
import type { OutputLine } from '@/types/terminal'

interface Props {
  lines: OutputLine[]
  grepFilter: string | null
}

export function TerminalOutput({ lines, grepFilter }: Props) {
  const visibleLines = grepFilter
    ? lines.filter((l) =>
        l.content.toLowerCase().includes(grepFilter.toLowerCase())
      )
    : lines

  const bottomRef = useAutoScroll(visibleLines)

  return (
    <ScrollArea className="terminal-output">
      <div className="terminal-output-inner">
        {visibleLines.map((line) => (
          <TerminalOutputLine key={line.id} line={line} />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
