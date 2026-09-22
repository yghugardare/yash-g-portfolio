import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x py-24 sm:py-32">
      <p className="eyebrow">
        <span className="text-brass">404</span>
        <span aria-hidden="true" className="mx-2 text-line-strong">
          /
        </span>
        Not found
      </p>
      <h1 className="mt-5 max-w-2xl text-[2.4rem] leading-[1.02] font-normal sm:text-[3.4rem]">
        That page isn&apos;t here — or{" "}
        <em className="text-brass-deep italic">isn&apos;t here yet</em>.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
        The link may be out of date. Everything on this site is reachable from
        the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-sm text-ink hover:border-ink"
        >
          See the work
        </Link>
      </div>
    </section>
  );
}
