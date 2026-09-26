import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Lightbulb,
  FileQuestion,
  RotateCcw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

export const BioBotModal: React.FC = () => {
  const { isBioBotOpen, setIsBioBotOpen, selectedGrade, bioBotTopicContext } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Salom! Men sizning AI Biologiya ustozingiz - BioBotman! 🧬\n\nBiologiyadan (8-, 9-, 10- yoki 11-sinf) qanday savolingiz bor? Hujayra tuzilishi, DNK, odam organizmi yoki ekologiya haqida istalgan savol bering yoki "Menga mini-test tuzib ber" deb yozing!`,
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

  if (!isBioBotOpen) return null;

  const quickPrompts = [
    "Mitoxondriya nima va vazifasi qanday?",
    "Mitoz va Meyoz bo'linishining asosiy farqi?",
    "DNK dagi komplementarlik qoidasini tushuntir",
    "Menga 3 ta qisqa mini-test tuzib ber",
    "Odam yuragining 4 ta kamerasi qanday ishlaydi?"
  ];

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
          topic: bioBotTopicContext,
          history: messages.slice(-5)
        })
      });

      const data = await response.json();
      const replyText = data.reply || data.fallbackReply || "Kechirasiz, javob olishda xatolik yuz berdi.";

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
          text: "Hozirda AI xizmatiga ulanishda vaqtinchalik cheklov bor. Biroq darslikdagi interaktiv diagrammalar, testlar va o'yinlardan to'liq foydalanishingiz mumkin!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl h-[620px] max-h-[92vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
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
                {selectedGrade}-sinf • Gemini 3.8 Flash
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBioBotOpen(false)}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Topic Helper if from a topic */}
        {bioBotTopicContext && (
          <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium border-b border-emerald-100 dark:border-emerald-800/40 flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Mavzu konteksti: {bioBotTopicContext}</span>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm flex-shrink-0">
                🤖
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-500 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                BioBot o'ylamoqda va javob tayyorlamoqda...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-1.5 overflow-x-auto">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs whitespace-nowrap hover:border-emerald-500 transition-colors shadow-2xs"
            >
              💡 {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="BioBotdan biologiya haqida so'rang..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold transition-all shadow-md flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
