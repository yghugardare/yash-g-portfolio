"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./ai-code-review-diagram.module.css";

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const examples = [
  {
    kind: "local",
    change: "Profile button colour",
    connection: "Shown on",
    pages: ["Profile"],
    consequence: "A colour mistake stays on this page.",
    review: "Check the look and read the small change.",
  },
  {
    kind: "shared",
    change: "Shared login function",
    connection: "Used by",
    pages: ["Account", "Orders", "Checkout"],
    consequence: "A login bug can block all three.",
    review: "Read the login code and test each flow.",
  },
];

export function AiCodeReviewDiagram() {
  const figure = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (figure.current) observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figure} className={styles.diagram} aria-label="What could break if this change is wrong?" data-paused={paused || !visible || reducedMotion}>
      <figcaption className={styles.caption}>What could break if this change is wrong?</figcaption>
      <div className={styles.comparison}>
        {examples.map((example) => (
          <div key={example.kind} className={styles.example} data-kind={example.kind}>
            <span className={styles.label}>Code being changed</span>
            <h4 className={styles.change}>{example.change}</h4>
            <div className={styles.connection}>
              <span className={styles.arrow} aria-hidden="true"><i /></span>
              <span>{example.connection}</span>
            </div>
            <ul className={styles.pages} aria-label={`${example.change}: affected pages`}>
              {example.pages.map((page) => <li key={page}>{page}</li>)}
            </ul>
            <p className={styles.consequence}>{example.consequence}</p>
            <div className={styles.review}>
              <span className={styles.label}>How I review it</span>
              <p>{example.review}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p>More potential harm means more review.</p>
        {!reducedMotion && (
          <button type="button" aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>{paused ? "Play animation" : "Pause animation"}
          </button>
        )}
      </div>
    </figure>
  );
}

export function FeatureGateDiagram() {
  const [enabled, setEnabled] = useState(false);

  return (
    <figure className={styles.diagram} aria-label="Example: switch between search versions" data-enabled={enabled}>
      <figcaption className={styles.caption}>Try the search feature flag.</figcaption>
      <div className={styles.flagDemo}>
        <div className={styles.flagControl}>
          <span className={styles.label}>Example setting: use new search</span>
          <button type="button" role="switch" aria-label="Use new search in this example" aria-checked={enabled} className={styles.switch} onClick={() => setEnabled((current) => !current)}>
            <span className={styles.track} aria-hidden="true"><span /></span>
            <span>{enabled ? "On" : "Off"}</span>
          </button>
        </div>
        <div className={styles.searchVersions}>
          <div className={styles.version} data-active={!enabled}>
            <span className={styles.label}>Flag off</span>
            <h4>Existing search</h4>
          </div>
          <div className={styles.version} data-active={enabled}>
            <span className={styles.label}>Flag on</span>
            <h4>New search</h4>
          </div>
        </div>
        <p className={styles.result} aria-live="polite">Users see the <strong>{enabled ? "new search" : "existing search"}</strong>.</p>
        <p className={styles.hint}>Both versions are deployed. The flag chooses one.</p>
      </div>
    </figure>
  );
}
