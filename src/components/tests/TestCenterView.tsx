import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_TESTS } from '../../data/curriculumData';
import { GradeNumber } from '../../types';
import {
  FileCheck2,
  Clock,
  Award,
  Trophy,
  Play,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';

export const TestCenterView: React.FC = () => {
  const { openTest, selectedGrade, setSelectedGrade, userProfile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barcha testlar' },
    { id: 'topic', label: 'Mavzu bo\'yicha' },
    { id: 'chapter', label: 'Bob bo\'yicha' },
    { id: 'exam', label: '🏆 Yakuniy Imtihon' },
  ];

  const filteredTests = INITIAL_TESTS.filter(t => {
    const matchesGrade = selectedGrade === null || t.grade === selectedGrade;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesGrade && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            Bilimlarni Sinash
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            📝 Test Markazi
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Mavzuli, bobli va umumiy yakuniy biologiya imtihonlarini topshiring
          </p>
        </div>

        {/* Grade Selector */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          {([8, 9, 10, 11] as GradeNumber[]).map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {grade}-sinf
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.map(test => {
          const userResult = userProfile.testScores.find(s => s.testId === test.id);
          const isExam = test.category === 'exam';

          return (
            <div
              key={test.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border p-6 flex flex-col justify-between hover:shadow-lg transition-all ${
                isExam
                  ? 'border-amber-300 dark:border-amber-700/60 ring-2 ring-amber-400/20'
                  : 'border-slate-200/90 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isExam
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {test.grade}-sinf • {test.category === 'exam' ? 'Imtihon' : test.category === 'chapter' ? 'Bob' : 'Mavzu'}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {test.timeLimitMinutes} daq
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">
                  {test.title}
                </h3>

                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                  <span>Savollar: <strong>{test.questionCount} ta</strong></span>
                  <span>•</span>
                  <span>Maksimum: <strong>+{test.questionCount * 3} XP</strong></span>
                </div>

                {userResult && (
                  <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                        Oldingi natija
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                      {userResult.score} / {userResult.total} ({Math.round((userResult.score / userResult.total) * 100)}%)
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => openTest(test.id)}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    isExam
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  {userResult ? "Qayta topshirish" : "Testni boshlash"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
