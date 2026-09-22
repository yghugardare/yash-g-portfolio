import Link from "next/link";
import { profile } from "@/data/profile";
import { navItems } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper-2/50">
      <div className="container-x flex flex-col gap-6 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. {profile.location}.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-rule transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-rule transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
