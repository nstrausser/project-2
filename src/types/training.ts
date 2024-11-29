export type TrainingMetrics = {
  overallProficiency: number;
  trainingHours: number;
  certifications: number;
  successRate: number;
  skillBreakdown: {
    skill: string;
    proficiency: number;
    level: 'high' | 'medium' | 'low';
  }[];
  recentAchievements: {
    title: string;
    date: string;
    type: 'certification' | 'skill' | 'milestone';
  }[];
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  duration: number;
  requiredSkills: string[];
  objectives: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  completionDate?: string;
  score?: number;
};

export type TrainingPlan = {
  id: string;
  installerId: string;
  startDate: string;
  endDate: string;
  modules: TrainingModule[];
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  notes?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  achievedDate: string;
  expiryDate: string;
  status: 'active' | 'expiring_soon' | 'expired';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  skills: string[];
  score: number;
};