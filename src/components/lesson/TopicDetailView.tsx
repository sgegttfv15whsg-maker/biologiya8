import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/curriculumData';
import { GAME_CATALOG } from '../../data/gamesData';
import { InteractiveDiagramViewer } from '../diagrams/InteractiveDiagramViewer';
import { QuickQuizSection } from './QuickQuizSection';
import { ImageModalViewer } from '../common/ImageModalViewer';
import {
  ArrowLeft,
  Clock,
  Target,
  Heart,
  CheckCircle,
  Sparkles,
  Bot,
  Play,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  Gamepad2,
  Lightbulb,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const TopicDetailView: React.FC = () => {
  const {
    activeTopicId,
    setActiveView,
    completeTopic,
    toggleFavoriteTopic,
    userProfile,
    openTopic,
    openGame,
    openTest,
    setIsBioBotOpen,
    setBioBotTopicContext,
    customTopicImages,
    selectedGrade
  } = useApp();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Find active topic or fallback to first of current grade
  const currentTopic = TOPICS.find(t => t.id === activeTopicId) ||
    TOPICS.find(t => t.grade === selectedGrade) ||
    TOPICS[0];

  const isCompleted = userProfile.completedTopicIds.includes(currentTopic.id);
  const isFavorite = userProfile.favoriteTopicIds.includes(currentTopic.id);

  // Check custom uploaded image or topic image
  const customImg = customTopicImages[currentTopic.id];
  const activeImageUrl = customImg?.imageUrl || currentTopic.imageUrl;
  const activeImageCaption = customImg?.caption || currentTopic.imageCaption || currentTopic.summary;
  const activeImageAlt = customImg?.altText || currentTopic.imageAlt || currentTopic.title;

  // Filter topics of the SAME grade only (guarantees one grade never bleeds into another)
  const sameGradeTopics = TOPICS.filter(t => t.grade === currentTopic.grade);
  const currentIndex = sameGradeTopics.findIndex(t => t.id === currentTopic.id);
  const prevTopic = currentIndex > 0 ? sameGradeTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex !== -1 && currentIndex + 1 < sameGradeTopics.length ? sameGradeTopics[currentIndex + 1] : null;

  // Connected games for this lesson
  const getTopicGames = () => {
    if (currentTopic.games && currentTopic.games.length > 0) {
      return currentTopic.games.map(g => {
        const fullGame = GAME_CATALOG.find(cat => cat.id === g.id);
        return fullGame || { id: g.id, title: g.title, icon: g.icon, xpReward: g.xpReward, description: 'Mavzuni mustahkamlash o\'yini', category: 'quiz' as const };
      });
    }

    const tLower = currentTopic.title.toLowerCase();
    if (tLower.includes('cell') || tLower.includes('hujayra') || tLower.includes('organoid')) {
      return GAME_CATALOG.filter(g => ['cell_builder', 'guess_picture', 'memory_game'].includes(g.id));
    }
    if (tLower.includes('yurak') || tLower.includes('qon') || tLower.includes('organ')) {
      return GAME_CATALOG.filter(g => ['place_organs', 'rapid_fire', 'detective'].includes(g.id));
    }
    if (tLower.includes('dna') || tLower.includes('dnk') || tLower.includes('genetika') || tLower.includes('mendel')) {
      return GAME_CATALOG.filter(g => ['build_dna', 'genetics_expert', 'match_pairs'].includes(g.id));
    }
    if (tLower.includes('fotosintez') || tLower.includes('o\'simlik') || tLower.includes('metabolizm')) {
      return GAME_CATALOG.filter(g => ['virtual_lab', 'explore_plant', 'rapid_fire'].includes(g.id));
    }
    if (tLower.includes('ekologiya') || tLower.includes('biosfera') || tLower.includes('darvin')) {
      return GAME_CATALOG.filter(g => ['ecosystem_builder', 'word_search', 'boss_battle'].includes(g.id));
    }
    return GAME_CATALOG.slice(0, 3);
  };

  const topicGames = getTopicGames();

  // Connected test for this lesson
  const getTopicTestId = () => {
    if (currentTopic.tests && currentTopic.tests.length > 0) {
      return currentTopic.tests[0].id;
    }
    if (currentTopic.grade === 8) return 'test-8-cell';
    if (currentTopic.grade === 9) return 'test-9-organelles';
    if (currentTopic.grade === 10) return 'test-10-mendel';
    return 'test-11-darwin';
  };

  const handleFinishLesson = () => {
    if (!isCompleted) {
      completeTopic(currentTopic.id);
    }
  };

  const handleAskBioBot = (initialPrompt?: string) => {
    setBioBotTopicContext(`${currentTopic.grade}-sinf: ${currentTopic.title}`);
    setIsBioBotOpen(true);
  };

  const handleStartTopicTest = () => {
    const testId = getTopicTestId();
    openTest(testId);
  };

  // High-fidelity scientific SVG illustration fallback
  const renderTopicIllustration = () => {
    const tLower = currentTopic.title.toLowerCase();
    if (tLower.includes('yurak') || currentTopic.id.includes('heart')) {
      return (
        <svg viewBox="0 0 320 240" className="w-full h-56 max-w-sm mx-auto">
          <defs>
            <linearGradient id="artGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="venGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <path d="M160 40 C140 20, 90 20, 80 70 C70 120, 140 180, 160 210 C180 180, 250 120, 240 70 C230 20, 180 20, 160 40 Z" fill="url(#artGrad)" />
          <path d="M120 40 Q130 15, 150 10 Q170 10, 180 40" fill="none" stroke="#f87171" strokeWidth="18" strokeLinecap="round" />
          <path d="M190 25 Q210 25, 220 50" fill="none" stroke="url(#venGrad)" strokeWidth="14" strokeLinecap="round" />
          <text x="160" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">INSO YURAGI</text>
          <text x="160" y="145" textAnchor="middle" fill="#fecaca" fontSize="10">4 Kamerali Nasos</text>
        </svg>
      );
    }
    if (tLower.includes('dnk') || tLower.includes('genetika') || currentTopic.grade === 10) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-52 max-w-sm mx-auto">
          <defs>
            <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path d="M40 100 Q80 30, 120 100 T200 100 T280 100" fill="none" stroke="url(#dnaGrad1)" strokeWidth="6" />
          <path d="M40 100 Q80 170, 120 100 T200 100 T280 100" fill="none" stroke="#8b5cf6" strokeWidth="6" />
          {[60, 80, 100, 140, 160, 180, 220, 240, 260].map((x, i) => (
            <line key={i} x1={x} y1="65" x2={x} y2="135" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 3" />
          ))}
          <text x="160" y="175" textAnchor="middle" fill="#64748b" fontWeight="bold" fontSize="12">DNK Qo'sh Spirali (A=T, G≡C)</text>
        </svg>
      );
    }
    // Default Cell / Biology illustration
    return (
      <svg viewBox="0 0 320 220" className="w-full h-52 max-w-sm mx-auto">
        <circle cx="160" cy="110" r="85" fill="#ecfdf5" stroke="#10b981" strokeWidth="5" />
        <circle cx="160" cy="110" r="32" fill="#d1fae5" stroke="#059669" strokeWidth="3" />
        <ellipse cx="115" cy="80" rx="14" ry="8" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
        <ellipse cx="205" cy="140" rx="14" ry="8" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
        <circle cx="160" cy="110" r="12" fill="#047857" />
        <text x="160" y="114" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Yadro</text>
        <text x="160" y="185" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="12">Eukariot Hujayra</text>
      </svg>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => setActiveView('textbook')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentTopic.grade}-sinf darsligiga qaytish
        </button>

        <div className="flex items-center gap-2">
          {/* Favorite Button */}
          <button
            onClick={() => toggleFavoriteTopic(currentTopic.id)}
            className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-900 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? "Saqlangan" : "Saqlash"}</span>
          </button>

          {/* AI Ustoz Button */}
          <button
            onClick={() => handleAskBioBot()}
            className="px-3.5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" />
            AI Ustozdan so'rang
          </button>
        </div>
      </div>

      {/* Hero Banner with Topic Title */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 flex-wrap mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs">
              🧪 {currentTopic.grade}-SINF BIOLOGIYA
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 font-medium text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentTopic.estimatedMinutes} daqiqa
            </span>
            {isCompleted && (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                O'zlashtirilgan
              </span>
            )}
          </div>

          <span className="text-emerald-400 text-xs font-semibold tracking-wide block mb-1">
            {currentTopic.chapterTitle}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {currentTopic.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            {currentTopic.summary}
          </p>

          {/* Quick Action Pills: Test, Game, BioBot */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleStartTopicTest}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-emerald-400 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              Ushbu mavzu bo'yicha test topshirish
            </button>

            {topicGames.length > 0 && (
              <button
                onClick={() => openGame(topicGames[0].id)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-white/10"
              >
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                Mavzuga oid o'yin ({topicGames[0].title})
              </button>
            )}

            <button
              onClick={() => handleAskBioBot()}
              className="px-4 py-2 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-200 font-bold text-xs transition-colors flex items-center gap-1.5 border border-emerald-400/30"
            >
              <Bot className="w-4 h-4" />
              Mavzuni AI tushuntirsin
            </button>
          </div>
        </div>
      </div>

      {/* 🎯 Bugungi Dars Maqsadi */}
      <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-7">
        <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold text-lg mb-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3>🎯 Bugungi dars maqsadi</h3>
        </div>
        <ul className="space-y-2.5 ml-2 mt-2">
          {currentTopic.learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🖼️ Mavzuga Oid Sifatli Rasm & Diagramma */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-left">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Mavzuning Ilmiy Tasviri
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              🖼️ {currentTopic.title} ilmiy diagrammasi
            </h3>
          </div>
          <button
            onClick={() => setIsImageModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Kattalashtirish (Fullscreen)
          </button>
        </div>

        {/* Clickable Image / SVG Viewer */}
        <div
          onClick={() => setIsImageModalOpen(true)}
          className="my-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-emerald-950/20 border border-slate-200/80 dark:border-slate-800 cursor-pointer group relative overflow-hidden transition-all hover:border-emerald-400"
          title="Rasmni to'liq ekranda ko'rish uchun bosing"
        >
          {activeImageUrl ? (
            <img
              src={activeImageUrl}
              alt={activeImageAlt}
              className="max-h-72 w-auto mx-auto object-contain rounded-xl shadow-md transition-transform group-hover:scale-102"
            />
          ) : (
            renderTopicIllustration()
          )}

          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 px-4 py-2 rounded-xl bg-slate-900/80 text-white text-xs font-bold transition-opacity flex items-center gap-1.5 backdrop-blur-sm">
              <ZoomIn className="w-4 h-4" />
              Kattalashtirib ko'rish
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto italic">
          {activeImageCaption}
        </p>
      </div>

      {/* 📖 Mavzuni O'rganish - Text Sections */}
      <div className="space-y-6">
        {currentTopic.sections.map((sec, secIdx) => (
          <div
            key={secIdx}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {sec.subtitle}
            </h3>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
              {sec.content}
            </p>

            {sec.bulletPoints && (
              <ul className="space-y-2 mb-4 bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                {sec.bulletPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Callout Box */}
            {sec.callout && (
              <div
                className={`mt-5 p-5 rounded-2xl border text-sm sm:text-base leading-relaxed ${
                  sec.callout.type === 'important'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
                    : sec.callout.type === 'fact'
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 text-sky-950 dark:text-sky-100'
                    : sec.callout.type === 'remember'
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                }`}
              >
                <div className="font-extrabold text-base mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  {sec.callout.title}
                </div>
                <p className="opacity-95">{sec.callout.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔬 Interaktiv Diagramma (Hotspotli) */}
      {currentTopic.diagram && (
        <InteractiveDiagramViewer data={currentTopic.diagram} />
      )}

      {/* 🎮 SHU MAVZUGA OID O'YINLAR */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎮</span>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                SHU MAVZUGA OID O'YINLAR
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                O'rganilgan ma'lumotlarni o'yin shaklida mustahkamlang va XP to'plang
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {topicGames.map(tg => (
            <div
              key={tg.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md hover:border-emerald-400 transition-all"
            >
              <div>
                <div className="text-3xl mb-2">{tg.icon}</div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tg.title}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tg.description}</p>
              </div>
              <button
                onClick={() => openGame(tg.id)}
                className="mt-4 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                O'ynash (+{tg.xpReward} XP)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 📝 O'ZINGIZNI SINAB KO'RING (Interaktiv savollar) */}
      <QuickQuizSection
        questions={currentTopic.quickQuestions || currentTopic.questions || []}
        topicId={currentTopic.id}
        onFinished={handleFinishLesson}
      />

      {/* 🎉 Dars Yakuni Kartochkasi & Navigatsiya */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              {isCompleted ? "Tabriklaymiz!" : "Dars xulosasi"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
              🎉 Dars yakunlandi!
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-md">
              Siz "{currentTopic.title}" darsini o'rgandingiz. Bilimingizni mustahkamlash uchun o'yinlar yoki test markazidan foydalaning!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {!isCompleted ? (
              <button
                onClick={handleFinishLesson}
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mavzuni yakunlash (+25 XP)
              </button>
            ) : (
              <div className="px-5 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Mavzu o'zlashtirilgan
              </div>
            )}
          </div>
        </div>

        {/* Previous & Next Topic Controls (strictly within the SAME grade) */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between gap-3">
          {prevTopic ? (
            <button
              onClick={() => openTopic(prevTopic.id)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Oldingi dars: {prevTopic.title}
            </button>
          ) : <div />}

          {nextTopic && (
            <button
              onClick={() => openTopic(nextTopic.id)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              Keyingi dars: {nextTopic.title}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveView('games')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-3 border border-white/5"
          >
            <span className="text-2xl">🎮</span>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Barcha o'yinlar</span>
              <span className="text-sm font-bold text-white">Biologiya o'yinlari</span>
            </div>
          </button>

          <button
            onClick={handleStartTopicTest}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-3 border border-white/5"
          >
            <span className="text-2xl">📝</span>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Bilimni tekshirish</span>
              <span className="text-sm font-bold text-white">Mavzu Testi</span>
            </div>
          </button>

          <button
            onClick={() => handleAskBioBot()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-3 border border-white/5"
          >
            <span className="text-2xl">🤖</span>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Tushunmagan savol bormi?</span>
              <span className="text-sm font-bold text-white">BioBot Ustozi</span>
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <ImageModalViewer
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title={currentTopic.title}
        caption={activeImageCaption}
        imageUrl={activeImageUrl}
        altText={activeImageAlt}
        fallbackSvg={renderTopicIllustration()}
      />
    </div>
  );
};
