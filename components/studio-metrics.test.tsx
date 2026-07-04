import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StudioMetrics } from "./studio-metrics";

describe("StudioMetrics", () => {
  it("renders all group metrics with compact values", () => {
    render(
      <StudioMetrics
        metrics={{ playing: 160, visits: 4_055_498, members: 35_105 }}
      />,
    );

    expect(screen.getByText("Playing now")).toBeInTheDocument();
    expect(screen.getByText("Total visits")).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
    expect(screen.getByText("160")).toBeInTheDocument();
    expect(screen.getByText("4.1M")).toBeInTheDocument();
    expect(screen.getByText("35.1K")).toBeInTheDocument();
  });

  it("labels missing values as unavailable", () => {
    render(<StudioMetrics metrics={{ members: 35_105 }} />);

    expect(screen.getAllByText("Unavailable")).toHaveLength(2);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
