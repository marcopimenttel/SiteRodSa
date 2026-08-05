import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { noticias } from '@/data/noticias'
import { Reveal } from '@/components/Reveal'

export function Noticias() {
  return (
    <section id="noticias" className="section-pad bg-secondary/50">
      <div className="container-site">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
              Agenda
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">
              Notícias e agenda
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {noticias.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-xl border border-dashed border-border bg-card/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <time className="text-xs font-medium text-muted-foreground">
                    {format(parseISO(item.data), "d 'de' MMMM", { locale: ptBR })}
                  </time>
                  <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold-deep">
                    Em breve
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-navy-deep">{item.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.resumo}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
