export type SkillScene =
  | "scope" | "audit" | "architect" | "develop" | "check" | "test"
  | "document" | "sync" | "debug" | "grill" | "map" | "prototype" | "tdd";

export type SkillStage = {
  name: string;
  command: string;
  title: string;
  description: string;
  outcomes: [string, string];
  scene: SkillScene;
};

export const skillWorkflows: Record<"engineering" | "pocock", {
  title: string;
  note: string;
  stages: SkillStage[];
}> = {
  engineering: {
    title: "The agentic engineering workflow",
    note: "Use the stages your change needs. Debugging can enter the loop at any point.",
    stages: [
      { name: "scope", command: "scope", title: "Make the request concrete", description: "Agree on the outcome and break the work into manageable tasks.", outcomes: ["Clear scope", "Small first task"], scene: "scope" },
      { name: "audit", command: "audit", title: "Read before changing", description: "Inspect the repository and record its commands, conventions, and constraints.", outcomes: ["Verified context", "Useful AGENTS.md"], scene: "audit" },
      { name: "architect", command: "architect", title: "Settle the design", description: "Resolve the important choices and write a spec the build can follow.", outcomes: ["Explicit decisions", "Buildable spec"], scene: "architect" },
      { name: "develop", command: "develop", title: "Build a small change", description: "Implement one agreed slice using the project's existing patterns.", outcomes: ["Focused diff", "Working feature"], scene: "develop" },
      { name: "check", command: "check verify · check review", title: "Check the actual result", description: "Run the feature against its spec; review the diff before merging.", outcomes: ["Observed behaviour", "Review findings"], scene: "check" },
      { name: "test", command: "test", title: "Keep the behaviour working", description: "Add meaningful coverage for the change, including failure cases.", outcomes: ["Regression coverage", "Passing checks"], scene: "test" },
      { name: "document", command: "document", title: "Explain what changed", description: "Write the PR summary and release notes from the real diff.", outcomes: ["Readable PR", "Useful changelog"], scene: "document" },
      { name: "sync", command: "sync", title: "Bring the files up to date", description: "Reconcile the scope, specs, and repository instructions with what actually shipped.", outcomes: ["Accurate status", "Fresh context"], scene: "sync" },
      { name: "debug", command: "debug", title: "Find the cause", description: "Reproduce the failure, narrow it down, and verify the smallest fix.", outcomes: ["Root cause", "Regression test"], scene: "debug" },
    ],
  },
  pocock: {
    title: "How I connect Matt Pocock's skills",
    note: "Wayfinder and prototype are optional detours. TDD runs inside implementation; review closes the loop.",
    stages: [
      { name: "grill-me", command: "grill-me · grill-with-docs", title: "Question the brief", description: "Surface assumptions together. Use grill-with-docs to record decisions in an existing project.", outcomes: ["Shared understanding", "Decisions recorded"], scene: "grill" },
      { name: "wayfinder", command: "wayfinder", title: "Map the unknowns", description: "For a large, unclear effort, resolve decision tickets before starting the build.", outcomes: ["Decision map", "Route clarified"], scene: "map" },
      { name: "prototype", command: "prototype", title: "Answer one question in code", description: "Build a throwaway experiment when discussion cannot settle a design question.", outcomes: ["Concrete evidence", "Answer retained"], scene: "prototype" },
      { name: "plan", command: "to-spec → to-tickets", title: "Leave a plan that travels", description: "For larger work, capture the decisions and split them into thin, buildable slices.", outcomes: ["Written spec", "Tracer-bullet tickets"], scene: "scope" },
      { name: "implement", command: "implement", title: "Build the agreed slice", description: "Implement the ticket with TDD at agreed boundaries, then run checks.", outcomes: ["One slice", "Verified change"], scene: "develop" },
      { name: "tdd", command: "tdd · inside implement", title: "Test as I build", description: "Fail a behaviour test, write enough code to pass, then refactor. Repeat.", outcomes: ["Fast feedback", "Durable tests"], scene: "tdd" },
      { name: "review", command: "code-review", title: "Read the change critically", description: "Check the diff against the spec and resolve findings before shipping.", outcomes: ["Issues resolved", "Human sign-off"], scene: "check" },
    ],
  },
};
