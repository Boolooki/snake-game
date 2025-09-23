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

export type PropsBoard = {
  snake: Position[];
  food: Position;
  energyShield: Position;
  bomb: Position[];
  speedBurst: Position;
  isEnergyShield: boolean;
  isSpeedBurst: boolean;
  isGameOver: boolean;
  isPaused: boolean;
};

export type PropsLanguage = {
  language: 'th' | 'en';
  onLangToggle: (lang: "th" | "en") => void;
};

