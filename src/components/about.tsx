import { Section } from "@/components/section";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section
      id="about"
      number="04"
      label="About"
      title={
        <>
          Interested in the parts of products that{" "}
          <em className="text-brass-deep italic">fail quietly</em>.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-7" data-reveal>
          {profile.summary.map((p) => (
            <p
              key={p}
              className="text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]"
            >
              {p}
            </p>
          ))}
        </div>

        <dl
          className="grid gap-6 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1"
          data-reveal
        >
          <div className="border-t border-line pt-4">
            <dt className="eyebrow">Education</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink">
              {profile.education.degree}
              <br />
              <span className="text-ink-2">
                {profile.education.institution}
              </span>
              <br />
              <span className="text-ink-3">{profile.education.period}</span>
            </dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="eyebrow">Elsewhere</dt>
            <dd className="mt-2">
              <ul className="flex flex-col gap-1.5 text-sm">
                {profile.socials.map((s) => (
                  <li key={s.href} className="flex justify-between gap-3">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="link-rule text-ink"
                    >
                      {s.label}
                    </a>
                    <span className="truncate font-mono text-xs text-ink-3">
                      {s.handle}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <aside
        aria-labelledby="ai-heading"
        className="mt-14 rounded-[4px] bg-plate px-6 py-9 text-plate-text sm:mt-20 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        data-reveal
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h3
              id="ai-heading"
              className="font-sans text-xs tracking-[0.14em] uppercase text-plate-muted"
            >
              {profile.aiStatement.heading}
            </h3>
          </div>
          <div className="lg:col-span-9">
            <p className="font-display text-[1.45rem] leading-[1.3] text-plate-text sm:text-[1.85rem] lg:text-[2.1rem]">
              {profile.aiStatement.body}
            </p>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-plate-muted sm:text-base">
              {profile.aiStatement.detail}
            </p>
          </div>
        </div>
      </aside>
    </Section>
  );
}
