import { games, type Game } from "@/content/games";
import { siteContent } from "@/content/site";

type RobloxGameDetails = {
  id: number;
  name?: string;
  playing?: number;
  visits?: number;
};

type RobloxThumbnail = {
  targetId: number;
  state: string;
  imageUrl?: string;
};

type RobloxGroupGamesPage = {
  data?: Array<{ id: number }>;
  nextPageCursor?: string | null;
};

type RobloxGroupDetails = {
  memberCount?: number;
};

export type PortfolioGame = Game & {
  liveMetrics: {
    playing?: number;
    visits?: number;
    source: "live" | "fallback" | "unavailable";
  };
  resolvedImage: string;
};

export type StudioMetrics = {
  playing?: number;
  visits?: number;
  members?: number;
};

const ROBLOX_CACHE_SECONDS = 900;
const ROBLOX_DETAILS_BATCH_SIZE = 50;

export function formatMetric(value?: number) {
  if (value === undefined || !Number.isFinite(value)) return "Not published";
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: value >= 10_000 ? 1 : 0,
  }).format(value);
}

export function formatPercent(value?: number) {
  if (value === undefined || !Number.isFinite(value)) return "Not published";
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export function formatMinutes(value?: number) {
  if (value === undefined || !Number.isFinite(value)) return "Not published";
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)} min`;
}

async function fetchRobloxDetails(universeIds: number[]) {
  if (universeIds.length === 0) return new Map<number, RobloxGameDetails>();

  const response = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${universeIds.join(",")}`,
    { next: { revalidate: ROBLOX_CACHE_SECONDS } },
  );
  if (!response.ok) throw new Error(`Roblox details returned ${response.status}`);

  const payload = (await response.json()) as { data?: RobloxGameDetails[] };
  return new Map((payload.data ?? []).map((item) => [item.id, item]));
}

async function fetchGroupUniverseIds() {
  const universeIds: number[] = [];
  const seenCursors = new Set<string>();
  let cursor: string | undefined;

  do {
    const params = new URLSearchParams({
      accessFilter: "Public",
      limit: "50",
      sortOrder: "Desc",
    });
    if (cursor) params.set("cursor", cursor);

    const response = await fetch(
      `https://games.roblox.com/v2/groups/${siteContent.robloxGroup.id}/gamesV2?${params}`,
      { next: { revalidate: ROBLOX_CACHE_SECONDS } },
    );
    if (!response.ok) {
      throw new Error(`Roblox group games returned ${response.status}`);
    }

    const payload = (await response.json()) as RobloxGroupGamesPage;
    universeIds.push(
      ...(payload.data ?? [])
        .map((experience) => experience.id)
        .filter((id) => Number.isFinite(id)),
    );

    const nextCursor = payload.nextPageCursor ?? undefined;
    if (nextCursor && seenCursors.has(nextCursor)) {
      throw new Error("Roblox group games returned a repeated cursor");
    }
    if (nextCursor) seenCursors.add(nextCursor);
    cursor = nextCursor;
  } while (cursor);

  return [...new Set(universeIds)];
}

async function fetchGroupMemberCount() {
  const response = await fetch(
    `https://groups.roblox.com/v1/groups/${siteContent.robloxGroup.id}`,
    { next: { revalidate: ROBLOX_CACHE_SECONDS } },
  );
  if (!response.ok) {
    throw new Error(`Roblox group details returned ${response.status}`);
  }

  const payload = (await response.json()) as RobloxGroupDetails;
  return Number.isFinite(payload.memberCount) ? payload.memberCount : undefined;
}

async function fetchAllGroupGameDetails(universeIds: number[]) {
  const batches: number[][] = [];
  for (let index = 0; index < universeIds.length; index += ROBLOX_DETAILS_BATCH_SIZE) {
    batches.push(universeIds.slice(index, index + ROBLOX_DETAILS_BATCH_SIZE));
  }

  const details = await Promise.all(batches.map(fetchRobloxDetails));
  return new Map(details.flatMap((batch) => [...batch.entries()]));
}

export async function getStudioMetrics(): Promise<StudioMetrics> {
  const [universeIdsResult, membersResult] = await Promise.allSettled([
    fetchGroupUniverseIds(),
    fetchGroupMemberCount(),
  ]);

  const metrics: StudioMetrics = {
    members:
      membersResult.status === "fulfilled" ? membersResult.value : undefined,
  };

  if (universeIdsResult.status !== "fulfilled") return metrics;

  const universeIds = universeIdsResult.value;
  if (universeIds.length === 0) {
    return { ...metrics, playing: 0, visits: 0 };
  }

  try {
    const details = await fetchAllGroupGameDetails(universeIds);
    const completePlaying = universeIds.every((id) =>
      Number.isFinite(details.get(id)?.playing),
    );
    const completeVisits = universeIds.every((id) =>
      Number.isFinite(details.get(id)?.visits),
    );

    return {
      ...metrics,
      playing: completePlaying
        ? universeIds.reduce((total, id) => total + (details.get(id)?.playing ?? 0), 0)
        : undefined,
      visits: completeVisits
        ? universeIds.reduce((total, id) => total + (details.get(id)?.visits ?? 0), 0)
        : undefined,
    };
  } catch {
    return metrics;
  }
}

async function fetchRobloxThumbnails(universeIds: number[]) {
  if (universeIds.length === 0) return new Map<number, RobloxThumbnail>();

  const response = await fetch(
    `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeIds.join(",")}&countPerUniverse=1&defaults=true&size=768x432&format=Webp&isCircular=false`,
    { next: { revalidate: ROBLOX_CACHE_SECONDS } },
  );
  if (!response.ok) throw new Error(`Roblox thumbnails returned ${response.status}`);

  const payload = (await response.json()) as { data?: RobloxThumbnail[] };
  return new Map((payload.data ?? []).map((item) => [item.targetId, item]));
}

export async function getPortfolioGames(): Promise<PortfolioGame[]> {
  const published = games.filter(
    (game) => game.published && game.universeId > 0 && game.robloxUrl,
  );

  if (published.length === 0 && process.env.NODE_ENV === "development") {
    return games.map((game) => ({
      ...game,
      liveMetrics: { source: "unavailable" as const },
      resolvedImage: "",
    }));
  }

  const universeIds = published.map((game) => game.universeId);

  const [detailsResult, thumbnailsResult] = await Promise.allSettled([
    fetchRobloxDetails(universeIds),
    fetchRobloxThumbnails(universeIds),
  ]);
  const details = detailsResult.status === "fulfilled" ? detailsResult.value : new Map();
  const thumbnails =
    thumbnailsResult.status === "fulfilled" ? thumbnailsResult.value : new Map();

  return published.map((game) => {
    const live = details.get(game.universeId);
    const fallback = game.fallbackMetrics;
    const source = live ? "live" : fallback ? "fallback" : "unavailable";

    return {
      ...game,
      title: game.title || live?.name || "Untitled experience",
      liveMetrics: {
        playing: live?.playing ?? fallback?.playing,
        visits: live?.visits ?? fallback?.visits,
        source,
      },
      resolvedImage: game.image || thumbnails.get(game.universeId)?.imageUrl || "",
    };
  });
}
