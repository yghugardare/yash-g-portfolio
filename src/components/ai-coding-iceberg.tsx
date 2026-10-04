"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import styles from "./ai-coding-iceberg.module.css";

const layers = [
  { label: "prompts", hint: "the tip", position: 16 },
  { label: "context engineering", hint: "what the model sees", position: 40 },
  { label: "specs & decisions", hint: "written before code", position: 51 },
  { label: "planning & architecture", hint: "the senior skill", position: 62 },
  { label: "verification & review", hint: "a second pair of eyes", position: 73 },
  { label: "memory across sessions", hint: "nothing is lost", position: 84 },
];

const particles = [
  { left: "40%", size: 5, delay: "0s", duration: "8s" },
  { left: "53%", size: 3, delay: "2.6s", duration: "9s" },
  { left: "46%", size: 4, delay: "4.2s", duration: "7.5s" },
  { left: "59%", size: 2, delay: "1.3s", duration: "10s" },
];

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AiCodingIceberg() {
  const id = useId();
  const scene = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => true,
  );
  const motionPaused = paused || interacting || reducedMotion || !visible;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (scene.current) observer.observe(scene.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (motionPaused) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % layers.length),
      2800,
    );
    return () => window.clearInterval(timer);
  }, [motionPaused]);

  return (
    <figure className={styles.figure} aria-label="The AI coding iceberg">
      <div ref={scene} className={styles.scene} data-paused={motionPaused}>
        <div className={styles.sky} aria-hidden="true" />
        <div className={styles.water} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />
        {particles.map((particle) => (
          <span
            key={particle.left}
            className={styles.particle}
            aria-hidden="true"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}

        <div className={styles.berg} aria-hidden="true">
          <svg viewBox="0 0 560 470" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`${id}-tip`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--ice-tip-top)" />
                <stop offset="1" stopColor="var(--ice-tip-bottom)" />
              </linearGradient>
              <linearGradient id={`${id}-depth`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--ice-depth-top)" />
                <stop offset="0.45" stopColor="var(--ice-depth-middle)" />
                <stop offset="1" stopColor="var(--ice-depth-bottom)" />
              </linearGradient>
            </defs>
            <polygon
              points="196,146 234,84 262,102 292,52 328,98 356,146"
              fill={`url(#${id}-tip)`}
              stroke="var(--ice-edge)"
              strokeWidth="0.6"
            />
            <polygon
              points="196,146 356,146 402,206 416,286 372,368 296,428 214,398 158,312 168,214"
              fill={`url(#${id}-depth)`}
              stroke="var(--ice-edge)"
              strokeWidth="1"
            />
            <polygon
              points="240,146 330,146 352,220 318,320 262,348 222,268"
              fill="var(--ice-facet)"
            />
          </svg>
        </div>

        <div className={styles.waterline} aria-hidden="true" />
        <div
          className={styles.scanline}
          style={{ top: `${layers[active].position}%` }}
          aria-hidden="true"
        />

        <div className={`${styles.percentage} ${styles.above}`}>
          <strong>15%</strong>
          <span>what everyone<br />sees</span>
        </div>
        <div className={`${styles.percentage} ${styles.below}`}>
          <strong>85%</strong>
          <span>what sinks your<br />codebase</span>
        </div>

        <div
          role="group"
          aria-label="Explore the layers of AI coding"
          onMouseLeave={() => setInteracting(false)}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setInteracting(false);
            }
          }}
        >
          {layers.map((layer, index) => (
            <button
              key={layer.label}
              type="button"
              className={styles.layer}
              style={{ top: `${layer.position}%` }}
              aria-label={`${layer.label}: ${layer.hint}`}
              aria-pressed={active === index}
              onMouseEnter={() => {
                setInteracting(true);
                setActive(index);
              }}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className={styles.tick} aria-hidden="true" />
              <span className={styles.layerText}>
                <span className={styles.label}>{layer.label}</span>
                <span className={styles.hint} aria-hidden={active !== index}>
                  {layer.hint}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <figcaption className={styles.caption}>
        <p>
          An illustrative 15/85 split.
        </p>
        <button
          type="button"
          className={styles.motionControl}
          aria-label={paused ? "Resume iceberg animation" : "Pause iceberg animation"}
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {paused ? (
              <path d="m5 3 7 5-7 5V3Z" fill="currentColor" />
            ) : (
              <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
          {paused ? "Play" : "Pause"}
        </button>
      </figcaption>
    </figure>
  );
}
