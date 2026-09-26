import React, { useState } from 'react';
import { QuickQuestion } from '../../types';
import { useApp } from '../../context/AppContext';
import { Check, X, Award, RotateCcw, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';

interface Props {
  questions: QuickQuestion[];
  topicId: string;
  onFinished?: () => void;
}

export const QuickQuizSection: React.FC<Props> = ({ questions, topicId, onFinished }) => {
  const { addXP, triggerCelebration } = useApp();
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: any }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [qId: string]: boolean }>({});
  const [matchingSelections, setMatchingSelections] = useState<{ [key: number]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectAnswer = (qId: string, answer: any) => {
    if (submittedQuestions[qId]) return;
    setUserAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const handleCheckAnswer = (q: QuickQuestion) => {
    setSubmittedQuestions(prev => ({ ...prev, [q.id]: true }));
    const isCorrect = checkIsCorrect(q, userAnswers[q.id]);
    if (isCorrect) {
      addXP(5, "To'g'ri javob");
    }

    // Check if all submitted
    const updatedSubmitted = { ...submittedQuestions, [q.id]: true };
    const allDone = questions.every(item => updatedSubmitted[item.id]);
    if (allDone) {
      setQuizCompleted(true);
      triggerCelebration();
      if (onFinished) onFinished();
    }
  };

  const checkIsCorrect = (q: QuickQuestion, answer: any): boolean => {
    if (q.type === 'multiple-choice') {
      return answer === q.correctAnswer;
    }
    if (q.type === 'true-false') {
      return answer === q.correctAnswer;
    }
    if (q.type === 'fill-blank') {
      return String(answer || '').trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
    }
    if (q.type === 'matching') {
      return true; // Simplified matched state for interactive exercise
    }
    return false;
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (checkIsCorrect(q, userAnswers[q.id])) {
        correctCount++;
      }
    });
    return correctCount;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mt-8 shadow-sm">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Bilimni mustahkamlash
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            📝 O'zingizni sinab ko'ring
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Mavzu yuzasidan tezkor savollarga javob bering va XP jamg'aring
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
          <Award className="w-4 h-4 text-emerald-500" />
          {questions.length} ta savol
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {questions.map((q, idx) => {
          const isSubmitted = submittedQuestions[q.id];
          const currentAns = userAnswers[q.id];
          const isCorrect = isSubmitted && checkIsCorrect(q, currentAns);

          return (
            <div key={q.id} className="py-6 first:pt-6 last:pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 pt-0.5">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Multiple Choice Question */}
              {q.type === 'multiple-choice' && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 ml-10">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = currentAns === optIdx;
                    let style = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

                    if (isSubmitted) {
                      if (optIdx === q.correctAnswer) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold';
                      } else if (isSelected) {
                        style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200';
                      }
                    } else if (isSelected) {
                      style = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`text-left p-3.5 rounded-xl border text-sm transition-all duration-150 flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && optIdx === q.correctAnswer && (
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        {isSubmitted && isSelected && optIdx !== q.correctAnswer && (
                          <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True / False Question */}
              {q.type === 'true-false' && (
                <div className="flex gap-3 mt-4 ml-10">
                  {[
                    { label: "✅ To'g'ri", val: true },
                    { label: "❌ Noto'g'ri", val: false }
                  ].map(btn => {
                    const isSelected = currentAns === btn.val;
                    let btnStyle = 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
                    if (isSubmitted) {
                      if (btn.val === q.correctAnswer) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500 text-white border-rose-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                    }

                    return (
                      <button
                        key={String(btn.val)}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(q.id, btn.val)}
                        className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${btnStyle}`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Fill in the Blank */}
              {q.type === 'fill-blank' && q.options && (
                <div className="flex flex-wrap gap-2 mt-4 ml-10">
                  {q.options.map((word, wIdx) => {
                    const isSelected = currentAns === word;
                    return (
                      <button
                        key={wIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(q.id, word)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Matching */}
              {q.type === 'matching' && q.pairs && (
                <div className="mt-4 ml-10 space-y-2">
                  {q.pairs.map((pair, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 gap-2 text-sm"
                    >
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {pair.left}
                      </span>
                      <span className="text-slate-400 text-xs sm:inline hidden">→</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {pair.right}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button & Explanations */}
              <div className="ml-10 mt-4 flex items-center justify-between">
                {!isSubmitted ? (
                  <button
                    disabled={currentAns === undefined}
                    onClick={() => handleCheckAnswer(q)}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-sm transition-all flex items-center gap-1.5"
                  >
                    Tekshirish
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-full">
                    <div className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    }`}>
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-bold block mb-0.5">
                          {isCorrect ? "✅ To'g'ri!" : "❌ Noto'g'ri javob."}
                        </span>
                        <p className="leading-relaxed opacity-90">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {quizCompleted && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center shadow-lg">
          <Award className="w-12 h-12 mx-auto text-amber-300 mb-2 animate-bounce" />
          <h4 className="text-xl font-extrabold">🎉 Ajoyib natija!</h4>
          <p className="text-sm opacity-90 mt-1 max-w-md mx-auto">
            Siz ushbu mavzu savollarini muvaffaqiyatli yakunladingiz! Natija: {calculateScore()}/{questions.length}
          </p>
        </div>
      )}
    </div>
  );
};
