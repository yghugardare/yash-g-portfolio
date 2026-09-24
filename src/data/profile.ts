export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const profile = {
  name: "Yash Ghugardare",
  firstName: "Yash",
  role: "Full Stack Developer",
  company: "CA Monk",
  location: "Pune, India",
  timezone: "IST (UTC+5:30)",
  email: "yashghugardarework@gmail.com",
  photo: {
    src: "/images/yash.webp",
    alt: "Illustrated portrait of Yash Ghugardare in a pinstripe suit with arms crossed.",
    width: 720,
    height: 866,
  },
  resumeUrl: "/Yash_Ghugardare_FullStack_Engineer_Resume.pdf",
  headline: {
    lead: "Hi, I'm Yash.",
    middle: "I turn ideas into",
    emphasis: "working software.",
  },
  intro:
    "I'm a full-stack engineer with 2+ years of experience building web, mobile, and AI products. I work across the stack and like owning problems end to end, from figuring out the right approach to shipping, measuring, and improving what goes live.",
  seeking:
    "I'm looking for full-stack and product engineering roles where I can help shape the product and own what I ship. Also open to forward-deployed engineering opportunities.",
  summary: [
    "I'm a full-stack engineer based in Pune. Since 2024 I've worked at CA Monk, a career platform for finance professionals, where I've gone from frontend intern to leading the migration of the company's course marketing platform and the launch of its first mobile app.",
    "The work I like most sits at the seams: caching layers that have to survive real traffic, ingestion pipelines that have to accept messy user input, native shells that have to make web code feel at home on a phone. I care about the boring parts because that's where products fail.",
  ],
  aiStatement: {
    heading: "How I work with AI",
    body: "I use AI to accelerate implementation, but I own the problem-solving, architecture, technical decisions, code review, debugging, and final quality of everything I ship.",
    detail:
      "It makes me faster at the typing. It doesn't decide what gets built, how it's structured, or whether it's good enough to go out.",
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/yghugardare/",
      handle: "yghugardare",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yghugar/",
      handle: "in/yghugar",
    },
    {
      label: "X",
      href: "https://x.com/yghugardare15",
      handle: "@yghugardare15",
    },
    {
      label: "Hashnode",
      href: "https://yash-ghugardare-blogs.hashnode.dev/",
      handle: "yash-ghugardare-blogs",
    },
  ] satisfies SocialLink[],
  education: {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Smt. Kashibai Navale College of Engineering",
    period: "2020 – 2024",
  },
} as const;
