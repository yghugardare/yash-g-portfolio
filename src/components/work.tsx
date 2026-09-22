import type { CSSProperties } from "react";
import { Section } from "@/components/section";
import { ArrowLink, Chip } from "@/components/ui";
import { roles, type Engagement } from "@/data/experience";

export function Work() {
  return (
    <Section
      id="work"
      number="01"
      label="Work"
      title={
        <>
          Two years at CA Monk, from intern to{" "}
          <em className="text-brass-deep italic">
            leading platform migrations
          </em>
          .
        </>
      }
      deck="CA Monk is a career platform for finance professionals. Every engagement below is production software with real users; each one has a case study with the decisions behind it."
    >
      <div className="flex flex-col gap-16 lg:gap-24">
        {roles.map((role, roleIndex) => (
          <article
            key={`${role.company}-${role.title}`}
            className="grid gap-8 lg:grid-cols-12 lg:gap-8"
            aria-labelledby={`role-${roleIndex}`}
          >
            <header
              className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
              data-reveal
            >
              <p className="eyebrow">{role.period}</p>
              <h3
                id={`role-${roleIndex}`}
                className="mt-3 text-2xl leading-tight font-normal text-ink"
              >
                {role.title}
              </h3>
              <p className="mt-1 text-base text-ink-2">{role.company}</p>
              <p className="mt-3 text-sm text-ink-3">{role.type}</p>
              <p className="mt-5 hidden max-w-[16rem] text-sm leading-relaxed text-ink-2 lg:block">
                {role.summary}
              </p>
            </header>

            <div className="lg:col-span-9">
              <ol className="flex flex-col">
                {role.engagements.map((engagement, i) => (
                  <li
                    key={engagement.slug}
                    className="border-t border-line py-9 first:pt-0 first:border-t-0 sm:py-12 lg:first:pt-0"
                  >
                    <EngagementBlock
                      engagement={engagement}
                      index={`${String(roleIndex + 1).padStart(2, "0")}.${i + 1}`}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function EngagementBlock({
  engagement,
  index,
}: {
  engagement: Engagement;
  index: string;
}) {
  return (
    <article
      className="grid gap-7 lg:grid-cols-9 lg:gap-x-8"
      aria-labelledby={`eng-${engagement.slug}`}
      data-reveal
    >
      <div className="lg:col-span-9">
        <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-brass">{index}</span>
          <span aria-hidden="true" className="text-line-strong">
            /
          </span>
          <span>{engagement.role}</span>
        </p>
        <h4
          id={`eng-${engagement.slug}`}
          className="mt-3 font-display text-[1.75rem] leading-[1.1] font-normal text-ink sm:text-[2.1rem]"
        >
          {engagement.name}
        </h4>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
          {engagement.tagline}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-5 gap-y-5 border-y border-line py-5 sm:grid-cols-4 lg:col-span-9">
        {engagement.metrics.map((m, i) => (
          <div
            key={m.label}
            className="flex flex-col"
            data-reveal
            style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
          >
            <dt className="order-2 mt-2 text-xs leading-snug text-ink-3">
              {m.label}
            </dt>
            <dd className="order-1 font-display text-[1.65rem] leading-none text-ink tabular-nums sm:text-[1.9rem]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="flex flex-col gap-3.5 lg:col-span-6">
        {engagement.highlights.map((h) => (
          <li
            key={h}
            className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
          >
            <span
              aria-hidden="true"
              className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brass"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-6 lg:col-span-3">
        <div>
          <p className="eyebrow">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {engagement.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </ul>
        </div>
        <ArrowLink href={`/work/${engagement.slug}`} tone="brass">
          Read the case study
        </ArrowLink>
      </div>
    </article>
  );
}
