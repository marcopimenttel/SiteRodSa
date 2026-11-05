import { useEffect } from 'react'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useTrackPageView } from '@/hooks/useTrackPageView'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAdmin = pathname.startsWith('/admin')

  // Conta visitas no site (admin não conta)
  useTrackPageView(!isAdmin)

  useEffect(() => {
    if (isAdmin) return
    document.title = 'Rodrigo Sá | Vereador de Manaus'
  }, [isAdmin])

  if (isAdmin) {
    return (
      <>
        <Outlet />
        <Toaster position="top-center" richColors closeButton />
      </>
    )
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton floating />
      <CookieBanner />
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
