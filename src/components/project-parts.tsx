import Image from "next/image";
import { CountUp } from "@/components/count-up";
import { ArrowLink, RichText } from "@/components/ui";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";

export function ProjectImage({
  project,
  sizes,
  preload = false,
}: {
  project: Project;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div className="rounded-[4px] border border-line-strong bg-paper-2 p-1.5 shadow-[6px_6px_0_0_var(--color-paper-3),6px_6px_0_1px_var(--color-line)] sm:p-2 sm:shadow-[10px_10px_0_0_var(--color-paper-3),10px_10px_0_1px_var(--color-line)]">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes={sizes}
        preload={preload}
        unoptimized={project.image.src.endsWith(".svg")}
        className="block h-auto w-full rounded-[2px] bg-paper-3"
      />
    </div>
  );
}

export function ProjectStats({
  project,
  stats,
  large = false,
}: {
  project: Project;
  stats: RepoStats | null;
  large?: boolean;
}) {
  const repoUrl = project.repo ? `https://github.com/${project.repo}` : null;
  const icon = large ? "h-[1.05rem] w-[1.05rem]" : "h-4 w-4";
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3 tabular-nums ${
        large ? "text-base" : "text-sm"
      }`}
    >
      <span>{project.kind}</span>
      {stats && repoUrl ? (
        <>
          <span aria-hidden="true" className="text-line-strong">
            ·
          </span>
          <a
            href={`${repoUrl}/stargazers`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${stats.stars} GitHub stars`}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className={`${icon} fill-transparent stroke-brass transition-[transform,fill] duration-300 ease-out-soft group-hover:scale-110 group-hover:rotate-[72deg] group-hover:fill-brass-soft motion-reduce:transform-none`}
            >
              <path
                d="M8 1.6l1.95 3.95 4.35.63-3.15 3.07.74 4.33L8 11.53l-3.89 2.05.74-4.33L1.7 6.18l4.35-.63L8 1.6z"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            <CountUp value={String(stats.stars)} />
          </a>
          <a
            href={`${repoUrl}/forks`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${stats.forks} forks`}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className={`${icon} stroke-brass transition-transform duration-300 ease-out-soft group-hover:-translate-y-0.5 motion-reduce:transform-none`}
            >
              <circle cx="4" cy="3.25" r="1.75" strokeWidth="1.3" />
              <circle cx="12" cy="3.25" r="1.75" strokeWidth="1.3" />
              <circle cx="8" cy="12.75" r="1.75" strokeWidth="1.3" />
              <path
                d="M4 5v1.25a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5M8 8.25V11"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <CountUp value={String(stats.forks)} />
          </a>
        </>
      ) : null}
    </div>
  );
}

export function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((h) => (
        <li
          key={h}
          className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
        >
          <span
            aria-hidden="true"
            className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brass"
          />
          <span>
            <RichText text={h} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectStack({ stack }: { stack: string[] }) {
  return (
    <p className="text-sm leading-relaxed text-ink-3">
      <span className="sr-only">Built with: </span>
      {stack.join(" · ")}
    </p>
  );
}

export function ProjectLinks({
  project,
  showDetails = true,
}: {
  project: Project;
  showDetails?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {showDetails ? (
        <ArrowLink href={`/projects/${project.slug}`}>
          View project details
        </ArrowLink>
      ) : null}
      {project.links.demo ? (
        <ArrowLink
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          tone="brass"
        >
          Live demo
        </ArrowLink>
      ) : null}
      {project.links.github ? (
        <ArrowLink
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          tone="brass"
        >
          GitHub
        </ArrowLink>
      ) : null}
    </div>
  );
}
