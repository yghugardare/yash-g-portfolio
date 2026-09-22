import { profile } from "@/data/profile";
import { Arrow, ButtonLink } from "@/components/ui";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 border-t border-line py-16 sm:py-20 lg:py-28"
    >
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          <span className="text-brass">05</span>
          <span aria-hidden="true" className="mx-2 text-line-strong">
            /
          </span>
          Contact
        </p>
        <h2
          id="contact-title"
          className="mt-5 max-w-3xl text-[2.2rem] leading-[1.02] font-normal sm:text-[3rem] lg:text-[3.75rem]"
          data-reveal
        >
          Building something that needs to{" "}
          <em className="text-brass-deep italic">hold up in production</em>?
          Let&apos;s talk.
        </h2>
        <p
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg"
          data-reveal
        >
          I&apos;m happy to talk about full-stack roles, platform work, or a
          hard problem you&apos;re stuck on. Email is the fastest way to reach
          me.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10" data-reveal>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex w-fit max-w-full items-center gap-3 font-display text-[1.25rem] text-ink transition-colors hover:text-brass-deep sm:text-[1.75rem]"
          >
            <span className="link-rule break-all">{profile.email}</span>
            <Arrow className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-soft group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </a>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener"
              variant="outline"
            >
              Download résumé
            </ButtonLink>
            {profile.socials
              .filter((s) => s.label === "LinkedIn" || s.label === "GitHub")
              .map((s) => (
                <ButtonLink
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                >
                  {s.label}
                </ButtonLink>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
