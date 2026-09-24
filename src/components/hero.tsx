import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Arrow } from "@/components/ui";
import { ResumeButton } from "@/components/resume-button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x hero">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            <span className="block">{profile.headline.lead}</span>
            <span className="block">{profile.headline.middle}</span>
            <em className="block text-brass-deep">{profile.headline.emphasis}</em>
          </h1>
          <p className="hero-intro">
            {profile.intro.split(/(2\+ years)/g).map((part, index) =>
              index % 2 ? <span key={index} className="hero-highlight">{part}</span> : part,
            )}
          </p>
          <div className="hero-actions">
            <Link href="/#work" className="portfolio-button portfolio-button-primary group">
              View my work
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
            <ResumeButton className="portfolio-button portfolio-button-secondary">View résumé</ResumeButton>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="hero-portrait-frame">
            <Image src={profile.photo.src} alt={profile.photo.alt} width={profile.photo.width} height={profile.photo.height} sizes="(min-width: 1024px) 300px, 56px" preload className="block h-auto w-full rounded-[2px] bg-paper-3" />
          </div>
          <figcaption className="hero-caption">
            <span className="font-display text-lg text-ink">{profile.name}</span>
            <span className="text-xs leading-relaxed text-ink-3">Building web, mobile &amp; AI products</span>
          </figcaption>
        </figure>
      </div>
      <aside className="hero-next" aria-labelledby="opportunities-title">
        <h2 id="opportunities-title" className="hero-next-heading">Open to opportunities</h2>
        <p className="hero-next-description">
          {profile.seeking.split(/(full-stack|product engineering|forward-deployed engineering)/g).map((part, index) =>
            index % 2 ? <span key={index} className="hero-highlight hero-role">{part}</span> : part,
          )}
        </p>
        <Link href="/#contact" className="hero-next-link group">
          Let&apos;s talk
          <span className="hero-next-arrow" aria-hidden="true">
            <Arrow className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0 motion-reduce:transform-none" />
          </span>
        </Link>
      </aside>
    </section>
  );
}
