import { ImageResponse } from "next/og";

export const alt = "Dou Qi Realm Scanner — Battle Through the Heavens";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 50% 0%, #1b1440 0%, #050816 70%)",
          color: "white",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            color: "#FFD700",
            textTransform: "uppercase",
          }}
        >
          Battle Through the Heavens
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            marginTop: 12,
            color: "#FFD700",
          }}
        >
          Dou Qi Realm Scanner
        </div>
        <div style={{ fontSize: 34, marginTop: 18, color: "#94A3B8" }}>
          Discover your destiny in the world of cultivation.
        </div>
      </div>
    ),
    { ...size },
  );
}
