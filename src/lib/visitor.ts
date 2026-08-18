const KEY = 'rodrigo-sa-visitor-id'

function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `v-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function getVisitorId() {
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = uuid()
    localStorage.setItem(KEY, id)
  }
  return id
}
