import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, DAILY_FACTS } from '../../data/curriculumData';
import { GradeNumber } from '../../types';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  FileCheck2,
  Puzzle,
  Calendar,
  Award,
  ChevronRight,
  Flame,
  Zap,
  Target,
  Lightbulb,
  CheckCircle2,
  Play,
  RotateCcw,
  Bot
} from 'lucide-react';

export const HomeDashboardView: React.FC = () => {
  const {
    setSelectedGrade,
    setActiveView,
    openTopic,
    userProfile,
    addXP,
    setIsBioBotOpen,
    setBioBotTopicContext
  } = useApp();

  const [dailyFactIdx, setDailyFactIdx] = useState(0);

  // Daily missions claiming
  const [missions, setMissions] = useState(userProfile.dailyMissions);

  const handleClaimMission = (mId: string, xp: number) => {
    setMissions(prev =>
      prev.map(m => (m.id === mId ? { ...m, completed: true } : m))
    );
    addXP(xp, 'Kunlik missiya bajarildi');
  };

  const gradesConfig: {
    grade: GradeNumber;
    name: string;
    sub: string;
    icon: string;
    gradient: string;
  }[] = [
    {
      grade: 8,
      name: '8-SINF',
      sub: 'Biologiya asoslari (Odam va uning salomatligi)',
      icon: '🧪',
      gradient: 'from-emerald-600 to-teal-700'
    },
    {
      grade: 9,
      name: '9-SINF',
      sub: 'Biologik tizimlar (Sitologiya va umumiy biologiya)',
      icon: '🧬',
      gradient: 'from-blue-600 to-indigo-700'
    },
    {
      grade: 10,
      name: '10-SINF',
      sub: 'Genetika, evolyutsiya va biologik jarayonlar',
      icon: '🔬',
      gradient: 'from-purple-600 to-pink-700'
    },
    {
      grade: 11,
      name: '11-SINF',
      sub: 'Yuqori darajadagi biologiya (Ekologiya va biosfera)',
      icon: '🧠',
      gradient: 'from-amber-600 to-orange-700'
    }
  ];

  // Continue reading topic
  const lastTopic = TOPICS.find(t => t.id === userProfile.completedTopicIds[userProfile.completedTopicIds.length - 1]) || TOPICS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-emerald-500/20">
        <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-8 text-8xl opacity-10 select-none">
          🧬
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Biologiya Ta'lim Platformasi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            🧬 BIOLOGIYA OLAMI
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-3 font-medium leading-relaxed">
            "O‘rgan. O‘yna. Kashf et. Biologiyani sev!"
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={() => {
                setSelectedGrade(8);
                setActiveView('textbook');
              }}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Darslarni boshlash
            </button>
            <button
              onClick={() => {
                setBioBotTopicContext("Umumiy biologiya");
                setIsBioBotOpen(true);
              }}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/10 transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              AI BioBot bilan suhbat
            </button>
          </div>
        </div>
      </div>

      {/* 📚 O'qishni davom ettiring (Resume reading banner) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-2xl flex-shrink-0">
            {lastTopic.icon}
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              📚 O'qishni davom ettiring
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {lastTopic.grade}-sinf → {lastTopic.title}
            </h3>
          </div>
        </div>

        <button
          onClick={() => openTopic(lastTopic.id)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          Davom etish
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Grade Big Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Sinflar bo'yicha darsliklar
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Maktab Dasturi (8–11 Sinf)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gradesConfig.map(gc => {
            const gradeTopics = TOPICS.filter(t => t.grade === gc.grade);
            const completed = gradeTopics.filter(t => userProfile.completedTopicIds.includes(t.id)).length;
            const progress = gradeTopics.length > 0 ? Math.round((completed / gradeTopics.length) * 100) : 0;
            const gradeTests = userProfile.testScores.filter(s => s.grade === gc.grade);
            const avgScore = gradeTests.length > 0
              ? Math.round(gradeTests.reduce((a, b) => a + (b.score / b.total) * 100, 0) / gradeTests.length)
              : 85;

            return (
              <div
                key={gc.grade}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gc.gradient} text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform`}>
                        {gc.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {gc.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                          {gc.sub}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Level {userProfile.level}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-slate-400 font-medium block">Mavzular</span>
                      <strong className="text-slate-900 dark:text-white text-sm font-bold">
                        {completed}/{gradeTopics.length}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">O'rtacha test</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                        {avgScore}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">XP</span>
                      <strong className="text-amber-500 text-sm font-bold">
                        {userProfile.xp}
                      </strong>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Umumiy progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Start Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Darslik & Testlar</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGrade(gc.grade);
                      setActiveView('textbook');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white dark:bg-slate-800 dark:hover:bg-emerald-600 font-bold text-xs transition-colors shadow-sm"
                  >
                    Boshlash
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: 💡 Daily Fact & 🎯 Daily Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 💡 Bugungi Biologik Fakt */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-900 dark:to-sky-950/30 rounded-3xl p-6 border border-sky-200 dark:border-sky-900/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-extrabold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                💡 Bugungi Biologik Fakt
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-200/60 dark:bg-sky-900/60 text-sky-900 dark:text-sky-200 font-bold">
                {DAILY_FACTS[dailyFactIdx].tag}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3">
              {DAILY_FACTS[dailyFactIdx].title}
            </h3>

            <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 leading-relaxed">
              "{DAILY_FACTS[dailyFactIdx].fact}"
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-sky-100 dark:border-sky-900/40 flex justify-between items-center text-xs">
            <span className="text-sky-700 dark:text-sky-400 font-medium">
              Soha: {DAILY_FACTS[dailyFactIdx].category}
            </span>
            <button
              onClick={() => setDailyFactIdx(i => (i + 1) % DAILY_FACTS.length)}
              className="text-sky-600 dark:text-sky-400 font-bold hover:underline flex items-center gap-1"
            >
              Keyingi fakt
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 🎯 Bugungi Missiya */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              🎯 Bugungi Missiya
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
              Kundalik topshiriqlarni bajaring va XP oling
            </h3>

            <div className="space-y-2.5 mt-4">
              {missions.map(m => (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                    )}
                    <span className={m.completed ? 'line-through text-slate-400 font-medium' : 'font-semibold text-slate-800 dark:text-slate-200'}>
                      {m.title}
                    </span>
                  </div>

                  {!m.completed ? (
                    <button
                      onClick={() => handleClaimMission(m.id, m.xpReward)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      +{m.xpReward} XP
                    </button>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      Bajarildi
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Menu Cards */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Tezkor Menyu
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Darslik', icon: '📚', view: 'textbook' as const },
            { label: 'O\'yinlar', icon: '🎮', view: 'games' as const },
            { label: 'Test Markazi', icon: '📝', view: 'tests' as const },
            { label: 'Boshqotirma', icon: '🧩', view: 'puzzles' as const },
            { label: 'Davomat', icon: '📅', view: 'attendance' as const },
            { label: 'Reyting', icon: '🏆', view: 'leaderboard' as const },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(item.view)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-center group shadow-2xs"
            >
              <div className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
