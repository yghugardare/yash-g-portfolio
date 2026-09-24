"use client";

import { useId, useSyncExternalStore } from "react";

const PAPER = { light: "#f4efe6", dark: "#121418" };

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? PAPER.dark : PAPER.light);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // Storage can be blocked; the toggle still works for this visit.
  }
}

export function ThemeToggle() {
  const maskId = useId();
  const isDark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="icon-button text-ink-2 transition-colors hover:text-ink"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <circle
            className="theme-icon-cut"
            cx="18"
            cy="6"
            r="7"
            fill="black"
          />
        </mask>
        <circle
          className="theme-icon-core"
          cx="12"
          cy="12"
          r="8.5"
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
        <g
          className="theme-icon-rays"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.55 1.55M17.85 17.85l1.55 1.55M4.6 19.4l1.55-1.55M17.85 6.15l1.55-1.55" />
        </g>
      </svg>
    </button>
  );
}
