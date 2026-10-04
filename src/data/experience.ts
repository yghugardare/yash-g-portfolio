export type Metric = {
  value: string;
  label: string;
};

export type DiagramNode = {
  title: string;
  meta?: string;
  detail: string;
};

export type DiagramStep = {
  /** Text on the arrow leading into this step. */
  label?: string;
  nodes: DiagramNode[];
};

export type Diagram = {
  title: string;
  steps: DiagramStep[];
};

export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  diagram?: Diagram;
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
    "Moved our course sales site off Graphy and onto Next.js 16 and Sanity, without losing traffic or speed.",
  role: "Tech lead, migration and architecture",
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
    { value: "~300K", label: "visits a month" },
    { value: "₹6.8 Cr+", label: "platform revenue since Jan 2025 (US$710K+)" },
    { value: "95%+", label: "fewer Sanity API calls" },
  ],
  highlights: [
    "Led the team that moved the site from Graphy to **Next.js 16** and **Sanity**. This site is where people find and buy our courses, so it had to keep working the whole way through. We also stopped paying Graphy's commissions.",
    "Built the caching layer with **Cache Components**, **Sanity webhooks** and **Upstash Redis**. Pages only refresh when content actually changes, which ==cut Sanity API calls by 95%+==.",
    "Got the busiest pages to ==85+ on PageSpeed and 95+ on SEO==, and added **GEO and AEO** support so our courses can show up in AI answers too, using JSON-LD, dynamic metadata, sitemaps, robots.txt and llms.txt. Also set up **Sentry** for error tracking.",
  ],
  caseStudy: {
    summary:
      "Moved 400+ course pages, 350+ blog posts and the course checkout from Graphy to a Next.js 16 and Sanity setup we own, while the site kept serving ~300K visits a month.",
    context:
      "Our course marketing pages lived on Graphy. It worked, but we paid commissions on sales, had little control over performance or SEO, and the site that sells our courses sat on someone else's platform. The platform was already doing well, with ==₹6.8 Cr+ in revenue since January 2025==, so the goal wasn't to reinvent it. The goal was to replace what it runs on **without hurting sales or search rankings**.",
    sections: [
      {
        heading: "What we built",
        paragraphs: [
          "A **Next.js 16** app with **Sanity** as the CMS. The content team manages courses and blog posts in Sanity Studio, and the site renders ==400+ course pages and 350+ blog posts== that handle discovery and checkout. **I led the migration and owned the architecture.** The cart runs on the client with Zustand.",
        ],
      },
      {
        heading: "Caching and revalidation",
        paragraphs: [
          "The risk with a headless CMS behind high-traffic pages is that **every cache miss turns into a Sanity API call**. With enough traffic you run into rate limits or a bigger bill. Long cache TTLs avoid that, but then an editor publishes a fix and it doesn't show up for a while.",
          "I built the pages on **Partial Prerendering** and **Cache Components**. The static shell of each page is served from cache and only the parts that actually change are streamed in. **Revalidation is driven by publishing instead of a timer.** A Sanity webhook hits our route on publish, and the route adds the affected cache tags to an **Upstash Redis** sorted set. Editors often publish several times in a row, so tags wait in a 120-second window. A scheduled cron picks up tags that have settled and calls revalidateTag for just those.",
          "==Sanity API requests dropped by 95%+==, responses stay under a second, and it doesn't matter how often the content team hits publish.",
        ],
        diagram: {
          title: "How a publish reaches the site",
          steps: [
            {
              nodes: [
                {
                  title: "Editor publishes",
                  meta: "Sanity Studio",
                  detail:
                    "Someone on the content team edits a course or blog post and hits publish. Nothing on the site changes yet.",
                },
              ],
            },
            {
              label: "webhook",
              nodes: [
                {
                  title: "Webhook route",
                  meta: "Next.js route handler",
                  detail:
                    "Sanity calls our route with the document that changed. The route works out which cache tags that document affects.",
                },
              ],
            },
            {
              label: "queue the tags",
              nodes: [
                {
                  title: "Redis sorted set",
                  meta: "Upstash, 120s window",
                  detail:
                    "Each tag is stored with a timestamp as its score. Publishing the same thing again just updates the timestamp, so a burst of publishes turns into one entry.",
                },
              ],
            },
            {
              label: "scheduled cron",
              nodes: [
                {
                  title: "Revalidate settled tags",
                  meta: "revalidateTag",
                  detail:
                    "The cron takes tags that haven't changed for 120 seconds, calls revalidateTag for each one and removes them from the set.",
                },
              ],
            },
            {
              label: "next request",
              nodes: [
                {
                  title: "Cached page",
                  meta: "PPR + Cache Components",
                  detail:
                    "The affected pages are rebuilt once with fresh content and served from cache again. Visitors never wait on Sanity directly.",
                },
                {
                  title: "Sanity API",
                  meta: "only called on rebuild",
                  detail:
                    "Sanity is only queried when a tagged page is rebuilt, not on every visit. That's where the 95%+ drop in API requests comes from.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Performance, SEO and AI search",
        paragraphs: [
          "These pages need to rank and convert, so speed was part of the spec from the start. The busiest pages score ==85+ on PageSpeed performance==, looking at LCP, INP and TTFB, and ==95+ on SEO==.",
          "We also wanted our courses to show up in AI answers, not only in Google results. So alongside regular SEO I added support for **GEO and AEO** (generative and answer engine optimization): **JSON-LD structured data** on course and blog pages, dynamic metadata for every page, sitemaps generated with sitemap.ts, a proper robots.txt, and an **llms.txt** that gives AI crawlers a clean overview of the site.",
          "I set up **Sentry** for error tracking and logging, so when something breaks in production we get the stack trace and context instead of a vague report.",
        ],
      },
    ],
    collaboration:
      "I was the **technical lead for the migration and the architecture**. Other engineers on the team worked with me on the course cart flows, distributing Sanity content blocks, reusable UI variants, presentation mode and SEO handling.",
  },
};

const mobileApp: Engagement = {
  slug: "mobile-app",
  name: "CA Monk Mobile App",
  tagline:
    "Built our first Android and iOS app by wrapping the existing React code with Capacitor instead of rewriting it.",
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
    { value: "90%+", label: "of the code reused from web" },
    { value: "1", label: "codebase for Android and iOS" },
    { value: "Live", label: "on Google Play" },
  ],
  highlights: [
    "Picked **Capacitor** so the tools we already had on web could run on phones. That gave us ==90%+ code reuse== and every tool on day one.",
    "Built the native parts a webview can't handle on its own: **file upload and download**, **camera and mic** for interview tests, and **deep-link payments** that still reconcile if the user closes the browser halfway.",
    "Automated two Android builds from one codebase, one for internal testing and one for customers, and shipped the app ==live on Google Play==.",
  ],
  caseStudy: {
    summary:
      "One codebase for Android and iOS, with every existing web tool available from the first release, plus the native auth, file, payment and hardware work a webview can't do on its own.",
    context:
      "Our web platform already had a lot of mature tools: the AI Resume Builder, ATS Resume Scorer, AI Interview Bot, Versant tests, technical and aptitude exams, and mentorship booking. They live as modular React packages in a monorepo. The question was how to get all of that onto phones **without spending six months rewriting it** in Kotlin, Swift or React Native.",
    sections: [
      {
        heading: "Why Capacitor",
        paragraphs: [
          "I picked **Capacitor** for speed and code reuse. It bundles the existing web code into a native shell, which gave us ==90%+ code reuse and every tool on day one==. The catch is that a webview doesn't handle auth, files, payments or hardware the way a native app does, so that's where most of the engineering went.",
        ],
        diagram: {
          title: "How the app is put together",
          steps: [
            {
              nodes: [
                {
                  title: "Web tools",
                  meta: "React packages from the monorepo",
                  detail:
                    "Resume Builder, ATS Scorer, AI Interview Bot, Versant and aptitude tests, mentorship booking. These are the same packages the web app uses. Nothing was rewritten for mobile.",
                },
              ],
            },
            {
              label: "bundled into",
              nodes: [
                {
                  title: "App shell",
                  meta: "React + TypeScript",
                  detail:
                    "Routing, layout and the mobile auth layer. The Axios adapter with the refresh mutex lives here, so parallel 401s trigger one token refresh instead of logging the user out.",
                },
              ],
            },
            {
              label: "native calls through Capacitor plugins",
              nodes: [
                {
                  title: "Secure storage",
                  meta: "Keychain / Keystore",
                  detail:
                    "30-day refresh tokens are kept in the iOS Keychain and Android Keystore instead of cookies, which aren't reliable inside a webview.",
                },
                {
                  title: "Files",
                  meta: "File Picker + Filesystem",
                  detail:
                    "Users pick resume PDFs from their device. Exported resumes are saved to Documents with a notification that opens the PDF in the native viewer.",
                },
                {
                  title: "Payments",
                  meta: "Browser sheet + deep link",
                  detail:
                    "Checkout opens in an in-app browser sheet. The gateway comes back through a camonk:// deep link, and the app confirms the transaction with our backend even if the user closed the sheet or lost network.",
                },
                {
                  title: "Camera and mic",
                  meta: "Interview Bot, Versant",
                  detail:
                    "Streams camera and mic for interview practice and tests, saves progress when the app goes to the background, and blocks the Android back button on test screens.",
                },
              ],
            },
            {
              label: "built and shipped as",
              nodes: [
                {
                  title: "CA Monk Labs",
                  meta: "internal Android build",
                  detail:
                    "The internal testing flavor, built from the same codebase as the customer app.",
                },
                {
                  title: "CA Monk",
                  meta: "live on Google Play",
                  detail:
                    "The customer build. The same build scripts produce both Android flavors and generate 15+ adaptive launcher icons.",
                },
                {
                  title: "iOS",
                  meta: "same bundle",
                  detail:
                    "The iOS project uses the same web bundle and the same plugins.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Auth and sign-in",
        paragraphs: [
          "Cookies and redirects are unreliable inside a mobile webview, so web auth didn't carry over. I built in-app auth that stores 30-day refresh tokens in the **iOS Keychain and Android Keystore** through a secure storage plugin. On top of that, an **Axios adapter holds a refresh mutex**. If several requests get a 401 at the same time, ==only one refresh call goes out== and the others wait for the new token, instead of each one trying to refresh and logging the user out.",
          "For sign-up I added native **Google Sign-In** through Credential Manager and automatic SMS OTP reading on Android, so users don't have to type codes.",
        ],
      },
      {
        heading: "Files, payments and hardware",
        paragraphs: [
          "Users pick resume PDFs from device storage with the **Capacitor File Picker**. Exported resumes are saved straight to the Documents folder, with a notification that opens the PDF in the phone's viewer.",
          "Payments took the most care. Checkout for coin top-ups and mentor bookings opens the gateway in an in-app browser sheet. When payment finishes, the gateway redirects to a **camonk://payment-return deep link** that the app catches. People close sheets early and lose network halfway through, so ==the app reconciles the transaction status with our backend== instead of relying on the redirect alone.",
          "The AI Interview Bot and Versant tests need the **camera and mic**. I handled app lifecycle events so progress is saved when the app goes to the background, and **locked down test screens** by hiding navigation and intercepting the Android back button. Tests cost coins, so accidentally leaving one is a real loss for the user.",
        ],
      },
      {
        heading: "Builds and release",
        paragraphs: [
          "I wrote scripts that build **two Android flavors from one codebase**: CA Monk Labs for internal testing and CA Monk for customers. The same scripts generate 15+ adaptive launcher icons. The customer build is ==live on Google Play==.",
          "Right now I'm bringing our **LMS into the app** so students can stream courses, track progress and take quizzes on mobile. Once that ships, we won't need Graphy for learning either.",
        ],
      },
    ],
  },
};

const aiResumeSuite: Engagement = {
  slug: "ai-resume-builder",
  name: "AI Resume Builder & ATS Scorer",
  tagline:
    "Full-stack work on the most-used tool on the platform: a resume builder, ATS scorer and cover letter writer.",
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
    { value: "100K+", label: "candidates have used it" },
    { value: "<50ms", label: "text extraction for digital PDFs" },
  ],
  highlights: [
    "Worked across the **React** frontend and **Node.js/Express** backend, mostly on saving resumes, AI summaries and PDF downloads.",
    "Worked with the backend team on the upload pipeline for PDF, DOC and DOCX. It tries ==fast local extraction first==, falls back to **Docling** and OCR for harder files, then parses the text into resume sections with **OpenAI** models.",
    "Added prompt-injection guards and strict **Zod** schemas so the AI output stays reliable. I also built ==One-Page Mode== after noticing users kept complaining that their downloads spilled onto a second page.",
  ],
  caseStudy: {
    summary:
      "The most-used tool on the platform, used by 100K+ candidates. Most of the work was making it handle messy real-world resumes and give the same score for the same resume every time.",
    context:
      "Resume tools look simple until people upload real files: scanned PDFs, exported DOCX files, three-page resumes that need to fit on one. I worked across the **React** frontend and the **Node.js/Express** backend. **I owned saving resumes, AI summary generation and PDF downloads**, and worked with the core backend team on the AI pipeline.",
    sections: [
      {
        heading: "One-Page Mode",
        paragraphs: [
          "While going through customer issues I kept seeing the same complaint: downloaded resumes spilled onto a second page. I dug into how our PDF rendering and layout worked to see why content overflowed, then built ==One-Page Mode==, which fits the resume onto a single page and keeps its structure intact. The export runs through **Puppeteer**. On the frontend, the mode, template config and theming are managed with **Redux Toolkit** and **TanStack Query**.",
        ],
      },
      {
        heading: "Handling messy uploads",
        paragraphs: [
          "Sending every upload to an external parsing API would have been slow and expensive, and most resumes don't need it. So the pipeline **tries the cheapest option first and only escalates when it has to**.",
          "Digital PDFs go through local text extraction, which ==takes under 50ms== and never leaves our server. The result is checked with regex heuristics for basic contact details like a phone number, email or LinkedIn URL. If those are missing, the text probably came out garbled, so the file goes to **IBM Docling** for layout-aware conversion. If that still fails, which usually means a scanned image, Docling runs again with **OCR** forced on.",
        ],
        diagram: {
          title: "Upload fallback chain",
          steps: [
            {
              nodes: [
                {
                  title: "Upload",
                  meta: "PDF, DOC or DOCX",
                  detail:
                    "Users upload whatever they have. Most files are digital PDFs, but scans and Word documents come in too.",
                },
              ],
            },
            {
              label: "try the cheap path first",
              nodes: [
                {
                  title: "Local text extraction",
                  meta: "under 50ms, no network",
                  detail:
                    "Reads the text stream straight out of digital PDFs. No external calls and no cost per file.",
                },
              ],
            },
            {
              label: "no phone, email or LinkedIn found",
              nodes: [
                {
                  title: "Docling",
                  meta: "layout-aware conversion",
                  detail:
                    "If the contact check fails, the file goes to IBM Docling, which handles columns and complex layouts much better than a raw text stream.",
                },
              ],
            },
            {
              label: "still unreadable, usually a scan",
              nodes: [
                {
                  title: "Docling with OCR",
                  meta: "force_ocr",
                  detail:
                    "The last resort for scanned or image-only PDFs. It's the slowest step, so only files that need it end up here.",
                },
              ],
            },
            {
              label: "clean text",
              nodes: [
                {
                  title: "Structured parsing",
                  meta: "Vercel AI SDK + Zod",
                  detail:
                    "The text goes to the model with a strict Zod schema and comes back as validated JSON: basics, education, work, skills, certifications and custom sections.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Parsing we can trust",
        paragraphs: [
          "Parsing started out as Langflow workflows. We moved the core of it to the **Vercel AI SDK** with OpenAI and Azure OpenAI models. I picked a model that **strictly respects temperature 0**, because newer reasoning models would sometimes invent fields or return different results for the same file. Every response is checked against a strict **Zod** schema.",
          "Uploaded resumes are untrusted input, so there's a **prompt-injection guard** that makes the model treat resume text purely as data to analyze, never as instructions. The parser also tags every work experience bullet with a finance domain, like statutory audit, internal audit, direct tax, indirect tax or risk advisory. The scorer uses those tags later.",
        ],
      },
      {
        heading: "Generation and scoring",
        paragraphs: [
          "I built three generators: a **summary generator** that takes domain, seniority and the target job description into account, a **work experience generator** that writes measurable, achievement-focused bullets, and a **skills generator** that compares the resume against a JD and suggests what's missing.",
          "ATS scoring runs in two phases in Express. Phase one does structured extraction. Phase two runs grammar, seniority depth and JD relevance checks in parallel. **The score itself doesn't come from the model.** A keyword taxonomy engine matches bullets against validated finance-domain taxonomies, so ==the same resume gets the same score every time== and we spend far fewer tokens.",
          "The editor is built with **React** and **Redux Toolkit**. It has drag-and-drop section ordering, a live A4 preview and instant ATS feedback.",
        ],
        diagram: {
          title: "How an ATS score is produced",
          steps: [
            {
              nodes: [
                {
                  title: "Parsed resume",
                  meta: "plus an optional JD",
                  detail:
                    "Output from the parsing step, with every work bullet already tagged by finance domain.",
                },
              ],
            },
            {
              label: "phase 1",
              nodes: [
                {
                  title: "Structured extraction",
                  meta: "Zod schema, temperature 0",
                  detail:
                    "Pulls out what the checks need, like roles, bullets, skills and dates, in a fixed shape.",
                },
              ],
            },
            {
              label: "phase 2, in parallel",
              nodes: [
                {
                  title: "Grammar",
                  meta: "worker",
                  detail:
                    "Flags grammar and phrasing problems bullet by bullet.",
                },
                {
                  title: "Seniority depth",
                  meta: "worker",
                  detail:
                    "Checks whether the experience reads at the level the candidate is applying for.",
                },
                {
                  title: "JD relevance",
                  meta: "worker",
                  detail:
                    "Compares the resume with the target job description when one is provided.",
                },
              ],
            },
            {
              label: "scored by rules, not the model",
              nodes: [
                {
                  title: "Keyword taxonomy engine",
                  meta: "deterministic",
                  detail:
                    "Matches bullets against validated finance-domain taxonomies. Because the score comes from these rules, it's reproducible and cheap to compute.",
                },
              ],
            },
            {
              label: "back to the editor",
              nodes: [
                {
                  title: "Score and fixes",
                  meta: "ATS health check",
                  detail:
                    "The candidate sees the score along with specific things to fix, right inside the editor.",
                },
              ],
            },
          ],
        },
      },
    ],
    collaboration:
      "I wasn't the backend lead. The pipeline implementation and the Vercel AI SDK integration were planned and built together with the core backend engineering team. **I owned my parts end to end.**",
  },
};

const internCareerTools: Engagement = {
  slug: "career-tools-frontend",
  name: "Career Tools Frontend & Performance",
  tagline:
    "Built the main career tools on our web app, then spent a good part of the internship making it faster.",
  role: "Frontend developer",
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
    { value: "6+", label: "tools tracked with PostHog" },
  ],
  highlights: [
    "Built the frontend for the **Resume Scorer, Salary Estimator and Articleship Scorer**, plus the user dashboard and home page.",
    "Split code by route, set up compression and tree shaking, and preloaded key assets. Lighthouse performance went ==from 56 to 85+==.",
    "Set up **PostHog** to see where users dropped off across 6+ tools, and fixed a bug where stale chunks after a deploy sent users into an endless reload loop.",
  ],
  caseStudy: {
    summary:
      "Frontend for five production screens, a performance overhaul that took Lighthouse from 56 to 85+, and the analytics that showed us where users got stuck.",
    context:
      "As a frontend intern I worked on the main career tools web app: a **React, Vite and TypeScript** monorepo with Tailwind, Redux Toolkit and TanStack Query.",
    sections: [
      {
        heading: "What I built",
        paragraphs: [
          "I built the full frontend for the **Resume Scorer**, including desktop and mobile result screens with grammar, impact and formatting breakdowns and a history view. I built the **Salary Estimator** on top of custom React Query hooks, and the **Articleship Scorer** from start to finish, with a score reveal and proper error handling. I also built the user dashboard and the home page with shadcn/ui components and Zod-validated forms.",
        ],
      },
      {
        heading: "Making it faster",
        paragraphs: [
          "Initial loads were slow and it showed in Core Web Vitals. Most of the fix was in the Vite build. I **split code by route** with React.lazy and Suspense, with a skeleton loader for each route. Assets over 10KB get **Gzip and Brotli** versions at build time. I turned on **tree shaking** across the monorepo and audited sideEffects in every shared package, since one package marked wrong can pull in a lot of code nobody uses.",
          "For the critical rendering path I preloaded the hero WebP images with high fetch priority, preloaded carousel images from code, and set font-display: swap so fonts stopped blocking render. JS and CSS payloads dropped a lot, and ==Lighthouse performance went from 56 to 85+== with better LCP, INP and TTFB.",
        ],
      },
      {
        heading: "Analytics and a reload loop",
        paragraphs: [
          "I set up **PostHog** with user identification tied to our Redux auth state. That gave us sessions, conversion and drop-off funnels across ==6+ tools==, and showed exactly where people got stuck while submitting tests.",
          "I also fixed a production bug where users got stuck in an **endless reload loop after deploys**. Each deploy replaces the hashed JS chunks, so a tab opened before the deploy would ask for a chunk that no longer existed. Reloading on that error is the usual fix, but when the reload didn't solve it, the page reloaded again, forever. I added a guard that uses **sessionStorage** to allow one reload per session and then stop.",
        ],
        diagram: {
          title: "The chunk reload guard",
          steps: [
            {
              nodes: [
                {
                  title: "New deploy",
                  meta: "chunk hashes change",
                  detail:
                    "Vite gives every chunk a content hash, so each deploy replaces the old files with new names.",
                },
              ],
            },
            {
              label: "an old tab opens a lazy route",
              nodes: [
                {
                  title: "Dynamic import fails",
                  meta: "old chunk is gone",
                  detail:
                    "A tab that was opened before the deploy asks for a chunk that no longer exists on the server.",
                },
              ],
            },
            {
              label: "check sessionStorage",
              nodes: [
                {
                  title: "Reload once",
                  meta: "no flag yet",
                  detail:
                    "Set a flag in sessionStorage and reload. The fresh page picks up the new index.html and the new chunk names.",
                },
                {
                  title: "Don't reload again",
                  meta: "flag already set",
                  detail:
                    "A reload was already tried in this session, so the guard stops here instead of looping.",
                },
              ],
            },
          ],
        },
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
      "Promoted from intern in April 2025. I lead the course platform and the mobile app, and build features on our AI career tools.",
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
      "Built the main career tools on the web app and made it a lot faster.",
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
