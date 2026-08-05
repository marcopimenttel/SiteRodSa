import { propostas } from '@/data/propostas'
import { Reveal } from '@/components/Reveal'

const eixos = [
  {
    id: 'seguranca-transito',
    titulo: 'Segurança e trânsito',
    ids: ['transito', 'seguranca'],
  },
  {
    id: 'estado',
    titulo: 'Estado e interior',
    ids: ['cidadania-digital', 'interior', 'emprego'],
  },
  {
    id: 'vida',
    titulo: 'Vida digna',
    ids: ['saude', 'educacao', 'infraestrutura', 'moradia', 'servidor'],
  },
] as const

export function Propostas() {
  return (
    <section id="propostas" className="section-pad bg-secondary/40">
      <div className="container-site">
        <Reveal variant="left">
          <div className="max-w-2xl">
            <p className="section-eyebrow text-primary">Deputado Estadual</p>
            <h2 className="section-title text-navy-deep">Propostas para o Amazonas</h2>
            <p className="mt-4 text-muted-foreground">
              Pautas construídas a partir de uma trajetória de resultados — com foco no estado
              inteiro, não só em Manaus.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-14">
          {eixos.map((eixo, eixoIndex) => {
            const items = eixo.ids
              .map((id) => propostas.find((p) => p.id === id))
              .filter(Boolean)

            return (
              <Reveal key={eixo.id} delay={eixoIndex * 0.08} variant={eixoIndex % 2 ? 'right' : 'left'}>
                <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
                  <div className="lg:pt-1">
                    <p className="font-display text-xl font-semibold text-navy-deep sm:text-2xl">
                      {eixo.titulo}
                    </p>
                    <div className="mt-3 h-1 w-12 bg-[#fdb814]" />
                  </div>

                  <ul className="divide-y divide-border/80 border-t border-border/80">
                    {items.map((proposta) =>
                      proposta ? (
                        <li
                          key={proposta.id}
                          className="grid gap-2 py-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8"
                        >
                          <h3 className="text-base font-bold text-navy-deep sm:text-lg">
                            {proposta.titulo}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {proposta.descricao}
                          </p>
                        </li>
                      ) : null,
                    )}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
