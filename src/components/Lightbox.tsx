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
        className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-paper/40 bg-ink/60 text-paper hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
        aria-label="Close"
      >
        ✕
      </button>

      <button
        type="button"
        className="absolute left-3 z-20 grid h-11 w-11 place-items-center rounded-full border border-paper/40 bg-ink/60 text-paper hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt md:left-6"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index - 1 + items.length) % items.length);
        }}
      >
        ←
      </button>

      <button
        type="button"
        className="absolute right-3 z-20 grid h-11 w-11 place-items-center rounded-full border border-paper/40 bg-ink/60 text-paper hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt md:right-6"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index + 1) % items.length);
        }}
      >
        →
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
