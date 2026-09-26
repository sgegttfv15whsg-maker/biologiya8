import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Medal, Flame, Award, Star, ArrowUpRight } from 'lucide-react';

interface LeaderUser {
  id: string;
  name: string;
  grade: number;
  xp: number;
  testsCompleted: number;
  streak: number;
  avatar: string;
}

export const LeaderboardView: React.FC = () => {
  const { userProfile } = useApp();
  const [filter, setFilter] = useState<'xp' | 'tests' | 'streak'>('xp');

  // Realistic leaderboard mock containing the user plus top classmates
  const initialLeaders: LeaderUser[] = [
    { id: 'l1', name: 'Madina Qosimova', grade: 9, xp: 950, testsCompleted: 14, streak: 12, avatar: '👩‍🔬' },
    { id: 'l2', name: 'Bobur Mirzayev', grade: 10, xp: 880, testsCompleted: 12, streak: 9, avatar: '🧑‍💻' },
    { id: 'l3', name: 'Zilola Karimova', grade: 8, xp: 810, testsCompleted: 11, streak: 8, avatar: '👩‍🎓' },
    { id: 'user-default-1', name: userProfile.name, grade: userProfile.grade, xp: userProfile.xp, testsCompleted: userProfile.testScores.length, streak: userProfile.streakDays, avatar: '👨‍🎓' },
    { id: 'l4', name: 'Sardorbek Aliyev', grade: 11, xp: 620, testsCompleted: 8, streak: 5, avatar: '🧑‍🔬' },
    { id: 'l5', name: 'Diyora Rustamova', grade: 8, xp: 540, testsCompleted: 7, streak: 6, avatar: '👩‍🏫' },
    { id: 'l6', name: 'Javohir Toshmatov', grade: 9, xp: 490, testsCompleted: 6, streak: 3, avatar: '🧑‍🎓' },
  ];

  const sortedLeaders = [...initialLeaders].sort((a, b) => {
    if (filter === 'xp') return b.xp - a.xp;
    if (filter === 'tests') return b.testsCompleted - a.testsCompleted;
    return b.streak - a.streak;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            Maktab Reytingi
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            🏆 Biologiya Liderlari
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Biologiya fanini eng faol o'rganayotgan va yuqori natija ko'rsatgan o'quvchilar
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          {[
            { id: 'xp', label: 'Umumiy XP' },
            { id: 'tests', label: 'Testlar soni' },
            { id: 'streak', label: 'Ketma-ket kunlar' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === f.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Podium - Top 3 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 pb-4 items-end">
        {/* 2nd Place */}
        {sortedLeaders[1] && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 text-center shadow-md flex flex-col items-center">
            <div className="text-3xl sm:text-4xl mb-2">{sortedLeaders[1].avatar}</div>
            <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center mb-1">
              2
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
              {sortedLeaders[1].name}
            </h4>
            <span className="text-xs text-emerald-600 font-extrabold mt-1">
              {sortedLeaders[1].xp} XP
            </span>
          </div>
        )}

        {/* 1st Place */}
        {sortedLeaders[0] && (
          <div className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border-2 border-amber-400 dark:border-amber-600 text-center shadow-xl flex flex-col items-center relative -translate-y-4">
            <div className="absolute -top-4 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-lg">
              👑
            </div>
            <div className="text-4xl sm:text-5xl mb-2">{sortedLeaders[0].avatar}</div>
            <span className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center mb-1 shadow-sm">
              1
            </span>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
              {sortedLeaders[0].name}
            </h4>
            <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-black mt-1">
              {sortedLeaders[0].xp} XP
            </span>
          </div>
        )}

        {/* 3rd Place */}
        {sortedLeaders[2] && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 text-center shadow-md flex flex-col items-center">
            <div className="text-3xl sm:text-4xl mb-2">{sortedLeaders[2].avatar}</div>
            <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-900 dark:text-amber-300 font-black text-xs flex items-center justify-center mb-1">
              3
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
              {sortedLeaders[2].name}
            </h4>
            <span className="text-xs text-emerald-600 font-extrabold mt-1">
              {sortedLeaders[2].xp} XP
            </span>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {sortedLeaders.map((u, rank) => {
            const isMe = u.id === 'user-default-1';

            return (
              <div
                key={u.id}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                  isMe
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-bold border-l-4 border-l-emerald-500'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="w-6 text-center text-sm font-black text-slate-400">
                    {rank + 1}
                  </span>
                  <div className="text-2xl">{u.avatar}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        {u.name} {isMe && <span className="text-xs text-emerald-600 font-bold">(Siz)</span>}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {u.grade}-sinf • {u.testsCompleted} ta test
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right flex-shrink-0">
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 block font-mono">
                      {filter === 'xp' ? `${u.xp} XP` : filter === 'tests' ? `${u.testsCompleted} test` : `${u.streak} kun`}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {filter === 'xp' ? 'Reyting balli' : filter === 'tests' ? 'Muvaffaqiyatli' : 'Streak'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
