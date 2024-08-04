"use client";

import { Dock, DockIcon } from "@/components/magic-ui/dock";
import SparklesText from "@/components/magic-ui/sparkles-text";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

export type IconProps = React.HTMLAttributes<SVGElement>;
function Connect() {
  return (
    <section id="Connect" className="w-full min-n-h-full relative pb-5">
      <h1 className="text-2xl md:text-5xl font-bold text-white mt-1 text-center">
        Connect with me!
      </h1>

      <Dock magnification={60} distance={100}>
        <DockIcon className="bg-primaryColor ">
          <a href="https://github.com/yghugardare/" target="_blank">
            <IconBrandGithub stroke={2} />
          </a>
        </DockIcon>
        <DockIcon className="bg-primaryColor">
          <a href="https://www.linkedin.com/in/yghugar/" target="_blank">
            {" "}
            <IconBrandLinkedin stroke={2} />
          </a>
        </DockIcon>
        <DockIcon className="bg-primaryColor">
          <a href="https://x.com/yghugardare15" target="_blank">
            {" "}
            <IconBrandX stroke={2} />
          </a>
        </DockIcon>
        <DockIcon className="bg-primaryColor">
          <a href="mailto:yghugardare6@gmail.com" target="_blank">
            <IconMail stroke={2} />
          </a>
        </DockIcon>
      </Dock>
    </section>
  );
}

export default Connect;
