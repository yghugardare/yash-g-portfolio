import { AiCodeReviewDiagram, FeatureGateDiagram } from "@/components/ai-code-review-diagram";

export function AiCodeReviewSection() {
  return (
    <section
      aria-labelledby="review-title"
      className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Reviewing AI code</p>
        <span className="font-mono text-xs text-ink-3">3–4 min read</span>
      </div>
      <h2 id="review-title" className="mt-4 max-w-3xl text-3xl leading-tight sm:text-[2.5rem]">
        How I review AI code.
      </h2>
      <div className="mt-6 max-w-3xl text-base leading-[1.85] text-ink-2 sm:text-[1.0625rem]">
        <p>
          I want the speed of AI coding without leaving a codebase I can&apos;t
          maintain. Here&apos;s how I decide what needs a close read and what
          evidence I need before accepting a change.
        </p>

        <div className="mt-8">
          <h3 className="text-2xl leading-tight text-ink">1. Ask what else could break.</h3>
          <p className="mt-3">
            Before reviewing a change, I ask: if this code is wrong, what else
            could break? That possible damage is its <mark className="highlight">blast radius</mark>.
          </p>
          <p className="mt-3">
            A wrong button colour on the profile page stays on that page. I
            check how it looks and read the small change. A broken login function
            could stop people accessing their account, orders, and checkout.
            I read that shared code closely and test all three flows.
          </p>
          <p className="mt-3">
            I spend more review time where a bug could do more harm. Payments,
            private data, and deleted records need extra care too, even if only
            one file changes.
          </p>
        </div>

        <div className="mt-6"><AiCodeReviewDiagram /></div>

        <div className="mt-8">
          <h3 className="text-2xl leading-tight text-ink">2. Keep a switch back to the old behaviour.</h3>
          <p className="mt-3">
            Say I&apos;m building a new search page. A <mark className="highlight">feature gate</mark>,
            also called a feature flag, is a setting that chooses which version
            users see: off means the existing search; on means the new one.
          </p>
          <p className="mt-3">
            I put both versions on the server, then enable the new one for a
            small group. The code is deployed, but I haven&apos;t released the
            feature to everyone. If it fails, I turn the flag off and users get
            the old search while I fix it.
          </p>
          <p className="mt-3">
            I test both paths before release. The switch changes what runs next;
            it cannot undo data already changed or deleted.
          </p>
          <div className="mt-6"><FeatureGateDiagram /></div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl leading-tight text-ink">3. Demand proof, not just diffs.</h3>
          <p className="mt-3">
            A diff shows which lines changed. A pull request (PR) should also
            include evidence that the change works:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong className="font-medium text-ink">Visual evidence:</strong> screenshots or recordings for UI changes.</li>
            <li><strong className="font-medium text-ink">Meaningful tests:</strong> empty inputs, duplicate clicks, and failed requests.</li>
            <li><strong className="font-medium text-ink">Runtime evidence:</strong> logs showing what happened when the code ran.</li>
          </ul>
          <p className="mt-3">
            I inspect the evidence and what the tests check. A mocked response
            helps test a scenario; it doesn&apos;t prove the real service worked.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl leading-tight text-ink">4. Use an adversarial reviewer.</h3>
          <p className="mt-3">
            <mark className="highlight">Adversarial</mark> means deliberately
            looking for ways the code can fail. I use a fresh agent with the
            requirements, changed files, and relevant project context, without
            the builder&apos;s conversation. I check its findings and rerun
            tests after fixes. The PR summary stays short: what changed, evidence,
            and known risks. Formatters, linters, and type checkers handle
            routine checks so I can focus on behaviour.
          </p>
        </div>

        <div className="mt-8">
          <h3 id="review-launch-title" className="text-2xl leading-tight text-ink">5. Separate merge-ready from launch-ready.</h3>
          <p className="mt-3">
            Merge-ready means it passes the checks for joining the codebase.
            Launch-ready means it has been tested and polished enough for users
            to rely on it.
          </p>
          <p className="mt-3">
            I keep the <mark className="highlight">80/20 idea</mark> in mind
            when reviewing an AI-built feature, and leave time to finish what
            the first demo hasn&apos;t covered.
          </p>
          <h4 className="mt-6 text-xl leading-tight text-ink">Finish what the demo leaves out.</h4>
          <p className="mt-3">
            I call a feature &ldquo;80% done&rdquo; when its main use works,
            but it still needs checks before I can trust it with real users.
            Take a checkout:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong className="font-medium text-ink">Already working:</strong> I can add an item, pay, and see an order confirmation.</li>
            <li><strong className="font-medium text-ink">Still to check:</strong> A failed payment should show an error. Clicking Pay twice should create only one order. A dropped connection should allow a retry without charging twice.</li>
          </ul>
          <p className="mt-3">
            Handling those situations safely is the &ldquo;last 20%.&rdquo;
            The percentages are approximate, not a count of code or time.
            This finishing work can take as long as building the demo.
          </p>
          <p className="mt-3">
            After those checks, I start with a <mark className="highlight">canary rollout</mark>.
            That means releasing to a small group and watching for problems
            before expanding it.
          </p>
          <p className="mt-3">
            Once both search versions work reliably, I use <mark className="highlight">A/B testing</mark>
            {" "}to decide whether the new search is worth releasing more widely.
          </p>
          <h4 className="mt-6 text-xl leading-tight text-ink">Compare both versions against the same goal.</h4>
          <p className="mt-3">
            In an A/B test, I randomly show the existing search (A) to one group
            and the new search (B) to another, at the same time. I choose one
            measure for both: how many users open a search result.
          </p>
          <div className="mt-4 overflow-hidden rounded border border-line">
            <table className="w-full border-collapse text-left text-sm leading-relaxed">
              <caption className="border-b border-line bg-paper-2 px-4 py-3 text-left font-medium text-ink">Made-up results: 1,000 users per group</caption>
              <thead>
                <tr className="border-b border-line text-ink">
                  <th scope="col" className="px-4 py-3 font-medium">Search version</th>
                  <th scope="col" className="px-4 py-3 font-medium">Opened a result</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <th scope="row" className="px-4 py-3 font-normal">Existing (A)</th>
                  <td className="px-4 py-3">600 users (60%)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-normal">New (B)</th>
                  <td className="px-4 py-3">700 users (70%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            B looks promising because more users reached the same goal. A few
            lucky visits can make one version look better, so I need enough
            results to check that the difference is real rather than chance.
            I also check for new errors before keeping B. The code still needs
            its own review and tests.
          </p>
        </div>

        <div className="mt-8 border-l-2 border-brass pl-5">
          <h3 className="text-xl leading-tight text-ink">My daily checklist</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Know what else the change could affect.</li>
            <li>Know how to undo it.</li>
            <li>Check the tests, visuals, and runtime evidence.</li>
            <li>Get an independent review and resolve findings.</li>
            <li>Try the finished feature before releasing it.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
