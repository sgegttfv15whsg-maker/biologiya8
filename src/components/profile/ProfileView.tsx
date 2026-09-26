import React from 'react';
import { useApp } from '../../context/AppContext';
import { BADGES, TOPICS } from '../../data/curriculumData';
import {
  User,
  Award,
  Zap,
  Flame,
  BookOpen,
  Trophy,
  CheckCircle,
  Calendar,
  Lock,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { userProfile, openTopic } = useApp();

  const totalTopics = TOPICS.length;
  const completedCount = userProfile.completedTopicIds.length;
  const progressPct = Math.round((completedCount / totalTopics) * 100);

  // Tests average
  const testsCount = userProfile.testScores.length;
  const averageTestPct = testsCount > 0
    ? Math.round(
        userProfile.testScores.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0) / testsCount
      )
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-6 -bottom-6 text-9xl opacity-10 select-none">
          🧬
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/20 p-2 flex items-center justify-center text-5xl shadow-2xl flex-shrink-0">
            👨‍🎓
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                {userProfile.grade}-sinf o'quvchisi
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-current text-amber-400" />
                {userProfile.streakDays} kunlik streak
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {userProfile.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Level {userProfile.level} • {userProfile.xp} XP to'plandi
            </p>

            {/* Level Progress Bar */}
            <div className="mt-5 max-w-md">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Daraja: Level {userProfile.level}</span>
                <span>{(userProfile.xp % 100)} / 100 XP (Keyingi darajagacha {100 - (userProfile.xp % 100)} XP)</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 p-0.5 overflow-hidden">
                <div
                  className="bg-emerald-400 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${userProfile.xp % 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            O'tilgan darslar
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {completedCount} ta
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Barcha mavzularning {progressPct}% qismi</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            O'rtacha test balli
          </span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {averageTestPct}%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">{testsCount} ta test topshirilgan</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            O'yinlar faolligi
          </span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {userProfile.gameStats.reduce((a, b) => a + b.playedCount, 0)} marta
          </div>
          <span className="text-xs text-slate-500 mt-1 block">12 ta mini-o'yinda</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Qo'lga kiritilgan yutuqlar
          </span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
            {userProfile.unlockedBadgeIds.length} / {BADGES.length}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Badgelar</span>
        </div>
      </div>

      {/* Badges Collection Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Gamifikatsiya yutuqlari
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Yutuqlar va Noshonlar (Badges)
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {userProfile.unlockedBadgeIds.length} olingan
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {BADGES.map(badge => {
            const isUnlocked = userProfile.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-500/10 to-orange-500/5 border-amber-300 dark:border-amber-700/60 shadow-sm'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div>
                  <div className="text-4xl mx-auto mb-2 flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                      <Sparkles className="w-3 h-3" />
                      Qulf ochilgan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Lock className="w-3 h-3" />
                      Yopiq
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
