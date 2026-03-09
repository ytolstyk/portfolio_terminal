import { useEffect, useRef } from 'react'
import type { OutputLine } from '@/types/terminal'

export function useAutoScroll(lines: OutputLine[]) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [lines])

  return bottomRef
}
