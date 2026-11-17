"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { useCursor } from "@/components/providers/CursorProvider";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ProjectPreview } from "@/components/ProjectPreview";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 4000;

export function Work() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { setCursor, resetCursor } = useCursor();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState<Project | null>(null);
  const [dragX, setDragX] = useState(0);
  const [slideW, setSlideW] = useState(720);
  const [gap, setGap] = useState(24);

  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    moved: false,
    axis: null as null | "x" | "y",
    pointerId: -1,
  });

  const count = projects.length;

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      if (vw < 768) {
        setSlideW(Math.min(vw * 0.88, 420));
        setGap(16);
      } else {
        setSlideW(Math.min(vw * 0.7, 720));
        setGap(24);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % count) + count) % count);
      setDragX(0);
    },
    [count],
  );

  useEffect(() => {
    if (reduced || paused || preview) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
      setDragX(0);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, preview, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      moved: false,
      axis: null,
      pointerId: e.pointerId,
    };
    setPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;

    if (!drag.current.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      // Vertical intent: cancel carousel drag so the page can scroll normally
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current.active = false;
        drag.current.axis = "y";
        setDragX(0);
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
    drag.current.lastX = e.clientX;
    setDragX(dx);
  };

  const endDrag = () => {
    if (!drag.current.active && drag.current.axis !== "x") {
      drag.current.axis = null;
      return;
    }
    const wasHorizontal = drag.current.axis === "x";
    drag.current.active = false;
    drag.current.axis = null;
    resetCursor();
    setPaused(false);
    if (!wasHorizontal) {
      setDragX(0);
      return;
    }
    const threshold = Math.min(80, slideW * 0.18);
    if (dragX <= -threshold) goTo(index + 1);
    else if (dragX >= threshold) goTo(index - 1);
    else setDragX(0);
  };

  const offset = -(index * (slideW + gap)) + dragX;

  return (
    <section id="work" className="relative overflow-x-clip bg-ink pt-section pb-section">
      <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between gap-6 px-gutter lg:mb-12">
        <div>
          <p className="mb-3 text-fluid-xs uppercase tracking-[0.28em] text-volt">Selected work</p>
          <h2 className="font-display text-fluid-3xl leading-none tracking-tight">
            Projects that
            <br />
            <span className="text-paper/55">earn their space.</span>
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => goTo(index - 1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 text-paper transition-colors hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => goTo(index + 1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 text-paper transition-colors hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
        }}
      >
        <div
          ref={viewportRef}
          className="overflow-hidden px-gutter"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected work projects"
        >
          <div
            className="flex touch-pan-y will-change-transform"
            style={{
              gap,
              transform: `translate3d(${offset}px, 0, 0)`,
              transition: drag.current.active
                ? "none"
                : "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
              touchAction: "pan-y",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                className="group relative shrink-0 overflow-hidden bg-ink-elev text-left"
                style={{ width: slideW }}
                onMouseEnter={() => setCursor("view", "View")}
                onMouseLeave={resetCursor}
                onClick={() => {
                  if (drag.current.moved) return;
                  setPreview(project);
                }}
                aria-label={`Preview ${project.title}`}
                aria-current={i === index ? "true" : undefined}
              >
                <div className="relative aspect-[3/4] md:aspect-[16/11]">
                  <Image
                    src={project.cover}
                    alt={project.coverAlt}
                    fill
                    sizes="(max-width: 768px) 88vw, 70vw"
                    className="pointer-events-none object-cover object-top transition-transform duration-700 ease-outExpo group-hover:scale-[1.03]"
                    priority={i < 2}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <div className="mb-2 flex items-center gap-3 text-fluid-xs uppercase tracking-[0.2em] text-paper/70">
                    <span>{String(i + 1).padStart(2, "0")}</span>
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
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 px-gutter" role="tablist" aria-label="Project slides">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${p.title}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
                i === index ? "w-8 bg-volt" : "w-1.5 bg-paper/40 hover:bg-paper/65",
              )}
            />
          ))}
        </div>
      </div>

      <ProjectPreview project={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
