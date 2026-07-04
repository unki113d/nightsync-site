import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "NightSync Studio, we make games worth staying up for";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const mascot = await readFile(
    path.join(process.cwd(), "public", "night-sync-cat.png"),
  );
  const mascotDataUrl = `data:image/png;base64,${mascot.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px 84px",
        background: "#040404",
        color: "#f2f4f7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
        <div style={{ fontSize: 28, color: "#91a9d0", marginBottom: 42 }}>
          NightSync Studio
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.05em" }}>
          We make games worth staying up for.
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={mascotDataUrl}
        width={300}
        height={300}
        style={{ borderRadius: 24 }}
      />
    </div>,
    size,
  );
}
