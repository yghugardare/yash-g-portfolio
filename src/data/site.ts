export const site = {
  name: "Yash Ghugardare",
  title: "Yash Ghugardare — Full Stack Developer",
  description:
    "Full-stack engineer with 2+ years shipping production web, mobile, and AI-powered products. Next.js, React, TypeScript, Node.js — from technical design through production delivery.",
  url: "https://yash-g-portfolio.vercel.app",
  locale: "en_IN",
  twitterHandle: "@yghugardare15",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

// Adding a `/blog` entry here is the only change needed to surface blog navigation.
export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
