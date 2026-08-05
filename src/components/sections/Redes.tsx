import { toast } from 'sonner'
import { config } from '@/lib/config'
import { Reveal } from '@/components/Reveal'
import {
  FacebookIcon,
  FlickrIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
} from '@/components/icons/SocialIcons'

const redes = [
  {
    nome: 'Instagram',
    url: config.social.instagram,
    icon: InstagramIcon,
    handle: '@delegadorodrigosa',
  },
  {
    nome: 'Facebook',
    url: config.social.facebook,
    icon: FacebookIcon,
    handle: 'Delegado Rodrigo Sá',
  },
  {
    nome: 'X',
    url: config.social.x,
    icon: XIcon,
    handle: 'Em breve',
  },
  {
    nome: 'TikTok',
    url: config.social.tiktok,
    icon: TikTokIcon,
    handle: 'Em breve',
  },
  {
    nome: 'Flickr',
    url: config.social.flickr,
    icon: FlickrIcon,
    handle: 'Em breve',
  },
]

export function Redes() {
  return (
    <section className="section-pad-tight border-y border-border/60 bg-white">
      <div className="container-site">
        <Reveal variant="fade">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-md">
              <p className="section-eyebrow text-primary">Redes</p>
              <h2 className="section-title text-navy-deep">Acompanhe o Rodrigo Sá</h2>
              <p className="mt-3 text-muted-foreground">
                Siga nas redes e fique por dentro da campanha.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {redes.map((rede) => {
                const Icon = rede.icon
                const active = Boolean(rede.url)
                return (
                  <a
                    key={rede.nome}
                    href={active ? rede.url : undefined}
                    target={active ? '_blank' : undefined}
                    rel={active ? 'noreferrer' : undefined}
                    aria-label={`${rede.nome} — ${rede.handle}`}
                    title={rede.handle}
                    onClick={(e) => {
                      if (!active) {
                        e.preventDefault()
                        toast.message(`${rede.nome} em breve`)
                      }
                    }}
                    className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-navy/15 bg-navy text-gold transition hover:scale-105 hover:border-[#fdb814] hover:bg-[#fdb814] hover:text-[#021c4f] sm:h-16 sm:w-16"
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </a>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
