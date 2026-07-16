// Luan's real World Cup 2026 album — 48 national teams identified by their
// album code (ALG, ARG, …). `flag` is the flagcdn code for artwork, `conf` is
// the confederation used to browse/group the album. `stars` are the real squad
// rosters (icon/star first) taken from the official Panini FIFA World Cup 2026
// checklist, so the star lands on the legendary sticker. Every sticker is
// renameable in-app, so names can be corrected as squads change.

export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC'

export interface Team {
  code: string // album code, e.g. "ARG"
  name: string
  flag: string // flagcdn code, e.g. "ar"
  emoji: string
  conf: Confederation
  stars: string[]
}

export const CONF_LABEL: Record<string, string> = {
  UEFA: 'Europe',
  CONMEBOL: 'S. America',
  CONCACAF: 'N. America',
  CAF: 'Africa',
  AFC: 'Asia',
  OFC: 'Oceania',
  FIFA: 'Specials',
}

export const CONF_ORDER: string[] = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC', 'FIFA']

export const TEAMS: Team[] = [
  // CONMEBOL
  { code: 'ARG', name: 'Argentina', flag: 'ar', emoji: '🇦🇷', conf: 'CONMEBOL', stars: ['Lionel Messi', 'Julián Álvarez', 'Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi', 'Enzo Fernández', 'Alexis Mac Allister', 'Rodrigo De Paul', 'Giuliano Simeone', 'Lautaro Martínez'] },
  { code: 'BRA', name: 'Brazil', flag: 'br', emoji: '🇧🇷', conf: 'CONMEBOL', stars: ['Vinícius Júnior', 'Marquinhos', 'Alisson', 'Danilo', 'Éder Militão', 'Gabriel Magalhães', 'Casemiro', 'Bruno Guimarães', 'Rodrygo', 'Matheus Cunha', 'Raphinha'] },
  { code: 'COL', name: 'Colombia', flag: 'co', emoji: '🇨🇴', conf: 'CONMEBOL', stars: ['James Rodríguez', 'Luis Díaz', 'Camilo Vargas', 'Dávinson Sánchez', 'Yerry Mina', 'Daniel Muñoz', 'Jefferson Lerma', 'Richard Ríos', 'Juan Fernando Quintero', 'Jhon Arias', 'Luis Suárez'] },
  { code: 'ECU', name: 'Ecuador', flag: 'ec', emoji: '🇪🇨', conf: 'CONMEBOL', stars: ['Enner Valencia', 'Moisés Caicedo', 'Hernán Galíndez', 'Piero Hincapié', 'Pervis Estupiñán', 'Willian Pacho', 'Ángelo Preciado', 'Joel Ordóñez', 'Alan Franco', 'Gonzalo Plata', 'Kevin Rodríguez'] },
  { code: 'PAR', name: 'Paraguay', flag: 'py', emoji: '🇵🇾', conf: 'CONMEBOL', stars: ['Miguel Almirón', 'Gustavo Gómez', 'Roberto Fernández', 'Juan José Cáceres', 'Omar Alderete', 'Júnior Alonso', 'Andrés Cubas', 'Mathías Villasanti', 'Julio Enciso', 'Ramón Sosa', 'Antonio Sanabria'] },
  { code: 'URU', name: 'Uruguay', flag: 'uy', emoji: '🇺🇾', conf: 'CONMEBOL', stars: ['Federico Valverde', 'José María Giménez', 'Sergio Rochet', 'Ronald Araújo', 'Sebastián Cáceres', 'Mathías Olivera', 'Nahitan Nández', 'Rodrigo Bentancur', 'Manuel Ugarte', 'Facundo Pellistri', 'Darwin Núñez'] },

  // UEFA
  { code: 'AUT', name: 'Austria', flag: 'at', emoji: '🇦🇹', conf: 'UEFA', stars: ['David Alaba', 'Marko Arnautović', 'Alexander Schlager', 'Kevin Danso', 'Philipp Lienhart', 'Konrad Laimer', 'Nicolas Seiwald', 'Marcel Sabitzer', 'Florian Grillitsch', 'Christoph Baumgartner', 'Michael Gregoritsch'] },
  { code: 'BEL', name: 'Belgium', flag: 'be', emoji: '🇧🇪', conf: 'UEFA', stars: ['Kevin De Bruyne', 'Youri Tielemans', 'Thibaut Courtois', 'Arthur Theate', 'Timothy Castagne', 'Maxim De Cuyper', 'Amadou Onana', 'Jérémy Doku', 'Charles De Ketelaere', 'Leandro Trossard', 'Romelu Lukaku'] },
  { code: 'BIH', name: 'Bosnia & Herzegovina', flag: 'ba', emoji: '🇧🇦', conf: 'UEFA', stars: ['Edin Džeko', 'Miralem Pjanić', 'Sead Kolašinac', 'Amar Dedić', 'Nikola Katić', 'Ermedin Demirović', 'Benjamin Tahirović', 'Armin Gigović'] },
  { code: 'CRO', name: 'Croatia', flag: 'hr', emoji: '🇭🇷', conf: 'UEFA', stars: ['Luka Modrić', 'Ivan Perišić', 'Dominik Livaković', 'Duje Ćaleta-Car', 'Joško Gvardiol', 'Josip Stanišić', 'Mateo Kovačić', 'Lovro Majer', 'Mario Pašalić', 'Ante Budimir', 'Andrej Kramarić'] },
  { code: 'CZE', name: 'Czechia', flag: 'cz', emoji: '🇨🇿', conf: 'UEFA', stars: ['Patrik Schick', 'Tomáš Souček', 'Ladislav Krejčí', 'Vladimír Coufal', 'Antonín Barák', 'Tomáš Holeš', 'Adam Hložek', 'Lukáš Provod', 'David Jurásek'] },
  { code: 'ENG', name: 'England', flag: 'gb-eng', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', conf: 'UEFA', stars: ['Harry Kane', 'Jude Bellingham', 'Jordan Pickford', 'Reece James', 'John Stones', 'Declan Rice', 'Jordan Henderson', 'Phil Foden', 'Bukayo Saka', 'Cole Palmer', 'Marcus Rashford'] },
  { code: 'ESP', name: 'Spain', flag: 'es', emoji: '🇪🇸', conf: 'UEFA', stars: ['Rodri', 'Lamine Yamal', 'Unai Simón', 'Robin Le Normand', 'Dean Huijsen', 'Marc Cucurella', 'Martín Zubimendi', 'Pedri', 'Fabián Ruiz', 'Nico Williams', 'Mikel Oyarzabal'] },
  { code: 'FRA', name: 'France', flag: 'fr', emoji: '🇫🇷', conf: 'UEFA', stars: ['Kylian Mbappé', 'Ousmane Dembélé', 'Mike Maignan', 'William Saliba', 'Jules Koundé', 'Théo Hernández', 'Aurélien Tchouaméni', 'Eduardo Camavinga', 'Bradley Barcola', 'Marcus Thuram', 'Randal Kolo Muani'] },
  { code: 'GER', name: 'Germany', flag: 'de', emoji: '🇩🇪', conf: 'UEFA', stars: ['Joshua Kimmich', 'Jamal Musiala', 'Marc-André ter Stegen', 'Antonio Rüdiger', 'Jonathan Tah', 'Felix Nmecha', 'Leon Goretzka', 'Florian Wirtz', 'Serge Gnabry', 'Kai Havertz', 'Leroy Sané'] },
  { code: 'NED', name: 'Netherlands', flag: 'nl', emoji: '🇳🇱', conf: 'UEFA', stars: ['Virgil van Dijk', 'Memphis Depay', 'Bart Verbruggen', 'Nathan Aké', 'Jeremie Frimpong', 'Denzel Dumfries', 'Tijjani Reijnders', 'Ryan Gravenberch', 'Cody Gakpo', 'Donyell Malen', 'Wout Weghorst'] },
  { code: 'NOR', name: 'Norway', flag: 'no', emoji: '🇳🇴', conf: 'UEFA', stars: ['Erling Haaland', 'Martin Ødegaard', 'Ørjan Nyland', 'Julian Ryerson', 'Kristoffer Vassbakk Ajer', 'David Møller Wolfe', 'Sander Berge', 'Patrick Berg', 'Antonio Nusa', 'Oscar Bobb', 'Alexander Sørloth'] },
  { code: 'POR', name: 'Portugal', flag: 'pt', emoji: '🇵🇹', conf: 'UEFA', stars: ['Cristiano Ronaldo', 'Vitinha', 'Diogo Costa', 'Rúben Dias', 'Nuno Mendes', 'Bernardo Silva', 'Bruno Fernandes', 'Rúben Neves', 'Francisco Conceição', 'Pedro Neto', 'Rafael Leão'] },
  { code: 'SCO', name: 'Scotland', flag: 'gb-sct', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', conf: 'UEFA', stars: ['Andrew Robertson', 'Scott McTominay', 'Angus Gunn', 'Kieran Tierney', 'Grant Hanley', 'Billy Gilmour', 'Lewis Ferguson', 'Ryan Christie', 'John McGinn', 'Ben Gannon-Doak', 'Ché Adams'] },
  { code: 'SUI', name: 'Switzerland', flag: 'ch', emoji: '🇨🇭', conf: 'UEFA', stars: ['Granit Xhaka', 'Manuel Akanji', 'Gregor Kobel', 'Nico Elvedi', 'Ricardo Rodríguez', 'Silvan Widmer', 'Denis Zakaria', 'Remo Freuler', 'Breel Embolo', 'Rubén Vargas', 'Dan Ndoye'] },
  { code: 'SWE', name: 'Sweden', flag: 'se', emoji: '🇸🇪', conf: 'UEFA', stars: ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski', 'Anthony Elanga', 'Emil Forsberg', 'Victor Lindelöf', 'Robin Olsen', 'Ludwig Augustinsson', 'Hjalmar Ekdal'] },
  { code: 'TUR', name: 'Turkey', flag: 'tr', emoji: '🇹🇷', conf: 'UEFA', stars: ['Hakan Çalhanoğlu', 'Arda Güler', 'Kenan Yıldız', 'Merih Demiral', 'Kaan Ayhan', 'Ferdi Kadıoğlu', 'Orkun Kökçü', 'Kerem Aktürkoğlu', 'Çağlar Söyüncü', 'Uğurcan Çakır'] },

  // CONCACAF
  { code: 'CAN', name: 'Canada', flag: 'ca', emoji: '🇨🇦', conf: 'CONCACAF', stars: ['Alphonso Davies', 'Jonathan David', 'Dayne St. Clair', 'Richie Laryea', 'Derek Cornelius', 'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Jacob Shaffelburg', 'Tajon Buchanan', 'Cyle Larin'] },
  { code: 'CUW', name: 'Curaçao', flag: 'cw', emoji: '🇨🇼', conf: 'CONCACAF', stars: ['Leandro Bacuna', 'Jurién Gaari', 'Eloy Room', 'Sherel Floranus', 'Roshon van Eijma', 'Armando Obispo', 'Livano Comenencia', 'Juninho Bacuna', 'Kenji Gorré', 'Sontje Hansen', 'Jearl Margaritha'] },
  { code: 'HAI', name: 'Haiti', flag: 'ht', emoji: '🇭🇹', conf: 'CONCACAF', stars: ['Duckens Nazon', 'Frantzdy Pierrot', 'Johny Placide', 'Ricardo Adé', 'Carlens Arcus', 'Hannes Delcroix', 'Leverton Pierre', 'Danley Jean Jacques', 'Jean-Ricner Bellegarde', 'Ruben Providence', 'Don Deedson Louicius'] },
  { code: 'MEX', name: 'Mexico', flag: 'mx', emoji: '🇲🇽', conf: 'CONCACAF', stars: ['Raúl Jiménez', 'Edson Álvarez', 'Luis Malagón', 'Israel Reyes', 'Johan Vásquez', 'César Montes', 'Jesús Gallardo', 'Carlos Rodríguez', 'Orbelín Pineda', 'Hirving Lozano', 'Santiago Giménez'] },
  { code: 'PAN', name: 'Panama', flag: 'pa', emoji: '🇵🇦', conf: 'CONCACAF', stars: ['Aníbal Godoy', 'Michael Amir Murillo', 'Orlando Mosquera', 'Andrés Andrade', 'Fidel Escobar', 'Cristian Martínez', 'Adalberto Carrasquilla', 'Édgar Bárcenas', 'José Fajardo', 'Ismael Díaz', 'José Luiz Rodríguez'] },
  { code: 'USA', name: 'United States', flag: 'us', emoji: '🇺🇸', conf: 'CONCACAF', stars: ['Christian Pulisic', 'Weston McKennie', 'Matt Freese', 'Chris Richards', 'Tim Ream', 'Antonee Robinson', 'Tanner Tessmann', 'Tyler Adams', 'Timothy Weah', 'Malik Tillman', 'Folarin Balogun'] },

  // CAF
  { code: 'ALG', name: 'Algeria', flag: 'dz', emoji: '🇩🇿', conf: 'CAF', stars: ['Riyad Mahrez', 'Ravan Aït-Nouri', 'Alexis Guendouz', 'Ramy Bensebaini', 'Youcef Atal', 'Aïssa Mandi', 'Nabil Bentaleb', 'Saïd Benrahma', 'Amine Gouiri', 'Mohamed Amoura', 'Baghdad Bounedjah'] },
  { code: 'CIV', name: 'Ivory Coast', flag: 'ci', emoji: '🇨🇮', conf: 'CAF', stars: ['Sébastien Haller', 'Franck Kessié', 'Yahia Fofana', 'Ghislain Konan', 'Odilon Kossounou', "Evan N'Dicka", 'Wilfried Singo', 'Ibrahim Sangaré', 'Nicolas Pépé', 'Simon Adingra', 'Oumar Diakité'] },
  { code: 'COD', name: 'DR Congo', flag: 'cd', emoji: '🇨🇩', conf: 'CAF', stars: ['Chancel Mbemba', 'Cédric Bakambu', 'Théo Bongonda', 'Yoane Wissa', 'Gaël Kakuta', 'Arthur Masuaku', 'Silas Katompa', 'Meschack Elia'] },
  { code: 'CPV', name: 'Cape Verde', flag: 'cv', emoji: '🇨🇻', conf: 'CAF', stars: ['Ryan Mendes', 'Vozinha', 'Logan Costa', 'Pico', 'Steven Moreira', 'João Paulo', 'Kevin Pina', 'Jamiro Monteiro', 'Yannick Semedo', 'Jovane Cabral', 'Dailon Livramento'] },
  { code: 'EGY', name: 'Egypt', flag: 'eg', emoji: '🇪🇬', conf: 'CAF', stars: ['Mohamed Salah', 'Omar Marmoush', 'Mohamed El Shenawy', 'Mohamed Hany', 'Mohamed Abdelmonem', 'Ramy Rabia', 'Marwan Attia', 'Zizo', 'Hamdy Fathy', 'Mostafa Mohamed', 'Trézéguet'] },
  { code: 'GHA', name: 'Ghana', flag: 'gh', emoji: '🇬🇭', conf: 'CAF', stars: ['Mohammed Kudus', 'Thomas Partey', 'Lawrence Ati Zigi', 'Alidu Seidu', 'Alexander Djiku', 'Gideon Mensah', 'Caleb Yirenkyi', 'Abdul Issahaku Fatawu', 'Kamaldeen Sulemana', 'Jordan Ayew', 'Antoine Semenyo'] },
  { code: 'MAR', name: 'Morocco', flag: 'ma', emoji: '🇲🇦', conf: 'CAF', stars: ['Achraf Hakimi', 'Youssef En-Nesyri', 'Yassine Bounou', 'Noussair Mazraoui', 'Nayef Aguerd', 'Sofyan Amrabat', 'Eliesse Ben Seghir', 'Ismael Saibari', 'Brahim Díaz', 'Abde Ezzalzouli', 'Ayoub El Kaabi'] },
  { code: 'RSA', name: 'South Africa', flag: 'za', emoji: '🇿🇦', conf: 'CAF', stars: ['Ronwen Williams', 'Lyle Foster', 'Siyabonga Ngezana', 'Aubrey Modiba', 'Mbekezeli Mbokazi', 'Khuliso Mudau', 'Teboho Mokoena', 'Yaya Sithole', 'Themba Zwane', 'Oswin Appollis', 'Iqraam Rayners'] },
  { code: 'SEN', name: 'Senegal', flag: 'sn', emoji: '🇸🇳', conf: 'CAF', stars: ['Sadio Mané', 'Kalidou Koulibaly', 'Edouard Mendy', 'Moussa Niakhaté', 'El Hadji Malick Diouf', 'Idrissa Gana Gueye', 'Pape Matar Sarr', 'Iliman Ndiaye', 'Krépin Diatta', 'Ismaïla Sarr', 'Nicolas Jackson'] },
  { code: 'TUN', name: 'Tunisia', flag: 'tn', emoji: '🇹🇳', conf: 'CAF', stars: ['Ellyes Skhiri', 'Ferjani Sassi', 'Aymen Dahmen', 'Montassar Talbi', 'Yassine Meriah', 'Ali Abdi', 'Aïssa Laïdouni', 'Hannibal Mejbri', 'Naïm Sliti', 'Elias Achouri', 'Hazem Mastouri'] },

  // AFC
  { code: 'AUS', name: 'Australia', flag: 'au', emoji: '🇦🇺', conf: 'AFC', stars: ['Mathew Ryan', 'Harry Souttar', 'Alessandro Circati', 'Jordan Bos', 'Lewis Miller', 'Milos Degenek', 'Jackson Irvine', 'Riley McGree', "Aiden O'Neill", 'Connor Metcalfe', 'Craig Goodwin'] },
  { code: 'IRN', name: 'Iran', flag: 'ir', emoji: '🇮🇷', conf: 'AFC', stars: ['Sardar Azmoun', 'Mehdi Taremi', 'Alireza Beiranvand', 'Shoja Khalilzadeh', 'Milad Mohammadi', 'Ramin Rezaeian', 'Hossein Kanaani', 'Saeid Ezatolahi', 'Saman Ghoddos', 'Mohammad Mohebi', 'Alireza Jahanbakhsh'] },
  { code: 'IRQ', name: 'Iraq', flag: 'iq', emoji: '🇮🇶', conf: 'AFC', stars: ['Aymen Hussein', 'Ali Jasim', 'Zidane Iqbal', 'Ibrahim Bayesh', 'Amjad Attwan', 'Jalal Hassan', 'Merchas Doski', 'Bashar Resan'] },
  { code: 'JOR', name: 'Jordan', flag: 'jo', emoji: '🇯🇴', conf: 'AFC', stars: ['Musa Al-Taamari', 'Yazan Al-Naimat', 'Yazeed Abulaila', 'Mohammad Abu Hashish', 'Yazan Al-Arab', 'Abdallah Nasib', 'Ibrahim Saadeh', 'Nizar Al-Rashdan', 'Noor Al-Rawabdeh', 'Mahmoud Al-Mardi', 'Ali Olwan'] },
  { code: 'JPN', name: 'Japan', flag: 'jp', emoji: '🇯🇵', conf: 'AFC', stars: ['Takefusa Kubo', 'Takumi Minamino', 'Zion Suzuki', 'Tsuyoshi Watanabe', 'Kaishu Sano', 'Ao Tanaka', 'Daichi Kamada', 'Ritsu Doan', 'Keito Nakamura', 'Shuto Machino', 'Ayase Ueda'] },
  { code: 'KOR', name: 'South Korea', flag: 'kr', emoji: '🇰🇷', conf: 'AFC', stars: ['Heung-min Son', 'Min-jae Kim', 'Hyeon-woo Jo', 'Young-woo Seol', 'Yu-min Cho', 'Tae-seok Lee', 'In-beom Hwang', 'Jae-sung Lee', 'Kang-in Lee', 'Hyeon-gyu Oh', 'Hee-chan Hwang'] },
  { code: 'KSA', name: 'Saudi Arabia', flag: 'sa', emoji: '🇸🇦', conf: 'AFC', stars: ['Salem Al-Dawsari', 'Feras Albrikan', 'Nawaf Alaqidi', 'Hassan Altambakti', 'Jehad Thikri', 'Saud Abdulhamid', 'Nasser Aldawsari', 'Abdullah Alkhaibari', 'Musab Aljuwayr', 'Saleh Abu Alshamat', 'Saleh Alshehri'] },
  { code: 'QAT', name: 'Qatar', flag: 'qa', emoji: '🇶🇦', conf: 'AFC', stars: ['Hasan Al-Haydos', 'Almoez Ali', 'Meshaal Barsham', 'Boualem Khoukhi', 'Lucas Mendes', 'Pedro Miguel', 'Homam Al-Amin', 'Ahmed Fathi', 'Edmílson Junior', 'Ahmed Al-Ganehi', 'Akram Afif'] },
  { code: 'UZB', name: 'Uzbekistan', flag: 'uz', emoji: '🇺🇿', conf: 'AFC', stars: ['Eldor Shomurodov', 'Abdukodir Khusanov', 'Utkir Yusupov', 'Farrukh Sayfiev', 'Sherzod Nasrullaev', 'Husniddin Aliqulov', 'Rustam Ashurmatov', 'Khojiakbar Alijonov', 'Odiljon Hamrobekov', 'Otabek Shukurov', 'Abbosbek Fayzullaev'] },

  // OFC
  { code: 'NZL', name: 'New Zealand', flag: 'nz', emoji: '🇳🇿', conf: 'OFC', stars: ['Chris Wood', 'Marko Stamenic', 'Max Crocombe', 'Michael Boxall', 'Liberato Cacace', 'Tim Payne', 'Finn Surman', 'Joe Bell', 'Sarpreet Singh', 'Matt Garbett', 'Elijah Just'] },
]
