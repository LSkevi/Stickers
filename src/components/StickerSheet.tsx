import { useEffect, useRef, useState } from 'react'
import { Camera, Check, Minus, Plus, Trash2, X, Pencil } from 'lucide-react'
import { Flag } from './Flag'
import { RARITY, STICKER_BY_ID } from '../data/stickers'
import { albumStore, useAlbum } from '../store/collection'
import { fileToStickerPhoto } from '../lib/image'

interface Props {
  stickerId: string | null
  onClose: () => void
}

export function StickerSheet({ stickerId, onClose }: Props) {
  const data = useAlbum()
  const fileRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [subDraft, setSubDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sticker = stickerId ? STICKER_BY_ID[stickerId] : null
  const entry = stickerId ? data.entries[stickerId] : undefined
  const count = entry?.count ?? 0
  const owned = count > 0

  useEffect(() => {
    if (sticker) {
      setNameDraft(entry?.name ?? sticker.name)
      setSubDraft(entry?.subtitle ?? sticker.subtitle)
      setEditing(false)
      setError(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stickerId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!sticker) return null
  const rarity = RARITY[sticker.rarity]
  const name = entry?.name ?? sticker.name
  const subtitle = entry?.subtitle ?? sticker.subtitle

  async function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !sticker) return
    setBusy(true)
    setError(null)
    try {
      const photo = await fileToStickerPhoto(file)
      albumStore.setPhoto(sticker.id, photo)
      if (!owned) albumStore.setCount(sticker.id, 1)
    } catch {
      setError('Could not save that photo — it may be too large or storage is full.')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function saveEdit() {
    if (!sticker) return
    albumStore.rename(sticker.id, nameDraft, subDraft)
    setEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-t-3xl border border-[var(--line-strong)] bg-[var(--bg-2)] pb-[calc(env(safe-area-inset-bottom)+16px)] sm:rounded-3xl"
        style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg-2)]/90 px-4 py-3 backdrop-blur">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] tnum">
            No. {sticker.no} · Group {sticker.group === 'SP' ? '★' : sticker.group}
          </span>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-white/5" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {/* Preview */}
          <div
            className={`relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-2xl border border-[var(--line-strong)] ${
              sticker.rarity === 'legendary' && owned ? 'holo' : ''
            }`}
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="absolute inset-x-0 top-0 z-20 h-1" style={{ background: rarity.ring }} />
            <div className={owned ? '' : 'opacity-40 grayscale'}>
              {entry?.photo ? (
                <img src={entry.photo} alt={name} className="h-full w-full object-cover" />
              ) : sticker.teamCode ? (
                <Flag code={sticker.teamCode} emoji={sticker.emoji} fill />
              ) : (
                <div className="grid aspect-[3/4] w-full place-items-center text-7xl">{sticker.emoji}</div>
              )}
            </div>
          </div>

          {/* Identity */}
          <div className="mt-4 text-center">
            {editing ? (
              <div className="mx-auto flex max-w-xs flex-col gap-2">
                <input
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  placeholder="Sticker name"
                  className="rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 text-center text-base font-bold outline-none focus:border-[var(--accent)]"
                />
                <input
                  value={subDraft}
                  onChange={(e) => setSubDraft(e.target.value)}
                  placeholder="Position / detail"
                  className="rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 text-center text-sm outline-none focus:border-[var(--accent)]"
                />
                <div className="flex justify-center gap-2">
                  <button onClick={saveEdit} className="rounded-lg bg-[var(--accent)] px-4 py-1.5 text-sm font-bold text-black">
                    Save
                  </button>
                  <button onClick={() => setEditing(false)} className="rounded-lg bg-white/5 px-4 py-1.5 text-sm font-semibold">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-xl font-extrabold">{name}</h2>
                  <button onClick={() => setEditing(true)} className="text-[var(--muted)] hover:text-white" aria-label="Edit name">
                    <Pencil size={15} />
                  </button>
                </div>
                <div className="mt-1 flex items-center justify-center gap-2 text-sm text-[var(--muted)]">
                  <span>{subtitle}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 font-semibold" style={{ color: rarity.text }}>
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: rarity.dot }} />
                    {rarity.label}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-[var(--muted-2)]">
                  {sticker.emoji} {sticker.team}
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-[var(--magenta)]/15 px-3 py-2 text-center text-sm text-[var(--magenta)]">
              {error}
            </p>
          )}

          {/* Have toggle */}
          <button
            onClick={() => albumStore.setCount(sticker.id, owned ? 0 : 1)}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-extrabold transition active:scale-[0.98] ${
              owned ? 'text-black' : 'border border-[var(--line-strong)] bg-white/5 text-white'
            }`}
            style={owned ? { background: 'var(--accent)' } : undefined}
          >
            {owned ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
            {owned ? 'In your album' : 'Add to album'}
          </button>

          {/* Doubles stepper */}
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
            <div>
              <p className="text-sm font-bold">Doubles to trade</p>
              <p className="text-xs text-[var(--muted)]">Extra copies you can swap</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => albumStore.decrement(sticker.id)}
                disabled={count <= 0}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/5 disabled:opacity-30"
                aria-label="Remove one"
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center text-xl font-extrabold tnum">{Math.max(0, count - 1)}</span>
              <button
                onClick={() => albumStore.increment(sticker.id)}
                className="grid h-9 w-9 place-items-center rounded-full text-black"
                style={{ background: 'var(--gold)' }}
                aria-label="Add one"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Photo */}
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onPickPhoto} />
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[var(--line-strong)] bg-white/5 py-3 text-sm font-bold disabled:opacity-50"
            >
              <Camera size={17} />
              {busy ? 'Saving…' : entry?.photo ? 'Change photo' : 'Add real photo'}
            </button>
            {entry?.photo && (
              <button
                onClick={() => albumStore.setPhoto(sticker.id, null)}
                className="grid w-12 place-items-center rounded-2xl border border-[var(--line)] bg-white/5 text-[var(--magenta)]"
                aria-label="Remove photo"
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-[11px] text-[var(--muted-2)]">
            Photos are stored privately on this device only.
          </p>
        </div>
      </div>
    </div>
  )
}
