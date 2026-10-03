"use client";

import { useId, useState } from "react";
import { Arrow } from "@/components/ui";
import type { DiagramKind } from "@/data/ai-coding";

const diagrams = {
  workflow: {
    number: "01",
    title: "A small loop, with evidence at every step",
    options: ["Define", "Explore", "Plan", "Build", "Verify"],
    details: [
      "Name the user-visible outcome, constraints, and acceptance cases. This is the reference for every later decision.",
      "Trace the relevant code and tests. Return file references, unknowns, and the behavior that already exists.",
      "Choose the smallest coherent change. Settle interfaces and expensive decisions before implementation.",
      "Implement one verifiable slice. Feed observed failures back into the work instead of expanding the scope.",
      "Inspect the diff and exercise the acceptance cases. If evidence contradicts the plan, return to the relevant earlier step.",
    ],
  },
  context: {
    number: "02",
    title: "What earns a place in the context?",
    options: ["Focused", "Crowded", "Curated"],
    details: [
      "A clear task, current constraints, and relevant code leave room to reason. This is the useful shorthand behind the smart zone.",
      "Old logs and abandoned approaches compete with the current task. Repetition and missed constraints are cues to intervene, not a universal token threshold.",
      "Preserve decisions and evidence. Keep references to deeper material and retrieve it when the next decision needs it.",
    ],
  },
  handoff: {
    number: "03",
    title: "Two ways to carry the work forward",
    options: ["Compaction", "Handoff"],
    details: [
      "Continue the same task with condensed history. Check that important constraints and unresolved questions survived the summary.",
      "Start a fresh session with a deliberate brief. Re-read the relevant code and verify the recorded state before taking the next step.",
    ],
  },
  subagents: {
    number: "04",
    title: "Fan out the questions. Bring back evidence.",
    options: ["Delegate", "Investigate", "Integrate"],
    details: [
      "The main session sets a shared goal and gives each subagent one independent question, a scope, and an expected output.",
      "Separate contexts inspect authorization and retry behavior. Each returns references, findings, and uncertainty instead of a full transcript.",
      "The main session reconciles the findings, owns the decision, and verifies the combined result. Parallel investigation still needs one integration point.",
    ],
  },
};

function Node({ title, note, active = false }: { title: string; note: string; active?: boolean }) {
  return (
    <div className={`ai-node ${active ? "ai-node-active" : ""}`}>
      <span className="block text-sm font-medium text-ink">{title}</span>
      <span className="mt-1 block text-xs leading-relaxed text-ink-3">{note}</span>
    </div>
  );
}

function Connector({ active = false }: { active?: boolean }) {
  return <div aria-hidden="true" className={`ai-connector ${active ? "ai-connector-active" : ""}`}><span /></div>;
}

export function AiWorkflowDiagram({ kind }: { kind: DiagramKind }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const diagram = diagrams[kind];
  const contextItems = active === 1
    ? ["Current task", "Constraints", "Relevant code", "Old logs", "Rejected plan", "Unrelated files", "Repeated output", "Stale assumptions"]
    : active === 2
      ? ["Current task", "Constraints", "Verified decisions", "Relevant code"]
      : ["Current task", "Constraints", "Relevant code"];

  return (
    <figure className="ai-diagram" aria-labelledby={`${id}-title`}>
      <figcaption className="flex items-start gap-3">
        <span className="eyebrow pt-1.5 text-brass-deep">{diagram.number}</span>
        <span id={`${id}-title`} className="font-display text-xl leading-tight text-ink sm:text-2xl">{diagram.title}</span>
      </figcaption>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={`${diagram.title}: select a stage`}>
        {diagram.options.map((option, i) => (
          <button
            key={option}
            type="button"
            aria-pressed={active === i}
            aria-controls={`${id}-detail`}
            onClick={() => setActive(i)}
            className={`min-h-11 rounded-full border px-3.5 text-xs transition-colors duration-200 motion-reduce:transition-none ${active === i ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper text-ink-2 hover:border-brass"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div key={active} className="ai-diagram-stage mt-6" aria-hidden="true">
        {kind === "workflow" && (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
              {diagram.options.map((option, i) => (
                <div key={option} className={`ai-workflow-step ${active === i ? "ai-node-active" : ""}`}>
                  <span className="font-mono text-[0.65rem] text-brass-deep">0{i + 1}</span>
                  <span className="text-sm text-ink">{option}</span>
                  <Arrow className="h-3 w-3 rotate-90 text-ink-3 sm:rotate-0" />
                </div>
              ))}
            </div>
            <div className="ai-return-path"><span>Evidence changes the plan? Go back a step.</span></div>
          </>
        )}

        {kind === "context" && (
          <div className="grid gap-4 sm:grid-cols-[1fr_0.65fr]">
            <div className="rounded-[4px] border border-line-strong bg-paper p-4">
              <span className="eyebrow">Active context</span>
              <div className="mt-4 flex min-h-40 flex-col gap-1.5">
                {contextItems.map((item, i) => (
                  <span key={item} style={{ animationDelay: `${i * 45}ms` }} className={`ai-context-item ${active === 1 && i > 2 ? "border-line bg-paper-2 text-ink-3" : "border-brass/30 bg-brass-soft/60 text-ink"}`}>{item}</span>
                ))}
                {active !== 1 && <span className="flex flex-1 items-center justify-center rounded-sm border border-dashed border-line-strong px-3 py-5 text-xs text-ink-3">Room for the next decision</span>}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Node title={active === 1 ? "Re-check the signal" : "Fetch when needed"} note={active === 1 ? "Repetition · missed constraints · drift" : "Paths · docs · focused tool results"} active />
              <span className="px-1 text-xs leading-relaxed text-ink-3">Conceptual view. Box sizes do not represent token counts or model accuracy.</span>
            </div>
          </div>
        )}

        {kind === "handoff" && (
          <div className="mx-auto max-w-md">
            <Node title="Working session" note="Goal, code, decisions, exploration" />
            <Connector active />
            <Node title={active === 0 ? "Condensed history" : "Explicit handoff brief"} note={active === 0 ? "Summarize what still matters" : "State · paths · reasons · checks · next step"} active />
            <Connector active />
            <Node title={active === 0 ? "Continue the task" : "Fresh session"} note={active === 0 ? "Check the preserved constraints" : "Verify state, then take the next step"} />
          </div>
        )}

        {kind === "subagents" && (
          <div>
            <div className="mx-auto max-w-xs"><Node title="Main session" note="Own the goal and shared contract" active={active === 0} /></div>
            <Connector active={active === 0} />
            <div className="ai-branch grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Node title="Authorization explorer" note="Who may retry this import?" active={active === 1} />
              <Node title="Retry explorer" note="What prevents duplicate work?" active={active === 1} />
            </div>
            <Connector active={active === 2} />
            <div className="mx-auto max-w-xs"><Node title="Reconcile and verify" note="References + findings + uncertainty" active={active === 2} /></div>
          </div>
        )}
      </div>

      <div id={`${id}-detail`} className="mt-6 border-t border-line pt-4" aria-live="polite" aria-atomic="true">
        <span className="block text-sm font-medium text-ink">{diagram.options[active]}</span>
        <p className="mt-1 text-sm leading-relaxed text-ink-2">{diagram.details[active]}</p>
      </div>
      <span className="mt-3 block font-mono text-[0.625rem] tracking-wide text-ink-3">SELECT A STAGE TO EXPLORE</span>
    </figure>
  );
}
