import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
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
