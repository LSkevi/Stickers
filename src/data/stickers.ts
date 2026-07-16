import { TEAMS, CONF_ORDER, type Team } from './teams'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type Kind = 'badge' | 'lineup' | 'player' | 'special'

export interface Sticker {
  id: string // real album code, e.g. "ARG-1"
  no: number // number within its team/section (matches the printed sticker)
  name: string
  subtitle: string
  team: string // team / section name
  teamCode: string // flagcdn code ('' when there is no flag)
  emoji: string
  conf: string // confederation, or 'FIFA' for specials
  rarity: Rarity
  kind: Kind
}

export const RARITY: Record<
  Rarity,
  { label: string; ring: string; text: string; dot: string; order: number }
> = {
  common: { label: 'Common', ring: 'var(--r-common)', text: 'var(--r-common)', dot: 'var(--r-common)', order: 0 },
  rare: { label: 'Rare', ring: 'var(--r-rare)', text: 'var(--r-rare)', dot: 'var(--r-rare)', order: 1 },
  epic: { label: 'Epic', ring: 'var(--r-epic)', text: 'var(--r-epic)', dot: 'var(--r-epic)', order: 2 },
  legendary: { label: 'Legendary', ring: 'var(--r-legendary)', text: 'var(--r-legendary)', dot: 'var(--r-legendary)', order: 3 },
}

const STICKERS_PER_TEAM = 20

function teamStickers(team: Team): Sticker[] {
  const list: Sticker[] = []
  for (let n = 1; n <= STICKERS_PER_TEAM; n++) {
    let name: string
    let subtitle: string
    let kind: Kind
    let rarity: Rarity

    if (n === 1) {
      name = `${team.name} Badge`
      subtitle = 'Team Crest'
      kind = 'badge'
      rarity = 'epic'
    } else if (n === 2) {
      name = `${team.name} Line-up`
      subtitle = 'Team Photo'
      kind = 'lineup'
      rarity = 'rare'
    } else {
      const idx = n - 3 // player index
      const star = team.stars[idx]
      name = star ?? `${team.name} No. ${n}`
      subtitle = star ? 'Star Player' : `Squad · No. ${n}`
      kind = 'player'
      if (n === 3) rarity = 'legendary'
      else if (n === 4) rarity = 'epic'
      else if (n === 5 || n === 6) rarity = 'rare'
      else rarity = 'common'
    }

    list.push({
      id: `${team.code}-${n}`,
      no: n,
      name,
      subtitle,
      team: team.name,
      teamCode: team.flag,
      emoji: team.emoji,
      conf: team.conf,
      rarity,
      kind,
    })
  }
  return list
}

// ---------------------------------------------------------------------------
// Special sections. These codes (FWC, CC, DD) appear in Luan's checklist; the
// exact printed names/sizes aren't published, so they use generic, editable
// names. Adjust the counts below if the real album differs.
// ---------------------------------------------------------------------------

interface SpecialSpec {
  code: string
  team: string
  emoji: string
  count: number
  name: (n: number) => string
  emojiFor?: (n: number) => string
  rarityFor?: (n: number) => Rarity
}

const SPECIALS: SpecialSpec[] = [
  {
    code: 'FWC',
    team: 'FIFA World Cup',
    emoji: '🏆',
    count: 20,
    name: (n) =>
      n === 1 ? 'World Cup Trophy'
      : n === 2 ? 'Official Emblem'
      : n === 3 ? 'Mascots — Maple, Zayu & Clutch'
      : n === 4 ? 'Official Match Ball'
      : `FIFA World Cup ${n}`,
    emojiFor: (n) => (n === 1 ? '🏆' : n === 2 ? '🛡️' : n === 3 ? '🎉' : n === 4 ? '⚽' : '🌎'),
    rarityFor: (n) => (n === 1 ? 'legendary' : n <= 3 ? 'epic' : n <= 8 ? 'rare' : 'common'),
  },
  {
    code: 'CC',
    team: 'Special Cards',
    emoji: '⭐',
    count: 12,
    name: (n) => `Special Card ${n}`,
    rarityFor: (n) => (n <= 4 ? 'epic' : 'rare'),
  },
  {
    code: 'DD',
    team: 'Special Cards',
    emoji: '✨',
    count: 1,
    name: (n) => `Special Edition ${n}`,
    rarityFor: () => 'legendary',
  },
]

function specialStickers(spec: SpecialSpec): Sticker[] {
  const list: Sticker[] = []
  for (let n = 1; n <= spec.count; n++) {
    list.push({
      id: `${spec.code}-${n}`,
      no: n,
      name: spec.name(n),
      subtitle: spec.team,
      team: spec.team,
      teamCode: '',
      emoji: spec.emojiFor ? spec.emojiFor(n) : spec.emoji,
      conf: 'FIFA',
      rarity: spec.rarityFor ? spec.rarityFor(n) : 'common',
      kind: 'special',
    })
  }
  return list
}

function buildStickers(): Sticker[] {
  const all: Sticker[] = []
  const ordered = [...TEAMS].sort((a, b) => {
    const ca = CONF_ORDER.indexOf(a.conf)
    const cb = CONF_ORDER.indexOf(b.conf)
    return ca === cb ? a.name.localeCompare(b.name) : ca - cb
  })
  for (const team of ordered) all.push(...teamStickers(team))
  for (const spec of SPECIALS) all.push(...specialStickers(spec))
  return all
}

export const STICKERS: Sticker[] = buildStickers()
export const TOTAL_STICKERS = STICKERS.length

export const STICKER_BY_ID: Record<string, Sticker> = Object.fromEntries(
  STICKERS.map((s) => [s.id, s]),
)
