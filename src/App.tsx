import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { HomeDashboardView } from './components/home/HomeDashboardView';
import { TextbookView } from './components/textbook/TextbookView';
import { TopicDetailView } from './components/lesson/TopicDetailView';
import { TestCenterView } from './components/tests/TestCenterView';
import { ActiveTestRunner } from './components/tests/ActiveTestRunner';
import { GamesCatalogView } from './components/games/GamesCatalogView';
import { ActiveGamePlayer } from './components/games/ActiveGamePlayer';
import { PuzzlesView } from './components/puzzles/PuzzlesView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { ProfileView } from './components/profile/ProfileView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { TeacherAdminView } from './components/teacher/TeacherAdminView';
import { BioBotModal } from './components/ai/BioBotModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { BadgeUnlockModal } from './components/common/BadgeUnlockModal';
import { Sparkles, Bot, Heart, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, notification, setIsBioBotOpen } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeDashboardView />;
      case 'textbook':
        return <TextbookView />;
      case 'topic_detail':
        return <TopicDetailView />;
      case 'tests':
        return <TestCenterView />;
      case 'active_test':
        return <ActiveTestRunner />;
      case 'games':
        return <GamesCatalogView />;
      case 'active_game':
        return <ActiveGamePlayer />;
      case 'puzzles':
        return <PuzzlesView />;
      case 'attendance':
        return <AttendanceView />;
      case 'profile':
        return <ProfileView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'teacher_admin':
        return <TeacherAdminView />;
      default:
        return <HomeDashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>

      {/* Floating BioBot Quick Button */}
      <button
        onClick={() => setIsBioBotOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3.5 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
        title="AI Biologiya Ustozi BioBot bilan savol-javob"
      >
        <span className="text-xl">🤖</span>
        <span className="hidden sm:inline">BioBot AI Ustozi</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping hidden sm:inline" />
      </button>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs sm:text-sm animate-fade-in border border-slate-700 dark:border-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Modals */}
      <BioBotModal />
      <GlobalSearchModal />
      <BadgeUnlockModal />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧬</span>
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              Biologiya Olami
            </span>
            <span>• O'zbekiston 8-11 Sinf Ta'lim Platformasi</span>
          </div>
          <div className="text-slate-400">
            Darsliklar, testlar, interaktiv diagrammalar va o'yinlar uyg'unligi
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
