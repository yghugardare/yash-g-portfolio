"use client";
import { top3, mern, next, react } from "@/data/yash";

import ProjectCard from "./ProjectCard";
type ListProp = {
  tab: number;
};

function ProjectLists({ tab }: ListProp) {
  return (
    <div
      className={`w-full  py-4 px-1 overflow-hidden  md:py-4 lg:px-20 gap-8 grid grid-cols-1 ${
        tab === 1 && "md:grid-cols-2"
      } ${tab === 2 && "md:grid-cols-2"}  ${tab === 0 && "md:grid-cols-3" } ${tab === 3 && "md:grid-cols-3"}`}
    >
      {tab === 0 &&
        top3.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      {tab === 1 &&
        mern.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      {tab === 2 &&
        next.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      {tab === 3 &&
        react.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
    </div>
  );
}

export default ProjectLists;
