import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Leonid Tots — Software Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          gap: 0,
        }}
      >
        <div
          style={{
            color: "#52525b",
            fontSize: 16,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          portfolio
        </div>
        <div
          style={{
            color: "#f4f4f5",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          Leonid Tots
        </div>
        <div
          style={{
            color: "#71717a",
            fontSize: 28,
            marginTop: 20,
            letterSpacing: 1,
          }}
        >
          Software Developer
        </div>
        <div
          style={{
            color: "#27272a",
            fontSize: 16,
            marginTop: 48,
            letterSpacing: 3,
          }}
        >
          leonidtots.dev
        </div>
      </div>
    ),
    size,
  );
}
