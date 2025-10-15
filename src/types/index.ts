export type Position = {
  x: number;
  y: number;
};

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type Language = "th" | "en";

export type LeaderboardEntry = {
  username: string;
  score: number;
  duration: number;
  powerupsUsed?: string[];
};

export type PropsStartModal = {
  username: string;
  setUsername: (name: string) => void;
  gameStart: () => void;
  hasStarted: boolean;
  language: "th" | "en";
  onLangToggle: (lang: "th" | "en") => void;
};

export type PropsControlButton = {
  isPaused: boolean;
  isGameOver: boolean;
  resetGame: () => void;
  onPauseToggle: () => void;
  countdown: number | null;
};

export type PropsBuffStatus = {
  isEnergyShield: number;
  isSpeedBurst: boolean;
  isDoubleScore: boolean;
  isExtendedBurst: boolean;
  isSlowSpeed: boolean;
  isMoreProduceMoretribute: boolean;
  isSafeHeaven: boolean;
  isPetrified: boolean;
  isChargingBehavior: boolean;
  isArmadilloLike: boolean;
  isNoLimitSpeed: boolean;
};

export type PropsBoard = {
  gridSize: { columns: number; rows: number };
  isShowWallAnimation: boolean;
  isTutorial: boolean;
  isBombAnimation: boolean;
  snake: Position[];
  snakefacedirction: Direction;
  foods: Position[];
  energyShields: Position[];
  bombs: Position[];
  speedBursts: Position[];
  isEnergyShield: number;
  isSpeedBurst: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  language: "th" | "en";
  countdown: number | null;
  showLevelUpNotification: boolean;
  upgradeQueue: boolean;
};

export type PropsLanguage = {
  language: "th" | "en";
  onLangToggle: (lang: "th" | "en") => void;
};
