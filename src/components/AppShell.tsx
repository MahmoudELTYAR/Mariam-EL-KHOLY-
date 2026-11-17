"use client";

import { useCallback, useState } from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import { ScrollRestorer } from "@/components/ScrollRestorer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true);
  const onDone = useCallback(() => setBooting(false), []);

  return (
    <CursorProvider>
      <SmoothScroll>
        {booting && <Preloader onDone={onDone} />}
        <ScrollRestorer />
        <div>
          <Header />
          {children}
        </div>
        <div className="grain" aria-hidden />
      </SmoothScroll>
    </CursorProvider>
  );
}
