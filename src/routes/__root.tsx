import { useCallback, useEffect, useState } from 'react'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ComingSoon } from '@/components/ComingSoon'
import { MoldurasPopup } from '@/components/MoldurasPopup'
import { useTrackPageView } from '@/hooks/useTrackPageView'
import { canShowFullSite, isLaunched } from '@/lib/launch'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAdmin = pathname.startsWith('/admin')
  const [launched, setLaunched] = useState(() => canShowFullSite())

  useTrackPageView(launched && !isAdmin)

  useEffect(() => {
    if (launched || isAdmin) return
    const id = window.setInterval(() => {
      if (isLaunched()) setLaunched(true)
    }, 1000)
    return () => window.clearInterval(id)
  }, [launched, isAdmin])

  useEffect(() => {
    if (!launched || isAdmin) return
    document.title =
      'Rodrigo Sá 11111 | Candidato a Deputado Estadual — Amazonas'
  }, [launched, isAdmin])

  const handleLaunch = useCallback(() => {
    setLaunched(true)
  }, [])

  if (isAdmin) {
    return (
      <>
        <Outlet />
        <Toaster position="top-center" richColors closeButton />
      </>
    )
  }

  if (!launched) {
    return <ComingSoon onLaunch={handleLaunch} />
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton floating />
      <MoldurasPopup />
      <CookieBanner />
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
