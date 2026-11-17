"use client";

import { site } from "@/data/site";
import { EasterEgg } from "@/components/EasterEgg";

export function Skills() {
  const loop = [...site.marquee, ...site.marquee];

  return (
    <section id="skills" className="relative overflow-hidden border-y border-paper/10 py-section">
      <div className="mx-auto mb-12 max-w-[1600px] px-gutter">
        <p className="mb-3 text-fluid-xs uppercase tracking-[0.28em] text-volt">Skills & tools</p>
        <h2 className="max-w-2xl font-display text-fluid-3xl leading-none tracking-tight">
          Craft meets code.
        </h2>
      </div>

      <div className="relative mb-16 overflow-hidden" aria-hidden>
        <div className="animate-marquee flex w-max gap-0 whitespace-nowrap">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-4 inline-flex items-center gap-4 font-display text-fluid-2xl text-paper/80 md:mx-8"
            >
              {item}
              <span className="text-volt">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-gutter md:grid-cols-3">
        {(
          [
            ["Design craft", site.skills.craft],
            ["Technical", site.skills.tech],
            ["Soft skills", site.skills.soft],
          ] as const
        ).map(([label, items]) => (
          <div key={label}>
            <h3 className="mb-4 text-fluid-xs uppercase tracking-[0.22em] text-paper/55">{label}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-paper/25 px-3 py-1.5 text-fluid-sm text-paper/85 transition-colors hover:border-volt hover:text-volt"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-[1600px] px-gutter">
        <EasterEgg />
      </div>
    </section>
  );
}
