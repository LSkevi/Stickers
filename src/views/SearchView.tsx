import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { RARITY, STICKERS, type Rarity } from '../data/stickers'
import { albumStore, useAlbum } from '../store/collection'
import { StickerCard } from '../components/StickerCard'
import { Chip, EmptyState, Segmented } from '../components/ui'

type Status = 'all' | 'have' | 'need'
const RARITIES: Rarity[] = ['common', 'rare', 'epic', 'legendary']

interface Props {
  onOpen: (id: string) => void
}

export function SearchView({ onOpen }: Props) {
  const data = useAlbum()
  const [q, setQ] = useState('')
  const [rarity, setRarity] = useState<Rarity | 'all'>('all')
  const [status, setStatus] = useState<Status>('all')

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return STICKERS.filter((s) => {
      if (rarity !== 'all' && s.rarity !== rarity) return false
      const count = data.entries[s.id]?.count ?? 0
      if (status === 'have' && count <= 0) return false
      if (status === 'need' && count > 0) return false
      if (!term) return true
      const name = (data.entries[s.id]?.name ?? s.name).toLowerCase()
      return (
        name.includes(term) ||
        s.team.toLowerCase().includes(term) ||
        s.subtitle.toLowerCase().includes(term) ||
        s.conf.toLowerCase().includes(term) ||
        `#${s.no}` === term ||
        String(s.no) === term
      )
    })
  }, [q, rarity, status, data.entries])

  const quickToggle = (id: string) => albumStore.toggleHave(id)

  return (
    <div className="px-4 pb-28 pt-2">
      {/* Search box */}
      <div className="relative mb-3">
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search player, country or number"
          className="w-full rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] py-3 pl-11 pr-10 text-base outline-none placeholder:text-[var(--muted-2)] focus:border-[var(--accent)]"
          autoCapitalize="off"
          autoCorrect="off"
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white/10"
            aria-label="Clear"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Rarity chips */}
      <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip active={rarity === 'all'} onClick={() => setRarity('all')}>
          Any rarity
        </Chip>
        {RARITIES.map((r) => (
          <Chip key={r} active={rarity === r} onClick={() => setRarity(r)} color={RARITY[r].dot}>
            {RARITY[r].label}
          </Chip>
        ))}
      </div>

      <div className="mb-4">
        <Segmented
          value={status}
          onChange={setStatus}
          options={[
            { value: 'all', label: 'All' },
            { value: 'have', label: 'Have' },
            { value: 'need', label: 'Need' },
          ]}
        />
      </div>

      <p className="mb-3 text-sm font-semibold text-[var(--muted)] tnum">
        {results.length} sticker{results.length === 1 ? '' : 's'}
      </p>

      {results.length === 0 ? (
        <EmptyState icon={<Search size={22} />} title="No matches" note="Try another name, country, or clear the filters." />
      ) : (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {results.map((s) => (
            <StickerCard
              key={s.id}
              sticker={s}
              entry={data.entries[s.id]}
              onOpen={onOpen}
              onQuickToggle={quickToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
