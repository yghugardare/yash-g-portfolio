export type DiagramKind = "workflow" | "context" | "handoff" | "subagents";

type Source = { label: string; href: string };
export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  diagram?: DiagramKind;
  example?: { title: string; text: string };
  sources?: Source[];
};

export const toolChoices = [
  {
    name: "GitHub Copilot",
    use: "Stay close to the edit",
    detail: "I reach for inline assistance when I already know the shape of the change. A small function or a repetitive test fixture is easy to inspect as I write. Copilot also offers agent workflows; inline completion is simply the role I find useful here.",
    href: "https://docs.github.com/en/copilot/get-started/best-practices",
  },
  {
    name: "Codex",
    use: "Carry a bounded task through",
    detail: "For a repository change, I give Codex a concrete outcome, the relevant constraints, and a way to check its work. I review the resulting diff and verification evidence together. A confident completion message by itself tells me very little.",
    href: "https://learn.chatgpt.com/guides/best-practices",
  },
  {
    name: "Antigravity",
    use: "Review the plan and the result",
    detail: "Its planning artifacts give me a place to challenge scope and assumptions before implementation. I use that review surface to make the proposed change inspectable, then compare the finished behavior with the plan.",
    href: "https://antigravity.google/docs/plan/",
  },
  {
    name: "Claude Code",
    use: "Explore, reason, and iterate",
    detail: "I use a terminal-based loop to trace code paths, investigate failures, and work through a focused change. Separating exploration from editing helps me catch a mistaken premise before it becomes a large patch.",
    href: "https://code.claude.com/docs/en/best-practices",
  },
];

export const articleSections: ArticleSection[] = [
  {
    id: "the-working-loop",
    title: "Start with the problem, then open the tools",
    paragraphs: [
      "The easiest thing to get from a coding agent is more code. What I want is a shorter path to a change I understand and can defend. Sometimes that means asking it to implement something. Sometimes it means asking it to explain why my proposed fix will fail.",
      "My working loop is straightforward: establish the behavior, explore the relevant code, agree on a small change, build it, and inspect the evidence. I move back a step whenever a new fact changes the problem. A failing test can invalidate the implementation; an unexpected dependency can invalidate the plan.",
      "I adjust the ceremony to the risk. A copy edit needs a quick inspection. A change to permissions or data ownership deserves explicit invariants, failure cases, and a rollback plan. Asking for a long plan on every tiny task wastes attention just as surely as skipping one on a difficult task.",
    ],
    diagram: "workflow",
  },
  {
    id: "choosing-tools",
    title: "Which tool I reach for",
    paragraphs: [
      "Copilot, Codex, Antigravity, and Claude Code have overlapping capabilities. I choose between them based on where the work lives, what context they can access, and how easily I can inspect their actions. Switching tools rarely fixes an unclear requirement.",
      "These are the roles I give them in my workflow, not a ranking of model intelligence. For a sensitive repository, the decision also includes the team's data policy and the permissions the tool actually needs. I keep credentials and private production data out of prompts and use sanitized examples when reproducing a problem.",
    ],
  },
  {
    id: "grill-and-explore",
    title: "Let the agent grill the idea",
    paragraphs: [
      "Before a substantial change, I ask the agent to question me. Who needs this? What should happen on failure? Which behavior must stay compatible? What would make the feature unnecessary? I want questions that expose a decision, not a questionnaire that postpones the work.",
      "Then I ask it to explore the codebase before proposing an implementation. For an upload feature, that means tracing the request from the UI through validation, authorization, storage, and the background worker. I want file paths, the existing test setup, and a clear distinction between what the code proves and what the agent is inferring.",
      "I check the important references myself. If the explanation says retries are safe, I ask where duplicate work is prevented. If that protection does not exist, we have found a design question worth settling. Exploration should shrink uncertainty and end in a short map of the relevant system.",
    ],
    example: {
      title: "An exploration prompt",
      text: "Trace the upload flow from the form to the worker. Read the relevant code and tests before suggesting changes. Show the files that own validation, authorization, and retries. Identify what is known, what is inferred, and which unanswered questions would change the design. Do not edit yet.",
    },
    sources: [{ label: "AI Hero: course syllabus and planning workflow", href: "https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w" }],
  },
  {
    id: "clear-requirements",
    title: "Write requirements another engineer could use",
    paragraphs: [
      "A good brief gives the agent enough information to make local decisions without inventing product behavior. I include the user-visible outcome, the boundaries of the change, the important constraints, and examples that make success observable. I also say what is outside the task when an adjacent refactor would be tempting.",
      "Consider adding retries to an import job. 'Make uploads more reliable' leaves most of the hard decisions unresolved. In this example, the brief makes those decisions visible before any code changes.",
      "I leave implementation freedom where it is cheap and constrain behavior where mistakes are expensive. The agent can choose a local helper name. It should not decide whether a timeout permits a second charge or whether one user may read another user's import.",
    ],
    example: {
      title: "Example: retry a failed import",
      text: "Outcome: a user can retry their own failed import without creating duplicate records.\n\nPreserve: existing authorization and successful-import behavior.\nDecide first: how to distinguish a failed attempt from a worker that is still running.\nScope: retry behavior only; no queue replacement or unrelated UI redesign.\nAcceptance: reject another user's request; reject a completed import; make concurrent retries safe; show a useful failure state.\nEvidence: exercise those cases and report the commands, results, and any unverified assumptions.",
    },
  },
  {
    id: "context-management",
    title: "Keep the next decision in focus",
    paragraphs: [
      "Context is everything available to the model for its next response: instructions, conversation, source files, tool results, and working notes. A larger window lets more material fit, but does not guarantee the agent will use it well. I curate that material around the decision in front of us.",
      "AI Hero calls the productive state the 'smart zone' and the deteriorating state the 'dumb zone'. I find the language useful as a warning sign, not a measurement. There is no universal token percentage where an agent suddenly becomes unreliable. The task, model, and contents of the conversation all matter.",
      "I watch for repeated searches, forgotten constraints, and a plan that keeps returning to a rejected approach. When those appear, I stop adding corrective messages. I save the decisions that still matter, remove stale assumptions, and either compact the conversation or start a fresh session with a handoff.",
      "During normal work, I ask for relevant functions and concise test failures instead of entire directories and enormous logs. I retain paths to supporting material so the agent can fetch it when needed. The context diagram shows the principle, not measured model performance.",
    ],
    diagram: "context",
    sources: [
      { label: "AI Hero: smart zone", href: "https://www.aihero.dev/ai-coding-dictionary/smart-zone" },
      { label: "Anthropic: context engineering", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
    ],
  },
  {
    id: "instructions-and-skills",
    title: "Give durable knowledge a home",
    paragraphs: [
      "I keep repository guidance short enough to maintain. An AGENTS.md should tell an agent how to orient itself, which commands verify a change, and which constraints are easy to miss. It should point to deeper documentation rather than repeat the entire architecture. A rule that no longer matches the code is worse than an absent rule because it arrives with apparent authority.",
      "Instruction filenames and loading rules depend on the tool. Codex supports AGENTS.md; Claude Code uses CLAUDE.md for project memory. I check the harness rather than assuming one file is read everywhere, and avoid maintaining contradictory copies of the same guidance.",
      "I use Skills for repeatable procedures: reviewing a database migration, investigating an incident, or checking a UI change. The skill describes when it applies and the steps that make the result useful. Tooling can expose a skill's name and description first, load its instructions when selected, then read supporting files as needed. That is progressive disclosure: the next layer arrives when the task calls for it.",
      "For example, a migration skill can link to the database conventions and ask for lock behavior, compatibility during rollout, and recovery steps. There is no reason to load all of that into a session that is adjusting a button label. I add guidance when it prevents a repeatable mistake, and prune it when it stops earning its space.",
    ],
    sources: [
      { label: "OpenAI: reusable repository guidance", href: "https://learn.chatgpt.com/guides/best-practices" },
      { label: "OpenAI: Skills and progressive disclosure", href: "https://learn.chatgpt.com/docs/build-skills" },
      { label: "Claude Code: project instructions", href: "https://code.claude.com/docs/en/best-practices" },
    ],
  },
  {
    id: "session-sized-work",
    title: "Make each session finish something",
    paragraphs: [
      "I split complex work at a boundary where I can verify behavior and explain what changed. 'Build the backend' is too vague. 'Accept a valid import request and persist its initial state, with authorization covered' gives the session a useful finish line.",
      "For the import example, I might separate the request contract, the worker's retry behavior, and the UI's status handling. Each task gets the agreed interfaces and the relevant acceptance cases. If the interface is still unsettled, I resolve it before assigning dependent implementation work.",
      "Session-sized does not mean a fixed number of minutes or files. It means the work can stay coherent and produce a reviewable result. At the end, I want the diff, the checks that actually ran, and the remaining uncertainty. An unfinished experiment gets labeled as unfinished so the next session does not mistake it for a decision.",
    ],
  },
  {
    id: "compaction-and-handoffs",
    title: "Compact to continue. Hand off to reset.",
    paragraphs: [
      "Compaction condenses earlier conversation so work can continue with less history in the active context. It is useful when the task and approach are still sound. Because a summary can omit a crucial constraint, I check that the goal, decisions, and unresolved issues survived.",
      "A handoff is a deliberate transfer into a fresh session or to another engineer or agent. I choose what the next session needs to know and tell it where to verify the current state. I prefer this when the task changes or the conversation has collected too many abandoned approaches.",
      "Both are lossy. Neither replaces the repository, a reviewed decision record, or actual test output. My handoff includes the branch or commit, relevant paths, the reason behind consequential choices, exact verification results, and one concrete next step. 'Everything is done except tests' is not enough to safely pick up the work.",
    ],
    diagram: "handoff",
    example: {
      title: "A handoff I can act on",
      text: "Goal: make retries safe for the import owner.\nState: record the current branch, commit, and any uncommitted files.\nDecisions: preserve the existing queue; reuse the authorization boundary.\nChanged: list the actual handler, worker, and test paths.\nVerified: record exact commands and observed results. Say explicitly if a check was not run.\nOpen: concurrent retries still need verification.\nNext: reproduce two simultaneous retry requests and inspect whether more than one job is enqueued.",
    },
    sources: [{ label: "Anthropic: compaction and structured notes", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" }],
  },
  {
    id: "subagents",
    title: "Delegate work that can stand on its own",
    paragraphs: [
      "Subagents are useful when a question has a clear boundary. One can trace authorization while another inspects retry tests. Each returns a concise finding with file references and uncertainty. That keeps the main session focused on the decision instead of every search that led to it.",
      "I give each subagent an objective, permitted scope, relevant context, and an expected output. Read-only exploration is often the easiest work to parallelize. Concurrent edits need stronger boundaries, such as separate files or isolated worktrees, followed by deliberate integration.",
      "I do not delegate a decision before defining the shared contract. Two agents independently choosing a request format and a response format can create more work than they save. The coordinating session owns the interfaces, resolves conflicting findings, and runs checks on the combined change.",
      "Parallelism has a cost: duplicated exploration, extra tokens, and more material to review. For a small fix I use one session. For independent investigations I can compare the time saved with the effort of integrating the answers. More agents do not automatically produce more confidence.",
    ],
    diagram: "subagents",
    sources: [{ label: "Anthropic: when parallel agent workflows help", href: "https://www.anthropic.com/engineering/building-effective-agents" }],
  },
  {
    id: "verification",
    title: "Review the evidence, then own the result",
    paragraphs: [
      "I read the diff before accepting the explanation. I look for changed behavior outside the brief, hidden coupling, unnecessary abstractions, and failure paths the happy-path demo never touches. Then I run checks that match the risk: types and lint for basic integrity, focused tests for behavior, integration checks for boundaries, and a browser pass for an interface.",
      "I ask the agent to explain how its tests would fail if the implementation were wrong. A test that merely repeats the implementation can give false reassurance. For the retry example, I want evidence about ownership, duplicate requests, and interrupted work, not just a successful response status.",
      "When the software itself uses a model, I add representative evaluation cases and inspect failures across realistic inputs. I care about output quality, latency, cost, and recovery behavior. A persuasive demo is useful for learning, but it is a weak basis for a production decision.",
      "The practical benefit of AI is that I can investigate more possibilities and get feedback sooner. I spend that time saved on the questions that would otherwise be rushed: is the behavior right, is the design understandable, and will the next engineer be able to change it safely? That is how I decide whether the collaboration actually helped.",
    ],
    sources: [{ label: "GitHub: validate suggested code", href: "https://docs.github.com/en/copilot/get-started/best-practices" }],
  },
];
