"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../app/icons";
export default function Hero({ tagline }) {
  const [time, setTime] = React.useState(new Date());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = mounted 
    ? `${time.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })} BRT` 
    : "Carregando...";

  return (
    <section id="inicio" style={{
      position:"relative",
      minHeight: "100vh",
      display:"flex", alignItems:"center",
      padding: "180px 0 120px",
    }}>
      <div className="container" style={{width:"100%"}}>

        {/* Editorial marginalia */}
        <div className="hero-grid">

          {/* Left: meta column */}
          <aside className="hero-meta">
            <div className="reveal" style={{marginBottom: 40}}>
              <span className="eyebrow">00 — Início</span>
            </div>

            <div className="reveal reveal-d1 mono" style={{
              fontSize: 11,
              color:"var(--ink-muted)",
              letterSpacing:"0.08em",
              lineHeight: 2,
              borderTop:"1px solid var(--rule)",
              paddingTop: 16,
              marginBottom: 40,
              maxWidth: 280,
            }}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{color:"var(--ink-faint)"}}>LOC.</span>
                <span>São Paulo · BR</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{color:"var(--ink-faint)"}}>TEMP.</span>
                <span>{timeStr}</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{color:"var(--ink-faint)"}}>STACK</span>
                <span>.NET · TS · React</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{color:"var(--ink-faint)"}}>STATUS</span>
                <span style={{display:"inline-flex", alignItems:"center", gap:6, color:"var(--ink)"}}>
                  <Pulse /> Aceitando projetos
                </span>
              </div>
            </div>

            <div className="reveal reveal-d2" style={{
              fontSize: 14,
              color:"var(--ink-muted)",
              maxWidth: 300,
              lineHeight: 1.6,
            }}>
              <span className="display display-italic" style={{fontSize:18, color:"var(--ink)"}}>
                “{tagline || "Transformo processos manuais e ineficientes em sistemas fluidos e lucrativos."}”
              </span>
            </div>
          </aside>

          {/* Right: headline */}
          <div>
            <motion.h1 
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 }
                }
              }}
              className="display" style={{
              fontSize: "clamp(48px, 8.2vw, 128px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              margin: 0,
              fontWeight: 400,
            }}>
              <motion.span variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 15 } }
              }} style={{ display: "inline-block" }}>Gustavo</motion.span>
              <br/>
              <motion.span 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 15 } }
                }}
                style={{position:"relative", display:"inline-block"}}
              >
                <span className="display display-italic">Menani</span>
                <Underline />
              </motion.span>
            </motion.h1>

            <div className="reveal reveal-d3" style={{
              marginTop: 48,
              display:"flex", flexWrap:"wrap", gap: 14, alignItems:"center"
            }}>
              <a href="#projetos" className="btn btn-primary">
                Ver trabalhos recentes <Icon.ArrowRight size={14}/>
              </a>
              <a href="#sobre" className="btn btn-ghost">
                Sobre o trabalho
              </a>
              <span className="mono" style={{
                marginLeft: 8, fontSize: 11, color:"var(--ink-faint)",
                letterSpacing:"0.14em", textTransform:"uppercase"
              }}>
                Rolar ↓
              </span>
            </div>

            {/* Signature scribble */}
            <div className="reveal reveal-d4" style={{
              marginTop: 80,
              display:"flex", alignItems:"flex-end", justifyContent:"space-between",
              gap: 24, flexWrap:"wrap"
            }}>
              <Signature />
              <div className="mono" style={{
                fontSize: 11, color:"var(--ink-faint)",
                letterSpacing:"0.08em", textAlign:"right"
              }}>
                PORTFÓLIO · EDIÇÃO 2026<br/>
                <span style={{color:"var(--ink-muted)"}}>gustavomenani.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
          gap: 48px;
          align-items: start;
        }
        .hero-meta { padding-top: 8px; }
        
        @media (max-width: 860px) {
          #inicio { padding: 140px 0 80px !important; }
          .hero-grid { 
            display: flex !important; 
            flex-direction: column-reverse !important;
            gap: 56px !important; 
          }
          .hero-meta { padding-top: 0; }
        }
      `}</style>
    </section>
  );
}

function Pulse() {
  return (
    <span style={{
      width:7, height:7, borderRadius:999,
      background:"var(--accent)",
      boxShadow:"0 0 0 0 var(--accent)",
      animation:"pulse 2s infinite",
      display:"inline-block"
    }}>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--accent) 60%, transparent); }
          70% { box-shadow: 0 0 0 8px color-mix(in oklch, var(--accent) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--accent) 0%, transparent); }
        }
      `}</style>
    </span>
  );
}

function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 14"
      preserveAspectRatio="none"
      style={{
        position:"absolute",
        left: 0, right: 0, bottom: -8,
        width: "100%", height: 14,
        color:"var(--accent)",
      }}
    >
      <path
        d="M2 8 C 80 2, 180 12, 260 6 S 400 4, 418 8"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 500,
          strokeDashoffset: 500,
          animation: "draw 1.6s .8s cubic-bezier(.16,1,.3,1) forwards"
        }}
      />
      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}

function Signature() {
  return (
    <svg width="180" height="56" viewBox="0 0 180 56" fill="none" style={{color:"var(--ink-muted)"}} aria-hidden>
      <path
        d="M6 42 C 12 22, 18 12, 24 22 S 30 42, 36 32 C 40 24, 46 18, 52 28 C 56 34, 62 34, 66 26 M 74 16 C 78 22, 78 36, 74 42 C 72 46, 82 42, 88 32 C 92 26, 96 22, 102 28 C 106 32, 108 38, 114 32 C 118 28, 122 20, 128 28 S 132 40, 140 34 C 146 30, 150 22, 156 30 C 160 36, 166 34, 172 28"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: 600,
          animation: "sig 2.2s 1.2s cubic-bezier(.16,1,.3,1) forwards"
        }}
      />
      <style>{`@keyframes sig { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}


