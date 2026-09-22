const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("console", (m) => console.log("console:", m.text()));
  page.on("pageerror", (e) => console.log("pageerror:", e.message));
  await page.goto("http://localhost:3210/", { waitUntil: "networkidle" });
  const before = await page.evaluate(() => ({
    js: document.documentElement.classList.contains("js"),
    total: document.querySelectorAll("[data-reveal]").length,
    visible: document.querySelectorAll("[data-reveal].is-visible").length,
    bodyScrollHeight: document.body.scrollHeight,
    docScrollHeight: document.documentElement.scrollHeight,
  }));
  console.log("before", before);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
  });
  await page.waitForTimeout(800);
  const after = await page.evaluate(() => ({
    scrollY: window.scrollY,
    visible: document.querySelectorAll("[data-reveal].is-visible").length,
    hidden: Array.from(
      document.querySelectorAll("[data-reveal]:not(.is-visible)"),
    )
      .slice(0, 5)
      .map(
        (el) =>
          el.tagName + "." + el.className.split(" ").slice(0, 3).join("."),
      ),
  }));
  console.log("after", after);
  await browser.close();
})();
