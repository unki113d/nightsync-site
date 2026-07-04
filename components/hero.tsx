"use client";

import { ArrowDownRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { siteContent } from "@/content/site";
import { RevealText } from "@/components/reveal-text";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="hero-shell" aria-labelledby="hero-title">
      <motion.div
        id="about"
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="hero-kicker">Independent Roblox game studio</p>
        <h1 id="hero-title">
          <RevealText text={siteContent.headline} />
        </h1>
        <p className="hero-about">{siteContent.about}</p>
        <a className="primary-link" href="#work">
          View our work
          <ArrowDownRight aria-hidden size={20} weight="bold" />
        </a>
      </motion.div>

      <motion.div
        className="mascot-stage"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: 18 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/night-sync-cat.svg"
          alt="NightSync Studio cat mascot working at a laptop"
          width={476}
          height={354}
          priority
          sizes="(max-width: 768px) 70vw, 30vw"
        />
      </motion.div>
    </section>
  );
}
