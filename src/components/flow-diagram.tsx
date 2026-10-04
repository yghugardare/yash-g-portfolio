"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui";
import type { Diagram } from "@/data/experience";

const rowLayout: Record<number, string> = {
  1: "grid-cols-1 mx-auto w-full sm:max-w-[19rem]",
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function FlowDiagram({ diagram }: { diagram: Diagram }) {
  const nodes = diagram.steps.flatMap((step) => step.nodes);
  const offsets = diagram.steps.map((_, i) =>
    diagram.steps.slice(0, i).reduce((sum, step) => sum + step.nodes.length, 0),
  );
  const [active, setActive] = useState(0);
  const current = nodes[active];

  return (
    <figure className="mt-8 rounded-[4px] border border-line bg-paper-2/50 p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-display text-lg text-ink">{diagram.title}</span>
        <span className="text-xs text-ink-3">Tap a step for details</span>
      </figcaption>

      <ol className="mt-5">
        {diagram.steps.map((step, i) => (
          <li key={i}>
            {i > 0 ? <Connector label={step.label} /> : null}
            <div
              className={`grid gap-2 ${rowLayout[step.nodes.length] ?? rowLayout[4]}`}
            >
              {step.nodes.map((node, j) => {
                const index = offsets[i] + j;
                const selected = index === active;
                return (
                  <button
                    key={node.title}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(index)}
                    className={`rounded-[4px] border px-3 py-2.5 text-center transition-colors duration-200 motion-reduce:transition-none ${
                      selected
                        ? "border-brass bg-brass-soft/60"
                        : "border-line bg-paper hover:border-line-strong hover:bg-paper-2"
                    }`}
                  >
                    <span className="block text-sm leading-snug font-medium text-ink">
                      {node.title}
                    </span>
                    {node.meta ? (
                      <span className="mt-0.5 block text-xs leading-snug text-ink-3">
                        {node.meta}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-line pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-ink-3 tabular-nums">
            Step {active + 1} of {nodes.length}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Previous step"
              disabled={active === 0}
              onClick={() => setActive(active - 1)}
              className="icon-button h-8 w-8 disabled:cursor-default disabled:opacity-35"
            >
              <Arrow className="h-3.5 w-3.5 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next step"
              disabled={active === nodes.length - 1}
              onClick={() => setActive(active + 1)}
              className="icon-button h-8 w-8 disabled:cursor-default disabled:opacity-35"
            >
              <Arrow className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div aria-live="polite">
          <p className="mt-2 text-sm font-medium text-ink">{current.title}</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">
            {current.detail}
          </p>
        </div>
      </div>
    </figure>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-1">
      <span />
      <svg
        width="10"
        height="28"
        viewBox="0 0 10 28"
        fill="none"
        aria-hidden="true"
        className="text-line-strong"
      >
        <path
          d="M5 0v26M1.5 22.5 5 26l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-xs leading-snug text-ink-3 italic">
        {label}
      </span>
    </div>
  );
}
