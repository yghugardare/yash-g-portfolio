// Temporary review helper: scrolls each page so reveal animations complete, then captures full-page shots.
const { chromium } = require("playwright");
const path = require("path");

const base = process.env.BASE || "http://localhost:3210";
const out = process.env.OUT || "/tmp/shots";
const targets = [
  { name: "home", path: "/" },
  { name: "case", path: "/work/course-marketing-platform" },
];
const viewports = [
  { name: "m360", width: 360, height: 780 },
  { name: "m390", width: 390, height: 844 },
  { name: "d1440", width: 1440, height: 900 },
];

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const t of targets) {
      await page.goto(base + t.path, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        const step = Math.max(200, window.innerHeight / 2);
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await page.waitForTimeout(900);
      const info = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      console.log(vp.name, t.name, info);
      await page.screenshot({
        path: path.join(out, `${vp.name}-${t.name}.png`),
        fullPage: true,
      });
      // Also emit viewport-sized segments so tall pages can be reviewed at readable scale.
      const segH = vp.width < 600 ? 1400 : 1000;
      for (let y = 0, i = 0; y < info.height; y += segH, i++) {
        await page.screenshot({
          path: path.join(
            out,
            `${vp.name}-${t.name}-${String(i).padStart(2, "0")}.png`,
          ),
          fullPage: true,
          clip: {
            x: 0,
            y,
            width: vp.width,
            height: Math.min(segH, info.height - y),
          },
        });
      }
    }
    await ctx.close();
  }
  await browser.close();
})();
