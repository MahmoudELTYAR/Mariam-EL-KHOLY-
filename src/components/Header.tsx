"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useCursor } from "@/components/providers/CursorProvider";

const links = [
  { id: "work", href: "/#work", label: "Work" },
  { id: "about", href: "/#about", label: "About" },
  { id: "skills", href: "/#skills", label: "Skills" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const;

const HEADER_OFFSET = 88;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { setCursor, resetCursor } = useCursor();

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          const id = visible[0].target.id;
          setActive(id);
          if (window.location.hash !== `#${id}`) {
            history.replaceState(null, "", `#${id}`);
          }
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -45% 0px`,
        threshold: [0.15, 0.35, 0.55],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToId(id);
    }
    setOpen(false);
  };

  const linkClass = (id: string) =>
    cn(
      "relative text-fluid-xs uppercase tracking-[0.22em] transition-colors",
      active === id ? "text-volt" : "text-paper/70 hover:text-paper",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-outExpo",
        scrolled || open ? "bg-ink/90 py-3 backdrop-blur-md" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-gutter">
        <Link
          href="/"
          className="font-display text-fluid-lg tracking-tight"
          onMouseEnter={() => setCursor("link", "Home")}
          onMouseLeave={resetCursor}
          onClick={() => setOpen(false)}
        >
          {site.firstName}
          <span className="text-volt">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={linkClass(l.id)}
              onClick={(e) => onNavClick(e, l.id)}
              onMouseEnter={() => setCursor("link", l.label)}
              onMouseLeave={resetCursor}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 h-px w-full origin-left bg-volt transition-transform duration-300 ease-outExpo",
                  active === l.id ? "scale-x-100" : "scale-x-0",
                )}
                aria-hidden
              />
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
          className="grid h-10 w-10 place-items-center md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-full bg-paper transition duration-300",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-paper transition duration-300",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-paper/10 bg-ink transition-[max-height,opacity] duration-500 ease-outExpo",
          open ? "max-h-[80svh] opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-gutter py-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "border-b border-paper/10 py-3 font-display text-fluid-xl",
                active === l.id ? "text-volt" : "text-paper",
              )}
              aria-current={active === l.id ? "true" : undefined}
              onClick={(e) => onNavClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.cvPath}
            download
            className="mt-4 text-fluid-sm uppercase tracking-widest text-volt"
            onClick={() => setOpen(false)}
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
