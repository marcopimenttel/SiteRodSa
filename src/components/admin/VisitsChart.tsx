import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ViewsDay } from '@/lib/api'

type Range = 7 | 14 | 30

function formatDayLabel(isoDate: string) {
  const [, month, day] = isoDate.split('-')
  return `${day}/${month}`
}

export function VisitsChart({ series }: { series: ViewsDay[] }) {
  const [range, setRange] = useState<Range>(14)

  const data = useMemo(() => {
    const slice = series.slice(-range)
    const max = Math.max(1, ...slice.map((d) => Math.max(d.uniques, d.hits)))
    return { slice, max }
  }, [series, range])

  const totals = useMemo(() => {
    return data.slice.reduce(
      (acc, d) => {
        acc.uniques += d.uniques
        acc.hits += d.hits
        return acc
      },
      { uniques: 0, hits: 0 },
    )
  }, [data.slice])

  return (
    <section className="mt-6 rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-navy-deep">Visitas por dia</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Únicos = 1º acesso do dispositivo · Acessos = todas as aberturas
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {([7, 14, 30] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRange(n)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium',
                range === n
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80',
              )}
            >
              {n}d
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#fdb814]" />
          Novos únicos no período: <strong className="tabular-nums">{totals.uniques}</strong>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#071844]" />
          Acessos no período: <strong className="tabular-nums">{totals.hits}</strong>
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div
          className="flex h-52 min-w-full items-end gap-1.5 sm:gap-2"
          style={{ minWidth: `${Math.max(data.slice.length * 28, 280)}px` }}
        >
          {data.slice.map((day) => {
            const uniqueH = (day.uniques / data.max) * 100
            const hitsH = (day.hits / data.max) * 100
            return (
              <div
                key={day.date}
                className="group flex min-w-0 flex-1 flex-col items-center gap-1"
                title={`${formatDayLabel(day.date)} — únicos: ${day.uniques}, acessos: ${day.hits}`}
              >
                <div className="relative flex h-40 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-[42%] max-w-4 rounded-t-sm bg-[#fdb814] transition-all"
                    style={{ height: `${Math.max(uniqueH, day.uniques > 0 ? 4 : 0)}%` }}
                  />
                  <div
                    className="w-[42%] max-w-4 rounded-t-sm bg-[#071844] transition-all"
                    style={{ height: `${Math.max(hitsH, day.hits > 0 ? 4 : 0)}%` }}
                  />
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground sm:text-xs">
                  {formatDayLabel(day.date)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
