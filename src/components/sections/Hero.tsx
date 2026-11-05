import { motion } from 'motion/react'
import { toast } from 'sonner'
import { config } from '@/lib/config'
import { HeroNameBackdrop } from '@/components/HeroNameBackdrop'
import {
  FacebookIcon,
  FlickrIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from '@/components/icons/SocialIcons'

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

function SocialButton({
  nome,
  href,
  active,
  Icon,
  size,
}: {
  nome: string
  href?: string
  active: boolean
  Icon: (typeof heroSocials)[number]['icon']
  size: 'desktop' | 'mobile'
}) {
  return (
    <a
      href={active && href ? href : undefined}
      target={active ? '_blank' : undefined}
      rel={active ? 'noreferrer' : undefined}
      aria-label={nome}
      onClick={(e) => {
        if (!active) {
          e.preventDefault()
          toast.message(`${nome} em breve`)
        }
      }}
      className={
        size === 'desktop'
          ? 'inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#fdb814] text-[#021c4f] shadow-md transition hover:scale-105 hover:bg-[#ffc933] sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]'
          : 'inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#fdb814] text-[#021c4f] shadow-lg transition hover:scale-105 hover:bg-[#ffc933] sm:h-15 sm:w-15'
      }
    >
      <Icon className={size === 'desktop' ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-7 w-7'} />
    </a>
  )
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden text-white"
      style={{ backgroundColor: '#021c4f' }}
    >
      {/* Base azul + Teatro Amazonas com fade direita → esquerda */}
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
            fetchPriority="high"
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

      {/* Nome contorno — por cima do Teatro, atrás da foto */}
      <HeroNameBackdrop />

      {/*
        Foto mobile: grande, com respiro elegante sob o header (sem cortar a cabeça).
        Desktop: coluna direita. Ícones em z maior, por cima da foto.
      */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-14 z-[1] flex items-end justify-center pt-3 sm:top-16 sm:pt-4 lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:w-[56%] lg:items-stretch lg:justify-start lg:pt-0"
      >
        <img
          src="/images/hero-foto.png?v=3"
          alt="Rodrigo Sá — Vereador de Manaus"
          className="relative z-10 h-full max-h-full w-auto max-w-[118%] origin-bottom scale-[1.12] object-contain object-bottom sm:max-w-[112%] sm:scale-[1.08] lg:mx-0 lg:h-full lg:w-full lg:max-w-none lg:origin-bottom lg:translate-y-[10%] lg:scale-100 lg:object-cover lg:object-[center_8%]"
          fetchPriority="high"
        />
      </motion.div>

      {/* Redes desktop — grid 3×2 à esquerda (ok) */}
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto hidden w-full max-w-[1400px] lg:block lg:px-8">
        <div className="flex h-full max-w-[48%] items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: easeOut }}
            className="pointer-events-auto grid grid-cols-3 gap-3 xl:gap-4"
          >
            {heroSocials.map((rede) => {
              const href = rede.url()
              const active = rede.ready() && Boolean(href)
              return (
                <SocialButton
                  key={rede.nome}
                  nome={rede.nome}
                  href={href}
                  active={active}
                  Icon={rede.icon}
                  size="desktop"
                />
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Redes mobile — por cima da foto, sem cortá-la */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.35, ease: easeOut }}
        className="absolute inset-x-0 bottom-5 z-30 flex justify-center px-3 lg:hidden"
      >
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          {heroSocials.map((rede) => {
            const href = rede.url()
            const active = rede.ready() && Boolean(href)
            return (
              <SocialButton
                key={rede.nome}
                nome={rede.nome}
                href={href}
                active={active}
                Icon={rede.icon}
                size="mobile"
              />
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
