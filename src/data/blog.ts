// Blog content model. Intentionally empty for now: no /blog UI ships until posts exist.
// When posts are added, `sitemap.ts` and navigation (`site.ts`) pick them up from here.
export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  tags: string[];
  canonicalUrl?: string;
};

export const posts: Post[] = [];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
