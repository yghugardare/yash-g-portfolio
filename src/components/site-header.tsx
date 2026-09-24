"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { Arrow } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("pointerdown", onOutsideClick);
    }
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutsideClick);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  useEffect(() => {
    const sections = navItems.map(({ href }) => document.getElementById(href.split("#")[1])).filter((section): section is HTMLElement => Boolean(section));
    const onScroll = () => {
      const current = sections.filter((section) => section.getBoundingClientRect().top <= 150).at(-1);
      setActive(current ? `/#${current.id}` : "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="wordmark"
          aria-label={`${profile.name} — home`}
        >
          YG<span className="text-brass">.</span>
        </Link>
        <div className="flex items-center gap-2.5 md:gap-6 lg:gap-8">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="header-link"
                    aria-current={active === item.href ? "location" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="icon-button mobile-menu-toggle md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="m6 6 12 12M6 18 18 6" />
              ) : (
                <>
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        id={menuId}
        hidden={!open}
        className="mobile-menu md:hidden"
        onBlur={(event) => {
          if (
            event.relatedTarget &&
            !headerRef.current?.contains(event.relatedTarget as Node)
          )
            setOpen(false);
        }}
      >
        <nav aria-label="Primary mobile" className="container-x py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mobile-nav-link"
                  aria-current={active === item.href ? "location" : undefined}
                >
                  {item.label}
                  <Arrow className="h-3.5 w-3.5 text-ink-3" />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="portfolio-button portfolio-button-primary mt-5 w-full justify-between"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
            <Arrow className="h-4 w-4 -rotate-45" />
          </a>
        </nav>
      </div>
    </header>
  );
}
