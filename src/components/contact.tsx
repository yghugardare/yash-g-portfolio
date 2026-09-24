import { profile } from "@/data/profile";
import { Arrow, ArrowLink, RichText } from "@/components/ui";
import { ContactComposer } from "@/components/contact-composer";
import { ResumeButton } from "@/components/resume-button";

export function Contact() {
  const links = profile.socials.filter(
    (s) => s.label === "LinkedIn" || s.label === "GitHub",
  );
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 border-t border-line py-16 sm:py-20"
    >
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <p
            className="flex items-center gap-3 text-sm font-medium text-ink-3"
            data-reveal
          >
            <span aria-hidden="true" className="h-px w-6 bg-brass" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-5 text-[2.2rem] leading-[1.04] font-normal sm:text-[3rem] lg:text-[3.4rem]"
            data-reveal
          >
            <span className="source-sans-font">If</span> you&apos;re building something real,{" "}
            <em className="text-brass-deep italic">
              I&apos;d like to hear about it
            </em>
            .
          </h2>
          <div
            className="mt-6 flex max-w-xl flex-col gap-4 text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]"
            data-reveal
          >
            <p>
              I&apos;m a full-stack engineer in Pune. I like taking a product
              from a rough idea to something people use every day, and I care
              just as much about what happens after launch: the slow pages, the
              edge cases, the bugs nobody sees until real users show up.
            </p>
            <p>
              <RichText text="Right now I'm open to **full-stack**, **product engineering** and **forward-deployed engineer** roles. If that sounds like your team, or you just want to talk through something you're building, write to me." />
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:mt-10" data-reveal>
            {/* <a
              href={`mailto:${profile.email}`}
              className="group inline-flex w-fit max-w-full items-center gap-3 font-display text-[1.2rem] text-ink transition-colors hover:text-brass-deep sm:text-[1.6rem]"
            >
              <span className="link-rule break-all">{profile.email}</span>
              <Arrow className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-soft group-hover:translate-x-1 motion-reduce:transform-none sm:h-5 sm:w-5" />
            </a> */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ResumeButton className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brass-deep">
                Résumé
              </ResumeButton>
              {links.map((s) => (
                <ArrowLink
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </ArrowLink>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <ContactComposer email={profile.email} />
        </div>
      </div>
    </section>
  );
}
