"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function HorizontalRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const updateRailState = () => {
      const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const progress = maxScroll > 0 ? rail.scrollLeft / maxScroll : 1;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setCanScrollBackward(rail.scrollLeft > 1);
      setCanScrollForward(rail.scrollLeft < maxScroll - 1);
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateRailState);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(rail);
    rail.addEventListener("scroll", requestUpdate, { passive: true });
    updateRailState();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      rail.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 820),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="rail-shell">
      <div
        ref={railRef}
        className="horizontal-track"
        aria-label="Selected games"
        tabIndex={0}
      >
        {children}
      </div>
      <div className="rail-navigation">
        <div className="rail-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
        <div className="rail-buttons">
          <button
            type="button"
            aria-label="Previous games"
            disabled={!canScrollBackward}
            onClick={() => scrollRail(-1)}
          >
            <ArrowLeft aria-hidden size={18} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Next games"
            disabled={!canScrollForward}
            onClick={() => scrollRail(1)}
          >
            <ArrowRight aria-hidden size={18} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
