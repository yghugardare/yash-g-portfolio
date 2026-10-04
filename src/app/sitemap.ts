import type { MetadataRoute } from "next";
import { engagements } from "@/data/experience";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const work: MetadataRoute.Sitemap = engagements.map((e) => ({
    url: `${site.url}/work/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const blogIndex: MetadataRoute.Sitemap = posts.length
    ? [{ url: `${site.url}/blog`, changeFrequency: "monthly", priority: 0.6 }]
    : [];
  return [...home, ...work, ...projectPages, ...blogIndex, ...blog];
}
