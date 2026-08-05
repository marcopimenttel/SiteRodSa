import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'

type Props = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

function formatNumber(n: number) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(n))
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1600,
  className,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    let frame = 0

    const tick = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(current)}
      {suffix}
    </span>
  )
}
