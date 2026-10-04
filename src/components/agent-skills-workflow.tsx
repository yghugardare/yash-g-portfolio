"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { skillWorkflows, type SkillScene } from "@/data/skill-workflows";
import styles from "./agent-skills-workflow.module.css";

const STAGE_DURATION = 6500;

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Lines({ numbered = false }: { numbered?: boolean }) {
  return (
    <div className={styles.lines}>
      {[85, 65, 75, 45].map((width, index) => (
        <div key={index} className={styles.lineRow}>
          {numbered && <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>}
          <span className={styles.lineTrack} style={{ width: `${width}%` }}>
            <span style={{ animationDelay: `${index * 0.3}s` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

function SceneCard({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className={styles.card}><p className={styles.sceneLabel}>{label}</p>{children}</div>;
}

function WorkflowScene({ scene }: { scene: SkillScene }) {
  switch (scene) {
    case "scope":
      return <SceneCard label="SPEC → SMALL SLICES"><Lines numbered /></SceneCard>;
    case "audit":
      return <SceneCard label="READING THE REPOSITORY"><span className={styles.scan} /><Lines /><span className={styles.chip}>AGENTS.md · grounded in code</span></SceneCard>;
    case "architect":
      return (
        <div className={styles.choices}>
          <div className={styles.choiceRow}>
            <div className={`${styles.node} ${styles.selectedNode}`}>Postgres<small>chosen for this project</small><span className={styles.tick}>✓</span></div>
            <div className={`${styles.node} ${styles.mutedNode}`}>SQLite<small>alternative considered</small></div>
          </div>
          <span className={styles.chip}>→ docs/specs/data.md</span>
        </div>
      );
    case "develop":
    case "prototype":
      return (
        <div className={`${styles.card} ${styles.appWindow}`}>
          <div className={styles.windowBar}><i /><i /><i /><span>{scene === "prototype" ? "one question · experiment" : "one slice · working app"}</span></div>
          <div className={styles.appBody}>
            <div className={styles.sidebar}><span /><span /><span /><span /></div>
            <div className={styles.appContent}><span /><span /><span className={styles.appFeature} /></div>
          </div>
          {scene === "prototype" && <span className={styles.prototypeTag}>learn → decide → build</span>}
        </div>
      );
    case "check":
      return (
        <SceneCard label="SPEC ↔ ACTUAL BEHAVIOUR">
          <div className={styles.checks}>
            {["The feature runs", "Failure cases handled", "Diff matches the plan"].map((text, index) => <div key={text}><span style={{ animationDelay: `${index * 0.45}s` }}>✓</span>{text}</div>)}
          </div>
        </SceneCard>
      );
    case "test":
      return <SceneCard label="TEST SUITE · RUNNING"><div className={styles.testGrid}>{Array.from({ length: 12 }, (_, index) => <span key={index} style={{ animationDelay: `${index * 0.12}s` }}>✓</span>)}</div><span className={styles.chip}>behaviour + failure cases</span></SceneCard>;
    case "document":
      return <SceneCard label="PR · WHAT CHANGED & WHY"><Lines /><div className={styles.documentChips}><span>changelog</span><span>release notes</span></div></SceneCard>;
    case "sync":
      return <div className={styles.sync}><div className={styles.node}>the code<small>what shipped</small></div><div className={styles.connection}><i /><i /><span>reconciled</span></div><div className={styles.node}>the files<small>what&apos;s written</small></div></div>;
    case "debug":
      return <SceneCard label="REPRODUCE → NARROW → FIX"><div className={styles.debugBlocks}>{Array.from({ length: 8 }, (_, index) => <span key={index} data-bug={index === 3} />)}<i /></div><span className={styles.chip}>cause found → fix → retest</span></SceneCard>;
    case "grill":
      return <SceneCard label="ASSUMPTIONS → DECISIONS"><div className={styles.questions}><span>What happens on failure?</span><span>Who can do this?</span><span>What are we leaving out?</span></div><span className={styles.chip}>I decide. The agent asks.</span></SceneCard>;
    case "map":
      return (
        <div className={styles.map}>
          <svg viewBox="0 0 320 210" aria-hidden="true"><path className={styles.mapPath} d="M42 166H103V106H198V48H280" /><circle cx="42" cy="166" r="6" /><circle cx="103" cy="106" r="6" /><circle cx="198" cy="48" r="6" /><circle cx="280" cy="48" r="6" /><circle className={styles.mapMarker} cx="42" cy="166" r="4" /></svg>
          <span className={styles.mapStart}>unknowns</span><span className={styles.mapEnd}>decisions settled</span><span className={styles.mapTicket}>one decision ticket</span>
        </div>
      );
    case "tdd":
      return <div className={styles.tdd}><div className={styles.tddNodes}><span>red<small>test fails</small></span><i>→</i><span>green<small>code passes</small></span><i>→</i><span>refactor<small>clean up</small></span></div><div className={styles.returnLoop}>← repeat with the next behaviour</div></div>;
  }
}

export function AgentSkillsWorkflow({ kind }: { kind: keyof typeof skillWorkflows }) {
  const workflow = skillWorkflows[kind];
  const id = useId();
  const figure = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, () => true);
  const running = visible && !paused && !focused && !reducedMotion;
  const stage = workflow.stages[active];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (figure.current) observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % workflow.stages.length), STAGE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, running, workflow.stages.length]);

  useEffect(() => {
    const tab = tabs.current[active];
    const container = tab?.parentElement;
    if (!tab || !container) return;
    const left = tab.offsetLeft;
    if (left < container.scrollLeft || left + tab.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollTo({ left: Math.max(0, left - (container.clientWidth - tab.offsetWidth) / 2), behavior: reducedMotion ? "instant" : "smooth" });
    }
  }, [active, reducedMotion]);

  function selectStage(index: number) {
    setActive(index);
    setPaused(true);
  }

  return (
    <figure
      ref={figure}
      className={styles.workflow}
      aria-label={workflow.title}
      data-paused={!running}
      style={{ "--stage-duration": `${STAGE_DURATION}ms` } as React.CSSProperties}
      onFocusCapture={(event) => {
        const role = (event.target as HTMLElement).getAttribute("role");
        setFocused(role === "tab" || role === "tabpanel");
      }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <figcaption className={styles.heading}>{workflow.title}</figcaption>
      <div className={styles.tabs} role="tablist" aria-label={`${workflow.title} stages`}>
        {workflow.stages.map((item, index) => (
          <button
            key={item.name}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => selectStage(index)}
            onKeyDown={(event) => {
              let next: number;
              if (event.key === "ArrowRight") next = (index + 1) % workflow.stages.length;
              else if (event.key === "ArrowLeft") next = (index + workflow.stages.length - 1) % workflow.stages.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = workflow.stages.length - 1;
              else return;
              event.preventDefault();
              selectStage(next);
              tabs.current[next]?.focus();
            }}
          >{item.name}</button>
        ))}
      </div>
      <div className={styles.body} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
        <div className={styles.visual} aria-hidden="true"><div className={styles.glow} /><div key={active} className={styles.scene}><WorkflowScene scene={stage.scene} /></div></div>
        <div className={styles.details}>
          <div key={active} className={styles.copy}>
            <p className={styles.stage}>Stage {String(active + 1).padStart(2, "0")} · {stage.command}</p>
            <h3>{stage.title}</h3>
            <p className={styles.description}>{stage.description}</p>
            <ul>{stage.outcomes.map((outcome) => <li key={outcome}><span aria-hidden="true">→</span>{outcome}</li>)}</ul>
          </div>
          <div className={styles.controls}>
            {!reducedMotion && <button type="button" className={styles.play} aria-label={`${paused ? "Play" : "Pause"} ${workflow.title}`} aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
              <svg key={`${active}-${running}`} className={styles.progress} viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" /><circle className={styles.progressFill} cx="22" cy="22" r="20" /></svg>
              <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 5 10 7-10 7Z" fill="currentColor" /> : <><rect x="7" y="6" width="3" height="12" rx="1" fill="currentColor" /><rect x="14" y="6" width="3" height="12" rx="1" fill="currentColor" /></>}</svg>
            </button>}
            <span>{active + 1} / {workflow.stages.length}</span>
            <span className={styles.controlHint}>{paused ? "Select a stage or press play" : "Select a stage to explore"}</span>
          </div>
        </div>
      </div>
      <p className={styles.note}>{workflow.note}</p>
    </figure>
  );
}
