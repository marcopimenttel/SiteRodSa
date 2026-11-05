import { cn } from '@/lib/utils'

type Props = {
  /** branco = logo clara (fundo escuro) | azul = logo azul (fundo claro) */
  variant?: 'azul' | 'branco'
  className?: string
  priority?: boolean
}

export function BrandLogo({ variant = 'branco', className, priority = false }: Props) {
  const src =
    variant === 'azul' ? '/images/logo-vereador.svg' : '/images/logo-vereador-branco.svg'

  return (
    <img
      src={src}
      alt="Rodrigo Sá — Vereador de Manaus"
      className={cn('h-auto w-auto object-contain', className)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
