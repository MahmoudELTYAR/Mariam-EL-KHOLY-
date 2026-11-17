"use client";

import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCursor } from "@/components/providers/CursorProvider";

export function Contact() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-paper/10 bg-ink pb-10 pt-section">
      <div className="mx-auto max-w-[1600px] px-gutter">
        <p className="mb-4 text-fluid-xs uppercase tracking-[0.28em] text-volt">Contact</p>
        <h2 className="font-display text-fluid-giant leading-[0.85] tracking-[-0.04em]">
          Let&apos;s make
          <br />
          <span className="text-volt">something clear.</span>
        </h2>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href={site.emailHref}>Email Mariam</MagneticButton>
          <MagneticButton
            href={site.phoneHref}
            className="border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink"
          >
            Call
          </MagneticButton>
          <MagneticButton
            href={site.cvPath}
            className="border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink"
          >
            Download CV
          </MagneticButton>
        </div>

        <div className="mt-16 grid gap-8 border-t border-paper/10 pt-10 md:grid-cols-4">
          <div>
            <p className="mb-2 text-fluid-xs uppercase tracking-[0.2em] text-paper/40">Email</p>
            <a
              href={site.emailHref}
              className="text-fluid-sm break-all transition-colors hover:text-volt"
              onMouseEnter={() => setCursor("link", "Mail")}
              onMouseLeave={resetCursor}
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="mb-2 text-fluid-xs uppercase tracking-[0.2em] text-paper/40">Phone</p>
            <a href={site.phoneHref} className="text-fluid-sm transition-colors hover:text-volt">
              {site.phone}
            </a>
          </div>
          <div>
            <p className="mb-2 text-fluid-xs uppercase tracking-[0.2em] text-paper/40">Location</p>
            <p className="text-fluid-sm">{site.location}</p>
          </div>
          <div>
            <p className="mb-2 text-fluid-xs uppercase tracking-[0.2em] text-paper/40">Social</p>
            <div className="flex flex-col gap-1 text-fluid-sm text-paper/55">
              <span>LinkedIn — link soon</span>
              <span>Behance — link soon</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 text-fluid-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className="uppercase tracking-[0.18em]">Designed with intention · Built to last</p>
        </div>
      </div>
    </footer>
  );
}
