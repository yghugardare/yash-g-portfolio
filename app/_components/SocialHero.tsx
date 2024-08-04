"use client";
import { socialLinks } from "@/data/yash";

function SocialHero() {
  const socialIcons = socialLinks.map((socialLink, index) => (
    <a
      href={`${socialLink.link}`}
      target="_blank"
      className="font-mono text-lg  hover:text-primaryColor hover:-translate-x-1 transition transform duration-300 ease-in-out"
      key={index}
    >
      <div>
        <socialLink.icon stroke={1.5} size={25} className="-rotate-90" />
      </div>
    </a>
  ));
  return (
    <div className="flex md:hidden text-textColor items-center gap-8 absolute bottom-52 -left-40   rotate-90 ">
      {socialIcons}
      <hr className="border w-20 rounded-full  bg-textColor border-textColor" />
    </div>
  );
}

export default SocialHero;
