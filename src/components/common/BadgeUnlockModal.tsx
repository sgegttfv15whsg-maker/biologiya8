import React from 'react';
import { useApp } from '../../context/AppContext';
import { BADGES } from '../../data/curriculumData';
import { Award, X, Sparkles } from 'lucide-react';

export const BadgeUnlockModal: React.FC = () => {
  const { recentUnlockedBadge, clearRecentBadge } = useApp();

  if (!recentUnlockedBadge) return null;

  const badge = BADGES.find(b => b.id === recentUnlockedBadge);
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-amber-400 dark:border-amber-600 text-center shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="text-6xl mx-auto my-4 animate-bounce">
          {badge.icon}
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Yangi Yutuq Ochildi!
        </span>

        <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
          {badge.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {badge.description}
        </p>

        <button
          onClick={clearRecentBadge}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 mt-6 transition-all hover:scale-102"
        >
          Ajoyib, qabul qilaman!
        </button>
      </div>
    </div>
  );
};
