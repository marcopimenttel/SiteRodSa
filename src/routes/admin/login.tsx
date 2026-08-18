import { useState, type FormEvent } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { api, setAdminToken } from '@/lib/api'
import { config } from '@/lib/config'
import { BrandLogo } from '@/components/BrandLogo'
import { HeroNameBackdrop } from '@/components/HeroNameBackdrop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import {
  FacebookIcon,
  FlickrIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from '@/components/icons/SocialIcons'

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
})

const easeOut = [0.22, 1, 0.36, 1] as const

const heroSocials = [
  {
    nome: 'WhatsApp',
    url: () => config.social.whatsapp,
    icon: WhatsAppIcon,
    ready: () => Boolean(config.social.whatsapp),
  },
  {
    nome: 'Instagram',
    url: () => config.social.instagram,
    icon: InstagramIcon,
    ready: () => Boolean(config.social.instagram),
  },
  {
    nome: 'Facebook',
    url: () => config.social.facebook,
    icon: FacebookIcon,
    ready: () => Boolean(config.social.facebook),
  },
  {
    nome: 'X',
    url: () => config.social.x,
    icon: XIcon,
    ready: () => Boolean(config.social.x),
  },
  {
    nome: 'TikTok',
    url: () => config.social.tiktok,
    icon: TikTokIcon,
    ready: () => Boolean(config.social.tiktok),
  },
  {
    nome: 'Flickr',
    url: () => config.social.flickr,
    icon: FlickrIcon,
    ready: () => Boolean(config.social.flickr),
  },
] as const

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
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: easeOut }}
            className="origin-left"
          >
            <motion.img
              src="/images/hero-marca.svg"
              alt="Deputado Estadual Rodrigo Sá — 11111"
              className="h-auto w-full max-w-[980px] origin-left object-contain object-left"
              fetchPriority="high"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.9,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easeOut }}
            className="-mt-1 sm:mt-1 lg:mt-5"
          >
            <img
              src="/images/hero-slogan.svg"
              alt="#Agora é pelo Amazonas"
              className="h-auto w-full max-w-[900px] object-contain object-left"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: easeOut }}
            className="mt-2 mb-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-3 sm:mb-6 sm:gap-4 lg:mt-6 lg:justify-start"
          >
            {heroSocials.map((rede) => {
              const Icon = rede.icon
              const href = rede.url()
              const active = rede.ready() && Boolean(href)

              return (
                <a
                  key={rede.nome}
                  href={active ? href : undefined}
                  target={active ? '_blank' : undefined}
                  rel={active ? 'noreferrer' : undefined}
                  aria-label={rede.nome}
                  onClick={(e) => {
                    if (!active) {
                      e.preventDefault()
                      toast.message(`${rede.nome} em breve`)
                    }
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:scale-110 hover:border-[#fdb814] hover:bg-[#fdb814] hover:text-[#021c4f] sm:h-12 sm:w-12"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              )
            })}
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
            className="w-full max-w-md rounded-2xl border border-white/15 bg-white p-5 text-navy-deep shadow-2xl sm:p-7"
          >
            <BrandLogo
              variant="azul"
              className="mb-4 h-9 w-auto max-w-[220px] object-contain object-left"
              priority
            />
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
