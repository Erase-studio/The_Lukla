import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "The Lukla, a Himalayan and South Indian kitchen in Niagara Falls, NY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card people see when the site is shared: brand name, positioning line and the thali.
export default async function Image() {
  const thali = await readFile(join(process.cwd(), "public", "thali.png"));
  const thaliSrc = `data:image/png;base64,${thali.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#e6eefa",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 640 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#3b5fa6" }}>
            HIMALAYAN × SOUTH INDIAN · NIAGARA FALLS, NY
          </div>
          <div style={{ fontSize: 110, lineHeight: 1, color: "#15223d", marginTop: 28 }}>The Lukla</div>
          <div style={{ fontSize: 42, color: "#586379", marginTop: 24 }}>From the Himalayas to Niagara.</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img tags */}
        <img
          src={thaliSrc}
          alt=""
          width={447}
          height={559}
          style={{ position: "absolute", right: -30, top: 10, width: 490, height: 612 }}
        />
      </div>
    ),
    size,
  );
}
