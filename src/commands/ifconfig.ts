import type { CommandResult } from '@/types/terminal'

export function ifconfig(): CommandResult {
  return {
    lines: [
      { type: 'output', content: 'lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384' },
      { type: 'output', content: '     inet 127.0.0.1 netmask 0xff000000' },
      { type: 'output', content: '     inet6 ::1 prefixlen 128' },
      { type: 'output', content: '     (yes, I talk to myself a lot)' },
      { type: 'output', content: '' },
      { type: 'output', content: 'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500' },
      { type: 'output', content: '     ether de:ad:be:ef:ca:fe' },
      { type: 'output', content: '     inet 192.168.1.42 netmask 0xffffff00 broadcast 192.168.1.255' },
      { type: 'output', content: '     inet6 fe80::1%en0 prefixlen 64 scopeid 0x4' },
      { type: 'output', content: '     media: autoselect (1000baseT <full-duplex>)' },
      { type: 'output', content: '     status: active (barely)' },
      { type: 'output', content: '' },
      { type: 'output', content: 'vibes0: flags=1337<GOOD,IMMACULATE> mtu 9000' },
      { type: 'output', content: '     status: always active' },
      { type: 'output', content: '' },
    ],
  }
}
