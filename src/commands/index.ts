import type { CommandResult, TerminalState } from '@/types/terminal'
import { ls } from './ls'
import { cd } from './cd'
import { cat } from './cat'
import { grep } from './grep'
import { pwd } from './pwd'
import { whoami } from './whoami'
import { echo } from './echo'
import { history } from './history'
import { help } from './help'
import { clear } from './clear'

export function dispatch(raw: string, state: TerminalState): CommandResult {
  const trimmed = raw.trim()

  const [cmd, ...args] = trimmed.split(/\s+/)

  switch (cmd.toLowerCase()) {
    case 'ls':
      return ls()
    case 'cd':
      return cd(args, state)
    case 'cat':
      return cat(args)
    case 'grep':
      return grep(args)
    case 'pwd':
      return pwd(state)
    case 'whoami':
      return whoami()
    case 'echo':
      return echo(args)
    case 'history':
      return history(state)
    case 'help':
      return help()
    case 'clear':
      return clear()
    default:
      return {
        lines: [
          {
            type: 'error',
            content: `bash: ${cmd}: command not found`,
          },
          {
            type: 'system',
            content: "type 'help' for available commands",
          },
        ],
      }
  }
}
