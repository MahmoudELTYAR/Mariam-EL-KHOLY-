"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCursor } from "@/components/providers/CursorProvider";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectPreview({ project, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        aria-label="Close project preview"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="preview-panel relative z-10 flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden border border-paper/15 bg-ink-soft shadow-2xl sm:rounded-2xl"
      >
        <div className="relative aspect-[16/11] w-full shrink-0 bg-ink-elev">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover object-top"
            priority
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-paper/30 bg-ink/70 text-paper backdrop-blur transition-colors hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
            aria-label="Close"
            onMouseEnter={() => setCursor("link", "Close")}
            onMouseLeave={resetCursor}
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-5 md:p-8">
          <p className="text-fluid-xs uppercase tracking-[0.22em] text-volt">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h2 id={titleId} className="mt-2 font-display text-fluid-2xl tracking-tight">
            {project.title}
          </h2>
          <p className="mt-2 text-fluid-sm text-paper/70">{project.role}</p>
          <p className="mt-4 text-fluid-base text-paper/80">{project.description}</p>
          <p className="mt-4 text-fluid-xs uppercase tracking-[0.16em] text-paper/55">
            {project.tools.join(" · ")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={`/work/${project.slug}`}>View full project</MagneticButton>
            <MagneticButton type="button" variant="secondary" onClick={onClose}>
              Close
            </MagneticButton>
          </div>
          <Link href={`/work/${project.slug}`} className="sr-only">
            View full project: {project.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
