import yashPortrait from "../../public/images/yash.png";

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
    src: yashPortrait.src,
    alt: "Portrait of Yash Ghugardare wearing glasses and an olive polo shirt, with arms crossed.",
    width: yashPortrait.width,
    height: yashPortrait.height,
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
    "Looking for **full-stack**, **product engineering**, or **forward-deployed engineer** roles.",
  summary: [
    "I like untangling messy problems and finding the simplest solution that holds up. I ask questions early, make tradeoffs clear, and think about the person who will maintain the code next. I'm happy to change my mind when the evidence changes.",
    "I use AI to explore code, test ideas, and build faster. Clear context and careful review make it useful. The time I save goes into better decisions, and I take responsibility for what I ship.",
  ],
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
