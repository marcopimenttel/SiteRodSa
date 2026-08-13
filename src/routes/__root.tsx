import { useCallback, useEffect, useState } from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ComingSoon } from '@/components/ComingSoon'
import { isLaunched } from '@/lib/launch'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const [launched, setLaunched] = useState(() => isLaunched())

  useEffect(() => {
    if (launched) return
    const id = window.setInterval(() => {
      if (isLaunched()) setLaunched(true)
    }, 1000)
    return () => window.clearInterval(id)
  }, [launched])

  useEffect(() => {
    if (!launched) return
    document.title =
      'Rodrigo Sá 11111 | Candidato a Deputado Estadual — Amazonas'
  }, [launched])

  const handleLaunch = useCallback(() => {
    setLaunched(true)
  }, [])

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
      <CookieBanner />
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
