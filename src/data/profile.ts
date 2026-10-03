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
    "I like to understand the problem before I touch the code. I break it down, make clear trade-offs, and own the result end to end. I care about simple solutions, clean execution, and writing code that's easy for the next person to understand, maintain, and build on.",
    "I use AI to ship faster, but I still own the thinking. I make the calls on architecture, trade-offs, and quality, while AI helps me build, test, debug, and iterate faster.",
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
    cgpa: "8.72",
    period: "2020 – 2024",
  },
} as const;
