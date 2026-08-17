import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { MoldurasCta } from '@/components/MoldurasCta'

const STORAGE_KEY = 'rodrigo-sa-molduras-popup-seen'
const easeOut = [0.22, 1, 0.36, 1] as const

export function MoldurasPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const id = window.setTimeout(() => setOpen(true), 900)
    return () => window.clearTimeout(id)
  }, [])

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-[#021c4f]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="molduras-popup-title"
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#021c4f] p-6 text-white shadow-2xl sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#fdb814]/20 blur-3xl"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Fechar popup"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#fdb814]">
              Apoie com a sua foto
            </p>
            <h2
              id="molduras-popup-title"
              className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Coloque o Rodrigo Sá na sua moldura digital
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
              Em poucos cliques, você cria uma arte pronta para postar e espalhar a campanha
              11111 pelo Amazonas.
            </p>

            <div className="mt-6">
              <MoldurasCta fullWidth size="lg" />
            </div>

            <button
              type="button"
              onClick={close}
              className="mt-4 w-full text-center text-sm font-medium text-white/55 transition hover:text-white"
            >
              Agora não
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
