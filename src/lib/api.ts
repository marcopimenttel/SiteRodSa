const TOKEN_KEY = 'rodrigo-sa-admin-token'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (options.auth !== false && path.startsWith('/api/admin') && !path.includes('/login')) {
    const token = getAdminToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(path, { ...options, headers })
  if (res.status === 401 && !path.includes('/login')) {
    clearAdminToken()
  }

  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Falha na requisição')
    return data as T
  }

  if (!res.ok) throw new Error('Falha na requisição')
  return undefined as T
}

export type AdminStats = {
  uniqueViews: number
  totalHits: number
  apoiadores: number
  novos: number
  contatados: number
}

export type ApoiadorRow = {
  id: number
  nome: string
  whatsapp: string
  cidade: string
  ajudas: string[]
  status: 'novo' | 'contatado' | 'arquivado'
  notas: string
  created_at: string
  updated_at: string
}

export const api = {
  trackView: (visitorId: string) =>
    request<{ ok: boolean; unique: boolean }>('/api/views', {
      method: 'POST',
      body: JSON.stringify({ visitorId }),
      auth: false,
    }),

  submitApoiador: (payload: {
    nome: string
    whatsapp: string
    cidade: string
    ajudas: string[]
  }) =>
    request<{ ok: boolean; id: number }>('/api/apoiadores', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    }),

  login: (username: string, password: string) =>
    request<{ token: string; username: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      auth: false,
    }),

  stats: () => request<AdminStats>('/api/admin/stats'),

  listApoiadores: (status = 'todos') =>
    request<ApoiadorRow[]>(
      `/api/admin/apoiadores${status && status !== 'todos' ? `?status=${status}` : ''}`,
    ),

  getApoiador: (id: number) => request<ApoiadorRow>(`/api/admin/apoiadores/${id}`),

  updateApoiador: (
    id: number,
    payload: Partial<Pick<ApoiadorRow, 'status' | 'notas'>>,
  ) =>
    request<ApoiadorRow>(`/api/admin/apoiadores/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteApoiador: (id: number) =>
    request<{ ok: boolean }>(`/api/admin/apoiadores/${id}`, { method: 'DELETE' }),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ ok: boolean }>('/api/admin/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  exportUrl: () => '/api/admin/apoiadores/export',
}
