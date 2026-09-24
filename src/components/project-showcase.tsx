"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { Arrow } from "@/components/ui";
import {
  ProjectHighlights,
  ProjectImage,
  ProjectLinks,
  ProjectStack,
  ProjectStats,
} from "@/components/project-parts";

type Item = { project: Project; stats: RepoStats | null };

const DESKTOP = "(min-width: 64rem)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(DESKTOP);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

export function ProjectShowcase({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const scroller = useRef<HTMLOListElement>(null);
  const frame = useRef(0);
  const isDesktop = useIsDesktop();
  const hasTabs = items.length > 1;
  const tabbed = hasTabs && isDesktop;

  // Mobile carousel: the slide whose left edge is closest to the scroll position is current.
  function onScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = scroller.current;
      if (!el) return;
      const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      const cards = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft - pad - el.scrollLeft);
        const best = Math.abs(cards[closest].offsetLeft - pad - el.scrollLeft);
        if (distance < best) closest = i;
      });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        closest = cards.length - 1;
      }
      setSlide(closest);
    });
  }

  function goToSlide(index: number) {
    const el = scroller.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left: card.offsetLeft - pad,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    const next =
      event.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : event.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`project-tab-${items[next].project.slug}`)?.focus();
  }

  return (
    <div>
      {hasTabs ? (
        <div
          role="tablist"
          aria-label="Projects"
          onKeyDown={onKeyDown}
          className="mb-12 hidden gap-8 border-b border-line lg:flex"
        >
          {items.map(({ project }, i) => {
            const selected = i === active;
            return (
              <button
                key={project.slug}
                id={`project-tab-${project.slug}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`project-panel-${project.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group -mb-px flex-1 cursor-pointer border-b-2 pt-1 pb-4 text-left transition-colors duration-200 motion-reduce:transition-none ${
                  selected
                    ? "border-brass"
                    : "border-transparent hover:border-line-strong"
                }`}
              >
                <span
                  className={`block font-display text-xl leading-tight transition-colors duration-200 motion-reduce:transition-none ${
                    selected ? "text-ink" : "text-ink-3 group-hover:text-ink"
                  }`}
                >
                  {project.shortName ?? project.name}
                </span>
                <span className="mt-1.5 block text-xs text-ink-3">
                  {project.kind}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <ol
        ref={scroller}
        onScroll={onScroll}
        className="relative flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:block lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={item.project.slug}
            id={`project-panel-${item.project.slug}`}
            className={`w-full shrink-0 snap-start rounded-[4px] border border-line bg-paper-2/40 p-4 sm:p-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 ${
              i === active ? "" : "lg:hidden"
            }`}
            {...(tabbed
              ? {
                  role: "tabpanel",
                  "aria-labelledby": `project-tab-${item.project.slug}`,
                  tabIndex: 0,
                }
              : hasTabs
                ? {
                    "aria-roledescription": "slide",
                    "aria-label": `${i + 1} of ${items.length}`,
                  }
                : {})}
          >
            <ProjectCard {...item} preload={i === 0} />
          </li>
        ))}
      </ol>

      {hasTabs ? (
        <div className="mt-5 flex items-center justify-between lg:hidden">
          <p className="text-sm text-ink-3 tabular-nums" aria-live="polite">
            {slide + 1} / {items.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous project"
              disabled={slide === 0}
              onClick={() => goToSlide(slide - 1)}
              className="icon-button h-10 w-10 disabled:cursor-default disabled:opacity-35"
            >
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next project"
              disabled={slide === items.length - 1}
              onClick={() => goToSlide(slide + 1)}
              className="icon-button h-10 w-10 disabled:cursor-default disabled:opacity-35"
            >
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, stats, preload }: Item & { preload: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `project-details-${project.slug}`;

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid gap-7 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8"
    >
      <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
        <ProjectImage
          project={project}
          sizes="(min-width: 1024px) 34rem, 100vw"
          preload={preload}
        />
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
        <ProjectStats project={project} stats={stats} />
        <h3
          id={`project-${project.slug}`}
          className="mt-2 text-[1.75rem] leading-[1.1] font-normal text-ink sm:text-[2.1rem]"
        >
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          {project.tagline}
        </p>

        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded(!expanded)}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-ink lg:hidden"
        >
          {expanded ? "Hide details" : "Show details"}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path
              d="M3.5 6 8 10.5 12.5 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          id={detailsId}
          className={`mt-3 lg:mt-6 ${expanded ? "" : "max-lg:hidden"}`}
        >
          <ProjectHighlights items={project.highlights} />
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
        <ProjectStack stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
