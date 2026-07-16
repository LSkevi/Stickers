import { useMemo } from 'react'
import { Repeat2 } from 'lucide-react'
import { RARITY, STICKERS, type Rarity } from '../data/stickers'
import { useAlbum, useStats } from '../store/collection'
import { ProgressRing } from '../components/ProgressRing'
import { Flag } from '../components/Flag'

const GROUP_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
const RARITIES: Rarity[] = ['legendary', 'epic', 'rare', 'common']

interface Props {
  onOpen: (id: string) => void
}

export function StatsView({ onOpen }: Props) {
  const data = useAlbum()
  const stats = useStats()

  const owned = (id: string) => (data.entries[id]?.count ?? 0) > 0

  const byGroup = useMemo(
    () =>
      GROUP_LETTERS.map((g) => {
        const list = STICKERS.filter((s) => s.group === g)
        return { g, owned: list.filter((s) => owned(s.id)).length, total: list.length }
      }),
    [data.entries],
  )

  const byRarity = useMemo(
    () =>
      RARITIES.map((r) => {
        const list = STICKERS.filter((s) => s.rarity === r)
        return { r, owned: list.filter((s) => owned(s.id)).length, total: list.length }
      }),
    [data.entries],
  )

  const doubles = useMemo(
    () =>
      STICKERS.filter((s) => (data.entries[s.id]?.count ?? 0) > 1).sort(
        (a, b) => (data.entries[b.id]!.count ?? 0) - (data.entries[a.id]!.count ?? 0),
      ),
    [data.entries],
  )

  const legendariesOwned = byRarity.find((x) => x.r === 'legendary')

  return (
    <div className="px-4 pb-28 pt-2">
      {/* Hero progress */}
      <section className="rounded-3xl border border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--bg-2)] p-5">
        <div className="flex items-center gap-4">
          <ProgressRing pct={stats.pct} size={96} stroke={9}>
            <div className="text-center">
              <div className="font-display text-2xl leading-none">{stats.pct}%</div>
            </div>
          </ProgressRing>
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">Album complete</p>
            <p className="font-display text-3xl leading-tight">
              {stats.owned}
              <span className="text-[var(--muted-2)]"> / {stats.total}</span>
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {stats.needed > 0 ? `${stats.needed} stickers to go` : 'Album complete — champion! 🏆'}
            </p>
          </div>
        </div>
      </section>

      {/* Tiles */}
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <Tile label="Have" value={stats.owned} accent="var(--accent)" />
        <Tile label="Need" value={stats.needed} accent="var(--magenta)" />
        <Tile label="Doubles" value={stats.doubles} accent="var(--gold)" />
      </div>

      {/* Rarity breakdown */}
      <h3 className="mb-2 mt-6 text-sm font-bold uppercase tracking-widest text-[var(--muted)]">By rarity</h3>
      <div className="flex flex-col gap-2.5">
        {byRarity.map(({ r, owned: o, total }) => (
          <div key={r} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 font-bold" style={{ color: RARITY[r].text }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: RARITY[r].dot }} />
                {RARITY[r].label}
              </span>
              <span className="font-bold tnum text-[var(--muted)]">
                {o}/{total}
              </span>
            </div>
            <Bar pct={total ? (o / total) * 100 : 0} color={RARITY[r].dot} />
          </div>
        ))}
      </div>

      {/* Group completion */}
      <h3 className="mb-2 mt-6 text-sm font-bold uppercase tracking-widest text-[var(--muted)]">By group</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {byGroup.map(({ g, owned: o, total }) => {
          const done = o === total
          return (
            <div key={g} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-display text-lg">Group {g}</span>
                <span className="text-sm font-bold tnum" style={{ color: done ? 'var(--accent)' : 'var(--muted)' }}>
                  {done ? '✓' : `${o}/${total}`}
                </span>
              </div>
              <Bar pct={total ? (o / total) * 100 : 0} color="var(--accent)" />
            </div>
          )
        })}
      </div>

      {/* Legendaries callout */}
      {legendariesOwned && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 p-4">
          <span className="text-3xl">🏅</span>
          <div>
            <p className="font-bold">
              {legendariesOwned.owned} of {legendariesOwned.total} legendaries
            </p>
            <p className="text-sm text-[var(--muted)]">The rarest, shiniest stickers in the book.</p>
          </div>
        </div>
      )}

      {/* Doubles for trade */}
      <h3 className="mb-2 mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
        <Repeat2 size={16} /> Doubles to trade
      </h3>
      {doubles.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line)] p-4 text-center text-sm text-[var(--muted)]">
          No doubles yet. Tap the gold + on a sticker when you pull an extra.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {doubles.map((s) => {
            const extra = (data.entries[s.id]?.count ?? 0) - 1
            return (
              <button
                key={s.id}
                onClick={() => onOpen(s.id)}
                className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2.5 text-left active:scale-[0.99]"
              >
                <div className="h-11 w-11 overflow-hidden rounded-lg border border-[var(--line)]">
                  {s.teamCode ? <Flag code={s.teamCode} emoji={s.emoji} fill /> : <div className="grid h-full w-full place-items-center text-xl">{s.emoji}</div>}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{data.entries[s.id]?.name ?? s.name}</p>
                  <p className="truncate text-xs text-[var(--muted)]">{s.team}</p>
                </div>
                <span className="rounded-lg px-2 py-1 text-sm font-extrabold text-black tnum" style={{ background: 'var(--gold)' }}>
                  ×{extra}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Tile({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3.5 text-center">
      <div className="font-display text-3xl leading-none tnum" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{label}</div>
    </div>
  )
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: color, transition: 'width 0.5s ease' }}
      />
    </div>
  )
}
