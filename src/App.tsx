import { useState } from 'react'
import { LayoutGrid, Search, BarChart3, ShieldCheck } from 'lucide-react'
import { AlbumView } from './views/AlbumView'
import { SearchView } from './views/SearchView'
import { StatsView } from './views/StatsView'
import { BackupView } from './views/BackupView'
import { StickerSheet } from './components/StickerSheet'
import { ProgressRing } from './components/ProgressRing'
import { useStats } from './store/collection'

type Tab = 'album' | 'search' | 'stats' | 'backup'

const TABS: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'album', label: 'Album', icon: LayoutGrid },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'backup', label: 'Backup', icon: ShieldCheck },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('album')
  const [openId, setOpenId] = useState<string | null>(null)
  const stats = useStats()

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col">
      {/* Header */}
      <header className="safe-t sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-lg"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))' }}
            >
              ⚽
            </span>
            <div>
              <h1 className="font-display text-xl leading-none tracking-wide">ÁLBUM</h1>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                World Cup 2026
              </p>
            </div>
          </div>
          <ProgressRing pct={stats.pct} size={46} stroke={5}>
            <span className="text-[11px] font-extrabold tnum">{Math.round(stats.pct)}%</span>
          </ProgressRing>
        </div>
      </header>

      {/* Active view */}
      <main className="flex-1">
        {tab === 'album' && <AlbumView onOpen={setOpenId} />}
        {tab === 'search' && <SearchView onOpen={setOpenId} />}
        {tab === 'stats' && <StatsView onOpen={setOpenId} />}
        {tab === 'backup' && <BackupView />}
      </main>

      {/* Bottom navigation */}
      <nav className="safe-b fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-2xl grid-cols-4">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex flex-col items-center gap-1 py-2.5 transition"
                style={{ color: active ? 'var(--accent)' : 'var(--muted-2)' }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={22} strokeWidth={active ? 2.6 : 2} />
                <span className="text-[10.5px] font-bold uppercase tracking-wide">{label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <StickerSheet stickerId={openId} onClose={() => setOpenId(null)} />
    </div>
  )
}
