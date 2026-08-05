import { depoimentos } from '@/data/depoimentos'
import { Reveal } from '@/components/Reveal'

export function Depoimentos() {
  return (
    <section className="section-pad-loose relative overflow-hidden bg-[#f7f4ee]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fdb814] to-transparent"
      />

      <div className="container-site">
        <Reveal variant="fade">
          <div className="max-w-xl">
            <p className="section-eyebrow text-primary">Histórias reais</p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-navy-deep sm:text-3xl">
              Vidas transformadas
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 space-y-12 lg:space-y-16">
          {depoimentos.map((item, i) => (
            <Reveal
              key={item.nome}
              delay={i * 0.06}
              variant={i % 2 === 0 ? 'left' : 'right'}
            >
              <figure
                className={`max-w-3xl border-l-4 border-[#fdb814] pl-5 sm:pl-8 ${
                  i % 2 === 1 ? 'ml-auto' : ''
                }`}
              >
                <blockquote className="font-display text-lg font-medium leading-relaxed tracking-tight text-navy-deep sm:text-xl">
                  “{item.texto}”
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-bold text-navy-deep">{item.nome}</span>
                  <span className="text-xs font-medium uppercase tracking-wide text-gold-deep">
                    {item.contexto}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
