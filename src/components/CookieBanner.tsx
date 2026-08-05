import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

const KEY = 'rodrigo-sa-cookies-ok'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="container-site flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies essenciais para melhorar sua experiência. Ao continuar, você concorda com
          nossa{' '}
          <Link to="/privacidade" className="font-medium text-primary underline-offset-2 hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <Button
          onClick={() => {
            localStorage.setItem(KEY, '1')
            setVisible(false)
          }}
          className="shrink-0"
        >
          Entendi
        </Button>
      </div>
    </div>
  )
}
