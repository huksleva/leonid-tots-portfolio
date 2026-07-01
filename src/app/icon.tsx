import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: "#f4f4f5",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: -0.5,
          }}
        >
          LT
        </div>
      </div>
    ),
    size,
  );
}
