"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-sm transition-[border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-14 items-center justify-between sm:h-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg leading-none tracking-tight text-ink"
          aria-label={`${profile.name} — home`}
        >
          Yash<span className="text-brass">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-rule text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex h-9 items-center rounded-full border border-line-strong px-3.5 text-sm text-ink transition-colors hover:border-ink hover:bg-paper-2"
              >
                Résumé
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ease-out-soft ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-4 bg-current transition-transform duration-300 ease-out-soft ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <nav aria-label="Primary mobile" className="container-x py-6">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className="border-b border-line last:border-b-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 text-2xl text-ink font-display"
                >
                  <span>{item.label}</span>
                  <span className="eyebrow">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-paper"
            >
              Download résumé
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-line-strong px-5 text-ink"
            >
              {profile.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
