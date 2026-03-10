import type { CommandResult, TerminalState } from '@/types/terminal'
import { git } from './git'
import { npm } from './npm'
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
import { exit } from './exit'
import { ps } from './ps'
import { ifconfig } from './ifconfig'
import { touch } from './touch'
import { mkdir } from './mkdir'
import { cp } from './cp'
import { mv } from './mv'
import { rm } from './rm'
import { man } from './man'
import { sudo } from './sudo'

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
    case 'exit':
      return exit()
    case 'ps':
      return ps()
    case 'ifconfig':
      return ifconfig()
    case 'touch':
      return touch(args)
    case 'mkdir':
      return mkdir(args)
    case 'cp':
      return cp(args)
    case 'mv':
      return mv(args)
    case 'rm':
      return rm(args)
    case 'man':
      return man(args)
    case 'sudo':
      return sudo(args)
    case 'git':
      return git(args)
    case 'npm':
      return npm(args, state)
    default:
      if (trimmed.endsWith('^C')) {
        return { lines: [] }
      }
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
