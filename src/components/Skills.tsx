"use client";
import React from "react";
import { Icon } from "../app/icons";
import { SKILL_GROUPS } from "../app/data";
export default function Skills() {
  return (
    <section id="skills" style={{padding:"140px 0 120px", position:"relative"}}>
      <div className="container">
        <div className="reveal" style={{marginBottom: 56}}>
          <span className="eyebrow">02 — Skills</span>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1.4fr)",
          gap: 72, alignItems:"start",
        }} className="skills-grid">
          <h2 className="display reveal reveal-d1" style={{
            fontSize:"clamp(34px, 4.4vw, 56px)",
            lineHeight: 1.02,
            letterSpacing:"-0.022em",
            fontWeight: 400, margin: 0,
          }}>
            Tecnologias
            <br/>
            <span className="display-italic" style={{color:"var(--ink-muted)"}}>&amp; ferramentas</span>
          </h2>

          <div className="reveal reveal-d2" style={{display:"flex", flexDirection:"column", gap: 24}}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="mono" style={{
                  fontSize: 11, letterSpacing:"0.14em", textTransform:"uppercase",
                  color:"var(--accent)", marginBottom: 14,
                  display:"flex", alignItems:"center", gap: 12,
                }}>
                  <span>{group.label}</span>
                  <span style={{flex:1, height:1, background:"var(--rule)"}}/>
                  <span style={{color:"var(--ink-faint)"}}>{String(group.items.length).padStart(2,"0")}</span>
                </div>
                <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
                  {group.items.map((skill, i) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function SkillChip({ skill }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap: 10,
        padding: "10px 16px",
        border:"1px solid var(--rule)",
        borderRadius: 999,
        fontSize: 14,
        color: hover ? "var(--ink)" : "var(--ink-muted)",
        borderColor: hover ? "var(--ink)" : "var(--rule)",
        background: hover ? "var(--bg-raised)" : "transparent",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        transform: hover ? "translateY(-2px)" : "none",
        cursor:"default",
      }}>
      <span style={{
        width:5, height:5, borderRadius:999,
        background: hover ? "var(--accent)" : "var(--ink-faint)",
        transition:"background .3s",
      }}/>
      {skill.name}
      <span className="mono" style={{
        fontSize: 10, letterSpacing:"0.1em", textTransform:"uppercase",
        color:"var(--ink-faint)", opacity: hover ? 1 : 0.6,
        transition:"opacity .3s",
      }}>
        {skill.tag}
      </span>
    </span>
  );
}


