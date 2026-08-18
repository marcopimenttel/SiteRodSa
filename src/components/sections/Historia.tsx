import {
  BookOpen,
  Building2,
  Car,
  Cpu,
  Shield,
  Vote,
  type LucideIcon,
} from 'lucide-react'
import { historia } from '@/data/candidato'
import { historiaFotoPrincipal, historiaMosaico } from '@/data/historia-fotos'
import { BrandLogo } from '@/components/BrandLogo'
import { Reveal } from '@/components/Reveal'

const marcoIcons: Record<string, LucideIcon> = {
  UFAM: BookOpen,
  Engenharia: Cpu,
  '2011': Shield,
  'Detran-AM': Car,
  Hoje: Building2,
  '2026': Vote,
}

type MosaicTile = { type: 'photo'; src: string } | { type: 'yellow' }

/**
 * Índices dos amarelos no mosaico (espalhados — não na mesma coluna).
 * Grid desktop 5×4: 1→(0,1) | 8→(1,3) | 14→(2,4) | 15→(3,0)
 * Total = 16 fotos únicas + 4 amarelos = 20 quadrados.
 */
const yellowIndexes = new Set([1, 8, 14, 15])

/** Uma foto por célula — sem repetição */
const mosaicTiles: MosaicTile[] = (() => {
  const tiles: MosaicTile[] = []
  let photoIndex = 0
  const total = historiaMosaico.length + yellowIndexes.size

  for (let i = 0; i < total; i++) {
    if (yellowIndexes.has(i)) {
      tiles.push({ type: 'yellow' })
    } else {
      tiles.push({ type: 'photo', src: historiaMosaico[photoIndex] })
      photoIndex += 1
    }
  }
  return tiles
})()

const mosaicGridClass =
  'absolute inset-[-1.5%] grid h-[103%] w-[103%] grid-cols-2 grid-rows-10 gap-[3px] sm:grid-cols-4 sm:grid-rows-5 lg:grid-cols-5 lg:grid-rows-4 lg:gap-1.5'

/**
 * COR DE FUNDO DA SEÇÃO HISTÓRIA — altere só aqui para testar
 * Exemplos: '#021c4f' | '#001a4d' | '#0a1f5c' | '#ffffff' | '#f5f7fc'
 */
const historiaBg = '#021c4f'

export function Historia() {
  return (
    <section
      id="historia"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: historiaBg }}
    >
      {/* Mosaico de fundo — z-0 prende as camadas atrás do conteúdo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Camada 1: fotos (cada uma aparece uma vez) */}
        <div className={mosaicGridClass}>
          {mosaicTiles.map((tile, i) => {
            if (tile.type !== 'photo') {
              return <div key={`photo-slot-${i}`} className="min-h-0" />
            }

            const drift =
              i % 3 === 0
                ? 'mosaic-drift'
                : i % 3 === 1
                  ? 'mosaic-drift mosaic-drift-b'
                  : 'mosaic-drift mosaic-drift-c'

            return (
              <div key={tile.src} className="relative min-h-0 overflow-hidden">
                <img
                  src={tile.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`${drift} h-full w-full object-cover opacity-90 saturate-[0.85] contrast-[0.98]`}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{ backgroundColor: historiaBg }}
                />
              </div>
            )
          })}
        </div>

        {/* Camada 2: véus — também usam historiaBg */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(to bottom right, ${historiaBg}, transparent, rgba(0,0,0,0.2))`,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-14 opacity-60" style={{ background: `linear-gradient(to bottom, ${historiaBg}, transparent)` }} />
        <div className="absolute inset-x-0 bottom-0 h-16 opacity-60" style={{ background: `linear-gradient(to top, ${historiaBg}, transparent)` }} />

        {/* Camada 3: amarelos sólidos (acima do véu, abaixo do conteúdo) */}
        <div className={mosaicGridClass}>
          {mosaicTiles.map((tile, i) =>
            tile.type === 'yellow' ? (
              <div key={`yellow-${i}`} className="min-h-0 bg-[#fdb814]" />
            ) : (
              <div key={`gap-${i}`} className="min-h-0" />
            ),
          )}
        </div>
      </div>

      <div className="relative z-10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/*
            ═══════════════════════════════════════════════════════════
            AJUSTES DA FOTO PRINCIPAL —
            ═══════════════════════════════════════════════════════════
            1) TAMANHO (largura máxima do quadro)
               → no <Reveal>: max-w-md | max-w-lg | max-w-xl | lg:max-w-[480px]
               ↑ valor maior = foto maior | ↓ valor menor = foto menor

            2) APROXIMAÇÃO (zoom)
               → no <img>: scale-100 | scale-105 | scale-110 | lg:scale-110
               ↑ número maior = aproxima | 100 = tamanho natural

            3) SUBIR / DESCER (no <img>)
               → translate-y-0 .......... posição atual
               → translate-y-4 / [8%] ... desce
               → -translate-y-4 / [-8%] . sobe
               Exemplos: translate-y-6 | lg:translate-y-[10%] | -translate-y-4

            4) LARGURA DA COLUNA (espaço à esquerda vs texto)
               → no grid: lg:grid-cols-[0.95fr_1.05fr]
               ↑ 1º número maior = mais espaço para a foto
            ═══════════════════════════════════════════════════════════
          */}
          <Reveal className="relative mx-auto hidden w-full max-w-md lg:block lg:max-w-[480px]">
            <img
              src={historiaFotoPrincipal}
              alt="Rodrigo Sá em momento de afeto com apoiadora"
              className="relative z-10 mx-auto h-auto w-full translate-y-0 scale-130 object-contain drop-shadow-xl lg:translate-y-20 lg:scale-140"
              loading="lazy"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_20px_60px_rgba(0,26,77,0.1)]">
              {/* Header do container — fundo azul + logo + número (SA-02) */}
              <div className="flex items-center justify-between gap-4 bg-[#021c4f] px-5 py-4 sm:px-8 sm:py-5">
                <BrandLogo
                  variant="branco"
                  className="h-10 w-auto max-w-[min(58%,280px)] sm:h-12 sm:max-w-[320px]"
                />
                <img
                  src="/images/marca-numero.svg"
                  alt="11111"
                  className="h-9 w-auto max-w-[38%] object-contain object-right sm:h-11"
                  loading="lazy"
                />
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <h2 className="section-title text-navy-deep">
                  {historia.lead}
                </h2>

                <div className="mt-5 space-y-4 text-base font-medium leading-relaxed text-muted-foreground">
                  {historia.paragrafos.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>

                <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                  {historia.marcos.map((marco) => {
                    const Icon = marcoIcons[marco.ano] ?? Building2
                    const destaque = 'numeroDestaque' in marco && marco.numeroDestaque

                    return (
                      <li
                        key={marco.ano}
                        className={
                          destaque
                            ? 'flex items-start gap-3 rounded-xl border-2 border-[#fdb814]/70 bg-[#fdb814]/10 px-4 py-3'
                            : 'flex items-start gap-3 rounded-xl border border-border/80 bg-white/80 px-4 py-3'
                        }
                      >
                        <span
                          className={
                            destaque
                              ? 'mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fdb814] text-[#021c4f]'
                              : 'mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'
                          }
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p
                            className={
                              destaque
                                ? 'text-xs font-bold uppercase tracking-wider text-[#021c4f]'
                                : 'text-xs font-bold uppercase tracking-wider text-primary'
                            }
                          >
                            {marco.ano}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-navy-deep">
                            {marco.texto}
                          </p>
                          {destaque ? (
                            <p className="mt-1 font-inter text-3xl font-black tracking-tight text-[#fdb814] sm:text-4xl">
                              {marco.numeroDestaque}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
