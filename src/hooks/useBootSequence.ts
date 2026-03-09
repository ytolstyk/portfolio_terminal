import { useEffect, useRef } from 'react'
import { useTerminalContext } from '@/context/TerminalContext'
import type { OutputLine } from '@/types/terminal'
import { dispatch as dispatchCommand } from '@/commands/index'

const BOOT_LINES = [
  'Initializing terminal...',
  'Loading user profile...',
  'Mounting filesystem...',
  'Connecting to ytolstyk.dev...',
  'Fetching repository index...',
  'Establishing secure channel...',
  'Verifying identity...',
  'connected.',
]

function randomDelay() {
  return 80 + Math.random() * 70
}

export function useBootSequence() {
  const { state, dispatch } = useTerminalContext()
  const started = useRef(false)

  useEffect(() => {
    if (started.current || state.phase !== 'boot') return
    started.current = true

    let index = 0

    function pushNext() {
      if (index >= BOOT_LINES.length) {
        dispatch({ type: 'BOOT_COMPLETE' })

        // Auto-run ls after boot
        setTimeout(() => {
          const lsResult = dispatchCommand('ls', {
            phase: 'ready',
            lines: [],
            commandHistory: [],
            currentPath: '~',
            grepFilter: null,
          })
          const withIds: OutputLine[] = lsResult.lines.map((l) => ({
            ...l,
            id: crypto.randomUUID(),
          }))
          dispatch({ type: 'PUSH_LINES', lines: withIds })
        }, 200)

        return
      }

      const line: OutputLine = {
        id: crypto.randomUUID(),
        type: index === BOOT_LINES.length - 1 ? 'success' : 'system',
        content: BOOT_LINES[index],
      }

      dispatch({ type: 'PUSH_LINES', lines: [line] })
      index++
      setTimeout(pushNext, randomDelay())
    }

    setTimeout(pushNext, randomDelay())
  }, [state.phase, dispatch])
}
