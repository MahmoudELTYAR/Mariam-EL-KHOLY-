"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
  ...props
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (isTouch || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  const classes = cn(
    "magnetic inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-volt px-6 py-3 text-fluid-sm font-medium text-ink transition-colors duration-300 ease-outExpo hover:bg-paper",
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </button>
  );
}
