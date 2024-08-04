"use client";

import { useEffect, useState } from "react";
import Connect from "./_components/Connect";
import Hero from "./_components/Hero";
import { Loader } from "./_components/Loader";
import Projects from "./_components/Projects";
import Skills from "./_components/Skills";
import "./globals.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => {};
  }, []);
  if(loading) return <div className="!overflow-hidden h-[100vh] w-[100vw] !z-[100] relative"><Loader/></div>
  return (
    <main
      className={`relative md:top-[15vh] top-[10vh] md:h-[85vh] h-[90vh] w-full `}
    >
      <Hero />
      <Skills />
      <Projects />
      <Connect />
    </main>
  );
}
