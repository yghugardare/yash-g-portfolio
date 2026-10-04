"use client";

import { useEffect } from "react";
import { navItems } from "@/data/site";

const sectionHashes = new Set(navItems.map(({ href }) => `#${href.split("#")[1]}`));

export function HashNavigation() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest("a[href]");
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute("download") ||
        (link.target && link.target.toLowerCase() !== "_self")
      ) {
        return;
      }

      let destination: URL;
      try {
        destination = new URL(link.href);
      } catch {
        return;
      }
      const current = window.location;
      if (
        destination.origin !== current.origin ||
        destination.pathname !== "/" ||
        destination.pathname !== current.pathname ||
        destination.search !== current.search ||
        !sectionHashes.has(destination.hash) ||
        destination.hash !== current.hash
      ) {
        return;
      }

      let id: string;
      try {
        id = decodeURIComponent(destination.hash.slice(1));
      } catch {
        return;
      }
      const section = document.getElementById(id);
      if (!section) return;

      // Next.js skips navigation to the current URL. Restore the anchor scroll
      // before its click handler runs, while still letting mobile menus close.
      event.preventDefault();
      section.scrollIntoView({ block: "start" });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
