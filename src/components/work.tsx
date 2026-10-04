import { Section } from "@/components/section";
import { CountUp } from "@/components/count-up";
import { ArrowLink, RichText } from "@/components/ui";
import { roles, type Engagement } from "@/data/experience";

export function Work() {
  return (
    <Section
      id="work"
      label="Work"
      title={
        <>
          Two years at CA Monk, <span className="source-sans-font">from</span> intern to{" "}
          <em className="text-brass-deep italic">
            leading the web and mobile platform
          </em>
          .
        </>
      }
      deck="CA Monk is a career platform for finance professionals. Everything below is live and used by real people, and each project has a case study if you want the details."
    >
      <div className="flex flex-col gap-16 lg:gap-24">
        {roles.map((role, roleIndex) => (
          <article
            key={`${role.company}-${role.title}`}
            className="grid gap-8 lg:grid-cols-12 lg:gap-8"
            aria-labelledby={`role-${roleIndex}`}
          >
            <header
              className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start lg:pr-10"
              data-reveal
            >
              <p className="text-sm text-ink-3 tabular-nums">{role.period}</p>
              <h3
                id={`role-${roleIndex}`}
                className="mt-2 text-2xl leading-tight font-normal text-ink"
              >
                {role.title}
              </h3>
              <p className="mt-1 text-base text-ink-2">{role.company}</p>
              <p className="mt-3 text-sm text-ink-3">{role.type}</p>
              <p className="mt-5 hidden text-sm leading-relaxed text-ink-2 lg:block">
                {role.summary}
              </p>
            </header>

            <div className="lg:col-span-9">
              <ol className="flex flex-col">
                {role.engagements.map((engagement) => (
                  <li
                    key={engagement.slug}
                    className="border-t border-line py-10 first:border-t-0 first:pt-0 sm:py-12"
                  >
                    <EngagementBlock engagement={engagement} />
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

function EngagementBlock({ engagement }: { engagement: Engagement }) {
  return (
    <article
      className="flex flex-col gap-7"
      aria-labelledby={`eng-${engagement.slug}`}
      data-reveal
    >
      <div>
        <h4
          id={`eng-${engagement.slug}`}
          className="font-display text-[1.75rem] leading-[1.1] font-normal text-ink sm:text-[2.1rem]"
        >
          {engagement.name}
        </h4>
        <p className="mt-2 font-display text-base text-ink-3 italic">
          {engagement.role}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
          {engagement.tagline}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-3">
        {engagement.metrics.map((m) => (
          <div key={m.label} className="flex flex-col">
            <dt className="order-2 mt-1.5 text-xs leading-snug text-ink-3">
              {m.label}
            </dt>
            <dd className="order-1 font-display text-[1.4rem] leading-none text-ink tabular-nums sm:text-[1.6rem]">
              <CountUp value={m.value} />
            </dd>
          </div>
        ))}
      </dl>

      <ul className="flex max-w-3xl flex-col gap-4">
        {engagement.highlights.map((h) => (
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="text-sm leading-relaxed text-ink-3">
          <span className="sr-only">Built with: </span>
          {engagement.stack.join(" · ")}
        </p>
        <ArrowLink
          href={`/work/${engagement.slug}`}
          tone="brass"
          className="shrink-0"
        >
          Read the case study
        </ArrowLink>
      </div>
    </article>
  );
}
