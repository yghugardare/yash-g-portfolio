import Image from "next/image";
import styles from "./ai-coding-meme.module.css";

// Original blank template: https://imgflip.com/memetemplate/Drake-Hotline-Bling
// The source stays unchanged; each reaction is framed by its container.
const template = "/images/blog/drake-hotline-bling-template.jpg";

export function AiCodingMeme() {
  return (
    <figure className={styles.meme} aria-label="AI coding: do and don't">
      <figcaption className="sr-only">My AI coding workflow, in meme form.</figcaption>
      <div className={styles.row}>
        <div className={styles.reaction}>
          <div className={styles.frame}>
            <Image
              src={template}
              alt="Drake turns away in disapproval."
              width={1200}
              height={1200}
              sizes="(max-width: 640px) 80vw, 360px"
              loading="eager"
              className={`${styles.photo} ${styles.reject}`}
            />
          </div>
        </div>
        <div className={styles.copy}>
          <p className={styles.kicker}>Don&apos;t</p>
          <p className={styles.label}>Just prompt and ship.</p>
          <p className={styles.support}>Skip the context, plan, and review.</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.reaction}>
          <div className={styles.frame}>
            <Image
              src={template}
              alt="Drake smiles and points in approval."
              width={1200}
              height={1200}
              sizes="(max-width: 640px) 80vw, 360px"
              loading="eager"
              className={`${styles.photo} ${styles.approve}`}
            />
          </div>
        </div>
        <div className={styles.copy}>
          <p className={`${styles.kicker} ${styles.do}`}>Do</p>
          <p className={styles.label}>Give AI a workflow.</p>
          <ul className={styles.list}>
            <li>Context engineering</li>
            <li>Agent skills + agentic workflows</li>
            <li>Planning + code review</li>
          </ul>
        </div>
      </div>
    </figure>
  );
}
