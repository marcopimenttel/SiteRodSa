import { Outlet, createFileRoute, redirect, useRouterState } from '@tanstack/react-router'
import { getAdminToken } from '@/lib/api'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
  beforeLoad: ({ location }) => {
    const isLogin = location.pathname === '/admin/login'
    const token = typeof window !== 'undefined' ? getAdminToken() : null
    if (!isLogin && !token) {
      throw redirect({ to: '/admin/login' })
    }
    if (isLogin && token) {
      throw redirect({ to: '/admin' })
    }
  },
})

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isLogin = pathname === '/admin/login'

  return (
    <div className="min-h-svh bg-[#f3f6fb] text-navy-deep">
      {!isLogin && (
        <header className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Área administrativa
              </p>
              <h1 className="font-display text-xl font-semibold">Campanha Rodrigo Sá</h1>
            </div>
            <a href="/" className="text-sm font-medium text-muted-foreground hover:text-navy-deep">
              Ver site
            </a>
          </div>
        </header>
      )}
      <Outlet />
    </div>
  )
}
