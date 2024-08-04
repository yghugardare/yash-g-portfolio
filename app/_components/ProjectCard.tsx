/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import React from "react";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

type ProjectType = {
  projectName: string;
  skills?: string[];
  imgPath: string;
  gitHubLink: string;
  liveLink: string;
  features: string[];
  description: string;
};
type ProjectCardProp = {
  project: ProjectType;
};

function ProjectCard({ project }: ProjectCardProp) {
  return (
    <article className="overflow-hidden   rounded-lg  border border-primaryColor shadow-primaryColor  bg-bgColor  shadow-md">
      <img
        alt="thumbnail"
        src={`${project.imgPath}.jpg`}
        className=" h-60 w-full object-cover"
      />

      <div className="py-4 px-2">
        <h3 className="text-xl md:text-2xl font-fold font-mono text-white">
          {project.projectName}
        </h3>

        {/* <div className="flex flex-wrap justify-center gap-2 items-center">
          {project.skills.map((skill, index) => (
            <div
              key={index}
              id="badge"
              className="  gap-2   rounded-lg  px-2  flex items-center border  "
            >
              <Image
                src={`/Icons/${skill}.png`}
                width={30}
                height={35}
                alt={"TS"}
                className=" "
              />
              <span className="text-white  text-xs text-balance ">{skill}</span>
            </div>
          ))}
        </div> */}
        <p className="hidden md:block mt-1 line-clamp-3 text-sm/relaxed text-white/60">
          {project.description}
        </p>

        {/* <a
          href="#"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Find out more
          <span
            
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </a> */}
        <div className=" flex items-center justify-between">
          <Modal>
            <ModalTrigger className="bg-bgColor !p-0 py-2 flex justify-center group/modal-btn hover:shadow-yellow-400 hover:shadow-md">
              <span className="group-hover/modal-btn:translate-x-40 font-bold  text-primaryColor text-center transition font-mono duration-500 md:text-lg">
                Learn More &rarr;
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center  border-2 border-yellow-400  justify-center absolute inset-0 transition duration-500 text-white z-20">
                💡
              </div>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <h1 className="text-white text-xl md:text-2xl text-center font-semibold">
                  {project.projectName}
                </h1>
                <p className="text-lg md:text-xl text-textColor text-center mt-0.5 md:mt-0 font-semibold">
                  ✨ Features -
                </p>
                <ul>
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} >
                      <TextGenerateEffect
                        words={feature}
                        duration={0.6}
                        className="bg-gray-300 rounded-lg text-white dark:bg-black dark:text-white text-sm md:text-md "
                      />
                    </li>
                  ))}
                </ul>
              </ModalContent>
              <ModalFooter className="!bg-bgColor">
                <a
                  href={project.gitHubLink}
                  target="_blank"
                  className="mx-2 p-1.5 flex items-center gap-1 text-primaryColor border-2 border-primaryColor rounded-lg"
                >
                  Github <IconBrandGithub />
                </a>
                <a
                  href={project.liveLink}
                  target="_blank"
                  className="mx-2 p-1.5 flex items-center gap-1 text-bgColor   bg-primaryColor rounded-lg"
                >
                  Website <IconExternalLink />
                </a>
              </ModalFooter>
            </ModalBody>
          </Modal>
          <div className="flex gap-4">
            <a href={project.gitHubLink} target="_blank">
              <IconBrandGithub color="white" size={30} />
            </a>
            <a href={project.liveLink} target="_blank">
              <IconExternalLink color="white" size={30} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
