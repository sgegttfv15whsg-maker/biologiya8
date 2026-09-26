import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error("Gemini initialization error:", err);
  }
}

// Built-in Biology Knowledge Base for fast, reliable, offline-capable pedagogical answers
const BIOLOGY_KNOWLEDGE_BANK: { [keyword: string]: string } = {
  mitoxondriya: `⚡ **Mitoxondriya — Hujayraning Elektr Stansiyasi**\n\nMitoxondriya ikki qavat membranali organoid bo'lib, uning ichki membranasi ko'plab burmalar — **kristalar** hosil qiladi.\n\n🔹 **Asosiy vazifasi:** Ozuqa moddalarini (glyukozani) kislorod ishtirokida parchalab, biologik energiya — **ATF (adenozintrifosfat)** sintezlaydi.\n🔹 **O'ziga xosligi:** O'zining xususiy halqasimon DNKsi va ribosomalariga ega, shuning uchun mustaqil bo'lina oladi.\n\n💡 *Bilasizmi?* Insonning eng ko'p energiya talab qiladigan a'zosi — jigar va yurak hujayralarida 1000 dan 2500 tagacha mitoxondriya bo'ladi!\n\n❓ *Sizga savol:* Bitta glyukoza molekulasi to'liq parchalanganda necha molekula ATF hosil bo'ladi?`,
  yurak: `🫀 **Inson Yuragi va Qon Aylanishi**\n\nYurak — ko'krak qafasida joylashgan to'rt kamerali baquvvat muskul a'zodir (2 ta bo'lmacha va 2 ta qorincha).\n\n🔹 **Katta qon aylanish doirasi:** Chap qorinchadan **Aorta** orqali boshlanadi -> butun tana a'zolariga kislorod va oziq yetkazadi -> venoz qon bo'lib kovak venalar orqali o'ng bo\'lmachaga quyiladi.\n🔹 **Kichik (o'pka) doirasi:** O'ng qorinchadan o'pka arteriyasi bilan boshlanadi -> o'pkada kislorodga to'yinadi -> o'pka venalari orqali chap bo'lmachaga qaytadi.\n\n⚠️ *Muhim eslatma:* O'pka arteriyasida venoz qon, o'pka venalarida esa toza arterial qon oqadi!\n\n❓ *Sizga savol:* Nima uchun chap qorincha devori o'ng qorinchadan 2-3 barobar qalinroq?`,
  dnk: `🧬 **DNK — Irsiyatning Molekulyar Poydevori**\n\nDNK (Dezoksiribonuklein kislota) ikki zanjirli qo'sh spiral shaklidagi biopolimerdir.\n\n🔹 **Nukleotid tarkibi:** Azot asosi + dezoksiriboza qandi + fosfat kislota qoldig'i.\n🔹 **Komplementarlik qoidasi:**\n  - **Adenin (A) = Timin (T)** (2 ta vodorod bog'i)\n  - **Guanin (G) ≡ Sitotsin (C)** (3 ta vodorod bog'i)\n\n💡 *Bilasizmi?* Bitta inson hujayrasidagi barcha DNK iplarini ulasak, uning uzunligi 2 metrga yetadi!\n\n❓ *Sizga topshiriq:* Agar DNKning bir zanjirida A-T-G-C-A bo'lsa, ikkinchi komplementar zanjir qanday bo'ladi?`,
  fotosintez: `🌱 **Fotosintez — Sayyoramizning Kislorod Fabrikasi**\n\nFotosintez — yashil o'simliklar va sianobakteriyalar tomonidan quyosh nuri energiyasi yordamida noorganik moddalar (CO2 va H2O)dan glyukoza va erkin kislorod sintezlanishi.\n\n🔹 **Yorug'lik bosqichi:** Xloroplast tilakoidlarida suv fotolizga uchraydi va erkin **O2** ajraladi, ATF sintezlanadi.\n🔹 **Qorong'ilik bosqichi (Kalvin sikli):** Xloroplast stromasida CO2 hisobiga glyukoza hosil bo'ladi.\n\n⭐ *Muhim:* Ajralib chiqadigan kislorod CO2 dan emas, balki SUV (H2O) fotolizidan hosil bo'ladi!\n\n❓ *Sizga savol:* O'simlik bargiga yashil rang beruvchi pigment qaysi?`,
  mitoz: `🔬 **Mitoz va Meyoz Bo'linish Farqlari**\n\n🔹 **Mitoz:** Tana (somatik) hujayralarining bo'linishi. Bitta ona hujayradan genetik jihatdan aynan bir xil bo'lgan **2 ta diploid (2n)** qiz hujayra hosil bo'ladi.\n  - Bosqichlari: Profaza -> Metafaza -> Anafaza -> Telofaza.\n\n🔹 **Meyoz:** Jinsiy hujayralarning (gametalar) shakllanishi. Xromosomalar soni ikki barobar qisqaradi va **4 ta gaploid (n)** qiz hujayra hosil bo'ladi. Birinchi bo'linishda krossingover sodir bo'ladi.\n\n❓ *Sizga savol:* Nima uchun meyoz bo'linish tufayli aka-uka yoki opa-singillar bir-biriga 100% o'xshash bo'lmaydi?`,
  mendel: `🎲 **Gregor Mendel Qonunlari (Genetika)**\n\n1865-yilda Gregor Mendel no'xat o'simligida o'tkazgan tajribalari orqali zamonaviy genetikaga asos soldi:\n\n🔹 **1-qonun (Bir xillik):** AA (dominant sariq) x aa (retsessiv yashil) -> F1 da duragaylarning barchasi 100% sariq va geterozigota (Aa) bo'ladi.\n🔹 **2-qonun (Ajralish):** Aa x Aa chatishtirilganda F2 da fenotip bo'yicha **3:1** (75% sariq, 25% yashil), genotip bo'yicha **1 AA : 2 Aa : 1 aa** nisbat chiqadi.\n🔹 **3-qonun (Mustaqil taqsimlanish):** Digibrid duragaylashda (AaBb x AaBb) F2 da **9:3:3:1** nisbat olinadi.\n\n❓ *Sizga masala:* Geterozigota qora quyon (Aa) oq quyon (aa) bilan chatishtirilsa, avlodning necha foizi oq bo'ladi?`,
  darvin: `🐾 **Charlz Darvin va Tabiiy Tanlanish**\n\n1859-yilda Ch. Darvin o'zining "Turlarning kelib chiqishi" kitobida evolutsiya ta'limotini isbotladi.\n\n🔹 **Evolutsiyaning 3 harakatlantiruvchi omili:**\n  1. Nasliy o'zgaruvchanlik (mutatsiyalar)\n  2. Yashash uchun kurash (tur ichidagi, turlararo, noqulay sharoitga qarshi)\n  3. Tabiiy tanlanish (muhitga eng moslashgan individlarning omon qolishi va nasl qoldirishi).\n\n⚠️ *Eng shiddatli kurash:* Bir tur vakillarining ehtiyojlari bir xil bo'lgani sababli, tur ichidagi kurash eng keskin kechadi.\n\n❓ *Sizga savol:* Tabiiy tanlanish va sun'iy tanlanish o'rtasidagi asosiy farq nima?`
};

function getLocalPedagogicalReply(message: string, grade?: string | number, topic?: string): string {
  const lower = (message + ' ' + (topic || '')).toLowerCase();

  for (const [key, text] of Object.entries(BIOLOGY_KNOWLEDGE_BANK)) {
    if (lower.includes(key)) {
      return text;
    }
  }

  // Context-aware generic answer
  const gradeStr = grade ? `${grade}-sinf` : "Biologiya";
  return `Salom! Men sizning ${gradeStr} biologiya fanidan AI ustozingiz - BioBotman! 🧬\n\nSavolingiz: "${message}"\n\n📘 **Tushuntirish:**\nBiologiya tirik tabiat qonuniyatlarini o'rganadi. Hozirgi mavzuyimiz (${topic || "Biologiya darsligi"}) bo'yicha siz quyidagi asosiy yo'nalishlarni o'rganishingiz mumkin:\n- Organoidlar va hujayra funktsiyasi\n- Fiziologik jarayonlar va energiya almashinuvi\n- Genetik qonuniyatlar va irsiylanish\n- Tabiatdagi o'zaro bog'liqlik va ekotizimlar\n\nSizga ushbu mavzu bo'yicha mini-test beraymi yoki istalgan tushunmagan atamangizni so'rang!`;
}

// AI Biology Teacher API - BioBot Chat
app.post('/api/biobot/chat', async (req, res) => {
  const { message, history, grade, topic } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: "Savol matni kiritilmadi" });
  }

  // Try Gemini API if key is present
  if (ai) {
    try {
      const systemInstruction = `Siz O'zbekiston maktablari (8-, 9-, 10-, 11-sinf) o'quvchilari uchun maxsus yaratilgan do'stona, bilimdon, qiziqarli "BIOBOT" - Biologiya o'qituvchisisiz.
Vazifalaringiz:
1. O'quvchiga biologiya mavzularini (hujayra, genetika, odam anatomiyasi, evolutsiya, ekologiya) sodda, ravon va ilmiy jihatdan 100% to'g'ri o'zbek tilida tushuntiring.
2. Quruq nazariya emas, hayotiy misollar va qiziqarli faktlar ("Bilasizmi?", "Misol uchun...") keltiring.
3. Uy vazifasini o'quvchining o'rniga shunchaki ishlab bermang; o'quvchini fikrlashga, xulosaga o'zi yetib kelishiga yo'naltiring.
4. Javobingiz oxirida o'quvchining tushunganini tekshirish uchun bitta qisqa, qiziqarli savol yoki chaqiruv bering.
5. Har bir tushuntirishda emoji va formatlash (qalin matn, ro'yxatlar)dan chiroyli foydalaning.
Hozirgi o'quvchi darajasi: ${grade || "8-11"}-sinf.
Faol mavzu: ${topic || "Umumiy biologiya"}.`;

      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item?.text) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      if (response?.text) {
        return res.json({ reply: response.text });
      }
    } catch (error: any) {
      console.warn("Gemini chat fallback invoked due to:", error?.message || error);
    }
  }

  // Graceful pedagogical fallback so user never encounters errors or infinite spinners
  const fallbackReply = getLocalPedagogicalReply(message, grade, topic);
  return res.json({ reply: fallbackReply });
});

// AI Biology Test Generator API
app.post('/api/biobot/quiz', async (req, res) => {
  const { grade = "8", topic = "Hujayra tuzilishi", count = 3 } = req.body;

  if (ai) {
    try {
      const prompt = `${grade}-sinf biologiya fani "${topic}" mavzusi bo'yicha ${count} ta yangi interaktiv test savoli yarat.
Javobni FAQAT quyidagi JSON formatida qaytar:
[
  {
    "question": "Savol matni",
    "options": ["A variant", "B variant", "C variant", "D variant"],
    "correctIndex": 0,
    "explanation": "To'g'ri javob izohi"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: "Siz biologiya fanidan mukammal test tuzuvchi mutaxassissiz. Javob faqat sof JSON bo'lsin.",
          responseMimeType: "application/json",
        },
      });

      if (response?.text) {
        try {
          const parsed = JSON.parse(response.text);
          return res.json({ questions: parsed });
        } catch (e) {
          console.error("JSON parse error from quiz:", e);
        }
      }
    } catch (error: any) {
      console.warn("Gemini quiz fallback invoked due to:", error?.message || error);
    }
  }

  // Robust fallback questions
  const fallbackQuestions = [
    {
      question: `${topic} mavzusi bo'yicha: ushbu jarayon yoki tuzilmaning asosiy biologik vazifasi nima?`,
      options: [
        "Moddalar almashinuvi va hayotiy faoliyatni ta'minlash",
        "Faqat suvni to'plash",
        "Genetik axborotni yo'q qilish",
        "Hujayra harakatini to'xtatish"
      ],
      correctIndex: 0,
      explanation: "Biologik tuzilmalar va jarayonlar organizmning gomeostazi va hayotiy metabolizmini ta'minlash uchun xizmat qiladi."
    },
    {
      question: `Quyidagi qonuniyatlardan qaysi biri ${grade}-sinf biologiya faniga tegishli?`,
      options: [
        "Hujayraviy tuzilish va energetik muvozanat",
        "Faqat noorganik birikmalarning hosil bo'lishi",
        "Mutatsiyalarning mutlaqo sodir bo'lmasligi",
        "Hujayralarning bo'linmasligi"
      ],
      correctIndex: 0,
      explanation: "Tirik mavjudotlar hujayraviy tuzilishga ega bo'lib, o'zaro energiya va moddalar almashinuvida bo'ladi."
    }
  ];

  return res.json({ questions: fallbackQuestions });
});

// Production Vite Middleware / Static Files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
