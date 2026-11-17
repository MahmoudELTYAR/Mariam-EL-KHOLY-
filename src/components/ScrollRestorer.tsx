"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Restores #work scroll when returning from a case study. */
export function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if (sessionStorage.getItem("returnToWork") !== "1") return;
    sessionStorage.removeItem("returnToWork");

    const go = () => {
      const el = document.getElementById("work");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", "#work");
    };

    // Wait a frame for home content to mount
    requestAnimationFrame(() => setTimeout(go, 80));
  }, [pathname]);

  return null;
}
