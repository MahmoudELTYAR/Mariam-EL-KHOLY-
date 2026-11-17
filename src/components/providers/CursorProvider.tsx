"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type CursorState = "default" | "view" | "drag" | "link" | "hidden";

type CursorContextValue = {
  label: string;
  state: CursorState;
  setCursor: (state: CursorState, label?: string) => void;
  resetCursor: () => void;
  enabled: boolean;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const enabled = !isTouch && !reduced;
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [pos, setPos] = useState({ x: -100, y: -100 });

  const setCursor = useCallback((next: CursorState, nextLabel = "") => {
    setState(next);
    setLabel(nextLabel);
  }, []);

  const resetCursor = useCallback(() => {
    setState("default");
    setLabel("");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  const value = useMemo(
    () => ({ label, state, setCursor, resetCursor, enabled }),
    [label, state, setCursor, resetCursor, enabled],
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
      {enabled && (
        <div
          className="custom-cursor pointer-events-none fixed z-[100] mix-blend-difference"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden
        >
          <div
            className={`grid place-items-center rounded-full border border-paper/40 bg-paper text-ink transition-all duration-300 ease-outExpo ${
              state === "view" || state === "drag" || state === "link"
                ? "h-20 w-20 text-[0.65rem] font-medium uppercase tracking-[0.18em]"
                : "h-[18px] w-[18px] text-[0px]"
            } ${state === "hidden" ? "opacity-0 scale-50" : "opacity-100"}`}
          >
            {label}
          </div>
        </div>
      )}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
