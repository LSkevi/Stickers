import { memo, useMemo, useRef, useState } from 'react'
import { TEAMS, type Team } from './data/album'
import { album, computeTotals, teamCollected, useCounts, type Counts } from './store/album'
import { useInstallPrompt } from './lib/pwa'

export default function App() {
  const counts = useCounts()
  const [query, setQuery] = useState('')
  const [showTools, setShowTools] = useState(false)

  const totals = useMemo(() => computeTotals(counts), [counts])
  const q = query.trim().toUpperCase()

  return (
    <div className="wrap">
      <header className="top">
        <div className="top-row">
          <span className="title">⚽ Álbum Copa 2026</span>
          <span className="counter">
            <b>{totals.collected}</b>/{totals.total} · {totals.pct.toFixed(1)}%
            <br />
            <span className="rep">
              {totals.doubles} repetida{totals.doubles === 1 ? '' : 's'}
            </span>
          </span>
        </div>
        <div className="pbar-wrap">
          <div className="pbar" style={{ width: `${totals.pct}%` }} />
        </div>
        <div className="tools">
          <input
            className="search"
            placeholder="Filtrar (BRA, Brasil...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoCapitalize="characters"
            autoCorrect="off"
          />
          <button className="btn" onClick={() => setShowTools((s) => !s)}>
            ⚙️ Menu
          </button>
        </div>
        <div className="idx-label">Índice</div>
        <div className="index">
          {TEAMS.map((t) => (
            <button key={t.code} className="idx-chip" onClick={() => scrollToTeam(t.code)}>
              {t.flag} {t.code}
            </button>
          ))}
        </div>
      </header>

      {showTools && <ToolsPanel counts={counts} onClose={() => setShowTools(false)} />}

      <div className="note">
        ✅ Tudo salva sozinho neste aparelho. Instale o app e use até sem internet.
      </div>
      <div className="legend">
        <div className="leg">
          <div className="ld off" />
          Falta
        </div>
        <div className="leg">
          <div className="ld on" />
          Colada
        </div>
        <div className="leg">
          <div className="ld rep" />
          Com repetida
        </div>
      </div>
      <div className="hint">👆 Vazia = colar · Verde = +1 repetida · Segurar = zerar</div>

      <div>
        {TEAMS.map((team) => (
          <TeamSection
            key={team.code}
            team={team}
            counts={counts}
            sig={teamSignature(counts, team)}
            hidden={!!q && !team.code.includes(q) && !team.name.toUpperCase().includes(q)}
          />
        ))}
      </div>
    </div>
  )
}

// --- Team section (only re-renders when one of its bubbles changes) ---------

function teamSignature(counts: Counts, team: Team): string {
  let s = ''
  for (let i = 1; i <= team.max; i++) s += (counts[`${team.code}-${i}`] ?? 0) + ','
  return s
}

interface TeamProps {
  team: Team
  counts: Counts
  sig: string
  hidden: boolean
}

const TeamSection = memo(
  function TeamSection({ team, counts, hidden }: TeamProps) {
    const isSpecial = team.code === 'DD' || team.code === 'FWC' || team.code === 'CC'
    const collected = teamCollected(counts, team.code)
    const done = collected === team.max

    return (
      <section
        id={`sec_${team.code}`}
        className={`team${isSpecial ? ' special' : ''}`}
        style={hidden ? { display: 'none' } : undefined}
      >
        <div className="team-head">
          <span className="team-name">
            <span className="team-flag">{team.flag}</span>
            {team.name} <span className="team-code">{team.code}</span>
          </span>
          <span className={`team-count${done ? ' done' : ''}`}>
            {done ? '✓ ' : ''}
            {collected}/{team.max}
          </span>
        </div>
        <div className="bubbles">
          {Array.from({ length: team.max }, (_, k) => {
            const num = k + 1
            const id = `${team.code}-${num}`
            return <Bubble key={id} id={id} num={num} n={counts[id] ?? 0} />
          })}
        </div>
      </section>
    )
  },
  (a, b) => a.sig === b.sig && a.hidden === b.hidden,
)

// --- Bubble -----------------------------------------------------------------

const Bubble = memo(
  function Bubble({ id, num, n }: { id: string; num: number; n: number }) {
    const timer = useRef<number | null>(null)
    const longPressed = useRef(false)
    const doubles = n >= 2 ? n - 1 : 0

    const start = () => {
      longPressed.current = false
      timer.current = window.setTimeout(() => {
        longPressed.current = true
        album.clear(id)
      }, 500)
    }
    const end = () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
    const onClick = () => {
      if (longPressed.current) {
        longPressed.current = false
        return
      }
      album.tap(id)
    }

    return (
      <div className="bub-wrap">
        <button
          className={`bub${n >= 1 ? ' on' : ''}`}
          onClick={onClick}
          onPointerDown={start}
          onPointerUp={end}
          onPointerLeave={end}
          onContextMenu={(e) => e.preventDefault()}
          aria-label={`${id}${n >= 1 ? `, colada${doubles ? `, ${doubles} repetida${doubles === 1 ? '' : 's'}` : ''}` : ', falta'}`}
        >
          {num}
        </button>
        {doubles > 0 && <span className="badge">{doubles}</span>}
      </div>
    )
  },
  (a, b) => a.n === b.n && a.id === b.id,
)

function scrollToTeam(code: string) {
  document.getElementById(`sec_${code}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// --- Tools panel: backup, install, load Luan's list, reset ------------------

function ToolsPanel({ counts, onClose }: { counts: Counts; onClose: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
  const install = useInstallPrompt()

  function backup() {
    const blob = new Blob([album.export()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `luan-copa2026-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Backup salvo! Guarde o arquivo. 📎')
  }

  async function restore(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = album.import(await file.text())
    setMsg(ok ? 'Backup restaurado.' : 'Arquivo inválido.')
    if (fileRef.current) fileRef.current.value = ''
  }

  async function copyList() {
    const ids = Object.keys(counts)
      .filter((id) => counts[id] >= 1)
      .sort()
    const reps = ids
      .filter((id) => counts[id] >= 2)
      .map((id) => (counts[id] > 2 ? `${id} x${counts[id] - 1}` : id))
    const text = `COLADAS:\n${ids.join(', ')}\n\nREPETIDAS:\n${reps.join(', ') || '(nenhuma)'}`
    try {
      await navigator.clipboard.writeText(text)
      setMsg('Lista copiada! 📋')
    } catch {
      setMsg('Não consegui copiar.')
    }
  }

  return (
    <div className="panel">
      <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={restore} />
      {install.canInstall ? (
        <button className="btn green" onClick={install.promptInstall}>
          📲 Instalar o app
        </button>
      ) : !install.installed && install.isIOS ? (
        <div className="hint" style={{ margin: 0 }}>
          Para instalar: toque em <b>Compartilhar</b> e depois <b>Adicionar à Tela de Início</b>.
        </div>
      ) : null}

      <div className="panel-grid">
        <button className="btn" onClick={backup}>
          💾 Baixar backup
        </button>
        <button className="btn" onClick={() => fileRef.current?.click()}>
          ↩️ Restaurar
        </button>
        <button className="btn" onClick={copyList}>
          📋 Copiar lista
        </button>
        <button
          className="btn"
          onClick={() => setMsg(`Lista do Luan carregada (${album.loadLuan()} novas).`)}
        >
          ⭐ Lista do Luan
        </button>
      </div>

      {confirmReset ? (
        <div className="panel-grid">
          <button
            className="btn danger"
            onClick={() => {
              album.resetAll()
              setConfirmReset(false)
              setMsg('Álbum zerado.')
            }}
          >
            Sim, apagar tudo
          </button>
          <button className="btn" onClick={() => setConfirmReset(false)}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="btn danger" onClick={() => setConfirmReset(true)}>
          🗑️ Zerar álbum
        </button>
      )}

      {msg && <div className="note" style={{ margin: 0 }}>{msg}</div>}
      <button className="btn" onClick={onClose}>
        Fechar
      </button>
    </div>
  )
}
