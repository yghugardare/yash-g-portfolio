import type { Metadata } from "next";
import { AiCodingIceberg } from "@/components/ai-coding-iceberg";
import { aiCodingPost as post } from "@/data/blog";
import { profile } from "@/data/profile";

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
      <header>
        <h1 className="max-w-3xl text-[2.7rem] leading-[1.04] sm:text-[4rem] lg:text-[4.7rem]">
          How I use AI<br />
          <em className="font-normal text-brass-deep">for coding.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          A practical look at the context, conversations, and checks behind code I
          can stand behind.
        </p>
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
    </article>
  );
}
