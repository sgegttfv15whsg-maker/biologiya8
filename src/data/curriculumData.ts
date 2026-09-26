import { Topic, DailyFact, Badge } from '../types';

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

export const TOPICS: Topic[] = [
  // ================= 8-SINF =================
  {
    id: 'topic-8-1',
    grade: 8,
    chapterNumber: 1,
    chapterTitle: '1-Bob. Odam organizmiga umumiy tavsif. Hujayra va to\'qimalar',
    orderNumber: 1,
    title: 'Odam organizmining hujayraviy tuzilishi va to\'qimalar',
    icon: '🧫',
    estimatedMinutes: 20,
    summary: 'Inson tanasi trillionlab hujayralardan iborat. Hujayralar birlashib to\'rtta asosiy to\'qima turini hosil qiladi: epiteliy, biriktiruvchi, muskul va asab to\'qimasi.',
    learningGoals: [
      'Inson tanasidagi to\'qimalarning 4 ta asosiy turini va ularning funksiyalarini bilib olish',
      'Hujayra organoidlarining o\'zaro hamkorlikda ishlash mohiyatini tushunish',
      'Organ va organlar sistemasi tushunchasini farqlay olish'
    ],
    sections: [
      {
        subtitle: '1. Odam hujayrasining o\'ziga xosligi',
        content: 'Odam organizmi ko\'p hujayrali bo\'lib, 200 dan ortiq ixtisoslashgan hujayra turlaridan tashkil topgan. Har bir hujayra tashqi tomondan yarim o\'tkazuvchan plazmatik membrana bilan o\'ralgan. Ichida esa sitoplazma, yadro va turli organoidlar (mitoxondriya, ribosoma, Golji majmuasi, lizosoma) joylashgan.',
        bulletPoints: [
          'Membrana - himoya, moddalar almashinuvi va retseptorlik vazifasini bajaradi.',
          'Sitoplazma - hujayraning ichki muhiti bo\'lib, barcha organoidlarni bog\'lab turadi.',
          'Yadro - irsiy axborot (DNK)ni saqlaydi va hujayra hayotini boshqaradi.'
        ],
        callout: {
          type: 'important',
          title: '⭐ Muhim',
          text: 'Inson hujayralarida xloroplastlar va qattiq tsellyuloza devori bo\'lmaydi. Ular fagotsitoz va pinotsitoz xususiyatiga ega.'
        }
      },
      {
        subtitle: '2. To\'rtta asosiy to\'qima turi',
        content: 'Tuzilishi, kelib chiqishi va bajaradigan vazifasi o\'xshash bo\'lgan hujayralar va hujayralararo modda yig\'indisi to\'qima deyiladi.',
        bulletPoints: [
          'Epiteliy to\'qimasi: Terining ustki qavati, shilliq pardalar va bezlarni hosil qiladi. Himoya, so\'rish va ajratish funksiyasini bajaradi.',
          'Biriktiruvchi to\'qima: Suyak, tog\'ay, pay, yog\' to\'qimasi va qon. Hujayralararo moddasi ko\'p bo\'ladi.',
          'Muskul to\'qimasi: Ko\'ndalang-targ\'il (skelet va yurak) hamda silliq (ichki a\'zolar) muskul turlari mavjud. Qisqarish xususiyatiga ega.',
          'Asab to\'qimasi: Neyronlar va neyrogliya hujayralaridan iborat. Qo\'zg\'alish va impulslarni o\'tkazish vazifasini bajaradi.'
        ],
        callout: {
          type: 'didYouKnow',
          title: '🧠 Bilasizmi?',
          text: 'Qon - suyuq biriktiruvchi to\'qima hisoblanadi! Uning 55-60% qismi plazma (suyuq hujayralararo modda), 40-45% qismi esa shaklli elementlar (eritrotsit, leykotsit, trombotsit)dan iborat.'
        }
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
        id: 'q8-1-1',
        type: 'multiple-choice',
        question: 'Qaysi to\'qima turi organizmda suyuk hujayralararo moddaga ega bo\'lib, oziqlantirish va himoya vazifasini bajaradi?',
        options: ['Epiteliy to\'qimasi', 'Biriktiruvchi to\'qima (Qon)', 'Muskul to\'qimasi', 'Asab to\'qimasi'],
        correctAnswer: 1,
        explanation: 'Qon suyuq biriktiruvchi to\'qima bo\'lib, uning hujayralararo moddasi plazma hisoblanadi.'
      },
      {
        id: 'q8-1-2',
        type: 'true-false',
        question: 'Inson hujayralarida xloroplastlar va tsellyulozali qalin qobiq mavjud.',
        correctAnswer: false,
        explanation: 'Noto\'g\'ri! Xloroplastlar va tsellyulozali qattiq hujayra devori o\'simlik hujayralariga xosdir. Hayvon hujayralarida ular bo\'lmaydi.'
      },
      {
        id: 'q8-1-3',
        type: 'matching',
        question: 'Organoidlarni ularning asosiy funksiyasi bilan juftlashtiring:',
        pairs: [
          { left: 'Yadro', right: 'Irsiy axborotni saqlash' },
          { left: 'Mitoxondriya', right: 'ATF (energiya) sintezi' },
          { left: 'Golji majmuasi', right: 'Moddalarni qadoqlash va lizosoma hosil qilish' }
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Yadro - genetik axborot, mitoxondriya - energiya, Golji majmuasi - sekretsiya va qadoqlash.'
      }
    ]
  },
  {
    id: 'topic-8-2',
    grade: 8,
    chapterNumber: 3,
    chapterTitle: '3-Bob. Qon aylanish sistemasi',
    orderNumber: 2,
    title: 'Yurak tuzilishi va qon aylanish doiralari',
    icon: '🫀',
    estimatedMinutes: 25,
    summary: 'Odam yuragi to\'rt kamerali ajoyib nasos. U katta va kichik qon aylanish doirasi orqali kislorod va ozuqa moddalarni butun a\'zolarga yetkazib beradi.',
    learningGoals: [
      'Yurakning 4 kamerasi (bo\'lmachalar va qorinchalar) tuzilishini o\'rganish',
      'Katta va kichik qon aylanish doiralarining boshlanish va tugash nuqtalarini bilish',
      'Yurak klapanlari (tavaqali va yarimoysimon) mexanizmini tushunish'
    ],
    sections: [
      {
        subtitle: '1. Yurak anatomiyasi',
        content: 'Yurak ko\'krak qafasining chap tomonida joylashgan, muskul devorli a\'zo. U bo\'ylama to\'siq orqali to\'liq ikkiga: o\'ng (venoz qon) va chap (arterial qon) qismlarga bo\'linadi. Har bir qism o\'z navbatida bo\'lmacha va qorinchaga bo\'linadi.',
        bulletPoints: [
          'O\'ng bo\'lmacha va o\'ng qorincha: tanadan kelgan karbonat angidridga boy venoz qonni qabul qiladi.',
          'Chap bo\'lmacha va chap qorincha: o\'pkadan kelgan kislorodga boy arterial qonni qabul qiladi va aortaga haydaydi.',
          'Chap qorincha devori o\'ng qorinchaga nisbatan 2-3 barobar qalinroq, chunki u qonni butun vujud bo\'ylab (katta doiraga) katta bosim bilan haydashi kerak.'
        ],
        callout: {
          type: 'remember',
          title: '⚠️ Eslab qoling',
          text: 'Bo\'lmachalar va qorinchalar o\'rtasida tavaqali klapanlar, qorinchalar bilan qon tomirlari (aorta va o\'pka arteriyasi) o\'rtasida esa yarimoysimon klapanlar bo\'ladi. Ular qonning faqat bir yo\'nalishda oqishini ta\'minlaydi.'
        }
      },
      {
        subtitle: '2. Qon aylanish doiralari',
        content: 'Odamda qon aylanishi ikki doiradan iborat: Katta va Kichik doira.',
        bulletPoints: [
          'Katta qon aylanish doirasi: Chap qorinchadan Aorta bilan boshlanadi -> butun tana a\'zolariga kislorod beradi -> Yuqori va pastki kovak venalar orqali O\'ng bo\'lmachada tugaydi.',
          'Kichik (o\'pka) qon aylanish doirasi: O\'ng qorinchadan O\'pka arteriyasi bilan boshlanadi -> O\'pkada qon kislorodga to\'yinadi -> 4 ta O\'pka venasi orqali Chap bo\'lmachaga quyiladi.'
        ],
        callout: {
          type: 'fact',
          title: '💡 Qiziqarli fakt',
          text: 'Kichik doiraning o\'pka arteriyasida VENOZ qon, o\'pka venasida esa toza ARTERIAL qon oqadi! Bu inson tanasidagi kamdan-kam istisnolardan biridir.'
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
        id: 'q8-2-1',
        type: 'multiple-choice',
        question: 'Katta qon aylanish doirasi qayerdan boshlanadi va qayerda tugaydi?',
        options: [
          'Chap qorinchadan boshlanib, o\'ng bo\'lmachada tugaydi',
          'O\'ng qorinchadan boshlanib, chap bo\'lmachada tugaydi',
          'Chap bo\'lmachadan boshlanib, o\'ng qorinchada tugaydi',
          'O\'ng bo\'lmachadan boshlanib, o\'pkada tugaydi'
        ],
        correctAnswer: 0,
        explanation: 'To\'g\'ri! Katta doira chap qorinchadan aortaga chiqadi va tana bo\'ylab aylanib, o\'ng bo\'lmachaga quyiladi.'
      },
      {
        id: 'q8-2-2',
        type: 'true-false',
        question: 'O\'pka arteriyasida kislorodga boy toza arterial qon oqadi.',
        correctAnswer: false,
        explanation: 'Noto\'g\'ri! O\'pka arteriyasida venoz qon oqadi, chunki u o\'ng qorinchadan karbonat angidridli qonni gaz almashinuvi uchun o\'pkaga olib boradi.'
      },
      {
        id: 'q8-2-3',
        type: 'fill-blank',
        question: 'Yurakning chap qorinchasi va chap bo\'lmachasi o\'rtasida joylashgan klapan ... deb ataladi.',
        options: ['Ikki tavaqali (mitral)', 'Uch tavaqali', 'Yarimoysimon', 'Aortal'],
        correctAnswer: 'Ikki tavaqali (mitral)',
        explanation: 'Chap tomonda ikki tavaqali (mitral), o\'ng tomonda esa uch tavaqali klapan joylashgan.'
      }
    ]
  },

  // ================= 9-SINF =================
  {
    id: 'topic-9-1',
    grade: 9,
    chapterNumber: 2,
    chapterTitle: '2-Bob. Hujayra tuzilishi va organoidlari',
    orderNumber: 1,
    title: 'Eukariot hujayra organoidlari va ularning vazifalari',
    icon: '🔬',
    estimatedMinutes: 25,
    summary: 'Sitologiya - hujayrani o\'rganuvchi fan. Hujayra barcha tirik mavjudotlarning tuzilish, funksional va genetik birligidir.',
    learningGoals: [
      'Membranali (bir va ikki qavatli) va membranasiz organoidlarni toifalash',
      'Mitoxondriya, plastidalar va ribosomaning tuzilish sirlarini o\'rganish',
      'O\'simlik va hayvon hujayralari o\'rtasidagi 4 asosiy farqni bilish'
    ],
    sections: [
      {
        subtitle: '1. Organoidlar tasnifi',
        content: 'Hujayra ichidagi maxsus vazifani bajaruvchi doimiy tuzilmalar organoidlar deyiladi. Ular membrana tuzilishiga ko\'ra 3 guruhga bo\'linadi:',
        bulletPoints: [
          'Ikki qavat membranali: Mitoxondriya va Plastidalar (Xloroplast, Xromoplast, Leykoplast). Ularning o\'z DNKsi va ribosomasi mavjud.',
          'Bir qavat membranali: Endoplazmatik to\'r (EPT), Golji majmuasi, Lizosoma, Vakuola, Peroksisoma.',
          'Membranasiz organoidlar: Ribosomalar (oqsil sintezlovchi mashinalar) va Hujayra markazi (sentriollar).'
        ],
        callout: {
          type: 'important',
          title: '⭐ Muhim',
          text: 'Ribosoma ribosomal RNK (rRNK) va oqsillardan tashkil topgan bo\'lib, u membranaga ega emas. U prokariotlarda (70S) ham, eukariotlarda (80S) ham mavjud.'
        }
      },
      {
        subtitle: '2. O\'simlik va hayvon hujayrasi solishtirmasi',
        content: 'O\'simlik hujayrasi hayvon hujayrasidan quyidagi jihatlari bilan tubdan farq qiladi:',
        bulletPoints: [
          'Tsellyulozali qattiq hujayra devoriga ega.',
          'Plastidalar (ayniqsa fotosintez qiluvchi yashil xloroplastlar) mavjud.',
          'Hujayra shirasiga to\'la yirik markaziy vakuola bor.',
          'Zaxira ozuqa moddasi kraxmal (hayvonlarda esa glikogen).'
        ],
        callout: {
          type: 'fact',
          title: '💡 Qiziqarli fakt',
          text: 'Lizosoma ichida 40 dan ortiq parchalovchi gidrolitik fermentlar bo\'ladi. Agar uning membranasi yorilsa, hujayra o\'z-o\'zini hazm qilib yuboradi (bu jarayon avtoliz deyiladi).'
        }
      }
    ],
    diagram: {
      id: 'diag-plant-9',
      type: 'plant_cell',
      title: 'O\'simlik hujayrasi diagrammasi',
      subtitle: 'Qismlarni tanlab xususiyatlarini bilib oling',
      hotspots: [
        { id: 'p1', label: 'Xloroplast', x: 25, y: 35, title: 'Xloroplast', description: 'Fotosintez jarayoni kechuvchi yashil plastida. Tilakoid va stroma qismlaridan iborat.', fact: 'Quyosh energiyasini glyukozaning kimyoviy bog\'lariga aylantiradi.' },
        { id: 'p2', label: 'Vakuola', x: 60, y: 55, title: 'Markaziy vakuola', description: 'Hujayra shirasi bilan to\'lgan yirik rezervuar. Turgor bosimini ta\'minlaydi.', fact: 'Qari o\'simlik hujayralarida vakuola hujayra hajmining 90% qismini egallashi mumkin.' },
        { id: 'p3', label: 'Hujayra devori', x: 12, y: 18, title: 'Tsellyuloza devor', description: 'Hujayraga qat\'iy shakl va tayanch beruvchi mustahkam tashqi qobiq.', fact: 'Tsellyuloza tolalari po\'lat simdek mustahkamlik beradi.' },
        { id: 'p4', label: 'Yadro', x: 45, y: 30, title: 'Yadro', description: 'O\'simlik genetik axborotining markaziy ombori.', fact: 'Xromatin iplari bo\'linish vaqtida xromosomalarga aylanadi.' }
      ]
    },
    quickQuestions: [
      {
        id: 'q9-1-1',
        type: 'multiple-choice',
        question: 'Quyidagi organoidlardan qaysi biri ikki qavat membranali va o\'z xususiy DNKsiga ega?',
        options: ['Ribosoma', 'Golji majmuasi', 'Mitoxondriya', 'Lizosoma'],
        correctAnswer: 2,
        explanation: 'Mitoxondriya va xloroplastlar ikki qavat membranali bo\'lib, o\'z mustaqil halqasimon DNK va ribosomasiga ega.'
      },
      {
        id: 'q9-1-2',
        type: 'true-false',
        question: 'Ribosoma barcha tirik hujayralarda (ham prokariot, ham eukariot) uchraydigan membranasiz organoiddir.',
        correctAnswer: true,
        explanation: 'To\'g\'ri! Ribosomalar membranaga ega emas va barcha hujayralarda oqsillarni biosintez qiladi.'
      },
      {
        id: 'q9-1-3',
        type: 'fill-blank',
        question: 'Hayvon hujayralarida asosiy zaxira uglevod glikogen bo\'lsa, o\'simliklarda ... hisoblanadi.',
        options: ['Kraxmal', 'Saxaroza', 'Xitin', 'Glyukoza'],
        correctAnswer: 'Kraxmal',
        explanation: 'O\'simliklar ozuqa zahirasini leykoplastlarda kraxmal donachalari shaklida to\'playdi.'
      }
    ]
  },
  {
    id: 'topic-9-2',
    grade: 9,
    chapterNumber: 3,
    chapterTitle: '3-Bob. Moddalar va energiya almashinuvi',
    orderNumber: 2,
    title: 'Fotosintez va Hujayraviy nafas olish',
    icon: '🌱',
    estimatedMinutes: 20,
    summary: 'Assimilyatsiya va dissimilyatsiya hayotning asosiy poydevoridir. Fotosintez quyosh energiyasini organik moddaga, nafas olish esa uni ATF energiyasiga aylantiradi.',
    learningGoals: [
      'Fotosintezning yorug\'lik va qorong\'ilik bosqichlari reaksiyalarini tushunish',
      'Fotoliz (suvning parchalanishi) natijasida kislorod ajralishini bilish',
      'Glyukoliz va ATF sintezining biologik ahamiyatini anglash'
    ],
    sections: [
      {
        subtitle: '1. Fotosintez bosqichlari',
        content: 'Fotosintez - quyosh nuri energiyasi ishtirokida anorganik moddalar (CO2 va H2O)dan organik modda (C6H12O6) va kislorod sintezlanish jarayoni.',
        bulletPoints: [
          'Yorug\'lik bosqichi: Xloroplast tilakoidlarida faqat yorug\'likda sodir bo\'ladi. Xlorofill elektronlari qo\'zg\'aladi, suv fotolizga uchraydi (H2O -> H+ + e- + O2↑). Natijada erkin kislorod ajraladi, ATF va NADF·H hosil bo\'ladi.',
          'Qorong\'ilik bosqichi (Kalvin sikli): Xloroplast stromasida kechadi. Yorug\'lik shart emas. CO2 birikib, ATF va NADF·H energiyasi hisobiga glyukoza sintezlanadi.'
        ],
        callout: {
          type: 'remember',
          title: '⚠️ Eslab qoling',
          text: 'Fotosintez natijasida ajralib chiqadigan kislorod CO2 dan emas, balki SUV (H2O) molekulasining parchalanishidan hosil bo\'ladi!'
        }
      }
    ],
    quickQuestions: [
      {
        id: 'q9-2-1',
        type: 'multiple-choice',
        question: 'Fotosintezda atmosferaga chiqadigan erkin kislorod qaysi moddaning fotolizidan kelib chiqadi?',
        options: ['Karbonat angidrid (CO2)', 'Suv (H2O)', 'Glyukoza (C6H12O6)', 'ATF'],
        correctAnswer: 1,
        explanation: 'Yorug\'lik bosqichida suv molekulasi fotolizga uchrab, erkin kislorod (O2) ajralib chiqadi.'
      }
    ]
  },

  // ================= 10-SINF =================
  {
    id: 'topic-10-1',
    grade: 10,
    chapterNumber: 1,
    chapterTitle: '1-Bob. Irsiyat qonuniyatlari va Mendel ta\'limoti',
    orderNumber: 1,
    title: 'G. Mendel qonunlari: Monogibrid va Digibrid chatishtirish',
    icon: '🧬',
    estimatedMinutes: 25,
    summary: 'Genetika - irsiyat va o\'zgaruvchanlik haqidagi fan. Gregor Mendel no\'xat o\'simligida o\'tkazgan tajribalari orqali zamonaviy genetika poydevorini yaratdi.',
    learningGoals: [
      'Dominant va retsessiv belgilar, genotip va fenotip tushunchalarini o\'zlashtirish',
      'Mendelning 1- (Bir xillik), 2- (Ajralish) va 3- (Mustaqil taqsimlanish) qonunlarini bilish',
      'Pennet katagi yordamida genetik masalalarni yechishni o\'rganish'
    ],
    sections: [
      {
        subtitle: '1. Asosiy genetik tushunchalar',
        content: 'Irsiyat - ota-ona belgilarining nasldan-naslga o\'tish xususiyati.',
        bulletPoints: [
          'Gen - DNK molekulasining bitta polipeptid (oqsil) zanjiri haqida ma\'lumot saqlovchi qismi.',
          'Allel genlar - gomologik xromosomalarning bir xil lokuslarida joylashgan, bir belgining qarama-qarshi ko\'rinishlarini belgilovchi genlar (masalan, A va a).',
          'Genotip - organizmdagi barcha genlar yig\'indisi (AA, Aa, aa).',
          'Fenotip - genotipning tashqi muhit bilan o\'zaro ta\'sirida namoyon bo\'ladigan tashqi va ichki belgilar majmui.'
        ],
        callout: {
          type: 'important',
          title: '⭐ Muhim',
          text: 'Mendelning 1-qonuni (Bir xillik qonuni): Gomozigota dominant (AA) va gomozigota retsessiv (aa) formalarni chatishtirganda birinchi bo\'g\'in (F1) duragaylari fenotip va genotip jihatidan 100% bir xil (Aa) bo\'ladi.'
        }
      },
      {
        subtitle: '2. Ajralish va Mustaqil taqsimlanish',
        content: 'F1 duragaylari (Aa x Aa) o\'zaro chatishtirilganda F2 bo\'g\'inida belgilarning ajralishi sodir bo\'ladi.',
        bulletPoints: [
          'Fenotip bo\'yicha ajralish: 3 : 1 (75% sariq, 25% yashil no\'xatlar).',
          'Genotip bo\'yicha ajralish: 1 AA : 2 Aa : 1 aa (1 : 2 : 1).',
          'Mendelning 3-qonuni (Digibrid chatishtirish - AaBb x AaBb): F2 da fenotip bo\'yicha nisbat 9 : 3 : 3 : 1 bo\'ladi.'
        ],
        callout: {
          type: 'fact',
          title: '💡 Qiziqarli fakt',
          text: 'Gregor Mendel o\'z tajribalarida 28 000 dan ortiq no\'xat o\'simligini ekib, ularning 7 juft alternativ belgilarini 8 yil davomida sinchiklab hisoblab chiqqan!'
        }
      }
    ],
    diagram: {
      id: 'diag-dna-10',
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
        id: 'q10-1-1',
        type: 'multiple-choice',
        question: 'Geterozigota sariq no\'xat (Aa) o\'zaro chatishtirilganda (Aa x Aa), ikkinchi bo\'g\'inda (F2) fenotip bo\'yicha qanday nisbatda ajralish kuzatiladi?',
        options: ['1 : 1', '3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'],
        correctAnswer: 1,
        explanation: 'F2 bo\'g\'inida fenotip bo\'yicha 3 ta dominant (1 AA + 2 Aa) va 1 ta retsessiv (1 aa), ya\'ni 3 : 1 nisbat hosil bo\'ladi.'
      },
      {
        id: 'q10-1-2',
        type: 'true-false',
        question: 'DNK molekulasida Guanin va Sitotsin o\'rtasida 2 ta vodorod bog\'i hosil bo\'ladi.',
        correctAnswer: false,
        explanation: 'Noto\'g\'ri! Adenin va Timin o\'rtasida 2 ta, Guanin va Sitotsin o\'rtasida esa 3 ta vodorod bog\'i hosil bo\'ladi.'
      }
    ]
  },
  {
    id: 'topic-10-2',
    grade: 10,
    chapterNumber: 3,
    chapterTitle: '3-Bob. O\'zgaruvchanlik qonuniyatlari',
    orderNumber: 2,
    title: 'Modifikatsion va Mutatsion o\'zgaruvchanlik',
    icon: '⚡',
    estimatedMinutes: 20,
    summary: 'Organizmlarning tashqi muhit ta\'sirida yoki genlaridagi o\'zgarishlar oqibatida yangi belgilarga ega bo\'lishi o\'zgaruvchanlik deyiladi.',
    learningGoals: [
      'Irsiy (genotipik) va noirsiy (modifikatsion) o\'zgaruvchanlikni farqlash',
      'Reaksiya normasi chegaralarini tushunish',
      'Gen, xromosoma va genom mutatsiyalarining sabab va oqibatlarini o\'rganish'
    ],
    sections: [
      {
        subtitle: '1. O\'zgaruvchanlik turlari',
        content: 'Tirik tabiatda o\'zgaruvchanlik ikki xil bo\'ladi:',
        bulletPoints: [
          'Modifikatsion (fenotipik, noirsiy): Genotip o\'zgarmaydi. Tashqi muhit omillari ta\'sirida vujudga keladi va nasldan-naslga o\'tmaydi. Masalan, quyoshda qorayish, tog\'da o\'sadigan o\'simlikning pakanaligi.',
          'Mutatsion (genotipik, irsiy): Genetik apparatning o\'zgarishi natijasida yuzaga keladi va kelgusi avlodga o\'tadi.'
        ],
        callout: {
          type: 'remember',
          title: '⚠️ Eslab qoling',
          text: 'Modifikatsion o\'zgaruvchanlik cheksiz emas, u reaksiya normasi (genotip tomonidan belgilangan chegaralar) doirasida ro\'y beradi.'
        }
      }
    ],
    quickQuestions: [
      {
        id: 'q10-2-1',
        type: 'multiple-choice',
        question: 'Quyidagilardan qaysi biri modifikatsion o\'zgaruvchanlikka misol bo\'ladi?',
        options: [
          'Quyosh nuri ostida terining qorayishi',
          'Daun sindromi (21-juft xromosomada trisomiya)',
          'Albinizm (rang pigmentining irsiy yo\'qligi)',
          'Polidaktiliya (ortiqcha barmoqlilik)'
        ],
        correctAnswer: 0,
        explanation: 'Quyoshda qorayish noirsiy bo\'lib, tashqi muhitga moslashuv reaktsiyasidir va naslga o\'tmaydi.'
      }
    ]
  },

  // ================= 11-SINF =================
  {
    id: 'topic-11-1',
    grade: 11,
    chapterNumber: 1,
    chapterTitle: '1-Bob. Evolutsion ta\'limot',
    orderNumber: 1,
    title: 'Ch. Darvin ta\'limoti va Tabiiy tanlanish',
    icon: '🐾',
    estimatedMinutes: 25,
    summary: 'Evolutsiya - tirik tabiatning tarixiy rivojlanish jarayoni. Charlz Darvin tabiiy tanlanishni evolutsiyaning asosiy harakatlantiruvchi kuchi deb isbotladi.',
    learningGoals: [
      'Darvin ta\'limotining 3 ta asosiy omilini (irsiyat, o\'zgaruvchanlik, yashash uchun kurash) tushunish',
      'Tabiiy tanlanish va sun\'iy tanlanish o\'rtasidagi farqlarni bilish',
      'Yashash uchun kurash shakllarini (tur ichidagi, turlararo, noqulay sharoitga qarshi) tahlil qilish'
    ],
    sections: [
      {
        subtitle: '1. Evolutsiyaning harakatlantiruvchi kuchlari',
        content: 'Ch. Darvin 1859-yilda "Turlarning kelib chiqishi" nomli mashhur asarida evolutsiya mexanizmini to\'liq ochib berdi.',
        bulletPoints: [
          'Nasliy o\'zgaruvchanlik: Har bir turning individlari o\'rtasida irsiy farqlar mavjud bo\'ladi.',
          'Yashash uchun kurash: Organizmlar yashash joyi, ozuqa, yorug\'lik va nasl qoldirish uchun doimo kurashadi.',
          'Tabiiy tanlanish: Yashash muhitiga eng yaxshi moslashgan organizmlar tirik qoladi va nasl beradi, noqobillari esa nobud bo\'ladi.'
        ],
        callout: {
          type: 'important',
          title: '⭐ Muhim',
          text: 'Yashash uchun kurashning eng shafqatsiz va keskin turi - bu TUR ICHIDAGI kurashdir, chunki bir tur vakillarining yashash sharoiti va ozuqaga bo\'lgan ehtiyoji bir xil.'
        }
      }
    ],
    quickQuestions: [
      {
        id: 'q11-1-1',
        type: 'multiple-choice',
        question: 'Darvin ta\'limotiga ko\'ra, evolutsiyaning asosiy yo\'naltiruvchi va harakatlantiruvchi omili nima?',
        options: ['Tabiiy tanlanish', 'Ixtiyorsiz o\'zgarish', 'Faqat sun\'iy duragaylash', 'Mutatsiyalarning to\'xtashi'],
        correctAnswer: 0,
        explanation: 'Tabiiy tanlanish organizmlarning yashash sharoitiga moslashishini ta\'minlovchi asosiy omildir.'
      }
    ]
  },
  {
    id: 'topic-11-2',
    grade: 11,
    chapterNumber: 4,
    chapterTitle: '4-Bob. Biogeotsenoz va Biosfera',
    orderNumber: 2,
    title: 'Ekologik omillar, oziq zanjirlari va Biosfera ta\'limoti',
    icon: '🌳',
    estimatedMinutes: 20,
    summary: 'Ekologiya tirik organizmlarning o\'zaro va tashqi muhit bilan munosabatini o\'rganadi. Biosfera esa V.I. Vernadskiy ta\'limotiga binoan sayyoramizning hayot qobig\'idir.',
    learningGoals: [
      'Abiotik, biotik va antropogen omillarni tasniflash',
      'Oziq zanjiri bo\'g\'inlari (produtsentlar, konsumentlar, redutsentlar)ni bilish',
      '10%lik ekologik piramida qoidasini masalalarda qo\'llash'
    ],
    sections: [
      {
        subtitle: '1. Ekologik omillar va oziq zanjirlari',
        content: 'Har qanday ekotizimda moddalar va energiya oziq zanjiri bo\'ylab harakatlanadi.',
        bulletPoints: [
          'Produtsentlar (hosil qiluvchilar): Quyosh energiyasidan organik modda sintezlovchi avtotroflar (yashil o\'simliklar, sianobakteriyalar).',
          'Konsumentlar (iste\'molchilar): Boshqa organizmlar hisobiga yashovchi geterotroflar (o\'txo\'r va yirtqich hayvonlar).',
          'Redutsentlar (parchalovchilar): Organik qoldiqlarni anorganik moddalargacha parchalovchi bakteriya va zamburug\'lar.'
        ],
        callout: {
          type: 'fact',
          title: '💡 Qiziqarli fakt (10% qoidasi)',
          text: 'R. Lindeman qoidasiga ko\'ra, oziq zanjirining bir bo\'g\'inidan keyingi bo\'g\'iniga energiyaning atigi 10% qismi o\'tadi, qolgan 90% qismi esa issiqlik sifatida tarqaladi.'
        }
      }
    ],
    quickQuestions: [
      {
        id: 'q11-2-1',
        type: 'multiple-choice',
        question: 'Oziq zanjirida organik moddalarni noorganik minerallargacha parchalab beruvchi organizmlar qanday ataladi?',
        options: ['Redutsentlar', 'Produtsentlar', 'Konsumentlar', 'Parazitlar'],
        correctAnswer: 0,
        explanation: 'Redutsentlar (asosan bakteriya va zamburug\'lar) o\'lik organik qoldiqlarni minerallarga aylantirib, moddalar aylanishini yakunlaydi.'
      }
    ]
  }
];

export const INITIAL_TESTS: {
  id: string;
  grade: 8 | 9 | 10 | 11;
  title: string;
  category: 'topic' | 'chapter' | 'grade' | 'exam';
  questionCount: number;
  timeLimitMinutes: number;
}[] = [
  { id: 'test-8-cell', grade: 8, title: '8-sinf: To\'qimalar va Hujayra tekshiruvi', category: 'topic', questionCount: 10, timeLimitMinutes: 10 },
  { id: 'test-8-heart', grade: 8, title: '8-sinf: Qon aylanish va Yurak fiziologiyasi', category: 'chapter', questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-8-final', grade: 8, title: '8-sinf: Yillik Yakuniy Imtihon', category: 'exam', questionCount: 20, timeLimitMinutes: 20 },
  
  { id: 'test-9-organelles', grade: 9, title: '9-sinf: Hujayra organoidlari va Sitologiya', category: 'topic', questionCount: 10, timeLimitMinutes: 10 },
  { id: 'test-9-metabolism', grade: 9, title: '9-sinf: Fotosintez va Hujayra energetikasi', category: 'chapter', questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-9-final', grade: 9, title: '9-sinf: Umumiy Biologiya Yakuniy Imtihoni', category: 'exam', questionCount: 20, timeLimitMinutes: 20 },

  { id: 'test-10-mendel', grade: 10, title: '10-sinf: Mendel qonunlari va Genetika masalalari', category: 'topic', questionCount: 10, timeLimitMinutes: 12 },
  { id: 'test-10-dna', grade: 10, title: '10-sinf: Molekulyar genetika va Mutatsiyalar', category: 'chapter', questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-10-final', grade: 10, title: '10-sinf: Genetika bo\'yicha Katta Imtihon', category: 'exam', questionCount: 20, timeLimitMinutes: 20 },

  { id: 'test-11-darwin', grade: 11, title: '11-sinf: Darvin ta\'limoti va Tabiiy tanlanish', category: 'topic', questionCount: 10, timeLimitMinutes: 10 },
  { id: 'test-11-ecology', grade: 11, title: '11-sinf: Ekologik omillar va Biosfera qonunlari', category: 'chapter', questionCount: 15, timeLimitMinutes: 15 },
  { id: 'test-11-final', grade: 11, title: '11-sinf: Bitiruvchi Yakuniy Davlat Attestatsiyasi', category: 'exam', questionCount: 25, timeLimitMinutes: 25 },
];

export const GENERAL_TEST_QUESTIONS: { [grade: number]: { question: string; options: string[]; correctIndex: number; explanation: string }[] } = {
  8: [
    { question: 'Inson skeletida jami nechta suyak mavjud?', options: ['150 ga yaqin', '206 dan ortiq', '320 ta', '100 ta'], correctIndex: 1, explanation: 'Voyaga yetgan odam skeletida 206 dan ortiq suyaklar birlashgan.' },
    { question: 'Qaysi shaklli elementlar qon ivishida ishtirok etadi?', options: ['Eritrotsitlar', 'Leykotsitlar', 'Trombotsitlar', 'Plazma oqsillari'], correctIndex: 2, explanation: 'Trombotsitlar (qon plastinkalari) qon tomir jarohatlanganda qon ivishini ta\'minlaydi.' },
    { question: 'Bosh miyaning qaysi bo\'limi harakatlarni muvofiqlashtiradi va muvozanatni saqlaydi?', options: ['Uzunchoq miya', 'Miyacha', 'Ko\'prik', 'Gipotalamus'], correctIndex: 1, explanation: 'Miyacha harakatlar koordinatsiyasi va gavda muvozanatini boshqaradi.' },
    { question: 'Oshqozon shirasining asosiy kislotasi qaysi?', options: ['Sulfat kislota', 'Xlorid kislota (HCl)', 'Sirka kislota', 'Fosfat kislota'], correctIndex: 1, explanation: 'Oshqozon bezlari xlorid kislotasi (HCl) ajratib, oqsillarni parchalovchi pepsinni faollashtiradi va bakteriyalarni nobud qiladi.' },
    { question: 'Katta qon aylanish doirasi qaysi tomir bilan boshlanadi?', options: ['O\'pka arteriyasi', 'Aorta', 'Kovak vena', 'Jigar venasi'], correctIndex: 1, explanation: 'Chap qorinchadan eng katta tomir - aorta boshlanadi.' }
  ],
  9: [
    { question: 'Hujayrada oqsil biosintezi qaysi organoidda amalga oshiriladi?', options: ['Lizosoma', 'Ribosoma', 'Vakuola', 'Mitoxondriya'], correctIndex: 1, explanation: 'Ribosomalar aminokislotalardan oqsillarni sintezlovchi molekulyar mashinadir.' },
    { question: 'Fotosintezning yorug\'lik bosqichida suvning parchalanishi nima deyiladi?', options: ['Gidroliz', 'Fotoliz', 'Elektroliz', 'Pirolyz'], correctIndex: 1, explanation: 'Yorug\'lik nuri ta\'sirida suvning parchalanishi fotoliz deb ataladi.' },
    { question: 'Prokariot hujayralarning eukariotlardan asosiy farqi nimada?', options: ['Membranasining yo\'qligi', 'Shakllangan yadroga ega emasligi', 'Ribosomasining bo\'lmasligi', 'Hujayra bo\'linmasligi'], correctIndex: 1, explanation: 'Bakteriyalar (prokariotlar) da membrana bilan o\'ralgan yadro bo\'lmaydi, genetik xomashyo halqasimon nukleoid shaklida joylashadi.' },
    { question: 'Mitoz bo\'linish natijasida bitta ona hujayradan nechta hujayra hosil bo\'ladi?', options: ['2 ta diploid (2n)', '4 ta gaploid (n)', '1 ta yangi hujayra', '8 ta hujayra'], correctIndex: 0, explanation: 'Mitoz natijasida genetik jihatdan ona hujayraga aynan o\'xshash 2 ta diploid hujayra vujudga keladi.' },
    { question: 'ATF molekulasida nechta makroergik (yuqori energiyali) bog\' mavjud?', options: ['1 ta', '2 ta', '3 ta', '4 ta'], correctIndex: 1, explanation: 'ATF ning 3 ta fosfat qoldig\'i o\'rtasida 2 ta kuchli makroergik bog\' mavjud bo\'lib, har biri uzilganda 40 kJ/mol energiya ajraladi.' }
  ],
  10: [
    { question: 'Gomozigota retsessiv organizm genotipi qanday yoziladi?', options: ['AA', 'Aa', 'aa', 'AB'], correctIndex: 2, explanation: 'Kichik harflar bilan bir xil allellar juftligi (aa) gomozigota retsessiv hisoblanadi.' },
    { question: 'DNK da Timin nukleotidiga qaysi nukleotid komplementar bo\'ladi?', options: ['Guanin', 'Sitotsin', 'Adenin', 'Uratsil'], correctIndex: 2, explanation: 'DNK da Adenin va Timin (A=T) o\'zaro komplementar bog\'lanadi.' },
    { question: 'Inson tana hujayralarida xromosomalar soni nechta?', options: ['23 ta', '46 ta (23 juft)', '48 ta', '92 ta'], correctIndex: 1, explanation: 'Odamda 22 juft autosoma va 1 juft jinsiy xromosoma, jami 46 ta xromosoma bor.' },
    { question: 'Nasldan-naslga o\'tmaydigan, faqat tashqi muhit ta\'sirida yuzaga keladigan o\'zgaruvchanlik qaysi?', options: ['Mutatsion', 'Kombinativ', 'Modifikatsion', 'Genom'], correctIndex: 2, explanation: 'Modifikatsion o\'zgaruvchanlik genotipga ta\'sir qilmaydi va kelgusi avlodga berilmaydi.' },
    { question: 'Qaysi olim xromosoma nazariyasini kashf etgan?', options: ['G. Mendel', 'T. Morgan', 'Ch. Darvin', 'J.B. Lamark'], correctIndex: 1, explanation: 'Tomas Hant Morgan drozofila pashshalarida o\'tkazgan tajribalari orqali xromosoma nazariyasini yaratdi.' }
  ],
  11: [
    { question: 'Evolutsiyaning boshlang\'ich elementar birligi nima?', options: ['Alohida individ', 'Populyatsiya', 'Tur', 'Biogeotsenoz'], correctIndex: 1, explanation: 'Zamonaviy sintetik evolutsiya ta\'limotiga ko\'ra, evolutsiyaning boshlang\'ich birligi populyatsiyadir.' },
    { question: 'Organizmlarning umumiy tuzilish darajasini keskin ko\'taruvchi evolutsion o\'zgarish nima deyiladi?', options: ['Idioadaptatsiya', 'Aromorfoz', 'Degeneratsiya', 'Konvergensiya'], correctIndex: 1, explanation: 'Aromorfoz (masalan, 4 kamerali yurak, sut bezlari, issiqqonlilik) tuzilish darajasini yuksaltiradi.' },
    { question: 'Oziq zanjirida quyosh nuri hisobiga organik modda hosil qiluvchilar nima deyiladi?', options: ['Konsumentlar', 'Produtsentlar', 'Redutsentlar', 'Simbiontlar'], correctIndex: 1, explanation: 'Yashil o\'simliklar va avtotroflar produtsent (ishlab chiqaruvchi) hisoblanadi.' },
    { question: 'Biosfera haqidagi mukammal ilmiy ta\'limotni kim yaratgan?', options: ['Ch. Darvin', 'V.I. Vernadskiy', 'E. Gekkel', 'A. Tensli'], correctIndex: 1, explanation: 'Rus va jahon olimi V.I. Vernadskiy biosfera va uning tirik moddasi haqidagi ta\'limotga asos solgan.' },
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
