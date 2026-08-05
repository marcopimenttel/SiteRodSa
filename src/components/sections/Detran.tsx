import {
  Handshake,
  IdCard,
  Bike,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { estatisticas } from '@/data/candidato'
import { projetosDetran } from '@/data/projetos'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Reveal } from '@/components/Reveal'

const statIcons: LucideIcon[] = [Users, IdCard, Bike, Handshake]

export function Detran() {
  const [primeiro, segundo, ...restante] = projetosDetran

  return (
    <section id="trabalho" className="bg-navy text-white">
      <div className="section-pad container-site">
        <Reveal variant="fade">
          <div className="max-w-2xl">
            <p className="section-eyebrow text-gold">Servidor público há mais de 20 anos</p>
            <h2 className="section-title">
              Projetos que mudaram o{' '}
              <span className="font-brush text-4xl font-normal text-gold sm:text-5xl">
                Amazonas
              </span>
            </h2>
            <p className="mt-4 text-white/75">
              Na presidência do Detran-AM, liderei projetos que mudaram a vida de milhares de
              pessoas em todo o estado.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {estatisticas.map((stat, i) => {
            const Icon = statIcons[i] ?? Users
            return (
              <Reveal key={stat.label} delay={i * 0.06} className="h-full" variant="up">
                <div className="flex h-full min-h-[148px] flex-col rounded-2xl border border-white/10 bg-[#000d2e] p-5 lg:min-h-[168px]">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="gold-number text-lg leading-none sm:text-xl">+de</p>
                  <AnimatedCounter
                    value={stat.valor}
                    className="gold-number mt-1 block text-3xl leading-none sm:text-4xl"
                  />
                  <p className="mt-3 flex-1 text-sm leading-snug text-white/70">{stat.label}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Projetos — mosaico 2+1 + lista tipográfica (sem grade 3×N idêntica) */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {primeiro && (
            <Reveal variant="left">
              <article className="h-full border-t border-[#fdb814] pt-6">
                <h3 className="font-display text-2xl font-semibold text-gold sm:text-3xl">
                  {primeiro.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  {primeiro.descricao}
                </p>
                {primeiro.destaque && (
                  <p className="mt-4 text-sm font-bold text-white">{primeiro.destaque}</p>
                )}
              </article>
            </Reveal>
          )}
          {segundo && (
            <Reveal delay={0.08} variant="right">
              <article className="h-full border-t border-white/20 pt-6">
                <h3 className="font-display text-2xl font-semibold text-gold sm:text-3xl">
                  {segundo.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  {segundo.descricao}
                </p>
                {segundo.destaque && (
                  <p className="mt-4 text-sm font-bold text-white">{segundo.destaque}</p>
                )}
              </article>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} variant="fade">
          <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {restante.map((projeto) => (
              <li
                key={projeto.id}
                className="grid gap-2 py-5 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-10"
              >
                <h3 className="text-base font-bold text-gold sm:text-lg">{projeto.titulo}</h3>
                <div>
                  <p className="text-sm leading-relaxed text-white/70">{projeto.descricao}</p>
                  {projeto.destaque && (
                    <p className="mt-2 text-sm font-semibold text-white">{projeto.destaque}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
