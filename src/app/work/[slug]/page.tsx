import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, ButtonLink, Chip } from "@/components/ui";
import {
  engagements,
  getEngagement,
  getRoleForEngagement,
} from "@/data/experience";
import { profile } from "@/data/profile";
import { articleJsonLd, JsonLdScript } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return engagements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const engagement = getEngagement(slug);
  if (!engagement) return {};
  const role = getRoleForEngagement(slug);
  const title = `${engagement.name} — Case study`;
  const description = engagement.caseStudy.summary;
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      title: `${engagement.name} — ${profile.name}`,
      description,
      url: `/work/${slug}`,
      authors: [profile.name],
      section: role?.company,
    },
    twitter: {
      card: "summary_large_image",
      title: `${engagement.name} — ${profile.name}`,
      description,
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const engagement = getEngagement(slug);
  const role = getRoleForEngagement(slug);
  if (!engagement || !role) notFound();

  const index = engagements.findIndex((e) => e.slug === slug);
  const next = engagements[(index + 1) % engagements.length];
  const { caseStudy } = engagement;

  return (
    <article className="pb-16 sm:pb-20 lg:pb-28">
      <JsonLdScript
        data={articleJsonLd({
          slug,
          headline: `${engagement.name} — Case study`,
          description: caseStudy.summary,
        })}
      />

      <header className="container-x pt-8 sm:pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" data-reveal>
          <ol className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link
                href="/#work"
                className="link-rule text-ink-3 hover:text-ink"
              >
                Work
              </Link>
            </li>
            <li aria-hidden="true" className="text-line-strong">
              /
            </li>
            <li>{role.company}</li>
            <li aria-hidden="true" className="text-line-strong">
              /
            </li>
            <li className="text-ink" aria-current="page">
              Case study
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1
              className="text-[2.3rem] leading-[1.02] font-normal text-ink sm:text-[3.2rem] lg:text-[3.9rem]"
              data-reveal
            >
              {engagement.name}
            </h1>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl"
              data-reveal
            >
              {engagement.tagline}
            </p>
          </div>
          <dl
            className="grid grid-cols-2 gap-5 border-t border-line pt-5 text-sm lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:self-end lg:border-t-0 lg:pt-0"
            data-reveal
          >
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1.5 text-ink">{engagement.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">Period</dt>
              <dd className="mt-1.5 text-ink">{engagement.period}</dd>
            </div>
            <div>
              <dt className="eyebrow">Company</dt>
              <dd className="mt-1.5 text-ink">
                {role.company} · {role.title}
              </dd>
            </div>
          </dl>
        </div>

        <dl
          className="mt-12 grid grid-cols-2 gap-x-5 gap-y-6 border-y border-line py-6 sm:grid-cols-4 lg:mt-16"
          data-reveal
        >
          {engagement.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-xs leading-snug text-ink-3">
                {m.label}
              </dt>
              <dd className="order-1 font-display text-[1.9rem] leading-none text-ink tabular-nums sm:text-[2.3rem]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container-x mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <aside
          className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
          data-reveal
        >
          <p className="eyebrow">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {engagement.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </ul>
          <nav aria-label="On this page" className="mt-10 hidden lg:block">
            <p className="eyebrow">Contents</p>
            <ol className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="#context"
                  className="link-rule text-ink-2 hover:text-ink"
                >
                  Context
                </a>
              </li>
              {caseStudy.sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${slugify(s.heading)}`}
                    className="link-rule text-ink-2 hover:text-ink"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <section
            id="context"
            aria-labelledby="context-title"
            className="scroll-mt-24"
            data-reveal
          >
            <h2
              id="context-title"
              className="text-[1.6rem] leading-tight font-normal text-ink sm:text-[1.9rem]"
            >
              Context
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
              {caseStudy.context}
            </p>
          </section>

          {caseStudy.sections.map((section) => {
            const id = slugify(section.heading);
            return (
              <section
                key={id}
                id={id}
                aria-labelledby={`${id}-title`}
                className="mt-12 scroll-mt-24 border-t border-line pt-10"
                data-reveal
              >
                <h2
                  id={`${id}-title`}
                  className="text-[1.6rem] leading-tight font-normal text-ink sm:text-[1.9rem]"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brass"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}

          {caseStudy.collaboration ? (
            <aside
              aria-label="Collaboration note"
              className="mt-12 border-l-2 border-brass bg-paper-2/60 px-5 py-4 sm:px-6 sm:py-5"
              data-reveal
            >
              <p className="eyebrow">Who did what</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                {caseStudy.collaboration}
              </p>
            </aside>
          ) : null}
        </div>
      </div>

      <footer className="container-x mt-16 border-t border-line pt-10 lg:mt-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Next case study</p>
            <Link href={`/work/${next.slug}`} className="group mt-3 block">
              <span className="block font-display text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-brass-deep sm:text-[2.2rem]">
                {next.name}
              </span>
              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink-2">
                {next.tagline}
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9 lg:items-end">
            <ButtonLink href="/#contact">Get in touch</ButtonLink>
            <ArrowLink href="/#work">Back to all work</ArrowLink>
          </div>
        </div>
      </footer>
    </article>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
