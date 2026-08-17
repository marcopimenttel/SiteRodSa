import { Frame } from 'lucide-react'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'

type MoldurasCtaProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const sizeClass = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
} as const

export function MoldurasCta({
  className,
  size = 'md',
  fullWidth = false,
}: MoldurasCtaProps) {
  return (
    <a
      href={config.moldurasUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md bg-[#fdb814] font-bold text-[#021c4f] shadow-[0_8px_24px_rgba(253,184,20,0.35)] transition hover:scale-[1.03] hover:bg-[#ffc93a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb814]',
        sizeClass[size],
        fullWidth && 'w-full',
        className,
      )}
    >
      <Frame className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
      Fazer Molduras Agora
    </a>
  )
}
