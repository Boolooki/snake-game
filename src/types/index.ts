export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type LeaderboardEntry = {
  username: string;
  score: number;
  duration: number;
  powerupsUsed?: string[];
};