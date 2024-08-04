"use client";
import SparklesText from "@/components/magic-ui/sparkles-text";
import { useState } from "react";
import ProjectLists from "./ProjectLists";
// sticky scroll reveal
function Projects() {
  const [tab, setTab] = useState(0);
  return (
    <section id="Projects" className="w-full min-h-full mt-2 !overflow-hidden">
      <SparklesText
        className={`text-5xl text-white  font-bold text-center mt-2`}
        text="Projects"
        sparklesCount={4}
      />
      <div className="relative text-white w-full flex md:mt-4 mt-3  justify-center items-center">
        <div className="bg-black rounded-lg w-[70%] md:w-[45%] flex items-center justify-around h-[7vh] gap-x-1">
          <button
            className={`transition-colors ease-in duration-200 hover:text-white ${
              tab === 0 ? "text-white" : "text-white/40"
            }`}
            onClick={() => setTab(0)}
          >
            Top 3
          </button>
          <button
            className={`transition-colors ease-in duration-200 hover:text-white ${
              tab === 1 ? "text-white" : "text-white/40"
            }`}
            onClick={() => setTab(1)}
          >
            MERN
          </button>
          <button
            className={`transition-colors ease-in duration-200 hover:text-white ${
              tab === 2 ? "text-white" : "text-white/40"
            }`}
            onClick={() => setTab(2)}
          >
            Next Js
          </button>
          <button
            className={`transition-colors ease-in duration-200 hover:text-white ${
              tab === 3 ? "text-white" : "text-white/40"
            }`}
            onClick={() => setTab(3)}
          >
            React
          </button>
        </div>
      </div>
      <ProjectLists tab={tab} />
    </section>
  );
}
2;
export default Projects;
