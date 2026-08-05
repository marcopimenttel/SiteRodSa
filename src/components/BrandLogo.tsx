import { cn } from '@/lib/utils'

type Props = {
  /** branco/campanha = RODRIGO SA-03 (fundo escuro) | azul = marca azul (fundo claro) */
  variant?: 'azul' | 'branco' | 'campanha'
  className?: string
  priority?: boolean
}

export function BrandLogo({ variant = 'campanha', className, priority = false }: Props) {
  const src =
    variant === 'azul' ? '/images/marca-azul.png' : '/images/marca-campanha.svg'

  return (
    <img
      src={src}
      alt="Rodrigo Sá"
      className={cn('h-auto w-auto object-contain', className)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
