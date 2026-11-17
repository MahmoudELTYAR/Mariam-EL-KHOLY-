"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/providers/CursorProvider";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || reduced || !isDesktop) return;

    const track = trackRef.current;
    const ctx = gsap.context(() => {
      const total = track.scrollWidth - window.innerWidth + 80;
      gsap.to(track, {
        x: () => -total,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop, reduced]);

  return (
    <section id="work" ref={sectionRef} className="relative bg-ink pt-section">
      <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between px-gutter lg:mb-14">
        <div>
          <p className="mb-3 text-fluid-xs uppercase tracking-[0.28em] text-volt">Selected work</p>
          <h2 className="font-display text-fluid-3xl leading-none tracking-tight">
            Projects that
            <br />
            <span className="text-paper/45">earn their space.</span>
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-fluid-sm text-paper/55 md:block">
          Seven client-facing experiences — hospitality, heritage, travel, craft commerce, real estate, agency, and SaaS.
        </p>
      </div>

      <div
        ref={trackRef}
        className="horizontal-track flex flex-col gap-8 px-gutter pb-section lg:flex-row lg:gap-10 lg:pb-0"
      >
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative block w-full shrink-0 overflow-hidden lg:h-[72vh] lg:w-[min(72vw,920px)]"
            onMouseEnter={() => setCursor("view", "View")}
            onMouseLeave={resetCursor}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ink-elev lg:aspect-auto lg:h-full">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 72vw"
                className="object-cover object-top transition-transform duration-700 ease-outExpo group-hover:scale-[1.04]"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 40%, ${project.accent}55, transparent 55%)` }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="mb-2 flex items-center gap-3 text-fluid-xs uppercase tracking-[0.2em] text-paper/60">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-6 bg-paper/30" />
                <span>{project.category}</span>
                {project.year && <span>· {project.year}</span>}
              </div>
              <h3 className="font-display text-fluid-2xl tracking-tight">{project.title}</h3>
              <p className="mt-2 max-w-md text-fluid-sm text-paper/65 line-clamp-2">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
