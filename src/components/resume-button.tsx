"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/data/profile";
import { ResumePreview } from "@/components/resume-preview";

export function ResumeButton({ className = "", children = "Preview résumé", onOpen }: {
  className?: string;
  children?: ReactNode;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} aria-haspopup="dialog" onClick={() => { onOpen?.(); setOpen(true); }}>
        {children}
        <svg aria-hidden="true" width="16" height="18" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 2H4v18h12V7l-5-5Z" /><path d="M11 2v5h5M7 11h6M7 15h6" />
        </svg>
      </button>
      {open && createPortal(<dialog ref={dialogRef} className="resume-dialog" aria-labelledby={titleId} onClose={() => setOpen(false)} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'));
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
      }}>
        <div className="resume-dialog-layout">
          <div className="resume-toolbar">
            <div>
              <h2 id={titleId} className="text-xl">Yash Ghugardare</h2>
              <p className="mt-1 text-xs text-ink-3">Résumé · Full Stack Developer</p>
            </div>
            <button type="button" className="icon-button shrink-0" aria-label="Close résumé preview" autoFocus onClick={() => dialogRef.current?.close()}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </button>
          </div>
          <ResumePreview />
          <div className="resume-toolbar resume-footer">
            <a className="text-sm text-ink-2 underline underline-offset-4" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Open in new tab</a>
            <a href={profile.resumeUrl} download className="portfolio-button portfolio-button-primary">
              Download PDF
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" /></svg>
            </a>
          </div>
        </div>
      </dialog>, document.body)}
    </>
  );
}
