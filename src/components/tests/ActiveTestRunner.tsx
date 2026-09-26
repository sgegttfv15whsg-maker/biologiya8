import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_TESTS, GENERAL_TEST_QUESTIONS } from '../../data/curriculumData';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  AlertCircle,
  Bot
} from 'lucide-react';

export const ActiveTestRunner: React.FC = () => {
  const { activeTestId, setActiveView, recordTestScore, setIsBioBotOpen, setBioBotTopicContext } = useApp();
  const testConfig = INITIAL_TESTS.find(t => t.id === activeTestId) || INITIAL_TESTS[0];

  const questionsPool = GENERAL_TEST_QUESTIONS[testConfig.grade] || GENERAL_TEST_QUESTIONS[8];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(testConfig.timeLimitMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (isFinished || timeLeft <= 0) {
      if (timeLeft <= 0 && !isFinished) {
        finishTest();
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const finishTest = () => {
    setIsFinished(true);
    let correctCount = 0;
    questionsPool.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    recordTestScore(testConfig.id, correctCount, questionsPool.length, testConfig.grade, testConfig.category);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate results
  const correctCount = questionsPool.filter((q, idx) => selectedAnswers[idx] === q.correctIndex).length;
  const percentage = Math.round((correctCount / questionsPool.length) * 100);

  // Educational neutral recommendations
  const getRecommendation = (pct: number) => {
    if (pct >= 90) return { verdict: "A'lo natija! 🏆", desc: "Mavzularni mukammal darajada o'zlashtirgansiz. Bilimingizni yangi sinf va olimpiada darajasiga ko'tarishingiz mumkin!", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300" };
    if (pct >= 80) return { verdict: "Juda yaxshi! ⭐", desc: "Asosiy tushunchalar va qonuniyatlar yaxshi o'zlashtirilgan. Ba'zi qismlarni bir bor ko'zdan kechirib qo'yish maqsadga muvofiq.", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-300" };
    if (pct >= 60) return { verdict: "Yaxshi 👍", desc: "O'rtacha barqaror bilim. Organoidlar va fiziologik jarayonlar bo'yicha darslikdagi diagrammalarni qayta takrorlash tavsiya etiladi.", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-300" };
    return { verdict: "Qayta takrorlash kerak 📚", desc: "Ushbu bob mavzularini diqqat bilan qayta o'qib chiqish va BioBot bilan mini-mashqlar qilish foydali bo'ladi.", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-300" };
  };

  const rec = getRecommendation(percentage);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveView('tests')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Test Markaziga qaytish
        </button>

        {!isFinished && (
          <div className="flex items-center gap-2 font-mono text-sm font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="mt-8 space-y-6">
          {/* Test Meta */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {testConfig.grade}-sinf • {testConfig.category === 'exam' ? 'Yakuniy Imtihon' : 'Bilim sinovi'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {testConfig.title}
            </h2>
          </div>

          {/* Question Nav Pills */}
          <div className="flex flex-wrap gap-2">
            {questionsPool.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-md'
                      : isAnswered
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Savol {currentIndex + 1} / {questionsPool.length}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {questionsPool[currentIndex].question}
            </h3>

            {/* 4 Options */}
            <div className="space-y-3 mt-6">
              {questionsPool[currentIndex].options.map((opt: string, optIdx: number) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIdx }))}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-1 ring-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(i => i - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                Oldingi savol
              </button>

              {currentIndex + 1 < questionsPool.length ? (
                <button
                  onClick={() => setCurrentIndex(i => i + 1)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Keyingi savol
                </button>
              ) : (
                <button
                  onClick={finishTest}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  Testni yakunlash
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center shadow-lg">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-3 animate-bounce" />
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Test Natijasi
            </h2>
            <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
              {percentage}%
            </div>
            <p className="text-sm text-slate-500 mt-1">
              To'g'ri javoblar: {correctCount} / {questionsPool.length}
            </p>

            {/* Recommendation badge */}
            <div className={`mt-6 p-4 rounded-2xl border max-w-lg mx-auto text-left ${rec.color}`}>
              <span className="font-extrabold text-base block">{rec.verdict}</span>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-95">{rec.desc}</p>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setCurrentIndex(0);
                  setTimeLeft(testConfig.timeLimitMinutes * 60);
                  setIsFinished(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Qayta topshirish
              </button>
              <button
                onClick={() => {
                  setBioBotTopicContext(`${testConfig.grade}-sinf testi tahlili: ${correctCount}/${questionsPool.length}`);
                  setIsBioBotOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                Xatolarni AI bilan tahlil qilish
              </button>
            </div>
          </div>

          {/* Questions Detailed Breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Savollar va Xatolar tahlili
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {questionsPool.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div key={idx} className="py-4 first:pt-0">
                    <div className="flex items-start gap-2.5">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </h4>
                        <div className="mt-2 text-xs sm:text-sm space-y-1">
                          <div className="text-slate-600 dark:text-slate-400">
                            Sizning javobingiz: <span className={isCorrect ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                              {userAns !== undefined ? q.options[userAns] : 'Belgilanmagan'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                              To'g'ri javob: {q.options[q.correctIndex]}
                            </div>
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                            Izoh: {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
