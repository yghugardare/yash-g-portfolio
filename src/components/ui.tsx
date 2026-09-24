import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  tone?: "ink" | "brass" | "paper";
};

/** Text link with a trailing arrow that nudges on hover. */
export function ArrowLink({
  children,
  tone = "ink",
  className = "",
  ...props
}: ArrowLinkProps) {
  const color =
    tone === "brass"
      ? "text-brass-deep hover:text-brass"
      : tone === "paper"
        ? "text-plate-text hover:text-white"
        : "text-ink hover:text-brass-deep";
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${color} ${className}`}
    >
      <span className="link-rule">{children}</span>
      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1.5 8h12M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "outline";
};

export function ButtonLink({
  variant = "solid",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98]";
  const styles =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-brass-deep"
      : "border border-line-strong text-ink hover:border-ink hover:bg-paper-2";
  return (
    <Link {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-paper-2/60 px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-wide text-ink-2">
      {children}
    </li>
  );
}

/** Renders `**emphasis**` and `==highlight==` markers from data strings. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.+?\*\*|==.+?==)/g).map((part, i) => {
        if (part.startsWith("**"))
          return (
            <strong key={i} className="font-medium text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        if (part.startsWith("=="))
          return (
            <mark key={i} className="highlight">
              {part.slice(2, -2)}
            </mark>
          );
        return part;
      })}
    </>
  );
}
