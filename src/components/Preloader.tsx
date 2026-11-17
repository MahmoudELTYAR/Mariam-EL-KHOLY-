"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true);
  const done = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      setVisible(false);
      onDone?.();
    };

    if (reduced) {
      finish();
      return;
    }

    const safety = window.setTimeout(finish, 3200);
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        window.clearTimeout(safety);
        finish();
      },
    });

    tl.fromTo(
      ".preloader-word",
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power3.out" },
    )
      .to(".preloader-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "-=0.4")
      .to(".preloader-name", { y: -20, opacity: 0, duration: 0.45 }, "+=0.15")
      .to(".preloader-panel", { yPercent: -101, duration: 0.9, ease: "power4.inOut" }, "-=0.15");

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, [reduced, onDone]);

  if (!visible) return null;

  return (
    <div
      className="preloader-panel fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      role="status"
      aria-live="polite"
    >
      <p className="preloader-name overflow-hidden font-display text-fluid-3xl tracking-tight text-paper">
        {"Mariam Elkholy".split(" ").map((word) => (
          <span key={word} className="mx-2 inline-block overflow-hidden align-bottom">
            <span className="preloader-word inline-block">{word}</span>
          </span>
        ))}
      </p>
      <div className="mt-10 h-px w-40 overflow-hidden bg-paper/15">
        <div className="preloader-bar h-full origin-left scale-x-0 bg-volt" />
      </div>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}
