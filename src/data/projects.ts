export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  stack: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  badges: string[];
  links: ProjectLink[];
  year: string;
};

// Add a new object here to publish a new project — no layout changes required.
export const projects: Project[] = [
  {
    slug: "ai-powered-lms",
    name: "AI-Powered Learning Management System",
    tagline:
      "A full-stack LMS and course-commerce platform with a course-context AI assistant grounded in video transcripts.",
    description: [
      "Supports course discovery, purchases, enrollments, reviews, student Q&A, instructor content management, and role-based administration.",
      "A Google Gemini assistant uses lesson transcripts so students can ask lesson-specific questions and generate summaries grounded in course content.",
      "Production-oriented capabilities include Stripe payments, Redis caching, JWT auth with refresh sessions, Socket.IO real-time notifications, DRM-protected video delivery, and instructor analytics for courses, users, and orders.",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Redis",
      "Gemini",
    ],
    image: {
      src: "/Project/Elearn.jpg",
      alt: "Screens from the ELearning platform: course listing, admin analytics dashboard, and course detail page.",
      width: 1280,
      height: 720,
    },
    badges: ["Open source", "27 GitHub stars", "12 forks"],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/yghugardare/Elearning",
      },
    ],
    year: "2024",
  },
];
