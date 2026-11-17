"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCursor } from "@/components/providers/CursorProvider";

function Copyable({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div>
      <p className="mb-2 text-fluid-xs uppercase tracking-[0.2em] text-paper/55">{label}</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={href}
          className="text-fluid-sm break-all text-paper/90 transition-colors hover:text-volt"
          onMouseEnter={() => setCursor("link", label)}
          onMouseLeave={resetCursor}
        >
          {value}
        </a>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-paper/30 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-paper/75 transition-colors hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function Contact() {
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
          <MagneticButton href={site.emailHref} variant="primary">
            Email Mariam
          </MagneticButton>
          <MagneticButton href={site.phoneHref} variant="secondary">
            Call
          </MagneticButton>
          <MagneticButton href={site.cvPath} variant="secondary">
            Download CV
          </MagneticButton>
        </div>

        <div className="mt-16 grid gap-8 border-t border-paper/10 pt-10 md:grid-cols-3">
          <Copyable label="Email" value={site.email} href={site.emailHref} />
          <Copyable label="Phone" value={site.phone} href={site.phoneHref} />
          <div>
            <p className="mb-2 text-fluid-xs uppercase tracking-[0.2em] text-paper/55">Location</p>
            <p className="text-fluid-sm text-paper/90">{site.location}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 text-fluid-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="uppercase tracking-[0.18em]">Designed with intention · Built to last</p>
        </div>
      </div>
    </footer>
  );
}
