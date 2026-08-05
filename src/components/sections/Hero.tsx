import { motion } from 'motion/react'
import { toast } from 'sonner'
import { config, hasWhatsApp, whatsappUrl } from '@/lib/config'
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
    url: () => whatsappUrl() ?? '',
    icon: WhatsAppIcon,
    ready: () => hasWhatsApp(),
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

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-white lg:block"
      style={{ backgroundColor: '#021c4f' }}
    >
      {/* Textura 3D suave no fundo */}
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

      {/*
        AJUSTES DA FOTO (desktop — prefixo lg:):
        - w-[56%] ................. largura da área
        - lg:scale-112 ............ zoom (↑ aproxima | ↓ afasta)
        - lg:translate-y-[10%] .... desce a foto (↑ % = desce mais | -translate-y sobe)
        - lg:origin-bottom ........ cresce a partir de baixo (encosta no rodapé)
        - object-[center_8%] ...... foco do rosto no crop
        Mobile: foto fica no rodapé do hero (order-last + mt-auto)
      */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
        className="pointer-events-none relative order-last z-[1] mt-auto w-full max-lg:mx-auto max-lg:flex max-lg:w-[115%] max-lg:max-w-none max-lg:items-end max-lg:justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[56%]"
      >
        <img
          src="/images/hero-foto.png?v=3"
          alt="Rodrigo Sá — candidato a Deputado Estadual"
          className="relative z-10 mx-auto h-auto w-full max-w-[520px] scale-110 object-contain object-bottom sm:max-w-[560px] lg:mx-0 lg:h-full lg:max-w-none lg:w-full lg:origin-bottom lg:translate-y-[10%] lg:scale-100 lg:object-cover lg:object-[center_8%]"
          fetchPriority="high"
        />
      </motion.div>

      {/* Conteúdo tipográfico */}
      <div className="relative z-10 order-first mx-auto flex w-full max-w-[1400px] flex-1 items-start px-4 pb-2 pt-16 sm:px-6 lg:min-h-[100svh] lg:items-center lg:px-8 lg:pb-16 lg:pt-20">
        <div className="w-full max-w-xl lg:max-w-[48%]">
          {/* Marca nome + número — entrada + leve pulso contínuo */}
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
            className="mt-1 sm:mt-2 lg:mt-5"
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
            className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-8 lg:justify-start"
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:scale-110 hover:border-[#fdb814] hover:bg-[#fdb814] hover:text-[#021c4f] sm:h-14 sm:w-14"
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
