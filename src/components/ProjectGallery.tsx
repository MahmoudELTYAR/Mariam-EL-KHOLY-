"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";
import { useCursor } from "@/components/providers/CursorProvider";

type Item = { src: string; alt: string };

export function ProjectGallery({
  cover,
  coverAlt,
  gallery,
}: {
  cover: string;
  coverAlt: string;
  gallery: Item[];
}) {
  const items = useMemo(
    () => [{ src: cover, alt: coverAlt }, ...gallery],
    [cover, coverAlt, gallery],
  );
  const [active, setActive] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <>
      <section className="mt-16 space-y-6">
        <h2 className="font-display text-fluid-2xl">Visuals</h2>
        <div className="columns-1 gap-5 md:columns-2">
          {items.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-ink-elev text-left"
              onClick={() => setActive(i)}
              onMouseEnter={() => setCursor("view", "View")}
              onMouseLeave={resetCursor}
              aria-label={`Open ${img.alt}`}
            >
              <span className="relative block min-h-[240px] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={1600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-outExpo group-hover:scale-[1.02]"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </span>
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        items={items}
        index={active}
        onClose={() => setActive(null)}
        onChange={setActive}
      />
    </>
  );
}
