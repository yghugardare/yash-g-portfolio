import {
  Icon,
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { IconBrandBlogger } from "@tabler/icons-react";
import { IconBrandX } from "@tabler/icons-react";

type SocialLinks = {
  link: string;
  icon: Icon;
};
// <FontAwesomeIcon icon="fa-brands fa-hashnode" />
export const socialLinks: SocialLinks[] = [
  { link: "https://github.com/yghugardare/", icon: IconBrandGithub },
  { link: "https://www.linkedin.com/in/yghugar/", icon: IconBrandLinkedin },
  { link: "https://x.com/yghugardare15    ", icon: IconBrandX },
  {
    link: "https://yash-ghugardare-blogs.hashnode.dev/",
    icon: IconBrandBlogger,
  },
  { link: "https://leetcode.com/u/Yash_Ghugardare/", icon: IconBrandLeetcode },
];
type Tinfo = {
  name: string;
  stack: string[];
  bio: string;
};
export const Info: Tinfo = {
  name: "Yash Ghugardare",
  stack: ["Software Engineer", "Web Developer", "Open Source Enthusiast"],
  bio: "I'm a recent graduate with a Bachelor's Degree in Computer Engineering. I am passionate about web development and love building awesome web apps.Currently, I am seeking an oppurtunity as a fresher in the Software Development Field. ",
};
type SkillInfoType = {
  title: string;
  skills: string[];
};
export const SkillInfo: SkillInfoType[] = [
  {
    title: "Frontend",
    skills: [
      "ReactJs",
      "NextJs",
      "Recoil",
      "Zustand",
      "Redux",
      "React-Query",
      "Tailwind",
      "Chakra-UI",
      "Shadcn",
      "Magic-UI",
      "Material UI",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node",
      "Express",
      "MongoDB",
      "Mongoose",
      "MySQL",
      "Prisma",
      "Drizzle",
      "Redis",
      "NextJs",
      "Convex-Db",
      "PostgresSQL",
    ],
  },
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Java", "Python", "C++"],
  },
  {
    title: "Other",
    skills: [
      "Git",
      "Github",
      "Docker",
      "Postman",
      "Cloudinary",
      "Linux",
      "Socket-IO",
    ],
  },
];
type ProjectType = {
  projectName: string;
  skills?: string[];
  imgPath: string;
  gitHubLink: string;
  liveLink: string;
  features: string[];
  description: string;
};
export const top3: ProjectType[] = [
  {
    projectName: "AI Integrated LMS",
    skills: [
      "TypeScript",
      "NextJs",
      "Express",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Material UI",
      "React-Query",
      "Docker",
      "Socket-IO",
      "Tailwind",
    ],
    imgPath: "/Project/Elearn",
    gitHubLink: "https://github.com/yghugardare/Elearning",
    liveLink: "https://elearning-front-end.vercel.app/",
    features: [
      "🤖 Integrated AI that learns from videos and answers video related queries.",
      "📈 Real-time analytics give tutors course performance insights.",

      "🔐 DRM encryption protects video course content from piracy",

      "🎨 Used Tailwind and Shadcn for frontend of the website",
      "🌐 Used React Query for Global State Manangement and API fetching",
      "☁️ Used Cloudinary and AWS for cloud storage and management",
    ],
    description:
      "AI powered Learning Management System which is fine tuned on Videos of the tutor and can answer questions based on the context of video and the course",
  },

  {
    projectName: "FullStack Threads Clone",
    skills: [
      "MongoDb",
      "Mongoose",
      "Express",
      "Cloudinary",
      "ReactJs",
      "Recoil",
      "Chakra-UI",
      "Socket-IO",
    ],
    imgPath: "/Project/Threads",
    gitHubLink: "https://github.com/yghugardare/Threads",
    liveLink: "",
    features: [
      "🔐 Authentication & Authorization with JWT",
      "🌐 Recoil for Global State Management",
      "📝 Create, Delete, Comment, Like and Unlike Posts",
      "✌️❄️ Follow/Unfollow and Freeze User Account",
      "🌓🎨 Dark/Light Mode and responsive UI using Chakra UI",
      "📸 Real time Chat App With Image Support",
      "👀 Seen/Unseen Status for Messages with notifications",
    ],
    description:
      "Fullstack social media application with advance real time chat support , authentication system, user interaction and morder responsize user interface.",
  },
  {
    projectName: "AI mock Interview SaaS",
    skills: [
      "TypeScript",
      "PostgresSQL",
      "Drizzle",
      "NextJs",
      "Tailwind",
      "Shadcn",
      "Clerk",
    ],
    imgPath: "/Project/AiMock",
    gitHubLink: "https://github.com/yghugardare/AI-Interview-SaaS",
    liveLink: "https://ai-interview-saas-yashdg.vercel.app/",
    features: [
      "🔐 Authentication & Authorization with Clerk",
      "🤖 Mock Interview Questions Genereated by AI using Google Gemini AI model",
      "🎙️ Records Users response using web cam and microphone",
      "⚡ Provides Automated Feedback for previously taken interviews",
      "🎨 Amazing UI using Shadcn UI and tailwind CSS",
      "🐘 Utilizes Drizzle ORM and Neon Postgres Sql for database",
    ],
    description:
      "AI powered Software as a Service Web Application capable of generating and evaluating mock interview questions based on various job roles and fields.",
  },
];
export const next: ProjectType[] = [
 

  {
    projectName: "AI mock Interview SaaS",
    skills: [
      "TypeScript",
      "PostgresSQL",
      "Drizzle",
      "NextJs",
      "Tailwind",
      "Shadcn",
      "Clerk",
    ],
    imgPath: "/Project/AiMock",
    gitHubLink: "https://github.com/yghugardare/AI-Interview-SaaS",
    liveLink: "https://ai-interview-saas-yashdg.vercel.app/",
    features: [
      "🔐 Authentication & Authorization with Clerk",
      "🤖 Mock Interview Questions Genereated by AI using Google Gemini AI model",
      "🎙️ Records Users response using web cam and microphone",
      "⚡ Provides Automated Feedback for previously taken interviews",
      "🎨 Amazing UI using Shadcn UI and tailwind CSS",
      "🐘 Utilizes Drizzle ORM and Neon Postgres Sql for database",
    ],
    description:
      "AI powered Software as a Service Web Application capable of generating and evaluating mock interview questions based on various job roles and fields.",
  },
  {
    projectName: "AI Integrated LMS",
    skills: [
      "TypeScript",
      "NextJs",
      "Express",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Material UI",
      "React-Query",
      "Docker",
      "Socket-IO",
      "Tailwind",
    ],
    imgPath: "/Project/Elearn",
    gitHubLink: "https://github.com/yghugardare/Elearning",
    liveLink: "https://elearning-front-end.vercel.app/",
    features: [
      "🤖 Integrated AI that learns from videos and answers video related queries.",
      "📈 Real-time analytics give tutors course performance insights.",

      "🔐 DRM encryption protects video course content from piracy",

      "🎨 Used Tailwind and Shadcn for frontend of the website",
      "🌐 Used React Query for Global State Manangement and API fetching",
      "☁️ Used Cloudinary and AWS for cloud storage and management",
    ],
    description:
      "AI powered Learning Management System which is fine tuned on Videos of the tutor and can answer questions based on the context of video and the course",
  },
];
export const mern: ProjectType[] = [
  {
    projectName: "FullStack Threads Clone",
    skills: [
      "MongoDb",
      "Mongoose",
      "Express",
      "Cloudinary",
      "ReactJs",
      "Recoil",
      "Chakra-UI",
      "Socket-IO",
    ],
    imgPath: "/Project/Threads",
    gitHubLink: "https://github.com/yghugardare/Threads",
    liveLink: "",
    features: [
      "🔐 Authentication & Authorization with JWT",
      "🌐 Recoil for Global State Management",
      "📝 Create, Delete, Comment, Like and Unlike Posts",
      "✌️❄️ Follow/Unfollow and Freeze User Account",
      "🌓🎨 Dark/Light Mode and responsive UI using Chakra UI",
      "📸 Real time Chat App With Image Support",
      "👀 Seen/Unseen Status for Messages with notifications",
    ],
    description:
      "Fullstack social media application with advance real time chat support , authentication system, user interaction and morder responsize user interface.",
  },
  {
    projectName: "AI Integrated LMS",
    skills: [
      "TypeScript",
      "NextJs",
      "Express",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Material UI",
      "React-Query",
      "Docker",
      "Socket-IO",
      "Tailwind",
    ],
    imgPath: "/Project/Elearn",
    gitHubLink: "https://github.com/yghugardare/Elearning",
    liveLink: "https://elearning-front-end.vercel.app/",
    features: [
      "🤖 Integrated AI that learns from videos and answers video related queries.",
      "📈 Real-time analytics give tutors course performance insights.",

      "🔐 DRM encryption protects video course content from piracy",

      "🎨 Used Tailwind and Shadcn for frontend of the website",
      "🌐 Used React Query for Global State Manangement and API fetching",
      "☁️ Used Cloudinary and AWS for cloud storage and management",
    ],
    description:
      "AI powered Learning Management System which is fine tuned on Videos of the tutor and can answer questions based on the context of video and the course",
  },
];
export const react: ProjectType[] = [
  {
    projectName: "Blog Application ",
    description:
      "Full stack Blog Application with CRUD operation features made using React,Redux and Appwrite. Utilized the Appwrite Service for various tasks like authentication,post creation,etc",
    features: [
      "🎨 Stunning & Responsive UI and frontend made using tailwind css",
      "🌐 Redux for Global State Management and API fetching",
      "🗄️ Used Appwrite Backend as a Service",
      "🔐 Authentication and Authorization added using Appwrite",
    ],
    gitHubLink: "https://github.com/yghugardare/FullStackBlog",
    liveLink: "https://full-stack-blog-yash-g-seven.vercel.app/",
    imgPath: "/Project/blog",
  },
  {
    projectName: "Disney+ Hotstar Clone",
    description:
      "A Mordern and responsive UI and frontend project made using react and tailwind. Made use of The Movie DataBase[TMDB] to fetch movies Used axios for fetching API.",
    features: [
      "🎨 Beautiful,responsive and stunning UI made using tailwindCSS",
      "🍿 Movies fetched using TMDB Api and axios",
      "🖼️ Used useRef hook for caraousel of images!",
    ],
    imgPath: "/Project/Hotstar",
    gitHubLink: "https://github.com/yghugardare/HotstarClone",
    liveLink: "https://hotstar-clone-yash-g.vercel.app/",
  },
  {
    projectName: "To Do List",
    description:
      "Basic To Do List with CRUD operation, local Storage and dark and light mode. Made use of useState hook, entirely to understand the state management in ReactJs.",
    features: [
      "📝 Create, Read, Update, and Delete tasks (CRUD operations).",
      "🌓 Dark mode and light mode switching for a personalized experience.",
      "🌎 Local storage integration to save and load tasks between sessions.",
      "🎨 Stunning and responsive UI made using Styled components",
    ],
    imgPath: "/Project/todo",
    liveLink: "https://react-to-do-list-yashg.netlify.app/",
    gitHubLink: "https://github.com/yghugardare/ReactTodoList/tree/main",
  },
];
export const Slugs:string[] = [
  "typescript",
  "spring",
  "javascript",
  "dart",
  "java",
  "react",
  "angular",
  "flutter",
  "android",
  "html5",
  "css3",
  "springboot",
  "mongodb",
  "selenium",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "mysql",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];