"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/data/site";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.15,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.15,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.7,
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28 md:pb-16"
    >
      <HeroCanvas />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-gutter">
        <p className="hero-meta mb-6 text-fluid-xs uppercase tracking-[0.28em] text-volt">
          {site.role} · {site.location}
        </p>

        <h1 className="font-display text-fluid-hero leading-[0.9] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <span className="hero-line inline-block">{site.firstName}</span>
          </span>
          <span className="block overflow-hidden text-paper/55">
            <span className="hero-line inline-block">{site.lastName}</span>
          </span>
        </h1>

        <div className="hero-meta mt-8 flex max-w-2xl flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-fluid-base text-paper/70">{site.tagline}</p>
          <MagneticButton href="#work" className="self-start md:self-auto">
            Selected work
            <span aria-hidden>↓</span>
          </MagneticButton>
        </div>

        <div className="hero-meta mt-14 flex items-center gap-3 text-fluid-xs uppercase tracking-[0.24em] text-paper/40">
          <span className="h-8 w-px animate-pulseSoft bg-volt" aria-hidden />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
