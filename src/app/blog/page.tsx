import type { Metadata } from "next";
import { ArrowLink, Chip } from "@/components/ui";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on software engineering, AI, and how I work.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="container-x py-12 sm:py-20">
      <span className="eyebrow">Engineering notes</span>
      <h1 className="mt-5 text-5xl sm:text-6xl">Thinking out loud.</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">Notes on building software, working with AI, and making decisions I can stand behind.</p>
      <div className="mt-12 border-t border-line">
        {posts.map((post) => <article key={post.slug} className="grid gap-5 border-b border-line py-8 sm:grid-cols-[1fr_2fr]">
          <div><time dateTime={post.publishedAt} className="eyebrow">{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time><ul className="mt-4 flex flex-wrap gap-2">{post.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</ul></div>
          <div><h2 className="text-3xl">{post.title}</h2><p className="mt-3 max-w-xl leading-relaxed text-ink-2">{post.description}</p><ArrowLink href={`/blog/${post.slug}`} className="mt-5">Read the article</ArrowLink></div>
        </article>)}
      </div>
    </div>
  );
}
