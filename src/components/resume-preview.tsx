"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, PDFDocumentLoadingTask, RenderTask } from "pdfjs-dist";
import { profile } from "@/data/profile";

function ResumePage({ pdf, number, width }: { pdf: PDFDocumentProxy; number: number; width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    let render: RenderTask | undefined;
    async function draw() {
      const page = await pdf.getPage(number);
      if (disposed || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(viewport.width * pixelRatio);
      canvas.height = Math.ceil(viewport.height * pixelRatio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      render = page.render({ canvas, viewport, transform: [pixelRatio, 0, 0, pixelRatio, 0, 0] });
      await render.promise;
      const content = await page.getTextContent();
      if (!disposed) setText(content.items.map((item) => "str" in item ? item.str : "").join(" "));
    }
    void draw().catch(() => { if (!disposed) setError(true); });
    return () => { disposed = true; render?.cancel(); };
  }, [pdf, number, width]);

  return (
    <figure className="resume-page">
      {error ? <p role="alert" className="p-6">This page couldn&apos;t be rendered. Use the PDF link below to read it.</p> : <canvas ref={canvasRef} aria-hidden="true" />}
      <figcaption className="sr-only">Page {number} of {pdf.numPages}. {text}</figcaption>
    </figure>
  );
}

export function ResumePreview() {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let task: PDFDocumentLoadingTask | undefined;
    async function load() {
      // Loaded only when the preview is opened; the worker is served by this site.
      const pdfjs = await import("pdfjs-dist");
      if (disposed) return;
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      task = pdfjs.getDocument({ url: profile.resumeUrl });
      const document = await task.promise;
      if (!disposed) setPdf(document);
    }
    void load().catch(() => { if (!disposed) setError(true); });
    return () => { disposed = true; void task?.destroy(); };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width - 32)));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="resume-viewer">
      <div className="resume-zoom">
        <span className="text-xs text-ink-2" role="status">{error ? "Preview unavailable" : pdf ? `${pdf.numPages} ${pdf.numPages === 1 ? "page" : "pages"}` : "Loading résumé…"}</span>
        <div className="flex items-center gap-2">
          <button type="button" className="icon-button" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((value) => Math.max(1, value - 0.25))}>−</button>
          <button type="button" className="min-h-9 min-w-14 text-xs" aria-label="Fit résumé to width" onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button>
          <button type="button" className="icon-button" aria-label="Zoom in" disabled={zoom >= 2} onClick={() => setZoom((value) => Math.min(2, value + 0.25))}>+</button>
        </div>
      </div>
      <div ref={containerRef} className="resume-pages" tabIndex={0} role="region" aria-label="Résumé pages. Scroll to read.">
        {error && <p className="p-8 text-center text-sm text-ink-2">The preview couldn&apos;t load. You can still open or download the PDF below.</p>}
        {pdf && width > 0 && <div className="resume-pages-inner">{Array.from({ length: pdf.numPages }, (_, index) => <ResumePage key={index} pdf={pdf} number={index + 1} width={Math.min(width, 860) * zoom} />)}</div>}
      </div>
    </div>
  );
}
