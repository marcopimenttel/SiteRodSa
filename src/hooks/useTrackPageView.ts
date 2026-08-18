import { useEffect } from 'react'
import { api } from '@/lib/api'
import { getVisitorId } from '@/lib/visitor'

/** Conta 1 visualização única por dispositivo/navegador */
export function useTrackPageView(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const visitorId = getVisitorId()
    api.trackView(visitorId).catch(() => {
      // silencioso — não quebra o site se a API estiver offline
    })
  }, [enabled])
}
