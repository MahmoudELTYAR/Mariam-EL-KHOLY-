"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useCursor } from "@/components/providers/CursorProvider";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-outExpo",
        scrolled ? "bg-ink/80 py-3 backdrop-blur-md" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-gutter">
        <Link
          href="/"
          className="font-display text-fluid-lg tracking-tight"
          onMouseEnter={() => setCursor("link", "Home")}
          onMouseLeave={resetCursor}
        >
          {site.firstName}
          <span className="text-volt">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-fluid-xs uppercase tracking-[0.22em] text-paper/70 transition-colors hover:text-volt"
              onMouseEnter={() => setCursor("link", l.label)}
              onMouseLeave={resetCursor}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={site.cvPath}
          download
          className="hidden text-fluid-xs uppercase tracking-[0.18em] text-paper/80 underline-offset-4 hover:text-volt hover:underline md:inline"
          onMouseEnter={() => setCursor("link", "CV")}
          onMouseLeave={resetCursor}
        >
          Download CV
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={cn("h-px w-full bg-paper transition", open && "translate-y-[3.5px] rotate-45")} />
            <span className={cn("h-px w-full bg-paper transition", open && "-translate-y-[3.5px] -rotate-45")} />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-paper/10 bg-ink transition-[max-height] duration-500 ease-outExpo",
          open ? "max-h-80" : "max-h-0 border-transparent",
        )}
      >
        <div className="flex flex-col gap-4 px-gutter py-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-fluid-xl font-display"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href={site.cvPath} download className="text-volt text-fluid-sm uppercase tracking-widest">
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
