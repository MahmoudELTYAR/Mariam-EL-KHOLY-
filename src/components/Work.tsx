"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/providers/CursorProvider";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const LOOP = [...projects, ...projects];

export function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { setCursor, resetCursor } = useCursor();
  const [paused, setPaused] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [offset, setOffset] = useState(0);
  const [halfWidth, setHalfWidth] = useState(0);
  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    origin: 0,
    moved: false,
    axis: null as null | "x" | "y",
  });
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const lastTs = useRef(0);

  const isPaused = paused || manualPause;

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      // half = one full set width
      setHalfWidth(el.scrollWidth / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Continuous autoplay — always on (slower when reduced-motion)
  useEffect(() => {
    const speed = reduced ? 18 : 42; // px / second
    const tick = (ts: number) => {
      if (!lastTs.current) lastTs.current = ts;
      const dt = Math.min(48, ts - lastTs.current);
      lastTs.current = ts;

      if (!isPaused && halfWidth > 0 && !drag.current.active) {
        let next = offsetRef.current - (speed * dt) / 1000;
        if (next <= -halfWidth) next += halfWidth;
        offsetRef.current = next;
        setOffset(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTs.current = 0;
    };
  }, [isPaused, halfWidth, reduced]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const wrap = (v: number) => {
    if (halfWidth <= 0) return v;
    let x = v;
    while (x <= -halfWidth) x += halfWidth;
    while (x > 0) x -= halfWidth;
    return x;
  };

  const nudge = (dir: -1 | 1) => {
    const step = Math.min(window.innerWidth * 0.72, 640) + 24;
    setOffset((o) => wrap(o + dir * step));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origin: offsetRef.current,
      moved: false,
      axis: null,
    };
    setPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (!drag.current.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current.active = false;
        drag.current.axis = "y";
        setPaused(false);
        return;
      }
      drag.current.axis = "x";
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setCursor("drag", "Drag");
    }
    if (drag.current.axis !== "x") return;
    e.preventDefault();
    drag.current.moved = true;
    setOffset(wrap(drag.current.origin + dx));
  };

  const endDrag = () => {
    if (drag.current.axis === "x") {
      drag.current.active = false;
      drag.current.axis = null;
      resetCursor();
      setPaused(false);
      return;
    }
    drag.current.active = false;
    drag.current.axis = null;
  };

  return (
    <section id="work" className="relative overflow-x-clip bg-ink pt-section pb-section">
      <div className="mx-auto mb-10 max-w-[1600px] px-gutter lg:mb-12">
        <p className="mb-3 text-fluid-xs uppercase tracking-[0.28em] text-volt">Selected work</p>
        <h2 className="font-display text-fluid-3xl leading-none tracking-tight">
          Projects that
          <br />
          <span className="text-paper/55">earn their space.</span>
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
        }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected work projects"
        >
          <div
            ref={trackRef}
            className="work-marquee flex gap-4 will-change-transform touch-pan-y md:gap-6"
            style={{
              transform: `translate3d(${offset}px, 0, 0)`,
              touchAction: "pan-y",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {LOOP.map((project, i) => (
              <Link
                key={`${project.slug}-${i}`}
                href={`/work/${project.slug}`}
                className="group relative w-[min(86vw,520px)] shrink-0 overflow-hidden bg-ink-elev md:w-[min(58vw,680px)]"
                onMouseEnter={() => setCursor("view", "View")}
                onMouseLeave={resetCursor}
                onClick={(e) => {
                  if (drag.current.moved) {
                    e.preventDefault();
                    drag.current.moved = false;
                  } else {
                    sessionStorage.setItem("returnToWork", "1");
                  }
                }}
                aria-label={`Open ${project.title} case study`}
              >
                <motion.div
                  layoutId={i < projects.length ? `cover-${project.slug}` : undefined}
                  className="relative aspect-[16/10] overflow-hidden"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={project.cover}
                    alt={project.coverAlt}
                    fill
                    sizes="(max-width: 768px) 86vw, 58vw"
                    className="pointer-events-none object-cover transition-transform duration-500 ease-outExpo group-hover:scale-[1.04]"
                    priority={i < 3}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-2 flex items-center gap-3 text-fluid-xs uppercase tracking-[0.2em] text-paper/70">
                    <span>{String((i % projects.length) + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-paper/35" />
                    <span>{project.category}</span>
                  </div>
                  <h3 className="font-display text-fluid-xl tracking-tight md:text-fluid-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-fluid-sm text-paper/70">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-[1600px] items-center justify-between gap-4 px-gutter">
          <div className="h-px flex-1 bg-paper/15" aria-hidden>
            <div
              className="h-px bg-volt/80 transition-[width] duration-300"
              style={{
                width: halfWidth
                  ? `${(((-offset % halfWidth) + halfWidth) % halfWidth / halfWidth) * 100}%`
                  : "0%",
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous projects"
              onClick={() => nudge(1)}
              className="icon-btn"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={manualPause ? "Play carousel" : "Pause carousel"}
              onClick={() => setManualPause((v) => !v)}
              className="icon-btn"
            >
              {manualPause ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M3 1.5v9l8-4.5L3 1.5z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M3 2h2v8H3V2zm4 0h2v8H7V2z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button
              type="button"
              aria-label="Next projects"
              onClick={() => nudge(-1)}
              className="icon-btn"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
