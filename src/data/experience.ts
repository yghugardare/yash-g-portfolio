export type Metric = {
  value: string;
  label: string;
};

export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Engagement = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  stack: string[];
  metrics: Metric[];
  highlights: string[];
  caseStudy: {
    summary: string;
    context: string;
    sections: CaseStudySection[];
    collaboration?: string;
  };
};

export type Role = {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  start: string;
  end: string | null;
  type: string;
  location: string;
  summary: string;
  engagements: Engagement[];
};

const courseMarketingPlatform: Engagement = {
  slug: "course-marketing-platform",
  name: "Course Marketing Platform",
  tagline:
    "Migrating a revenue-critical course platform off a third-party vendor onto Next.js 16 and Sanity CMS — without dropping traffic or performance.",
  role: "Technical lead for migration and architecture",
  period: "2025 – present",
  stack: [
    "Next.js 16",
    "Sanity CMS",
    "Upstash Redis",
    "Cache Components / PPR",
    "Zustand",
    "Sentry",
  ],
  metrics: [
    { value: "~300K", label: "monthly visits served" },
    { value: "400+", label: "course landing pages" },
    { value: "95%+", label: "fewer Sanity API requests" },
    { value: "85+ / 95+", label: "PageSpeed performance / SEO" },
  ],
  highlights: [
    "Led the migration of CA Monk's established course marketing platform — the surface behind its course sales — from Graphy to Next.js 16 and Sanity CMS, eliminating the third-party landing-page dependency and its commissions.",
    "Architected a caching and event-driven revalidation layer using Next.js Cache Components/PPR, Sanity webhooks, and Upstash Redis, cutting Sanity API requests by 95%+ while keeping sub-second response times.",
    "Optimized high-traffic landing pages to 85+ PageSpeed performance and 95+ SEO scores with JSON-LD structured data, dynamic metadata, sitemaps, and crawlability improvements; integrated Sentry for production observability.",
  ],
  caseStudy: {
    summary:
      "400+ course landing pages and 350+ blog pages, ~300K monthly views, and the company's course checkout — moved from a vendor platform to an architecture we fully own.",
    context:
      "CA Monk's course marketing pages lived on Graphy, a third-party platform. It worked, but it cost commissions, limited what we could do with performance and SEO, and kept a revenue-critical surface outside our control. The platform had already proven its scale and business impact before the migration; the job was to replace the foundation underneath it without disrupting either.",
    sections: [
      {
        heading: "What we built",
        paragraphs: [
          "A Next.js 16 application backed by Sanity CMS. Admins create and manage course content in Sanity Studio; the site renders 400+ course landing pages and 350+ blog pages through a fast, SEO-optimized UI that handles course discovery and purchase. I led the migration and owned the overall platform architecture.",
        ],
      },
      {
        heading: "The caching problem",
        paragraphs: [
          "High-traffic pages fed by a headless CMS have an obvious failure mode: every request that misses cache hits the CMS API, and free-tier rate limits or third-party costs become a production risk. The naïve alternative — long TTLs — means editors publish a change and wait.",
          "I designed the data-fetching layer around Partial Prerendering and Next.js Cache Components, so the static shell of each page is served from the edge and only genuinely dynamic slots are streamed. Revalidation is event-driven rather than time-based: Sanity webhooks fire on publish, and an Upstash Redis sorted set debounces rapid Studio publishes inside a 120-second window. A scheduled cron then executes targeted, tag-based cache revalidation for exactly the content that changed.",
          "The result was a 95%+ reduction in Sanity API requests, sub-second edge response times, and a platform that stays inside its API budget regardless of how often editors publish.",
        ],
      },
      {
        heading: "Performance, SEO, and observability",
        paragraphs: [
          "The pages needed to rank and convert, so I treated performance as a product requirement. The platform scores 85+ on PageSpeed across LCP, INP, and TTFB, and 95+ on SEO — with JSON-LD structured data, dynamic metadata, sitemaps, and crawlability work aimed at both search and generative engines.",
          "I added Sentry for error tracking and logging so production issues surface with context, and implemented the client-side cart with Zustand.",
        ],
      },
    ],
    collaboration:
      "I served as technical lead for the migration and architecture, and worked alongside two other engineers on course cart flows, Sanity block distribution, reusable UI variants, presentation mode, and SEO handling.",
  },
};

const mobileApp: Engagement = {
  slug: "mobile-app",
  name: "CA Monk Mobile App",
  tagline:
    "Shipping CA Monk's first Android and iOS app from scratch by turning an existing React monorepo into a native product — not rewriting it.",
  role: "Led development and launch",
  period: "2025 – present",
  stack: [
    "Capacitor",
    "React",
    "TypeScript",
    "Android / iOS",
    "Secure Storage",
    "Google Play",
  ],
  metrics: [
    { value: "90%+", label: "code reuse from web" },
    { value: "Day 1", label: "feature parity with web tools" },
    { value: "2", label: "Android build flavors from one codebase" },
    { value: "Live", label: "on Google Play Store" },
  ],
  highlights: [
    "Led development and launch of CA Monk's cross-platform Android/iOS application from scratch using Capacitor, React, and TypeScript, achieving 90%+ code reuse from the existing web ecosystem while maintaining feature parity across career tools.",
    "Built native integrations for file upload/download, camera and microphone access, app lifecycle handling, and deep-link payment reconciliation.",
    "Automated multi-flavor Android builds for internal testing and production distribution on the Google Play Store.",
  ],
  caseStudy: {
    summary:
      "One codebase, two platforms, every existing tool available on day one — with the native auth, file, payment, and hardware work that a webview can't do on its own.",
    context:
      "CA Monk's web platform already had a large ecosystem of complex, battle-tested tools — the AI Resume Builder, ATS Resume Scorer, AI Interview Bot, Versant tests, technical and aptitude exams, mentorship booking — built as modular React packages in a monorepo. The question was how to get all of that onto phones without a six-month detour into Kotlin, Swift, or a React Native rewrite.",
    sections: [
      {
        heading: "Why Capacitor",
        paragraphs: [
          "I chose Capacitor for speed and code reuse. It let me package the existing web code into a bundled native shell, which gave us over 90% code reuse and immediate feature parity on day one. The trade-off is that a webview doesn't magically handle auth, files, payments, or hardware the way a native app does — so that's where the real engineering went.",
        ],
      },
      {
        heading: "Auth and security",
        paragraphs: [
          "Web cookies and redirects break inside mobile webviews. I engineered an in-app auth system that stores 30-day refresh tokens in the native OS Keychain (iOS) and Keystore (Android) via secure storage, and an Axios adapter with an in-flight refresh mutex so parallel requests hitting 401 trigger a single silent refresh instead of logging the user out.",
          "For onboarding, I integrated native Google Sign-In through Credential Manager and automatic SMS OTP retrieval on Android, so users never type a code by hand.",
        ],
      },
      {
        heading: "Files, payments, and hardware",
        paragraphs: [
          "Users pick resume PDFs from device storage through the Capacitor File Picker, and exported resumes are saved directly to the Documents folder with a notification that opens the PDF in the native reader.",
          "The in-app checkout for coin top-ups and mentor bookings opens payment gateways in an in-app browser sheet, captures custom deep-link callbacks, and reconciles transaction status with the backend even if the user closes the browser or loses network mid-payment.",
          "For the AI Interview Bot and Versant tests I enabled camera and microphone streaming, handled app lifecycle states to save progress, and isolated test screens — hiding navigation and intercepting the Android back button — so users don't accidentally exit and lose a coin-funded attempt.",
        ],
      },
      {
        heading: "Builds and release",
        paragraphs: [
          "I wrote automation to maintain two Android flavors from one codebase — CA Monk Labs for internal testing and CA Monk for customers — generated 15+ adaptive launcher icons automatically, and shipped the production release to the Google Play Store.",
          "Current work is bringing the native LMS into the app so students can stream video courses, track lesson progress, and take quizzes on mobile, removing the last dependency on third-party learning platforms.",
        ],
      },
    ],
  },
};

const aiResumeSuite: Engagement = {
  slug: "ai-resume-builder",
  name: "AI Resume Builder & ATS Scorer",
  tagline:
    "Full-stack work on CA Monk's most-used tool: a resume builder, ATS scorer, and cover-letter suite with a resilient document pipeline and deterministic AI scoring.",
  role: "Full-stack engineer",
  period: "2025 – present",
  stack: [
    "React",
    "Redux Toolkit",
    "TanStack Query",
    "Node.js / Express",
    "PostgreSQL / Prisma",
    "Vercel AI SDK",
    "Puppeteer",
    "Docling / OCR",
  ],
  metrics: [
    { value: "100K+", label: "candidates served" },
    { value: "3-tier", label: "ingestion fallback chain" },
    { value: "<50ms", label: "local PDF text extraction" },
    { value: "temp 0", label: "deterministic parsing config" },
  ],
  highlights: [
    "Built full-stack features for an AI Resume Builder, ATS Resume Scorer, and Cover Letter suite using React, Redux Toolkit, TanStack Query, Node.js/Express, PostgreSQL/Prisma, Puppeteer, and the Vercel AI SDK.",
    "Engineered a multi-stage PDF/DOC/DOCX ingestion pipeline with fast local text extraction, Docling/OCR fallbacks, heuristic quality validation, and AI-based parsing into structured resume sections using OpenAI/Azure OpenAI models.",
    "Implemented prompt-injection safeguards, strict JSON-schema validation, and fallback logic to improve AI output reliability; developed a Puppeteer-based one-page resume rendering mode for ATS-friendly PDF exports.",
  ],
  caseStudy: {
    summary:
      "The most heavily used tool on the platform, serving over 100,000 candidates and driving coin-based monetization — built to accept messy real-world resumes and return scores that are fair and reproducible.",
    context:
      "Resume tooling looks simple until real users upload real files: scanned PDFs, exported DOCX, three-page resumes that need to become one page. I worked across the React frontend and Node.js/Express backend, owning the builder's save, summary-generation, and PDF download paths, and collaborating with the core backend team on the AI pipeline.",
    sections: [
      {
        heading: "One-Page Mode",
        paragraphs: [
          "While investigating customer issues I noticed a recurring complaint: downloaded resumes spilled onto a second page, breaking the concise, ATS-friendly format users wanted. I dug into the PDF rendering and layout behaviour to understand why content overflowed, then designed a One-Page Mode that renders the resume onto a single page while preserving its structure. It's a Puppeteer-based export path, and state for it — along with configuration and theming — is managed through Redux and TanStack Query on the frontend.",
        ],
      },
      {
        heading: "Document ingestion that degrades gracefully",
        paragraphs: [
          "Rather than send every upload to an expensive or slow external API, I built a multi-tiered fallback chain. Digital PDFs go through local stream extraction first — sub-50ms, no network, no third-party cost. Extracted text is validated with regex heuristics for essential contact signals (phone, email, LinkedIn); if it fails, the pipeline falls back to IBM Docling for layout-aware conversion, and finally to Docling with forced OCR for scanned image PDFs.",
        ],
      },
      {
        heading: "Structured AI parsing you can trust",
        paragraphs: [
          "The parsing pipeline started in Langflow workflows; I transitioned the core to the Vercel AI SDK with OpenAI and Azure OpenAI models. I chose a model that strictly honours temperature 0 to avoid hallucinated fields and rescan variance, and enforced strict Zod schemas so the model returns validated JSON covering basics, education, work, skills, certifications, and custom sections.",
          "Because uploaded resumes are untrusted input, I engineered a security boundary so the model treats resume text purely as data to analyse, never as instructions to follow. The parser also classifies each work-experience bullet by finance domain — statutory audit, internal audit, direct tax, indirect tax, risk advisory — which feeds scoring downstream.",
        ],
      },
      {
        heading: "Generative features and deterministic scoring",
        paragraphs: [
          "On the generative side I built an AI Summary Generator conditioned on domain, seniority, and target job description; an AI Work Experience Generator for quantifiable, achievement-oriented bullets; and an AI Skills Generator that runs a semantic gap analysis against a target JD.",
          "For ATS scoring I architected a two-phase asynchronous fan-out in Express: structured extraction first, then parallel evaluation workers for grammar, seniority depth, and JD relevance. Instead of letting the LLM invent a score, a deterministic keyword taxonomy engine matches bullets against validated domain taxonomies — so scores are fair, reproducible, and much cheaper in tokens.",
          "The frontend editor, built with React and Redux Toolkit, supports drag-and-drop section ordering, a live A4 print/PDF preview, and instant ATS health-check feedback.",
        ],
      },
    ],
    collaboration:
      "Parts of the backend — the pipeline implementation and the Vercel AI SDK integration — were built in collaboration with two core backend engineers on system planning and implementation. I wasn't the backend lead; I owned my slices end to end.",
  },
};

const internCareerTools: Engagement = {
  slug: "career-tools-frontend",
  name: "Career Tools Frontend & Performance",
  tagline:
    "Building the user-facing career tools and taking the web app's Lighthouse performance score from 56 to 85+.",
  role: "Frontend Developer Intern",
  period: "Sep 2024 – Apr 2025",
  stack: [
    "React",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "Redux Toolkit",
    "TanStack Query",
    "shadcn/ui",
    "Zod",
    "PostHog",
  ],
  metrics: [
    { value: "56 → 85+", label: "Lighthouse performance" },
    { value: "6+", label: "career tools instrumented" },
    { value: "5", label: "production surfaces built" },
  ],
  highlights: [
    "Built responsive production interfaces for the Resume Scorer, Salary Estimator, Articleship Scorer, User Dashboard, and Home Page using React, TypeScript, Redux Toolkit, TanStack Query, Tailwind CSS, shadcn/ui, and Zod.",
    "Drove a frontend performance overhaul through route-level code splitting, tree shaking, Gzip/Brotli compression, asset preloading, and rendering optimizations, improving Lighthouse performance from 56 to 85+ and Core Web Vitals.",
    "Integrated PostHog analytics to track authenticated user journeys and conversion/drop-off funnels across 6+ career tools, and implemented recovery handling for stale dynamic-import failures after deployments.",
  ],
  caseStudy: {
    summary:
      "Complete frontend flows for five production surfaces, a measurable performance overhaul, and the analytics needed to see where users got stuck.",
    context:
      "As a frontend intern I focused entirely on the core user-facing tools web app: a React + Vite + TypeScript monorepo styled with Tailwind, with Redux Toolkit and TanStack Query for state and data.",
    sections: [
      {
        heading: "Interfaces shipped",
        paragraphs: [
          "I implemented the complete frontend and responsive flows for the Resume Scorer (desktop and mobile result screens with grammar, impact, and formatting breakdowns plus interactive history), the Salary Estimator (modular UI powered by custom React Query hooks), and the Articleship Scorer (an end-to-end evaluation flow with score reveal animations and error handling). I also built the User Dashboard and primary Home Page with accessible shadcn/ui components and Zod-validated forms.",
        ],
      },
      {
        heading: "Performance overhaul",
        paragraphs: [
          "Slow initial loads were hurting Core Web Vitals on the landing page and tools. I restructured the Vite build: route-level code splitting with React.lazy and Suspense backed by tailored skeleton loaders; automated Gzip and Brotli compression for assets over 10KB; and monorepo-wide tree-shaking with sideEffects audits across shared packages.",
          "On the critical rendering path, I preloaded hero WebP assets with high fetch priority, preloaded carousel visuals programmatically, and applied font-display: swap to eliminate render-blocking font flashes. Together this significantly reduced JS/CSS payloads and moved the Lighthouse performance score from 56 to 85+, with clear gains in LCP, INP, and TTFB.",
        ],
      },
      {
        heading: "Observability and stability",
        paragraphs: [
          "I integrated PostHog with user identification synced to Redux auth state, so we could track sessions, conversion and drop-off funnels across 6+ career tools, and pinpoint UI friction during test submissions.",
          "I also fixed a nasty production issue: stale dynamic-import cache misses after deployments were causing infinite reload loops. A sessionStorage-based chunk reload recovery guard resolved it.",
        ],
      },
    ],
  },
};

export const roles: Role[] = [
  {
    company: "CA Monk",
    title: "Full Stack Developer",
    period: "Apr 2025 – Present",
    start: "2025-04",
    end: null,
    type: "Full-time · Remote",
    location: "Remote",
    summary:
      "Leading platform-level work across web, mobile, and AI products for a career platform serving finance professionals.",
    engagements: [courseMarketingPlatform, mobileApp, aiResumeSuite],
  },
  {
    company: "CA Monk",
    title: "Frontend Developer Intern",
    period: "Sep 2024 – Apr 2025",
    start: "2024-09",
    end: "2025-04",
    type: "Internship · Remote",
    location: "Remote",
    summary:
      "Built the core user-facing career tools and drove the web app's first serious performance overhaul.",
    engagements: [internCareerTools],
  },
];

export const engagements: Engagement[] = roles.flatMap((r) => r.engagements);

export function getEngagement(slug: string): Engagement | undefined {
  return engagements.find((e) => e.slug === slug);
}

export function getRoleForEngagement(slug: string): Role | undefined {
  return roles.find((r) => r.engagements.some((e) => e.slug === slug));
}
