"use client";
import React from "react";
import { Icon } from "../app/icons";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      padding:"48px 0 72px",
      borderTop:"1px solid var(--rule)",
      position:"relative", zIndex: 2,
    }}>
      <div className="container" style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        gap: 24, flexWrap:"wrap",
      }}>
        <div className="mono" style={{fontSize:11, color:"var(--ink-faint)", letterSpacing:"0.12em"}}>
          © {year} · GUSTAVO MENANI · SÃO PAULO, BR
        </div>
        <div className="mono" style={{fontSize:11, color:"var(--ink-faint)", letterSpacing:"0.12em"}}>
          Construído com cuidado · React · HTML · CSS
        </div>
      </div>
    </footer>
  );
}


