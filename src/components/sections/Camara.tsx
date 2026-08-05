import { projetosCamara } from '@/data/projetos'
import { Reveal } from '@/components/Reveal'

export function Camara() {
  const [destaque, ...outros] = projetosCamara

  return (
    <section className="section-pad-loose bg-white">
      <div className="container-site">
        <Reveal variant="fade">
          <div className="max-w-3xl">
            <p className="section-eyebrow text-primary">Câmara Municipal de Manaus</p>
            <h2 className="section-title text-navy-deep">
              Como vereador, ações que melhoraram a vida da nossa gente
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-14">
          {destaque && (
            <Reveal variant="left">
              <article className="relative overflow-hidden rounded-[1.5rem] bg-[#021c4f] px-6 py-8 text-white sm:px-8 sm:py-10">
                <div
                  aria-hidden
                  className="absolute -right-8 top-0 h-32 w-32 rounded-full bg-[#fdb814]/20 blur-2xl"
                />
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fdb814]">
                  Destaque
                </p>
                <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {destaque.titulo}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
                  {destaque.descricao}
                </p>
                {destaque.destaque && (
                  <p className="mt-6 border-l-2 border-[#fdb814] pl-4 text-sm font-semibold text-white">
                    {destaque.destaque}
                  </p>
                )}
              </article>
            </Reveal>
          )}

          <Reveal delay={0.12} variant="right">
            <ul className="space-y-0 divide-y divide-border border-y border-border">
              {outros.map((projeto) => (
                <li key={projeto.id} className="py-6">
                  <h3 className="text-lg font-bold text-navy-deep">{projeto.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {projeto.descricao}
                  </p>
                  {projeto.destaque && (
                    <p className="mt-3 text-sm font-bold text-primary">{projeto.destaque}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
