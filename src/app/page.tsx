import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { JsonLdScript, personJsonLd, websiteJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={[personJsonLd(), websiteJsonLd()]} />
      <Hero />
      <Work />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
