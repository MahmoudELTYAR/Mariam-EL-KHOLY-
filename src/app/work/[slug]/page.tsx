import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/data/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectGallery } from "@/components/ProjectGallery";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { BackToWork } from "@/components/BackToWork";
import { SharedCover } from "@/components/SharedCover";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.cover],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <PageTransition>
      <main className="pb-20 pt-28">
        <article className="mx-auto max-w-[1600px] px-gutter">
          <BackToWork />

          <header className="mt-8 max-w-4xl">
            <Reveal>
              <p className="mb-4 text-fluid-xs uppercase tracking-[0.24em] text-volt">
                {project.category}
                {project.year ? ` · ${project.year}` : ""}
              </p>
              <h1
                className="font-display text-fluid-3xl leading-[0.95] tracking-tight"
                data-project-title={project.slug}
              >
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-2xl text-fluid-lg text-paper/75">{project.description}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-fluid-xs uppercase tracking-[0.18em] text-paper/55">Role</dt>
                  <dd className="mt-1 text-fluid-sm text-paper/85">{project.role}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="text-fluid-xs uppercase tracking-[0.18em] text-paper/55">
                      Client
                    </dt>
                    <dd className="mt-1 text-fluid-sm text-paper/85">{project.client}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-fluid-xs uppercase tracking-[0.18em] text-paper/55">Tools</dt>
                  <dd className="mt-1 text-fluid-sm text-paper/85">{project.tools.join(" · ")}</dd>
                </div>
              </dl>
            </Reveal>
          </header>

          <SharedCover
            slug={project.slug}
            src={project.cover}
            alt={project.coverAlt}
          />

          <section className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-3">
            {(
              [
                ["Problem", project.problem],
                ["Solution", project.solution],
                ["Outcome", project.outcome],
              ] as const
            ).map(([label, text], i) => (
              <Reveal key={label} delay={i * 0.05}>
                <div className="border-t border-paper/15 pt-5">
                  <h2 className="mb-3 text-fluid-xs uppercase tracking-[0.22em] text-volt">
                    {label}
                  </h2>
                  <p className="text-fluid-sm text-paper/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </section>

          <ProjectGallery gallery={project.gallery} />

          <section className="mt-24 border-t border-paper/10 pt-12">
            <p className="text-fluid-xs uppercase tracking-[0.22em] text-paper/55">Next project</p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-fluid-3xl tracking-tight">{next.title}</h2>
              <MagneticButton href={`/work/${next.slug}`}>View case study →</MagneticButton>
            </div>
            <Link
              href={`/work/${next.slug}`}
              className="group relative mt-8 block aspect-[16/10] overflow-hidden bg-ink-elev"
            >
              <Image
                src={next.cover}
                alt={next.coverAlt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 ease-outExpo group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-400 group-hover:bg-ink/20" />
            </Link>
          </section>
        </article>
      </main>
    </PageTransition>
  );
}
