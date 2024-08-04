"use client";
import { socialLinks } from "@/data/yash";
import { useState,useEffect } from "react";

function Social() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => {};
  }, []);
  const socialIcons = socialLinks.map((socialLink, index) => (
    <a
      href={`${socialLink.link}`}
      target="_blank"
      className={`font-mono text-lg ${loading && "hidden"} hover:text-primaryColor hover:-translate-x-1 transition transform duration-300 ease-in-out`}
      key={index}
    >
      <div>
        <socialLink.icon stroke={1.5} size={25} className="-rotate-90" />
      </div>
    </a>
  ));
  return (
    <div className="md:flex hidden  text-textColor items-center gap-8 fixed bottom-32 md:-left-48 -left-52 pl-1.5  rotate-90 ">
      {socialIcons}
      <hr className="border w-40 rounded-full  bg-textColor border-textColor" />
    </div>
  );
}

export default Social;
