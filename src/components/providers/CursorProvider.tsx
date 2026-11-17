"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIsTouch } from "@/hooks/useMediaQuery";

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
  const enabled = !isTouch;
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
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, [enabled]);

  const value = useMemo(
    () => ({ label, state, setCursor, resetCursor, enabled }),
    [label, state, setCursor, resetCursor, enabled],
  );

  const expanded = state === "view" || state === "drag" || state === "link";

  return (
    <CursorContext.Provider value={value}>
      {children}
      {enabled && (
        <div
          className="custom-cursor pointer-events-none fixed z-[100]"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <div
            className={`grid place-items-center rounded-full border transition-all duration-200 ease-outExpo ${
              expanded
                ? "h-9 min-w-9 px-2.5 border-volt/70 bg-ink/90 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-volt backdrop-blur-sm"
                : "h-2.5 w-2.5 border-paper/50 bg-paper/90"
            } ${state === "hidden" ? "opacity-0 scale-50" : "opacity-100"}`}
          >
            {expanded ? label : null}
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
