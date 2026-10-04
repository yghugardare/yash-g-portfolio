import { Section } from "@/components/section";
import { StrikeSwap } from "@/components/strike-swap";
import { ProjectShowcase } from "@/components/project-showcase";
import { projects } from "@/data/projects";
import { getProjectStats } from "@/lib/github";

export async function Projects() {
  const items = await Promise.all(
    projects.map(async (project) => ({
      project,
      stats: await getProjectStats(project),
    })),
  );
  return (
    <Section
      id="projects"
      label="Projects"
      title={
        <>
          <StrikeSwap from="Projects" to="Products" /> I&apos;ve built{" "}
          <em className="italic">on my own.</em>
        </>
      }
      deck="Open-source and side projects outside my job. I only list things that actually run."
    >
      <div data-reveal>
        <ProjectShowcase items={items} />
      </div>
    </Section>
  );
}
