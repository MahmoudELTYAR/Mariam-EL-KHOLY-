"use client";

import { useRef, useState } from "react";
import { useCursor } from "@/components/providers/CursorProvider";

type Frame = { x: number; y: number; w: number; h: number };

export function EasterEgg() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame>({ x: 40, y: 48, w: 170, h: 110 });
  const [dragging, setDragging] = useState<"move" | "resize" | null>(null);
  const start = useRef({ mx: 0, my: 0, ...frame });
  const { setCursor, resetCursor } = useCursor();

  const onPointerDown = (mode: "move" | "resize") => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(mode);
    start.current = { mx: e.clientX, my: e.clientY, ...frame };
    setCursor("drag", mode === "move" ? "Drag" : "Resize");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const dx = e.clientX - start.current.mx;
    const dy = e.clientY - start.current.my;

    if (dragging === "move") {
      setFrame({
        ...frame,
        x: Math.max(8, Math.min(rect.width - frame.w - 8, start.current.x + dx)),
        y: Math.max(28, Math.min(rect.height - frame.h - 8, start.current.y + dy)),
      });
    } else {
      setFrame({
        ...frame,
        w: Math.max(90, Math.min(rect.width - start.current.x - 8, start.current.w + dx)),
        h: Math.max(70, Math.min(rect.height - start.current.y - 8, start.current.h + dy)),
      });
    }
  };

  const onPointerUp = () => {
    setDragging(null);
    resetCursor();
  };

  return (
    <div className="rounded-2xl border border-paper/10 bg-ink-soft p-5 md:p-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-fluid-xs uppercase tracking-[0.22em] text-volt">Easter egg</p>
          <h3 className="mt-2 font-display text-fluid-xl">Play with a Figma frame</h3>
          <p className="mt-1 max-w-md text-fluid-sm text-paper/65">
            Drag the box. Resize from the corner. A tiny nod to the tool I use every day.
          </p>
        </div>
        <p className="font-mono text-fluid-xs text-paper/55">
          {Math.round(frame.w)} × {Math.round(frame.h)}
        </p>
      </div>

      <div
        ref={areaRef}
        className="relative h-56 touch-none overflow-hidden rounded-xl bg-[linear-gradient(90deg,rgba(237,232,223,0.05)_1px,transparent_1px),linear-gradient(rgba(237,232,223,0.05)_1px,transparent_1px)] bg-[size:24px_24px] md:h-72"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute touch-none border border-volt bg-volt/10 shadow-[0_0_0_1px_rgba(197,242,77,0.25)]"
          style={{ left: frame.x, top: frame.y, width: frame.w, height: frame.h }}
          onPointerDown={onPointerDown("move")}
          role="group"
          aria-label="Draggable design frame"
        >
          <span className="absolute -top-7 left-0 rounded bg-volt px-1.5 py-0.5 font-mono text-[10px] font-medium text-ink">
            Drag me
          </span>
          <button
            type="button"
            aria-label="Resize from the corner"
            className="absolute -bottom-2 -right-2 h-5 w-5 touch-none cursor-nwse-resize border border-ink bg-volt"
            onPointerDown={onPointerDown("resize")}
            title="Resize from the corner"
          />
          <span className="pointer-events-none absolute -bottom-7 right-0 text-[10px] uppercase tracking-[0.14em] text-paper/55">
            Resize ↘
          </span>
        </div>
      </div>
    </div>
  );
}
