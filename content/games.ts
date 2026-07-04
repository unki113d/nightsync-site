export type ManualMetrics = {
  mau?: number;
  d1Retention?: number;
  d7Retention?: number;
  averagePlaytimeMinutes?: number;
  released: string;
  updatedAt: string;
};

export type Game = {
  slug: string;
  universeId: number;
  title: string;
  summary: string;
  contribution: string;
  image: string;
  robloxUrl: string;
  rotrendsUrl?: string;
  manualMetrics: ManualMetrics;
  fallbackMetrics?: {
    playing?: number;
    visits?: number;
  };
  published: boolean;
};

// Replace these four safe placeholders with real project details, then set
// published to true. Unpublished entries never appear on the public page.
export const games: Game[] = [
  {
    slug: "1-speed-poppy-escape",
    universeId: 9594261819,
    title: "+1 Speed Poppy Escape",
    summary: "Escape from the Evil Huggy and gain Speed with each step!",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/poppy-escape.jpg",
    robloxUrl: "https://www.roblox.com/games/72152217243316/1-Speed-Poppy-Escape",
    rotrendsUrl: "https://rotrends.com/game/9594261819/1-Speed-Poppy-Escape",
    manualMetrics: {
      mau: 1150000,
      averagePlaytimeMinutes: 16.1,
      released: "January 30, 2026",
      updatedAt: "July 2026",
    },
    published: true,
  },
  {
    slug: "Defend-King",
    universeId: 10350638203,
    title: "Defend Your King!",
    summary: "Defend your King and survive the monster invasion! ⚔️",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/defend-your-king.jpg",
    robloxUrl: "https://www.roblox.com/games/127166560850111/Defend-Your-King",
    rotrendsUrl: "https://rotrends.com/game/10350638203/Defend-Your-King",
    manualMetrics: {
      mau: 9950,
      averagePlaytimeMinutes: 18.6,
      released: "June 22, 2026",
      updatedAt: "July 2026",
    },
    published: true,
  },
  {
    slug: "Defend-God",
    universeId: 10397105445,
    title: "Defend Your God!",
    summary: "Defend your God and survive the monster invasion! ⚔️",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/GodTouch.png",
    robloxUrl: "https://www.roblox.com/games/108116406196560/Defend-Your-God",
    rotrendsUrl: "",
    manualMetrics: {
      mau: 588,
      averagePlaytimeMinutes: 4.5,
      released: "June 28, 2026",
      updatedAt: "July 2026",
    },
    published: true,
  },
  {
    slug: "Defend-Princess",
    universeId: 10402607955,
    title: "Defend Your Princess!",
    summary: "Defend your Princess and survive the monster invasion! ⚔️",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/Princess2.png",
    robloxUrl: "https://www.roblox.com/games/90545722169846/Defend-Your-Princess",
    rotrendsUrl: "",
    manualMetrics: {
      mau: 0,
      averagePlaytimeMinutes: 7.4,
      released: "June 29, 2026",
      updatedAt: "July 2026",
    },
    published: true,
  },
  {
    slug: "1-Speed-Circus-Escape",
    universeId: 10231495947,
    title: "+1 Speed Circus Escape",
    summary: "Escape from the Circus and gain Speed with each step!",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/Circus.png",
    robloxUrl: "https://www.roblox.com/games/126847857952876/1-Speed-Circus-Escape",
    rotrendsUrl: "https://rotrends.com/game/10231495947/1-Speed-Circus-Escape",
    manualMetrics: {
      mau: 49468,
      averagePlaytimeMinutes: 10.9,
      released: "June 3, 2026",
      updatedAt: "July 2026",
    },
    published: true,
  },
];
