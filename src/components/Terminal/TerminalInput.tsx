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

  // Set both the display state and the actual uncontrolled input value
  const setInputValue = useCallback((v: string) => {
    setValue(v)
    if (inputRef.current) inputRef.current.value = v
  }, [])

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
          setInputValue(matches[tabIndexRef.current])
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
          setInputValue(`${cmd} ${matches[tabIndexRef.current]}`)
        }
        return
      }

      // Reset tab cycle on any other key
      tabMatchesRef.current = []
      tabIndexRef.current = -1

      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        executeCommand(value ? `${value} ^C` : '^C')
        setInputValue('')
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
        setInputValue('')
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
        setInputValue('')
        setCursorPos(0)
        resetIndex()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = navigateHistory('up', value)
        setInputValue(prev)
        setTimeout(syncCursor)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = navigateHistory('down', value)
        setInputValue(next)
        setTimeout(syncCursor)
      }
    },
    [value, executeCommand, navigateHistory, resetIndex, stopBlink, syncCursor, setInputValue]
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
        defaultValue=""
        onChange={(e) => {
          const newValue = e.target.value
          const sel = e.target.selectionStart ?? newValue.length
          setValue(newValue)
          setCursorPos(sel === 0 && newValue.length > 0 ? newValue.length : sel)
        }}
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
