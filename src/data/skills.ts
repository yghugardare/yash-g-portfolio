export type SkillGroup = {
  name: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    name: "Frontend & Mobile",
    items: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Capacitor",
    ],
  },
  {
    name: "Backend & APIs",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "gRPC", "Zod"],
  },
  {
    name: "AI & LLM",
    items: [
      "Vercel AI SDK",
      "OpenAI / Azure OpenAI",
      "Langflow",
      "Docling / OCR pipelines",
    ],
  },
  {
    name: "Databases & Caching",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis / Upstash",
      "Prisma",
      "Drizzle",
      "Mongoose",
    ],
  },
  {
    name: "Cloud, DevOps & Tooling",
    items: [
      "AWS S3",
      "Docker",
      "Turborepo",
      "CI/CD",
      "Git / GitHub",
      "Vite",
      "Rollup",
    ],
  },
  {
    name: "CMS, Payments & Observability",
    items: [
      "Sanity CMS",
      "Stripe",
      "Razorpay",
      "HDFC SmartGateway",
      "Sentry",
      "PostHog",
    ],
  },
  {
    name: "Testing",
    items: ["Playwright", "Vitest", "Jest"],
  },
];
