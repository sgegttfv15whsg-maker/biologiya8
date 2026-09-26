import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GAME_CATALOG,
  GUESS_PICTURE_ITEMS,
  MATCH_PAIR_SETS,
  WORD_SEARCH_GRIDS,
  CROSSWORD_DATA,
  DETECTIVE_CASES
} from '../../data/gamesData';
import { GENERAL_TEST_QUESTIONS } from '../../data/curriculumData';
import { soundManager } from '../../utils/audio';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Lightbulb,
  Check,
  ChevronRight,
  Flame,
  Beaker,
  Volume2,
  VolumeX,
  Zap,
  ZoomIn,
  Shield,
  Heart
} from 'lucide-react';

export const ActiveGamePlayer: React.FC = () => {
  const {
    activeGameId,
    setActiveView,
    recordGamePlayed,
    addXP,
    triggerCelebration,
    soundEnabled,
    toggleSound
  } = useApp();

  const game = GAME_CATALOG.find(g => g.id === activeGameId) || GAME_CATALOG[0];

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');

  // Combo counter for Rapid Fire / Bio Race
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // 1. Hujayra Laboratoriyasi (CellBuilder) state
  const cellOrganelles = [
    { id: 'nucleus', label: 'Yadro', desc: 'Genetik axborot (DNK) saqlanadi', slot: 'center' },
    { id: 'mitochondria', label: 'Mitoxondriya', desc: 'ATF (energiya) sintezlanadi', slot: 'bottom-left' },
    { id: 'ribosome', label: 'Ribosoma', desc: 'Oqsillar biosintezlanadi', slot: 'top-left' },
    { id: 'golgi', label: 'Golji apparati', desc: 'Moddalar saralanadi va qadoqlanadi', slot: 'right' },
    { id: 'membrane', label: 'Membrana', desc: 'Hujayra chegarasi va himoyasi', slot: 'outer' },
    { id: 'vacuole', label: 'Vakuola', desc: 'Suv va moddalar rezervuari', slot: 'top-right' },
  ];
  const [placedOrganelles, setPlacedOrganelles] = useState<{ [id: string]: boolean }>({});
  const [selectedOrganelleToPlace, setSelectedOrganelleToPlace] = useState<string | null>(null);

  // 2. DNK Laboratoriyasi state
  const dnaTargetBases = ['A', 'T', 'G', 'C', 'A', 'C', 'T', 'G'];
  const compMap: { [k: string]: string } = { A: 'T', T: 'A', G: 'C', C: 'G' };
  const [dnaUserBases, setDnaUserBases] = useState<(string | null)[]>(new Array(8).fill(null));

  // 3. Organlarni Joylashtir state
  const torsoSlots = [
    { id: 'brain', label: 'Miya', top: '10%', left: '50%', info: 'Boshqaruv markazi va oliy asab faoliyati' },
    { id: 'heart', label: 'Yurak', top: '30%', left: '55%', info: 'Qonni butun tanaga haydovchi muskul nasos' },
    { id: 'lungs', label: "O'pka", top: '30%', left: '25%', info: 'Alveolalarda gazlar almashinuvi' },
    { id: 'liver', label: 'Jigar', top: '48%', left: '30%', info: 'Zaharlarni zararsizlantirish va o\'t suyuqligi' },
    { id: 'stomach', label: 'Oshqozon', top: '48%', left: '60%', info: 'Xlorid kislota va pepsin bilan hazm qilish' },
    { id: 'kidneys', label: 'Buyrak', top: '65%', left: '45%', info: 'Qonni filtrlash va siydik hosil qilish' },
  ];
  const [placedTorsoOrgans, setPlacedTorsoOrgans] = useState<{ [id: string]: boolean }>({});
  const [selectedTorsoOrgan, setSelectedTorsoOrgan] = useState<string | null>(null);

  // 4. O'simlik Ustasi state
  const [plantStage, setPlantStage] = useState(0); // 0: Urug', 1: Nihol, 2: O'simlik, 3: Gullash, 4: Meva
  const [plantSun, setPlantSun] = useState(20);
  const [plantWater, setPlantWater] = useState(20);
  const [plantMinerals, setPlantMinerals] = useState(20);

  // 5. Virtual Mikroskop state
  const [microscopeZoom, setMicroscopeZoom] = useState<'40x' | '100x' | '400x' | '1000x'>('100x');
  const [microscopeSpecimen, setMicroscopeSpecimen] = useState(0);
  const specimensList = [
    { title: "Piyoz po'sti hujayralari", type: "O'simlik hujayrasi", zoomDesc: "Tsellyuloza devor va yadro aniq ko'rinadi" },
    { title: "Inson qoni surtmasi", type: "Eritrotsitlar", zoomDesc: "Yadrosiz disksimon qizil qon hujayralari" },
    { title: "Bakteriyalar koloniyasi", type: "Prokariotlar", zoomDesc: "Hujayra yadrosi shakllanmagan tayoqchasimon tuzilmalar" },
  ];

  // 6. Xotira o'yini state
  const memoryItems = [
    { id: 1, name: 'Yurak', icon: '🫀' },
    { id: 2, name: 'DNK', icon: '🧬' },
    { id: 3, name: 'Xloroplast', icon: '🌱' },
    { id: 4, name: 'Bosh miya', icon: '🧠' },
    { id: 5, name: 'Mikroskop', icon: '🔬' },
    { id: 6, name: 'Mitoxondriya', icon: '⚡' },
  ];
  const [cards, setCards] = useState<{ uid: number; id: number; name: string; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // 8. Biolog Detektiv state
  const [detectiveCaseIdx, setDetectiveCaseIdx] = useState(0);
  const [detectiveCluesCount, setDetectiveCluesCount] = useState(1);
  const [detectiveSelected, setDetectiveSelected] = useState<string | null>(null);

  // 9. Tezkor Biolog (60 soniya) state
  const [rapidQuestions, setRapidQuestions] = useState<any[]>([]);
  const [rapidQIdx, setRapidQIdx] = useState(0);
  const [rapidTimer, setRapidTimer] = useState(60);

  // 10. Biologiya Poygasi state
  const [raceStep, setRaceStep] = useState(0); // 0 to 5
  const raceStages = [
    { name: "Genetika dovoni", question: "DNK da A ga qaysi asos mos keladi?", options: ["Timin", "Guanin", "Uratsil", "Sitotsin"], correct: 0 },
    { name: "Anatomiya ko'prigi", question: "Yurakning qaysi qorinchasi devori qalinroq?", options: ["Chap qorincha", "O'ng qorincha", "Ikkalasi teng", "Bo'lmachalar"], correct: 0 },
    { name: "Botanika vodiysi", question: "Fotosintezda kislorod qaysi moddaning parchalanishidan kelib chiqadi?", options: ["Suv (H2O)", "CO2", "Glyukoza", "ATF"], correct: 0 },
    { name: "Mikrobiologiya siri", question: "Bakteriyalar qaysi guruhga kiradi?", options: ["Prokariotlar", "Eukariotlar", "Viruslar", "Zamburug'lar"], correct: 0 },
    { name: "Ekologiya marrasi", question: "Oziq zanjirida organik moddani minerallargacha kim parchalaydi?", options: ["Redutsentlar", "Produtsentlar", "Konsumentlar", "Yirtqichlar"], correct: 0 },
  ];

  // 11. Ekotizim Quruvchisi state
  const [ecoProducers, setEcoProducers] = useState(50);
  const [ecoHerbivores, setEcoHerbivores] = useState(30);
  const [ecoCarnivores, setEcoCarnivores] = useState(10);
  const isEcoBalanced = ecoProducers >= ecoHerbivores * 1.5 && ecoHerbivores >= ecoCarnivores * 1.5;

  // 12. Virtual Laboratoriya state
  const [labTab, setLabTab] = useState<1 | 2 | 3>(1);
  const [lightLevel, setLightLevel] = useState(60);
  const [co2Amount, setCo2Amount] = useState(50);
  const [isPlasmolyzed, setIsPlasmolyzed] = useState(false);
  const [iodineTested, setIodineTested] = useState(false);

  // 13. Boss Battle state
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [bossStage, setBossStage] = useState(0);
  const bossChallenges = [
    { q: "Genetika Bossi: Aa x Aa chatishtirishda genotip bo'yicha qanday nisbat chiqadi?", opts: ["1:2:1", "3:1", "9:3:3:1", "1:1"], ans: 0 },
    { q: "Anatomiya Bossi: Katta qon aylanish doirasi qayerda tugaydi?", opts: ["O'ng bo'lmacha", "Chap bo'lmacha", "O'ng qorincha", "O'pka"], ans: 0 },
    { q: "Sitologiya Bossi: Qaysi organoid ikki qavat membranali va o'z DNKsiga ega?", opts: ["Mitoxondriya", "Ribosoma", "Lizosoma", "Golji"], ans: 0 },
  ];

  // 14. Rasmni Top (20% - 100%) state
  const [revealPct, setRevealPct] = useState(20);
  const [guessPicIdx, setGuessPicIdx] = useState(0);

  // 15. Genetika Eksperti state
  const [genotypeP1, setGenotypeP1] = useState('Aa');
  const [genotypeP2, setGenotypeP2] = useState('Aa');
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null);

  // 16. Ketma-ketlikni Top state
  const sequenceItemsInit = [
    "Telofaza (yangi yadrolar hosil bo'lishi)",
    "Profaza (xromatin iplarining spiralga aylanishi)",
    "Anafaza (xromatidalarning qutblarga tarqalishi)",
    "Metafaza (xromosomalarning ekvatorda tizilishi)"
  ];
  const [userSequence, setUserSequence] = useState<string[]>([...sequenceItemsInit]);
  const correctSequenceOrder = [
    "Profaza (xromatin iplarining spiralga aylanishi)",
    "Metafaza (xromosomalarning ekvatorda tizilishi)",
    "Anafaza (xromatidalarning qutblarga tarqalishi)",
    "Telofaza (yangi yadrolar hosil bo'lishi)"
  ];

  // Init questions
  useEffect(() => {
    const raw = [
      ...GENERAL_TEST_QUESTIONS[8],
      ...GENERAL_TEST_QUESTIONS[9],
      ...GENERAL_TEST_QUESTIONS[10],
      ...GENERAL_TEST_QUESTIONS[11]
    ];
    setRapidQuestions(raw.sort(() => Math.random() - 0.5).slice(0, 15));

    // Memory cards deck
    const deck = [...memoryItems, ...memoryItems]
      .sort(() => Math.random() - 0.5)
      .map((it, idx) => ({ ...it, uid: idx, flipped: false, matched: false }));
    setCards(deck);
  }, [activeGameId]);

  // 60-second timer for Rapid Fire
  useEffect(() => {
    if (game.id === 'rapid_fire' && !gameOver && rapidTimer > 0) {
      const interval = setInterval(() => {
        setRapidTimer(t => {
          if (t <= 1) {
            handleFinishGame(score);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [game.id, gameOver, rapidTimer, score]);

  const handleFinishGame = (finalScore: number) => {
    setScore(finalScore);
    setGameOver(true);
    triggerCelebration();
    recordGamePlayed(game.id, finalScore);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveView('games')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Game Centerga qaytish
        </button>

        <div className="flex items-center gap-2.5">
          {/* Sound Toggle Button (Section 53) */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-600'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? "Ovozni o'chirish (Audio OFF)" : "Ovozni yoqish (Audio ON)"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-200 dark:border-amber-800/60">
            <Trophy className="w-4 h-4 text-amber-500" />
            Ball: {score}
          </div>

          <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
            +{game.xpReward} XP
          </span>
        </div>
      </div>

      {/* Game Title Bar with Difficulty Selector (Section 32) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
            {game.icon}
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {game.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {game.description}
            </p>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs font-bold">
          {[
            { id: 'easy', label: '🟢 Oson' },
            { id: 'medium', label: '🟡 O\'rta' },
            { id: 'hard', label: '🟠 Qiyin' },
            { id: 'expert', label: '🔴 Ekspert' },
          ].map(d => (
            <button
              key={d.id}
              onClick={() => {
                soundManager.playClick();
                setDifficulty(d.id as any);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                difficulty === d.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Game Finish Modal / Screen (Section 28) */}
      {gameOver ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center text-4xl mb-4 animate-bounce">
            🏆
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            🎉 AJOYIB NATIJA!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Siz {score} ball to'pladingiz, maksimal combo: x{Math.max(maxCombo, combo, 1)} va +{game.xpReward} XP qo'lga kiritdingiz!
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                soundManager.playClick();
                setGameOver(false);
                setScore(0);
                setCombo(0);
                setPlacedOrganelles({});
                setPlacedTorsoOrgans({});
                setPlantStage(0);
                setRaceStep(0);
                setBossHp(100);
                setRapidTimer(60);
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta o'ynash
            </button>
            <button
              onClick={() => setActiveView('games')}
              className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm transition-all"
            >
              Boshqa o'yin tanlash
            </button>
          </div>
        </div>
      ) : (
        /* Dynamic Game Play Area */
        <div className="space-y-6">
          {/* ================= 1. HUJAYRA LABORATORIYASI (CELL BUILDER) ================= */}
          {game.id === 'cell_builder' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Organoidni tanlang va hujayradagi mos nuqtaga joylashtiring
              </span>

              {/* Cell Workspace */}
              <div className="relative w-full max-w-md h-72 mx-auto my-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-950 dark:to-amber-950/20 rounded-full border-4 border-dashed border-amber-300 dark:border-amber-700 p-6 flex items-center justify-center">
                {/* Slots */}
                {[
                  { id: 'nucleus', label: 'Yadro', top: '50%', left: '50%', w: 'w-20 h-20' },
                  { id: 'mitochondria', label: 'Mitoxondriya', top: '70%', left: '25%', w: 'w-16 h-12' },
                  { id: 'ribosome', label: 'Ribosoma', top: '30%', left: '25%', w: 'w-12 h-12' },
                  { id: 'golgi', label: 'Golji', top: '50%', left: '80%', w: 'w-14 h-14' },
                  { id: 'vacuole', label: 'Vakuola', top: '25%', left: '70%', w: 'w-14 h-14' },
                ].map(slot => {
                  const isFilled = placedOrganelles[slot.id];
                  return (
                    <button
                      key={slot.id}
                      onClick={() => {
                        if (selectedOrganelleToPlace === slot.id) {
                          soundManager.playCorrect();
                          setPlacedOrganelles(prev => ({ ...prev, [slot.id]: true }));
                          setScore(s => s + 20);
                          setSelectedOrganelleToPlace(null);
                          if (Object.keys(placedOrganelles).length + 1 >= 5) {
                            handleFinishGame(100);
                          }
                        } else {
                          soundManager.playError();
                        }
                      }}
                      style={{ top: slot.top, left: slot.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 ${slot.w} rounded-full border-2 text-[11px] font-bold flex items-center justify-center transition-all ${
                        isFilled
                          ? 'bg-emerald-500 text-white border-white shadow-lg animate-scale-up'
                          : 'border-dashed border-amber-400 dark:border-amber-600 bg-white/70 dark:bg-slate-800/80 text-amber-800 dark:text-amber-200 hover:scale-105'
                      }`}
                    >
                      {isFilled ? `✅ ${slot.label}` : slot.label}
                    </button>
                  );
                })}
              </div>

              {/* Organelle Palette */}
              <div className="flex flex-wrap justify-center gap-2">
                {cellOrganelles.slice(0, 5).map(org => {
                  const isPlaced = placedOrganelles[org.id];
                  const isSelected = selectedOrganelleToPlace === org.id;

                  return (
                    <button
                      key={org.id}
                      disabled={isPlaced}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedOrganelleToPlace(org.id);
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                        isPlaced
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50'
                          : isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                      }`}
                    >
                      {org.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 2. DNK LABORATORIYASI ================= */}
          {game.id === 'build_dna' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                A ↔ T (2 ta vodorod bog') • G ↔ C (3 ta vodorod bog')
              </span>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Yuqorigi zanjirga komplementar asoslarni tanlang va DNK qo'sh spiralini hosil qiling
              </p>

              <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-4">
                {dnaTargetBases.map((base, idx) => {
                  const userChoice = dnaUserBases[idx];
                  const isCorrect = userChoice === compMap[base];

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center shadow-md">
                        {base}
                      </div>

                      <div className="h-6 flex flex-col justify-center items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        {(base === 'G' || base === 'C') && (
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        )}
                      </div>

                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 font-black flex items-center justify-center transition-all ${
                          userChoice === null
                            ? 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400'
                            : isCorrect
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-rose-500 border-rose-500 text-white'
                        }`}
                      >
                        {userChoice || '?'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-center gap-3">
                {['A', 'T', 'G', 'C'].map(letter => (
                  <button
                    key={letter}
                    onClick={() => {
                      const nextEmptyIdx = dnaUserBases.findIndex(x => x === null);
                      if (nextEmptyIdx !== -1) {
                        const isRight = letter === compMap[dnaTargetBases[nextEmptyIdx]];
                        if (isRight) {
                          soundManager.playCorrect();
                          setScore(s => s + 15);
                        } else {
                          soundManager.playError();
                        }
                        const next = [...dnaUserBases];
                        next[nextEmptyIdx] = letter;
                        setDnaUserBases(next);

                        if (nextEmptyIdx === dnaTargetBases.length - 1) {
                          const allRight = next.every((b, i) => b === compMap[dnaTargetBases[i]]);
                          if (allRight) {
                            handleFinishGame(120);
                          }
                        }
                      }
                    }}
                    className="w-14 h-14 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-lg shadow-md transition-all active:scale-95"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= 3. ORGANLARNI JOYLASHTIR ================= */}
          {game.id === 'place_organs' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Organ nomini bosing, so'ng inson gavdasidagi unga mos o'rnini ko'rsating:
              </p>

              <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                {/* Torso */}
                <div className="relative w-64 h-96 bg-slate-100 dark:bg-slate-950 rounded-3xl border-2 border-slate-300 dark:border-slate-700 p-4">
                  {torsoSlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => {
                        if (selectedTorsoOrgan === slot.label) {
                          soundManager.playCorrect();
                          setPlacedTorsoOrgans(prev => ({ ...prev, [slot.id]: true }));
                          setScore(s => s + 20);
                          setSelectedTorsoOrgan(null);
                          if (Object.keys(placedTorsoOrgans).length + 1 >= torsoSlots.length) {
                            handleFinishGame(120);
                          }
                        } else {
                          soundManager.playError();
                        }
                      }}
                      style={{ top: slot.top, left: slot.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        placedTorsoOrgans[slot.id]
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-white dark:bg-slate-800 border-dashed border-slate-400 text-slate-600 dark:text-slate-400 hover:border-emerald-500'
                      }`}
                    >
                      {placedTorsoOrgans[slot.id] ? `✅ ${slot.label}` : slot.label}
                    </button>
                  ))}
                </div>

                {/* Available Organs */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 block mb-2">A'zolarni tanlang:</span>
                  {torsoSlots.map(org => {
                    const isPlaced = placedTorsoOrgans[org.id];
                    const isSelected = selectedTorsoOrgan === org.label;
                    return (
                      <button
                        key={org.id}
                        disabled={isPlaced}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedTorsoOrgan(org.label);
                        }}
                        className={`w-full px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                          isPlaced
                            ? 'bg-slate-100 text-slate-400 opacity-40'
                            : isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {org.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. O'SIMLIK USTASI (PLANT MASTER) ================= */}
          {game.id === 'plant_master' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                O'simlik rivojlanish bosqichlari: Urug' → Nihol → O'simlik → Gullash → Meva
              </span>

              {/* Plant Visual */}
              <div className="w-56 h-56 mx-auto bg-gradient-to-b from-sky-100 to-emerald-100 dark:from-slate-950 dark:to-emerald-950/40 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col justify-end items-center p-4">
                <div className="text-6xl mb-2 animate-bounce">
                  {plantStage === 0 ? '🌰' : plantStage === 1 ? '🌱' : plantStage === 2 ? '🌿' : plantStage === 3 ? '🌸' : '🍎'}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Bosqich: {plantStage === 0 ? "Urug'" : plantStage === 1 ? "Nihol" : plantStage === 2 ? "Voyaga yetgan o'simlik" : plantStage === 3 ? "Gullash" : "Shirin Meva!"}
                </span>
              </div>

              {/* Resources */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <button
                  onClick={() => {
                    soundManager.playCorrect();
                    setPlantSun(s => s + 20);
                    if (plantSun > 50 && plantWater > 50) {
                      setPlantStage(st => Math.min(st + 1, 4));
                      setScore(s => s + 25);
                      if (plantStage >= 3) handleFinishGame(100);
                    }
                  }}
                  className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-200 font-bold text-xs"
                >
                  ☀️ Quyosh berish ({plantSun}%)
                </button>
                <button
                  onClick={() => {
                    soundManager.playCorrect();
                    setPlantWater(w => w + 20);
                    if (plantSun > 50 && plantWater > 50) {
                      setPlantStage(st => Math.min(st + 1, 4));
                      setScore(s => s + 25);
                      if (plantStage >= 3) handleFinishGame(100);
                    }
                  }}
                  className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 text-sky-800 dark:text-sky-200 font-bold text-xs"
                >
                  💧 Sug'orish ({plantWater}%)
                </button>
                <button
                  onClick={() => {
                    soundManager.playCorrect();
                    setPlantMinerals(m => m + 20);
                  }}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-200 font-bold text-xs"
                >
                  🧪 Ozuqa ({plantMinerals}%)
                </button>
              </div>
            </div>
          )}

          {/* ================= 5. VIRTUAL MIKROSKOP ================= */}
          {game.id === 'microscope' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-emerald-600">
                  Preparat: {specimensList[microscopeSpecimen].title}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800">
                  Kattalashtirish: {microscopeZoom}
                </span>
              </div>

              {/* Circular Eyepiece View */}
              <div className="w-64 h-64 mx-auto rounded-full bg-slate-950 border-8 border-slate-700 shadow-2xl relative overflow-hidden flex items-center justify-center p-4">
                <div className={`transition-transform duration-500 text-center ${
                  microscopeZoom === '40x' ? 'scale-75' : microscopeZoom === '100x' ? 'scale-100' : microscopeZoom === '400x' ? 'scale-125' : 'scale-150'
                }`}>
                  <div className="text-6xl mb-2">
                    {microscopeSpecimen === 0 ? '🌿' : microscopeSpecimen === 1 ? '🩸' : '🦠'}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    {specimensList[microscopeSpecimen].zoomDesc}
                  </span>
                </div>
              </div>

              {/* Microscope Controls */}
              <div className="flex flex-wrap justify-center gap-2">
                {(['40x', '100x', '400x', '1000x'] as const).map(z => (
                  <button
                    key={z}
                    onClick={() => {
                      soundManager.playClick();
                      setMicroscopeZoom(z);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      microscopeZoom === z ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundManager.playCorrect();
                    setMicroscopeSpecimen(s => (s + 1) % specimensList.length);
                    setScore(sc => sc + 20);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs"
                >
                  Keyingi preparatni qo'yish
                </button>
                <button
                  onClick={() => handleFinishGame(80)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  O'rganishni yakunlash
                </button>
              </div>
            </div>
          )}

          {/* ================= 9. TEZKOR BIOLOG (60 SONIYA & COMBO) ================= */}
          {game.id === 'rapid_fire' && rapidQuestions[rapidQIdx] && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-emerald-600">
                    Savol {rapidQIdx + 1}
                  </span>
                  {combo > 1 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white font-black text-xs animate-bounce flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {combo >= 5 ? '🔥 COMBO x' + combo : 'x' + combo}
                    </span>
                  )}
                </div>

                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold bg-amber-100 text-amber-800">
                  <Clock className="w-3.5 h-3.5" />
                  {rapidTimer} soniya
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {rapidQuestions[rapidQIdx].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rapidQuestions[rapidQIdx].options.map((opt: string, optIdx: number) => (
                  <button
                    key={optIdx}
                    onClick={() => {
                      const isCorrect = optIdx === rapidQuestions[rapidQIdx].correctIndex;
                      if (isCorrect) {
                        soundManager.playCorrect();
                        const nextCombo = combo + 1;
                        setCombo(nextCombo);
                        setMaxCombo(m => Math.max(m, nextCombo));
                        setScore(s => s + 10 * Math.min(nextCombo, 4));
                      } else {
                        soundManager.playError();
                        setCombo(0);
                      }

                      if (rapidQIdx + 1 < rapidQuestions.length) {
                        setRapidQIdx(i => i + 1);
                      } else {
                        handleFinishGame(score + 20);
                      }
                    }}
                    className="p-4 rounded-2xl border text-left text-sm font-semibold transition-all bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= 10. BIOLOGIYA POYGASI ================= */}
          {game.id === 'bio_race' && raceStages[raceStep] && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Trail Progress */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Marragacha: {raceStep} / {raceStages.length} bosqich</span>
                  <span>🏃 Biologiya Poygasi</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(raceStep / raceStages.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
                  {raceStages[raceStep].name}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {raceStages[raceStep].question}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {raceStages[raceStep].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (oIdx === raceStages[raceStep].correct) {
                        soundManager.playCorrect();
                        setScore(s => s + 25);
                        if (raceStep + 1 >= raceStages.length) {
                          handleFinishGame(125);
                        } else {
                          setRaceStep(s => s + 1);
                        }
                      } else {
                        soundManager.playError();
                      }
                    }}
                    className="p-4 rounded-2xl border text-left text-sm font-semibold transition-all bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-800 dark:text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= 11. EKOTIZIM QURUVCHISI ================= */}
          {game.id === 'ecosystem_builder' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-emerald-600">
                  Trofik Piramida va Ekotizim Muvozanati
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isEcoBalanced ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {isEcoBalanced ? '🌍 EKOTIZIM BARQAROR!' : '⚠️ Muvozanat buzilgan'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 block">🌱 Produtsentlar (O'simliklar)</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={ecoProducers}
                    onChange={e => setEcoProducers(Number(e.target.value))}
                    className="w-full mt-2 accent-emerald-600"
                  />
                  <span className="text-xs font-bold mt-1 block">{ecoProducers} birlik</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800 block">🐇 Konsument 1 (O'txo'rlar)</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={ecoHerbivores}
                    onChange={e => setEcoHerbivores(Number(e.target.value))}
                    className="w-full mt-2 accent-amber-600"
                  />
                  <span className="text-xs font-bold mt-1 block">{ecoHerbivores} birlik</span>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                  <span className="text-xs font-bold text-rose-800 block">🦊 Konsument 2 (Yirtqichlar)</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={ecoCarnivores}
                    onChange={e => setEcoCarnivores(Number(e.target.value))}
                    className="w-full mt-2 accent-rose-600"
                  />
                  <span className="text-xs font-bold mt-1 block">{ecoCarnivores} birlik</span>
                </div>
              </div>

              {isEcoBalanced && (
                <button
                  onClick={() => handleFinishGame(100)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  Barqaror ekotizimni tasdiqlash (+40 XP)
                </button>
              )}
            </div>
          )}

          {/* ================= 13. BIOLOGIK BOSS BATTLE ================= */}
          {game.id === 'boss_battle' && bossChallenges[bossStage] && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-rose-500/40 shadow-xl space-y-6">
              {/* Boss HP Bar */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-rose-400">👾 GENETIKA & ANATOMIYA BOSSI</span>
                  <span className="font-mono">{bossHp} / 100 HP</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {bossChallenges[bossStage].q}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bossChallenges[bossStage].opts.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (oIdx === bossChallenges[bossStage].ans) {
                        soundManager.playCorrect();
                        const nextHp = Math.max(0, bossHp - 40);
                        setBossHp(nextHp);
                        setScore(s => s + 35);
                        if (nextHp <= 0 || bossStage + 1 >= bossChallenges.length) {
                          handleFinishGame(150);
                        } else {
                          setBossStage(s => s + 1);
                        }
                      } else {
                        soundManager.playError();
                        setPlayerHp(p => Math.max(0, p - 25));
                      }
                    }}
                    className="p-4 rounded-2xl border text-left text-sm font-semibold transition-all bg-slate-50 dark:bg-slate-800 hover:border-rose-500 text-slate-800 dark:text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= 14. RASMNI TOP (20% - 100%) ================= */}
          {game.id === 'guess_picture' && GUESS_PICTURE_ITEMS[guessPicIdx] && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
              <div className="flex justify-between items-center pb-2">
                <span className="text-xs font-bold text-emerald-600 uppercase">
                  Ochilish darajasi: {revealPct}%
                </span>
                <span className="text-xs text-slate-400">
                  Kam foizda topsangiz ko'proq ball beriladi!
                </span>
              </div>

              {/* Progressively masked image/svg */}
              <div className="w-56 h-56 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-center relative overflow-hidden">
                <div style={{ filter: `blur(${revealPct === 20 ? '12px' : revealPct === 50 ? '5px' : '0px'})` }} className="transition-all duration-300">
                  <div className="text-7xl">
                    {guessPicIdx === 0 ? '⚡' : guessPicIdx === 1 ? '🌱' : '🩸'}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setRevealPct(50)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  50% ochish (-5 ball)
                </button>
                <button
                  onClick={() => setRevealPct(100)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  100% ochish (-10 ball)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {GUESS_PICTURE_ITEMS[guessPicIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (opt === GUESS_PICTURE_ITEMS[guessPicIdx].name) {
                        soundManager.playCorrect();
                        const gain = revealPct === 20 ? 40 : revealPct === 50 ? 25 : 15;
                        setScore(s => s + gain);
                        if (guessPicIdx + 1 < GUESS_PICTURE_ITEMS.length) {
                          setGuessPicIdx(i => i + 1);
                          setRevealPct(20);
                        } else {
                          handleFinishGame(score + gain);
                        }
                      } else {
                        soundManager.playError();
                      }
                    }}
                    className="p-3.5 rounded-2xl border text-sm font-bold bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-slate-800 dark:text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= 16. KETMA-KETLIKNI TOP ================= */}
          {game.id === 'sequence_puzzle' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase text-emerald-600 block text-center">
                Mitoz bo'linish fazalarini to'g'ri tartibda joylashtiring:
              </span>

              <div className="space-y-2 max-w-lg mx-auto">
                {userSequence.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm font-semibold"
                  >
                    <span>{idx + 1}. {item}</span>
                    <div className="flex gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          soundManager.playClick();
                          const next = [...userSequence];
                          const temp = next[idx];
                          next[idx] = next[idx - 1];
                          next[idx - 1] = temp;
                          setUserSequence(next);
                        }}
                        className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-xs disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        disabled={idx === userSequence.length - 1}
                        onClick={() => {
                          soundManager.playClick();
                          const next = [...userSequence];
                          const temp = next[idx];
                          next[idx] = next[idx + 1];
                          next[idx + 1] = temp;
                          setUserSequence(next);
                        }}
                        className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-xs disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    const isCorrect = userSequence.every((it, idx) => it === correctSequenceOrder[idx]);
                    if (isCorrect) {
                      soundManager.playCorrect();
                      handleFinishGame(100);
                    } else {
                      soundManager.playError();
                      alert("Ketma-ketlikda noaniqlik bor! Eslatma: Profaza → Metafaza → Anafaza → Telofaza.");
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase shadow-md"
                >
                  Tartibni tekshirish
                </button>
              </div>
            </div>
          )}

          {/* Fallback for other game types (Krossvord, Detective, Virtual Lab, Memory) */}
          {['memory_game', 'crossword', 'detective', 'virtual_lab', 'genetics_expert'].includes(game.id) && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {game.title}
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                {game.description}
              </p>
              <button
                onClick={() => {
                  soundManager.playVictory();
                  handleFinishGame(80);
                }}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
              >
                Topshiriqni yakunlash (+{game.xpReward} XP)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
