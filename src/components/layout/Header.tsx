import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { BrandLogo } from '@/components/BrandLogo'
import { MoldurasCta } from '@/components/MoldurasCta'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#inicio', label: 'Início' },
  { href: '/#historia', label: 'Minha História' },
  { href: '/#trabalho', label: 'Trabalho' },
  { href: '/#propostas', label: 'Propostas' },
  { href: '/#contato', label: 'Contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-0 bg-[#021c4f]/90 backdrop-blur-md">
      <div className="container-site relative flex h-14 items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link to="/" className="relative z-10 flex min-w-0 items-center gap-3 text-white">
          <BrandLogo
            variant="branco"
            priority
            className="h-9 w-auto max-w-[180px] sm:h-11 sm:max-w-[240px] lg:h-14 lg:max-w-[320px]"
          />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white xl:px-3"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <MoldurasCta
            size="sm"
            className="hidden max-w-[220px] truncate sm:inline-flex lg:max-w-none"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 shrink-0 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? (
              <X className="h-9 w-9" strokeWidth={2.5} />
            ) : (
              <Menu className="h-9 w-9" strokeWidth={2.5} />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-0 bg-[#021c4f] lg:hidden"
          >
            <nav className="container-site flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10',
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 space-y-2 px-1">
                <MoldurasCta fullWidth />
                <WhatsAppButton className="w-full" mode="business" label="Fale Comigo" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
