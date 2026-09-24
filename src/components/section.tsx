import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  title: ReactNode;
  deck?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  label,
  title,
  deck,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 border-t border-line py-16 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="container-x">
        <header className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3" data-reveal>
            <p className="flex items-center gap-3 text-sm font-medium text-ink-3 lg:mt-3">
              <span aria-hidden="true" className="h-px w-6 bg-brass" />
              {label}
            </p>
          </div>
          <div className="lg:col-span-9" data-reveal>
            <h2
              id={`${id}-title`}
              className="max-w-3xl text-[2rem] leading-[1.05] font-normal sm:text-[2.5rem] lg:text-[3rem]"
            >
              {title}
            </h2>
            {deck ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
                {deck}
              </p>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
