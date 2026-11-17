"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { otherWork } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

function Portrait() {
  const [hasPhoto, setHasPhoto] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    const img = new window.Image();
    img.onload = () => alive && setHasPhoto(true);
    img.onerror = () => alive && setHasPhoto(false);
    img.src = "/mariam.jpg";
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="group relative mt-8 aspect-[4/5] w-full max-w-sm overflow-hidden border border-paper/15 bg-ink-elev">
      {hasPhoto ? (
        <Image
          src="/mariam.jpg"
          alt={`${site.name} portrait`}
          fill
          sizes="(max-width: 1024px) 90vw, 384px"
          className="object-cover transition-transform duration-700 ease-outExpo group-hover:scale-[1.03]"
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,242,77,0.16),transparent_45%),linear-gradient(160deg,#121212,#080808)]"
          aria-hidden={hasPhoto === null}
        >
          <div className="flex h-full flex-col justify-between p-6">
            <span className="text-fluid-xs uppercase tracking-[0.22em] text-paper/55">
              {site.role}
            </span>
            <div>
              <p className="font-display text-[clamp(5rem,22vw,8rem)] leading-none text-volt/90">
                M
              </p>
              <p className="mt-2 text-fluid-sm text-paper/65">
                {site.firstName} {site.lastName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
      <div className="mx-auto grid max-w-[1600px] gap-12 px-gutter lg:grid-cols-12 lg:gap-10">
        <div className="about-reveal lg:col-span-5">
          <p className="mb-4 text-fluid-xs uppercase tracking-[0.28em] text-volt">About</p>
          <h2 className="max-w-xl font-display text-[clamp(1.6rem,1.1rem+2vw,2.75rem)] leading-[1.15] tracking-tight">
            {site.about.lead}
          </h2>
          <Portrait />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="about-reveal text-fluid-lg text-paper/80">{site.about.body}</p>

          <div className="about-reveal mt-14 space-y-10">
            <h3 className="text-fluid-xs uppercase tracking-[0.24em] text-paper/55">Experience</h3>
            {site.experience.map((job) => (
              <article key={job.title} className="border-t border-paper/10 pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-fluid-xl">{job.title}</h4>
                  <span className="text-fluid-xs text-volt">{job.period}</span>
                </div>
                <p className="mt-1 text-fluid-sm text-paper/65">{job.org}</p>
                <ul className="mt-4 space-y-2 text-fluid-sm text-paper/75">
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
              <h3 className="mb-3 text-fluid-xs uppercase tracking-[0.24em] text-paper/55">
                Education
              </h3>
              <p className="font-display text-fluid-lg">{site.education.program}</p>
              <p className="mt-1 text-fluid-sm text-paper/65">{site.education.school}</p>
              <p className="mt-2 text-fluid-xs text-volt">
                {site.education.period} · {site.education.detail}
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-fluid-xs uppercase tracking-[0.24em] text-paper/55">
                Certifications
              </h3>
              <ul className="space-y-3">
                {site.certifications.map((c) => (
                  <li key={c.title}>
                    <p className="text-fluid-sm text-paper/90">{c.title}</p>
                    <p className="text-fluid-xs text-paper/60">
                      {c.org} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-reveal mt-14">
            <h3 className="mb-4 text-fluid-xs uppercase tracking-[0.24em] text-paper/55">
              Other work
            </h3>
            <ul className="space-y-4">
              {otherWork.map((item) => (
                <li key={item.title} className="border-l border-volt/50 pl-4">
                  <p className="font-medium text-paper/95">{item.title}</p>
                  <p className="text-fluid-sm text-paper/65">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
