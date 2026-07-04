import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatMetric,
  formatMinutes,
  formatPercent,
  getStudioMetrics,
} from "./portfolio";

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("portfolio metric formatting", () => {
  it("never presents a missing value as zero", () => {
    expect(formatMetric()).toBe("Not published");
    expect(formatPercent()).toBe("Not published");
    expect(formatMinutes()).toBe("Not published");
  });

  it("formats real values for compact portfolio display", () => {
    expect(formatMetric(1_250_000)).toBe("1.3M");
    expect(formatPercent(12.4)).toBe("12.4%");
    expect(formatMinutes(18)).toBe("18 min");
  });
});

describe("studio metrics aggregation", () => {
  it("aggregates every page of experiences and every details batch", async () => {
    const firstPageIds = Array.from({ length: 50 }, (_, index) => index + 1);
    const secondPageIds = [51, 52];

    const fetchMock = vi.fn(async (input: string | URL | Request) => {
      const url = new URL(String(input));

      if (url.hostname === "groups.roblox.com") {
        return jsonResponse({ memberCount: 35_105 });
      }

      if (url.pathname.endsWith("/gamesV2")) {
        const isSecondPage = url.searchParams.has("cursor");
        return jsonResponse({
          data: (isSecondPage ? secondPageIds : firstPageIds).map((id) => ({ id })),
          nextPageCursor: isSecondPage ? null : "next-page",
        });
      }

      if (url.pathname === "/v1/games") {
        const ids = (url.searchParams.get("universeIds") ?? "")
          .split(",")
          .filter(Boolean)
          .map(Number);
        return jsonResponse({
          data: ids.map((id) => ({ id, playing: 2, visits: 100 })),
        });
      }

      return jsonResponse({}, 404);
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getStudioMetrics()).resolves.toEqual({
      playing: 104,
      visits: 5_200,
      members: 35_105,
    });

    const detailsCalls = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes("/v1/games?"),
    );
    expect(detailsCalls).toHaveLength(2);
  });

  it("preserves members when experience details are unavailable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request) => {
        const url = new URL(String(input));
        if (url.hostname === "groups.roblox.com") {
          return jsonResponse({ memberCount: 35_105 });
        }
        if (url.pathname.endsWith("/gamesV2")) {
          return jsonResponse({ data: [{ id: 1 }], nextPageCursor: null });
        }
        return jsonResponse({}, 503);
      }),
    );

    await expect(getStudioMetrics()).resolves.toEqual({ members: 35_105 });
  });
});
