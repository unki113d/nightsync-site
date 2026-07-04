import type { StudioMetrics as StudioMetricValues } from "@/lib/portfolio";
import { formatMetric } from "@/lib/portfolio";

type StudioMetricsProps = {
  metrics: StudioMetricValues;
};

function StudioMetric({ label, value }: { label: string; value?: number }) {
  const isUnavailable = value === undefined;

  return (
    <div className="group-metric">
      <dt>{label}</dt>
      <dd className={isUnavailable ? "is-unavailable" : undefined}>
        {isUnavailable ? "Unavailable" : formatMetric(value)}
      </dd>
    </div>
  );
}

export function StudioMetrics({ metrics }: StudioMetricsProps) {
  return (
    <dl className="group-metrics" aria-label="NightSync Studio Roblox metrics">
      <StudioMetric label="Playing now" value={metrics.playing} />
      <StudioMetric label="Total visits" value={metrics.visits} />
      <StudioMetric label="Members" value={metrics.members} />
    </dl>
  );
}
