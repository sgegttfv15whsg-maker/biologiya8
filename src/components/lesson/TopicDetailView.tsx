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
  ZoomIn,
  Gamepad2,
  Lightbulb
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
    customTopicImages
  } = useApp();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const currentTopic = TOPICS.find(t => t.id === activeTopicId) || TOPICS[0];
  const isCompleted = userProfile.completedTopicIds.includes(currentTopic.id);
  const isFavorite = userProfile.favoriteTopicIds.includes(currentTopic.id);

  // Check custom uploaded image or topic image
  const customImg = customTopicImages[currentTopic.id];
  const activeImageUrl = customImg?.imageUrl || currentTopic.imageUrl;
  const activeImageCaption = customImg?.caption || currentTopic.imageCaption || currentTopic.summary;
  const activeImageAlt = customImg?.altText || currentTopic.imageAlt || currentTopic.title;

  // Next topic in line
  const currentIndex = TOPICS.findIndex(t => t.id === currentTopic.id);
  const nextTopic = currentIndex !== -1 && currentIndex + 1 < TOPICS.length ? TOPICS[currentIndex + 1] : null;

  // Map relevant games to the topic (Section 55 in prompt)
  const getTopicGames = () => {
    if (currentTopic.id.includes('cell') || currentTopic.title.toLowerCase().includes('hujayra')) {
      return GAME_CATALOG.filter(g => ['cell_builder', 'guess_picture', 'memory_game', 'microscope'].includes(g.id));
    }
    if (currentTopic.id.includes('heart') || currentTopic.title.toLowerCase().includes('yurak')) {
      return GAME_CATALOG.filter(g => ['place_organs', 'bio_race', 'rapid_fire'].includes(g.id));
    }
    if (currentTopic.title.toLowerCase().includes('dna') || currentTopic.title.toLowerCase().includes('dnk') || currentTopic.title.toLowerCase().includes('genetika') || currentTopic.title.toLowerCase().includes('mendel')) {
      return GAME_CATALOG.filter(g => ['build_dna', 'genetics_expert', 'match_pairs'].includes(g.id));
    }
    if (currentTopic.title.toLowerCase().includes('fotosintez') || currentTopic.title.toLowerCase().includes('o\'simlik')) {
      return GAME_CATALOG.filter(g => ['plant_master', 'virtual_lab', 'explore_plant'].includes(g.id));
    }
    if (currentTopic.title.toLowerCase().includes('ekologiya') || currentTopic.title.toLowerCase().includes('biosfera')) {
      return GAME_CATALOG.filter(g => ['ecosystem_builder', 'detective', 'boss_battle'].includes(g.id));
    }
    return GAME_CATALOG.slice(0, 3);
  };

  const topicGames = getTopicGames();

  const handleFinishLesson = () => {
    if (!isCompleted) {
      completeTopic(currentTopic.id);
    }
  };

  const handleAskBioBot = () => {
    setBioBotTopicContext(`${currentTopic.grade}-sinf: ${currentTopic.title}`);
    setIsBioBotOpen(true);
  };

  // Fallback high-fidelity SVG illustration for the topic
  const renderTopicIllustration = () => {
    if (currentTopic.title.toLowerCase().includes('yurak') || currentTopic.id.includes('heart')) {
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
          <path d="M130,90 C130,30 200,20 200,80 L180,95 C180,55 145,55 145,90 Z" fill="url(#artGrad)" />
          <rect x="80" y="30" width="30" height="70" rx="8" fill="url(#venGrad)" />
          <path d="M70,95 C50,110 50,160 90,175 C105,175 115,150 115,120 Z" fill="url(#venGrad)" stroke="#1e3a8a" strokeWidth="2" />
          <path d="M190,95 C210,110 210,150 190,170 C175,170 165,145 165,115 Z" fill="url(#artGrad)" stroke="#7f1d1d" strokeWidth="2" />
          <path d="M90,170 C90,215 125,240 140,245 L140,165 Z" fill="#2563eb" stroke="#1e40af" strokeWidth="2" />
          <path d="M140,165 L140,245 C170,240 210,205 200,160 Z" fill="url(#artGrad)" stroke="#991b1b" strokeWidth="3" />
        </svg>
      );
    }

    if (currentTopic.title.toLowerCase().includes('dnk') || currentTopic.title.toLowerCase().includes('genetika') || currentTopic.title.toLowerCase().includes('mendel')) {
      return (
        <svg viewBox="0 0 320 240" className="w-full h-56 max-w-sm mx-auto">
          <g transform="translate(60, 20)">
            {[30, 65, 100, 135, 170].map((y, idx) => {
              const spread = Math.sin((y / 200) * Math.PI * 3.5) * 50;
              return (
                <g key={y}>
                  <line x1={100 - spread} y1={y} x2={100} y2={y} stroke={idx % 2 === 0 ? "#ef4444" : "#10b981"} strokeWidth="5" strokeLinecap="round" />
                  <line x1={100} y1={y} x2={100 + spread} y2={y} stroke={idx % 2 === 0 ? "#f59e0b" : "#3b82f6"} strokeWidth="5" strokeLinecap="round" />
                </g>
              );
            })}
            <path d="M 50,20 C 80,55 150,95 150,135 C 150,175 60,200 60,210" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" />
            <path d="M 150,20 C 120,55 50,95 50,135 C 50,175 140,200 140,210" fill="none" stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>
      );
    }

    // Default cell / biology graphic
    return (
      <svg viewBox="0 0 320 240" className="w-full h-56 max-w-sm mx-auto">
        <path d="M40,120 C30,60 100,30 180,40 C250,50 280,100 270,160 C260,220 200,245 120,235 C50,225 45,180 40,120 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="4" opacity="0.9" />
        <circle cx="150" cy="130" r="38" fill="#7e22ce" stroke="#581c87" strokeWidth="2" />
        <circle cx="140" cy="120" r="14" fill="#3b0764" />
        <rect x="70" y="160" width="38" height="18" rx="9" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
        <rect x="200" y="80" width="34" height="16" rx="8" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Top Navigation & Controls */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveView('textbook')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Darslik mundarijasiga qaytish
        </button>

        <div className="flex items-center gap-2">
          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavoriteTopic(currentTopic.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-600'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-rose-500'
            }`}
            title="Sevimlilarga qo'shish"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Ask BioBot */}
          <button
            onClick={handleAskBioBot}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-emerald-500/20 transition-all hover:scale-102"
          >
            <Bot className="w-4 h-4" />
            BioBotdan so'rash
          </button>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-8 text-8xl opacity-10 select-none">
          {currentTopic.icon}
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              {currentTopic.grade}-sinf Biologiya
            </span>
            <span className="flex items-center gap-1 text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              {currentTopic.estimatedMinutes} daqiqa
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40">
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

      {/* 🖼️ Mavzuga Oid Sifatli Rasm & Diagramma (Sections 5-7 in Prompt) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-left">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Mavzuning Ilmiy Tasviri
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              🖼️ {currentTopic.title} tuzilishi
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
      <div className="space-y-8">
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

      {/* 🎮 SHU MAVZUGA OID O'YINLAR (Section 55 in User Prompt) */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎮</span>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                SHU MAVZUGA OID O'YINLAR
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                O'rganilgan ma'lumotlarni o'yin shaklida mustahkamlang va XP oling
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

      {/* 📝 O'ZINGIZNI SINAB KO'RING (5-10 ta turli xil savollar) */}
      <QuickQuizSection
        questions={currentTopic.quickQuestions}
        topicId={currentTopic.id}
        onFinished={handleFinishLesson}
      />

      {/* 🎉 Dars Yakuni Kartochkasi */}
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
              Siz "{currentTopic.title}" mavzusini o'rgandingiz. Bilimingizni mustahkamlash uchun o'yinlar yoki test markazidan foydalaning!
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

            {nextTopic && (
              <button
                onClick={() => openTopic(nextTopic.id)}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                Keyingi mavzu
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveView('games')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-3 border border-white/5"
          >
            <span className="text-2xl">🎮</span>
            <div>
              <span className="text-xs text-slate-400 block font-medium">O'rganilgan mavzudan</span>
              <span className="text-sm font-bold text-white">Biologiya o'yinlari</span>
            </div>
          </button>

          <button
            onClick={() => setActiveView('tests')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-3 border border-white/5"
          >
            <span className="text-2xl">📝</span>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Bilimni baholash</span>
              <span className="text-sm font-bold text-white">Test Markazi</span>
            </div>
          </button>

          <button
            onClick={handleAskBioBot}
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
