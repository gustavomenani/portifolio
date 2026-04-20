"use client";
import React from "react";
import { Icon } from "../app/icons";
import { PROJECTS } from "../app/data";
export default function Projetos() {
  const [idx, setIdx] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const total = PROJECTS.length;
  const p = PROJECTS[idx];

  const go = (to) => {
    const next = ((to % total) + total) % total;
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "ArrowLeft")  go(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);

  return (
    <section id="projetos" style={{padding:"140px 0 140px", position:"relative"}}>
      <div className="container">
        <div className="reveal" style={{marginBottom: 56, display:"flex", justifyContent:"space-between", alignItems:"end", gap: 24, flexWrap:"wrap"}}>
          <div>
            <span className="eyebrow" style={{marginBottom: 18, display:"inline-flex"}}>03 — Projetos</span>
            <h2 className="display" style={{
              fontSize:"clamp(34px, 4.6vw, 64px)",
              lineHeight: 1.02, letterSpacing:"-0.025em",
              fontWeight: 400, margin: 0,
            }}>
              Trabalhos <span className="display-italic" style={{color:"var(--ink-muted)"}}>recentes</span>
            </h2>
          </div>
          <div style={{display:"flex", alignItems:"center", gap: 12}}>
            <button onClick={() => go(idx-1)} aria-label="Anterior" style={navBtn()}><Icon.ChevronLeft/></button>
            <span className="mono" style={{fontSize:12, letterSpacing:"0.1em", color:"var(--ink-muted)", minWidth: 72, textAlign:"center"}}>
              {String(idx+1).padStart(2,"0")} <span style={{color:"var(--ink-faint)"}}>/ {String(total).padStart(2,"0")}</span>
            </span>
            <button onClick={() => go(idx+1)} aria-label="Próximo" style={navBtn()}><Icon.ChevronRight/></button>
          </div>
        </div>

        <div className="reveal reveal-d1">
          <CodeWindow project={p} dir={dir} />
        </div>

        {/* Dots + meta row */}
        <div style={{
          marginTop: 32,
          display:"flex", justifyContent:"space-between", alignItems:"center",
          gap: 24, flexWrap:"wrap",
        }}>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            {PROJECTS.map((proj, i) => (
              <button key={proj.id} onClick={() => go(i)}
                aria-label={`Ir para ${proj.title}`}
                style={{
                  padding: 4, background:"transparent", border:"none", cursor:"pointer",
                }}>
                <span style={{
                  display:"block",
                  width: i === idx ? 28 : 8, height: 8,
                  borderRadius: 999,
                  background: i === idx ? proj.accent : "var(--rule)",
                  transition:"all .45s cubic-bezier(.16,1,.3,1)",
                }}/>
              </button>
            ))}
          </div>
          <div className="mono" style={{fontSize:11, letterSpacing:"0.12em", color:"var(--ink-faint)", textTransform:"uppercase"}}>
            Use ← → para navegar
          </div>
        </div>
      </div>
    </section>
  );
}

function navBtn() {
  return {
    width:42, height:42, borderRadius:999,
    border:"1px solid var(--rule)", background:"transparent",
    color:"var(--ink)", cursor:"pointer",
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    transition:"border-color .3s, transform .3s",
  };
}

function CodeWindow({ project, dir }) {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    setEnter(false);
    const t = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(t);
  }, [project.id]);

  return (
    <div style={{
      borderRadius: 20,
      overflow:"hidden",
      background: "var(--code-bg)",
      border: "1px solid var(--rule)",
      boxShadow:"var(--shadow-soft)",
      transition:"all .4s",
    }}>
      {/* Title bar */}
      <div style={{
        display:"flex", alignItems:"center", gap: 14,
        padding: "12px 16px",
        background:"var(--bg-sunk)",
        borderBottom:"1px solid var(--rule)",
      }}>
        <div style={{display:"flex", gap: 7}}>
          <span style={dot("#FF5F57")}/>
          <span style={dot("#FEBC2E")}/>
          <span style={dot("#28C840")}/>
        </div>
        <div style={{
          flex:1, textAlign:"center",
          fontFamily:"JetBrains Mono, ui-monospace, monospace",
          fontSize:11,
          color:"var(--ink-muted)",
          letterSpacing:"0.04em",
        }}>
          <span style={{color:"var(--ink-faint)"}}>~/portfolio/</span>
          {project.id}/<span style={{color:"var(--ink)"}}>{project.fileName}</span>
        </div>
        <div style={{
          display:"flex", alignItems:"center", gap: 6,
          fontFamily:"JetBrains Mono, ui-monospace, monospace",
          fontSize: 11, color: "var(--ink-muted)",
        }}>
          <Icon.GitBranch size={11}/> {project.branch}
        </div>
      </div>

      {/* Body */}
      <div style={{
        display:"grid",
        gridTemplateColumns: "200px 1fr",
        minHeight: 420,
      }} className="code-body">
        {/* Explorer */}
        <aside style={{
          background:"var(--bg-sunk)",
          borderRight:"1px solid var(--rule)",
          padding:"18px 12px",
        }} className="code-explorer">
          <div className="mono" style={{
            fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase",
            color:"var(--accent)", padding:"0 8px", marginBottom: 12,
          }}>Explorer</div>
          {project.files.map((f, i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap: 8,
              padding: "5px 8px",
              paddingLeft: 8 + (f.indent || 0) * 14,
              fontFamily:"JetBrains Mono, ui-monospace, monospace",
              fontSize: 12,
              color: f.active ? "var(--ink)" : "var(--ink-muted)",
              background: f.active ? "color-mix(in oklch, " + project.accent + " 12%, transparent)" : "transparent",
              borderRadius: 6,
              borderLeft: f.active ? `2px solid ${project.accent}` : "2px solid transparent",
            }}>
              {f.type === "folder" ? <Icon.Folder size={13}/> : <Icon.File size={12}/>}
              <span>{f.name}</span>
            </div>
          ))}
        </aside>

        {/* Code */}
        <div style={{
          padding: "22px 24px",
          fontFamily:"JetBrains Mono, ui-monospace, monospace",
          fontSize: 13.5,
          lineHeight: 1.75,
          overflow:"auto",
          position:"relative",
        }}>
          {project.code.map((line, li) => (
            <div key={li} style={{
              display:"flex",
              opacity: enter ? 1 : 0,
              transform: enter ? "translateY(0)" : "translateY(6px)",
              transition: `opacity .5s ${li * 0.025}s, transform .5s ${li * 0.025}s`,
            }}>
              <span style={{
                display:"inline-block", width: 32, textAlign:"right",
                color:"var(--ink-faint)", userSelect:"none",
                marginRight: 18, fontSize: 11,
              }}>{li+1}</span>
              <span style={{whiteSpace:"pre"}}>
                {line.length === 0 ? "\u00A0" : line.map((t, ti) => (
                  <span key={ti} style={{color: `var(--tok-${t.c})`}}>{t.t}</span>
                ))}
              </span>
            </div>
          ))}
          <span style={{
            display:"inline-block", marginLeft: 50,
            width: 8, height: 16, verticalAlign:"middle",
            background: project.accent,
            animation:"blink 1.1s step-end infinite",
          }}/>
          <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </div>
      </div>

      {/* Info strip */}
      <div style={{
        padding:"24px 28px",
        borderTop:"1px solid var(--rule)",
        background:"var(--bg-raised)",
        display:"grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 32, alignItems:"start",
      }} className="code-info">
        <div>
          <div style={{display:"flex", alignItems:"center", gap: 14, marginBottom: 12}}>
            <h3 className="display" style={{
              fontSize: 28, margin: 0, fontWeight: 400, letterSpacing:"-0.02em",
            }}>
              {project.title}
            </h3>
            <span className="mono" style={{
              fontSize:10, color: project.accent,
              padding:"3px 9px", borderRadius:999,
              border:`1px solid color-mix(in oklch, ${project.accent} 40%, transparent)`,
              background:`color-mix(in oklch, ${project.accent} 10%, transparent)`,
              letterSpacing:"0.1em", textTransform:"uppercase",
            }}>
              {project.language}
            </span>
            <span className="mono" style={{fontSize:10, color:"var(--ink-faint)", letterSpacing:"0.1em"}}>{project.year}</span>
          </div>
          <p style={{margin: 0, fontSize: 14, lineHeight: 1.6, color:"var(--ink-muted)", maxWidth: 600}}>
            {project.description}
          </p>
          <div style={{marginTop: 16, display:"flex", gap:6, flexWrap:"wrap"}}>
            {project.tags.map(tag => (
              <span key={tag} className="mono" style={{
                fontSize: 10, padding:"4px 10px",
                border:"1px solid var(--rule)", borderRadius:999,
                color:"var(--ink-muted)", letterSpacing:"0.04em",
              }}>{tag}</span>
            ))}
          </div>
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost" style={{alignSelf:"center", whiteSpace:"nowrap"}}>
          Ver no GitHub <Icon.ArrowUpRight size={13}/>
        </a>
      </div>

      <style>{`
        @media (max-width: 740px) {
          .code-body { grid-template-columns: 1fr !important; }
          .code-explorer { display: none !important; }
          .code-info { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function dot(c) {
  return {
    display:"inline-block", width:11, height:11, borderRadius:999,
    background: c, opacity: 0.9,
  };
}


