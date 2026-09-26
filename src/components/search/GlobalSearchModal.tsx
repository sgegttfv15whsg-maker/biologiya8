import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, INITIAL_TESTS } from '../../data/curriculumData';
import { GAME_CATALOG } from '../../data/gamesData';
import { Search, X, BookOpen, Gamepad2, FileCheck2, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openTopic, openGame, openTest } = useApp();
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingTopics = q
    ? TOPICS.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.chapterTitle.toLowerCase().includes(q)
      )
    : TOPICS.slice(0, 3);

  const matchingGames = q
    ? GAME_CATALOG.filter(
        g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)
      )
    : GAME_CATALOG.slice(0, 2);

  const matchingTests = q
    ? INITIAL_TESTS.filter(t => t.title.toLowerCase().includes(q))
    : INITIAL_TESTS.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Biologiyadan qidiring (Masalan: DNK, Mitoxondriya, Yurak, Fotosintez)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 text-sm">
          {/* Topics */}
          {matchingTopics.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                Mavzular ({matchingTopics.length})
              </div>
              <div className="space-y-1.5">
                {matchingTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openTopic(topic.id);
                    }}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                        {topic.grade}-sinf • {topic.chapterTitle}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-emerald-600 transition-colors">
                        {topic.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Games */}
          {matchingGames.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                O'yinlar ({matchingGames.length})
              </div>
              <div className="space-y-1.5">
                {matchingGames.map(gm => (
                  <button
                    key={gm.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openGame(gm.id);
                    }}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{gm.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                          {gm.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{gm.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tests */}
          {matchingTests.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-blue-500" />
                Testlar ({matchingTests.length})
              </div>
              <div className="space-y-1.5">
                {matchingTests.map(test => (
                  <button
                    key={test.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openTest(test.id);
                    }}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                        {test.grade}-sinf testi
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-blue-600 transition-colors">
                        {test.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
