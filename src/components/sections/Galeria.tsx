import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { carrosselFotos } from '@/data/carrossel'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 3500

export function Galeria() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = carrosselFotos.length

  const go = (dir: 1 | -1) => {
    setIndex((current) => (current + dir + total) % total)
  }

  const goTo = (i: number) => setIndex(i)

  useEffect(() => {
    if (paused || total <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, total])

  const prev = carrosselFotos[(index - 1 + total) % total]
  const current = carrosselFotos[index]
  const next = carrosselFotos[(index + 1) % total]

  return (
    <section id="galeria" className="section-pad bg-[#021c4f] text-white">
      <div className="container-site">
        <Reveal variant="fade">
          <div className="max-w-2xl text-left lg:mx-auto lg:text-center">
            <p className="section-eyebrow text-gold">Nos bastidores</p>
            <h2 className="section-title">
              Momentos com o povo do{' '}
              <span className="font-brush text-4xl font-normal text-gold sm:text-5xl">
                Amazonas
              </span>
            </h2>
            <p className="mt-4 text-white/70">
              Uma galeria das ruas, das comunidades e dos encontros que marcam essa caminhada.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="relative flex items-center justify-center gap-3 sm:gap-4 lg:gap-6">
              {/* Peek anterior (desktop) */}
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={() => go(-1)}
                className="relative hidden h-48 w-[18%] overflow-hidden rounded-2xl opacity-50 transition hover:opacity-80 lg:block lg:h-64"
              >
                <img src={prev} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#021c4f]/35" />
              </button>

              {/* Foto principal */}
              <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl sm:aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={current}
                    alt={`Momento da campanha ${index + 1} de ${total}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#021c4f]/70 to-transparent" />

                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#021c4f]/55 text-white backdrop-blur-sm transition hover:bg-[#fdb814] hover:text-[#021c4f] sm:left-4 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Próxima"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#021c4f]/55 text-white backdrop-blur-sm transition hover:bg-[#fdb814] hover:text-[#021c4f] sm:right-4 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <p className="absolute bottom-3 right-4 text-xs font-medium text-white/80 sm:bottom-4">
                  {index + 1} / {total}
                </p>
              </div>

              {/* Peek seguinte (desktop) */}
              <button
                type="button"
                aria-label="Próxima foto"
                onClick={() => go(1)}
                className="relative hidden h-48 w-[18%] overflow-hidden rounded-2xl opacity-50 transition hover:opacity-80 lg:block lg:h-64"
              >
                <img src={next} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#021c4f]/35" />
              </button>
            </div>

            {/* Indicadores */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {carrosselFotos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ir para foto ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === index
                      ? 'w-7 bg-[#fdb814]'
                      : 'w-2 bg-white/35 hover:bg-white/60',
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
