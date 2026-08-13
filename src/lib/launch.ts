/** Liberação oficial: 16/08/2026 00:01 — America/Manaus (UTC-4) */
export const LAUNCH_AT = new Date('2026-08-16T00:01:00-04:00')

export const CAMPAIGN_DIGITS = ['1', '1', '1', '1', '1'] as const

export function isLaunched(now: Date = new Date()): boolean {
  return now.getTime() >= LAUNCH_AT.getTime()
}

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

export function getCountdown(now: Date = new Date()): CountdownParts {
  const totalMs = Math.max(0, LAUNCH_AT.getTime() - now.getTime())
  const totalSeconds = Math.floor(totalMs / 1000)
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3_600)
  const minutes = Math.floor((totalSeconds % 3_600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds, totalMs }
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}
