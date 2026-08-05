import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

type Variant = 'up' | 'left' | 'right' | 'fade'

type Props = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  variant?: Variant
}

const initials: Record<Variant, { opacity: number; x?: number; y?: number }> = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
  fade: { opacity: 0 },
}

export function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className,
  ...props
}: Props) {
  return (
    <motion.div
      initial={initials[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
