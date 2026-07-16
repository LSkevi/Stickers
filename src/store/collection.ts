import { useSyncExternalStore } from 'react'
import { STICKER_BY_ID, TOTAL_STICKERS } from '../data/stickers'

// ---------------------------------------------------------------------------
// Persistence
//
// Keeping Luan's collection safe is the whole point, so every change is written
// through to localStorage AND mirrored to a second backup key. If the primary
// key is ever corrupted, we transparently recover from the mirror. The data is
// also exportable to a file from the Backup tab for off-device safekeeping.
// ---------------------------------------------------------------------------

const KEY = 'wc26-album-v1'
const BACKUP_KEY = 'wc26-album-v1-backup'
export const SCHEMA_VERSION = 1

export interface Entry {
  count: number // 0 = needed, 1 = have, 2+ = have + doubles
  photo?: string // data URL of a real photo, downscaled
  name?: string // user override
  subtitle?: string // user override
}

export interface AlbumData {
  version: number
  owner: string
  updatedAt: number
  entries: Record<string, Entry>
}

function emptyData(): AlbumData {
  return { version: SCHEMA_VERSION, owner: 'Luan', updatedAt: Date.now(), entries: {} }
}

function safeParse(raw: string | null): AlbumData | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.entries) {
      return { ...emptyData(), ...parsed }
    }
  } catch {
    /* fall through to backup */
  }
  return null
}

function load(): AlbumData {
  if (typeof window === 'undefined') return emptyData()
  return (
    safeParse(localStorage.getItem(KEY)) ??
    safeParse(localStorage.getItem(BACKUP_KEY)) ??
    emptyData()
  )
}

function persist(data: AlbumData) {
  if (typeof window === 'undefined') return
  const json = JSON.stringify(data)
  try {
    localStorage.setItem(KEY, json)
    localStorage.setItem(BACKUP_KEY, json)
  } catch (err) {
    // Most likely the quota was exceeded (too many photos). Surface it so the
    // UI can warn instead of silently losing the change.
    console.error('Could not save album — storage may be full.', err)
    throw err
  }
}

// ---------------------------------------------------------------------------
// Store (framework-agnostic, consumed via useSyncExternalStore)
// ---------------------------------------------------------------------------

type Listener = () => void

class AlbumStore {
  private data: AlbumData = load()
  private listeners = new Set<Listener>()

  subscribe = (fn: Listener) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  getSnapshot = () => this.data

  private commit(next: AlbumData) {
    next.updatedAt = Date.now()
    this.data = next
    persist(next)
    this.listeners.forEach((l) => l())
  }

  private entry(id: string): Entry {
    return this.data.entries[id] ?? { count: 0 }
  }

  private withEntry(id: string, patch: Partial<Entry>): AlbumData {
    const current = this.entry(id)
    const merged: Entry = { ...current, ...patch }
    const entries = { ...this.data.entries, [id]: merged }
    // Drop empty entries to keep storage lean.
    if (merged.count <= 0 && !merged.photo && !merged.name && !merged.subtitle) {
      delete entries[id]
    }
    return { ...this.data, entries }
  }

  setCount(id: string, count: number) {
    this.commit(this.withEntry(id, { count: Math.max(0, Math.round(count)) }))
  }

  toggleHave(id: string) {
    const have = this.entry(id).count > 0
    this.setCount(id, have ? 0 : 1)
  }

  increment(id: string) {
    this.setCount(id, this.entry(id).count + 1)
  }

  decrement(id: string) {
    this.setCount(id, this.entry(id).count - 1)
  }

  setPhoto(id: string, photo: string | null) {
    this.commit(this.withEntry(id, { photo: photo ?? undefined }))
  }

  rename(id: string, name: string, subtitle?: string) {
    const original = STICKER_BY_ID[id]
    this.commit(
      this.withEntry(id, {
        name: name.trim() && name.trim() !== original?.name ? name.trim() : undefined,
        subtitle:
          subtitle && subtitle.trim() && subtitle.trim() !== original?.subtitle
            ? subtitle.trim()
            : undefined,
      }),
    )
  }

  setOwner(owner: string) {
    this.commit({ ...this.data, owner: owner.trim() || 'Luan' })
  }

  reset() {
    this.commit(emptyData())
  }

  /**
   * Merge a { stickerId: count } map into the album, keeping the higher count
   * per sticker. Used by the "I'm Luan" preset — safe to run repeatedly, and it
   * never lowers a count you've already set.
   */
  applyCounts(counts: Record<string, number>): number {
    const entries = { ...this.data.entries }
    let changed = 0
    for (const [id, count] of Object.entries(counts)) {
      const cur = entries[id] ?? { count: 0 }
      const next = Math.max(cur.count, Math.max(0, Math.round(count)))
      if (next !== cur.count) changed += 1
      entries[id] = { ...cur, count: next }
    }
    this.commit({ ...this.data, entries })
    return changed
  }

  export(): string {
    return JSON.stringify(this.data, null, 2)
  }

  import(json: string): { ok: boolean; error?: string } {
    const parsed = safeParse(json)
    if (!parsed) return { ok: false, error: "That file doesn't look like an album backup." }
    // Merge is safer than replace: keep the higher count per sticker and keep
    // any photo present, so importing never loses stickers already marked.
    const entries = { ...this.data.entries }
    for (const [id, incoming] of Object.entries(parsed.entries)) {
      const existing = entries[id]
      entries[id] = existing
        ? {
            count: Math.max(existing.count, incoming.count),
            photo: incoming.photo ?? existing.photo,
            name: incoming.name ?? existing.name,
            subtitle: incoming.subtitle ?? existing.subtitle,
          }
        : incoming
    }
    this.commit({ ...this.data, owner: parsed.owner || this.data.owner, entries })
    return { ok: true }
  }
}

export const albumStore = new AlbumStore()

// ---------------------------------------------------------------------------
// React hooks
// ---------------------------------------------------------------------------

export function useAlbum(): AlbumData {
  return useSyncExternalStore(albumStore.subscribe, albumStore.getSnapshot, albumStore.getSnapshot)
}

export interface Stats {
  owned: number
  total: number
  needed: number
  doubles: number
  pct: number
}

export function useStats(): Stats {
  const data = useAlbum()
  let owned = 0
  let doubles = 0
  for (const e of Object.values(data.entries)) {
    if (e.count > 0) owned += 1
    if (e.count > 1) doubles += e.count - 1
  }
  const total = TOTAL_STICKERS
  return {
    owned,
    total,
    needed: total - owned,
    doubles,
    pct: total ? Math.round((owned / total) * 1000) / 10 : 0,
  }
}
