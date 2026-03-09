import type { CommandResult } from '@/types/terminal'

export function clear(): CommandResult {
  return {
    lines: [],
    shouldClear: true,
    setGrepFilter: null,
  }
}
