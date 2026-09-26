import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PUZZLES } from '../../data/gamesData';
import {
  Puzzle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';

export const PuzzlesView: React.FC = () => {
  const { addXP, triggerCelebration } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [answers, setAnswers] = useState<{ [puzId: string]: number }>({});
  const [submitted, setSubmitted] = useState<{ [puzId: string]: boolean }>({});
  const [showHint, setShowHint] = useState<{ [puzId: string]: boolean }>({});

  const difficulties = [
    { id: 'all', label: 'Barchasi', color: 'bg-slate-100 text-slate-700' },
    { id: 'easy', label: '🟢 Oson', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'medium', label: '🟡 O\'rta', color: 'bg-amber-100 text-amber-800' },
    { id: 'hard', label: '🔴 Qiyin', color: 'bg-rose-100 text-rose-800' },
    { id: 'expert', label: '🔥 Ekspert', color: 'bg-purple-100 text-purple-800' },
  ];

  const filteredPuzzles = PUZZLES.filter(p => {
    if (selectedDifficulty === 'all') return true;
    return p.difficulty === selectedDifficulty;
  });

  const handleSelectAnswer = (puzId: string, optIdx: number) => {
    if (submitted[puzId]) return;
    setAnswers(prev => ({ ...prev, [puzId]: optIdx }));
  };

  const handleCheckPuzzle = (puz: typeof PUZZLES[0]) => {
    setSubmitted(prev => ({ ...prev, [puz.id]: true }));
    const isCorrect = answers[puz.id] === puz.correctIndex;
    if (isCorrect) {
      triggerCelebration();
      const xp = puz.difficulty === 'easy' ? 15 : puz.difficulty === 'medium' ? 20 : puz.difficulty === 'hard' ? 30 : 40;
      addXP(xp, `Boshqotirma yechildi: ${puz.title}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Puzzle className="w-4 h-4" />
            Mantiqiy Tafakkur
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            🧩 Biologik Boshqotirmalar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Genetik kodlar, mantiqiy jumboqlar, rebuslar va biologik ketma-ketliklarni yeching
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto self-start md:self-auto">
          {difficulties.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDifficulty(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedDifficulty === d.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Puzzles List */}
      <div className="mt-8 space-y-6">
        {filteredPuzzles.map((puz, pIdx) => {
          const isDone = submitted[puz.id];
          const isCorrect = isDone && answers[puz.id] === puz.correctIndex;
          const currentAns = answers[puz.id];

          return (
            <div
              key={puz.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      puz.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                      puz.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                      puz.difficulty === 'hard' ? 'bg-rose-100 text-rose-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {puz.difficulty === 'easy' ? '🟢 Oson' : puz.difficulty === 'medium' ? '🟡 O\'rta' : puz.difficulty === 'hard' ? '🔴 Qiyin' : '🔥 Ekspert'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono uppercase">
                      Tur: {puz.type}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
                    {puz.title}
                  </h3>
                </div>

                <button
                  onClick={() => setShowHint(prev => ({ ...prev, [puz.id]: !prev[puz.id] }))}
                  className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors flex items-center gap-1 text-xs font-bold"
                  title="Maslahatni ko'rish"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden sm:inline">Maslahat</span>
                </button>
              </div>

              {/* Question Text */}
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 mt-4 leading-relaxed font-medium">
                {puz.question}
              </p>

              {/* Optional Hint Box */}
              {showHint[puz.id] && (
                <div className="mt-3 p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{puz.hint}</span>
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {puz.options.map((opt, optIdx) => {
                  const isSelected = currentAns === optIdx;
                  let style = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500';

                  if (isDone) {
                    if (optIdx === puz.correctIndex) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    style = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isDone}
                      onClick={() => handleSelectAnswer(puz.id, optIdx)}
                      className={`p-3.5 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isDone && optIdx === puz.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {!isDone ? (
                  <button
                    disabled={currentAns === undefined}
                    onClick={() => handleCheckPuzzle(puz)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Javobni tekshirish
                  </button>
                ) : (
                  <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                    <span className={`font-bold block mb-1 ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {isCorrect ? "🎉 Ajoyib! Jumboq to'g'ri yechildi!" : "❌ Noto'g'ri javob berildi."}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">{puz.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
