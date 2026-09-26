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
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Biology Teacher API - BioBot
app.post('/api/biobot/chat', async (req, res) => {
  try {
    const { message, history, grade, topic } = req.body;

    const systemInstruction = `Siz O'zbekiston maktablari (8-, 9-, 10-, 11-sinf) o'quvchilari uchun maxsus yaratilgan do'stona, bilimdon, qiziqarli "BIOBOT" - Biologiya o'qituvchisisiz.
Vazifalaringiz:
1. O'quvchiga biologiya mavzularini (hujayra, genetika, odam anatomiyasi, evolutsiya, ekologiya) sodda, ravon va ilmiy jihatdan 100% to'g'ri o'zbek tilida tushuntiring.
2. Quruq nazariya emas, hayotiy misollar va qiziqarli faktlar ("Bilasizmi?", "Misol uchun...") keltiring.
3. Uy vazifasini o'quvchining o'rniga shunchaki ishlab bermang; o'quvchini fikrlashga, xulosaga o'zi yetib kelishiga yo'naltiring.
4. Javobingiz oxirida o'quvchining tushunganini tekshirish uchun bitta qisqa, qiziqarli savol yoki chaqiruv bering.
5. Har bir tushuntirishda emoji va punktual belgilarni chiroyli, me'yorda ishlating.
Hozirgi sinf konteksti: ${grade || "8-11"}-sinf.
Mavzu konteksti: ${topic || "Umumiy biologiya"}.`;

    // Construct conversation contents
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
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

    const replyText = response.text || "Kechirasiz, savolingizga javob tayyorlashda texnik noaniqlik yuz berdi. Iltimos qayta so'rang.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("BioBot API Error:", error);
    res.status(500).json({
      error: "BioBot bilan aloqada xatolik yuz berdi",
      details: error?.message || "Noma'lum xatolik",
      fallbackReply: "Hozirda AI xizmatiga ulanishda vaqtinchalik cheklov bor. Ammo siz darslikdagi interaktiv diagrammalar, testlar va o'yinlardan to'liq foydalanishingiz mumkin!",
    });
  }
});

// AI Biology Test Generator API
app.post('/api/biobot/quiz', async (req, res) => {
  try {
    const { grade, topic, count = 3 } = req.body;
    const prompt = `${grade || "8"}-sinf biologiya fani "${topic || "Hujayra tuzilishi"}" mavzusi bo'yicha ${count} ta yangi interaktiv test savoli yarat.
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

    const text = response.text || "[]";
    const questions = JSON.parse(text);
    res.json({ questions });
  } catch (error: any) {
    console.error("Quiz generator error:", error);
    res.status(500).json({ error: "Test yaratishda xatolik", details: error?.message });
  }
});

// Mount Vite or static server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
