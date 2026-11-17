"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";
import { useCursor } from "@/components/providers/CursorProvider";
import { Reveal } from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Item = { src: string; alt: string };

function GalleryImage({
  img,
  index,
  onOpen,
}: {
  img: Item;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) {
      el?.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Reveal delay={Math.min(index * 0.04, 0.2)}>
      <button
        ref={ref}
        type="button"
        className="img-mask-reveal group relative block w-full overflow-hidden bg-ink-elev text-left"
        onClick={onOpen}
        onMouseEnter={() => setCursor("view", "View")}
        onMouseLeave={resetCursor}
        aria-label={`Open ${img.alt}`}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={1600}
          height={2000}
          sizes="100vw"
          className="h-auto w-full object-cover object-top transition-transform duration-500 ease-outExpo group-hover:scale-[1.015]"
          loading={index < 2 ? "eager" : "lazy"}
        />
      </button>
    </Reveal>
  );
}

export function ProjectGallery({
  gallery,
}: {
  cover?: string;
  coverAlt?: string;
  gallery: Item[];
}) {
  const items = useMemo(() => gallery, [gallery]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <section className="mt-16 space-y-8">
        <Reveal>
          <h2 className="font-display text-fluid-2xl">Visuals</h2>
        </Reveal>
        <div className="flex flex-col gap-8 md:gap-10">
          {items.map((img, i) => (
            <GalleryImage key={img.src} img={img} index={i} onOpen={() => setActive(i)} />
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
