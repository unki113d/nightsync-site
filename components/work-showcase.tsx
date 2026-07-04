"use client";

import {
  ArrowSquareOut,
  GameController,
  Moon,
} from "@phosphor-icons/react";
import Image from "next/image";
import type { PortfolioGame } from "@/lib/portfolio";
import type { StudioMetrics as StudioMetricValues } from "@/lib/portfolio";
import { formatMetric, formatMinutes } from "@/lib/portfolio";
import { RevealText } from "@/components/reveal-text";
import { HorizontalRail } from "@/components/horizontal-rail";
import { StudioMetrics } from "@/components/studio-metrics";
import { siteContent } from "@/content/site";

type WorkShowcaseProps = {
  games: PortfolioGame[];
  studioMetrics: StudioMetricValues;
};

function Metric({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  const isUnavailable = value === "Not published";

  return (
    <div className={`metric${wide ? " is-wide" : ""}`}>
      <dt>{label}</dt>
      <dd className={isUnavailable ? "is-unavailable" : undefined}>{value}</dd>
    </div>
  );
}

function ProjectCard({ game }: { game: PortfolioGame }) {
  return (
    <article className="project-card">
      <div className="project-media">
        {game.resolvedImage ? (
          <Image
            src={game.resolvedImage}
            alt={`${game.title} gameplay artwork`}
            fill
            sizes="(max-width: 1023px) 84vw, 62vw"
          />
        ) : (
          <div className="project-media-fallback">
            <GameController aria-hidden size={52} weight="thin" />
            <span>Artwork pending</span>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-heading">
          <div>
            <p className="project-contribution">{game.contribution}</p>
            <h3>{game.title}</h3>
          </div>
        </div>
        <p className="project-summary">{game.summary}</p>

        <dl className="metrics-grid">
          <Metric label="CCU" value={formatMetric(game.liveMetrics.playing)} />
          <Metric label="Visits" value={formatMetric(game.liveMetrics.visits)} />
          <Metric label="Peak MAU" value={formatMetric(game.manualMetrics.mau)} />
          <Metric
            label="Avg. playtime"
            value={formatMinutes(game.manualMetrics.averagePlaytimeMinutes)}
          />
          <Metric
            label="Released"
            value={game.manualMetrics.released || "Not published"}
            wide
          />
        </dl>

        <div className="project-footer">
          <div className="project-actions">
            {game.robloxUrl && (
              <a href={game.robloxUrl} target="_blank" rel="noreferrer">
                Play on Roblox
                <ArrowSquareOut aria-hidden size={17} />
              </a>
            )}
            {game.rotrendsUrl && (
              <a href={game.rotrendsUrl} target="_blank" rel="noreferrer">
                View analytics
                <ArrowSquareOut aria-hidden size={17} />
              </a>
            )}
          </div>
          {game.manualMetrics.updatedAt && (
            <span className="metric-date">
              Metrics updated {game.manualMetrics.updatedAt}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyPortfolio() {
  return (
    <div className="portfolio-empty">
      <div className="empty-mark" aria-hidden>
        <Moon size={34} weight="thin" />
      </div>
      <div>
        <h3>Selected work is being prepared.</h3>
        <p>
          We only publish verified project details and performance data. The first
          case studies will appear here soon.
        </p>
      </div>
    </div>
  );
}

export function WorkShowcase({ games, studioMetrics }: WorkShowcaseProps) {
  return (
    <section id="work" className="work-shell" aria-labelledby="work-title">
      <div className="work-heading">
        <h2 id="work-title">
          <RevealText text="Games measured by what players do." />
        </h2>
        <span>
          Live Roblox signals meet dated studio snapshots. No invented numbers.
        </span>
        <div className="studio-proof-row">
          <StudioMetrics metrics={studioMetrics} />
          <a
            className="studio-group-link"
            href={siteContent.robloxGroup.url}
            target="_blank"
            rel="noreferrer"
          >
            View studio on Roblox
            <ArrowSquareOut aria-hidden size={17} />
          </a>
        </div>
      </div>

      {games.length === 0 ? (
        <EmptyPortfolio />
      ) : (
        <div className="horizontal-wrap">
          <HorizontalRail>
            {games.map((game) => (
              <ProjectCard key={game.slug} game={game} />
            ))}
          </HorizontalRail>
        </div>
      )}
    </section>
  );
}
