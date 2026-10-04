"use client";

import { useEffect, useRef } from "react";

/** Strikes through `from` and reveals `to` once the phrase scrolls into view. */
export function StrikeSwap({ from, to }: { from: string; to: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        observer.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="strike-swap">
      <span aria-hidden="true" className="strike-old">
        {from}
        <svg
          className="strike-line"
          viewBox="0 0 130 10"
          preserveAspectRatio="none"
        >
          <path d="M3 6.8C22 3 41 8.6 64 5.2S108 2.8 127 5.6" pathLength={1} />
        </svg>
      </span>{" "}
      <em className="strike-new">{to}</em>
    </span>
  );
}
