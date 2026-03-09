import { useState, useCallback } from 'react'

export function useCommandHistory(history: string[]) {
  const [historyIndex, setHistoryIndex] = useState(-1)

  const navigateHistory = useCallback(
    (direction: 'up' | 'down', currentInput: string): string => {
      if (direction === 'up') {
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          return history[newIndex] ?? currentInput
        }
        return history[historyIndex] ?? currentInput
      } else {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          return history[newIndex] ?? ''
        }
        setHistoryIndex(-1)
        return ''
      }
    },
    [history, historyIndex]
  )

  const resetIndex = useCallback(() => setHistoryIndex(-1), [])

  return { navigateHistory, resetIndex }
}
