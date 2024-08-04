"use client"

import SparklesText from "@/components/magic-ui/sparkles-text"
import { SkillInfo } from "@/data/yash"
import SkillCard from "@/utils/SkillCard"

function Skills() {
  return (
    <section id="Skills" className={`min-h-full overflow-hidden mb-5 w-full flex flex-col items-center gap-y-4 md:px-12 px-1`}>
       
         <SparklesText className={`text-5xl text-white font-bold text-center mt-2`} text="Skills" sparklesCount={4} />
        <div className=" flex flex-wrap gap-y-10 min-h-[85vh] overflow-hidden md:mx-2 md:grid md:grid-cols-2 md:gap-5 md:p-10">
        {
            SkillInfo.map((el,index)=>(
                <SkillCard key={index} title={el.title} skills={el.skills}/>
            ))
        }
        </div>
        
        {/* <SkillCard/> */}
    </section>
  )
}

export default Skills