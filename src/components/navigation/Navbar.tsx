import React, { useState } from 'react';
import { useApp, ActiveView } from '../../context/AppContext';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Bot,
  Flame,
  Award,
  BookOpen,
  Gamepad2,
  FileCheck2,
  Puzzle,
  Calendar,
  Trophy,
  Volume2,
  VolumeX,
  User,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    darkMode,
    toggleDarkMode,
    soundEnabled,
    toggleSound,
    userProfile,
    setIsBioBotOpen,
    setIsSearchOpen,
    currentRole
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { view: ActiveView; label: string; icon: string }[] = [
    { view: 'home', label: 'Bosh sahifa', icon: '🏠' },
    { view: 'textbook', label: 'Darslik', icon: '📚' },
    { view: 'games', label: 'O\'yinlar', icon: '🎮' },
    { view: 'tests', label: 'Testlar', icon: '📝' },
    { view: 'puzzles', label: 'Boshqotirma', icon: '🧩' },
    { view: 'attendance', label: 'Davomat', icon: '📅' },
    { view: 'leaderboard', label: 'Reyting', icon: '🏆' },
    { view: 'teacher_admin', label: 'O\'qituvchi', icon: '👨‍🏫' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2.5 flex-shrink-0 text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🧬
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight block group-hover:text-emerald-600 transition-colors">
              Biologiya Olami
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase block">
              8–11 Sinf Ta'limi
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/70 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
          {navItems.map(item => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Search, BioBot, XP, DarkMode, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-medium transition-all"
            title="Biologiyadan qidiring"
          >
            <Search className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">Qidirish...</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-800 rounded font-mono text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* AI BioBot Launcher */}
          <button
            onClick={() => setIsBioBotOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:scale-102 transition-transform"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">BioBot AI</span>
          </button>

          {/* XP & Streak Indicator */}
          <div
            onClick={() => setActiveView('profile')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 cursor-pointer hover:border-emerald-400 transition-colors"
          >
            <div className="flex items-center gap-1 text-xs font-black text-amber-500">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{userProfile.streakDays}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
              {userProfile.xp} XP
            </div>
          </div>

          {/* Sound Effects Toggle (Section 53) */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-2xl border transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-600'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
            }`}
            title={soundEnabled ? "Ovozni o'chirish (Audio OFF)" : "Ovozni yoqish (Audio ON)"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
            title={darkMode ? "Yorug' rejimga o'tish" : "Tungi rejimga o'tish"}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => setActiveView('profile')}
            className="w-9 h-9 rounded-2xl bg-slate-900 text-white dark:bg-slate-800 flex items-center justify-center text-sm font-bold shadow-sm hover:ring-2 hover:ring-emerald-500 transition-all"
            title="Profil"
          >
            👨‍🎓
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    setActiveView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
