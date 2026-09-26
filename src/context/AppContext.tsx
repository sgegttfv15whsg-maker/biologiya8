import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GradeNumber, UserRole, UserProfile, Topic, AttendanceRecord } from '../types';
import { TOPICS, BADGES, INITIAL_ATTENDANCE } from '../data/curriculumData';
import { soundManager } from '../utils/audio';

export type ActiveView = 
  | 'home' 
  | 'textbook' 
  | 'topic_detail' 
  | 'tests' 
  | 'active_test' 
  | 'games' 
  | 'active_game' 
  | 'puzzles' 
  | 'attendance' 
  | 'profile' 
  | 'leaderboard' 
  | 'teacher_admin';

export interface CustomTopicImage {
  imageUrl: string;
  caption: string;
  altText: string;
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedGrade: GradeNumber;
  setSelectedGrade: (grade: GradeNumber) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  userProfile: UserProfile;
  addXP: (amount: number, reason?: string) => void;
  completeTopic: (topicId: string) => void;
  toggleFavoriteTopic: (topicId: string) => void;
  activeTopicId: string | null;
  openTopic: (topicId: string) => void;
  activeGameId: string | null;
  openGame: (gameId: string) => void;
  activeTestId: string | null;
  openTest: (testId: string) => void;
  recordTestScore: (testId: string, score: number, total: number, grade: GradeNumber, type: string) => void;
  recordGamePlayed: (gameId: string, score: number) => void;
  attendanceData: { [key: number]: AttendanceRecord[] };
  updateAttendance: (grade: GradeNumber, studentId: string, dateStr: string, status: 'present' | 'absent' | 'excused' | 'late') => void;
  addAttendanceDate: (grade: GradeNumber, dateStr: string) => void;
  addStudent: (grade: GradeNumber, firstName: string, lastName: string, customId?: string) => void;
  editStudent: (grade: GradeNumber, studentId: string, firstName: string, lastName: string) => void;
  deleteStudent: (grade: GradeNumber, studentId: string) => void;
  customTopicImages: { [topicId: string]: CustomTopicImage };
  addTopicImage: (topicId: string, imageUrl: string, caption: string, altText: string) => void;
  isBioBotOpen: boolean;
  setIsBioBotOpen: (open: boolean) => void;
  bioBotTopicContext: string;
  setBioBotTopicContext: (ctx: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  recentUnlockedBadge: string | null;
  clearRecentBadge: () => void;
  triggerCelebration: () => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const STORAGE_KEY_PROFILE = 'bio_maktab_profile_v2';
const STORAGE_KEY_ATTENDANCE = 'bio_maktab_attendance_v2';
const STORAGE_KEY_THEME = 'bio_maktab_theme_v2';
const STORAGE_KEY_IMAGES = 'bio_maktab_custom_images_v2';
const STORAGE_KEY_SOUND = 'bio_maktab_sound_v2';

const defaultProfile: UserProfile = {
  id: 'user-default-1',
  name: 'Azizbek Olimov',
  role: 'student',
  grade: 8,
  xp: 140,
  level: 2,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedTopicIds: ['topic-8-1'],
  favoriteTopicIds: ['topic-8-1', 'topic-9-1'],
  unlockedBadgeIds: ['first_lesson', 'cell_master'],
  testScores: [
    { testId: 'test-8-cell', score: 9, total: 10, date: '2026-09-24', grade: 8, type: 'topic' }
  ],
  gameStats: [
    { gameId: 'cell_builder', playedCount: 3, highScore: 80 },
    { gameId: 'guess_picture', playedCount: 2, highScore: 90 }
  ],
  dailyMissions: [
    { id: 'm1', title: '1 ta biologiya darsini o\'rganing', xpReward: 20, progress: 1, target: 1, completed: true },
    { id: 'm2', title: 'Test markazida 1 ta test yeching', xpReward: 30, progress: 1, target: 1, completed: true },
    { id: 'm3', title: 'Bitta biologiya o\'yinini o\'ynang', xpReward: 15, progress: 0, target: 1, completed: false }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber>(8);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [isBioBotOpen, setIsBioBotOpen] = useState(false);
  const [bioBotTopicContext, setBioBotTopicContext] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentUnlockedBadge, setRecentUnlockedBadge] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SOUND);
    return saved !== null ? saved === 'true' : true;
  });

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      soundManager.enabled = next;
      localStorage.setItem(STORAGE_KEY_SOUND, String(next));
      return next;
    });
  };

  useEffect(() => {
    soundManager.enabled = soundEnabled;
  }, [soundEnabled]);

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved !== null) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  // Attendance
  const [attendanceData, setAttendanceData] = useState<{ [key: number]: AttendanceRecord[] }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ATTENDANCE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ATTENDANCE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(attendanceData));
  }, [attendanceData]);

  // Custom Topic Images uploaded by teacher/admin
  const [customTopicImages, setCustomTopicImages] = useState<{ [topicId: string]: CustomTopicImage }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_IMAGES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(customTopicImages));
  }, [customTopicImages]);

  const addTopicImage = (topicId: string, imageUrl: string, caption: string, altText: string) => {
    setCustomTopicImages(prev => ({
      ...prev,
      [topicId]: { imageUrl, caption, altText }
    }));
    showNotification("Rasm mavzuga muvaffaqiyatli biriktirildi!");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const triggerCelebration = () => {
    soundManager.playVictory();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const addXP = (amount: number, reason?: string) => {
    soundManager.playCorrect();
    setUserProfile(prev => {
      const newXP = prev.xp + amount;
      const oldLevel = prev.level;
      const newLevel = Math.floor(newXP / 100) + 1;
      let unlockedBadgeIds = [...prev.unlockedBadgeIds];

      if (newLevel > oldLevel) {
        triggerCelebration();
        showNotification(`🎉 Tabriklaymiz! Siz ${newLevel}-darajaga (Level ${newLevel}) erishdingiz!`);
      } else if (reason) {
        showNotification(`⭐ +${amount} XP! (${reason})`);
      }

      // Check badge conditions
      if (newXP >= 300 && !unlockedBadgeIds.includes('rapid_biologist')) {
        unlockedBadgeIds.push('rapid_biologist');
        setRecentUnlockedBadge('rapid_biologist');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        unlockedBadgeIds
      };
    });
  };

  const completeTopic = (topicId: string) => {
    setUserProfile(prev => {
      if (prev.completedTopicIds.includes(topicId)) return prev;
      const newCompleted = [...prev.completedTopicIds, topicId];
      let newBadges = [...prev.unlockedBadgeIds];
      if (!newBadges.includes('first_lesson')) {
        newBadges.push('first_lesson');
        setRecentUnlockedBadge('first_lesson');
      }
      return {
        ...prev,
        completedTopicIds: newCompleted,
        unlockedBadgeIds: newBadges
      };
    });
    addXP(25, "Mavzu to'liq o'zlashtirildi");
    triggerCelebration();
  };

  const toggleFavoriteTopic = (topicId: string) => {
    soundManager.playClick();
    setUserProfile(prev => {
      const exists = prev.favoriteTopicIds.includes(topicId);
      const nextFavorites = exists
        ? prev.favoriteTopicIds.filter(id => id !== topicId)
        : [...prev.favoriteTopicIds, topicId];
      showNotification(exists ? "❤️ Sevimlilardan olib tashlandi" : "❤️ Sevimlilarga qo'shildi!");
      return {
        ...prev,
        favoriteTopicIds: nextFavorites
      };
    });
  };

  const openTopic = (topicId: string) => {
    soundManager.playClick();
    const topic = TOPICS.find(t => t.id === topicId);
    if (topic) {
      setSelectedGrade(topic.grade);
      setActiveTopicId(topicId);
      setActiveView('topic_detail');
    }
  };

  const openGame = (gameId: string) => {
    soundManager.playClick();
    setActiveGameId(gameId);
    setActiveView('active_game');
  };

  const openTest = (testId: string) => {
    soundManager.playClick();
    setActiveTestId(testId);
    setActiveView('active_test');
  };

  const recordTestScore = (testId: string, score: number, total: number, grade: GradeNumber, type: string) => {
    const percentage = Math.round((score / total) * 100);
    const xpReward = Math.round(percentage * 0.4) + 10;
    addXP(xpReward, `Test natijasi: ${score}/${total}`);

    setUserProfile(prev => {
      const updatedScores = [
        { testId, score, total, date: new Date().toISOString().split('T')[0], grade, type },
        ...prev.testScores
      ];
      let newBadges = [...prev.unlockedBadgeIds];
      if (percentage >= 90 && !newBadges.includes('quiz_champ')) {
        newBadges.push('quiz_champ');
        setRecentUnlockedBadge('quiz_champ');
      }
      return {
        ...prev,
        testScores: updatedScores,
        unlockedBadgeIds: newBadges
      };
    });
  };

  const recordGamePlayed = (gameId: string, score: number) => {
    addXP(20, "Biologiya o'yini o'ynaldi");
    setUserProfile(prev => {
      const existing = prev.gameStats.find(g => g.gameId === gameId);
      let newStats = [...prev.gameStats];
      if (existing) {
        newStats = newStats.map(g => g.gameId === gameId ? {
          ...g,
          playedCount: g.playedCount + 1,
          highScore: Math.max(g.highScore, score)
        } : g);
      } else {
        newStats.push({ gameId, playedCount: 1, highScore: score });
      }
      return {
        ...prev,
        gameStats: newStats
      };
    });
  };

  const updateAttendance = (grade: GradeNumber, studentId: string, dateStr: string, status: 'present' | 'absent' | 'excused' | 'late') => {
    soundManager.playClick();
    setAttendanceData(prev => {
      const gradeRecords = prev[grade] || [];
      const updated = gradeRecords.map(rec => {
        if (rec.studentId === studentId) {
          return {
            ...rec,
            dates: {
              ...rec.dates,
              [dateStr]: status
            }
          };
        }
        return rec;
      });
      return {
        ...prev,
        [grade]: updated
      };
    });
    showNotification("Davomat muvaffaqiyatli saqlandi!");
  };

  const addAttendanceDate = (grade: GradeNumber, dateStr: string) => {
    soundManager.playClick();
    setAttendanceData(prev => {
      const gradeRecords = prev[grade] || [];
      const updated = gradeRecords.map(rec => {
        if (!rec.dates[dateStr]) {
          return {
            ...rec,
            dates: {
              ...rec.dates,
              [dateStr]: 'present' as const
            }
          };
        }
        return rec;
      });
      return {
        ...prev,
        [grade]: updated
      };
    });
    showNotification(`Yangi sana (${dateStr}) davomat ro'yxatiga qo'shildi`);
  };

  // Student CRUD Operations
  const addStudent = (grade: GradeNumber, firstName: string, lastName: string, customId?: string) => {
    soundManager.playCorrect();
    const studentId = customId && customId.trim() ? customId.trim() : `st-${grade}-${Date.now()}`;
    const fullName = `${lastName.trim()} ${firstName.trim()}`;

    setAttendanceData(prev => {
      const existing = prev[grade] || [];
      // Inherit dates from first record or empty
      const sampleDates: { [d: string]: 'present' | 'absent' | 'excused' | 'late' } = {};
      if (existing.length > 0) {
        Object.keys(existing[0].dates).forEach(d => {
          sampleDates[d] = 'present';
        });
      }

      const newRecord: AttendanceRecord = {
        studentId,
        studentName: fullName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        grade,
        dates: sampleDates
      };

      return {
        ...prev,
        [grade]: [...existing, newRecord]
      };
    });
    showNotification(`Yangi o'quvchi (${fullName}) ${grade}-sinfga qo'shildi!`);
  };

  const editStudent = (grade: GradeNumber, studentId: string, firstName: string, lastName: string) => {
    soundManager.playClick();
    const fullName = `${lastName.trim()} ${firstName.trim()}`;
    setAttendanceData(prev => {
      const existing = prev[grade] || [];
      const updated = existing.map(st => {
        if (st.studentId === studentId) {
          return {
            ...st,
            studentName: fullName,
            firstName: firstName.trim(),
            lastName: lastName.trim()
          };
        }
        return st;
      });
      return {
        ...prev,
        [grade]: updated
      };
    });
    showNotification(`O'quvchi ma'lumotlari yangilandi: ${fullName}`);
  };

  const deleteStudent = (grade: GradeNumber, studentId: string) => {
    soundManager.playError();
    setAttendanceData(prev => {
      const existing = prev[grade] || [];
      const updated = existing.filter(st => st.studentId !== studentId);
      return {
        ...prev,
        [grade]: updated
      };
    });
    showNotification("O'quvchi ro'yxatdan o'chirildi");
  };

  const clearRecentBadge = () => setRecentUnlockedBadge(null);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedGrade,
        setSelectedGrade,
        currentRole,
        setCurrentRole,
        darkMode,
        toggleDarkMode,
        soundEnabled,
        toggleSound,
        userProfile,
        addXP,
        completeTopic,
        toggleFavoriteTopic,
        activeTopicId,
        openTopic,
        activeGameId,
        openGame,
        activeTestId,
        openTest,
        recordTestScore,
        recordGamePlayed,
        attendanceData,
        updateAttendance,
        addAttendanceDate,
        addStudent,
        editStudent,
        deleteStudent,
        customTopicImages,
        addTopicImage,
        isBioBotOpen,
        setIsBioBotOpen,
        bioBotTopicContext,
        setBioBotTopicContext,
        isSearchOpen,
        setIsSearchOpen,
        recentUnlockedBadge,
        clearRecentBadge,
        triggerCelebration,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
