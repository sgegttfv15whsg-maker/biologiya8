export type GradeNumber = 8 | 9 | 10 | 11;

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  grade: GradeNumber;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedTopicIds: string[];
  favoriteTopicIds: string[];
  unlockedBadgeIds: string[];
  testScores: {
    testId: string;
    score: number;
    total: number;
    date: string;
    grade: GradeNumber;
    type: string;
  }[];
  gameStats: {
    gameId: string;
    playedCount: number;
    highScore: number;
  }[];
  dailyMissions: {
    id: string;
    title: string;
    xpReward: number;
    progress: number;
    target: number;
    completed: boolean;
  }[];
}

export interface CalloutBox {
  type: 'important' | 'fact' | 'remember' | 'didYouKnow';
  title: string;
  text: string;
}

export interface TopicSection {
  subtitle: string;
  content: string;
  bulletPoints?: string[];
  callout?: CalloutBox;
}

export interface DiagramHotspot {
  id: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  description: string;
  fact?: string;
}

export interface InteractiveDiagramData {
  id: string;
  type: 'cell' | 'plant_cell' | 'heart' | 'dna' | 'brain' | 'skeleton' | 'respiration' | 'leaf';
  title: string;
  subtitle: string;
  hotspots: DiagramHotspot[];
}

export interface QuickQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching' | 'sequence';
  question: string;
  options?: string[];
  correctAnswer: any; // index or boolean or string or array
  explanation: string;
  pairs?: { left: string; right: string }[];
  sequenceItems?: string[];
}

export interface Topic {
  id: string;
  grade: GradeNumber;
  chapterNumber: number;
  chapterTitle: string;
  orderNumber: number;
  title: string;
  icon: string;
  estimatedMinutes: number;
  summary: string;
  learningGoals: string[];
  sections: TopicSection[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  diagram?: InteractiveDiagramData;
  quickQuestions: QuickQuestion[];
  relatedGameIds?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'lesson' | 'test' | 'game' | 'streak' | 'expert';
  xpRequired?: number;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  firstName?: string;
  lastName?: string;
  grade: GradeNumber;
  dates: { [dateStr: string]: 'present' | 'absent' | 'excused' | 'late' };
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicId?: string;
  grade: GradeNumber;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface DailyFact {
  id: string;
  title: string;
  fact: string;
  category: string;
  tag: string;
}
