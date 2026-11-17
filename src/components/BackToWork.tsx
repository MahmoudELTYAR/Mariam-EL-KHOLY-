"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function BackToWork() {
  const router = useRouter();

  return (
    <Link
      href="/#work"
      className="inline-flex items-center gap-2 text-fluid-xs uppercase tracking-[0.22em] text-paper/60 transition-colors hover:text-volt"
      onClick={(e) => {
        e.preventDefault();
        sessionStorage.setItem("returnToWork", "1");
        router.push("/#work");
      }}
    >
      ← All work
    </Link>
  );
}
