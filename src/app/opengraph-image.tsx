import { ImageResponse } from "next/og";

export const alt = "Gustavo Menani - Desenvolvedor Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Logo GM placeholder visual */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              border: "4px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 900,
            }}
          >
            GM
          </div>
          <span style={{ marginLeft: 30, fontSize: 32, letterSpacing: "0.2em", color: "#8a8a8a" }}>PORTFÓLIO .NET / REACT</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 400,
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            Gustavo Menani
          </h1>
          <p style={{ fontSize: 36, color: "#a4a4a4", marginTop: 24, maxWidth: "80%" }}>
            Transformando processos manuais em sistemas fluidos e lucrativos.
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}