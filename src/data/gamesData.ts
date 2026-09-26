export interface GameItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  badgeId?: string;
  category: 'quiz' | 'visual' | 'lab' | 'puzzle' | 'rapid';
}

export const GAME_CATALOG: GameItem[] = [
  { id: 'cell_builder', title: '1. Hujayra Laboratoriyasi', description: 'Hujayra organoidlarini (yadro, mitoxondriya, EPT, Golji) to\'g\'ri joylashtirib tirik hujayra yig\'ing.', icon: '🧫', xpReward: 40, category: 'lab' },
  { id: 'build_dna', title: '2. DNK Laboratoriyasi', description: 'A-T va G-C komplementar azot asoslarini to\'g\'ri juftlab zanjir yig\'ing, mutatsiyani aniqlang.', icon: '🧬', xpReward: 35, category: 'puzzle' },
  { id: 'place_organs', title: '3. Organlarni Joylashtir', description: 'Inson a\'zolarini (yurak, o\'pka, jigar, oshqozon, buyrak, skelet) gavdadagi to\'g\'ri o\'rniga qo\'ying.', icon: '🫀', xpReward: 30, category: 'visual' },
  { id: 'plant_master', title: '4. O\'simlik Ustasi', description: 'Quyosh, suv, tuproq va minerallar yordamida o\'simlikni urug\'dan mevagacha o\'stiring.', icon: '🌱', xpReward: 35, category: 'lab' },
  { id: 'microscope', title: '5. Virtual Mikroskop', description: 'O\'simlik, hayvon, bakteriya va qon preparatlarini 40x-1000x kattalashtirib o\'rganing.', icon: '🔬', xpReward: 30, category: 'visual' },
  { id: 'memory_game', title: '6. Xotira O\'yini', description: 'Yopiq kartochkalar ichidan bir xil biologik obyektlar va vazifalarni juftlang.', icon: '🧠', xpReward: 25, category: 'puzzle' },
  { id: 'crossword', title: '7. Biologik Krossvord', description: 'Bo\'yiga va eniga berilgan biologik ta\'riflar asosida so\'zlarni toping.', icon: '🧩', xpReward: 30, category: 'puzzle' },
  { id: 'detective', title: '8. Biolog Detektiv', description: '3 ta sirli belgi asosida yashiringan organizm yoki biologik jarayonni fosh eting!', icon: '🔎', xpReward: 35, category: 'quiz' },
  { id: 'rapid_fire', title: '9. Tezkor Biolog (60 soniya)', description: '60 soniya ichida eng ko\'p to\'g\'ri javob topib, x1, x2, x3 olovli COMBO rekordini o\'rnating!', icon: '⚡', xpReward: 35, category: 'rapid' },
  { id: 'bio_race', title: '10. Biologiya Poygasi', description: 'Genetika, anatomiya, botanika va ekologiya savollariga to\'g\'ri javob berib marraga yetib boring.', icon: '🏃', xpReward: 40, category: 'rapid' },
  { id: 'ecosystem_builder', title: '11. Ekotizim Quruvchisi', description: 'O\'simlik, o\'txo\'r, yirtqich va parchalovchilar muvozanatini saqlab barqaror ekotizim quring.', icon: '🌍', xpReward: 40, category: 'lab' },
  { id: 'virtual_lab', title: '12. Virtual Laboratoriya', description: 'Fotosintez tezligi, plazmoliz va kraxmalga yod reaksiyasi bo\'yicha real tajribalar o\'tkazing.', icon: '🧪', xpReward: 45, category: 'lab' },
  { id: 'boss_battle', title: '13. Biologik Boss Battle', description: 'Bob yakunida katta Biologiya Bossini 5 bosqichli sinov orqali yengib g\'olib bo\'ling!', icon: '👾', xpReward: 50, category: 'quiz' },
  { id: 'guess_picture', title: '14. Rasmni Top (20% - 100%)', description: 'Biologik rasm asta-sekin ochiladi. Qanchalik kam foizda topsangiz, shuncha ko\'p ball olasiz!', icon: '🎯', xpReward: 30, category: 'visual' },
  { id: 'genetics_expert', title: '15. Genetika Eksperti', description: 'Mendel duragaylash masalalarini va Pennet katagini interaktiv yeching.', icon: '🔬', xpReward: 35, category: 'quiz' },
  { id: 'sequence_puzzle', title: '16. Ketma-ketlikni Top', description: 'Mitoz, fotosintez va qon aylanish bosqichlarini to\'g\'ri ketma-ketlikda tartiblang.', icon: '🔀', xpReward: 30, category: 'puzzle' },
];

export const GUESS_PICTURE_ITEMS = [
  {
    id: 'pic-1',
    name: 'Mitoxondriya',
    options: ['Mitoxondriya', 'Xloroplast', 'Golji majmuasi', 'Lizosoma'],
    hint: 'Ichki membranasi kristalarga ega bo\'lib, ATF sintezlaydi.',
    svgType: 'mitochondria'
  },
  {
    id: 'pic-2',
    name: 'Xloroplast',
    options: ['Xloroplast', 'Vakuola', 'Yadro', 'Sentriol'],
    hint: 'Yashil rangli plastida, ichida tilakoid va granalar mavjud.',
    svgType: 'chloroplast'
  },
  {
    id: 'pic-3',
    name: 'Eritrotsitlar (Qizil qon hujayralari)',
    options: ['Eritrotsitlar (Qizil qon hujayralari)', 'Leykotsitlar', 'Neyronlar', 'Trombotsitlar'],
    hint: 'Ikki tomoni botiq disksimon shaklga ega, gemoglobin saqlaydi.',
    svgType: 'erythrocyte'
  },
  {
    id: 'pic-4',
    name: 'Inson Bosh Miyasi',
    options: ['Inson Bosh Miyasi', 'Buyrak', 'Jigar', 'O\'pka'],
    hint: 'Katta yarimsharlar po\'stlog\'i, burmalari va egatlari bor.',
    svgType: 'brain'
  },
  {
    id: 'pic-5',
    name: 'Bakteriofag (Virus)',
    options: ['Bakteriofag (Virus)', 'Amyoba', 'Bakteriya', 'Xlamidomonada'],
    hint: 'Bakteriyalarni zararlaydigan, kosmik kemaga o\'xshash virus.',
    svgType: 'phage'
  }
];

export const MATCH_PAIR_SETS = [
  {
    topic: 'Organoidlar va ularning vazifalari',
    pairs: [
      { left: 'Yadro', right: 'Genetik axborot ombori' },
      { left: 'Mitoxondriya', right: 'ATF (energiya) ishlab chiqarish' },
      { left: 'Ribosoma', right: 'Oqsil molekulalarini sintezlash' },
      { left: 'Lizosoma', right: 'Hujayra ichi hazmi (avtoliz)' },
      { left: 'Golji majmuasi', right: 'Moddalarni saralash va qadoqlash' },
    ]
  },
  {
    topic: 'Ichki sekretsiya bezlari va gormonlar',
    pairs: [
      { left: 'Oshqozon osti bezi', right: 'Insulin (qondagi glyukozani kamaytiradi)' },
      { left: 'Qalqonsimon bez', right: 'Tiroksin (moddalar almashinuvini tezlashtiradi)' },
      { left: 'Buyrak usti bezi', right: 'Adrenalin (stress va xavfda ajraladi)' },
      { left: 'Gipofiz bezi', right: 'Somatotrop (bo\'y o\'stirish gormoni)' },
    ]
  },
  {
    topic: 'Genetika va biologik olimlar',
    pairs: [
      { left: 'Gregor Mendel', right: 'Irsiyat qonuniyatlari asoschisi' },
      { left: 'Charlz Darvin', right: 'Tabiiy tanlanish evolutsiya ta\'limoti' },
      { left: 'Uotson va Krik', right: 'DNK qo\'sh spirali tuzilish modeli' },
      { left: 'V.I. Vernadskiy', right: 'Biosfera va noosfera haqidagi ta\'limot' },
    ]
  }
];

export const WORD_SEARCH_GRIDS = [
  {
    id: 'grid-1',
    title: 'Hujayra olami',
    words: ['YADRO', 'DNK', 'ATF', 'MITOZ', 'MEMBRANA', 'FERMENT'],
    grid: [
      ['M', 'E', 'M', 'B', 'R', 'A', 'N', 'A'],
      ['I', 'Y', 'A', 'D', 'R', 'O', 'K', 'T'],
      ['T', 'F', 'O', 'S', 'P', 'H', 'A', 'F'],
      ['O', 'E', 'N', 'Z', 'Y', 'M', 'L', 'S'],
      ['Z', 'R', 'F', 'E', 'R', 'M', 'E', 'N'],
      ['O', 'M', 'D', 'N', 'K', 'J', 'U', 'T'],
      ['Q', 'E', 'N', 'E', 'R', 'G', 'I', 'Y'],
      ['S', 'N', 'U', 'K', 'L', 'E', 'U', 'S']
    ]
  }
];

export const CROSSWORD_DATA = {
  id: 'crossword-bio-1',
  title: 'Umumiy biologiya krossvordi',
  across: [
    { number: 1, clue: 'Hujayraning asosiy energiya beruvchi nukleotidi (3 ta harf)', answer: 'ATF', row: 1, col: 1 },
    { number: 3, clue: 'Genetik axborotni saqlovchi qo\'sh spiral kislota', answer: 'DNK', row: 3, col: 2 },
    { number: 4, clue: 'Oqsillarni sintezlovchi membranasiz organoid', answer: 'RIBOSOMA', row: 5, col: 0 },
    { number: 6, clue: 'O\'simliklarga yashil rang beruvchi pigment', answer: 'XLOROFILL', row: 7, col: 0 }
  ],
  down: [
    { number: 1, clue: 'Yashash joyiga eng moslashganlarning saqlanib qolishi (Darvin ta\'limotida)', answer: 'ADAPTATSIYA', row: 0, col: 0 },
    { number: 2, clue: 'Hujayra ichidagi hazm qiluvchi organoid', answer: 'LIZOSOMA', row: 1, col: 4 },
    { number: 5, clue: 'Irsiyatning moddiy birligi', answer: 'GEN', row: 4, col: 7 }
  ]
};

export const DETECTIVE_CASES = [
  {
    id: 'case-1',
    title: '1-Sirli Ish: "Noma\'lum tiriklik shakli"',
    clues: [
      '1-dalil: Menda hujayraviy tuzilish umuman yo\'q va oqsil qobig\'iga (kapsidga) o\'ralganman.',
      '2-dalil: Hujayradan tashqarida o\'lik kristall kabi yotaman, faqat tirik hujayra ichiga kirgach ko\'payaman.',
      '3-dalil: Gripp, OIV, gerpes va tamaki mozaikasini keltirib chiqaruvchi men bo\'laman.'
    ],
    answer: 'Virus',
    options: ['Virus', 'Bakteriya', 'Amyoba', 'Zamburug\''],
    explanation: 'Viruslar hujayrasiz hayot shakli bo\'lib, 1892-yilda D.I. Ivanovskiy tomonidan kashf etilgan.'
  },
  {
    id: 'case-2',
    title: '2-Sirli Ish: "Qadimgi fotosintezchi"',
    clues: [
      '1-dalil: Menda shakllangan yadro yo\'q (prokariotman), lekin xlorofillim bor.',
      '2-dalil: Yer atmosferasiga ilk kislorodni 2.5 milliard yil muqaddam men yetkazib berganman.',
      '3-dalil: Suv havzalarining "gullashi"ga sababchi bo\'laman.'
    ],
    answer: 'Sianobakteriya (Ko\'k-yashil suvo\'ti)',
    options: ['Sianobakteriya (Ko\'k-yashil suvo\'ti)', 'Xlorella', 'Zamburug\'', 'Bakteriofag'],
    explanation: 'Sianobakteriyalar Yer yuzida ilk fotosintez orqali kislorodli atmosferani shakllantirgan prokariotlardir.'
  },
  {
    id: 'case-3',
    title: '3-Sirli Ish: "Inson tanasidagi boshqaruvchi"',
    clues: [
      '1-dalil: Og\'irligim bor-yo\'g\'i 0.5 gramm atrofida, turk egarchasi chuqurchasida joylashganman.',
      '2-dalil: Boshqa barcha ichki sekretsiya bezlari (qalqonsimon, buyrak usti bezlari) faoliyatini boshqaraman.',
      '3-dalil: Bolalikda o\'sish gormonim (somatotrop) kam ajralsa pastbo\'ylik (mittilik), ko\'p ajralsa gigantizm kelib chiqadi.'
    ],
    answer: 'Gipofiz bezi',
    options: ['Gipofiz bezi', 'Epifiz', 'Qalqonsimon bez', 'Ayrisimon bez'],
    explanation: 'Gipofiz bosh miya asosi chuqurchasida joylashgan boshqaruvchi (markaziy) endokrin bezdir.'
  }
];

export const PUZZLES = [
  {
    id: 'puz-1',
    type: 'logic',
    difficulty: 'easy' as const,
    title: 'No\'xatlar jumboqi (Mendel merosi)',
    question: 'Sariq no\'xatli o\'simlik yashil no\'xatli o\'simlik bilan chatishtirildi. Hosil bo\'lgan barcha 100 ta urug\' sariq bo\'lib chiqdi. Bu nimadan dalolat beradi?',
    options: [
      'Sariq rang dominant va ota-ona gomozigotali',
      'Yashil rang dominant',
      'Mutatsiya sodir bo\'lgan',
      'Tashqi muhit ta\'sir qilgan'
    ],
    correctIndex: 0,
    hint: 'Mendelning birinchi qonuni - Bir xillik qonunini eslang.',
    explanation: 'AA (sariq) x aa (yashil) -> 100% Aa (sariq). Birinchi bo\'g\'inda barcha duragaylar bir xil dominant fenotipga ega bo\'ladi.'
  },
  {
    id: 'puz-2',
    type: 'code',
    difficulty: 'medium' as const,
    title: 'Genetik kodni shifrdan chiqarish',
    question: 'DNK zanjiridagi nukleotidlar ketma-ketligi: TAC - AAA - CCG - ATC. Unga komplementar iRNK zanjiri qanday bo\'ladi?',
    options: [
      'AUG - UUU - GGC - UAG',
      'ATG - TTT - GGC - TAG',
      'AUG - AAA - CCG - UAG',
      'UAC - AAA - CCG - AUC'
    ],
    correctIndex: 0,
    hint: 'Eslatma: iRNK da Timin o\'rniga Uratsil (U) keladi. T->A, A->U, C->G, G->C.',
    explanation: 'DNK dagi T ga A, A ga U, C ga G, G ga C mos keladi. Natijada boshlang\'ich start-kodon AUG hosil bo\'ladi!'
  },
  {
    id: 'puz-3',
    type: 'rebus',
    difficulty: 'hard' as const,
    title: 'Biologik zanjir ketma-ketligi',
    question: 'Tog\' ekotizimida quyidagi oziq zanjiri tuzilishi kerak: Qoplon, O\'t-o\'lanlar, Kiyik, Bakteriyalar. Qaysi tartib to\'g\'ri?',
    options: [
      'O\'t-o\'lanlar → Kiyik → Qoplon → Bakteriyalar',
      'Kiyik → Qoplon → O\'t-o\'lanlar → Bakteriyalar',
      'Bakteriyalar → O\'t-o\'lanlar → Kiyik → Qoplon',
      'Qoplon → Kiyik → O\'t-o\'lanlar → Bakteriyalar'
    ],
    correctIndex: 0,
    hint: 'Zanjir har doim Produtsent (o\'simlik) dan boshlanib, Konsument I, Konsument II orqali Redutsent (parchalovchi) bilan yakunlanadi.',
    explanation: 'Produtsent (o\'t) -> Konsument 1 (o\'txo\'r kiyik) -> Konsument 2 (yirtqich qoplon) -> Redutsent (bakteriya).'
  },
  {
    id: 'puz-4',
    type: 'riddle',
    difficulty: 'expert' as const,
    title: 'Sirli hujayra komponenti',
    question: 'Men hujayrada oqsillar va fosfolipidlardan iboratman. Men tufayli kaliy hujayra ichiga kiradi, natriy esa tashqariga haydaladi (nasos kabi). Hujayraga shakl va xavfsizlik beraman. Men nimaniman?',
    options: ['Plazmatik membrana (Na+/K+ nasosi)', 'Mitoxondriya kristasi', 'Yadro qobig\'i', 'Golji pufakchasi'],
    correctIndex: 0,
    hint: 'Fosfolipid bisloy va undagi natriy-kaliy nasosini eslang.',
    explanation: 'Plazmatik membrana natriy-kaliy nasosi orqali ATF energiyasini sarflab moddalar konsentratsiya gradientiga qarshi harakatini boshqaradi.'
  }
];
