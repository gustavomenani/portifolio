import Link from "next/link";
import { Icon } from "./icons";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg)",
        textAlign: "center",
        padding: 40,
      }}
    >
      <div className="mono" style={{ fontSize: 13, color: "var(--ink-faint)", letterSpacing: "0.2em", marginBottom: 24 }}>
        ERRO 404
      </div>
      <h1 className="display" style={{ fontSize: "clamp(64px, 12vw, 120px)", fontWeight: 400, margin: 0, lineHeight: 1 }}>
        Página não
        <br />
        encontrada
      </h1>
      <p style={{ marginTop: 24, fontSize: 16, color: "var(--ink-muted)", maxWidth: 460, lineHeight: 1.6 }}>
        Parece que você acessou um caminho que não existe no meu portfólio.
      </p>

      <Link
        href="/"
        className="btn btn-primary"
        style={{
          marginTop: 48,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 24px",
          textDecoration: "none",
        }}
      >
        <Icon.ArrowLeft size={16} /> Voltar para o Início
      </Link>
    </main>
  );
}