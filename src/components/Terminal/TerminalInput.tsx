import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
} from 'react'
import { useTerminal } from '@/hooks/useTerminal'
import { useCommandHistory } from '@/hooks/useCommandHistory'
import { projects } from '@/data/projects'

const COMMANDS = [
  'ls', 'cd', 'cat', 'grep', 'pwd', 'whoami', 'echo', 'history', 'clear', 'help',
  'ps', 'ifconfig', 'touch', 'mkdir', 'cp', 'mv', 'rm', 'man', 'sudo', 'resume', 'contact',
]
const PROJECT_NAMES = projects.map((p) => p.name)
const CAT_TARGETS = ['resume.txt', ...PROJECT_NAMES]

export function TerminalInput() {
  const { state, executeCommand } = useTerminal()
  const [value, setValue] = useState('')
  const [cursorPos, setCursorPos] = useState(0)
  const [cursorActive, setCursorActive] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { navigateHistory, resetIndex } = useCommandHistory(state.commandHistory)
  const tabMatchesRef = useRef<string[]>([])
  const tabIndexRef = useRef<number>(-1)

  const syncCursor = useCallback(() => {
    setCursorPos(inputRef.current?.selectionStart ?? 0)
  }, [])

  const stopBlink = useCallback(() => {
    setCursorActive(false)
    if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current)
    blinkTimeoutRef.current = setTimeout(() => setCursorActive(true), 500)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      stopBlink()

      if (e.key === 'Tab') {
        e.preventDefault()
        const spaceIdx = value.indexOf(' ')
        if (spaceIdx === -1) {
          // Complete command name
          const matches = COMMANDS.filter((c) => c.startsWith(value))
          if (matches.length === 0) return
          if (tabMatchesRef.current.join(',') !== matches.join(',')) {
            tabMatchesRef.current = matches
            tabIndexRef.current = -1
          }
          tabIndexRef.current = (tabIndexRef.current + 1) % matches.length
          setValue(matches[tabIndexRef.current])
        } else {
          // Complete project name for cd/cat
          const cmd = value.slice(0, spaceIdx)
          if (cmd !== 'cd' && cmd !== 'cat') return
          const partial = value.slice(spaceIdx + 1)
          const pool = cmd === 'cat' ? CAT_TARGETS : PROJECT_NAMES
          const matches = pool.filter((n) => n.startsWith(partial))
          if (matches.length === 0) return
          if (tabMatchesRef.current.join(',') !== matches.join(',')) {
            tabMatchesRef.current = matches
            tabIndexRef.current = -1
          }
          tabIndexRef.current = (tabIndexRef.current + 1) % matches.length
          setValue(`${cmd} ${matches[tabIndexRef.current]}`)
        }
        return
      }

      // Reset tab cycle on any other key
      tabMatchesRef.current = []
      tabIndexRef.current = -1

      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        executeCommand(value ? `${value} ^C` : '^C')
        setValue('')
        resetIndex()
        return
      }

      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault()
        if (!value) {
          executeCommand('exit')
        }
        return
      }

      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        executeCommand('clear')
        return
      }

      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        setValue('')
        return
      }

      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault()
        inputRef.current?.setSelectionRange(0, 0)
        return
      }

      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault()
        inputRef.current?.setSelectionRange(value.length, value.length)
        return
      }

      if (e.key === 'Enter') {
        executeCommand(value)
        setValue('')
        setCursorPos(0)
        resetIndex()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = navigateHistory('up', value)
        setValue(prev)
        setTimeout(syncCursor)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = navigateHistory('down', value)
        setValue(next)
        setTimeout(syncCursor)
      } else {
        setTimeout(syncCursor)
      }
    },
    [value, executeCommand, navigateHistory, resetIndex, stopBlink, syncCursor]
  )

  const prompt = `visitor@ytolstyk:${state.currentPath}$`
  const before = value.slice(0, cursorPos)
  const atCursor = value[cursorPos] ?? ' '
  const after = value.slice(cursorPos + 1)

  return (
    <div
      className="terminal-input-row"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="prompt">{prompt}&nbsp;</span>
      <div className="input-display">
        <span className="input-text">{before}</span>
        <span className={`cursor${cursorActive ? ' cursor--blink' : ''}`}>{atCursor}</span>
        <span className="input-text">{after}</span>
      </div>
      <input
        ref={inputRef}
        className="hidden-input"
        value={value}
        onChange={(e) => { setValue(e.target.value); setCursorPos(e.target.selectionStart ?? e.target.value.length) }}
        onKeyDown={handleKeyDown}
        onSelect={syncCursor}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="terminal input"
      />
    </div>
  )
}
