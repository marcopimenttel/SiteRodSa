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
    <div
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-white lg:block"
      style={{ backgroundColor: '#021c4f' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 78% 42%, rgba(55, 110, 200, 0.35) 0%, transparent 58%),
              radial-gradient(ellipse 55% 45% at 18% 70%, rgba(8, 40, 110, 0.7) 0%, transparent 55%),
              radial-gradient(ellipse 40% 35% at 55% 15%, rgba(253, 184, 20, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, #042a6e 0%, #021c4f 55%, #011233 100%)
            `,
          }}
        />
      </div>

      {/* Foto — mesmo tamanho/posição do Hero */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
        className="pointer-events-none relative order-last z-[1] mt-auto w-full max-lg:mx-auto max-lg:flex max-lg:w-[115%] max-lg:max-w-none max-lg:items-end max-lg:justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[56%]"
      >
        <img
          src="/images/hero-foto.png?v=3"
          alt="Rodrigo Sá"
          className="relative z-10 mx-auto h-auto w-full max-w-[520px] scale-110 object-contain object-bottom sm:max-w-[560px] lg:mx-0 lg:h-full lg:max-w-none lg:w-full lg:origin-bottom lg:translate-y-[10%] lg:scale-100 lg:object-cover lg:object-[center_8%]"
          fetchPriority="high"
        />
      </motion.div>

      <div className="relative z-10 order-first mx-auto flex w-full max-w-[1400px] flex-1 items-start px-4 pb-2 pt-16 sm:px-6 lg:min-h-[100svh] lg:items-center lg:px-8 lg:pb-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: easeOut }}
          className="w-full max-w-xl lg:max-w-[48%]"
        >
          <h1 className="font-inter text-5xl font-black uppercase italic leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Rodrigo{' '}
            <span className="text-[#fdb814]">Sá</span>
          </h1>

          <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-white/75 sm:text-lg">
            Em breve, você vai descobrir abaixo os 5 números, para uma nova
            etapa pelo Amazonas.
          </p>

          <div
            className="mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-10 sm:gap-3 lg:justify-start"
            aria-label="Número da campanha será revelado em breve"
          >
            {CAMPAIGN_DIGITS.map((digit, i) => (
              <div
                key={i}
                className="flex h-[4.75rem] w-[3.35rem] items-center justify-center rounded-xl border-2 border-white/30 bg-white/[0.07] sm:h-24 sm:w-[4.25rem] lg:h-28 lg:w-20"
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
                      className="font-inter text-4xl font-black tabular-nums text-[#fdb814] sm:text-5xl lg:text-6xl"
                    >
                      {digit}
                    </motion.span>
                  ) : (
                    <motion.span
                      key={`empty-${i}`}
                      exit={{ opacity: 0 }}
                      className="block h-3 w-3 rounded-full bg-white/35"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {!revealing && (
            <div className="mt-8 grid max-w-lg grid-cols-4 gap-2.5 sm:mt-10 sm:gap-3">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-1.5 py-3 text-center sm:px-2 sm:py-4"
                >
                  <p className="font-inter text-2xl font-black tabular-nums tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {unit.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-xs">
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
              className="mt-8 text-base font-semibold text-[#fdb814] sm:text-lg"
            >
              A campanha começa agora.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
