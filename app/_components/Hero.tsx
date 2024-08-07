"use client";
import { Info } from "@/data/yash";
import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import SocialHero from "./SocialHero";
import Particles from "@/components/magic-ui/particles";
import ShineBorder from "@/components/magic-ui/shine-border";
import { NeonGradientCard } from "@/components/magic-ui/neon-gradient-card";
import { useState } from "react";
import ViewResumeButton from "./Button";
import ResumeModal from "./ResumeModal";
function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [iframeSrc, setIframeSrc] = useState('');
  const openModal = () => {
    // setIframeSrc('/yash-g.pdf');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // setIframeSrc('');
    setIsModalOpen(false);
  };

  return (
    <section
      id="About"
      className={`w-full h-full !overflow-hidden flex flex-col lg:px-12 2xl:px-15 lg:flex-row-reverse  justify-center items-center gap-y-10`}
    >
      <Particles
        className="absolute -z-20 inset-0"
        quantity={1000}
        ease={50}
        vx={0.1}
        vy={0.1}
        color="#64FFDA"
        refresh={true}
      />
      {/* Image */}
      <div className=" lg:grid lg:place-content-center lg:w-full lg:p-5">
        <NeonGradientCard
          borderSize={2}
          borderRadius={250}
          className={" bg-transparent rounded-full "}
        >
          <Image
            width={270}
            height={270}
            className="w-[270px] h-[270px] lg:w-[350px] lg:h-[350px]  rounded-full"
            src="/yashImg.jpg"
            alt="yash"
          />
        </NeonGradientCard>
      </div>

      {/* name,descriprion */}
      <div
        className={`
        
        md:w-100
        flex flex-col items-center justify-center  gap-y-2 lg:items-start lg:p-5 lg:ml-5 lg:gap-y-4`}
      >
        <p className="text-primaryColor font-mono text-lg text-center md:text-2xl 2xl:text-3xl ">
          Hi, I am
        </p>
        <p className="text-white text-2xl md:text-5xl 2xl:text-6xl text-center  font-semibold font-mono  ">
          {Info.name}
        </p>
        <div
          className={`text-white font-mono text-lg flex md:text-2xl 2xl:text-3xl`}
        >
          I&apos;m a&nbsp;
          <span className=" text-primaryColor">
            <Typewriter
              options={{ strings: Info.stack, autoStart: true, loop: true }}
            />
          </span>
        </div>
        <p
          className={`text-white/60 px-8 ml-3 text-center text-pretty text-sm font-bold  lg:text-start lg:px-0 lg:ml-0 lg:text-xl lg:font-semibold`}
        >
          {Info.bio}
        </p>
        <div
          className={
            "flex justify-center gap-10 mt-3 w-full items-center lg:justify-start"
          }
        >
          <button
            onClick={openModal}
            className={`bg-[#64FFDA] md:p-3 md:px-5 md:text-lg p-3 rounded-md text-bgColor font-bold text-sm font-mono`}
          >
            Check Resume
          </button>

          <ResumeModal isOpen={isModalOpen} onClose={closeModal}>
            <embed
              className="w-full z-[10000] md:h-[80vh] h-[55vh] flex justify-center items-center"
              src="https://drive.google.com/file/d/1EMEeIeezRq9m12Icm9dV27jW_c9XIelE/preview?usp=sharing"
            />
          </ResumeModal>
          <a
            href={"/yash-g.pdf"}
            download
            // component="a"
            // href="/"
            // download={Info.name}
            className="focus-visible:!outline-non"
            // variant="outline"
          >
            <ShineBorder
              color={["#64FFDA", "#FFBE7B", "#FE8FB5", "#A07CFE"]}
              borderRadius={8}
              borderWidth={1.75}
              duration={8}
              className="!bg-bgColor w-full font-mono !flex text-[#64FFDA] text-sm rounded-md font-bold !items-center md:p-3 md:text-lg md:px-5 !justify-center p-3 !gap-2"
            >
              Download
              <IconDownload size={20} />
            </ShineBorder>
          </a>
        </div>
      </div>
      <SocialHero />
    </section>
  );
}

export default Hero;
