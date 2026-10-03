import type { Metadata } from "next";
import Link from "next/link";
import { AiWorkflowDiagram } from "@/components/ai-workflow-diagrams";
import { SectionNav } from "@/components/section-nav";
import { ArrowLink, ButtonLink, Chip } from "@/components/ui";
import { articleSections, toolChoices } from "@/data/ai-coding";
import { aiCodingPost as post } from "@/data/blog";
import { profile } from "@/data/profile";
import { articleJsonLd, JsonLdScript } from "@/lib/json-ld";

const path = `/blog/${post.slug}`;
const contents = articleSections.map(({ id, title }) => ({ id, label: title }));
const wordCount = articleSections.reduce((count, section) => count + [section.title, ...section.paragraphs, section.example?.text ?? ""].join(" ").split(/\s+/).length, 0) + toolChoices.reduce((count, tool) => count + tool.detail.split(/\s+/).length, 0);
const readingMinutes = Math.ceil(wordCount / 220);

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    url: path,
    authors: [profile.name],
    publishedTime: post.publishedAt,
  },
  twitter: { card: "summary_large_image", title: post.title, description: post.description },
};

export default function AiCodingPage() {
  return (
    <article className="pb-16 sm:pb-24">
      <JsonLdScript data={{ ...articleJsonLd({ path, headline: post.title, description: post.description }), "@type": "BlogPosting", datePublished: post.publishedAt }} />
      <header className="container-x pt-8 sm:pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-3">
          <Link href="/blog" className="link-rule">Writing</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink" aria-current="page">Engineering notes</span>
        </nav>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9" data-reveal>
            <ul className="mb-6 flex flex-wrap gap-2">{post.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</ul>
            <h1 className="max-w-3xl text-[2.7rem] leading-[1.04] sm:text-[4rem] lg:text-[4.7rem]">How I use AI<br /> <em className="font-normal text-brass-deep">for coding.</em></h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">A practical look at the context, conversations, and checks behind code I can stand behind.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5 text-sm lg:col-span-3 lg:flex-col lg:self-end lg:border-t-0 lg:border-l lg:pl-6">
            <div><span className="eyebrow block mb-2">Written by</span>{profile.name}</div>
            <div><time dateTime={post.publishedAt} className="block text-ink-2">25 September 2026</time><span className="mt-1 block text-ink-3">{readingMinutes} min read · 4 interactive diagrams</span></div>
          </div>
        </div>
        <div className="mt-10 rounded-[4px] bg-plate px-6 py-7 sm:px-9 sm:py-9" data-reveal>
          <span className="eyebrow text-plate-muted">The standard I work to</span>
          <p className="mt-3 max-w-3xl font-display text-2xl leading-snug text-plate-text sm:text-3xl">I should be able to explain the change, show why it works, and know what remains uncertain.</p>
        </div>
      </header>

      <div className="container-x mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
        <aside className="lg:col-span-3 lg:sticky lg:top-20 lg:self-start">
          <div className="hidden lg:block"><span className="eyebrow">Field notes / 001</span></div>
          <SectionNav items={contents} />
          <details className="rounded-[4px] border border-line px-4 py-3 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium">In this article</summary>
            <ol className="mt-3 space-y-2 border-t border-line pt-3 text-sm text-ink-2">{contents.map((item) => <li key={item.id}><a href={`#${item.id}`} className="link-rule">{item.label}</a></li>)}</ol>
          </details>
        </aside>

        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {articleSections.map((section, i) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className={`scroll-mt-28 ${i > 0 ? "mt-14 border-t border-line pt-10 sm:mt-16" : ""}`}>
              <span className="eyebrow text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
              <h2 id={`${section.id}-title`} className="mt-3 text-[1.7rem] leading-tight font-normal text-ink sm:text-[2rem]">{section.title}</h2>
              <div className="mt-5 space-y-5">{section.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">{paragraph}</p>)}</div>

              {section.id === "choosing-tools" && <div className="mt-7 grid gap-3 sm:grid-cols-2">{toolChoices.map((tool) => (
                <div key={tool.name} className="rounded-[4px] border border-line bg-paper-2/50 p-5">
                  <a href={tool.href} className="link-rule text-sm font-medium text-brass-deep">{tool.name}</a>
                  <h3 className="mt-3 text-xl leading-tight">{tool.use}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{tool.detail}</p>
                </div>
              ))}</div>}

              {section.diagram && <AiWorkflowDiagram kind={section.diagram} />}
              {section.example && <aside className="mt-7 overflow-hidden rounded-[4px] border border-line bg-paper-2/50" aria-label={section.example.title}>
                <div className="border-b border-line px-5 py-3 text-xs font-medium text-ink-2">{section.example.title}</div>
                <pre className="whitespace-pre-wrap break-words px-5 py-5 font-mono text-xs leading-[1.9] text-ink-2 sm:text-[0.8125rem]"><code>{section.example.text}</code></pre>
              </aside>}
              {section.sources && <div className="mt-6 flex flex-col items-start gap-2 text-xs leading-relaxed text-ink-3"><span className="eyebrow">References</span>{section.sources.map((source) => <a key={source.href} href={source.href} className="link-rule hover:text-brass-deep">{source.label}</a>)}</div>}
            </section>
          ))}

          <aside className="mt-14 rounded-[4px] border border-line bg-paper-2/50 p-6 text-sm leading-relaxed text-ink-2">
            <h2 className="text-xl text-ink">Further reading</h2>
            <p className="mt-3">Matt Pocock&apos;s <a href="https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w" className="link-rule text-brass-deep">AI Coding for Real Engineers</a> course syllabus helped frame the context, planning, and handoff topics in this article. The examples here illustrate my approach; the linked product documentation explains the tools themselves. Features and instruction-loading behavior can change, so I check the docs for the environment I am using.</p>
          </aside>
        </div>
      </div>
      <footer className="container-x mt-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <ArrowLink href="/#about">Back to About</ArrowLink>
          <ButtonLink href="/#contact">Let&apos;s talk engineering</ButtonLink>
        </div>
      </footer>
    </article>
  );
}
