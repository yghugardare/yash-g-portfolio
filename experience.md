Note - use Resume as primary source of truth for work experience details. This file has extra details that i could not add in my resume due to one page ATS constraint. Use it for View Case Study and deeper understanding of my work in work experience section of portfolio.
-------------------

Work experience- 

Company - CA MONK
ROLE -Full stack developer
Date - Apr 2025 - Present
type - remote

1. Marketting landing pages experience

**Led the development and migration of the course marketing platform to Next.js 16 and Sanity CMS**, powering **400+ course marketing landing pages and 350+ blog pages** with **300K+ monthly views**. The platform facilitates course discovery and purchases through a high-performance, SEO-optimized UI, while enabling admins to create and manage course content through Sanity.

The platform had already generated **₹X crore+ (US$xxx+) in cumulative revenue from January 2025 through September 2026**, demonstrating the scale and business impact of the product. **This figure represents the platform's overall revenue during that period, not revenue attributed to the Next.js migration.** I led the migration from Graphy's platform to a fully owned Next.js + Sanity architecture, eliminating the platform dependency and associated commissions.

Architected a high-efficiency **caching and data-fetching layer** for high-traffic Next.js 16 landing pages using **Partial Prerendering (PPR) and Next.js Cache Components**. Designed an event-driven revalidation pipeline using Sanity webhooks and Upstash Redis sorted sets to debounce rapid Studio publishes (120s window) and execute targeted tag-based cache revalidations via scheduled crons.This reduced Sanity API requests by **95%+**, protecting the platform from free-tier rate limits and unnecessary third-party API costs while maintaining **sub-second edge response times**.

Optimized the platform to achieve **85+ PageSpeed performance scores across LCP, INP, and TTFB and 95+ SEO scores**. Added **Sentry for observability, error tracking, and logging**, and implemented client-side cart functionality using **Zustand**.

Also contributed to and collaborated with two other engineers on features including **course cart flows, Sanity block distribution, reusable UI variants, presentation mode, and SEO handling**, while serving as the **technical lead for the overall platform migration and architecture**.

2. AI Resume Builder & ATS Scorer suite experience [React + Tanstack Query + Redux TypeScript + Node.js/Express + Vercel AI SDK + Langflow]
I architected and built the full-stack AI Resume Builder and ATS Resume Scorer tool from scratch across our React frontend and Node.js/Express backend. It is the most heavily used tool on our platform, serving over 100,000+ candidates and driving significant coin-based monetization.

I worked on the backend of the resume builder, primarily focusing on saving resumes, generating summaries, and enabling resume downloads using Puppeteer.

While investigating customer issues, I identified a recurring problem: many users found that their resumes extended beyond a single page when downloaded, which could affect their ability to maintain a concise, ATS-friendly resume format. I investigated the underlying PDF rendering and layout behavior to understand why the content overflowed.

To address this, I designed and implemented a One-Page Mode feature that allows users to download their resumes on a single page, even when the content would otherwise span multiple pages. The feature preserves the resume's structure and maintains an ATS-friendly format, providing users with greater control over their final resume output. 

Since the Resume Builder was a frontend-heavy project, I had to make thoughtful decisions around state management and data fetching. I used Redux and TanStack Query to efficiently manage application state and server-side data, including configurations, theme management, and the One-Page Mode feature. This helped maintain a scalable and responsive user experience while keeping state management organized across the application.

For the document ingestion and parsing pipeline, I solved the major challenge of handling messy and diverse user-uploaded resumes across PDF, DOC, and DOCX formats. Instead of blindly relying on expensive or slow external APIs, I engineered a multi-tiered fallback architecture: first, I used `pdf-text-reader` for sub-50ms local stream extraction on digital PDFs (zero network latency and zero third-party cost). If the extracted text was unreadable or lacked essential contact signals (which I validated via regex heuristics for phone, email, and LinkedIn), the pipeline automatically falls back to IBM Docling for layout-aware document conversion, and finally to Docling OCR (`force_ocr: true`) for scanned image PDFs.

For the AI parsing logic, once we have clean text, I pass it into our structured extraction task. Initially, we orchestrated this through Langflow workflows, but I transitioned the core pipeline to the Vercel AI SDK (`@ai-sdk/openai`) using OpenAI and Azure OpenAI `gpt-4.1-mini`[i keep updating this to latest gpt flash model it lauches]. I specifically configured `gpt-4.1-mini` because it strictly honors `temperature: 0`, preventing the hallucinated fields and rescan variance that newer reasoning models suffer from. I enforced strict Zod schemas with `Output.object()` so that the model returns perfectly validated JSON covering basics, education, work, skills, certifications, and custom sections. To protect our backend against malicious prompt injections hidden inside user resumes, I engineered an untrusted-input security boundary (`UNTRUSTED_INPUT_GUARD`) ensuring the model treats uploaded text purely as data to analyze rather than instructions to execute. Furthermore, I built bullet-level classification inside the parser so each individual work experience bullet is tagged with its specific finance domain (like statutory audit, internal audit, direct tax, indirect tax, or risk advisory).

On the generative AI side, I built three core assistive features: an AI Summary Generator that synthesizes high-impact executive summaries conditioned on domain, seniority, and target job descriptions; an AI Work Experience Generator that crafts quantifiable, achievement-oriented bullets; and an AI Skills Generator that performs semantic gap analysis against target JDs to suggest missing domain-critical competencies. For our ATS scoring engine, I architected a two-phase asynchronous fan-out pipeline in Express: Phase 1 runs structured extraction, followed by Phase 2 running parallel evaluation workers for grammar checks, seniority depth, and JD relevance. Rather than letting the LLM hallucinate arbitrary scores, I implemented a deterministic keyword taxonomy engine that matches candidate bullets against validated domain taxonomies, ensuring fair, reproducible scores while slashing LLM token costs. On the frontend, I built the interactive editor using React and Redux Toolkit with dynamic section drag-and-drop, live A4 print/PDF preview, and instant ATS health-check feedback. Some of the backend development work like implementing pipeline and vercel ai sdk i did by collabarating along with 2 core backend team for system planning and implementing. i was not lead for backend.



3. Mobile app development experience [Capacitor.js + React + TypeScript]
 built and launched the cross-platform CA Monk mobile app for Android and iOS from scratch using Capacitor.js, React, and TypeScript.

The main reason I chose Capacitor was speed and code reuse: our web platform already had a comprehensive ecosystem of complex, battle-tested tools—like our AI Resume Builder, ATS Resume Scorer, AI Interview Bot, Versant Tests, Technical/Aptitude exams, and Mentorship booking—built as modular React packages inside our monorepo. Instead of wasting 6+ months hiring dedicated mobile teams to rewrite everything from scratch in Kotlin/Swift or React Native, Capacitor allowed me to package our existing web code directly into a bundled native mobile shell, giving us over 90% code reuse and immediate feature parity on Day 1.

On the native side, I solved several critical mobile challenges:

Auth & Security: Since our web cookies and web redirects break inside mobile webviews, I engineered an in-app auth system that securely saves 30-day refresh tokens directly into the native OS Keychain (iOS) and Keystore (Android) via @aparajita/capacitor-secure-storage. I also built an Axios auth adapter with an in-flight refresh mutex so that parallel requests hitting 401 trigger only a single silent token refresh without logging the user out. For frictionless onboarding, I integrated native Google Sign-In with Credential Manager and auto-reading SMS OTP retrieval on Android so users don't have to manually type OTPs.
File Handling: I connected native phone storage using Capacitor File Picker so users can pick resume PDFs from their device, and used the Capacitor Filesystem API to save exported resumes directly to the device's Documents folder with an automatic notification that opens the PDF in their native reader.
Payments: I built an in-app checkout flow for coin top-ups and mentor bookings that opens payment gateways in an in-app browser sheet, captures custom deep-link callbacks (camonk://payment-return), and automatically reconciles transaction status with our backend even if the user closes the browser or loses network connection.
Hardware & Test Taking UX: I enabled camera and microphone streaming for the AI Interview Bot and Versant tests, handled app lifecycle states to save progress, and isolated test screens to hide navigation bars and intercept Android back buttons so users don't accidentally exit and lose coin-funded test attempts.
Multi-Flavor Build & Store Release: I wrote custom automation scripts to maintain two separate Android flavors from one codebase—CA Monk Labs for internal testing and CA Monk for our customer release—automated 15+ adaptive launcher icon generations, and pushed the production release to the Google Play Store.
Currently, I am also working on transforming our native LMS (learning management system) into the mobile app, which will allow students to stream video courses, track lesson progress, and take quizzes natively on mobile, fully eliminating our dependence on third-party platforms like Graphy

--------------------------------------------------------------------------------------
Company - CA MONK
ROLE - Frontend Developer Intern
Date - Sept 2024 - Apr 2025
type - remote

what i did as intern:
During my frontend developer internship at CA Monk, I focused entirely on building and optimizing the core user-facing tools web application [React + Vite + TypeScript + Tailwind CSS + Redux toolkit + Tanstack Query]. I implemented the complete frontend interfaces and responsive flows for key career assessment tools including the Resume Scorer (desktop and mobile result screens with grammar, impact, formatting breakdowns, and interactive history), the Salary Estimator (modular UI powered by custom React Query hooks), and the Articleship Scorer (end-to-end evaluation flow with interactive score reveal animations and error toasts). I also engineered the User Dashboard and the primary Home Page, building modern, accessible UI components using Shadcn UI (Radix primitives) paired with Zod schemas for robust client-side form validation.

To solve slow initial load times and improve Core Web Vitals on the landing page and tools ecosystem, I drove a comprehensive web performance overhaul. I restructured our Vite build configuration by implementing route-level code splitting with `React.lazy()` and `Suspense` (backed by tailored skeleton loaders), configured automated Gzip and Brotli compression via `vite-plugin-compression` for assets over 10KB, and enabled monorepo-wide tree-shaking (`treeshake: true` in Rollup options combined with auditing `"sideEffects": false` across all shared packages). I also optimized the critical rendering path by preloading key hero webp assets using `<link rel="preload" fetchpriority="high">` in `index.html`, preloading carousel visuals programmatically via `new Image()`, and applying `font-display: swap` to eliminate render-blocking font flashes. These optimizations reduced the initial JS/CSS bundle payloads significantly and boosted our Google Lighthouse performance score from 56% to 85%+, dramatically improving LCP, INP, and TTFB.

Additionally, to provide product observability and understand user journeys, I integrated PostHog analytics (`posthog-js` with `PostHogProvider`). I implemented user identification (`posthog.identify`) synced with our Redux auth state to capture user sessions, track conversion and drop-off funnels across our 6+ career tools, and identify UI friction points where candidates got stuck during test submissions. I also resolved critical production stability issues, such as engineering a `sessionStorage`-based chunk reload recovery guard to prevent infinite browser reload loops caused by stale dynamic import cache misses after deployments.
