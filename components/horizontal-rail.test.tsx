import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HorizontalRail } from "./horizontal-rail";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("HorizontalRail", () => {
  it("provides explicit navigation without capturing vertical wheel input", async () => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({ matches: false }),
    );
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(1_500);

    render(
      <HorizontalRail>
        <article>Game one</article>
        <article>Game two</article>
      </HorizontalRail>,
    );

    const rail = screen.getByLabelText("Selected games");
    const scrollBy = vi.fn();
    Object.defineProperty(rail, "scrollBy", { value: scrollBy });

    const nextButton = screen.getByRole("button", { name: "Next games" });
    await waitFor(() => expect(nextButton).toBeEnabled());
    fireEvent.click(nextButton);

    expect(scrollBy).toHaveBeenCalledWith({ left: 410, behavior: "smooth" });
    expect(screen.getByRole("button", { name: "Previous games" })).toBeDisabled();
    expect(rail).not.toHaveAttribute("onwheel");
  });
});
