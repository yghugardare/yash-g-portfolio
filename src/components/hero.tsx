import Image from "next/image";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui";

const facts = [
  { label: "Role", value: `${profile.role}, ${profile.company}` },
  { label: "Based", value: `${profile.location} · IST` },
  { label: "Experience", value: "2+ years in production" },
  { label: "Now", value: "Bringing CA Monk's LMS to mobile" },
];

const delay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="container-x pt-8 pb-14 sm:pt-14 sm:pb-20 lg:pt-24 lg:pb-28"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        {/* Identity row on mobile; at lg the wrapper dissolves so the portrait can occupy its own column. */}
        <div className="flex items-center gap-4 sm:gap-5 lg:contents">
          <figure
            className="relative h-[5.5rem] w-[4.5rem] shrink-0 sm:h-28 sm:w-[5.75rem] lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mr-3 lg:mb-3 lg:h-auto lg:w-full"
            data-reveal
            style={delay(120)}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[3px] border border-brass/70 sm:translate-x-2 sm:translate-y-2 lg:translate-x-3 lg:translate-y-3"
            />
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 28vw, 6rem"
              preload
              fetchPriority="high"
              className="relative block h-full w-full rounded-[3px] bg-paper-3 object-cover object-top"
            />
            <figcaption className="eyebrow mt-4 hidden justify-between lg:flex">
              <span>{profile.name}</span>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
          <div className="lg:hidden" data-reveal>
            <p className="eyebrow">{profile.role}</p>
            <p className="mt-2 font-display text-xl leading-tight text-ink">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-ink-3">{profile.location}</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:row-start-1">
          <p className="eyebrow hidden lg:block" data-reveal>
            {profile.name}
            <span aria-hidden="true" className="mx-2 text-line-strong">
              /
            </span>
            {profile.role}
          </p>

          <h1
            id="hero-title"
            className="text-[2.45rem] leading-[1.02] font-normal text-ink sm:text-[3.4rem] lg:mt-7 lg:text-[4.35rem] xl:text-[4.9rem]"
            data-reveal
            style={delay(80)}
          >
            {profile.headline.lead}{" "}
            <em className="font-display text-brass-deep italic [font-variation-settings:'SOFT'_60,'WONK'_1]">
              {profile.headline.emphasis}
            </em>{" "}
            {profile.headline.tail}
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:mt-8 sm:text-lg"
            data-reveal
            style={delay(160)}
          >
            {profile.intro}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
            data-reveal
            style={delay(240)}
          >
            <ButtonLink href="/#work">See the work</ButtonLink>
            <ButtonLink
              href={profile.resumeUrl}
              variant="outline"
              target="_blank"
              rel="noopener"
            >
              Résumé (PDF)
            </ButtonLink>
          </div>
        </div>
      </div>

      <dl
        className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:mt-20 lg:grid-cols-4"
        data-reveal
        style={delay(300)}
      >
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="eyebrow">{f.label}</dt>
            <dd className="mt-2 text-sm leading-snug text-ink sm:text-[0.9375rem]">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
