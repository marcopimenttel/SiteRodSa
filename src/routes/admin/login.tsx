import { useState, type FormEvent } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { api, setAdminToken } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { BrandLogo } from '@/components/BrandLogo'

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api.login(username.trim(), password)
      setAdminToken(data.token)
      toast.success('Login realizado')
      await navigate({ to: '/admin' })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Falha no login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10"
      style={{ backgroundColor: '#021c4f' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 78% 42%, rgba(55, 110, 200, 0.35) 0%, transparent 58%),
              radial-gradient(ellipse 55% 45% at 18% 70%, rgba(8, 40, 110, 0.7) 0%, transparent 55%),
              radial-gradient(ellipse 40% 35% at 55% 15%, rgba(253, 184, 20, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, #042a6e 0%, #021c4f 55%, #011233 100%)
            `,
          }}
        />
        <div
          className="absolute -right-[10%] top-[8%] h-[70vmin] w-[70vmin] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(120, 170, 255, 0.45) 0%, rgba(20, 70, 160, 0.2) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute -left-[15%] bottom-[-10%] h-[55vmin] w-[55vmin] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(30, 80, 180, 0.5) 0%, rgba(2, 28, 79, 0) 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)',
          }}
        />
      </div>

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
      >
        <BrandLogo
          variant="campanha"
          className="mb-5 h-10 w-auto max-w-[240px] object-contain object-left"
        />
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin</p>
        <h1 className="font-display mt-2 text-2xl font-semibold text-navy-deep">
          Entrar no painel
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Usuário padrão: <strong>admin</strong> · senha padrão: <strong>admin</strong>
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
