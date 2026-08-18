import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  FacebookIcon,
  FlickrIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from '@/components/icons/SocialIcons'
import { MoldurasCta } from '@/components/MoldurasCta'
import { config, whatsappBusinessUrl } from '@/lib/config'

const footerSocials = [
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

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="container-site section-pad grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img
            src="/images/hero-marca.svg"
            alt="Deputado Estadual Rodrigo Sá — 11111"
            className="h-auto w-full max-w-[320px] object-contain object-left"
          />
          <p className="mt-4 max-w-sm text-sm text-white/70">
            {config.slogan}. Material de campanha eleitoral para Deputado Estadual do Amazonas.
          </p>
          <div className="mt-5">
            <MoldurasCta />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>
              <a
                href={whatsappBusinessUrl() ?? undefined}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                {config.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${config.contactEmail}`} className="hover:text-white">
                {config.contactEmail}
              </a>
            </li>
            <li>Manaus — Amazonas</li>
            <li>
              <Link to="/privacidade" className="hover:text-white">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Redes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {footerSocials.map((rede) => {
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
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-[#fdb814] hover:text-[#021c4f]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site px-4 py-5 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-[#fdb814]/35 bg-[#fdb814]/10 px-4 py-3 text-center sm:px-5 sm:text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-[#fdb814] sm:text-sm">
              Propaganda Eleitoral — Federação União Progressista
            </p>
            <p className="mt-1 text-xs text-white/85 sm:text-sm">
              CNPJ do candidato: <span className="font-semibold text-white">68.468.441/0001-56</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            Material de campanha eleitoral. Prestação de contas: link do TSE quando disponível.
          </p>
          <p>
            © {new Date().getFullYear()} Campanha Rodrigo Sá · Desenvolvido por Marcondes Pimentel
            {' · '}
            <Link to="/admin/login" className="underline underline-offset-2 hover:text-white">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
