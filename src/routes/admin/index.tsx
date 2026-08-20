import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Download, Eye, LogOut, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  api,
  clearAdminToken,
  getAdminToken,
  type AdminStats,
  type ApoiadorRow,
} from '@/lib/api'
import { AdminModal, ConfirmModal } from '@/components/admin/AdminModal'
import { VisitsChart } from '@/components/admin/VisitsChart'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboardPage,
})

const statusLabel: Record<ApoiadorRow['status'], string> = {
  novo: 'Novo',
  contatado: 'Contatado',
  arquivado: 'Arquivado',
}

function AdminDashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [rows, setRows] = useState<ApoiadorRow[]>([])
  const [filter, setFilter] = useState('todos')
  const [selected, setSelected] = useState<ApoiadorRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ApoiadorRow | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [s, list] = await Promise.all([api.stats(), api.listApoiadores(filter)])
      setStats(s)
      setRows(list)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao carregar')
      if (!getAdminToken()) await navigate({ to: '/admin/login' })
    } finally {
      setLoading(false)
    }
  }, [filter, navigate])

  useEffect(() => {
    void load()
  }, [load])

  const logout = async () => {
    clearAdminToken()
    await navigate({ to: '/admin/login' })
  }

  const exportCsv = async () => {
    try {
      const token = getAdminToken()
      const res = await fetch(api.exportUrl(), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error('Falha ao exportar')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'apoiadores.csv'
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Exportação iniciada')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao exportar')
    }
  }

  const onChangePassword = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.changePassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      toast.success('Senha atualizada')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao trocar senha')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.deleteApoiador(deleteTarget.id)
      toast.success('Excluído')
      if (selected?.id === deleteTarget.id) setSelected(null)
      setDeleteTarget(null)
      await load()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro')
    } finally {
      setDeleting(false)
    }
  }

  const filteredLabel = useMemo(() => {
    if (filter === 'todos') return 'Todos'
    return statusLabel[filter as ApoiadorRow['status']] || filter
  }, [filter])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">Painel</h2>
          <p className="text-sm text-muted-foreground">
            Mensagens de apoiadores e visualizações únicas do site
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => void exportCsv()}>
            <Download className="h-4 w-4" />
            Exportar Excel/CSV
          </Button>
          <Button variant="ghost" onClick={() => void logout()}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visitas únicas" value={stats?.uniqueViews ?? '—'} highlight />
        <StatCard label="Acessos totais" value={stats?.totalHits ?? '—'} />
        <StatCard label="Apoiadores" value={stats?.apoiadores ?? '—'} />
        <StatCard
          label="Novos / Contatados"
          value={`${stats?.novos ?? 0} / ${stats?.contatados ?? 0}`}
        />
      </div>

      {stats?.series?.length ? <VisitsChart series={stats.series} /> : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Mensagens ({filteredLabel})</h3>
        <div className="flex flex-wrap gap-2">
          {(['todos', 'novo', 'contatado', 'arquivado'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium',
                filter === s
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted-foreground hover:bg-secondary',
              )}
            >
              {s === 'todos' ? 'Todos' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Carregando...</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Nenhuma mensagem nesta lista.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Cidade</th>
                  <th className="px-4 py-3">Quer ajudar como</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium">{row.nome}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.whatsapp}</td>
                    <td className="px-4 py-3">{row.cidade}</td>
                    <td className="px-4 py-3">
                      <div className="flex max-w-[260px] flex-wrap gap-1">
                        {row.ajudas.map((ajuda) => (
                          <span
                            key={ajuda}
                            className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary"
                          >
                            {ajuda}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(row)}
                          aria-label="Ver"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteTarget(row)}
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <form
        onSubmit={onChangePassword}
        className="mt-10 max-w-lg rounded-xl border border-border bg-white p-5 shadow-sm"
      >
        <h3 className="text-lg font-semibold">Trocar senha</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Recomendado após o primeiro acesso com a senha padrão.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Senha atual</Label>
            <PasswordInput
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova senha</Label>
            <PasswordInput
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Salvar nova senha
        </Button>
      </form>

      <ApoiadorModal
        row={selected}
        onClose={() => setSelected(null)}
        onUpdated={async () => {
          if (!selected) return
          await load()
          const fresh = await api.getApoiador(selected.id)
          setSelected(fresh)
        }}
        onRequestDelete={() => {
          if (selected) setDeleteTarget(selected)
        }}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Excluir mensagem?"
        description={
          deleteTarget
            ? `Tem certeza que deseja excluir o apoio de ${deleteTarget.nome}? Esta ação não pode ser desfeita.`
            : ''
        }
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => void confirmDelete()}
        loading={deleting}
      />
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: string | number
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        highlight ? 'border-[#fdb814]/50 bg-[#fff8e6]' : 'border-border bg-white',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tabular-nums text-navy-deep">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: ApoiadorRow['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
        status === 'novo' && 'bg-amber-100 text-amber-800',
        status === 'contatado' && 'bg-emerald-100 text-emerald-800',
        status === 'arquivado' && 'bg-slate-100 text-slate-700',
      )}
    >
      {statusLabel[status]}
    </span>
  )
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(value.includes('T') ? value : `${value}Z`))
  } catch {
    return value
  }
}

function ApoiadorModal({
  row,
  onClose,
  onUpdated,
  onRequestDelete,
}: {
  row: ApoiadorRow | null
  onClose: () => void
  onUpdated: () => Promise<void>
  onRequestDelete: () => void
}) {
  const [status, setStatus] = useState<ApoiadorRow['status']>('novo')
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!row) return
    setStatus(row.status)
    setNotas(row.notas || '')
  }, [row])

  const save = async () => {
    if (!row) return
    setSaving(true)
    try {
      await api.updateApoiador(row.id, { status, notas })
      toast.success('Atualizado')
      await onUpdated()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminModal
      open={Boolean(row)}
      onClose={onClose}
      title={row?.nome || 'Detalhe'}
      description={row ? formatDate(row.created_at) : undefined}
      wide
    >
      {row && (
        <>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-secondary/60 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                WhatsApp
              </dt>
              <dd className="mt-1">
                <a
                  className="font-medium text-primary underline underline-offset-2"
                  href={`https://wa.me/55${row.whatsapp.replace(/\D/g, '').replace(/^55/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {row.whatsapp}
                </a>
              </dd>
            </div>
            <div className="rounded-xl bg-secondary/60 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Bairro / Cidade
              </dt>
              <dd className="mt-1 font-medium">{row.cidade}</dd>
            </div>
            <div className="rounded-xl bg-secondary/60 p-3 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Quer ajudar como
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {row.ajudas.map((ajuda) => (
                  <span
                    key={ajuda}
                    className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    {ajuda}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-5 space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ApoiadorRow['status'])}
              className="flex h-11 w-full rounded-md border border-border bg-white px-3 text-sm"
            >
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="notas">Notas internas</Label>
            <textarea
              id="notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              placeholder="Ex.: já liguei, interessado em coordenação..."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => void save()} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button
              variant="ghost"
              className="text-destructive"
              onClick={() => {
                onClose()
                onRequestDelete()
              }}
            >
              Excluir
            </Button>
          </div>
        </>
      )}
    </AdminModal>
  )
}
