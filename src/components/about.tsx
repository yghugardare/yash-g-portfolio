import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { Arrow, ButtonLink } from "@/components/ui";

export function About() {
  return (
    <Section
      id="about"
      label="About How I Work"
      title={
        <>
          Think it through. Build it well.{" "}
          <em className="text-brass-deep italic">Own the outcome.</em>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-7" data-reveal>
          <p className="text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
            {profile.summary[0]}
          </p>
          <blockquote className="mt-2 border-l-2 border-brass py-1 pl-5 sm:pl-6">
            <p className="font-display text-xl leading-relaxed text-ink sm:text-[1.375rem]">
              &ldquo;{profile.summary[1]}&rdquo;
            </p>
          </blockquote>
          <div className="mt-2">
            <ButtonLink href="/blog/how-i-use-ai-for-coding" variant="outline">
              Learn More <Arrow className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
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
    </Section>
  );
}
