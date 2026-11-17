"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SharedCover({
  slug,
  src,
  alt,
}: {
  slug: string;
  src: string;
  alt: string;
}) {
  return (
    <motion.div
      layoutId={`cover-${slug}`}
      className="relative mt-12 aspect-[16/10] overflow-hidden bg-ink-elev"
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
    </motion.div>
  );
}
