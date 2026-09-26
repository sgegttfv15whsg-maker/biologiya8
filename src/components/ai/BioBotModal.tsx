import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, GRADE_COURSES } from '../../data/curriculumData';
import { GradeNumber } from '../../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Lightbulb,
  FileQuestion,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const BioBotModal: React.FC = () => {
  const {
    isBioBotOpen,
    setIsBioBotOpen,
    selectedGrade,
    setSelectedGrade,
    bioBotTopicContext,
    setBioBotTopicContext,
    activeTopicId,
    openTopic,
    setActiveView
  } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTopicPicker, setShowTopicPicker] = useState(false);

  // Active topic object if any
  const currentTopic = TOPICS.find(t => t.id === activeTopicId) ||
    TOPICS.find(t => bioBotTopicContext.includes(t.title)) ||
    TOPICS.find(t => t.grade === selectedGrade) ||
    TOPICS[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Salom! Men sizning ${selectedGrade}-sinf biologiya bo'yicha AI Ustozingiz — **BioBot**man! 🧬\n\nHozirgi mavzu: **"${currentTopic.title}"**.\n\nSizga mavzuni sodda tilda tushuntirib beraymi, qiziqarli hayotiy misol keltiraymi yoki 3 ta mini-test tuzib bilimingizni sinab ko'raylikmi?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isBioBotOpen) {
      scrollToBottom();
    }
  }, [messages, isBioBotOpen]);

  // When grade or topic changes, ensure bioBotTopicContext is set
  useEffect(() => {
    if (!bioBotTopicContext && currentTopic) {
      setBioBotTopicContext(`${currentTopic.grade}-sinf: ${currentTopic.title}`);
    }
  }, [selectedGrade, currentTopic, bioBotTopicContext, setBioBotTopicContext]);

  if (!isBioBotOpen) return null;

  // Grade & Topic specific quick prompts
  const getQuickPrompts = () => {
    if (currentTopic.title.toLowerCase().includes('yurak')) {
      return [
        "Yurakning 4 ta kamerasi qanday ishlaydi?",
        "Katta va kichik qon aylanish doirasini tushuntir",
        "Yurak klapanlari vazifasi nima?",
        "Ushbu mavzudan 3 ta test tuzib ber"
      ];
    }
    if (currentTopic.title.toLowerCase().includes('hujayra') || currentTopic.title.toLowerCase().includes('organoid')) {
      return [
        "Mitoxondriya nima va uning asosiy vazifasi qanday?",
        "O'simlik va hayvon hujayrasining 4 asosiy farqi?",
        "Ribosoma qanday oqsil sintezlaydi?",
        "Hujayra bobi bo'yicha mini-test ber"
      ];
    }
    if (currentTopic.title.toLowerCase().includes('dnk') || currentTopic.title.toLowerCase().includes('mendel') || currentTopic.grade === 10) {
      return [
        "Mendelning 1- va 2-qonunlari farqi nimada?",
        "DNKdagi komplementarlik qoidasini tushuntir",
        "Genotip va fenotip nima?",
        "Genetika masalasi ber va yechimini ko'rsat"
      ];
    }
    if (currentTopic.title.toLowerCase().includes('fotosintez')) {
      return [
        "Fotosintezning yorug'lik va qorong'ilik bosqichi farqi?",
        "Suv fotolizida nima hosil bo'ladi?",
        "Fotosintez tenglamasini tushuntir",
        "Fotosintez bo'yicha 3 ta savol ber"
      ];
    }
    if (currentTopic.title.toLowerCase().includes('darvin') || currentTopic.title.toLowerCase().includes('ekologiya') || currentTopic.grade === 11) {
      return [
        "Tabiiy tanlanishning 3 ta asosiy omili nima?",
        "10% lik ekologik piramida qoidasini tushuntir",
        "Produtsent, konsument va redutsentlar farqi?",
        "Darvin ta'limotidan test tuzib ber"
      ];
    }
    return [
      `"${currentTopic.title}" mavzusini sodda tushuntir`,
      "Mavzuga oid qiziqarli biologik fakt ayt",
      "Menga 3 ta mini-test savoli ber",
      "Ushbu mavzudan imtihonda nimalar tushadi?"
    ];
  };

  const quickPrompts = getQuickPrompts();

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/biobot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          grade: selectedGrade,
          topic: bioBotTopicContext || `${currentTopic.grade}-sinf: ${currentTopic.title}`,
          history: messages.slice(-5)
        })
      });

      const data = await response.json();
      const replyText = data.reply || data.fallbackReply || "Kechirasiz, javob tayyorlashda xatolik yuz berdi.";

      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'model',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'model',
          text: "Hozirda AI xizmatiga ulanishda cheklov bor. Biroq darslikdagi rasmlar, interaktiv diagrammalar va o'yinlardan to'liq foydalanishingiz mumkin!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestQuiz = async () => {
    if (loading) return;
    setLoading(true);

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      text: `Menga "${currentTopic.title}" mavzusi bo'yicha mini-test ber`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/biobot/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          topic: currentTopic.title,
          count: 3
        })
      });
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        let formattedQuiz = `🎯 **"${currentTopic.title}" bo'yicha 3 ta test savoli:**\n\n`;
        data.questions.forEach((q: any, i: number) => {
          formattedQuiz += `**${i + 1}-savol:** ${q.question}\n`;
          q.options.forEach((opt: string, optIdx: number) => {
            const letter = ['A', 'B', 'C', 'D'][optIdx];
            formattedQuiz += `  ${letter}) ${opt}\n`;
          });
          formattedQuiz += `*(To'g'ri javob: ${['A', 'B', 'C', 'D'][q.correctIndex]} — ${q.explanation})*\n\n`;
        });
        formattedQuiz += `Javoblaringizni tekshirib ko'ring! Yana savol bormi?`;

        setMessages(prev => [
          ...prev,
          {
            id: String(Date.now() + 1),
            role: 'model',
            text: formattedQuiz,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        handleSendMessage(`Menga "${currentTopic.title}" mavzusi bo'yicha 3 ta test savoli ber`);
      }
    } catch (e) {
      handleSendMessage(`Menga "${currentTopic.title}" mavzusi bo'yicha 3 ta test savoli ber`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCurrentTextbook = () => {
    openTopic(currentTopic.id);
    setIsBioBotOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl h-[650px] max-h-[92vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl shadow-inner">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base sm:text-lg">BioBot</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-400/30 font-bold">
                  AI Biologiya Ustozi
                </span>
              </div>
              <p className="text-xs text-emerald-100 opacity-90">
                {selectedGrade}-sinf • Darslik bilan to'liq bog'langan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome_reset',
                    role: 'model',
                    text: `Suhbat yangilandi! Men sizga biologiyadan (8-, 9-, 10- yoki 11-sinf) qanday yordam bera olaman?`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-xs flex items-center gap-1"
              title="Suhbatni tozalash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsBioBotOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grade & Topic Context Bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {([8, 9, 10, 11] as GradeNumber[]).map(g => (
              <button
                key={g}
                onClick={() => {
                  setSelectedGrade(g);
                  const firstOfGrade = TOPICS.find(t => t.grade === g);
                  if (firstOfGrade) {
                    setBioBotTopicContext(`${g}-sinf: ${firstOfGrade.title}`);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedGrade === g
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {g}-sinf
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowTopicPicker(prev => !prev)}
              className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1 hover:bg-emerald-100 transition-colors max-w-[220px] truncate"
            >
              <span className="truncate">📌 {currentTopic.title}</span>
              <ChevronDown className="w-3 h-3 flex-shrink-0" />
            </button>

            {showTopicPicker && (
              <div className="absolute right-0 top-8 z-50 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 max-h-60 overflow-y-auto">
                <span className="text-[10px] font-bold uppercase text-slate-400 px-2 block mb-1">
                  {selectedGrade}-sinf mavzulari:
                </span>
                {TOPICS.filter(t => t.grade === selectedGrade).map(top => (
                  <button
                    key={top.id}
                    onClick={() => {
                      setBioBotTopicContext(`${top.grade}-sinf: ${top.title}`);
                      setShowTopicPicker(false);
                    }}
                    className="w-full text-left p-2 rounded-xl text-xs hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors flex items-center gap-2"
                  >
                    <span>{top.icon}</span>
                    <span className="truncate">{top.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleOpenCurrentTextbook}
            className="text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Darslikni ochish
          </button>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map(msg => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex-shrink-0 flex items-center justify-center text-sm shadow-sm">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/60'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-normal">
                    {msg.text}
                  </div>
                  <span
                    className={`text-[10px] block mt-1.5 ${
                      isUser ? 'text-emerald-100 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm">
                🤖
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-400 ml-1">BioBot javob tayyorlamoqda...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={handleRequestQuiz}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileQuestion className="w-3.5 h-3.5" />
            3 ta mini-test tuz
          </button>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-xs font-medium transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`"${currentTopic.title}" yoki biologiyadan istalgan savol bering...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center justify-center transition-all shadow-md flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
