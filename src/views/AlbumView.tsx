import { useMemo, useState } from 'react'
import { Layers, Sparkles } from 'lucide-react'
import { STICKERS, type Sticker } from '../data/stickers'
import { CONF_LABEL, CONF_ORDER } from '../data/teams'
import { albumStore, useAlbum, useStats } from '../store/collection'
import { luanCounts, LUAN_SUMMARY } from '../data/luan'
import { StickerCard } from '../components/StickerCard'
import { Chip, EmptyState, Segmented } from '../components/ui'

type Status = 'all' | 'have' | 'need'

interface Props {
  onOpen: (id: string) => void
}

export function AlbumView({ onOpen }: Props) {
  const data = useAlbum()
  const stats = useStats()
  const [conf, setConf] = useState<string>('all')
  const [status, setStatus] = useState<Status>('all')

  const sections = useMemo(() => {
    const filtered = STICKERS.filter((s) => {
      if (conf !== 'all' && s.conf !== conf) return false
      const count = data.entries[s.id]?.count ?? 0
      if (status === 'have' && count <= 0) return false
      if (status === 'need' && count > 0) return false
      return true
    })
    const map = new Map<string, Sticker[]>()
    for (const s of filtered) {
      if (!map.has(s.team)) map.set(s.team, [])
      map.get(s.team)!.push(s)
    }
    return [...map.entries()]
  }, [conf, status, data.entries])

  const quickToggle = (id: string) => albumStore.toggleHave(id)

  return (
    <div className="px-4 pb-28 pt-2">
      {/* First-run welcome — load Luan's real collection in one tap */}
      {stats.owned === 0 && (
        <div className="mb-4 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4">
          <p className="text-lg font-extrabold">👋 Welcome, Luan!</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Load the stickers from your list — {LUAN_SUMMARY.owned} already collected, including{' '}
            {LUAN_SUMMARY.doubles} doubles to trade.
          </p>
          <button
            onClick={() => albumStore.applyCounts(luanCounts())}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] py-3 font-extrabold text-black active:scale-[0.99]"
          >
            <Sparkles size={18} /> I'm Luan — load my album
          </button>
        </div>
      )}

      {/* Confederation filter */}
      <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip active={conf === 'all'} onClick={() => setConf('all')}>
          All
        </Chip>
        {CONF_ORDER.map((c) => (
          <Chip key={c} active={conf === c} onClick={() => setConf(c)}>
            {CONF_LABEL[c]}
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
              : 'Try a different filter.'
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
