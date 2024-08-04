"use client";
import { useState, useEffect } from "react";

const Mail = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => {};
  }, []);
  return (
    <main className={`${loading && "md:hidden"} md:flex hidden text-textColor items-center gap-10 fixed bottom-32 -right-48 rotate-90`}>
      <div className="flex px-2">
        <a
          href="mailto:yghugardare6@gmail.com"
          className="font-mono tracking-wider hover:text-primaryColor hover:-translate-x-1 transition transform duration-300 ease-in-out"
        >
          yghugardare6@gmail.com
        </a>
      </div>
      <hr className="border w-40 rounded-full  bg-textColor border-textColor" />
    </main>
  );
};
export default Mail;
