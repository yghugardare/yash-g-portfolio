// Published posts are included in the sitemap and the blog index.
export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  tags: string[];
  canonicalUrl?: string;
};

export const aiCodingPost: Post = {
  slug: "how-i-use-ai-for-coding",
  title: "How I use AI for coding",
  description: "My engineering workflow for coding with AI: clear requirements, focused context, useful handoffs, and code I can stand behind.",
  publishedAt: "2026-09-25",
  tags: ["AI engineering", "Developer workflow"],
};

export const posts: Post[] = [aiCodingPost];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
