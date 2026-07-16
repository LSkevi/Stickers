// World Cup 2026 — 48 teams across 12 groups (A–L).
// `code` is an ISO 3166-1 alpha-2 code used for flag artwork via flagcdn.com.
// `stars` are well-known players used to make the checklist feel alive; every
// sticker is fully editable in the app, so Luan can correct names and rosters.

export type Confederation =
  | 'UEFA'
  | 'CONMEBOL'
  | 'CONCACAF'
  | 'CAF'
  | 'AFC'
  | 'OFC'

export interface Team {
  code: string // flagcdn code (lowercase)
  name: string
  emoji: string
  group: string
  conf: Confederation
  host?: boolean
  stars: string[]
}

export const TEAMS: Team[] = [
  // Group A
  { code: 'ar', name: 'Argentina', emoji: '🇦🇷', group: 'A', conf: 'CONMEBOL', stars: ['Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez', 'Enzo Fernández', 'Emiliano Martínez'] },
  { code: 'pl', name: 'Poland', emoji: '🇵🇱', group: 'A', conf: 'UEFA', stars: ['Robert Lewandowski', 'Piotr Zieliński', 'Wojciech Szczęsny'] },
  { code: 'sa', name: 'Saudi Arabia', emoji: '🇸🇦', group: 'A', conf: 'AFC', stars: ['Salem Al-Dawsari', 'Firas Al-Buraikan'] },
  { code: 'nz', name: 'New Zealand', emoji: '🇳🇿', group: 'A', conf: 'OFC', stars: ['Chris Wood'] },

  // Group B
  { code: 'fr', name: 'France', emoji: '🇫🇷', group: 'B', conf: 'UEFA', stars: ['Kylian Mbappé', 'Antoine Griezmann', 'Aurélien Tchouaméni', 'Ousmane Dembélé', 'Mike Maignan'] },
  { code: 'dk', name: 'Denmark', emoji: '🇩🇰', group: 'B', conf: 'UEFA', stars: ['Christian Eriksen', 'Rasmus Højlund'] },
  { code: 'ci', name: 'Ivory Coast', emoji: '🇨🇮', group: 'B', conf: 'CAF', stars: ['Sébastien Haller', 'Franck Kessié'] },
  { code: 'pa', name: 'Panama', emoji: '🇵🇦', group: 'B', conf: 'CONCACAF', stars: ['Adalberto Carrasquilla'] },

  // Group C
  { code: 'br', name: 'Brazil', emoji: '🇧🇷', group: 'C', conf: 'CONMEBOL', stars: ['Vinícius Júnior', 'Rodrygo', 'Neymar Jr', 'Casemiro', 'Alisson'] },
  { code: 'ch', name: 'Switzerland', emoji: '🇨🇭', group: 'C', conf: 'UEFA', stars: ['Granit Xhaka', 'Manuel Akanji'] },
  { code: 'eg', name: 'Egypt', emoji: '🇪🇬', group: 'C', conf: 'CAF', stars: ['Mohamed Salah', 'Omar Marmoush'] },
  { code: 'jm', name: 'Jamaica', emoji: '🇯🇲', group: 'C', conf: 'CONCACAF', stars: ['Michail Antonio'] },

  // Group D
  { code: 'gb-eng', name: 'England', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'D', conf: 'UEFA', stars: ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka', 'Phil Foden', 'Jordan Pickford'] },
  { code: 'rs', name: 'Serbia', emoji: '🇷🇸', group: 'D', conf: 'UEFA', stars: ['Dušan Vlahović', 'Sergej Milinković-Savić'] },
  { code: 'tn', name: 'Tunisia', emoji: '🇹🇳', group: 'D', conf: 'CAF', stars: ['Hannibal Mejbri'] },
  { code: 'cr', name: 'Costa Rica', emoji: '🇨🇷', group: 'D', conf: 'CONCACAF', stars: ['Keylor Navas'] },

  // Group E
  { code: 'es', name: 'Spain', emoji: '🇪🇸', group: 'E', conf: 'UEFA', stars: ['Lamine Yamal', 'Rodri', 'Pedri', 'Nico Williams', 'Unai Simón'] },
  { code: 'uy', name: 'Uruguay', emoji: '🇺🇾', group: 'E', conf: 'CONMEBOL', stars: ['Federico Valverde', 'Darwin Núñez'] },
  { code: 'gh', name: 'Ghana', emoji: '🇬🇭', group: 'E', conf: 'CAF', stars: ['Mohammed Kudus'] },
  { code: 'ir', name: 'Iran', emoji: '🇮🇷', group: 'E', conf: 'AFC', stars: ['Mehdi Taremi', 'Alireza Jahanbakhsh'] },

  // Group F
  { code: 'pt', name: 'Portugal', emoji: '🇵🇹', group: 'F', conf: 'UEFA', stars: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'Diogo Costa'] },
  { code: 'se', name: 'Sweden', emoji: '🇸🇪', group: 'F', conf: 'UEFA', stars: ['Alexander Isak', 'Viktor Gyökeres'] },
  { code: 'ng', name: 'Nigeria', emoji: '🇳🇬', group: 'F', conf: 'CAF', stars: ['Victor Osimhen', 'Ademola Lookman'] },
  { code: 'au', name: 'Australia', emoji: '🇦🇺', group: 'F', conf: 'AFC', stars: ['Mathew Ryan'] },

  // Group G
  { code: 'de', name: 'Germany', emoji: '🇩🇪', group: 'G', conf: 'UEFA', stars: ['Jamal Musiala', 'Florian Wirtz', 'Kai Havertz', 'Joshua Kimmich', 'Antonio Rüdiger'] },
  { code: 'co', name: 'Colombia', emoji: '🇨🇴', group: 'G', conf: 'CONMEBOL', stars: ['James Rodríguez', 'Luis Díaz'] },
  { code: 'sn', name: 'Senegal', emoji: '🇸🇳', group: 'G', conf: 'CAF', stars: ['Sadio Mané', 'Nicolas Jackson'] },
  { code: 'qa', name: 'Qatar', emoji: '🇶🇦', group: 'G', conf: 'AFC', stars: ['Akram Afif'] },

  // Group H
  { code: 'nl', name: 'Netherlands', emoji: '🇳🇱', group: 'H', conf: 'UEFA', stars: ['Virgil van Dijk', 'Cody Gakpo', 'Frenkie de Jong', 'Memphis Depay'] },
  { code: 'jp', name: 'Japan', emoji: '🇯🇵', group: 'H', conf: 'AFC', stars: ['Takefusa Kubo', 'Kaoru Mitoma'] },
  { code: 'cm', name: 'Cameroon', emoji: '🇨🇲', group: 'H', conf: 'CAF', stars: ['André Onana', 'Bryan Mbeumo'] },
  { code: 'ua', name: 'Ukraine', emoji: '🇺🇦', group: 'H', conf: 'UEFA', stars: ['Mykhailo Mudryk', 'Artem Dovbyk'] },

  // Group I
  { code: 'be', name: 'Belgium', emoji: '🇧🇪', group: 'I', conf: 'UEFA', stars: ['Kevin De Bruyne', 'Romelu Lukaku', 'Jérémy Doku'] },
  { code: 'pe', name: 'Peru', emoji: '🇵🇪', group: 'I', conf: 'CONMEBOL', stars: ['Gianluca Lapadula'] },
  { code: 'ma', name: 'Morocco', emoji: '🇲🇦', group: 'I', conf: 'CAF', stars: ['Achraf Hakimi', 'Brahim Díaz', 'Youssef En-Nesyri'] },
  { code: 'no', name: 'Norway', emoji: '🇳🇴', group: 'I', conf: 'UEFA', stars: ['Erling Haaland', 'Martin Ødegaard'] },

  // Group J
  { code: 'hr', name: 'Croatia', emoji: '🇭🇷', group: 'J', conf: 'UEFA', stars: ['Luka Modrić', 'Joško Gvardiol'] },
  { code: 'kr', name: 'South Korea', emoji: '🇰🇷', group: 'J', conf: 'AFC', stars: ['Son Heung-min', 'Kim Min-jae'] },
  { code: 'dz', name: 'Algeria', emoji: '🇩🇿', group: 'J', conf: 'CAF', stars: ['Riyad Mahrez'] },
  { code: 'tr', name: 'Turkey', emoji: '🇹🇷', group: 'J', conf: 'UEFA', stars: ['Arda Güler', 'Hakan Çalhanoğlu'] },

  // Group K
  { code: 'us', name: 'United States', emoji: '🇺🇸', group: 'K', conf: 'CONCACAF', host: true, stars: ['Christian Pulisic', 'Weston McKennie', 'Gio Reyna'] },
  { code: 'it', name: 'Italy', emoji: '🇮🇹', group: 'K', conf: 'UEFA', stars: ['Federico Chiesa', 'Nicolò Barella', 'Gianluigi Donnarumma'] },
  { code: 'cl', name: 'Chile', emoji: '🇨🇱', group: 'K', conf: 'CONMEBOL', stars: ['Alexis Sánchez'] },
  { code: 'at', name: 'Austria', emoji: '🇦🇹', group: 'K', conf: 'UEFA', stars: ['David Alaba', 'Marcel Sabitzer'] },

  // Group L
  { code: 'mx', name: 'Mexico', emoji: '🇲🇽', group: 'L', conf: 'CONCACAF', host: true, stars: ['Santiago Giménez', 'Edson Álvarez', 'Hirving Lozano'] },
  { code: 'ca', name: 'Canada', emoji: '🇨🇦', group: 'L', conf: 'CONCACAF', host: true, stars: ['Alphonso Davies', 'Jonathan David'] },
  { code: 'ec', name: 'Ecuador', emoji: '🇪🇨', group: 'L', conf: 'CONMEBOL', stars: ['Moisés Caicedo', 'Enner Valencia'] },
  { code: 'py', name: 'Paraguay', emoji: '🇵🇾', group: 'L', conf: 'CONMEBOL', stars: ['Miguel Almirón'] },
]
