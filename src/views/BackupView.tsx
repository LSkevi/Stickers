import { useRef, useState } from 'react'
import { Download, Upload, ShieldCheck, Smartphone, RotateCcw, Share } from 'lucide-react'
import { albumStore, useAlbum, useStats } from '../store/collection'
import { useInstallPrompt } from '../lib/pwa'

export function BackupView() {
  const data = useAlbum()
  const stats = useStats()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const install = useInstallPrompt()

  function exportFile() {
    const json = albumStore.export()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const date = new Date().toISOString().slice(0, 10)
    a.href = url
    a.download = `${data.owner.toLowerCase().replace(/\s+/g, '-')}-wc26-album-${date}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg({ kind: 'ok', text: 'Backup file saved. Keep it somewhere safe! 📎' })
  }

  async function importFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const res = albumStore.import(text)
      setMsg(
        res.ok
          ? { kind: 'ok', text: 'Backup restored and merged into your album.' }
          : { kind: 'err', text: res.error ?? 'Could not read that file.' },
      )
    } catch {
      setMsg({ kind: 'err', text: 'Could not read that file.' })
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const saved = new Date(data.updatedAt)

  return (
    <div className="px-4 pb-28 pt-2">
      {/* Owner */}
      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
          Collector
        </span>
        <input
          value={data.owner}
          onChange={(e) => albumStore.setOwner(e.target.value)}
          className="w-full rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-3 text-lg font-extrabold outline-none focus:border-[var(--accent)]"
          placeholder="Your name"
        />
      </label>

      {/* Data safety card */}
      <div className="rounded-3xl border border-[var(--accent)]/25 bg-[var(--accent)]/8 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-[var(--accent)]" size={22} />
          <div>
            <p className="font-extrabold">Your album is saved automatically</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Every tap is stored on this device instantly — you never have to press save. It stays
              even after you close the app. To be extra safe (new phone, cleared browser), save a
              backup file below now and then.
            </p>
            <p className="mt-2 text-xs text-[var(--muted-2)] tnum">
              {stats.owned}/{stats.total} collected · last change {saved.toLocaleDateString()}{' '}
              {saved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      {msg && (
        <p
          className={`mt-3 rounded-xl px-4 py-2.5 text-sm font-semibold ${
            msg.kind === 'ok' ? 'bg-[var(--accent)]/15 text-[var(--accent)]' : 'bg-[var(--magenta)]/15 text-[var(--magenta)]'
          }`}
        >
          {msg.text}
        </p>
      )}

      {/* Backup actions */}
      <div className="mt-4 grid gap-2.5">
        <button
          onClick={exportFile}
          className="flex items-center gap-3 rounded-2xl bg-[var(--accent)] px-4 py-4 text-left font-extrabold text-black active:scale-[0.99]"
        >
          <Download size={20} />
          <div>
            <div>Save a backup file</div>
            <div className="text-xs font-semibold text-black/70">Download your whole album as a file</div>
          </div>
        </button>

        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={importFile} />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-3 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-4 text-left font-extrabold active:scale-[0.99]"
        >
          <Upload size={20} className="text-[var(--accent)]" />
          <div>
            <div>Restore from a backup</div>
            <div className="text-xs font-semibold text-[var(--muted)]">Merge a saved file back in</div>
          </div>
        </button>
      </div>

      {/* Install */}
      {!install.installed && (
        <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-2 font-extrabold">
            <Smartphone size={18} className="text-[var(--accent)]" /> Use it like a real app
          </div>
          {install.canInstall ? (
            <button
              onClick={install.promptInstall}
              className="mt-3 w-full rounded-xl bg-white/5 py-3 font-bold"
            >
              Install Álbum
            </button>
          ) : install.isIOS ? (
            <p className="mt-2 flex items-center gap-1 text-sm text-[var(--muted)]">
              Tap <Share size={15} className="inline" /> Share, then <b className="text-[var(--text)]">Add to Home Screen</b>.
            </p>
          ) : (
            <p className="mt-2 text-sm text-[var(--muted)]">
              Open your browser menu and choose <b className="text-[var(--text)]">Install app</b> / Add to Home Screen.
            </p>
          )}
        </div>
      )}

      {/* Reset */}
      <div className="mt-6 rounded-2xl border border-[var(--magenta)]/25 p-4">
        <div className="flex items-center gap-2 font-bold text-[var(--magenta)]">
          <RotateCcw size={17} /> Start over
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">Clears every sticker and photo. This can’t be undone.</p>
        {confirmReset ? (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                albumStore.reset()
                setConfirmReset(false)
                setMsg({ kind: 'ok', text: 'Album reset.' })
              }}
              className="flex-1 rounded-xl bg-[var(--magenta)] py-2.5 font-bold text-white"
            >
              Yes, erase everything
            </button>
            <button onClick={() => setConfirmReset(false)} className="flex-1 rounded-xl bg-white/5 py-2.5 font-bold">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 w-full rounded-xl border border-[var(--magenta)]/40 py-2.5 font-bold text-[var(--magenta)]"
          >
            Reset album
          </button>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-[var(--muted-2)]">
        Made for {data.owner} · World Cup 2026 🏆
      </p>
    </div>
  )
}
