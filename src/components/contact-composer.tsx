"use client";

import { useState, useSyncExternalStore } from "react";
import { Arrow } from "@/components/ui";

type Topic = { label: string; subject: string; body: string };

const TOPICS: Topic[] = [
  {
    label: "A role",
    subject: "A [role] at [company]",
    body: "Hi Yash,\n\nI'm hiring for a [role] at [company] and your work caught my eye. Would you be open to a quick call this week?",
  },
  {
    label: "A project",
    subject: "Something I'm building",
    body: "Hi Yash,\n\nI'm working on [what you're building] and could use help with [the tricky part]. Up for a chat?",
  },
  {
    label: "Just saying hi",
    subject: "Hello from your portfolio",
    body: "Hi Yash,\n\nI came across your portfolio and wanted to say hi. [Anything you'd like to add]",
  },
];

const clock = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

function subscribeToClock(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

// Renders "[placeholder]" segments with the site's highlight so senders see what to fill in.
function Draft({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        part.startsWith("[") ? (
          <mark key={i} className="highlight">
            {part.slice(1, -1)}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function ContactComposer({ email }: { email: string }) {
  const [topic, setTopic] = useState(0);
  const [copied, setCopied] = useState(false);
  const time = useSyncExternalStore(
    subscribeToClock,
    () => clock.format(new Date()),
    () => "",
  );
  const current = TOPICS[topic];
  const gmail = `https://mail.google.com/mail/?${new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
    su: current.subject,
    body: current.body,
  })}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-[4px] border border-line-strong bg-paper-2 shadow-[8px_8px_0_0_var(--color-paper-3),8px_8px_0_1px_var(--color-line)] sm:shadow-[12px_12px_0_0_var(--color-paper-3),12px_12px_0_1px_var(--color-line)]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <p className="text-sm font-medium text-ink">New message</p>
        <p className="text-xs text-ink-3 tabular-nums">
          {time ? `${time} in Pune` : "Pune, India"}
        </p>
      </div>

      <dl className="text-sm">
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 sm:px-5">
          <dt className="w-14 shrink-0 text-ink-3">To</dt>
          <dd className="min-w-0 flex-1 truncate text-ink">{email}</dd>
          <dd>
            <button
              type="button"
              onClick={copyEmail}
              className="cursor-pointer rounded-[3px] border border-line px-2 py-1 text-xs text-ink-2 transition-colors hover:border-line-strong hover:bg-paper"
            >
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </dd>
        </div>
        <div className="flex items-baseline gap-3 border-b border-line px-4 py-2.5 sm:px-5">
          <dt className="w-14 shrink-0 text-ink-3">Subject</dt>
          <dd className="min-w-0 flex-1 text-ink">
            <Draft text={current.subject} />
          </dd>
        </div>
      </dl>

      <div className="px-4 pt-4 pb-5 sm:px-5 sm:pt-5">
        <p id="contact-topic-label" className="text-sm text-ink-3">
          What&apos;s this about?
        </p>
        <div
          role="group"
          aria-labelledby="contact-topic-label"
          className="mt-2.5 flex flex-wrap gap-2"
        >
          {TOPICS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={i === topic}
              onClick={() => setTopic(i)}
              className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors duration-200 motion-reduce:transition-none ${
                i === topic
                  ? "border-brass bg-brass-soft/60 text-ink"
                  : "border-line text-ink-2 hover:border-line-strong hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-5 min-h-[8.5rem] font-display text-[1.0625rem] leading-relaxed whitespace-pre-line text-ink sm:text-lg">
          <Draft text={current.body} />
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.15em] bg-ink animate-[caret-blink_1.1s_steps(1)_infinite] motion-reduce:animate-none"
          />
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-xs text-ink-3">
            Opens a Gmail draft in a new tab. Edit it before sending.
          </p>
          <a
            href={gmail}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-button portfolio-button-primary group"
          >
            Open in Gmail
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </a>
        </div>
      </div>
    </div>
  );
}
