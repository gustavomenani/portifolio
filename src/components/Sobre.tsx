"use client";
import React from "react";
import { Icon } from "../app/icons";
import { motion } from "framer-motion";
export default function Sobre() {
  const highlights = [
    { num: "01", title: "Automação & Digitalização", body: "Transformo fluxos manuais baseados em planilhas em softwares funcionais, reduzindo erros operacionais." },
    { num: "02", title: "Sistemas End-to-End", body: "Crio plataformas web completas, do banco à interface, para pequenas e médias empresas." },
    { num: "03", title: "Integrações & APIs", body: "Conecto ferramentas e bases distintas para unificar as informações do negócio." },
  ];

  return (
    <section id="sobre" style={{padding: "160px 0 120px", position:"relative"}}>
      <div className="container">
        <div className="reveal" style={{marginBottom: 56}}>
          <span className="eyebrow">01 — Sobre</span>
        </div>

        <div style={{
          display:"grid", gap: 72,
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
        }} className="sobre-grid">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once:true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.h2 className="display reveal reveal-d1" variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } }
            }} style={{
              fontSize:"clamp(36px, 5vw, 64px)",
              lineHeight: 1.02,
              letterSpacing:"-0.025em",
              fontWeight: 400,
              margin:"0 0 40px",
            }}>
              Tecnologia como ponte
              <br/>
              <span className="display display-italic" style={{color:"var(--ink-muted)"}}>para o crescimento</span>
              <br/>
              do seu negócio<span style={{color:"var(--accent)"}}>.</span>
            </motion.h2>

          <motion.div variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } }
            }} style={{fontSize:16, lineHeight: 1.7, color:"var(--ink-muted)"}}>
            <p style={{margin:"0 0 18px"}}>
              Sou desenvolvedor <span style={{color:"var(--ink)"}}>Fullstack</span> movido pela resolução de problemas. O foco não é apenas entregar código — é construir ferramentas digitais de alta performance que tragam retorno real, otimizem o tempo da equipe e gerem resultado sobre o investimento.
            </p>
            <p style={{margin:"0 0 18px"}}>
              Com sólida base no ecossistema <span style={{color:"var(--ink)"}}>.NET</span> e <span style={{color:"var(--ink)"}}>JavaScript/TypeScript</span> (React, Next.js), atuo desde APIs robustas no backend até interfaces dinâmicas no frontend.
            </p>
            <p style={{margin:0, color:"var(--ink-faint)"}}>
              Entendo tanto de regras de negócio quanto de código. Se você busca um parceiro técnico que fala a sua língua, vamos conversar.
            </p>
          </motion.div>
        </motion.div>
        </div>

        {/* highlights */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once:true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          style={{
          marginTop: 96,
          display:"grid",
          gridTemplateColumns:"repeat(3, minmax(0, 1fr))",
          gap: 0,
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }} className="highlights">
          {highlights.map((h, i) => (
            <motion.div key={h.num} variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } }
            }} style={{
              padding: "36px 32px 36px 0",
              borderRight: i < highlights.length - 1 ? "1px solid var(--rule)" : "none",
              paddingLeft: i === 0 ? 0 : 32,
              position:"relative",
            }}>
              <div className="mono" style={{
                fontSize: 11, color:"var(--accent)",
                letterSpacing:"0.15em", marginBottom: 28,
              }}>
                {h.num}
              </div>
              <h3 className="display" style={{
                fontSize: 26, lineHeight: 1.15,
                margin:"0 0 14px", fontWeight: 400,
                letterSpacing:"-0.015em",
              }}>
                {h.title}
              </h3>
              <p style={{margin: 0, fontSize: 14, lineHeight: 1.6, color:"var(--ink-muted)"}}>
                {h.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .sobre-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .highlights { grid-template-columns: 1fr !important; }
          .highlights > div { border-right: none !important; border-bottom: 1px solid var(--rule); padding: 28px 0 !important; }
          .highlights > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}


