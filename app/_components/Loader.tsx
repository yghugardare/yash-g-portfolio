"use client"


import IconCloud from "@/components/magic-ui/icon-cloud";
import { Slugs } from "@/data/yash";
import { IconHexagon } from "@tabler/icons-react";



export function Loader() {
  return (
    <div className="relative flex h-full w-full animate-[ping_1.5s_ease-in-out_1_3.5s] items-center justify-center !overflow-hidden">
      <IconCloud iconSlugs={Slugs} />
      <IconHexagon className="absolute -z-10 animate-[spin_5s_linear_infinite] !overflow-hidden" size={120} color="#64FFDA" stroke={1.25} />
      <div className=" absolute font-mono text-primaryColor font-semibold text-6xl -z-10 !overflow-hidden">YG</div>
    </div>
  );
}
