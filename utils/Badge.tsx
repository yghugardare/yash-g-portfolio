"use client"
import Image from "next/image";
type BadgeProp = {
  language: string;
};
function Badge({ language }: BadgeProp) {
  return (
    <div id="badge" className=" mx-auto md:gap-5  rounded-lg  px-2  flex items-center border  ">
      <Image src={`/Icons/${language}.png`} width={30} height={35} alt={"TS"} className="md:mx-auto " />
      <span className="text-white  text-sm md:text-lg  text-balance ">{language}</span>
    </div>
  );
}

export default Badge;
