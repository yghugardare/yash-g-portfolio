"use client";

import { BorderBeam } from "@/components/magic-ui/border-beam";
import Badge from "./Badge";
type SkillCardProps = {
  title: string;
  skills: string[];
};
function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div
      id="skillCard"
      className={`md:p-3 md:grid py-3 rounded-lg flex flex-col flex-wrap  overflow-hidden border-solid border-textColor relative `}
    >
      <h1
        id="skillTitle"
        className="mb-4  md:relative md:top-4 flex justify-center items-center font-mono  text-[#64FFDA] "
      >
        {title}
      </h1>
      <div className=" relative flex md:gap-10 gap-5 flex-wrap   ">
        {skills.map((el, index) => (
          <Badge key={index} language={el} />
        ))}
      </div>
      <BorderBeam
        className="!md:absolute"
        size={500}
        duration={12}
        borderWidth={2}
        colorFrom="#64FFDA"
        colorTo="#9c40ff"
      />
    </div>
  );
}

export default SkillCard;
