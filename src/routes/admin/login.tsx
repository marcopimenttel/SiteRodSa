import { useState, type FormEvent } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { api, setAdminToken } from '@/lib/api'
import { HeroNameBackdrop } from '@/components/HeroNameBackdrop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
})

const easeOut = [0.22, 1, 0.36, 1] as const

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
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-white lg:block"
      style={{ backgroundColor: '#021c4f' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 78% 42%, rgba(55, 110, 200, 0.35) 0%, transparent 58%),
              radial-gradient(ellipse 55% 45% at 18% 70%, rgba(8, 40, 110, 0.7) 0%, transparent 55%),
              radial-gradient(circle at 50% 50%, #042a6e 0%, #021c4f 55%, #011233 100%)
            `,
          }}
        />
        <div className="absolute inset-0">
          <img
            src="/images/teatroam.webp"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to left, rgba(2,28,79,0.15) 0%, rgba(2,28,79,0.45) 35%, rgba(2,28,79,0.82) 68%, #021c4f 100%)',
            }}
          />
        </div>
      </div>

      <HeroNameBackdrop />

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
        className="pointer-events-none relative order-last z-[1] mt-auto w-full max-lg:mx-auto max-lg:flex max-lg:w-[115%] max-lg:max-w-none max-lg:items-end max-lg:justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[56%]"
      >
        <img
          src="/images/hero-foto.png?v=3"
          alt="Rodrigo Sá"
          className="relative z-10 mx-auto h-auto w-full max-w-[520px] scale-110 object-contain object-bottom sm:max-w-[560px] lg:mx-0 lg:h-full lg:max-w-none lg:w-full lg:origin-bottom lg:translate-y-[10%] lg:scale-100 lg:object-cover lg:object-[center_8%]"
          fetchPriority="high"
        />
      </motion.div>

      <div className="relative z-10 order-first mx-auto flex w-full max-w-[1400px] flex-1 items-start px-4 pb-8 pt-10 sm:px-6 lg:min-h-[100svh] lg:items-center lg:px-8 lg:pb-16 lg:pt-20">
        <div className="w-full max-w-xl lg:max-w-[48%]">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
            className="w-full max-w-md rounded-2xl border border-white/15 bg-white p-5 text-navy-deep shadow-2xl sm:p-7"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#021c4f]/70">
              Admin
            </p>
            <h1 className="font-display mt-1 text-2xl font-semibold text-[#021c4f]">
              Entrar no painel
            </h1>

            <div className="mt-5 space-y-4">
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
              <Button
                type="submit"
                className="w-full bg-[#021c4f] hover:bg-[#032a6e]"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
