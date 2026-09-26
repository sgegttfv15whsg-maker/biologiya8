import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GAME_CATALOG, GameItem } from '../../data/gamesData';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Play,
  Flame,
  CheckCircle2,
  Star
} from 'lucide-react';

export const GamesCatalogView: React.FC = () => {
  const { openGame, userProfile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barchasi (12 ta)' },
    { id: 'quiz', label: 'Viktorina va Savollar' },
    { id: 'visual', label: 'Rasmli & Vizual' },
    { id: 'puzzle', label: 'Boshqotirma & So\'z' },
    { id: 'lab', label: 'Laboratoriya' },
    { id: 'rapid', label: 'Tezkor & Challenge' },
  ];

  const filteredGames = GAME_CATALOG.filter(g => {
    if (selectedCategory === 'all') return true;
    return g.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4" />
            O'yinlashtirilgan ta'lim
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            🎮 Biologiya O'yinlari
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Biologiya mavzularini qiziqarli o'yinlar, tajribalar va boshqotirmalar orqali mustahkamlang!
          </p>
        </div>

        {/* Global XP & Games stats badge */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-200 dark:border-amber-900/60 self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-amber-800 dark:text-amber-300 font-bold block">
              O'yinlarda to'plangan XP
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {userProfile.gameStats.reduce((acc, curr) => acc + (curr.playedCount * 15), 0)} XP
            </span>
          </div>
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
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Games 12-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((item, index) => {
          const userStat = userProfile.gameStats.find(g => g.gameId === item.id);

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-600/60 transition-all group"
            >
              <div>
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/40 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    +{item.xpReward} XP
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  {userStat ? (
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {userStat.playedCount} marta o'ynalgan
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">
                      Hali o'ynalmagan
                    </span>
                  )}
                </div>

                <button
                  onClick={() => openGame(item.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  O'ynash
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
