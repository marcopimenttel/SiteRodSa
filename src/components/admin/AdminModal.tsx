import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const easeOut = [0.22, 1, 0.36, 1] as const

type AdminModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  wide?: boolean
}

export function AdminModal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  wide,
}: AdminModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-[#021c4f]/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className={cn(
              'relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:p-7',
              wide ? 'max-w-2xl' : 'max-w-lg',
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-navy-deep"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-8">
              <h3 id="admin-modal-title" className="font-display text-xl font-semibold text-navy-deep">
                {title}
              </h3>
              {description ? (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>

            <div className="mt-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

type ConfirmModalProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
  loading?: boolean
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Excluir',
  onConfirm,
  onClose,
  loading,
}: ConfirmModalProps) {
  return (
    <AdminModal open={open} onClose={onClose} title={title} description={description}>
      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          className="bg-destructive text-white hover:bg-destructive/90"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Excluindo...' : confirmLabel}
        </Button>
      </div>
    </AdminModal>
  )
}
