import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pulls the display serif at build time; falls back to the bundled sans if the network is unavailable.
async function loadFraunces(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const match = css.match(
      /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/,
    );
    if (!match) return null;
    return await fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const fraunces = await loadFraunces();
  const display = fraunces ? "Fraunces" : "sans-serif";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#f4efe6",
        color: "#1b1d22",
        fontFamily: display,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#6f727b",
          fontFamily: "sans-serif",
        }}
      >
        <span>{profile.name}</span>
        <span>{profile.role}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -2 }}>
          {profile.headline.lead}
        </div>
        <div
          style={{
            fontSize: 84,
            lineHeight: 1.02,
            letterSpacing: -2,
            color: "#7e5618",
            fontStyle: fraunces ? "italic" : "normal",
          }}
        >
          {profile.headline.emphasis}
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -2 }}>
          {profile.headline.tail}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "2px solid #d5cdbd",
          paddingTop: 28,
          fontSize: 24,
          color: "#454851",
          fontFamily: "sans-serif",
        }}
      >
        <span>Next.js · React · TypeScript · Node.js · Capacitor</span>
        <span>{site.url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: fraunces
        ? [{ name: "Fraunces", data: fraunces, style: "normal", weight: 400 }]
        : undefined,
    },
  );
}
