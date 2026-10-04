import type { Metadata } from "next";
import { AiCodingIceberg } from "@/components/ai-coding-iceberg";
import { AiCodingMeme } from "@/components/ai-coding-meme";
import { AgentSkillsWorkflow } from "@/components/agent-skills-workflow";
import { AiCodeReviewSection } from "@/components/ai-code-review-section";
import { aiCodingPost as post } from "@/data/blog";
import { profile } from "@/data/profile";
import { ArrowLink } from "@/components/ui";

const path = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    url: path,
    authors: [profile.name],
    publishedTime: post.publishedAt,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
  },
};

export default function AiCodingPage() {
  return (
    <article className="container-x py-12 sm:py-16 lg:py-20">
      <header className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-12">
        <div>
          <h1 className="max-w-3xl text-[2.7rem] leading-[1.04] sm:text-[4rem] lg:text-[4.7rem]">
            How I use AI<br />
            <em className="font-normal text-brass-deep">for coding.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            A practical look at the context, conversations, and checks behind code I
            can stand behind.
          </p>
        </div>
        <div className="w-full max-w-[440px] lg:justify-self-end">
          <AiCodingMeme />
        </div>
      </header>

      <section
        aria-labelledby="introduction-title"
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      >
        <p className="eyebrow">Introduction</p>
        <h2 id="introduction-title" className="mt-4 text-3xl leading-tight sm:text-[2.5rem]">
          The work below the surface.
        </h2>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-10">
          <div className="max-w-2xl space-y-5 text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
            <p>
              AI coding means using a model to help write, change, or understand
              software. It might explain an unfamiliar function, fix a bug, or
              build a feature from a brief. Getting code back is quick. Deciding
              whether it fits your project takes more care.
            </p>
            <p>
              I think of it as an iceberg. The prompt is the part everyone sees.
              Beneath it sit the files the agent reads, the requirements you agree
              on, the design of the change, the checks you run, and the decisions
              you carry into the next session. That work gives the prompt
              something solid to work with.
            </p>
            <p>
              Take a request like &ldquo;Add a retry button.&rdquo; The button
              itself is easy. What if the first request is still running? Can
              clicking twice create duplicate records? Is this user allowed to
              retry the job? A useful implementation needs answers to those
              questions, even if the original prompt never mentioned them.
            </p>
          </div>
          <AiCodingIceberg />
        </div>
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          <p>
            In my workflow, I give the agent the relevant code and constraints,
            settle the behaviour, and work in small changes I can review. I
            read the diff and test what happens when things go wrong. Before
            moving on, I leave a short record of decisions the next session
            needs.
          </p>
          <p className="text-ink">
            AI helps me get from an idea to working code faster. I still need
            to understand the change well enough to explain it, maintain it,
            and ship it.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="context-title"
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      >
        <p className="eyebrow">Context management &amp; engineering</p>
        <h2 id="context-title" className="mt-4 text-3xl leading-tight sm:text-[2.5rem]">
          Give the agent what it needs.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          Context is what the model can see for a response: my request,
          instructions, code it has read, and tool results. I decide what to
          include and when to load it. That&apos;s context engineering; it saves
          the agent from guessing.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div className="border-l-2 border-brass pl-5">
            <h3 className="font-mono text-sm font-medium text-brass-deep">
              AGENTS.md
            </h3>
            <p className="mt-3 max-w-xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
              I keep <code className="font-mono text-[0.85em] text-ink">AGENTS.md</code>{" "}
              short: setup and test commands, code conventions, constraints, known
              traps, and links to deeper docs. Codex reads it as the rules for
              working in my repo.
            </p>
          </div>
          <div className="border-l-2 border-sage pl-5">
            <h3 className="font-mono text-sm font-medium text-sage">
              CLAUDE.md
            </h3>
            <p className="mt-3 max-w-xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
              For Claude Code, I put project instructions in{" "}
              <code className="font-mono text-[0.85em] text-ink">CLAUDE.md</code>.
              I can import <code className="font-mono text-[0.85em] text-ink">AGENTS.md</code>{" "}
              to share the same rules, then add Claude-specific guidance. I keep
              both current and leave out what the code already makes obvious.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          When the context window gets crowded, the agent can miss earlier
          requirements or repeat work. At the limit, it cannot take in more
          history without making room. <mark className="highlight">Compaction</mark>{" "}
          turns older conversation into a short summary of the task, key
          decisions, and next steps, freeing space to continue. I type{" "}
          <code className="font-mono text-[0.85em] text-ink">/compact</code> in
          Claude Code or Codex CLI to trigger it, then check that important
          details survived.
        </p>
        <p className="mt-6 text-xs leading-relaxed text-ink-3">
          Guidance I draw on:{" "}
          <a className="link-rule" href="https://learn.chatgpt.com/docs/agent-configuration/agents-md">
            OpenAI
          </a>{" "}
          &middot;{" "}
          <a className="link-rule" href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">
            Anthropic
          </a>{" "}
          &middot;{" "}
          <a className="link-rule" href="https://code.claude.com/docs/en/memory">
            Claude Code
          </a>{" "}
        </p>
      </section>
      <section
        aria-labelledby="skills-title"
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      >
        <p className="eyebrow">Agent skills</p>
        <h2 id="skills-title" className="mt-4 text-3xl leading-tight sm:text-[2.5rem]">
          A workflow I can use again.
        </h2>
        <div className="mt-6 max-w-3xl space-y-5 text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          <p>
            While prompts are great for one-time requests, we have{" "}
            <mark className="highlight">agent skills</mark> for work we want to
            repeat. A skill packages a procedure in a <code className="font-mono text-[0.85em] text-ink">SKILL.md</code>{" "}
            file, with references or scripts when needed. I reach for one when I
            keep correcting the same part of a task.
          </p>
          <p>
            Several skills can form an agentic workflow: clarify the request,
            build from the agreed plan, then verify and document the change.
            Each step leaves a file or result the next can inspect. I still
            decide when the work is ready to move on.
          </p>
        </div>

        <div className="mt-8"><AgentSkillsWorkflow kind="engineering" /></div>
        <p className="mt-5 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          <a className="link-rule text-ink" href="https://github.com/jsmastery-pro/skills">JavaScript Mastery&apos;s engineering skills</a>{" "}
          cover this delivery loop. I find the structure useful when I&apos;m
          building something I&apos;ll have to maintain: the plan, checks, and
          project notes stay alongside the code.
        </p>

        <div className="mt-10">
          <h3 className="text-2xl leading-tight">Start with one repeating correction.</h3>
          <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
            <div className="space-y-5 text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
              <p>
                I put project skills in <code className="font-mono text-[0.85em] text-ink">.agents/skills/</code>{" "}
                for Codex or <code className="font-mono text-[0.85em] text-ink">.claude/skills/</code>{" "}
                for Claude Code. I call them with <code className="font-mono text-[0.85em] text-ink">$skill-name</code>{" "}
                or <code className="font-mono text-[0.85em] text-ink">/skill-name</code>, respectively;
                compatible agents can also choose from the description.
              </p>
              <p>
                To write my own, I create a folder with a <code className="font-mono text-[0.85em] text-ink">SKILL.md</code>{" "}
                file. The header names the skill and says when it applies. The
                body explains the work and the result I expect.
              </p>
            </div>
            <div className="min-w-0 overflow-hidden rounded border border-line bg-paper-2">
              <p className="border-b border-line px-5 py-3 font-mono text-xs text-ink-3">review-change/SKILL.md</p>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-xs leading-[1.85] text-ink-2"><code>{`---
name: review-change
description: Review a diff for regressions
  and missing tests before a pull request.
---
Read the diff and relevant callers.
Report findings with file paths and
a way to reproduce each issue.`}</code></pre>
            </div>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm leading-relaxed text-ink-2 sm:grid-cols-2">
            <li className="flex gap-3"><span aria-hidden="true" className="text-brass-deep">01</span>Give it one job and a clear trigger.</li>
            <li className="flex gap-3"><span aria-hidden="true" className="text-brass-deep">02</span>Keep the instructions short; link deeper references.</li>
            <li className="flex gap-3"><span aria-hidden="true" className="text-brass-deep">03</span>Try real tasks, including ones it should stay out of.</li>
            <li className="flex gap-3"><span aria-hidden="true" className="text-brass-deep">04</span>Cut lines that don&apos;t improve the result.</li>
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-ink-3">
            Authoring references:{" "}
            <a className="link-rule" href="https://learn.chatgpt.com/docs/build-skills">Codex skills</a>{" "}
            &middot;{" "}
            <a className="link-rule" href="https://code.claude.com/docs/en/skills">Claude Code skills</a>{" "}
            &middot;{" "}
            <a className="link-rule" href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">Claude authoring best practices</a>
          </p>
        </div>

        <p className="mt-10 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          I also use <a className="link-rule text-ink" href="https://github.com/mattpocock/skills">Matt Pocock&apos;s skills</a>.
          They turn engineering habits into repeatable steps: question the brief,
          settle the design, build a thin slice, and keep feedback close. This is
          how I connect them, with Wayfinder for bigger unknowns and a prototype
          when I need to see an idea working before deciding.
        </p>
        <div className="mt-8"><AgentSkillsWorkflow kind="pocock" /></div>
        <p className="mt-5 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          One idea from <a className="link-rule" href="https://www.youtube.com/watch?v=QsU0f-547rQ">this walkthrough</a>{" "}
          stuck with me: start with the correction you keep making. I borrow a
          skill&apos;s method, try it on my own work, and trim what adds nothing.
        </p>
        <p className="mt-5 text-xs leading-relaxed text-ink-3">
          Explore Matt&apos;s{" "}
          <a className="link-rule" href="https://github.com/mattpocock/skills/blob/main/docs/engineering/ask-matt.md">workflow guide</a>{" "}
          for the branches between these steps. The stage details name the skills; invocation syntax depends on the agent.
        </p>
      </section>
      <AiCodeReviewSection />
      <section
        aria-labelledby="closing-title"
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      >
        <p className="eyebrow">A final note</p>
        <h2 id="closing-title" className="mt-4 text-3xl leading-tight sm:text-[2.5rem]">
          Learning as I go.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
          That&apos;s how I use AI in my day-to-day work. I&apos;m still learning
          and experimenting, and I&apos;ll update this blog as I find better
          ways to work.
        </p>
        <div className="mt-6 max-w-3xl rounded border border-line bg-paper-2 px-5 py-5 sm:px-6">
          <p className="text-base leading-relaxed text-ink-2">
            If you&apos;re hiring or need someone to contribute to your project,
            I&apos;d love to hear what you&apos;re building.
          </p>
          <ArrowLink href="/#contact" className="mt-4">Get in touch</ArrowLink>
        </div>
      </section>
    </article>
  );
}
