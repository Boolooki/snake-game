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

export type PropsStartModal = {
  username: string;
  setUsername: (name: string) => void;
  onStart: () => void;
  hasStarted: boolean;
};

export type PropsControlButton = {
  isPaused: boolean;
  isGameOver: boolean;
  resetGame: () => void;
  onPauseToggle: () => void;
};

export type PropsBuffStatus = {
  isEnergyShield: boolean;
  isSpeedBurst: boolean;
};