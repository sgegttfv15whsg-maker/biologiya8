import { Topic, DailyFact, Badge, GradeCourse } from '../types';

export const BADGES: Badge[] = [
  { id: 'first_lesson', title: 'Birinchi qadam', description: 'Birinchi biologiya darsini to\'liq tamomladingiz', icon: '🌱', category: 'lesson' },
  { id: 'cell_master', title: 'Sitologiya ustasi', description: 'Hujayra va uning organoidlari mavzusini o\'zlashtirdingiz', icon: '🧫', category: 'lesson' },
  { id: 'genetics_expert', title: 'Genetika mutaxassisi', description: 'DNK va irsiyat qonuniyatlari bo\'yicha testni a\'lo bajardingiz', icon: '🧬', category: 'expert' },
  { id: 'anatomy_pro', title: 'Anatomiya bilimdoni', description: 'Odam organizmi va organlar tizimlarini to\'liq o\'rgandingiz', icon: '🫀', category: 'expert' },
  { id: 'quiz_champ', title: 'Test chempioni', description: 'Test markazida ketma-ket 3 marta 90%+ natijaga erishdingiz', icon: '🏆', category: 'test' },
  { id: 'puzzle_solver', title: 'Boshqotirma dahosi', description: '5 ta biologik boshqotirma va krossvordni yechdingiz', icon: '🧩', category: 'game' },
  { id: 'streak_7', title: '7 kunlik olov', description: 'Platformaga ketma-ket 7 kun faol kirib bilim oldingiz', icon: '🔥', category: 'streak' },
  { id: 'rapid_biologist', title: 'Tezkor biolog', description: 'Tezkor savol o\'yinida 10 ta savolga xatosiz javob berdingiz', icon: '⚡', category: 'game' },
  { id: 'dna_builder', title: 'DNK muhandisi', description: 'DNK komplementar zanjirini xatosiz yig\'dingiz', icon: '🧪', category: 'game' },
  { id: 'nature_guardian', title: 'Tabiat posboni', description: '11-sinf ekologiya va biosfera bobi testini yakunladingiz', icon: '🌳', category: 'expert' },
  { id: 'lab_researcher', title: 'Yosh laborant', description: 'Virtual laboratoriyadagi barcha tajribalarni bajardingiz', icon: '🔬', category: 'game' },
  { id: 'brain_master', title: 'Neyrolog', description: 'Asab sistemasi va bosh miya bo\'limlari diagrammasini to\'liq o\'rgandingiz', icon: '🧠', category: 'expert' },
];

export const DAILY_FACTS: DailyFact[] = [
  {
    id: 'f1',
    title: 'Inson yuragining qudrati',
    fact: 'Inson yuragi bir sutkada taxminan 100 000 marta uradi va qariyb 7 500 litr qonni butun vujud bo\'ylab haydab beradi.',
    category: 'Anatomiya',
    tag: '8-sinf'
  },
  {
    id: 'f2',
    title: 'DNK uzunligi hayratlanarli',
    fact: 'Bitta inson hujayrasi yadrosidagi barcha DNK molekulalari yoyilsa, ularning uzunligi qariyb 2 metrni tashkil qiladi! Inson tanasidagi barcha hujayralar DNKsi esa Quyoshgacha bir necha marta borib qaytishga yetadi.',
    category: 'Sitologiya va Genetika',
    tag: '9-10-sinf'
  },
  {
    id: 'f3',
    title: 'Mitoxondriya - hujayra elektr stansiyasi',
    fact: 'Mitoxondriyalarning o\'ziga xos xususiy halqasimon DNKsi va ribosomasi bor. Olimlar fikricha, ular qadimda alohida erkin bakteriya bo\'lib, keyinchalik eukariot hujayra bilan simbioz yashay boshlagan.',
    category: 'Hujayra biologiyasi',
    tag: '9-sinf'
  },
  {
    id: 'f4',
    title: 'Kislorod fabrikasi - Xloroplast',
    fact: 'Yer yuzidagi barcha yashil o\'simliklar va fitoplanktonlar fotosintez natijasida har yili atmosferaga 150 milliard tonnadan ortiq toza kislorod chiqaradi.',
    category: 'Botanika va Ekologiya',
    tag: '11-sinf'
  },
  {
    id: 'f5',
    title: 'Inson neyronlari soni',
    fact: 'Inson bosh miyasida taxminan 86-100 milliard neyron mavjud bo\'lib, ularning har biri minglab boshqa neyronlar bilan sinaptik aloqalar o\'rnatgan.',
    category: 'Fiziologiya',
    tag: '8-sinf'
  },
  {
    id: 'f6',
    title: 'Turg\'un genetik kod',
    fact: 'Yer yuzidagi barcha tirik mavjudotlar (bakteriyadan tortib odamgacha) o\'sha bir xil 4 ta nukleotid (A, T, G, C) va universal genetik kod asosida oqsil sintezlaydi.',
    category: 'Molekulyar biologiya',
    tag: '10-sinf'
  }
];

// Complete 8-11 sinf courses data conforming to the gradeId + chapterId + lessonId structure
export const GRADE_COURSES: GradeCourse[] = [
  // =========================================================================
  // 🟢 8-SINF BIOLOGIYA (Odam va uning salomatligi, Anatomiya & Fiziologiya)
  // =========================================================================
  {
    gradeId: '8',
    gradeNumber: 8,
    gradeName: '8-sinf Biologiya',
    subtitle: 'Odam va uning salomatligi: Anatomiya, Fiziologiya va Gigiyena',
    icon: '🧪',
    description: 'Inson organizmining tuzilishi, a\'zolar sistemalari, hujayra va to\'qimalar hamda sog\'lom turmush tarzi asoslari.',
    chapters: [
      {
        id: '8-chapter-1',
        chapterNumber: 1,
        title: '1-Bob. Biologiya va tirik organizmlar',
        icon: '📘',
        description: 'Biologiya fani, tiriklikning xususiyatlari va tadqiqot usullari',
        lessons: [
          {
            id: '8-lesson-1-1',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Biologiya va tirik organizmlar',
            orderNumber: 1,
            title: 'Biologiya fani va uning vazifalari',
            icon: '🌿',
            estimatedMinutes: 15,
            summary: 'Biologiya — tirik tabiat, organizmlarning tuzilishi, rivojlanishi va atrof-muhit bilan munosabatlarini o\'rganuvchi fundamental fan.',
            description: 'Biologiya fani, uning tarmoqlari (botanika, zoologiya, anatomiya, genetika) va insoniyat hayotidagi o\'rni.',
            learningGoals: [
              'Biologiya so\'zining ma\'nosi (bios - hayot, logos - ta\'limot)ni bilish',
              'Biologiyaning asosiy tarmoqlari va ularning tadqiqot ob\'ektlarini farqlash',
              'Zamonaviy dunyoda biologik bilimlarning inson salomatligi va qishloq xo\'jaligidagi ahamiyatini anglash'
            ],
            sections: [
              {
                subtitle: '1. Biologiya nima?',
                content: 'Biologiya — tirik mavjudotlar va ularning hayot faoliyati haqidagi yaxlit fandir. U 1802-yilda J.B. Lamark va G. Treviranus tomonidan mustaqil ilmiy atama sifatida fanga kiritilgan.',
                bulletPoints: [
                  'Zoologiya — hayvonot dunyosini o\'rganadi.',
                  'Botanika — o\'simliklar olamini tekshiradi.',
                  'Anatomiya — inson va hayvonlar ichki va tashqi tuzilishini o\'rganadi.',
                  'Fiziologiya — organizm organlarining ishlash mexanizmini tadqiq qiladi.'
                ],
                callout: {
                  type: 'important',
                  title: '⭐ Eslab qoling',
                  text: 'Biologiya atamasi yunoncha "bios" — hayot va "logos" — fan, ta\'limot so\'zlaridan olingan.'
                }
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-1-1-1',
                type: 'multiple-choice',
                question: 'Biologiya atamasini fanga mustaqil kiritgan olim kim?',
                options: ['J.B. Lamark va G. Treviranus', 'Ch. Darvin', 'Arastu', 'A. Ibn Sino'],
                correctAnswer: 0,
                explanation: '1802-yilda fransuz olimi Jan Batist Lamark va nemis olimi Gotfrid Treviranus biologiya atamasini fanga kiritgan.'
              },
              {
                id: 'q-8-1-1-2',
                type: 'true-false',
                question: 'Fiziologiya fani organizmning ichki tuzilishi va shaklini o\'rganadi.',
                correctAnswer: false,
                explanation: 'Noto\'g\'ri! Fiziologiya organlar faoliyati va hayotiy jarayonlarni o\'rganadi. Shakl va tuzilishni esa anatomiya o\'rganadi.'
              }
            ],
            tests: [{ id: 'test-8-cell', title: '8-sinf kirish testi', questionCount: 10 }],
            games: [{ id: 'rapid_fire', title: 'Tezkor Savol-Javob', icon: '⚡', xpReward: 25 }]
          },
          {
            id: '8-lesson-1-2',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Biologiya va tirik organizmlar',
            orderNumber: 2,
            title: 'Tirik organizmlarning asosiy xususiyatlari',
            icon: '✨',
            estimatedMinutes: 20,
            summary: 'Tirik mavjudotlar o\'lik tabiatdan moddalar almashinuvi, ko\'payish, qo\'zg\'aluvchanlik, irsiyat va o\'zgaruvchanlik kabi xususiyatlari bilan ajralib turadi.',
            description: 'Tiriklik mezonlari: oziqlanish, nafas olish, ayirish, ko\'payish va gomeostaz.',
            learningGoals: [
              'Tiriklikning 7 ta fundamental mezonini o\'rganish',
              'O\'z-o\'zini boshqarish (gomeostaz) tushunchasini bilish',
              'Tirik va jonsiz tabiat o\'rtasidagi kimyoviy o\'xshashlik va farqlarni tahlil qilish'
            ],
            sections: [
              {
                subtitle: '1. Tiriklikning xarakterli belgilari',
                content: 'Barcha tirik organizmlar uchun quyidagi universal xususiyatlar xosdir:',
                bulletPoints: [
                  'Hujayraviy tuzilish: Viruslardan tashqari barcha tirik mavjudotlar hujayralardan tuzilgan.',
                  'Moddalar va energiya almashinuvi (metabolizm): Oziqlanish, nafas olish va chiqindilarni ajratish.',
                  'Qo\'zg\'aluvchanlik: Tashqi va ichki ta\'sirlarga javob qaytarish qobiliyati.',
                  'Ko\'payish va rivojlanish: O\'ziga o\'xshash nasl qoldirish va o\'sish.',
                  'Gomeostaz: Ichki muhit barqarorligini (harorat, qon bosimi, pH) saqlash.'
                ],
                callout: {
                  type: 'fact',
                  title: '💡 Qiziqarli fakt',
                  text: 'Tirik organizmlarning 98% massasini atigi 4 ta biogen element tashkil qiladi: Kislorod (O), Uglerod (C), Vodorod (H) va Azot (N).'
                }
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-1-2-1',
                type: 'multiple-choice',
                question: 'Organizmlarning ichki muhit barqarorligini saqlash qobiliyati nima deyiladi?',
                options: ['Gomeostaz', 'Metabolizm', 'Fotoliz', 'Mitoz'],
                correctAnswer: 0,
                explanation: 'Gomeostaz — organizm ichki muhiti (harorat, bosim, suv-tuz balansi)ning doimiyligi va barqarorligidir.'
              }
            ],
            tests: [{ id: 'test-8-cell', title: '8-sinf kirish testi', questionCount: 10 }],
            games: [{ id: 'word_search', title: 'Biologik So\'z Topish', icon: '🔤', xpReward: 30 }]
          },
          {
            id: '8-lesson-1-3',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Biologiya va tirik organizmlar',
            orderNumber: 3,
            title: 'Biologik tadqiqot usullari va Tiriklik darajalari',
            icon: '🔬',
            estimatedMinutes: 20,
            summary: 'Kuzatish, taqqoslash, eksperiment va modellashtirish usullari orqali molekulyar darajadan tortib biosferagacha bo\'lgan tiriklik darajalari o\'rganiladi.',
            description: 'Tirik tabiatning tuzilish darajalari: molekula, hujayra, to\'qima, organ, organizm, populyatsiya, biogeotsenoz va biosfera.',
            learningGoals: [
              'Kuzatish va eksperiment usullari o\'rtasidagi farqni tushunish',
              'Tiriklikning 8 ta tuzilish darajasini kichikdan kattagacha ketma-ketlikda aytib berish',
              'Mikroskopiyaning biologiya taraqqiyotidagi o\'rnini baholash'
            ],
            sections: [
              {
                subtitle: '1. Tiriklikning tuzilish darajalari',
                content: 'Tirik materiya murakkab ierarxik tizim asosida qurilgan:',
                bulletPoints: [
                  '1. Molekulyar-genetik daraja (DNK, RNK, oqsillar)',
                  '2. Hujayra darajasi (hayotning elementar tuzilish birligi)',
                  '3. To\'qima darajasi (epiteliy, biriktiruvchi, muskul, asab)',
                  '4. Organ darajasi (yurak, jigar, o\'pka, buyrak)',
                  '5. Organizm darajasi (butun yaxlit odam yoki jonivor)',
                  '6. Populyatsiya-tur darajasi (bir xil turning guruhlari)',
                  '7. Biogeotsenoz (ekotizim) darajasi',
                  '8. Biosfera darajasi (Yer yuzidagi barcha hayot qobig\'i)'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-1-3-1',
                type: 'multiple-choice',
                question: 'Tiriklikning eng kichik funktsional va tuzilish birligi qaysi daraja hisoblanadi?',
                options: ['Hujayra darajasi', 'Molekulyar daraja', 'To\'qima darajasi', 'Organ darajasi'],
                correctAnswer: 0,
                explanation: 'Hujayra — tiriklikning mustaqil yashay oladigan eng kichik tuzilish va funktsional birligidir.'
              }
            ],
            tests: [{ id: 'test-8-cell', title: '8-sinf kirish testi', questionCount: 10 }],
            games: [{ id: 'match_pairs', title: 'Juftlikni Top', icon: '🃏', xpReward: 25 }]
          }
        ]
      },
      {
        id: '8-chapter-2',
        chapterNumber: 2,
        title: '2-Bob. Hujayra',
        icon: '📗',
        description: 'Hujayra tuzilishi, organoidlar va ularning vazifalari',
        lessons: [
          {
            id: '8-lesson-2-1',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. Hujayra',
            orderNumber: 1,
            title: 'Hujayra haqida tushuncha va uning tarkibi',
            icon: '🧫',
            estimatedMinutes: 20,
            summary: 'Odam tanasi trillionlab hujayralardan iborat. Har bir hujayra membrana, sitoplazma va yadro kabi uch asosiy qismdan tashkil topgan.',
            description: 'Inson hujayrasining mikroskopik tuzilishi, plazmatik membrana, sitoplazma va organoidlar majmui.',
            learningGoals: [
              'Hujayraning 3 ta asosiy komponentini (membrana, sitoplazma, yadro) bilish',
              'Hayvon hujayrasining o\'simlik hujayrasidan farqini o\'rganish',
              'Organoidlarning hujayra hayotidagi o\'zaro bog\'liqligini tushunish'
            ],
            sections: [
              {
                subtitle: '1. Odam hujayrasining umumiy tuzilishi',
                content: 'Odam organizmida 200 dan ortiq xilma-xil ixtisoslashgan hujayralar mavjud (nerv, muskul, qon, suyak hujayralari). Ular tashqi ko\'rinishi turlicha bo\'lsa-da, umumiy tuzilish rejasiga ega.',
                bulletPoints: [
                  'Plazmatik membrana: Yarim o\'tkazuvchan, ikki qavat fosfolipid va oqsillardan tuzilgan.',
                  'Sitoplazma: Hujayra organoidlari suzib yuradigan yarim suyuq ichki muhit (gialoplazma).',
                  'Yadro: Irsiy axborotni saqlash va sintez jarayonlarini boshqarish markazi.'
                ]
              }
            ],
            diagram: {
              id: 'diag-cell-8',
              type: 'cell',
              title: 'Hayvon (inson) hujayrasi tuzilishi',
              subtitle: 'Organoidlar ustiga bosib ularning vazifasini o\'rganing',
              hotspots: [
                { id: 'c1', label: 'Yadro', x: 50, y: 50, title: 'Hujayra Yadrosi', description: 'Xromosomalar (DNK) joylashgan asosiy boshqaruv markazi.', fact: 'Yadro ichidagi yadrochada ribosomalar subbirliklari yig\'iladi.' },
                { id: 'c2', label: 'Mitoxondriya', x: 28, y: 65, title: 'Mitoxondriya', description: 'Hujayraning energiya stansiyasi. ATF (adenozintrifosfat) sintezlaydi.', fact: 'Inson jigar hujayrasida 1000 dan 2000 tagacha mitoxondriya bo\'lishi mumkin.' },
                { id: 'c3', label: 'Endoplazmatik to\'r', x: 68, y: 40, title: 'Endoplazmatik to\'r (EPT)', description: 'Oqsil, yog\' va uglevodlarni sintezlash va tashish kanallari tizimi.', fact: 'Donador EPT yuzasida ribosomalar joylashgan.' },
                { id: 'c4', label: 'Golji majmuasi', x: 72, y: 65, title: 'Golji apparati', description: 'Moddalarni saralash, qadoqlash va hujayradan chiqarish stansiyasi.', fact: 'Lizosomalarni aynan Golji majmuasi hosil qiladi.' },
                { id: 'c5', label: 'Hujayra membranasi', x: 18, y: 28, title: 'Plazmatik membrana', description: 'Fosfolipid va oqsillardan tuzilgan ikki qavatli yarim o\'tkazuvchan to\'siq.', fact: 'Hujayraga kerakli ozuqalarni kiritib, zaharli chiqindilarni chiqaradi.' }
              ]
            },
            quickQuestions: [
              {
                id: 'q-8-2-1-1',
                type: 'multiple-choice',
                question: 'Hujayraning energiya stansiyasi qaysi organoid hisoblanadi?',
                options: ['Mitoxondriya', 'Lizosoma', 'Ribosoma', 'Sentriol'],
                correctAnswer: 0,
                explanation: 'Mitoxondriyalar hujayraviy nafas olish orqali universal energiya manbai — ATF ishlab chiqaradi.'
              }
            ],
            tests: [{ id: 'test-8-cell', title: '8-sinf Hujayra testi', questionCount: 10 }],
            games: [{ id: 'cell_builder', title: 'Hujayra Konstruktori', icon: '🧫', xpReward: 30 }]
          },
          {
            id: '8-lesson-2-2',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. Hujayra',
            orderNumber: 2,
            title: 'Hujayra organoidlari: Mitoxondriya, Ribosoma, Golji majmuasi, Lizosoma',
            icon: '🔬',
            estimatedMinutes: 25,
            summary: 'Har bir organoid o\'z vazifasini aniq bajaradi: ribosomalar oqsil sintezlaydi, mitoxondriya energiya beradi, Golji moddalarni qadoqlaydi, lizosoma esa parchalaydi.',
            description: 'Membranali va membranasiz organoidlarning biologik funktsiyalari va o\'zaro aloqasi.',
            learningGoals: [
              'Ribosomalarning oqsil biosintezidagi rolini tushunish',
              'Golji majmuasi va lizosomalarning parchalanish mexanizmini bilish',
              'Silliq va donador endoplazmatik to\'r farqini aniqlash'
            ],
            sections: [
              {
                subtitle: '1. Organoidlarning hayotiy vazifalari',
                content: 'Hujayra ichidagi organoidlar xuddi ulkan zavod sexlari kabi ishlaydi:',
                bulletPoints: [
                  'Ribosoma: Membranasiz, rRNK va oqsildan iborat. Oqsil biosintezini amalga oshiradi.',
                  'Endoplazmatik to\'r (EPT): Donador EPT oqsillarni, silliq EPT esa lipid va uglevodlarni sintezlaydi.',
                  'Golji majmuasi: Sintezlangan moddalarni qadoqlaydi va hujayradan chiqaradi.',
                  'Lizosoma: Gidrolitik fermentlarga ega bo\'lib, begona zarrachalar va eskirgan organoidlarni parchalaydi.'
                ],
                callout: {
                  type: 'important',
                  title: '⭐ Muhim',
                  text: 'Lizosoma ichida 40 dan ortiq hazm fermenti mavjud. U hujayraning o\'ziga xos hazm qilish apparatidir.'
                }
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-2-2-1',
                type: 'multiple-choice',
                question: 'Oqsil sintezlovchi membranasiz organoid qaysi?',
                options: ['Ribosoma', 'Mitoxondriya', 'Lizosoma', 'Vakuola'],
                correctAnswer: 0,
                explanation: 'Ribosomalar membranasiz bo\'lib, oqsil sintezlaydigan kichik molekulyar apparatlardir.'
              }
            ],
            tests: [{ id: 'test-8-cell', title: 'Hujayra va organoidlar', questionCount: 10 }],
            games: [{ id: 'guess_picture', title: 'Rasmni Top', icon: '🖼️', xpReward: 25 }]
          }
        ]
      },
      {
        id: '8-chapter-3',
        chapterNumber: 3,
        title: '3-Bob. To\'qimalar',
        icon: '📙',
        description: 'Epiteliy, biriktiruvchi, muskul va asab to\'qimalari',
        lessons: [
          {
            id: '8-lesson-3-1',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-3',
            chapterNumber: 3,
            chapterTitle: '3-Bob. To\'qimalar',
            orderNumber: 1,
            title: 'Epiteliy va Biriktiruvchi to\'qimalar',
            icon: '🧬',
            estimatedMinutes: 20,
            summary: 'To\'qima — kelib chiqishi, tuzilishi va bajaradigan vazifasi bir xil bo\'lgan hujayralar va hujayralararo modda yig\'indisi. Epiteliy himoyalaydi, biriktiruvchi to\'qima tayanch va oziqlantirish vazifasini o\'taydi.',
            description: 'To\'rtta asosiy to\'qima guruhi, epiteliyning turlari (bir qavatli, ko\'p qavatli, bezli) va biriktiruvchi to\'qimalar (suyak, tog\'ay, qon, yog\').',
            learningGoals: [
              'To\'qima tushunchasi va uning tarkibiy qismlarini ta\'riflash',
              'Epiteliy to\'qimasining joylashishi va himoya vazifasini o\'rganish',
              'Qon nima uchun suyuq biriktiruvchi to\'qima deb atalishini tushunish'
            ],
            sections: [
              {
                subtitle: '1. Epiteliy va Biriktiruvchi to\'qima',
                content: 'Odam organizmida to\'qimalar 4 asosiy guruhga bo\'linadi:',
                bulletPoints: [
                  'Epiteliy to\'qimasi: Hujayralari zich joylashgan, hujayralararo moddasi deyarli yo\'q. Teri ustki qavati (epidermis), oshqozon-ichak shilliq qavati va bezlarni hosil qiladi.',
                  'Biriktiruvchi to\'qima: Hujayralararo moddasi juda ko\'p rivojlangan. Suyak, tog\'ay, pay, yog\' to\'qimasi hamda suyuq qon va limfani o\'z ichiga oladi.'
                ],
                callout: {
                  type: 'fact',
                  title: '💡 Bilasizmi?',
                  text: 'Qon inson tana vaznining taxminan 7-8% qismini tashkil qiladi. U kislorod, karbonat angidrid, oziq moddalar va gormonlarni tashiydi.'
                }
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-3-1-1',
                type: 'multiple-choice',
                question: 'Qaysi to\'qimada hujayralararo modda juda ko\'p bo\'lib, suyak va qonni hosil qiladi?',
                options: ['Biriktiruvchi to\'qima', 'Epiteliy to\'qimasi', 'Muskul to\'qimasi', 'Asab to\'qimasi'],
                correctAnswer: 0,
                explanation: 'Biriktiruvchi to\'qimaning asosiy xususiyati — hujayralararo moddaning ko\'pligidir (masalan, qon plazmasi yoki suyak matriksi).'
              }
            ],
            tests: [{ id: 'test-8-cell', title: 'To\'qimalar testi', questionCount: 10 }],
            games: [{ id: 'match_pairs', title: 'To\'qimalarni Juftlash', icon: '🃏', xpReward: 25 }]
          },
          {
            id: '8-lesson-3-2',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-3',
            chapterNumber: 3,
            chapterTitle: '3-Bob. To\'qimalar',
            orderNumber: 2,
            title: 'Muskul va Asab to\'qimalari',
            icon: '⚡',
            estimatedMinutes: 20,
            summary: 'Muskul to\'qimasi qisqarish xususiyati orqali harakatni ta\'minlaydi. Asab to\'qimasi neyronlardan iborat bo\'lib, qo\'zg\'alish va impulslarni o\'tkazadi.',
            description: 'Ko\'ndalang-targ\'il (skelet va yurak) va silliq muskul to\'qimalari hamda neyronning tuzilishi (akson, dendrit, sinaps).',
            learningGoals: [
              'Silliq va ko\'ndalang-targ\'il muskullar o\'rtasidagi 3 asosiy farqni bilish',
              'Neyronning tuzilishi: tana, akson (uzun o\'simta) va dendrit (kaltalar)ni farqlash',
              'Refleks va nerv impulsi uzatilishini tushunish'
            ],
            sections: [
              {
                subtitle: '1. Muskul va Asab to\'qimalari xususiyatlari',
                content: 'Ushbu to\'qimalar organizmning faol harakatlanishi va tashqi muhitga tezkor javob qaytarishini kafolatlaydi:',
                bulletPoints: [
                  'Silliq muskullar: Ichki organlar (oshqozon, qon tomirlari, ichaklar) devorida bo\'ladi. Ixtiyorsiz qisqaradi, sekin charchaydi.',
                  'Ko\'ndalang-targ\'il skelet muskullari: Suyaklarga birikadi, ongli ravishda ixtiyoriy qisqaradi, tez harakat qiladi.',
                  'Yurak muskuli: O\'ziga xos avtomatizmga ega bo\'lib, toliqmasdan bir maromda qisqaradi.',
                  'Asab to\'qimasi: Asosiy hujayrasi — neyron. U qo\'zg\'aladi va nerv impulsini uzatadi.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-3-2-1',
                type: 'multiple-choice',
                question: 'Neyronning uzun o\'simtasi qanday nomlanadi?',
                options: ['Akson', 'Dendrit', 'Sinaps', 'Miyelin'],
                correctAnswer: 0,
                explanation: 'Neyron tanasidan chiquvchi bitta uzun o\'simta akson deyiladi, kalta shoxlangan o\'simtalar esa dendritlardir.'
              }
            ],
            tests: [{ id: 'test-8-cell', title: 'To\'qimalar testi', questionCount: 10 }],
            games: [{ id: 'rapid_fire', title: 'Tezkor Savol', icon: '⚡', xpReward: 25 }]
          }
        ]
      },
      {
        id: '8-chapter-4',
        chapterNumber: 4,
        title: '4-Bob. Organlar va organlar sistemasi',
        icon: '📕',
        description: 'Tayanch-harakat, qon aylanish, nafas, hazm, ayirish va nerv sistemalari',
        lessons: [
          {
            id: '8-lesson-4-1',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-4',
            chapterNumber: 4,
            chapterTitle: '4-Bob. Organlar va organlar sistemasi',
            orderNumber: 1,
            title: 'Tayanch-harakat sistemasi: Suyaklar va muskullar',
            icon: '🦴',
            estimatedMinutes: 20,
            summary: 'Inson skeleti 206 dan ortiq suyaklardan iborat. U ichki a\'zolarni himoya qiladi, tanaga qat\'iy shakl va tayanch beradi hamda harakatlantiradi.',
            description: 'Kalla suyagi, umurtqa pog\'onasi, ko\'krak qafasi, qo\'l va oyoq suyaklari hamda ularning birikishi.',
            learningGoals: [
              'Inson skeletining asosiy bo\'limlarini o\'rganish',
              'Suyaklarning harakatsiz, yarim harakatchan va harakatchan (bo\'g\'im) birikish turlarini bilish',
              'Qad-qomatning to\'g\'ri shakllanishi va skoliozning oldini olish usullarini o\'rganish'
            ],
            sections: [
              {
                subtitle: '1. Inson skeletining tuzilishi',
                content: 'Skelet suyaklari mineral tuzlar (kalsiy, fosfor) va organik modda (ossein)dan tashkil topgan. Ossein elastiklik, minerallar esa qattiqlik beradi.',
                bulletPoints: [
                  'Kalla skeleti: Miya qutisi va yuz qismi.',
                  'Gavda skeleti: 33-34 ta umurtqadan iborat umurtqa pog\'onasi va 12 juft qovurg\'ali ko\'krak qafasi.',
                  'Qo\'l va oyoq kamarlari va erkin suyaklari.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-4-1-1',
                type: 'multiple-choice',
                question: 'Voyaga yetgan inson skeletida taxminan nechta suyak mavjud?',
                options: ['206 dan ortiq', '150 ta', '300 ta', '120 ta'],
                correctAnswer: 0,
                explanation: 'Voyaga yetgan inson skeletida 206 dan ortiq suyaklar mavjud.'
              }
            ],
            tests: [{ id: 'test-8-final', title: 'Anatomiya imtihoni', questionCount: 20 }],
            games: [{ id: 'place_organs', title: 'Organlarni Joylashtir', icon: '🧩', xpReward: 35 }]
          },
          {
            id: '8-lesson-4-2',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-4',
            chapterNumber: 4,
            chapterTitle: '4-Bob. Organlar va organlar sistemasi',
            orderNumber: 2,
            title: 'Qon aylanish sistemasi va Yurak tuzilishi',
            icon: '🫀',
            estimatedMinutes: 25,
            summary: 'Yurak to\'rt kamerali baquvvat muskul a\'zo. U qonni katta va kichik qon aylanish doiralari bo\'ylab to\'xtovsiz haydaydi.',
            description: 'O\'ng va chap bo\'lmachalar, qorinchalar, tavaqali va yarimoysimon klapanlar, aorta va o\'pka qon aylanish doiralari.',
            learningGoals: [
              'Yurakning 4 ta kamerasini va ulardagi qon turini (venoz/arterial) bilish',
              'Katta va kichik qon aylanish doiralarining boshlanish va tugash nuqtalarini yod olish',
              'Puls, arterial bosim va yurak gigiyenasini tushunish'
            ],
            sections: [
              {
                subtitle: '1. Yurak va qon tomirlari',
                content: 'Yurak bo\'ylama to\'siq orqali ikkiga bo\'linadi. O\'ng tomonda venoz qon, chap tomonda arterial qon oqadi.',
                bulletPoints: [
                  'Katta doira: Chap qorinchadan aortaga chiqadi -> tana a\'zolariga kislorod tarqatadi -> kovak venalar bilan o\'ng bo\'lmachada tugaydi.',
                  'Kichik doira: O\'ng qorinchadan o\'pka arteriyasi bilan boshlanadi -> o\'pkada gaz almashadi -> o\'pka venalari bilan chap bo\'lmachaga quyiladi.'
                ],
                callout: {
                  type: 'remember',
                  title: '⚠️ Eslab qoling',
                  text: 'Kichik doiraning o\'pka arteriyasida VENOZ qon, o\'pka venalarida esa toza ARTERIAL qon oqadi!'
                }
              }
            ],
            diagram: {
              id: 'diag-heart-8',
              type: 'heart',
              title: 'Inson yuragining ichki tuzilishi',
              subtitle: 'Qon oqimi va yurak qismlarini interaktiv o\'rganing',
              hotspots: [
                { id: 'h1', label: 'Aorta', x: 52, y: 15, title: 'Aorta qon tomiri', description: 'Inson tanasidagi eng katta arteriya. Kislorodga boy qonni chap qorinchadan butun tanaga tarqatadi.', fact: 'Aortadagi qon bosimi 120 mm simob ustuniga yetadi.' },
                { id: 'h2', label: 'Chap qorincha', x: 65, y: 70, title: 'Chap qorincha', description: 'Devori eng baquvvat muskuldan iborat bo\'lib, arterial qonni aortaga haydaydi.', fact: 'Chap qorincha miokardi qalinligi 10-15 mm bo\'ladi.' },
                { id: 'h3', label: 'O\'ng qorincha', x: 38, y: 70, title: 'O\'ng qorincha', description: 'Venoz qonni o\'pka poyasiga va o\'pka alveolalariga haydaydi.', fact: 'Bu yerda kichik qon aylanish doirasi boshlanadi.' },
                { id: 'h4', label: 'Chap bo\'lmacha', x: 72, y: 45, title: 'Chap bo\'lmacha', description: 'O\'pkadan keluvchi 4 ta o\'pka venalaridan toza arterial qonni qabul qiladi.', fact: 'Qisqarganda qonni ikki tavaqali (mitral) klapan orqali chap qorinchaga o\'tkazadi.' },
                { id: 'h5', label: 'O\'ng bo\'lmacha', x: 25, y: 45, title: 'O\'ng bo\'lmacha', description: 'Yuqori va pastki kovak venalardan butun tananing venoz qonini to\'playdi.', fact: 'Yurak ritmini belgilovchi sinus tuguni aynan shu yerda joylashgan.' }
              ]
            },
            quickQuestions: [
              {
                id: 'q-8-4-2-1',
                type: 'multiple-choice',
                question: 'Katta qon aylanish doirasi qayerdan boshlanadi?',
                options: ['Chap qorinchadan', 'O\'ng qorinchadan', 'Chap bo\'lmachadan', 'O\'ng bo\'lmachadan'],
                correctAnswer: 0,
                explanation: 'Katta qon aylanish doirasi chap qorinchadan boshlanib, aortaga qon haydaydi.'
              }
            ],
            tests: [{ id: 'test-8-heart', title: 'Qon aylanish va yurak', questionCount: 15 }],
            games: [{ id: 'place_organs', title: 'Organlarni Joylashtir', icon: '🫀', xpReward: 35 }]
          },
          {
            id: '8-lesson-4-3',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-4',
            chapterNumber: 4,
            chapterTitle: '4-Bob. Organlar va organlar sistemasi',
            orderNumber: 3,
            title: 'Nafas olish, Ovqat hazm qilish va Ayirish sistemalari',
            icon: '🫁',
            estimatedMinutes: 25,
            summary: 'Nafas olish orqali kislorod qabul qilinadi, hazm sistemasi ozuqani parchalaydi va qonga so\'radi, buyraklar esa qonni zaharli qoldiqlardan tozalaydi.',
            description: 'O\'pka alveolalari, oshqozon-ichak trakti, jigar, me\'da osti bezi va buyrak nefronlari faoliyati.',
            learningGoals: [
              'Alveolalardagi gazlar diffuziyasini tushunish',
              'Oshqozon va ingichka ichakdagi hazm fermentlarini bilish',
              'Nefronlarda birlamchi va ikkilamchi siydik hosil bo\'lish bosqichlarini o\'rganish'
            ],
            sections: [
              {
                subtitle: '1. Uchta hayotiy sistema integratsiyasi',
                content: 'Inson hayoti ushbu sistemalarning uzluksiz hamkorligiga asoslangan:',
                bulletPoints: [
                  'Nafas: Burun bo\'shlig\'i -> hiqildoq -> kekirdak -> bronxlar -> alveolalar (gaz almashinuv yuzasi).',
                  'Hazm: Og\'iz -> qizilo\'ngach -> oshqozon (pepsin) -> ingichka ichak (o\'t suyuqligi, tripsin) -> yo\'g\'on ichak.',
                  'Ayirish: Buyrak po\'stloq va mag\'iz qavatidagi nefronlar orqali qon filtrlanadi (sutkada 150-180 litr birlamchi siydik, 1.5 litr ikkilamchi siydik).'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-4-3-1',
                type: 'multiple-choice',
                question: 'Buyrakning asosiy tuzilish va funktsional birligi nima?',
                options: ['Nefron', 'Neyron', 'Alveola', 'Miofibrilla'],
                correctAnswer: 0,
                explanation: 'Nefron — buyrakning mikroskopik filtrlash birligi bo\'lib, har bir buyrakda taxminan 1 millionta nefron bor.'
              }
            ],
            tests: [{ id: 'test-8-final', title: '8-sinf Yakuniy Imtihon', questionCount: 20 }],
            games: [{ id: 'detective', title: 'Biolog Detektiv', icon: '🕵️', xpReward: 35 }]
          },
          {
            id: '8-lesson-4-4',
            grade: 8,
            gradeId: '8',
            chapterId: '8-chapter-4',
            chapterNumber: 4,
            chapterTitle: '4-Bob. Organlar va organlar sistemasi',
            orderNumber: 4,
            title: 'Nerv sistemasi, Bosh miya va Sezgi organlari',
            icon: '🧠',
            estimatedMinutes: 25,
            summary: 'Nerv sistemasi barcha organlar faoliyatini boshqaradi va uyg\'unlashtiradi. Bosh miya 5 ta asosiy bo\'limdan iborat.',
            description: 'Markaziy va periferik nerv sistemasi, bosh miya bo\'limlari (uzunchoq, orqa, o\'rta, oraliq, katta yarimsharlar) va ko\'rish analizatori.',
            learningGoals: [
              'Bosh miyaning 5 ta asosiy bo\'limi vazifalarini o\'rganish',
              'Miyachaning harakatlarni muvofiqlashtirishdagi rolini bilish',
              'Ko\'z to\'r pardasi (tayoqcha va kolbachalar)ning yorug\'likni qabul qilish mexanizmini tushunish'
            ],
            sections: [
              {
                subtitle: '1. Bosh miya bo\'limlari',
                content: 'Bosh miya kalla suyagi ichida joylashgan bo\'lib, 1300-1400 gramm tosh bosadi:',
                bulletPoints: [
                  'Uzunchoq miya: Nafas olish, yurak urishi, yutish, aksa urish kabi hayotiy reflekslar markazi.',
                  'Miyacha: Muvozanat va harakatlar koordinatsiyasini ta\'minlaydi.',
                  'O\'rta miya: Ko\'rish va eshitishning yo\'naltiruvchi reflekslari, muskul tonusi.',
                  'Oraliq miya (Gipotalamus): Tana harorati, chanqoq, ochlik va gormonal boshqaruv.',
                  'Katta yarimsharlar po\'stlog\'i: Oliy asab faoliyati, xotira, nutq, ong va tafakkur.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-8-4-4-1',
                type: 'multiple-choice',
                question: 'Harakatlarni muvofiqlashtirish va gavda muvozanatini boshqaruvchi bo\'lim qaysi?',
                options: ['Miyacha', 'Uzunchoq miya', 'Ko\'prik', 'Gipofiz'],
                correctAnswer: 0,
                explanation: 'Miyacha harakatlar muvozanati va nozik motorikani boshqaradi.'
              }
            ],
            tests: [{ id: 'test-8-final', title: '8-sinf Yakuniy Imtihon', questionCount: 20 }],
            games: [{ id: 'memory_game', title: 'Xotira O\'yini', icon: '🧠', xpReward: 30 }]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 🔵 9-SINF BIOLOGIYA (Sitologiya va Umumiy Biologiya Asoslari)
  // =========================================================================
  {
    gradeId: '9',
    gradeNumber: 9,
    gradeName: '9-sinf Biologiya',
    subtitle: 'Sitologiya, Biomolekulalar, Metabolizm va Hujayra Sikli',
    icon: '🧬',
    description: 'Hujayraning kimyoviy tarkibi, oqsillar, nuklein kislotalar, fotosintez, nafas olish, mitoz va meyoz bo\'linish jarayonlari.',
    chapters: [
      {
        id: '9-chapter-1',
        chapterNumber: 1,
        title: '1-Bob. Sitologiya asoslari va Hujayraning kimyoviy tarkibi',
        icon: '📘',
        description: 'Biomolekulalar, oqsillar, DNK va RNK tuzilishi',
        lessons: [
          {
            id: '9-lesson-1-1',
            grade: 9,
            gradeId: '9',
            chapterId: '9-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Sitologiya asoslari va Hujayraning kimyoviy tarkibi',
            orderNumber: 1,
            title: 'Hujayraning anorganik va organik moddalari: Oqsillar',
            icon: '🧪',
            estimatedMinutes: 25,
            summary: 'Oqsillar — 20 xil aminokislotalardan tuzilgan biopolimerlar. Ular qurilish, fermentativ, himoya, transport va signal vazifalarini bajaradi.',
            description: 'Oqsillarning birlamchi, ikkilamchi, uchlamchi va to\'rtlamchi tuzilishi, denaturatsiya va renaturatsiya.',
            learningGoals: [
              'Aminokislotalar o\'rtasidagi peptid bog\'ining hosil bo\'lishini tushunish',
              'Oqsil fazoviy tuzilmalari (alfa-spiral, beta-qatlam, globula)ni farqlash',
              'Fermentlarning xususiyatlari va denaturatsiya jarayonini o\'rganish'
            ],
            sections: [
              {
                subtitle: '1. Oqsillar — hayotning asosi',
                content: 'Oqsillar hujayra quruq massasining 50-80% qismini tashkil qiladi. Ular aminokislotalarning peptid bog\'lari bilan birikishidan hosil bo\'ladi.',
                bulletPoints: [
                  'Birlamchi tuzilish: Polipeptid zanjiridagi aminokislotalarning qat\'iy tartibi (peptid bog\'lar).',
                  'Ikkilamchi tuzilish: Zanjirning spiralga aylanishi (vodorod bog\'lar).',
                  'Uchlamchi tuzilish: Spiralning fazoviy koptokcha (globula) shaklini olishi (disulfid, gidrofob bog\'lar).',
                  'To\'rtlamchi tuzilish: Bir nechta globulalarning birlashishi (masalan, gemoglobin 4 zanjirdan iborat).'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-9-1-1-1',
                type: 'multiple-choice',
                question: 'Oqsillarning birlamchi strukturasini qanday bog\'lar ta\'minlaydi?',
                options: ['Peptid bog\'lar', 'Vodorod bog\'lar', 'Disulfid ko\'priklari', 'Gidrofob ta\'sirlar'],
                correctAnswer: 0,
                explanation: 'Aminokislotalarning amin guruhi va karboksil guruhi o\'rtasida kovalent peptid bog\'i hosil bo\'ladi.'
              }
            ],
            tests: [{ id: 'test-9-organelles', title: 'Sitologiya va biomolekulalar', questionCount: 10 }],
            games: [{ id: 'match_pairs', title: 'Biomolekulalarni Top', icon: '🃏', xpReward: 25 }]
          },
          {
            id: '9-lesson-1-2',
            grade: 9,
            gradeId: '9',
            chapterId: '9-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Sitologiya asoslari va Hujayraning kimyoviy tarkibi',
            orderNumber: 2,
            title: 'Nuklein kislotalar: DNK va RNK tuzilishi',
            icon: '🧬',
            estimatedMinutes: 25,
            summary: 'DNK va RNK genetik axborotni saqlash va uzatish uchun javobgardir. Nukleotidlar: azot asosi, dezoksiriboza/riboza va fosfat kislota qoldig\'idan iborat.',
            description: 'Komplementarlik qoidasi (A=T, G≡C), transkripsiya, matritsaviy sintez va genetik kodning universalligi.',
            learningGoals: [
              'DNK va RNK o\'rtasidagi 3 asosiy farqni bilish',
              'Komplementarlik qoidasiga ko\'ra DNK zanjirini to\'g\'ri yozish',
              'Chorgraff qoidalarini masalalar yechishda qo\'llash'
            ],
            sections: [
              {
                subtitle: '1. DNK va RNK farqlari',
                content: 'Nuklein kislotalar nukleotidlardan tashkil topgan polimerlardir.',
                bulletPoints: [
                  'DNK: Ikki zanjirli spiral. Qandi dezoksiriboza. Azot asoslari: Adenin (A), Timin (T), Guanin (G), Sitotsin (C). Komplementarlik: A=T (2 ta vodorod bog\'), G≡C (3 ta vodorod bog\').',
                  'RNK: Bir zanjirli. Qandi riboza. Timin o\'rnida Uratsil (U) bo\'ladi. Turlari: iRNK (axborot), tRNK (tashuvchi), rRNK (ribosomal).'
                ]
              }
            ],
            diagram: {
              id: 'diag-dna-9',
              type: 'dna',
              title: 'DNK qo\'sh spiralining molekulyar tuzilishi',
              subtitle: 'Komplementarlik qoidasi: A-T va G-C bog\'lanishlari',
              hotspots: [
                { id: 'd1', label: 'Adenin va Timin', x: 35, y: 30, title: 'A = T juftligi', description: 'Adenin va Timin o\'rtasida 2 ta vodorod bog\'i hosil bo\'ladi.', fact: 'RNKda esa Timin o\'rniga Uratsil (U) joylashadi.' },
                { id: 'd2', label: 'Guanin va Sitotsin', x: 65, y: 50, title: 'G ≡ C juftligi', description: 'Guanin va Sitotsin o\'rtasida 3 ta mustahkam vodorod bog\'i mavjud.', fact: 'G-C juftligi ko\'p bo\'lgan DNK molekulasi yuqori haroratga ancha chidamli bo\'ladi.' },
                { id: 'd3', label: 'Dezoksiriboza va Fosfat', x: 20, y: 70, title: 'Qand-fosfat tayanchi', description: 'DNK zanjirining tashqi mustahkam suyanchig\'i fosfodiefir bog\'lari bilan bog\'langan.', fact: 'Ikki zanjir bir-biriga antiparallel (5\'->3\' va 3\'->5\') yo\'nalgan.' }
              ]
            },
            quickQuestions: [
              {
                id: 'q-9-1-2-1',
                type: 'multiple-choice',
                question: 'DNK molekulasida Guanin (G) qarshisida qaysi nukleotid joylashadi va ular orasida nechta vodorod bog\'i bor?',
                options: ['Sitotsin (C) va 3 ta bog\'', 'Timin (T) va 2 ta bog\'', 'Adenin (A) va 1 ta bog\'', 'Uratsil (U) va 3 ta bog\''],
                correctAnswer: 0,
                explanation: 'Guanin va Sitotsin komplementar bo\'lib, ularning o\'rtasida 3 ta mustahkam vodorod bog\'i hosil bo\'ladi.'
              }
            ],
            tests: [{ id: 'test-9-organelles', title: 'Genetika va DNK', questionCount: 10 }],
            games: [{ id: 'build_dna', title: 'DNK Yasash', icon: '🧬', xpReward: 35 }]
          }
        ]
      },
      {
        id: '9-chapter-2',
        chapterNumber: 2,
        title: '2-Bob. Hujayra metabolizmi va energetikasi',
        icon: '📗',
        description: 'Assimilatsiya, fotosintez, glikoliz va ATF sintezi',
        lessons: [
          {
            id: '9-lesson-2-1',
            grade: 9,
            gradeId: '9',
            chapterId: '9-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. Hujayra metabolizmi va energetikasi',
            orderNumber: 1,
            title: 'Fotosintez: Yorug\'lik va Qorong\'ilik bosqichlari',
            icon: '🌱',
            estimatedMinutes: 25,
            summary: 'Fotosintez — yorug\'lik energiyasi hisobiga noorganik moddalar (CO2 va H2O)dan organik birikma (glyukoza) va kislorod sintezlanishidir.',
            description: 'Xloroplastlar, tilakoidlarda suv fotolizi, ATF va NADF·H hosil bo\'lishi hamda stromadagi Kalvin sikli.',
            learningGoals: [
              'Yorug\'lik bosqichida suv fotolizi va erkin kislorod ajralishini tushunish',
              'Qorong\'ilik bosqichida CO2 ning glyukozagacha qaytarilishini o\'rganish',
              'Yer yuzidagi hayotni saqlashda fotosintezning global ahamiyatini baholash'
            ],
            sections: [
              {
                subtitle: '1. Fotosintez reaksiyalari',
                content: 'Fotosintez tenglamasi: 6CO2 + 6H2O + quyosh nuri -> C6H12O6 + 6O2.',
                bulletPoints: [
                  'Yorug\'lik bosqichi: Xloroplast tilakoidlarida boradi. Suv fotolizi yuz beradi (H2O -> 2H+ + 2e- + 1/2 O2). ATF va NADF·H sintezlanadi.',
                  'Qorong\'ilik bosqichi (Kalvin sikli): Stromada sodir bo\'ladi. CO2 qabul qilinadi va ATF energiyasi hisobiga glyukoza hosil bo\'ladi.'
                ],
                callout: {
                  type: 'important',
                  title: '⭐ Muhim',
                  text: 'Atmosferaga chiqadigan erkin kislorod CO2 dan emas, balki suvning (H2O) fotolizidan kelib chiqadi!'
                }
              }
            ],
            quickQuestions: [
              {
                id: 'q-9-2-1-1',
                type: 'multiple-choice',
                question: 'Fotosintezda atmosferaga chiqadigan erkin kislorod manbai nima?',
                options: ['Suv (H2O)', 'Karbonat angidrid (CO2)', 'Glyukoza', 'ATF'],
                correctAnswer: 0,
                explanation: 'Yorug\'lik bosqichida suv molekulasining fotolizi natijasida erkin kislorod ajraladi.'
              }
            ],
            tests: [{ id: 'test-9-metabolism', title: 'Metabolizm va fotosintez', questionCount: 15 }],
            games: [{ id: 'virtual_lab', title: 'Virtual Laboratoriya', icon: '🔬', xpReward: 40 }]
          },
          {
            id: '9-lesson-2-2',
            grade: 9,
            gradeId: '9',
            chapterId: '9-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. Hujayra metabolizmi va energetikasi',
            orderNumber: 2,
            title: 'Hujayraviy nafas olish va ATF sintezi (Glikoliz)',
            icon: '⚡',
            estimatedMinutes: 20,
            summary: 'Dissimilyatsiya jarayonida organik moddalar parchalanib, ATF energiyasi ajraladi. Kislorodli parchalanish natijasida 36 molekula ATF sintezlanadi.',
            description: 'Tayyorgarlik bosqichi, kislorodsiz glikoliz (2 ATF) va mitoxondriyalardagi kislorodli bosqich (Krebs sikli, 36 ATF, jami 38 ATF).',
            learningGoals: [
              'Energetik almashinuvning 3 bosqichini o\'rganish',
              'Glikoliz natijasida pirouzum kislotasi va 2 ATF hosil bo\'lishini bilish',
              'Mitoxondriyadagi kislorodli parchalanish samaradorligini baholash'
            ],
            sections: [
              {
                subtitle: '1. Energetik almashinuv bosqichlari',
                content: 'Bitta molekula glyukoza to\'liq parchalanganda:',
                bulletPoints: [
                  '1-bosqich: Tayyorgarlik (oshqozon-ichakda, energiya issiqlik sifatida tarqaladi).',
                  '2-bosqich: Kislorodsiz (Glikoliz sitoplazmada kechadi, 2 ATF hosil bo\'ladi).',
                  '3-bosqich: Kislorodli (Mitoxondriya kristalarida boradi, 36 ATF hosil bo\'ladi).'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-9-2-2-1',
                type: 'multiple-choice',
                question: 'Bitta glyukoza molekulasi to\'liq parchalanganda jami nechta ATF molekulasi sintezlanadi?',
                options: ['38 ta ATF (2 + 36)', '2 ta ATF', '36 ta ATF', '4 ta ATF'],
                correctAnswer: 0,
                explanation: 'Glikolizda 2 ta ATF va mitoxondriyadagi kislorodli bosqichda 36 ta ATF, jami 38 ta ATF hosil bo\'ladi.'
              }
            ],
            tests: [{ id: 'test-9-metabolism', title: 'Metabolizm testi', questionCount: 15 }],
            games: [{ id: 'rapid_fire', title: 'Tezkor Savol', icon: '⚡', xpReward: 25 }]
          }
        ]
      },
      {
        id: '9-chapter-3',
        chapterNumber: 3,
        title: '3-Bob. Hujayraning ko\'payishi va Hujayra sikli',
        icon: '📙',
        description: 'Mitoz, meyoz va gametogenez jarayonlari',
        lessons: [
          {
            id: '9-lesson-3-1',
            grade: 9,
            gradeId: '9',
            chapterId: '9-chapter-3',
            chapterNumber: 3,
            chapterTitle: '3-Bob. Hujayraning ko\'payishi va Hujayra sikli',
            orderNumber: 1,
            title: 'Mitoz va Meyoz bo\'linish bosqichlari',
            icon: '🔬',
            estimatedMinutes: 25,
            summary: 'Mitoz — somatik hujayralarning bo\'linishi bo\'lib, 2 ta diploid hujayra beradi. Meyoz esa jinsiy hujayralarni (4 ta gaploid) hosil qiluvchi reduksion bo\'linishdir.',
            description: 'Profaza, metafaza, anafaza, telofaza bosqichlari, krossingover va genetik xilma-xillik.',
            learningGoals: [
              'Mitozning 4 bosqichini ketma-ketlikda sanash',
              'Meyoz I dagi krossingover va kon\'yugatsiya mohiyatini tushunish',
              'Mitoz va meyoz natijalari (2n -> 2n vs 2n -> n)ni taqqoslash'
            ],
            sections: [
              {
                subtitle: '1. Mitoz va Meyoz taqqoslashi',
                content: 'Bo\'linish tirik organizmlarning o\'sishi va nasl qoldirishining asosidir:',
                bulletPoints: [
                  'Mitoz: Tana (somatik) hujayralarida boradi. 1 ta bo\'linishdan iborat. Natijada 2 ta bir xil diploid (2n) qiz hujayra hosil bo\'ladi.',
                  'Meyoz: Jinsiy hujayralarda boradi. Ketma-ket 2 ta bo\'linishdan iborat. Xromosomalar soni ikki barobar kamayadi (gaploid - n). 4 ta qiz hujayra hosil bo\'ladi.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-9-3-1-1',
                type: 'multiple-choice',
                question: 'Meyoz bo\'linish natijasida bitta ona hujayradan nechta gaploid qiz hujayra hosil bo\'ladi?',
                options: ['4 ta gaploid (n)', '2 ta diploid (2n)', '1 ta hujayra', '8 ta hujayra'],
                correctAnswer: 0,
                explanation: 'Meyozning ikkita ketma-ket bo\'linishi natijasida 4 ta gaploid (n) jinsiy hujayra shakllanadi.'
              }
            ],
            tests: [{ id: 'test-9-final', title: '9-sinf Yakuniy Imtihon', questionCount: 20 }],
            games: [{ id: 'crossword', title: 'Biologik Krossvord', icon: '📝', xpReward: 35 }]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 🟣 10-SINF BIOLOGIYA (Genetika, Irsiyat va Seleksiya Qonuniyatlari)
  // =========================================================================
  {
    gradeId: '10',
    gradeNumber: 10,
    gradeName: '10-sinf Biologiya',
    subtitle: 'Klassik va Molekulyar Genetika, O\'zgaruvchanlik, Seleksiya',
    icon: '🔬',
    description: 'Mendel qonunlari, xromosoma nazariyasi, mutatsiyalar, gen muhandisligi va irsiy kasalliklar profilaktikasi.',
    chapters: [
      {
        id: '10-chapter-1',
        chapterNumber: 1,
        title: '1-Bob. Irsiyat qonuniyatlari va Mendel ta\'limoti',
        icon: '📘',
        description: 'Monogibrid, digibrid chatishtirish va Pennet katagi',
        lessons: [
          {
            id: '10-lesson-1-1',
            grade: 10,
            gradeId: '10',
            chapterId: '10-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Irsiyat qonuniyatlari va Mendel ta\'limoti',
            orderNumber: 1,
            title: 'G. Mendel qonunlari: Monogibrid chatishtirish',
            icon: '🧬',
            estimatedMinutes: 25,
            summary: 'Genetika — irsiyat va o\'zgaruvchanlik fani. Mendelning 1-qonuni (Bir xillik) va 2-qonuni (Belgilarning ajralishi, 3:1) genetik qonuniyatlarning asosidir.',
            description: 'Dominant va retsessiv genlar, gomozigota va geterozigota, fenotip va genotip tushunchalari.',
            learningGoals: [
              'Genotip va fenotip tushunchalarini farqlash',
              'Mendelning 1- va 2-qonunlari mexanizmini tushunish',
              'Genetik masalalarni yechishda belgilar belgilanishi (AA, Aa, aa)ni qo\'llash'
            ],
            sections: [
              {
                subtitle: '1. Mendelning monogibrid tajribalari',
                content: 'Gregor Mendel sariq va yashil no\'xatlarni chatishtirdi:',
                bulletPoints: [
                  '1-qonun (Bir xillik): AA (sariq) x aa (yashil) -> F1 da barcha duragaylar sariq va geterozigota (Aa) bo\'ldi.',
                  '2-qonun (Ajralish): Aa x Aa chatishtirilganda F2 da fenotip bo\'yicha 3 sariq : 1 yashil (3:1), genotip bo\'yicha 1 AA : 2 Aa : 1 aa (1:2:1) ajralish kuzatildi.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-10-1-1-1',
                type: 'multiple-choice',
                question: 'Geterozigota sariq no\'xatlar o\'zaro chatishtirilganda (Aa x Aa) F2 da fenotip bo\'yicha ajralish nisbati qanday bo\'ladi?',
                options: ['3 : 1', '1 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1'],
                correctAnswer: 0,
                explanation: 'Fenotip bo\'yicha 75% dominant sariq va 25% retsessiv yashil, ya\'ni 3:1 nisbatda ajralish kuzatiladi.'
              }
            ],
            tests: [{ id: 'test-10-mendel', title: 'Mendel qonunlari testi', questionCount: 10 }],
            games: [{ id: 'genetics_expert', title: 'Genetika Mutaxassisi', icon: '🧬', xpReward: 35 }]
          },
          {
            id: '10-lesson-1-2',
            grade: 10,
            gradeId: '10',
            chapterId: '10-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Irsiyat qonuniyatlari va Mendel ta\'limoti',
            orderNumber: 2,
            title: 'Digibrid chatishtirish va Pennet katagi',
            icon: '🎲',
            estimatedMinutes: 25,
            summary: 'Mendelning 3-qonuni — belgilarning mustaqil taqsimlanishi. Digibrid duragaylashda (AaBb x AaBb) F2 da 9:3:3:1 fenotipik nisbat olinadi.',
            description: 'Ikki juft muqobil belgilar bo\'yicha chatishtirish va 16 katakli Pennet jadvalini tuzish qoidalari.',
            learningGoals: [
              'Digibrid chatishtirishda gametalar hosil bo\'lishini (AB, Ab, aB, ab) aniqlash',
              'Pennet katagini to\'g\'ri to\'ldirish',
              '9:3:3:1 nisbatining biologik mohiyatini tushunish'
            ],
            sections: [
              {
                subtitle: '1. Mustaqil irsiylanish qonuni',
                content: 'Sariq silliq (AABB) va yashil burishgan (aabb) no\'xatlar chatishtirilganda F1 duragayi AaBb bo\'ladi. Ular o\'zaro chatishtirilganda 4 xil fenotipik sinf paydo bo\'ladi: 9 sariq silliq, 3 sariq burishgan, 3 yashil silliq, 1 yashil burishgan.'
              }
            ],
            quickQuestions: [
              {
                id: 'q-10-1-2-1',
                type: 'multiple-choice',
                question: 'Digibrid chatishtirishda (AaBb x AaBb) fenotip bo\'yicha qanday nisbat olinadi?',
                options: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '1 : 1 : 1 : 1'],
                correctAnswer: 0,
                explanation: 'Ikki mustaqil gen juftligi bo\'yicha F2 avlodda 9:3:3:1 fenotipik nisbat hosil bo\'ladi.'
              }
            ],
            tests: [{ id: 'test-10-mendel', title: 'Genetika masalalari', questionCount: 10 }],
            games: [{ id: 'match_pairs', title: 'Genotip Juftlari', icon: '🃏', xpReward: 25 }]
          }
        ]
      },
      {
        id: '10-chapter-2',
        chapterNumber: 2,
        title: '2-Bob. O\'zgaruvchanlik qonuniyatlari va Mutatsiyalar',
        icon: '📗',
        description: 'Modifikatsion va mutatsion o\'zgaruvchanlik',
        lessons: [
          {
            id: '10-lesson-2-1',
            grade: 10,
            gradeId: '10',
            chapterId: '10-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. O\'zgaruvchanlik qonuniyatlari va Mutatsiyalar',
            orderNumber: 1,
            title: 'Modifikatsion va Mutatsion o\'zgaruvchanlik',
            icon: '⚡',
            estimatedMinutes: 20,
            summary: 'Modifikatsion o\'zgaruvchanlik — tashqi muhit ta\'sirida vujudga kelib, naslga o\'tmaydi. Mutatsiyalar esa genetik apparatning o\'zgarishi bo\'lib, irsiylanadi.',
            description: 'Reaksiya normasi, gen mutatsiyalari, xromosoma qayta qurilishi va genom mutatsiyalari (poliploidiya, Daun sindromi).',
            learningGoals: [
              'Irsiy (mutatsion) va noirsiy (modifikatsion) o\'zgaruvchanlikni taqqoslash',
              'Reaksiya normasining chegaralarini aniqlash',
              'Mutagen omillar (radiatsiya, kimyoviy moddalar)dan himoyalanishni bilish'
            ],
            sections: [
              {
                subtitle: '1. O\'zgaruvchanlik turlari',
                content: 'Tirik tabiatda xilma-xillikni ta\'minlovchi jarayonlar:',
                bulletPoints: [
                  'Modifikatsion: Genotip o\'zgarmaydi. Tashqi muhit omillari ta\'sirida vujudga keladi (quyoshda qorayish, semirish).',
                  'Mutatsion: DNK tuzilishi, xromosomalar shakli yoki soni o\'zgaradi (gen, xromosoma va genom mutatsiyalari).'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-10-2-1-1',
                type: 'multiple-choice',
                question: 'Quyidagilardan qaysi biri modifikatsion (noirsiy) o\'zgaruvchanlikka misol bo\'ladi?',
                options: ['Quyosh nuri ostida terining qorayishi', 'Daun sindromi', 'Albinizm', 'Gemofiliya'],
                correctAnswer: 0,
                explanation: 'Quyoshda qorayish terining tashqi ultrabinafsha nurlarga vaqtinchalik moslashuvidir va nasldan-naslga o\'tmaydi.'
              }
            ],
            tests: [{ id: 'test-10-dna', title: 'Mutatsiyalar testi', questionCount: 15 }],
            games: [{ id: 'boss_battle', title: 'Genetika Viktorinasi', icon: '👑', xpReward: 40 }]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 🟠 11-SINF BIOLOGIYA (Evolutsiya, Ekologiya va Biosfera Ta'limoti)
  // =========================================================================
  {
    gradeId: '11',
    gradeNumber: 11,
    gradeName: '11-sinf Biologiya',
    subtitle: 'Evolutsion Ta\'limot, Ekologik Qonuniyatlar va Biosfera',
    icon: '🧠',
    description: 'Darvin nazariyasi, tabiiy tanlanish, makroevolutsiya, trofik zanjirlar, 10% qoidasi va global biosfera muammolari.',
    chapters: [
      {
        id: '11-chapter-1',
        chapterNumber: 1,
        title: '1-Bob. Evolutsion ta\'limot',
        icon: '📘',
        description: 'Ch. Darvin nazariyasi, tabiiy tanlanish va turlarning paydo bo\'lishi',
        lessons: [
          {
            id: '11-lesson-1-1',
            grade: 11,
            gradeId: '11',
            chapterId: '11-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Evolutsion ta\'limot',
            orderNumber: 1,
            title: 'Ch. Darvin ta\'limoti va Tabiiy tanlanish',
            icon: '🐾',
            estimatedMinutes: 25,
            summary: 'Evolutsiya — tirik tabiatning tarixiy rivojlanish jarayoni. Charlz Darvin tabiiy tanlanishni evolutsiyaning asosiy harakatlantiruvchi kuchi deb isbotladi.',
            description: 'Irsiyat, o\'zgaruvchanlik, yashash uchun kurash shakllari va tabiiy tanlanish natijasida yangi turlarning paydo bo\'lishi.',
            learningGoals: [
              'Darvin ta\'limotining 3 asosiy harakatlantiruvchi omilini bilish',
              'Tur ichidagi, turlararo va noqulay muhitga qarshi kurashni tahlil qilish',
              'Tabiiy va sun\'iy tanlanish o\'rtasidagi farqlarni aniqlash'
            ],
            sections: [
              {
                subtitle: '1. Darvinizm asoslari',
                content: 'Charlz Darvin 1859-yilda "Turlarning kelib chiqishi" asarini e\'lon qildi:',
                bulletPoints: [
                  'Nasliy o\'zgaruvchanlik: Organizmlardagi kichik irsiy o\'zgarishlar evolutsiya uchun xomashyo beradi.',
                  'Yashash uchun kurash: Cheklangan resurslar (oziq, hudud, juft) uchun kurash. Eng shafqatsizi — tur ichidagi kurash.',
                  'Tabiiy tanlanish: Muhitga moslashgan individlarning omon qolishi va nasl qoldirishi.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-11-1-1-1',
                type: 'multiple-choice',
                question: 'Darvin ta\'limotiga ko\'ra, evolutsiyaning asosiy yo\'naltiruvchi omili nima?',
                options: ['Tabiiy tanlanish', 'Ixtiyorsiz o\'zgarish', 'Faqat duragaylash', 'Mutatsiyalarning yo\'qligi'],
                correctAnswer: 0,
                explanation: 'Tabiiy tanlanish tirik organizmlarning yashash muhitiga moslashishini ta\'minlovchi asosiy yo\'naltiruvchi omildir.'
              }
            ],
            tests: [{ id: 'test-11-darwin', title: 'Evolutsiya testi', questionCount: 10 }],
            games: [{ id: 'rapid_fire', title: 'Tezkor Evolutsiya', icon: '⚡', xpReward: 25 }]
          },
          {
            id: '11-lesson-1-2',
            grade: 11,
            gradeId: '11',
            chapterId: '11-chapter-1',
            chapterNumber: 1,
            chapterTitle: '1-Bob. Evolutsion ta\'limot',
            orderNumber: 2,
            title: 'Makroevolutsiya yo\'nalishlari: Aromorfoz, Idioadaptatsiya, Degeneratsiya',
            icon: '🦎',
            estimatedMinutes: 20,
            summary: 'A.N. Severtsov ta\'limotiga ko\'ra biologik progress 3 yo\'l bilan amalga oshadi: aromorfoz (darajani ko\'tarish), idioadaptatsiya (xususiy moslanish) va umumiy degeneratsiya.',
            description: 'Gomologik organlar (umumiy kelib chiqish) va analogik organlar (o\'xshash funktsiya) tushunchalari.',
            learningGoals: [
              'Aromorfoz, idioadaptatsiya va degeneratsiya misollarini topish',
              'Gomologik va analogik organlarni farqlash',
              'Biologik progress va biologik regress mezonlarini bilish'
            ],
            sections: [
              {
                subtitle: '1. Rivojlanish yo\'nalishlari',
                content: 'Tirik tabiatdagi morfofiziologik o\'zgarishlar:',
                bulletPoints: [
                  'Aromorfoz: Tuzilish darajasini keskin ko\'taruvchi yirik o\'zgarishlar (to\'rt kamerali yurak, sut bezlari, issiqqonlilik).',
                  'Idioadaptatsiya: Muayyan yashash sharoitiga xususiy moslashuvlar (qushlar tumshug\'i shakli, himoya rangi).',
                  'Umumiy degeneratsiya: O\'troq yoki parazit hayot kechirish sababli ayrim organlarning yo\'qolishi (tasmasimon chuvalchanglarda hazm sistemasining yo\'qligi).'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-11-1-2-1',
                type: 'multiple-choice',
                question: 'Tuzilish darajasini keskin ko\'taruvchi yirik evolutsion sakrash qanday ataladi?',
                options: ['Aromorfoz', 'Idioadaptatsiya', 'Degeneratsiya', 'Konvergensiya'],
                correctAnswer: 0,
                explanation: 'Aromorfoz (masalan, to\'rt kamerali yurak yoki gulli o\'simliklar paydo bo\'lishi) umumiy tuzilish darajasini ko\'taradi.'
              }
            ],
            tests: [{ id: 'test-11-darwin', title: 'Makroevolutsiya testi', questionCount: 10 }],
            games: [{ id: 'guess_picture', title: 'Organlarni Aniqlash', icon: '🖼️', xpReward: 25 }]
          }
        ]
      },
      {
        id: '11-chapter-2',
        chapterNumber: 2,
        title: '2-Bob. Biogeotsenoz va Biosfera',
        icon: '📗',
        description: 'Ekologik omillar, oziq zanjirlari, 10% qoidasi va V.I. Vernadskiy ta\'limoti',
        lessons: [
          {
            id: '11-lesson-2-1',
            grade: 11,
            gradeId: '11',
            chapterId: '11-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. Biogeotsenoz va Biosfera',
            orderNumber: 1,
            title: 'Ekologik omillar, oziq zanjirlari va 10% piramida qoidasi',
            icon: '🌳',
            estimatedMinutes: 25,
            summary: 'Ekotizimda moddalar va energiya oziq zanjiri bo\'ylab harakatlanadi: produtsentlar -> konsumentlar -> redutsentlar. R. Lindeman qoidasiga ko\'ra bir bo\'g\'indan keyingisiga faqat 10% energiya o\'tadi.',
            description: 'Abiotik, biotik va antropogen omillar, trofik darajalar va oziq to\'rlari.',
            learningGoals: [
              'Abiotik va biotik omillarni tasniflash',
              'Produtsent, konsument va redutsentlarning ekologik vazifalarini bilish',
              '10%lik energiya piramidasi bo\'yicha hisoblash masalalarini yechish'
            ],
            sections: [
              {
                subtitle: '1. Ekotizimning tarkibiy qismlari',
                content: 'Oziq zanjirining uch asosiy halqasi:',
                bulletPoints: [
                  'Produtsentlar (hosil qiluvchilar): Quyosh nuri hisobiga organik modda sintezlovchi yashil o\'simliklar.',
                  'Konsumentlar (iste\'molchilar): Tayyor organik modda bilan oziqlanuvchi o\'txo\'r va yirtqich hayvonlar.',
                  'Redutsentlar (parchalovchilar): Organik qoldiqlarni anorganik minerallarga parchalovchi bakteriya va zamburug\'lar.'
                ],
                callout: {
                  type: 'important',
                  title: '⭐ 10% qoidasi (R. Lindeman)',
                  text: 'Oziq zanjirining har bir keyingi bo\'g\'iniga oldingi bo\'g\'indagi energiyaning atigi 10% qismi o\'tadi, qolgan 90% esa issiqlik sifatida sarflanadi.'
                }
              }
            ],
            quickQuestions: [
              {
                id: 'q-11-2-1-1',
                type: 'multiple-choice',
                question: 'Oziq zanjirida organik qoldiqlarni anorganik moddalargacha parchalovchi organizmlar guruhi qaysi?',
                options: ['Redutsentlar', 'Produtsentlar', 'Konsumentlar', 'Autotroflar'],
                correctAnswer: 0,
                explanation: 'Redutsentlar (bakteriya va zamburug\'lar) o\'lik organik moddalarni minerallarga parchalaydi.'
              }
            ],
            tests: [{ id: 'test-11-ecology', title: 'Ekologiya testi', questionCount: 15 }],
            games: [{ id: 'ecosystem_builder', title: 'Ekotizim Quruvchi', icon: '🌲', xpReward: 35 }]
          },
          {
            id: '11-lesson-2-2',
            grade: 11,
            gradeId: '11',
            chapterId: '11-chapter-2',
            chapterNumber: 2,
            chapterTitle: '2-Bob. Biogeotsenoz va Biosfera',
            orderNumber: 2,
            title: 'V.I. Vernadskiyning Biosfera ta\'limoti va Tabiatni muhofaza qilish',
            icon: '🌍',
            estimatedMinutes: 20,
            summary: 'Biosfera — Yer sayyorasining tirik organizmlar yashaydigan qobig\'i. V.I. Vernadskiy tirik moddaning geokimyoviy rolini isbotlab, aql qobig\'i — Noosfera tushunchasini yaratdi.',
            description: 'Biosfera chegaralari (litosfera, gidrosfera, atmosfera), moddalar davriy aylanishi va Qizil kitob.',
            learningGoals: [
              'Biosfera chegaralarini (atmosferada 20-25 km, litosferada 3-4 km, gidrosferada 11 km) bilish',
              'Noosfera (aql qobig\'i) tushunchasini tushunish',
              'O\'zbekiston Qizil kitobi va biologik xilma-xillikni asrash tadbirlarini o\'rganish'
            ],
            sections: [
              {
                subtitle: '1. Biosfera va uning chegaralari',
                content: 'V.I. Vernadskiy biosferani "Yerning tirik moddasi" deb atagan:',
                bulletPoints: [
                  'Atmosferaning pastki qismi: Ozon qatlamigacha (20-25 km).',
                  'Gidrosfera: Butun okean va dengizlar tubigacha (Mariana botig\'i, 11 022 m).',
                  'Litosferaning yuqori qatlami: 3-4 km chuqurlikkacha bo\'lgan erkin bakteriyalar.'
                ]
              }
            ],
            quickQuestions: [
              {
                id: 'q-11-2-2-1',
                type: 'multiple-choice',
                question: 'Biosfera haqidagi mukammal ilmiy ta\'limot asoschisi kim?',
                options: ['V.I. Vernadskiy', 'Ch. Darvin', 'E. Gekkel', 'A. Tensli'],
                correctAnswer: 0,
                explanation: 'Vladimir Ivanovich Vernadskiy biosfera va tirik moddaning sayyoradagi roli haqidagi ta\'limotni yaratgan.'
              }
            ],
            tests: [{ id: 'test-11-final', title: '11-sinf Davlat Attestatsiyasi', questionCount: 25 }],
            games: [{ id: 'word_search', title: 'Ekologik So\'z Qidiruv', icon: '🔤', xpReward: 30 }]
          }
        ]
      }
    ]
  }
];

// Flat list of topics for backward-compatibility with all existing components
export const TOPICS: Topic[] = GRADE_COURSES.flatMap(course =>
  course.chapters.flatMap(chap => chap.lessons)
);

export const INITIAL_TESTS = [
  { id: 'test-8-cell', grade: 8 as const, title: '8-sinf: Hujayra va To\'qimalar tekshiruvi', category: 'topic' as const, questionCount: 10, timeLimitMinutes: 10 },
  { id: 'test-8-heart', grade: 8 as const, title: '8-sinf: Qon aylanish va Yurak fiziologiyasi', category: 'chapter' as const, questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-8-final', grade: 8 as const, title: '8-sinf: Yillik Yakuniy Anatomiya Imtihoni', category: 'exam' as const, questionCount: 20, timeLimitMinutes: 20 },
  
  { id: 'test-9-organelles', grade: 9 as const, title: '9-sinf: Hujayra organoidlari va Sitologiya', category: 'topic' as const, questionCount: 10, timeLimitMinutes: 10 },
  { id: 'test-9-metabolism', grade: 9 as const, title: '9-sinf: Fotosintez va Hujayra energetikasi', category: 'chapter' as const, questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-9-final', grade: 9 as const, title: '9-sinf: Umumiy Biologiya Yakuniy Imtihoni', category: 'exam' as const, questionCount: 20, timeLimitMinutes: 20 },

  { id: 'test-10-mendel', grade: 10 as const, title: '10-sinf: Mendel qonunlari va Genetika masalalari', category: 'topic' as const, questionCount: 10, timeLimitMinutes: 12 },
  { id: 'test-10-dna', grade: 10 as const, title: '10-sinf: Molekulyar genetika va Mutatsiyalar', category: 'chapter' as const, questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-10-final', grade: 10 as const, title: '10-sinf: Genetika bo\'yicha Katta Imtihon', category: 'exam' as const, questionCount: 20, timeLimitMinutes: 20 },

  { id: 'test-11-darwin', grade: 11 as const, title: '11-sinf: Darvin ta\'limoti va Tabiiy tanlanish', category: 'topic' as const, questionCount: 10, timeLimitMinutes: 10 },
  { id: 'test-11-ecology', grade: 11 as const, title: '11-sinf: Ekologik omillar va Biosfera qonunlari', category: 'chapter' as const, questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-11-final', grade: 11 as const, title: '11-sinf: Bitiruvchi Yakuniy Davlat Attestatsiyasi', category: 'exam' as const, questionCount: 25, timeLimitMinutes: 25 },
];

export const GENERAL_TEST_QUESTIONS: { [grade: number]: { question: string; options: string[]; correctIndex: number; explanation: string }[] } = {
  8: [
    { question: 'Inson skeletida jami nechta suyak mavjud?', options: ['150 ga yaqin', '206 dan ortiq', '320 ta', '100 ta'], correctIndex: 1, explanation: 'Voyaga yetgan odam skeletida 206 dan ortiq suyaklar birlashgan.' },
    { question: 'Qaysi shaklli elementlar qon ivishida ishtirok etadi?', options: ['Eritrotsitlar', 'Leykotsitlar', 'Trombotsitlar', 'Plazma oqsillari'], correctIndex: 2, explanation: 'Trombotsitlar (qon plastinkalari) qon tomir jarohatlanganda qon ivishini ta\'minlaydi.' },
    { question: 'Bosh miyaning qaysi bo\'limi harakatlarni muvofiqlashtiradi va muvozanatni saqlaydi?', options: ['Uzunchoq miya', 'Miyacha', 'Ko\'prik', 'Gipotalamus'], correctIndex: 1, explanation: 'Miyacha harakatlar koordinatsiyasi va gavda muvozanatini boshqaradi.' },
    { question: 'Oshqozon shirasining asosiy kislotasi qaysi?', options: ['Sulfat kislota', 'Xlorid kislota (HCl)', 'Sirka kislota', 'Fosfat kislota'], correctIndex: 1, explanation: 'Oshqozon bezlari xlorid kislotasi (HCl) ajratib, oqsillarni parchalovchi pepsinni faollashtiradi va bakteriyalarni nobud qiladi.' },
    { question: 'Katta qon aylanish doirasi qaysi tomir bilan boshlanadi?', options: ['O\'pka arteriyasi', 'Aorta', 'Kovak vena', 'Jigar venasi'], correctIndex: 1, explanation: 'Chap qorinchadan eng katta tomir - aorta boshlanadi.' },
    { question: 'Buyrakning asosiy qon filtrlovchi funktsional birligi nima?', options: ['Nefron', 'Neyron', 'Alveola', 'Akson'], correctIndex: 0, explanation: 'Nefron har bir buyrakda taxminan 1 milliontadan bo\'lib, qondan siydikni filtrlash vazifasini bajaradi.' },
    { question: 'Odam organizmida qaysi to\'qima suyuq hujayralararo moddaga ega?', options: ['Epiteliy', 'Qon (biriktiruvchi to\'qima)', 'Silliq muskul', 'Asab to\'qimasi'], correctIndex: 1, explanation: 'Qon suyuq biriktiruvchi to\'qima bo\'lib, uning hujayralararo moddasi plazma deb ataladi.' },
    { question: 'Yurakning o\'ng qorinchasidan qaysi tomir chiqadi?', options: ['O\'pka arteriyasi', 'Aorta', 'Yuqori kovak vena', 'Pastki kovak vena'], correctIndex: 0, explanation: 'O\'ng qorinchadan o\'pka poyasi (o\'pka arteriyasi) chiqib, venoz qonni o\'pkaga olib boradi.' }
  ],
  9: [
    { question: 'Hujayrada oqsil biosintezi qaysi organoidda amalga oshiriladi?', options: ['Lizosoma', 'Ribosoma', 'Vakuola', 'Mitoxondriya'], correctIndex: 1, explanation: 'Ribosomalar aminokislotalardan oqsillarni sintezlovchi molekulyar mashinadir.' },
    { question: 'Fotosintezning yorug\'lik bosqichida suvning parchalanishi nima deyiladi?', options: ['Gidroliz', 'Fotoliz', 'Elektroliz', 'Pirolyz'], correctIndex: 1, explanation: 'Yorug\'lik nuri ta\'sirida suvning parchalanishi fotoliz deb ataladi.' },
    { question: 'Prokariot hujayralarning eukariotlardan asosiy farqi nimada?', options: ['Membranasining yo\'qligi', 'Shakllangan yadroga ega emasligi', 'Ribosomasining bo\'lmasligi', 'Hujayra bo\'linmasligi'], correctIndex: 1, explanation: 'Bakteriyalar (prokariotlar) da membrana bilan o\'ralgan yadro bo\'lmaydi, genetik xomashyo halqasimon nukleoid shaklida joylashadi.' },
    { question: 'Mitoz bo\'linish natijasida bitta ona hujayradan nechta hujayra hosil bo\'ladi?', options: ['2 ta diploid (2n)', '4 ta gaploid (n)', '1 ta yangi hujayra', '8 ta hujayra'], correctIndex: 0, explanation: 'Mitoz natijasida genetik jihatdan ona hujayraga aynan o\'xshash 2 ta diploid hujayra vujudga keladi.' },
    { question: 'ATF molekulasida nechta makroergik (yuqori energiyali) bog\' mavjud?', options: ['1 ta', '2 ta', '3 ta', '4 ta'], correctIndex: 1, explanation: 'ATF ning 3 ta fosfat qoldig\'i o\'rtasida 2 ta kuchli makroergik bog\' mavjud bo\'lib, har biri uzilganda 40 kJ/mol energiya ajraladi.' },
    { question: 'DNK dagi dezoksiriboza qandi qaysi sinfga mansub?', options: ['Monosaxarid (pentaza)', 'Disaxarid', 'Polisaxarid', 'Lipid'], correctIndex: 0, explanation: 'Dezoksiriboza 5 ta uglerodli monosaxarid (pentaza) hisoblanadi.' },
    { question: 'Fotosintezning qorong\'ilik bosqichi qayerda kechadi?', options: ['Xloroplast tilakoidida', 'Xloroplast stromasida', 'Mitoxondriyada', 'Yadroda'], correctIndex: 1, explanation: 'Qorong\'ilik bosqichi (Kalvin sikli) xloroplastning stroma qismida kechadi.' }
  ],
  10: [
    { question: 'Gomozigota retsessiv organizm genotipi qanday yoziladi?', options: ['AA', 'Aa', 'aa', 'AB'], correctIndex: 2, explanation: 'Kichik harflar bilan bir xil allellar juftligi (aa) gomozigota retsessiv hisoblanadi.' },
    { question: 'DNK da Timin nukleotidiga qaysi nukleotid komplementar bo\'ladi?', options: ['Guanin', 'Sitotsin', 'Adenin', 'Uratsil'], correctIndex: 2, explanation: 'DNK da Adenin va Timin (A=T) o\'zaro komplementar bog\'lanadi.' },
    { question: 'Inson tana hujayralarida xromosomalar soni nechta?', options: ['23 ta', '46 ta (23 juft)', '48 ta', '92 ta'], correctIndex: 1, explanation: 'Odamda 22 juft autosoma va 1 juft jinsiy xromosoma, jami 46 ta xromosoma bor.' },
    { question: 'Nasldan-naslga o\'tmaydigan, faqat tashqi muhit ta\'sirida yuzaga keladigan o\'zgaruvchanlik qaysi?', options: ['Mutatsion', 'Kombinativ', 'Modifikatsion', 'Genom'], correctIndex: 2, explanation: 'Modifikatsion o\'zgaruvchanlik genotipga ta\'sir qilmaydi va kelgusi avlodga berilmaydi.' },
    { question: 'Qaysi olim xromosoma nazariyasini kashf etgan?', options: ['G. Mendel', 'T. Morgan', 'Ch. Darvin', 'J.B. Lamark'], correctIndex: 1, explanation: 'Tomas Hant Morgan drozofila pashshalarida o\'tkazgan tajribalari orqali xromosoma nazariyasini yaratdi.' },
    { question: 'Digibrid chatishtirishda (AaBb x AaBb) fenotipik ajralish nisbati qanday?', options: ['9:3:3:1', '3:1', '1:2:1', '1:1:1:1'], correctIndex: 0, explanation: 'Mendelning 3-qonuniga ko\'ra digibrid duragaylashda 9:3:3:1 nisbat olinadi.' }
  ],
  11: [
    { question: 'Evolutsiyaning boshlang\'ich elementar birligi nima?', options: ['Alohida individ', 'Populyatsiya', 'Tur', 'Biogeotsenoz'], correctIndex: 1, explanation: 'Zamonaviy sintetik evolutsiya ta\'limotiga ko\'ra, evolutsiyaning boshlang\'ich birligi populyatsiyadir.' },
    { question: 'Organizmlarning umumiy tuzilish darajasini keskin ko\'taruvchi evolutsion o\'zgarish nima deyiladi?', options: ['Idioadaptatsiya', 'Aromorfoz', 'Degeneratsiya', 'Konvergensiya'], correctIndex: 1, explanation: 'Aromorfoz (masalan, 4 kamerali yurak, sut bezlari, issiqqonlilik) tuzilish darajasini yuksaltiradi.' },
    { question: 'Oziq zanjirida quyosh nuri hisobiga organik modda hosil qiluvchilar nima deyiladi?', options: ['Konsumentlar', 'Produtsentlar', 'Redutsentlar', 'Simbiontlar'], correctIndex: 1, explanation: 'Yashil o\'simliklar va avtotroflar produtsent (ishlab chiqaruvchi) hisoblanadi.' },
    { question: 'Biosfera haqidagi mukammal ilmiy ta\'limotni kim yaratgan?', options: ['Ch. Darvin', 'V.I. Vernadskiy', 'E. Gekkel', 'A. Tensli'], correctIndex: 0, explanation: 'Rus va jahon olimi V.I. Vernadskiy biosfera va uning tirik moddasi haqidagi ta\'limotga asos solgan.' },
    { question: 'Bir bo\'g\'indan keyingisiga o\'tadigan energiya miqdori qoidasi (Lindeman qoidasi) qancha?', options: ['100%', '50%', '10%', '1%'], correctIndex: 2, explanation: 'Trofik zanjirda energiya uzatilishida 10% qoidasi amal qiladi.' }
  ]
};

export const INITIAL_ATTENDANCE = {
  8: [
    { studentId: 'st-8-1', studentName: 'Aliyev Jasur', grade: 8 as const, dates: { '2026-09-01': 'present', '2026-09-03': 'present', '2026-09-08': 'present', '2026-09-10': 'absent', '2026-09-15': 'present' } },
    { studentId: 'st-8-2', studentName: 'Karimova Malika', grade: 8 as const, dates: { '2026-09-01': 'present', '2026-09-03': 'present', '2026-09-08': 'present', '2026-09-10': 'present', '2026-09-15': 'present' } },
    { studentId: 'st-8-3', studentName: 'Toshmatov Bobur', grade: 8 as const, dates: { '2026-09-01': 'late', '2026-09-03': 'present', '2026-09-08': 'excused', '2026-09-10': 'present', '2026-09-15': 'present' } },
    { studentId: 'st-8-4', studentName: 'Rustamova Shahnoza', grade: 8 as const, dates: { '2026-09-01': 'present', '2026-09-03': 'present', '2026-09-08': 'present', '2026-09-10': 'present', '2026-09-15': 'present' } },
    { studentId: 'st-8-5', studentName: 'Olimov Sardor', grade: 8 as const, dates: { '2026-09-01': 'present', '2026-09-03': 'absent', '2026-09-08': 'present', '2026-09-10': 'present', '2026-09-15': 'late' } }
  ],
  9: [
    { studentId: 'st-9-1', studentName: 'Xoliqov Temur', grade: 9 as const, dates: { '2026-09-02': 'present', '2026-09-04': 'present', '2026-09-09': 'present', '2026-09-11': 'present', '2026-09-16': 'present' } },
    { studentId: 'st-9-2', studentName: 'Sultonova Ziyoda', grade: 9 as const, dates: { '2026-09-02': 'present', '2026-09-04': 'late', '2026-09-09': 'present', '2026-09-11': 'present', '2026-09-16': 'excused' } },
    { studentId: 'st-9-3', studentName: 'Yuldashev Azamat', grade: 9 as const, dates: { '2026-09-02': 'present', '2026-09-04': 'present', '2026-09-09': 'present', '2026-09-11': 'present', '2026-09-16': 'present' } }
  ],
  10: [
    { studentId: 'st-10-1', studentName: 'Mirzayev Kamol', grade: 10 as const, dates: { '2026-09-01': 'present', '2026-09-05': 'present', '2026-09-08': 'present', '2026-09-12': 'present' } },
    { studentId: 'st-10-2', studentName: 'Ergasheva Dilnoza', grade: 10 as const, dates: { '2026-09-01': 'present', '2026-09-05': 'absent', '2026-09-08': 'present', '2026-09-12': 'present' } }
  ],
  11: [
    { studentId: 'st-11-1', studentName: 'Nematov Jamshid', grade: 11 as const, dates: { '2026-09-02': 'present', '2026-09-06': 'present', '2026-09-09': 'present', '2026-09-13': 'present' } },
    { studentId: 'st-11-2', studentName: 'Qodirova Madina', grade: 11 as const, dates: { '2026-09-02': 'present', '2026-09-06': 'present', '2026-09-09': 'present', '2026-09-13': 'present' } }
  ]
};
