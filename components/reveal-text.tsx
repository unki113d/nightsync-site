"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealTextProps = { text: string };
type CharacterStyle = CSSProperties & { "--char-index": number };

export function RevealText({ text }: RevealTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const words = useMemo(() => {
    let characterIndex = 0;
    return text.split(" ").map((word) => ({
      word,
      characters: word.split("").map((character) => ({
        character,
        index: characterIndex++,
      })),
    }));
  }, [text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={rootRef}
      className={`reveal-text${visible ? " is-visible" : ""}`}
      aria-label={text}
    >
      {words.map(({ word, characters }, wordIndex) => (
        <span className="reveal-word" aria-hidden key={`${word}-${wordIndex}`}>
          {characters.map(({ character, index }) => (
            <span
              className="reveal-char"
              style={{ "--char-index": index } as CharacterStyle}
              key={`${character}-${index}`}
            >
              {character}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="reveal-space"> </span>
          )}
        </span>
      ))}
    </span>
  );
}
