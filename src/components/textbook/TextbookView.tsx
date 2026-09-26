import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GRADE_COURSES, TOPICS } from '../../data/curriculumData';
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
  Bookmark,
  Bot,
  Gamepad2,
  FileCheck2,
  GraduationCap
} from 'lucide-react';

export const TextbookView: React.FC = () => {
  const {
    selectedGrade,
    setSelectedGrade,
    userProfile,
    openTopic,
    openTest,
    openGame,
    toggleFavoriteTopic,
    setIsBioBotOpen,
    setBioBotTopicContext
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOnlyFavorites, setFilterOnlyFavorites] = useState(false);

  // Active course strictly for the selected grade
  const activeCourse = GRADE_COURSES.find(c => c.gradeNumber === selectedGrade) || GRADE_COURSES[0];
  const gradeTopics = TOPICS.filter(t => t.grade === selectedGrade);
  const completedInGrade = gradeTopics.filter(t => userProfile.completedTopicIds.includes(t.id)).length;
  const gradeProgress = gradeTopics.length > 0 ? Math.round((completedInGrade / gradeTopics.length) * 100) : 0;

  // Grade badge styling
  const gradeBadges: { [grade: number]: { color: string; border: string; bg: string; text: string; icon: string } } = {
    8: { color: 'emerald', border: 'border-emerald-500', bg: 'bg-emerald-600', text: 'text-emerald-600 dark:text-emerald-400', icon: '🧪' },
    9: { color: 'blue', border: 'border-blue-500', bg: 'bg-blue-600', text: 'text-blue-600 dark:text-blue-400', icon: '🧬' },
    10: { color: 'purple', border: 'border-purple-500', bg: 'bg-purple-600', text: 'text-purple-600 dark:text-purple-400', icon: '🔬' },
    11: { color: 'amber', border: 'border-amber-500', bg: 'bg-amber-600', text: 'text-amber-600 dark:text-amber-400', icon: '🧠' },
  };

  const currentBadge = gradeBadges[selectedGrade] || gradeBadges[8];

  // Filter topics within the active course's chapters
  const filteredChapters = activeCourse.chapters.map(chapter => {
    const lessons = chapter.lessons.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFav = !filterOnlyFavorites || userProfile.favoriteTopicIds.includes(t.id);
      return matchesSearch && matchesFav;
    });
    return {
      ...chapter,
      lessons
    };
  }).filter(chap => chap.lessons.length > 0);

  const handleAskBioBotForTopic = (topicTitle: string) => {
    setBioBotTopicContext(`${selectedGrade}-sinf: ${topicTitle}`);
    setIsBioBotOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-4 h-4" />
            Rasmiy Maktab Darsliklari (O'zbekiston)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {currentBadge.icon} {activeCourse.gradeName}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {activeCourse.subtitle}
          </p>
        </div>

        {/* 4 Distinct Grade Selector Tabs */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl self-start md:self-auto border border-slate-200 dark:border-slate-700/80 shadow-inner">
          {([8, 9, 10, 11] as GradeNumber[]).map(grade => {
            const isActive = selectedGrade === grade;
            const b = gradeBadges[grade];
            return (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? `${b.bg} text-white shadow-md scale-102`
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>{b.icon}</span>
                <span>{grade}-sinf</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress & Search Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Progress Card */}
        <div className="md:col-span-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-500/20">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              {selectedGrade}-sinf umumiy o'zlashtirish darajasi
            </span>
            <span className="font-bold text-emerald-300">
              {completedInGrade} / {gradeTopics.length} dars ({gradeProgress}%)
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
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
              placeholder={`${selectedGrade}-sinf mavzulari bo'yicha qidiring...`}
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

      {/* Chapters & Topics List (strictly for the chosen grade) */}
      <div className="space-y-10">
        {filteredChapters.length === 0 ? (
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
          filteredChapters.map(chapter => (
            <div key={chapter.id} className="space-y-4">
              {/* Chapter Header */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{chapter.icon || '📖'}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {chapter.title}
                  </h2>
                  {chapter.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {chapter.description}
                    </p>
                  )}
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold ml-auto">
                  {chapter.lessons.length} ta mavzu
                </span>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.lessons.map(topic => {
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
                            <span className="text-3xl p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center flex-shrink-0">
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
                        {topic.learningGoals && topic.learningGoals.length > 0 && (
                          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{topic.learningGoals[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Row: Actions (Dars, Test, Game, AI) */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            O'zlashtirilgan
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-slate-400">
                            Yangi mavzu
                          </span>
                        )}

                        <div className="flex items-center gap-1.5">
                          {/* AI Quick Help */}
                          <button
                            onClick={() => handleAskBioBotForTopic(topic.title)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                            title="BioBot orqali tushuntirish"
                          >
                            <Bot className="w-4 h-4" />
                          </button>

                          {/* Start Topic */}
                          <button
                            onClick={() => openTopic(topic.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white dark:bg-slate-800 dark:hover:bg-emerald-600 font-bold text-xs transition-colors shadow-sm"
                          >
                            {isCompleted ? "Qayta o'qish" : "Darsni boshlash"}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
