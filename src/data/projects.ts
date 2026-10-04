export type ProjectSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** Shorter label for the desktop tabs. */
  shortName?: string;
  tagline: string;
  kind: string;
  /** "owner/name"; stars and forks are fetched from GitHub at build time. */
  repo?: string;
  /** Used if the GitHub request fails during the build. */
  fallbackStats?: { stars: number; forks: number };
  highlights: string[];
  stack: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links: { github?: string; demo?: string };
  details: {
    summary: string;
    context: string;
    sections: ProjectSection[];
  };
};

// Add a new object here to publish a new project; no layout changes required.
export const projects: Project[] = [
  {
    slug: "ai-powered-lms",
    name: "AI-Powered Learning Management System",
    shortName: "AI-Powered LMS",
    tagline:
      "A full-stack course platform where students buy courses, watch lessons and ask an AI assistant about the lesson they're on.",
    kind: "Open source",
    repo: "yghugardare/Elearning",
    fallbackStats: { stars: 27, forks: 12 },
    highlights: [
      "Covers the whole course flow: browsing, **Stripe** checkout, enrollment, reviews and student Q&A, plus an instructor dashboard and admin roles.",
      "A **Gemini** assistant reads the lesson transcript, so students can ask about the video they're watching or get a ==summary grounded in that lesson==.",
      "Also has **Redis** caching, JWT auth with refresh sessions, **Socket.IO** notifications and DRM-protected video.",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Redis",
      "Gemini",
      "Stripe",
      "Socket.IO",
    ],
    image: {
      src: "/Project/Elearn.jpg",
      alt: "Screens from the ELearning platform: course listing, admin analytics dashboard, and course detail page.",
      width: 1280,
      height: 720,
    },
    links: {
      github: "https://github.com/yghugardare/Elearning",
      demo: "https://elearning-front-end.vercel.app/",
    },
    details: {
      summary:
        "An open-source LMS and course store with Stripe payments, DRM-protected video, real-time notifications and a Gemini assistant that answers questions from lesson transcripts.",
      context:
        "An open-source LMS and course store. It covers what a real course platform needs: selling courses, delivering video, managing content, and giving students a way to get help while they learn. The frontend is **Next.js 14** with TypeScript, and the backend is **Node.js** with **MongoDB**.",
      sections: [
        {
          heading: "What it does",
          paragraphs: [
            "Students browse courses, pay through **Stripe** and get enrolled once the payment goes through. Each course has reviews and a Q&A section where students can ask questions about the lessons.",
            "Instructors manage their own courses and lessons. Admins get **role-based access** to users, courses and orders, so each role only sees what it should.",
          ],
        },
        {
          heading: "The lesson assistant",
          paragraphs: [
            "The assistant is scoped to the lesson the student is watching. It uses **Google Gemini** with that lesson's video transcript as context, so ==answers come from what the instructor actually said== instead of the model's general knowledge.",
            "Students can ask follow-up questions about a concept they didn't get, or ask for a summary of the lesson to review later.",
          ],
        },
        {
          heading: "Backend and infrastructure",
          paragraphs: [
            "Auth uses **JWT access tokens with refresh sessions**, so users stay signed in without logging in again every time a token expires. **Redis** caches data that's read often, which keeps the common pages fast and takes load off MongoDB.",
            "**Socket.IO** pushes real-time notifications to users. Course videos are served with **DRM protection**, so paid content can't simply be downloaded and shared.",
          ],
        },
        {
          heading: "Instructor analytics",
          paragraphs: [
            "Instructors get a dashboard with analytics for their courses, users and orders, so they can see what's selling and how students are engaging with their content.",
          ],
        },
      ],
    },
  },
  // Dummy project for reviewing the multi-project UI. Remove before publishing.
  // {
  //   slug: "realtime-whiteboard",
  //   name: "Realtime Whiteboard",
  //   tagline:
  //     "A shared canvas where a small team can sketch, add sticky notes and see each other's cursors live.",
  //   kind: "Side project",
  //   highlights: [
  //     "Syncs drawing and cursor movement between users over **WebSockets**, with ==under 100ms of lag== on a normal connection.",
  //     "Stores each board as a list of operations in **PostgreSQL**, so the full history can be replayed or undone.",
  //     "Supports sticky notes, shapes and freehand drawing, with export to PNG.",
  //   ],
  //   stack: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL"],
  //   image: {
  //     src: "/Project/placeholder-1.svg",
  //     alt: "Placeholder image for the Realtime Whiteboard project.",
  //     width: 1280,
  //     height: 720,
  //   },
  //   links: { github: "https://github.com/yghugardare/" },
  //   details: {
  //     summary: "Placeholder project used to review the multi-project layout.",
  //     context:
  //       "Placeholder content. A shared whiteboard built with **React** and **WebSockets** for small teams.",
  //     sections: [
  //       {
  //         heading: "How it works",
  //         paragraphs: [
  //           "Placeholder content. Every change on the canvas is sent as a small operation over a **WebSocket** connection and applied by other clients in order.",
  //         ],
  //       },
  //       {
  //         heading: "Storage",
  //         paragraphs: [
  //           "Placeholder content. Boards are saved as an operation log in **PostgreSQL**, which makes undo and history replay straightforward.",
  //         ],
  //       },
  //     ],
  //   },
  // },
  // Dummy project for reviewing the multi-project UI. Remove before publishing.
  // {
  //   slug: "job-tracker-api",
  //   name: "Job Application Tracker",
  //   tagline:
  //     "A small app and API for tracking job applications, interview stages and follow-up reminders.",
  //   kind: "Side project",
  //   highlights: [
  //     "REST API built with **NestJS** and **Prisma**, with typed request validation using **Zod**.",
  //     "Sends ==follow-up reminders by email== when an application has had no update for a week.",
  //     "Kanban-style board on the frontend for moving applications between stages.",
  //   ],
  //   stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Zod"],
  //   image: {
  //     src: "/Project/placeholder-2.svg",
  //     alt: "Placeholder image for the Job Application Tracker project.",
  //     width: 1280,
  //     height: 720,
  //   },
  //   links: { github: "https://github.com/yghugardare/" },
  //   details: {
  //     summary: "Placeholder project used to review the multi-project layout.",
  //     context:
  //       "Placeholder content. A job application tracker with a **NestJS** API and a **Next.js** frontend.",
  //     sections: [
  //       {
  //         heading: "API",
  //         paragraphs: [
  //           "Placeholder content. The API is built with **NestJS** and **Prisma** on PostgreSQL, with request bodies validated by **Zod** schemas.",
  //         ],
  //       },
  //       {
  //         heading: "Reminders",
  //         paragraphs: [
  //           "Placeholder content. A scheduled job checks for applications with no activity for seven days and sends a reminder email.",
  //         ],
  //       },
  //     ],
  //   },
  // },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
