import { createServer } from 'node:http'
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = process.env.DATA_DIR || join(ROOT, 'data')
const DIST_DIR = join(ROOT, 'dist')
const DB_FILE = join(DATA_DIR, 'campanha.json')
const PORT = Number(process.env.PORT || 3001)
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'rodrigo-sa-change-me-in-production'
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12

mkdirSync(DATA_DIR, { recursive: true })

/** @typedef {'novo' | 'contatado' | 'arquivado'} ApoiadorStatus */

/**
 * @typedef {{
 *  admins: Array<{ id: number, username: string, password_hash: string, password_salt: string, created_at: string }>,
 *  apoiadores: Array<{
 *    id: number,
 *    nome: string,
 *    whatsapp: string,
 *    cidade: string,
 *    ajudas: string[],
 *    status: ApoiadorStatus,
 *    notas: string,
 *    created_at: string,
 *    updated_at: string
 *  }>,
 *  views: Record<string, { first_seen: string, last_seen: string, hits: number }>,
 *  dailyViews: Record<string, { uniques: number, hits: number }>,
 *  meta: { dailyBackfilled?: boolean },
 *  seq: { admin: number, apoiador: number }
 * }} Db
 */

/** @returns {Db} */
function emptyDb() {
  return {
    admins: [],
    apoiadores: [],
    views: {},
    dailyViews: {},
    meta: {},
    seq: { admin: 1, apoiador: 1 },
  }
}

/** @returns {Db} */
function loadDb() {
  if (!existsSync(DB_FILE)) return emptyDb()
  try {
    return { ...emptyDb(), ...JSON.parse(readFileSync(DB_FILE, 'utf8')) }
  } catch {
    return emptyDb()
  }
}

/** @param {Db} data */
function saveDb(data) {
  const tmp = `${DB_FILE}.tmp`
  writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
  renameSync(tmp, DB_FILE)
}

function nowIso() {
  return new Date().toISOString()
}

/** Data YYYY-MM-DD no fuso de Manaus (campanha AM) */
function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Manaus',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

/** @param {string} iso */
function dayKeyFromIso(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return dayKey()
  return dayKey(d)
}

/** @param {Db} data */
function ensureDailyShape(data) {
  if (!data.dailyViews || typeof data.dailyViews !== 'object') data.dailyViews = {}
  if (!data.meta || typeof data.meta !== 'object') data.meta = {}
}

/**
 * Preenche série diária a partir do histórico (uma vez), sem zerar contadores.
 * @param {Db} data
 */
function backfillDailyViews(data) {
  ensureDailyShape(data)
  if (data.meta.dailyBackfilled) return false

  /** @type {Record<string, { uniques: number, hits: number }>} */
  const built = {}
  for (const v of Object.values(data.views || {})) {
    const d = dayKeyFromIso(v.first_seen || nowIso())
    if (!built[d]) built[d] = { uniques: 0, hits: 0 }
    built[d].uniques += 1
    built[d].hits += Number(v.hits) || 1
  }
  data.dailyViews = built
  data.meta.dailyBackfilled = true
  return true
}

/**
 * @param {Db} data
 * @param {boolean} isUnique
 */
function bumpDailyView(data, isUnique) {
  ensureDailyShape(data)
  const d = dayKey()
  if (!data.dailyViews[d]) data.dailyViews[d] = { uniques: 0, hits: 0 }
  data.dailyViews[d].hits += 1
  if (isUnique) data.dailyViews[d].uniques += 1
}

/**
 * @param {Db} data
 * @param {number} days
 */
function buildViewsSeries(data, days = 30) {
  ensureDailyShape(data)
  const out = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = dayKey(d)
    const row = data.dailyViews[key] || { uniques: 0, hits: 0 }
    out.push({ date: key, uniques: row.uniques || 0, hits: row.hits || 0 })
  }
  return out
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = scryptSync(password, salt, 64).toString('hex')
  return { hash, salt }
}

function verifyPassword(password, hash, salt) {
  const next = scryptSync(password, salt, 64)
  const prev = Buffer.from(hash, 'hex')
  if (next.length !== prev.length) return false
  return timingSafeEqual(next, prev)
}

function seedAdmin(db) {
  if (db.admins.some((a) => a.username === 'admin')) return db
  const { hash, salt } = hashPassword('admin')
  db.admins.push({
    id: db.seq.admin++,
    username: 'admin',
    password_hash: hash,
    password_salt: salt,
    created_at: nowIso(),
  })
  console.log('[server] Admin padrão criado: usuário admin / senha admin')
  return db
}

let db = seedAdmin(loadDb())
ensureDailyShape(db)
if (backfillDailyViews(db)) saveDb(db)
saveDb(db)

function b64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function signToken(payload) {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64url(JSON.stringify({ ...payload, exp: Date.now() + TOKEN_TTL_MS }))
  const data = `${header}.${body}`
  const sig = createHmac('sha256', JWT_SECRET).update(data).digest('base64url')
  return `${data}.${sig}`
}

function verifyToken(token) {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [header, body, sig] = parts
  const data = `${header}.${body}`
  const expected = createHmac('sha256', JWT_SECRET).update(data).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (!payload?.exp || payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('JSON inválido'))
      }
    })
    req.on('error', reject)
  })
}

function getAuth(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  return verifyToken(token)
}

function requireAdmin(req, res) {
  const auth = getAuth(req)
  if (!auth?.sub) {
    sendJson(res, 401, { error: 'Não autorizado' })
    return null
  }
  return auth
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function serveStatic(req, res, pathname) {
  let filePath = join(DIST_DIR, pathname === '/' ? 'index.html' : pathname)
  filePath = normalize(filePath)
  if (!filePath.startsWith(DIST_DIR)) {
    sendJson(res, 403, { error: 'Forbidden' })
    return
  }
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(DIST_DIR, 'index.html')
  }
  if (!existsSync(filePath)) {
    sendJson(res, 404, { error: 'Not found' })
    return
  }
  const type = MIME[extname(filePath)] || 'application/octet-stream'
  res.writeHead(200, { 'Content-Type': type })
  createReadStream(filePath).pipe(res)
}

async function handleApi(req, res, pathname) {
  const method = req.method || 'GET'

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    res.end()
    return
  }

  try {
    if (method === 'POST' && pathname === '/api/views') {
      const body = await readBody(req)
      const visitorId = String(body.visitorId || '').trim().slice(0, 80)
      if (!visitorId) return sendJson(res, 400, { error: 'visitorId obrigatório' })

      ensureDailyShape(db)
      const existing = db.views[visitorId]
      if (existing) {
        existing.last_seen = nowIso()
        existing.hits += 1
        bumpDailyView(db, false)
        saveDb(db)
        return sendJson(res, 200, { ok: true, unique: false })
      }
      db.views[visitorId] = { first_seen: nowIso(), last_seen: nowIso(), hits: 1 }
      bumpDailyView(db, true)
      saveDb(db)
      return sendJson(res, 201, { ok: true, unique: true })
    }

    if (method === 'POST' && pathname === '/api/apoiadores') {
      const body = await readBody(req)
      const nome = String(body.nome || '').trim()
      const whatsapp = String(body.whatsapp || '').trim()
      const cidade = String(body.cidade || '').trim()
      const ajudas = Array.isArray(body.ajudas) ? body.ajudas.map(String) : []
      if (!nome || !whatsapp || !cidade || ajudas.length === 0) {
        return sendJson(res, 400, { error: 'Preencha todos os campos obrigatórios' })
      }
      const row = {
        id: db.seq.apoiador++,
        nome,
        whatsapp,
        cidade,
        ajudas,
        status: /** @type {ApoiadorStatus} */ ('novo'),
        notas: '',
        created_at: nowIso(),
        updated_at: nowIso(),
      }
      db.apoiadores.unshift(row)
      saveDb(db)
      return sendJson(res, 201, { ok: true, id: row.id })
    }

    if (method === 'POST' && pathname === '/api/admin/login') {
      const body = await readBody(req)
      const username = String(body.username || '').trim()
      const password = String(body.password || '')
      const admin = db.admins.find((a) => a.username === username)
      if (!admin || !verifyPassword(password, admin.password_hash, admin.password_salt)) {
        return sendJson(res, 401, { error: 'Usuário ou senha inválidos' })
      }
      return sendJson(res, 200, { token: signToken({ sub: admin.username }), username: admin.username })
    }

    if (method === 'POST' && pathname === '/api/admin/change-password') {
      const auth = requireAdmin(req, res)
      if (!auth) return
      const body = await readBody(req)
      const currentPassword = String(body.currentPassword || '')
      const newPassword = String(body.newPassword || '')
      if (newPassword.length < 6) {
        return sendJson(res, 400, { error: 'Nova senha deve ter ao menos 6 caracteres' })
      }
      const admin = db.admins.find((a) => a.username === auth.sub)
      if (!admin || !verifyPassword(currentPassword, admin.password_hash, admin.password_salt)) {
        return sendJson(res, 401, { error: 'Senha atual incorreta' })
      }
      const { hash, salt } = hashPassword(newPassword)
      admin.password_hash = hash
      admin.password_salt = salt
      saveDb(db)
      return sendJson(res, 200, { ok: true })
    }

    if (method === 'GET' && pathname === '/api/admin/stats') {
      const auth = requireAdmin(req, res)
      if (!auth) return
      if (backfillDailyViews(db)) saveDb(db)
      const viewValues = Object.values(db.views)
      return sendJson(res, 200, {
        uniqueViews: viewValues.length,
        totalHits: viewValues.reduce((sum, v) => sum + (v.hits || 0), 0),
        apoiadores: db.apoiadores.length,
        novos: db.apoiadores.filter((a) => a.status === 'novo').length,
        contatados: db.apoiadores.filter((a) => a.status === 'contatado').length,
        series: buildViewsSeries(db, 30),
      })
    }

    if (method === 'GET' && pathname === '/api/admin/apoiadores') {
      const auth = requireAdmin(req, res)
      if (!auth) return
      const url = new URL(req.url || '/', `http://${req.headers.host}`)
      const status = url.searchParams.get('status')
      const rows =
        status && status !== 'todos'
          ? db.apoiadores.filter((a) => a.status === status)
          : db.apoiadores
      return sendJson(res, 200, rows)
    }

    if (method === 'GET' && pathname === '/api/admin/apoiadores/export') {
      const auth = requireAdmin(req, res)
      if (!auth) return
      const header = ['id', 'nome', 'whatsapp', 'cidade', 'ajudas', 'status', 'notas', 'created_at']
      const lines = [header.join(';')]
      for (const r of db.apoiadores) {
        lines.push(
          [
            r.id,
            `"${String(r.nome).replaceAll('"', '""')}"`,
            `"${String(r.whatsapp).replaceAll('"', '""')}"`,
            `"${String(r.cidade).replaceAll('"', '""')}"`,
            `"${r.ajudas.join(', ').replaceAll('"', '""')}"`,
            r.status,
            `"${String(r.notas || '').replaceAll('"', '""')}"`,
            r.created_at,
          ].join(';'),
        )
      }
      const csv = `\uFEFF${lines.join('\n')}`
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="apoiadores.csv"',
      })
      res.end(csv)
      return
    }

    const detailMatch = pathname.match(/^\/api\/admin\/apoiadores\/(\d+)$/)
    if (detailMatch) {
      const auth = requireAdmin(req, res)
      if (!auth) return
      const id = Number(detailMatch[1])
      const idx = db.apoiadores.findIndex((a) => a.id === id)
      if (idx < 0) return sendJson(res, 404, { error: 'Não encontrado' })

      if (method === 'GET') return sendJson(res, 200, db.apoiadores[idx])

      if (method === 'PATCH') {
        const body = await readBody(req)
        const current = db.apoiadores[idx]
        const status = body.status ? String(body.status) : current.status
        const notas = body.notas != null ? String(body.notas) : current.notas
        if (!['novo', 'contatado', 'arquivado'].includes(status)) {
          return sendJson(res, 400, { error: 'Status inválido' })
        }
        db.apoiadores[idx] = {
          ...current,
          status: /** @type {ApoiadorStatus} */ (status),
          notas,
          updated_at: nowIso(),
        }
        saveDb(db)
        return sendJson(res, 200, db.apoiadores[idx])
      }

      if (method === 'DELETE') {
        db.apoiadores.splice(idx, 1)
        saveDb(db)
        return sendJson(res, 200, { ok: true })
      }
    }

    sendJson(res, 404, { error: 'Rota não encontrada' })
  } catch (err) {
    console.error(err)
    sendJson(res, 500, { error: 'Erro interno' })
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`)
  const pathname = decodeURIComponent(url.pathname)
  if (pathname.startsWith('/api/')) {
    await handleApi(req, res, pathname)
    return
  }
  serveStatic(req, res, pathname)
})

server.listen(PORT, () => {
  console.log(`[server] Rodando em http://localhost:${PORT}`)
  console.log(`[server] Dados em ${DATA_DIR}`)
})
