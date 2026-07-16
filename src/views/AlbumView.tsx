import { useMemo, useState } from 'react'
import { Layers } from 'lucide-react'
import { STICKERS, type Sticker } from '../data/stickers'
import { useAlbum } from '../store/collection'
import { StickerCard } from '../components/StickerCard'
import { Chip, EmptyState, Segmented } from '../components/ui'
import { albumStore } from '../store/collection'

type Status = 'all' | 'have' | 'need'

interface Props {
  onOpen: (id: string) => void
}

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'SP']

export function AlbumView({ onOpen }: Props) {
  const data = useAlbum()
  const [group, setGroup] = useState<string>('all')
  const [status, setStatus] = useState<Status>('all')

  const sections = useMemo(() => {
    const filtered = STICKERS.filter((s) => {
      if (group !== 'all' && s.group !== group) return false
      const count = data.entries[s.id]?.count ?? 0
      if (status === 'have' && count <= 0) return false
      if (status === 'need' && count > 0) return false
      return true
    })
    const map = new Map<string, Sticker[]>()
    for (const s of filtered) {
      const key = s.team
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    }
    return [...map.entries()]
  }, [group, status, data.entries])

  const quickToggle = (id: string) => albumStore.toggleHave(id)

  return (
    <div className="px-4 pb-28 pt-2">
      {/* Group filter */}
      <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip active={group === 'all'} onClick={() => setGroup('all')}>
          All
        </Chip>
        {GROUPS.map((g) => (
          <Chip key={g} active={group === g} onClick={() => setGroup(g)}>
            {g === 'SP' ? '★ Specials' : `Group ${g}`}
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

      {sections.length === 0 ? (
        <EmptyState
          icon={<Layers size={22} />}
          title={status === 'need' ? 'Nothing needed here!' : 'No stickers match'}
          note={
            status === 'need'
              ? 'Every sticker in this view is already in the album. Nice work.'
              : 'Try a different group or filter.'
          }
        />
      ) : (
        <div className="flex flex-col gap-6">
          {sections.map(([team, list]) => {
            const total = STICKERS.filter((s) => s.team === team).length
            const owned = STICKERS.filter(
              (s) => s.team === team && (data.entries[s.id]?.count ?? 0) > 0,
            ).length
            return (
              <section key={team}>
                <div className="mb-2 flex items-baseline justify-between">
                  <h2 className="text-lg font-extrabold">
                    {list[0].emoji} {team}
                  </h2>
                  <span className="text-sm font-bold text-[var(--muted)] tnum">
                    {owned}
                    <span className="text-[var(--muted-2)]">/{total}</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {list.map((s) => (
                    <StickerCard
                      key={s.id}
                      sticker={s}
                      entry={data.entries[s.id]}
                      onOpen={onOpen}
                      onQuickToggle={quickToggle}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
