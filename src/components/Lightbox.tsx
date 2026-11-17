"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Item = { src: string; alt: string };

type Props = {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onChange, onClose]);

  if (index === null || !items[index]) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) onChange((index + 1) % items.length);
        else onChange((index - 1 + items.length) % items.length);
      }}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close lightbox"
        onClick={onClose}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="icon-btn absolute right-4 top-4 z-20"
        aria-label="Close"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <button
        type="button"
        className="icon-btn absolute left-3 z-20 md:left-6"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index - 1 + items.length) % items.length);
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <button
        type="button"
        className="icon-btn absolute right-3 z-20 md:right-6"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index + 1) % items.length);
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <div className="relative z-10 h-[min(82svh,900px)] w-full max-w-6xl">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-fluid-xs text-paper/70">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}
