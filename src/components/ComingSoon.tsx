import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CAMPAIGN_DIGITS,
  getCountdown,
  isLaunched,
  pad2,
  type CountdownParts,
} from '@/lib/launch'

const easeOut = [0.22, 1, 0.36, 1] as const

type ComingSoonProps = {
  onLaunch: () => void
}

export function ComingSoon({ onLaunch }: ComingSoonProps) {
  const [parts, setParts] = useState<CountdownParts>(() => getCountdown())
  const [revealing, setRevealing] = useState(false)

  useEffect(() => {
    document.title = 'Rodrigo Sá | Em breve'
  }, [])

  useEffect(() => {
    if (revealing) return

    const tick = () => {
      if (isLaunched()) {
        setRevealing(true)
        return
      }
      setParts(getCountdown())
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [revealing])

  useEffect(() => {
    if (!revealing) return
    const id = window.setTimeout(() => onLaunch(), 2200)
    return () => window.clearTimeout(id)
  }, [revealing, onLaunch])

  const units = [
    { label: 'Dias', value: pad2(parts.days) },
    { label: 'Horas', value: pad2(parts.hours) },
    { label: 'Min', value: pad2(parts.minutes) },
    { label: 'Seg', value: pad2(parts.seconds) },
  ]

  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#021c4f] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 78% 42%, rgba(55, 110, 200, 0.32) 0%, transparent 58%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(8, 40, 110, 0.65) 0%, transparent 55%),
              radial-gradient(circle at 50% 50%, #042a6e 0%, #021c4f 55%, #011233 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-8 px-5 py-12 sm:gap-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-0 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="w-full max-w-md text-center lg:max-w-[46%] lg:pb-20 lg:text-left"
        >
          <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Rodrigo Sá
          </p>
          <p className="mt-3 text-base font-medium leading-relaxed text-white/70 sm:text-lg">
            Em breve, uma nova etapa pelo Amazonas.
          </p>

          <div
            className="mt-8 flex justify-center gap-2.5 sm:gap-3 lg:justify-start"
            aria-label="Número da campanha será revelado em breve"
          >
            {CAMPAIGN_DIGITS.map((digit, i) => (
              <div
                key={i}
                className="flex h-14 w-11 items-center justify-center rounded-lg border border-white/25 bg-white/5 sm:h-16 sm:w-12"
              >
                <AnimatePresence mode="wait">
                  {revealing ? (
                    <motion.span
                      key={`d-${digit}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.18 * i,
                        duration: 0.35,
                        ease: easeOut,
                      }}
                      className="font-display text-3xl font-bold text-[#fdb814] sm:text-4xl"
                    >
                      {digit}
                    </motion.span>
                  ) : (
                    <motion.span
                      key={`empty-${i}`}
                      exit={{ opacity: 0 }}
                      className="block h-2 w-2 rounded-full bg-white/20"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {!revealing && (
            <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center sm:px-3 sm:py-4"
                >
                  <p className="font-display text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">
                    {unit.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {revealing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-sm font-medium text-[#fdb814]"
            >
              A campanha começa agora.
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
          className="pointer-events-none relative w-full max-w-[420px] lg:max-w-[48%]"
        >
          <img
            src="/images/hero-foto.png?v=3"
            alt="Rodrigo Sá"
            className="mx-auto h-auto w-full object-contain object-bottom drop-shadow-2xl"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </div>
  )
}
