export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  level: "explorer" | "engineer" | "scholar" | "theorist";
  xp: number;
}

export interface RoadmapProgress {
  nodeId: string;
  completedAt?: string;
  confidence: number;
}

export interface LearningSummary {
  lastSimulationRun?: string;
  lastQuizAttempt?: string;
  certificates: number;
}
