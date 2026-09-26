import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/curriculumData';
import { GradeNumber } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Heart,
  ChevronRight,
  Target,
  Bookmark
} from 'lucide-react';

export const TextbookView: React.FC = () => {
  const {
    selectedGrade,
    setSelectedGrade,
    userProfile,
    openTopic,
    toggleFavoriteTopic
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOnlyFavorites, setFilterOnlyFavorites] = useState(false);

  const gradeTopics = TOPICS.filter(t => t.grade === selectedGrade);
  const completedInGrade = gradeTopics.filter(t => userProfile.completedTopicIds.includes(t.id)).length;
  const gradeProgress = gradeTopics.length > 0 ? Math.round((completedInGrade / gradeTopics.length) * 100) : 0;

  // Filter topics
  const filteredTopics = gradeTopics.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFav = !filterOnlyFavorites || userProfile.favoriteTopicIds.includes(t.id);
    return matchesSearch && matchesFav;
  });

  // Group topics by chapter
  const chaptersMap: { [chap: string]: typeof TOPICS } = {};
  filteredTopics.forEach(t => {
    if (!chaptersMap[t.chapterTitle]) {
      chaptersMap[t.chapterTitle] = [];
    }
    chaptersMap[t.chapterTitle].push(t);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Rasmiy Maktab Darsligi
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            📚 Biologiya Darsliklari
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            O'zbekiston umumta'lim maktablarining 8-, 9-, 10- va 11-sinf darsliklari asosidagi mavzular
          </p>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start md:self-auto border border-slate-200 dark:border-slate-700">
          {([8, 9, 10, 11] as GradeNumber[]).map(grade => {
            const isActive = selectedGrade === grade;
            return (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {grade}-sinf
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress & Search Banner */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Progress Card */}
        <div className="md:col-span-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span>{selectedGrade}-sinf bo'yicha umumiy progress</span>
            <span className="font-bold text-emerald-200">{completedInGrade} / {gradeTopics.length} mavzu ({gradeProgress}%)</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${gradeProgress}%` }}
            />
          </div>
        </div>

        {/* Search & Favorites Filter */}
        <div className="md:col-span-6 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Darslik mavzularidan qidiring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => setFilterOnlyFavorites(prev => !prev)}
            className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterOnlyFavorites
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${filterOnlyFavorites ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Sevimlilar</span>
          </button>
        </div>
      </div>

      {/* Chapters & Topics List */}
      <div className="mt-8 space-y-10">
        {Object.keys(chaptersMap).length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-2">
              Mavzular topilmadi
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Qidiruv so'zini o'zgartirib ko'ring yoki boshqa sinfni tanlang
            </p>
          </div>
        ) : (
          Object.entries(chaptersMap).map(([chapterTitle, topicsList]) => (
            <div key={chapterTitle} className="space-y-4">
              {/* Chapter Header */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-500 rounded-full" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {chapterTitle}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold ml-auto">
                  {topicsList.length} ta mavzu
                </span>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topicsList.map(topic => {
                  const isCompleted = userProfile.completedTopicIds.includes(topic.id);
                  const isFavorite = userProfile.favoriteTopicIds.includes(topic.id);

                  return (
                    <div
                      key={topic.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Top Row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center">
                              {topic.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                  {topic.orderNumber}-mavzu
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {topic.estimatedMinutes} daq
                                </span>
                              </div>
                              <h3
                                onClick={() => openTopic(topic.id)}
                                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                              >
                                {topic.title}
                              </h3>
                            </div>
                          </div>

                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavoriteTopic(topic.id)}
                            className={`p-2 rounded-xl transition-colors ${
                              isFavorite
                                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                          {topic.summary}
                        </p>

                        {/* Goals Snippet */}
                        {topic.learningGoals.length > 0 && (
                          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{topic.learningGoals[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Row */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            O'zlashtirilgan
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-slate-400">
                            O'qilmagan
                          </span>
                        )}

                        <button
                          onClick={() => openTopic(topic.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white dark:bg-slate-800 dark:hover:bg-emerald-600 font-bold text-xs transition-colors shadow-sm"
                        >
                          {isCompleted ? "Qayta o'qish" : "Darsni boshlash"}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
