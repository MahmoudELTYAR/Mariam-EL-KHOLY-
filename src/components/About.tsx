"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { otherWork } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={ref} className="relative border-t border-paper/10 bg-ink py-section">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-gutter lg:grid-cols-12 lg:gap-10">
        <div className="about-reveal lg:col-span-5">
          <p className="mb-4 text-fluid-xs uppercase tracking-[0.28em] text-volt">About</p>
          <h2 className="font-display text-fluid-3xl leading-[1.05] tracking-tight">
            {site.about.lead}
          </h2>
          <div className="mt-8 aspect-[4/5] w-full max-w-sm overflow-hidden bg-ink-elev">
            <div className="flex h-full flex-col justify-between border border-dashed border-paper/20 p-6 text-paper/40">
              <span className="text-fluid-xs uppercase tracking-[0.2em]">Portrait</span>
              <p className="text-fluid-sm">
                Photo placeholder — drop a portrait into{" "}
                <code className="text-volt">/public/mariam.jpg</code> when ready.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="about-reveal text-fluid-lg text-paper/75">{site.about.body}</p>

          <div className="about-reveal mt-14 space-y-10">
            <h3 className="text-fluid-xs uppercase tracking-[0.24em] text-paper/45">Experience</h3>
            {site.experience.map((job) => (
              <article key={job.title} className="border-t border-paper/10 pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-fluid-xl">{job.title}</h4>
                  <span className="text-fluid-xs text-volt">{job.period}</span>
                </div>
                <p className="mt-1 text-fluid-sm text-paper/55">{job.org}</p>
                <ul className="mt-4 space-y-2 text-fluid-sm text-paper/70">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-volt" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="about-reveal mt-14 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-fluid-xs uppercase tracking-[0.24em] text-paper/45">Education</h3>
              <p className="font-display text-fluid-lg">{site.education.program}</p>
              <p className="mt-1 text-fluid-sm text-paper/60">{site.education.school}</p>
              <p className="mt-2 text-fluid-xs text-volt">
                {site.education.period} · {site.education.detail}
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-fluid-xs uppercase tracking-[0.24em] text-paper/45">Certifications</h3>
              <ul className="space-y-3">
                {site.certifications.map((c) => (
                  <li key={c.title}>
                    <p className="text-fluid-sm">{c.title}</p>
                    <p className="text-fluid-xs text-paper/50">
                      {c.org} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-reveal mt-14">
            <h3 className="mb-4 text-fluid-xs uppercase tracking-[0.24em] text-paper/45">
              Other work
            </h3>
            <ul className="space-y-4">
              {otherWork.map((item) => (
                <li key={item.title} className="border-l border-volt/40 pl-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-fluid-sm text-paper/55">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
