"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1000;

// Animates the last number in a metric like "~300K", "₹6.8 Cr+" or "56 → 85+".
function parse(value: string) {
  const matches = [...value.matchAll(/\d+(?:\.\d+)?/g)];
  const last = matches.at(-1);
  if (!last || last.index === undefined) return null;
  return {
    prefix: value.slice(0, last.index),
    suffix: value.slice(last.index + last[0].length),
    from: matches.length > 1 && value.includes("→") ? Number(matches[0][0]) : 0,
    to: Number(last[0]),
    decimals: last[0].split(".")[1]?.length ?? 0,
  };
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const parts = parse(value);

  useEffect(() => {
    const el = ref.current;
    const target = parse(value);
    if (!el || !target) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setCurrent(target.from);
          return;
        }
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(Math.max((now - start) / DURATION, 0), 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(
            t < 1 ? target.from + (target.to - target.from) * eased : null,
          );
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  const display =
    parts && current !== null
      ? `${parts.prefix}${current.toFixed(parts.decimals)}${parts.suffix}`
      : value;

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <span className="sr-only">{value}</span>
      {/* Final value reserves the width so the count doesn't shift layout. */}
      <span aria-hidden="true" className="invisible">
        {value}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {display}
      </span>
    </span>
  );
}
