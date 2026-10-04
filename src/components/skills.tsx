import type { CSSProperties } from "react";
import { Section } from "@/components/section";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      label="Skills"
      title={
        <>
          The toolkit,{" "}
          <em className="text-brass-deep italic">honestly listed</em>.
        </>
      }
      deck="The tools I use day to day and have shipped production work with."
    >
      <dl className="grid gap-x-10 gap-y-0 lg:grid-cols-2">
        {skillGroups.map((group, i) => (
          <div
            key={group.name}
            className="grid grid-cols-1 gap-4 border-t border-line py-5 min-[400px]:grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] sm:py-6"
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 60}ms` } as CSSProperties}
          >
            <dt className="font-display text-[1.0625rem] leading-snug font-medium text-brass-deep">
              {group.name}
            </dt>
            <dd className="text-[0.9375rem] leading-relaxed text-ink">
              {group.items.map((item, j) => (
                <span key={item}>
                  <span className="whitespace-nowrap">{item}</span>
                  {j < group.items.length - 1 ? (
                    <span aria-hidden="true" className="text-line-strong">
                      {" · "}
                    </span>
                  ) : null}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
