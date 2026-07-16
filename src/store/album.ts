import { useSyncExternalStore } from 'react'
import { INITIAL, TEAMS, TOTAL, EXCLUDED_FROM_TOTAL } from '../data/album'

// ---------------------------------------------------------------------------
// Persistence — every tap is written straight to localStorage (plus a mirrored
// backup key) so nothing is ever lost and there's no "save" button. On first
// run the album is seeded with Luan's current collection.
// ---------------------------------------------------------------------------

const KEY = 'copa2026-v27'
const BACKUP_KEY = 'copa2026-v27-bak'

export type Counts = Record<string, number>

function parse(raw: string | null): Counts | null {
  if (!raw) return null
  try {
    const obj = JSON.parse(raw)
    if (obj && typeof obj === 'object') return obj as Counts
  } catch {
    /* ignore */
  }
  return null
}

function load(): Counts {
  if (typeof window === 'undefined') return { ...INITIAL }
  const saved = parse(localStorage.getItem(KEY)) ?? parse(localStorage.getItem(BACKUP_KEY))
  if (saved) return saved
  const seed = { ...INITIAL }
  persist(seed)
  return seed
}

function persist(counts: Counts) {
  if (typeof window === 'undefined') return
  try {
    const json = JSON.stringify(counts)
    localStorage.setItem(KEY, json)
    localStorage.setItem(BACKUP_KEY, json)
  } catch (e) {
    console.error('Não foi possível salvar o álbum.', e)
  }
}

class AlbumStore {
  private counts: Counts = load()
  private listeners = new Set<() => void>()

  subscribe = (fn: () => void) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
  getSnapshot = () => this.counts

  private commit(next: Counts) {
    this.counts = next
    persist(next)
    this.listeners.forEach((l) => l())
  }

  get(id: string) {
    return this.counts[id] ?? 0
  }

  /** Tap: stick it, or add one more double. */
  tap(id: string) {
    this.commit({ ...this.counts, [id]: (this.counts[id] ?? 0) + 1 })
  }

  /** Long-press: clear this sticker. */
  clear(id: string) {
    const next = { ...this.counts }
    delete next[id]
    this.commit(next)
  }

  setCount(id: string, n: number) {
    if (n <= 0) return this.clear(id)
    this.commit({ ...this.counts, [id]: Math.round(n) })
  }

  resetAll() {
    this.commit({})
  }

  loadLuan() {
    // Merge Luan's list in, keeping the higher count per sticker.
    const next = { ...this.counts }
    let changed = 0
    for (const [id, n] of Object.entries(INITIAL)) {
      if ((next[id] ?? 0) < n) {
        next[id] = n
        changed++
      }
    }
    this.commit(next)
    return changed
  }

  export(): string {
    return JSON.stringify(this.counts, null, 0)
  }

  import(json: string): boolean {
    const parsed = parse(json)
    if (!parsed) return false
    this.commit(parsed)
    return true
  }
}

export const album = new AlbumStore()

export function useCounts(): Counts {
  return useSyncExternalStore(album.subscribe, album.getSnapshot, album.getSnapshot)
}

// ---------------------------------------------------------------------------
// Derived totals
// ---------------------------------------------------------------------------

export interface Totals {
  collected: number
  total: number
  doubles: number
  pct: number
}

export function computeTotals(counts: Counts): Totals {
  let collected = 0
  let doubles = 0
  for (const [id, n] of Object.entries(counts)) {
    if (n < 1) continue
    const code = id.slice(0, id.lastIndexOf('-'))
    if (!EXCLUDED_FROM_TOTAL.includes(code)) collected += 1
    if (n > 1) doubles += n - 1
  }
  return {
    collected,
    total: TOTAL,
    doubles,
    pct: TOTAL ? (collected / TOTAL) * 100 : 0,
  }
}

export function teamCollected(counts: Counts, code: string): number {
  let n = 0
  const team = TEAMS.find((t) => t.code === code)
  if (!team) return 0
  for (let i = 1; i <= team.max; i++) if ((counts[`${code}-${i}`] ?? 0) >= 1) n++
  return n
}
