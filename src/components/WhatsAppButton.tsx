import { MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import {
  hasWhatsAppChannel,
  whatsappBusinessUrl,
  whatsappChannelUrl,
} from '@/lib/config'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  floating?: boolean
  label?: string
  /** channel = canal oficial | business = WhatsApp Business (menu) */
  mode?: 'channel' | 'business'
}

export function WhatsAppButton({
  className,
  floating = false,
  label = 'Fale Comigo',
  mode,
}: Props) {
  const resolvedMode = mode ?? (floating ? 'channel' : 'business')

  const handleClick = () => {
    if (resolvedMode === 'channel') {
      const url = whatsappChannelUrl()
      if (!url) {
        toast.message('WhatsApp em breve')
        return
      }
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }

    const url = whatsappBusinessUrl()
    if (!url) {
      toast.message('WhatsApp em breve', {
        description: 'O número oficial da campanha (WhatsApp Business) será divulgado em breve.',
      })
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (floating) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Canal oficial no WhatsApp"
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          !hasWhatsAppChannel() && 'opacity-90',
          className,
        )}
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#1ebe57]',
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </button>
  )
}
