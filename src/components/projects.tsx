import Image from "next/image";
import { Section } from "@/components/section";
import { ArrowLink, Chip } from "@/components/ui";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";

export function Projects() {
  const github = profile.socials.find((s) => s.label === "GitHub");
  return (
    <Section
      id="projects"
      label="Projects"
      title={
        <>
          Independent work, built to{" "}
          <em className="text-brass-deep italic">production standards</em>.
        </>
      }
      deck="Open-source projects I've built outside of work. Only real, shipped things are listed here."
    >
      <ol className="flex flex-col gap-14 lg:gap-20">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ol>
      {github ? (
        <div className="mt-12 border-t border-line pt-6" data-reveal>
          <ArrowLink
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub
          </ArrowLink>
        </div>
      ) : null}
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primary = project.links[0];
  const isEven = index % 2 === 0;
  return (
    <article
      className="grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-10"
      aria-labelledby={`project-${project.slug}`}
      data-reveal
    >
      <figure
        className={`relative lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-x-2 translate-y-2 rounded-[3px] border border-brass/60 sm:translate-x-3 sm:translate-y-3"
        />
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="relative block w-full rounded-[3px] bg-paper-3 object-cover"
        />
      </figure>

      <div className={`lg:col-span-5 ${isEven ? "" : "lg:order-1"}`}>
        <p className="eyebrow flex flex-wrap gap-x-2 gap-y-1">
          <span className="text-brass">{project.year}</span>
          {project.badges.map((b) => (
            <span key={b} className="flex gap-x-2">
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
              {b}
            </span>
          ))}
        </p>
        <h3
          id={`project-${project.slug}`}
          className="mt-3 text-[1.75rem] leading-[1.1] font-normal text-ink sm:text-[2.1rem]"
        >
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          {project.tagline}
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          {project.description.map((d) => (
            <li
              key={d}
              className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
            >
              <span
                aria-hidden="true"
                className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brass"
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </ul>
        {primary ? (
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((l) => (
              <ArrowLink
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                tone="brass"
              >
                {l.label}
              </ArrowLink>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
