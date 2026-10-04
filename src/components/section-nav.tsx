"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="mt-10 hidden lg:block">
      <p className="eyebrow">Contents</p>
      <ol className="mt-3 flex flex-col border-l border-line text-sm">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 transition-colors duration-200 motion-reduce:transition-none ${
                  current
                    ? "border-brass text-ink"
                    : "border-transparent text-ink-3 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
