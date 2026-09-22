import { profile } from "@/data/profile";
import { site } from "@/data/site";

type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: profile.name,
    url: site.url,
    image: `${site.url}${profile.photo.src}`,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    worksFor: {
      "@type": "Organization",
      name: profile.company,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
    sameAs: profile.socials.map((s) => s.href),
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Capacitor",
      "PostgreSQL",
      "Redis",
      "Sanity CMS",
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    author: { "@id": `${site.url}/#person` },
  };
}

export function articleJsonLd(input: {
  slug: string;
  headline: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: `${site.url}/work/${input.slug}`,
    mainEntityOfPage: `${site.url}/work/${input.slug}`,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    inLanguage: "en",
  };
}

export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
