// Luan's real Copa 2026 sticker album — faithful to the fast bubble tracker he
// was already using. Each team has numbered stickers (1..max); tap to stick,
// tap again to add a "repetida" (double), long-press to clear.
//
// Order, names and structure match his album exactly. CC ("extras") are not
// counted toward the 980-sticker total, just like the original.

export interface Team {
  code: string
  name: string // Portuguese name, as in the album
  flag: string // emoji flag
  max: number // number of stickers on the team's page
}

export const TEAMS: Team[] = [
  { code: 'DD', name: 'Capa / Escudo', flag: '📔', max: 1 },
  { code: 'FWC', name: 'Especiais FWC', flag: '🏆', max: 19 },
  { code: 'MEX', name: 'México', flag: '🇲🇽', max: 20 },
  { code: 'RSA', name: 'África do Sul', flag: '🇿🇦', max: 20 },
  { code: 'KOR', name: 'Coreia do Sul', flag: '🇰🇷', max: 20 },
  { code: 'CZE', name: 'Rep. Tcheca', flag: '🇨🇿', max: 20 },
  { code: 'CAN', name: 'Canadá', flag: '🇨🇦', max: 20 },
  { code: 'BIH', name: 'Bósnia e Herzeg.', flag: '🇧🇦', max: 20 },
  { code: 'QAT', name: 'Catar', flag: '🇶🇦', max: 20 },
  { code: 'SUI', name: 'Suíça', flag: '🇨🇭', max: 20 },
  { code: 'BRA', name: 'Brasil', flag: '🇧🇷', max: 20 },
  { code: 'MAR', name: 'Marrocos', flag: '🇲🇦', max: 20 },
  { code: 'HAI', name: 'Haiti', flag: '🇭🇹', max: 20 },
  { code: 'SCO', name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', max: 20 },
  { code: 'USA', name: 'Estados Unidos', flag: '🇺🇸', max: 20 },
  { code: 'PAR', name: 'Paraguai', flag: '🇵🇾', max: 20 },
  { code: 'AUS', name: 'Austrália', flag: '🇦🇺', max: 20 },
  { code: 'TUR', name: 'Turquia', flag: '🇹🇷', max: 20 },
  { code: 'GER', name: 'Alemanha', flag: '🇩🇪', max: 20 },
  { code: 'CUW', name: 'Curaçao', flag: '🇨🇼', max: 20 },
  { code: 'CIV', name: 'Costa do Marfim', flag: '🇨🇮', max: 20 },
  { code: 'ECU', name: 'Equador', flag: '🇪🇨', max: 20 },
  { code: 'NED', name: 'Holanda', flag: '🇳🇱', max: 20 },
  { code: 'JPN', name: 'Japão', flag: '🇯🇵', max: 20 },
  { code: 'SWE', name: 'Suécia', flag: '🇸🇪', max: 20 },
  { code: 'TUN', name: 'Tunísia', flag: '🇹🇳', max: 20 },
  { code: 'BEL', name: 'Bélgica', flag: '🇧🇪', max: 20 },
  { code: 'EGY', name: 'Egito', flag: '🇪🇬', max: 20 },
  { code: 'IRN', name: 'Irã', flag: '🇮🇷', max: 20 },
  { code: 'NZL', name: 'Nova Zelândia', flag: '🇳🇿', max: 20 },
  { code: 'ESP', name: 'Espanha', flag: '🇪🇸', max: 20 },
  { code: 'CPV', name: 'Cabo Verde', flag: '🇨🇻', max: 20 },
  { code: 'KSA', name: 'Arábia Saudita', flag: '🇸🇦', max: 20 },
  { code: 'URU', name: 'Uruguai', flag: '🇺🇾', max: 20 },
  { code: 'FRA', name: 'França', flag: '🇫🇷', max: 20 },
  { code: 'SEN', name: 'Senegal', flag: '🇸🇳', max: 20 },
  { code: 'IRQ', name: 'Iraque', flag: '🇮🇶', max: 20 },
  { code: 'NOR', name: 'Noruega', flag: '🇳🇴', max: 20 },
  { code: 'ARG', name: 'Argentina', flag: '🇦🇷', max: 20 },
  { code: 'ALG', name: 'Argélia', flag: '🇩🇿', max: 20 },
  { code: 'AUT', name: 'Áustria', flag: '🇦🇹', max: 20 },
  { code: 'JOR', name: 'Jordânia', flag: '🇯🇴', max: 20 },
  { code: 'POR', name: 'Portugal', flag: '🇵🇹', max: 20 },
  { code: 'COD', name: 'Congo RD', flag: '🇨🇩', max: 20 },
  { code: 'UZB', name: 'Uzbequistão', flag: '🇺🇿', max: 20 },
  { code: 'COL', name: 'Colômbia', flag: '🇨🇴', max: 20 },
  { code: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', max: 20 },
  { code: 'CRO', name: 'Croácia', flag: '🇭🇷', max: 20 },
  { code: 'GHA', name: 'Gana', flag: '🇬🇭', max: 20 },
  { code: 'PAN', name: 'Panamá', flag: '🇵🇦', max: 20 },
  { code: 'CC', name: 'Especiais CC (extra)', flag: '✨', max: 14 },
]

// CC stickers are "extras" and don't count toward album completion.
export const EXCLUDED_FROM_TOTAL = ['CC']

export const TOTAL = TEAMS.filter((t) => !EXCLUDED_FROM_TOTAL.includes(t.code)).reduce(
  (sum, t) => sum + t.max,
  0,
) // 980

// Luan's current collection (counts: 1 = stuck, 2+ = with N-1 doubles).
export const INITIAL: Record<string, number> = {
  'DD-1': 1, 'ALG-1': 1, 'ALG-10': 1, 'ALG-11': 1, 'ALG-12': 1, 'ALG-13': 1, 'ALG-14': 2, 'ALG-15': 1, 'ALG-16': 1, 'ALG-17': 2, 'ALG-18': 2, 'ALG-19': 1, 'ALG-2': 1, 'ALG-20': 1, 'ALG-3': 1, 'ALG-5': 1, 'ALG-6': 1, 'ALG-7': 1, 'ALG-8': 1, 'ALG-9': 1, 'ARG-10': 2, 'ARG-11': 2, 'ARG-12': 1, 'ARG-13': 1, 'ARG-14': 1, 'ARG-15': 2, 'ARG-16': 3, 'ARG-17': 1, 'ARG-18': 1, 'ARG-19': 1, 'ARG-2': 1, 'ARG-20': 2, 'ARG-3': 1, 'ARG-4': 2, 'ARG-5': 1, 'ARG-7': 1, 'ARG-8': 1, 'ARG-9': 1, 'AUS-1': 1, 'AUS-10': 3, 'AUS-11': 1, 'AUS-12': 1, 'AUS-13': 1, 'AUS-15': 1, 'AUS-16': 1, 'AUS-17': 1, 'AUS-18': 1, 'AUS-19': 2, 'AUS-2': 1, 'AUS-20': 1, 'AUS-3': 2, 'AUS-4': 1, 'AUS-5': 1, 'AUS-6': 1, 'AUS-7': 2, 'AUS-8': 1, 'AUS-9': 1, 'AUT-1': 2, 'AUT-10': 1, 'AUT-11': 1, 'AUT-12': 2, 'AUT-13': 1, 'AUT-14': 1, 'AUT-15': 1, 'AUT-18': 1, 'AUT-2': 1, 'AUT-20': 1, 'AUT-3': 2, 'AUT-4': 1, 'AUT-5': 1, 'AUT-6': 1, 'AUT-8': 1, 'AUT-9': 1, 'BEL-10': 1, 'BEL-11': 1, 'BEL-12': 1, 'BEL-13': 1, 'BEL-14': 2, 'BEL-15': 2, 'BEL-16': 1, 'BEL-17': 1, 'BEL-18': 1, 'BEL-20': 1, 'BEL-3': 2, 'BEL-4': 1, 'BEL-5': 1, 'BEL-6': 2, 'BEL-7': 2, 'BEL-8': 1, 'BEL-9': 1, 'BIH-1': 2, 'BIH-10': 1, 'BIH-11': 1, 'BIH-12': 1, 'BIH-13': 1, 'BIH-14': 1, 'BIH-15': 1, 'BIH-16': 1, 'BIH-18': 1, 'BIH-19': 1, 'BIH-20': 1, 'BIH-3': 1, 'BIH-4': 1, 'BIH-5': 1, 'BIH-7': 1, 'BIH-8': 1, 'BIH-9': 1, 'BRA-1': 1, 'BRA-10': 1, 'BRA-11': 2, 'BRA-12': 1, 'BRA-13': 1, 'BRA-14': 1, 'BRA-15': 1, 'BRA-16': 1, 'BRA-18': 2, 'BRA-19': 1, 'BRA-2': 2, 'BRA-20': 1, 'BRA-3': 1, 'BRA-5': 1, 'BRA-6': 1, 'BRA-7': 2, 'BRA-9': 1, 'CAN-10': 1, 'CAN-11': 1, 'CAN-12': 1, 'CAN-14': 1, 'CAN-15': 1, 'CAN-16': 2, 'CAN-18': 1, 'CAN-19': 1, 'CAN-20': 1, 'CAN-3': 2, 'CAN-4': 1, 'CAN-5': 2, 'CAN-6': 1, 'CAN-7': 1, 'CAN-8': 1, 'CAN-9': 1, 'CIV-1': 1, 'CIV-10': 1, 'CIV-11': 3, 'CIV-12': 1, 'CIV-13': 1, 'CIV-14': 1, 'CIV-15': 1, 'CIV-16': 3, 'CIV-17': 2, 'CIV-18': 1, 'CIV-19': 1, 'CIV-2': 2, 'CIV-20': 1, 'CIV-3': 2, 'CIV-4': 1, 'CIV-5': 1, 'CIV-6': 1, 'CIV-7': 2, 'CIV-8': 2, 'CIV-9': 1, 'COD-1': 1, 'COD-10': 1, 'COD-11': 1, 'COD-12': 1, 'COD-14': 1, 'COD-15': 2, 'COD-16': 1, 'COD-17': 1, 'COD-18': 1, 'COD-19': 2, 'COD-2': 1, 'COD-20': 1, 'COD-3': 1, 'COD-5': 1, 'COD-6': 1, 'COD-7': 1, 'COD-8': 1, 'COL-1': 1, 'COL-11': 2, 'COL-12': 1, 'COL-13': 1, 'COL-14': 1, 'COL-15': 1, 'COL-16': 1, 'COL-17': 1, 'COL-2': 1, 'COL-20': 1, 'COL-3': 1, 'COL-4': 1, 'COL-5': 1, 'COL-7': 1, 'COL-8': 1, 'COL-9': 2, 'CPV-1': 2, 'CPV-12': 1, 'CPV-13': 1, 'CPV-15': 1, 'CPV-16': 1, 'CPV-17': 1, 'CPV-18': 1, 'CPV-19': 1, 'CPV-2': 1, 'CPV-20': 1, 'CPV-3': 1, 'CPV-4': 1, 'CPV-5': 3, 'CPV-7': 1, 'CPV-8': 1, 'CPV-9': 2, 'CRO-11': 2, 'CRO-12': 1, 'CRO-13': 1, 'CRO-14': 3, 'CRO-15': 1, 'CRO-16': 3, 'CRO-17': 1, 'CRO-19': 1, 'CRO-2': 1, 'CRO-20': 1, 'CRO-3': 1, 'CRO-4': 2, 'CRO-5': 1, 'CRO-6': 1, 'CRO-7': 1, 'CRO-8': 1, 'CRO-9': 2, 'CUW-1': 1, 'CUW-10': 1, 'CUW-12': 1, 'CUW-13': 1, 'CUW-14': 2, 'CUW-17': 1, 'CUW-18': 2, 'CUW-2': 2, 'CUW-20': 1, 'CUW-3': 1, 'CUW-5': 2, 'CUW-7': 1, 'CUW-8': 1, 'CUW-9': 2, 'CZE-1': 1, 'CZE-10': 1, 'CZE-11': 2, 'CZE-12': 1, 'CZE-13': 2, 'CZE-14': 1, 'CZE-15': 1, 'CZE-16': 2, 'CZE-18': 1, 'CZE-19': 2, 'CZE-2': 1, 'CZE-20': 2, 'CZE-3': 2, 'CZE-4': 2, 'CZE-5': 1, 'CZE-6': 1, 'CZE-7': 2, 'CZE-8': 2, 'CZE-9': 1, 'ECU-10': 2, 'ECU-11': 1, 'ECU-14': 1, 'ECU-15': 1, 'ECU-16': 1, 'ECU-18': 1, 'ECU-19': 1, 'ECU-2': 1, 'ECU-3': 1, 'ECU-4': 1, 'ECU-6': 1, 'ECU-7': 1, 'ECU-8': 1, 'ECU-9': 1, 'EGY-10': 1, 'EGY-12': 1, 'EGY-13': 1, 'EGY-14': 1, 'EGY-15': 1, 'EGY-18': 1, 'EGY-19': 1, 'EGY-2': 1, 'EGY-20': 1, 'EGY-3': 1, 'EGY-4': 1, 'EGY-5': 1, 'EGY-6': 1, 'EGY-7': 1, 'EGY-8': 1, 'EGY-9': 1, 'ENG-1': 1, 'ENG-10': 1, 'ENG-11': 1, 'ENG-13': 1, 'ENG-14': 1, 'ENG-15': 1, 'ENG-16': 1, 'ENG-17': 1, 'ENG-18': 1, 'ENG-19': 1, 'ENG-20': 1, 'ENG-3': 1, 'ENG-4': 1, 'ENG-6': 1, 'ENG-7': 1, 'ENG-8': 1, 'ENG-9': 1, 'ESP-1': 1, 'ESP-10': 1, 'ESP-12': 1, 'ESP-13': 1, 'ESP-14': 1, 'ESP-17': 1, 'ESP-18': 2, 'ESP-19': 1, 'ESP-2': 1, 'ESP-3': 2, 'ESP-4': 1, 'ESP-5': 1, 'ESP-7': 2, 'ESP-8': 1, 'ESP-9': 1, 'FRA-1': 1, 'FRA-10': 2, 'FRA-11': 1, 'FRA-12': 1, 'FRA-13': 1, 'FRA-15': 1, 'FRA-16': 1, 'FRA-17': 1, 'FRA-18': 1, 'FRA-19': 1, 'FRA-2': 1, 'FRA-3': 1, 'FRA-4': 1, 'FRA-6': 1, 'FRA-7': 1, 'FRA-8': 1, 'FRA-9': 1, 'FWC-1': 1, 'FWC-10': 1, 'FWC-11': 1, 'FWC-12': 1, 'FWC-13': 1, 'FWC-15': 2, 'FWC-16': 1, 'FWC-18': 1, 'FWC-19': 3, 'FWC-3': 1, 'FWC-4': 1, 'FWC-5': 1, 'FWC-8': 2, 'FWC-9': 2, 'GER-10': 1, 'GER-11': 1, 'GER-12': 1, 'GER-13': 1, 'GER-14': 1, 'GER-15': 1, 'GER-16': 1, 'GER-17': 2, 'GER-18': 1, 'GER-19': 1, 'GER-2': 1, 'GER-20': 1, 'GER-3': 1, 'GER-4': 1, 'GER-5': 1, 'GER-6': 1, 'GER-7': 1, 'GER-8': 1, 'GER-9': 1, 'GHA-1': 1, 'GHA-10': 1, 'GHA-11': 1, 'GHA-13': 1, 'GHA-14': 1, 'GHA-15': 1, 'GHA-16': 1, 'GHA-17': 1, 'GHA-19': 1, 'GHA-2': 1, 'GHA-20': 1, 'GHA-3': 1, 'GHA-4': 1, 'GHA-6': 1, 'GHA-7': 1, 'GHA-8': 1, 'GHA-9': 1, 'HAI-1': 2, 'HAI-10': 1, 'HAI-12': 1, 'HAI-13': 1, 'HAI-14': 1, 'HAI-15': 1, 'HAI-17': 1, 'HAI-18': 1, 'HAI-19': 1, 'HAI-20': 1, 'HAI-4': 2, 'HAI-5': 1, 'HAI-8': 1, 'HAI-9': 2, 'IRN-1': 1, 'IRN-10': 1, 'IRN-11': 1, 'IRN-12': 1, 'IRN-13': 1, 'IRN-14': 2, 'IRN-15': 1, 'IRN-16': 1, 'IRN-17': 1, 'IRN-18': 2, 'IRN-19': 1, 'IRN-2': 2, 'IRN-20': 1, 'IRN-3': 1, 'IRN-4': 1, 'IRN-5': 2, 'IRN-6': 1, 'IRN-8': 1, 'IRN-9': 2, 'IRQ-1': 1, 'IRQ-10': 1, 'IRQ-13': 1, 'IRQ-14': 1, 'IRQ-15': 1, 'IRQ-16': 1, 'IRQ-17': 1, 'IRQ-19': 2, 'IRQ-2': 2, 'IRQ-20': 1, 'IRQ-4': 2, 'IRQ-5': 1, 'IRQ-6': 1, 'IRQ-8': 1, 'IRQ-9': 1, 'JOR-10': 1, 'JOR-11': 1, 'JOR-12': 1, 'JOR-13': 1, 'JOR-15': 1, 'JOR-16': 1, 'JOR-17': 1, 'JOR-18': 1, 'JOR-19': 1, 'JOR-20': 1, 'JOR-3': 1, 'JOR-4': 1, 'JOR-6': 1, 'JOR-7': 1, 'JOR-8': 1, 'JPN-1': 1, 'JPN-10': 1, 'JPN-11': 1, 'JPN-12': 1, 'JPN-13': 1, 'JPN-14': 1, 'JPN-15': 1, 'JPN-16': 1, 'JPN-17': 1, 'JPN-18': 1, 'JPN-2': 1, 'JPN-20': 1, 'JPN-3': 1, 'JPN-5': 1, 'JPN-7': 1, 'JPN-8': 1, 'JPN-9': 1, 'KOR-1': 1, 'KOR-10': 1, 'KOR-11': 1, 'KOR-12': 1, 'KOR-13': 1, 'KOR-15': 1, 'KOR-16': 1, 'KOR-17': 1, 'KOR-2': 1, 'KOR-20': 1, 'KOR-3': 1, 'KOR-4': 1, 'KOR-5': 1, 'KOR-6': 1, 'KOR-7': 1, 'KOR-8': 1, 'KOR-9': 1, 'KSA-1': 1, 'KSA-10': 2, 'KSA-11': 1, 'KSA-12': 2, 'KSA-13': 1, 'KSA-14': 1, 'KSA-15': 3, 'KSA-16': 1, 'KSA-17': 1, 'KSA-18': 1, 'KSA-19': 3, 'KSA-2': 1, 'KSA-20': 1, 'KSA-4': 1, 'KSA-5': 1, 'KSA-6': 1, 'KSA-7': 1, 'KSA-8': 2, 'KSA-9': 1, 'MAR-1': 1, 'MAR-10': 1, 'MAR-12': 1, 'MAR-13': 1, 'MAR-14': 1, 'MAR-17': 1, 'MAR-18': 1, 'MAR-19': 1, 'MAR-2': 1, 'MAR-20': 1, 'MAR-4': 1, 'MAR-6': 1, 'MAR-7': 1, 'MAR-9': 1, 'MEX-1': 1, 'MEX-10': 1, 'MEX-11': 1, 'MEX-12': 1, 'MEX-13': 1, 'MEX-15': 1, 'MEX-16': 1, 'MEX-17': 1, 'MEX-19': 1, 'MEX-2': 1, 'MEX-20': 3, 'MEX-3': 1, 'MEX-4': 1, 'MEX-6': 1, 'MEX-7': 1, 'MEX-8': 1, 'MEX-9': 1, 'NED-1': 1, 'NED-10': 2, 'NED-11': 1, 'NED-12': 1, 'NED-14': 2, 'NED-16': 1, 'NED-18': 1, 'NED-2': 1, 'NED-20': 1, 'NED-4': 1, 'NED-5': 2, 'NED-6': 1, 'NED-7': 1, 'NED-8': 1, 'NED-9': 1, 'NOR-1': 1, 'NOR-10': 1, 'NOR-11': 1, 'NOR-12': 1, 'NOR-13': 1, 'NOR-14': 1, 'NOR-15': 1, 'NOR-16': 1, 'NOR-17': 1, 'NOR-18': 1, 'NOR-19': 1, 'NOR-20': 1, 'NOR-3': 1, 'NOR-6': 1, 'NOR-7': 1, 'NOR-8': 1, 'NOR-9': 1, 'NZL-10': 1, 'NZL-11': 1, 'NZL-12': 1, 'NZL-13': 1, 'NZL-14': 1, 'NZL-15': 1, 'NZL-16': 1, 'NZL-17': 1, 'NZL-18': 1, 'NZL-19': 2, 'NZL-3': 1, 'NZL-4': 1, 'NZL-7': 1, 'NZL-8': 1, 'NZL-9': 1, 'PAN-1': 2, 'PAN-10': 1, 'PAN-11': 2, 'PAN-12': 3, 'PAN-13': 1, 'PAN-14': 1, 'PAN-15': 1, 'PAN-16': 1, 'PAN-17': 2, 'PAN-18': 2, 'PAN-19': 1, 'PAN-2': 1, 'PAN-20': 1, 'PAN-3': 1, 'PAN-4': 2, 'PAN-5': 2, 'PAN-6': 2, 'PAN-7': 1, 'PAN-8': 3, 'PAN-9': 1, 'PAR-1': 1, 'PAR-10': 1, 'PAR-12': 1, 'PAR-13': 1, 'PAR-14': 1, 'PAR-15': 1, 'PAR-16': 1, 'PAR-18': 1, 'PAR-19': 1, 'PAR-2': 2, 'PAR-20': 1, 'PAR-3': 1, 'PAR-5': 1, 'PAR-8': 1, 'PAR-9': 1, 'POR-11': 1, 'POR-13': 1, 'POR-14': 1, 'POR-16': 1, 'POR-18': 1, 'POR-19': 1, 'POR-2': 1, 'POR-20': 1, 'POR-3': 1, 'POR-4': 1, 'POR-7': 1, 'POR-9': 1, 'QAT-1': 2, 'QAT-10': 1, 'QAT-11': 1, 'QAT-12': 1, 'QAT-13': 1, 'QAT-14': 2, 'QAT-16': 1, 'QAT-17': 1, 'QAT-18': 1, 'QAT-19': 1, 'QAT-20': 1, 'QAT-3': 1, 'QAT-4': 1, 'QAT-5': 2, 'QAT-6': 1, 'QAT-7': 1, 'QAT-8': 1, 'QAT-9': 1, 'RSA-1': 1, 'RSA-10': 1, 'RSA-11': 1, 'RSA-12': 1, 'RSA-13': 1, 'RSA-14': 1, 'RSA-15': 1, 'RSA-16': 1, 'RSA-17': 1, 'RSA-18': 1, 'RSA-19': 2, 'RSA-2': 1, 'RSA-20': 1, 'RSA-3': 3, 'RSA-4': 2, 'RSA-5': 1, 'RSA-6': 1, 'RSA-7': 1, 'RSA-8': 3, 'RSA-9': 2, 'SCO-1': 1, 'SCO-10': 2, 'SCO-11': 3, 'SCO-13': 1, 'SCO-14': 1, 'SCO-15': 1, 'SCO-16': 2, 'SCO-19': 2, 'SCO-2': 3, 'SCO-20': 3, 'SCO-3': 3, 'SCO-4': 1, 'SCO-5': 1, 'SCO-6': 1, 'SCO-7': 4, 'SCO-8': 1, 'SCO-9': 1, 'SEN-10': 1, 'SEN-11': 2, 'SEN-12': 1, 'SEN-13': 1, 'SEN-14': 1, 'SEN-15': 1, 'SEN-16': 1, 'SEN-17': 1, 'SEN-18': 1, 'SEN-19': 2, 'SEN-2': 1, 'SEN-20': 2, 'SEN-3': 1, 'SEN-4': 2, 'SEN-5': 2, 'SEN-6': 1, 'SEN-7': 1, 'SEN-8': 1, 'SEN-9': 2, 'SUI-10': 1, 'SUI-11': 1, 'SUI-12': 1, 'SUI-13': 1, 'SUI-14': 2, 'SUI-15': 1, 'SUI-16': 1, 'SUI-17': 2, 'SUI-18': 1, 'SUI-19': 1, 'SUI-2': 1, 'SUI-3': 1, 'SUI-4': 2, 'SUI-5': 1, 'SUI-6': 1, 'SUI-7': 1, 'SUI-8': 2, 'SUI-9': 1, 'SWE-1': 1, 'SWE-10': 1, 'SWE-11': 1, 'SWE-12': 1, 'SWE-14': 1, 'SWE-15': 1, 'SWE-16': 1, 'SWE-17': 2, 'SWE-18': 1, 'SWE-19': 1, 'SWE-2': 2, 'SWE-20': 1, 'SWE-3': 1, 'SWE-4': 1, 'SWE-5': 1, 'SWE-6': 2, 'SWE-7': 1, 'SWE-8': 1, 'SWE-9': 1, 'TUN-1': 1, 'TUN-10': 3, 'TUN-11': 1, 'TUN-12': 1, 'TUN-14': 1, 'TUN-15': 2, 'TUN-16': 1, 'TUN-17': 2, 'TUN-18': 1, 'TUN-19': 1, 'TUN-2': 2, 'TUN-20': 1, 'TUN-5': 2, 'TUN-8': 1, 'TUN-9': 1, 'TUR-10': 1, 'TUR-11': 1, 'TUR-12': 2, 'TUR-14': 1, 'TUR-15': 2, 'TUR-16': 1, 'TUR-17': 1, 'TUR-18': 1, 'TUR-19': 1, 'TUR-2': 1, 'TUR-20': 1, 'TUR-3': 1, 'TUR-4': 1, 'TUR-5': 1, 'TUR-6': 1, 'TUR-7': 1, 'TUR-8': 1, 'TUR-9': 1, 'URU-1': 1, 'URU-10': 2, 'URU-11': 1, 'URU-12': 1, 'URU-13': 1, 'URU-14': 1, 'URU-15': 1, 'URU-16': 1, 'URU-17': 1, 'URU-18': 1, 'URU-19': 1, 'URU-2': 1, 'URU-20': 1, 'URU-3': 1, 'URU-5': 1, 'URU-6': 1, 'URU-7': 1, 'URU-8': 1, 'URU-9': 1, 'USA-1': 1, 'USA-10': 1, 'USA-11': 1, 'USA-12': 1, 'USA-14': 1, 'USA-15': 1, 'USA-16': 1, 'USA-17': 1, 'USA-18': 1, 'USA-19': 1, 'USA-20': 1, 'USA-3': 1, 'USA-4': 1, 'USA-5': 1, 'USA-7': 1, 'USA-8': 1, 'USA-9': 1, 'UZB-1': 1, 'UZB-11': 1, 'UZB-12': 1, 'UZB-13': 1, 'UZB-15': 1, 'UZB-16': 1, 'UZB-17': 1, 'UZB-18': 1, 'UZB-19': 1, 'UZB-2': 1, 'UZB-20': 2, 'UZB-3': 1, 'UZB-5': 1, 'UZB-8': 1, 'UZB-9': 1, 'CC-9': 1, 'CC-10': 1, 'CC-12': 1,
}
