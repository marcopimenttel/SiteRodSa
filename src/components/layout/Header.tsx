import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { BrandLogo } from '@/components/BrandLogo'
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
      <div className="container-site relative flex h-14 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="relative z-10 flex min-w-0 items-center gap-3 text-white">
          <BrandLogo
            variant="branco"
            priority
            className="h-9 w-auto max-w-[220px] sm:h-11 sm:max-w-[280px] lg:h-14 lg:max-w-[400px]"
          />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile: só WhatsApp + menu */}
        <div className="relative z-10 flex items-center gap-1 lg:hidden">
          <WhatsAppButton label="WhatsApp" className="h-9 px-3 text-xs" />
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X /> : <Menu />}
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
