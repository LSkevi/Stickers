import { memo } from 'react'
import { Check, Plus } from 'lucide-react'
import { Flag } from './Flag'
import { RARITY, type Sticker } from '../data/stickers'
import type { Entry } from '../store/collection'

interface Props {
  sticker: Sticker
  entry?: Entry
  onOpen: (id: string) => void
  onQuickToggle: (id: string) => void
}

function StickerCardImpl({ sticker, entry, onOpen, onQuickToggle }: Props) {
  const count = entry?.count ?? 0
  const owned = count > 0
  const doubles = Math.max(0, count - 1)
  const name = entry?.name ?? sticker.name
  const subtitle = entry?.subtitle ?? sticker.subtitle
  const rarity = RARITY[sticker.rarity]
  const isLegendary = sticker.rarity === 'legendary'

  return (
    <button
      onClick={() => onOpen(sticker.id)}
      className="group relative block w-full text-left"
      aria-label={`${name}, ${rarity.label}, ${owned ? 'collected' : 'still needed'}`}
    >
      <div
        className={`holo-wrap relative overflow-hidden rounded-2xl border transition duration-200 ${
          owned
            ? 'border-[var(--line-strong)] group-active:scale-[0.97]'
            : 'border-dashed border-[var(--line)] group-active:scale-[0.97]'
        } ${isLegendary && owned ? 'holo' : ''}`}
        style={{
          aspectRatio: '3 / 4',
          boxShadow: owned ? 'var(--shadow-card)' : 'none',
          background: 'var(--surface)',
        }}
      >
        {/* Rarity top light bar */}
        <div className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ background: rarity.ring }} />

        {/* Artwork: real photo if present, else flag / emoji */}
        <div className={`absolute inset-0 ${owned ? '' : 'opacity-35 grayscale'}`}>
          {entry?.photo ? (
            <img src={entry.photo} alt="" className="h-full w-full object-cover" />
          ) : sticker.teamCode ? (
            <Flag code={sticker.teamCode} emoji={sticker.emoji} fill />
          ) : (
            <div
              className="grid h-full w-full place-items-center text-6xl"
              style={{ background: 'radial-gradient(120% 120% at 50% 0%, var(--surface-2), var(--bg))' }}
            >
              {sticker.emoji}
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,12,10,0.15) 0%, rgba(6,12,10,0.05) 40%, rgba(6,12,10,0.92) 100%)',
            }}
          />
        </div>

        {/* Album number */}
        <span className="absolute left-2 top-2 z-20 rounded-md bg-black/45 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white/85 tnum backdrop-blur-sm">
          #{sticker.no}
        </span>

        {/* Doubles */}
        {doubles > 0 && (
          <span
            className="absolute right-2 top-2 z-20 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold text-black tnum"
            style={{ background: 'var(--gold)' }}
          >
            ×{doubles + 1}
          </span>
        )}

        {/* Name block — right padding reserves room for the collect button */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-2.5 pl-2.5 pr-11">
          <p className="truncate text-[13px] font-extrabold leading-tight text-white drop-shadow">
            {name}
          </p>
          <p className="truncate text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: rarity.text }}>
            {subtitle}
          </p>
        </div>

        {/* Quick collect / remove */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onQuickToggle(sticker.id)
          }}
          aria-label={owned ? 'Mark as needed' : 'Mark as collected'}
          className={`absolute bottom-2 right-2 z-30 grid h-8 w-8 place-items-center rounded-full border transition active:scale-90 ${
            owned
              ? 'border-transparent text-black'
              : 'border-white/25 bg-black/40 text-white/80 backdrop-blur-sm'
          }`}
          style={owned ? { background: 'var(--accent)' } : undefined}
        >
          {owned ? <Check size={16} strokeWidth={3} className="animate-stamp" /> : <Plus size={16} strokeWidth={3} />}
        </button>
      </div>
    </button>
  )
}

export const StickerCard = memo(StickerCardImpl)
