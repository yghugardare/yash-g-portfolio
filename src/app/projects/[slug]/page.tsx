import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ProjectImage,
  ProjectLinks,
  ProjectStats,
} from "@/components/project-parts";
import { SectionNav } from "@/components/section-nav";
import { ArrowLink, ButtonLink, Chip, RichText } from "@/components/ui";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { getProjectStats } from "@/lib/github";
import { articleJsonLd, JsonLdScript } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const description = project.details.summary;
  return {
    title: `${project.name} — Project`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${profile.name}`,
      description,
      url: `/projects/${slug}`,
      authors: [profile.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${profile.name}`,
      description,
    },
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const stats = await getProjectStats(project);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const { details } = project;

  return (
    <article className="pb-16 sm:pb-20 lg:pb-28">
      <JsonLdScript
        data={articleJsonLd({
          path: `/projects/${slug}`,
          headline: `${project.name} — Project`,
          description: details.summary,
        })}
      />

      <header className="container-x pt-8 sm:pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" data-reveal>
          <ol className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link
                href="/#projects"
                className="link-rule text-ink-3 hover:text-ink"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-line-strong">
              /
            </li>
            <li className="text-ink" aria-current="page">
              Project details
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7" data-reveal>
            <h1 className="text-[2.3rem] leading-[1.02] font-normal text-ink sm:text-[3.2rem] lg:text-[3.6rem]">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              {project.tagline}
            </p>
            <div className="mt-5">
              <ProjectStats project={project} stats={stats} large />
            </div>
            <div className="mt-7">
              <ProjectLinks project={project} showDetails={false} />
            </div>
          </div>
          <div className="lg:col-span-5" data-reveal>
            <ProjectImage
              project={project}
              sizes="(min-width: 1024px) 28rem, 100vw"
              preload
            />
          </div>
        </div>

        <hr className="mt-12 border-line lg:mt-16" />
      </header>

      <div className="container-x mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <aside
          className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
          data-reveal
        >
          <p className="eyebrow">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </ul>
          <SectionNav
            items={[
              { id: "context", label: "Context" },
              ...details.sections.map((s) => ({
                id: slugify(s.heading),
                label: s.heading,
              })),
            ]}
          />
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <section
            id="context"
            aria-labelledby="context-title"
            className="scroll-mt-24"
            data-reveal
          >
            <h2
              id="context-title"
              className="text-[1.6rem] leading-tight font-normal text-ink sm:text-[1.9rem]"
            >
              Context
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
              <RichText text={details.context} />
            </p>
          </section>

          {details.sections.map((section) => {
            const id = slugify(section.heading);
            return (
              <section
                key={id}
                id={id}
                aria-labelledby={`${id}-title`}
                className="mt-12 scroll-mt-24 border-t border-line pt-10"
                data-reveal
              >
                <h2
                  id={`${id}-title`}
                  className="text-[1.6rem] leading-tight font-normal text-ink sm:text-[1.9rem]"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]"
                    >
                      <RichText text={p} />
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brass"
                        />
                        <span>
                          <RichText text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>

      <footer className="container-x mt-16 border-t border-line pt-10 lg:mt-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {next.slug !== project.slug ? (
              <>
                <p className="eyebrow">Next project</p>
                <Link
                  href={`/projects/${next.slug}`}
                  className="group mt-3 block"
                >
                  <span className="block font-display text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-brass-deep sm:text-[2.2rem]">
                    {next.name}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink-2">
                    {next.tagline}
                  </span>
                </Link>
              </>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9 lg:items-end">
            <ButtonLink href="/#contact">Get in touch</ButtonLink>
            <ArrowLink href="/#projects">Back to all projects</ArrowLink>
          </div>
        </div>
      </footer>
    </article>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
