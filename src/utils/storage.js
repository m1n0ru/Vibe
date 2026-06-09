const KEY = 'clenderDiary'

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function loadDiary(dateKey) {
  return loadAll()[dateKey] || null
}

export function saveDiary(dateKey, { title, body, mood }) {
  const all = loadAll()
  all[dateKey] = { title, body, mood, updatedAt: new Date().toISOString() }
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function deleteDiary(dateKey) {
  const all = loadAll()
  delete all[dateKey]
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getDiaryDates() {
  return Object.keys(loadAll())
}
