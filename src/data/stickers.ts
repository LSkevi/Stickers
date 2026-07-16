import { TEAMS, type Team } from './teams'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type Kind = 'badge' | 'player' | 'legend' | 'special'

export interface Sticker {
  id: string
  no: number // album number
  name: string
  subtitle: string
  team: string // team / section name
  teamCode: string // flagcdn code ('' when there is no flag)
  emoji: string
  group: string // group letter, or 'SP' for the special section
  conf: string
  rarity: Rarity
  kind: Kind
}

export const RARITY: Record<
  Rarity,
  { label: string; ring: string; text: string; dot: string; glow: string; order: number }
> = {
  common: { label: 'Common', ring: 'var(--r-common)', text: 'var(--r-common)', dot: 'var(--r-common)', glow: 'transparent', order: 0 },
  rare: { label: 'Rare', ring: 'var(--r-rare)', text: 'var(--r-rare)', dot: 'var(--r-rare)', glow: 'color-mix(in srgb, var(--r-rare) 40%, transparent)', order: 1 },
  epic: { label: 'Epic', ring: 'var(--r-epic)', text: 'var(--r-epic)', dot: 'var(--r-epic)', glow: 'color-mix(in srgb, var(--r-epic) 45%, transparent)', order: 2 },
  legendary: { label: 'Legendary', ring: 'var(--r-legendary)', text: 'var(--r-legendary)', dot: 'var(--r-legendary)', glow: 'color-mix(in srgb, var(--r-legendary) 60%, transparent)', order: 3 },
}

const PLAYERS_PER_TEAM = 18

function teamStickers(team: Team, startNo: number): { list: Sticker[]; next: number } {
  const list: Sticker[] = []
  let no = startNo

  // Team badge
  list.push({
    id: `${team.code}-badge`,
    no: no++,
    name: `${team.name} Badge`,
    subtitle: 'Team Crest',
    team: team.name,
    teamCode: team.code,
    emoji: team.emoji,
    group: team.group,
    conf: team.conf,
    rarity: 'epic',
    kind: 'badge',
  })

  // Team photo
  list.push({
    id: `${team.code}-squad`,
    no: no++,
    name: `${team.name} Squad`,
    subtitle: 'Team Photo',
    team: team.name,
    teamCode: team.code,
    emoji: team.emoji,
    group: team.group,
    conf: team.conf,
    rarity: 'rare',
    kind: 'special',
  })

  for (let i = 0; i < PLAYERS_PER_TEAM; i++) {
    const jersey = i + 1
    const star = team.stars[i]
    let rarity: Rarity = 'common'
    if (i === 0) rarity = 'legendary'
    else if (i === 1) rarity = 'epic'
    else if (i === 2 || i === 3) rarity = 'rare'

    list.push({
      id: `${team.code}-p${jersey}`,
      no: no++,
      name: star ?? `${team.name} No. ${jersey}`,
      subtitle: star ? 'Star Player' : `Squad · No. ${jersey}`,
      team: team.name,
      teamCode: team.code,
      emoji: team.emoji,
      group: team.group,
      conf: team.conf,
      rarity,
      kind: 'player',
    })
  }

  return { list, next: no }
}

// Legends of the World Cup — iconic retired players (legendary rarity).
const LEGENDS: { name: string; team: string; code: string; emoji: string }[] = [
  { name: 'Pelé', team: 'Brazil', code: 'br', emoji: '🇧🇷' },
  { name: 'Diego Maradona', team: 'Argentina', code: 'ar', emoji: '🇦🇷' },
  { name: 'Zinedine Zidane', team: 'France', code: 'fr', emoji: '🇫🇷' },
  { name: 'Ronaldo Nazário', team: 'Brazil', code: 'br', emoji: '🇧🇷' },
  { name: 'Franz Beckenbauer', team: 'Germany', code: 'de', emoji: '🇩🇪' },
  { name: 'Johan Cruyff', team: 'Netherlands', code: 'nl', emoji: '🇳🇱' },
  { name: 'Paolo Maldini', team: 'Italy', code: 'it', emoji: '🇮🇹' },
  { name: 'Bobby Charlton', team: 'England', code: 'gb-eng', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
]

// Tournament specials — no national flag, rendered with a gradient + emoji.
const SPECIALS: { name: string; subtitle: string; emoji: string; rarity: Rarity }[] = [
  { name: 'FIFA World Cup Trophy', subtitle: 'The Prize', emoji: '🏆', rarity: 'legendary' },
  { name: 'Official Match Ball', subtitle: 'Adidas', emoji: '⚽', rarity: 'epic' },
  { name: 'Tournament Mascots', subtitle: 'Maple, Zayu & Clutch', emoji: '🎉', rarity: 'epic' },
  { name: 'Host Nations 2026', subtitle: 'Canada · Mexico · USA', emoji: '🌎', rarity: 'rare' },
  { name: 'MetLife Stadium', subtitle: 'Final — New York/NJ', emoji: '🏟️', rarity: 'rare' },
  { name: 'Estadio Azteca', subtitle: 'Opening — Mexico City', emoji: '🏟️', rarity: 'rare' },
]

function buildStickers(): Sticker[] {
  const all: Sticker[] = []
  let no = 1

  const ordered = [...TEAMS].sort((a, b) =>
    a.group === b.group ? a.name.localeCompare(b.name) : a.group.localeCompare(b.group),
  )

  for (const team of ordered) {
    const { list, next } = teamStickers(team, no)
    all.push(...list)
    no = next
  }

  for (let i = 0; i < LEGENDS.length; i++) {
    const l = LEGENDS[i]
    all.push({
      id: `legend-${i}`,
      no: no++,
      name: l.name,
      subtitle: `Legend · ${l.team}`,
      team: 'Legends',
      teamCode: l.code,
      emoji: l.emoji,
      group: 'SP',
      conf: 'FIFA',
      rarity: 'legendary',
      kind: 'legend',
    })
  }

  for (let i = 0; i < SPECIALS.length; i++) {
    const s = SPECIALS[i]
    all.push({
      id: `special-${i}`,
      no: no++,
      name: s.name,
      subtitle: s.subtitle,
      team: 'Tournament',
      teamCode: '',
      emoji: s.emoji,
      group: 'SP',
      conf: 'FIFA',
      rarity: s.rarity,
      kind: 'special',
    })
  }

  return all
}

export const STICKERS: Sticker[] = buildStickers()
export const TOTAL_STICKERS = STICKERS.length

// Fast lookup by id.
export const STICKER_BY_ID: Record<string, Sticker> = Object.fromEntries(
  STICKERS.map((s) => [s.id, s]),
)

export const STICKER_INDEX: Record<string, number> = Object.fromEntries(
  STICKERS.map((s, i) => [s.id, i]),
)
