import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Arrow, RichText } from "@/components/ui";
import { ResumeButton } from "@/components/resume-button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x hero">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            <span className="block">{profile.headline.lead}</span>
            <span className="block">{profile.headline.middle}</span>
            <em className="block text-brass-deep">
              {profile.headline.emphasis}
            </em>
          </h1>
          <p className="hero-intro">
            {profile.intro.split(/(2\+ years)/g).map((part, index) =>
              index % 2 ? (
                <span key={index} className="highlight">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </p>
          <div className="hero-actions">
            <Link
              href="/#work"
              className="portfolio-button portfolio-button-primary group"
            >
              View my work
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
            <ResumeButton className="portfolio-button portfolio-button-secondary">
              View résumé
            </ResumeButton>
          </div>
        </div>
        <div className="hero-aside">
          <div className="hero-portrait">
            <div className="hero-portrait-frame">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 180px, 140px"
                preload
                className="hero-portrait-image"
              />
            </div>
          </div>
          <div className="hero-status">
            <p className="hero-status-label">
              <span className="hero-status-dot" aria-hidden="true" />
              Open to new roles
            </p>
            <p className="hero-status-text">
              <RichText text={profile.seeking} />
            </p>
            <Link href="/#contact" className="hero-status-link group">
              Let&apos;s talk
              <Arrow className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0 motion-reduce:transform-none" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
