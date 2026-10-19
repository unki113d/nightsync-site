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
  romonitorUrl?: string;
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
    slug: "clean-the-bank",
    universeId: 10541532285,
    title: "Clean The Bank!",
    summary: "Clean the mess in the bank vault",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/clean-the-bank.png",
    robloxUrl: "https://www.roblox.com/games/75202778474171/Clean-The-Bank",
    romonitorUrl: "https://romonitorstats.com/experience/75202778474171/",
    manualMetrics: {
      mau: 996000,
      averagePlaytimeMinutes: 24.2,
      released: "July 21, 2026",
      updatedAt: "September 2026",
    },
    published: true,
  },
  {
    slug: "clean-the-tech-shop",
    universeId: 10641271054,
    title: "Clean The Tech Shop!",
    summary: "Clean the mess in the local Tech Shop",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/clean-the-tech-shop.png",
    robloxUrl: "https://www.roblox.com/games/89965827814079/Clean-The-Tech-Shop",
    romonitorUrl: "https://romonitorstats.com/experience/89965827814079/",
    manualMetrics: {
      mau: 302000,
      averagePlaytimeMinutes: 21.7,
      released: "August 6, 2026",
      updatedAt: "September 2026",
    },
    published: true,
  },
  {
    slug: "clean-the-gym",
    universeId: 10462838382,
    title: "Clean The Gym!",
    summary: "Clean the mess in the local Gym!",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/clean-the-gym.png",
    robloxUrl: "https://www.roblox.com/games/96906123899640/Clean-The-Gym",
    romonitorUrl: "https://romonitorstats.com/experience/96906123899640/",
    manualMetrics: {
      mau: 661000,
      averagePlaytimeMinutes: 28.6,
      released: "July 7, 2026",
      updatedAt: "September 2026",
    },
    published: true,
  },
  {
    slug: "1-speed-poppy-escape",
    universeId: 9594261819,
    title: "+1 Speed Poppy Escape",
    summary: "Escape from the Evil Huggy and gain Speed with each step!",
    contribution: "Full Development Cycle and Publishing",
    image: "/games/poppy-escape.jpg",
    robloxUrl: "https://www.roblox.com/games/72152217243316/1-Speed-Poppy-Escape",
    romonitorUrl: "https://romonitorstats.com/experience/72152217243316/",
    manualMetrics: {
      mau: 1150000,
      averagePlaytimeMinutes: 16.1,
      released: "January 30, 2026",
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
    romonitorUrl: "https://romonitorstats.com/experience/126847857952876/",
    manualMetrics: {
      mau: 49468,
      averagePlaytimeMinutes: 10.9,
      released: "June 3, 2026",
      updatedAt: "July 2026",
    },
    published: true,
  },
];
