"use client";
import React from "react";
import { Icon } from "../app/icons";
/* Tweaks panel — shown when user toggles from the host toolbar */
export default function Tweaks({ tweaks, setTweaks }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setOpen(true);
      if (d.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const apply = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  if (!open) return null;

  const accents = [
    { label:"Amber",   h: 32,  c: 0.11 },
    { label:"Graphite", h: 60,  c: 0.00 },
    { label:"Forest",  h: 155, c: 0.10 },
    { label:"Cobalt",  h: 250, c: 0.13 },
    { label:"Magenta", h: 340, c: 0.14 },
  ];
  const fontPairs = [
    { id:"fraunces-inter", label:"Fraunces × Inter", display:"'Fraunces', Georgia, serif" },
    { id:"serif-sans",     label:"Serif × Sans",      display:"'Fraunces', Georgia, serif", italic:false },
    { id:"sans-only",      label:"Inter only",        display:"'Inter', system-ui, sans-serif" },
  ];

  return (
    <div style={{
      position:"fixed", right: 20, bottom: 20, zIndex: 100,
      width: 300,
      background:"var(--bg-raised)",
      border:"1px solid var(--rule)",
      borderRadius: 16,
      boxShadow:"0 20px 60px rgba(0,0,0,0.18)",
      padding: 18,
      backdropFilter:"blur(20px)",
      fontFamily:"'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        marginBottom: 16, paddingBottom: 12, borderBottom:"1px solid var(--rule)",
      }}>
        <span className="mono" style={{fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--accent)"}}>
          Tweaks
        </span>
        <span className="mono" style={{fontSize:10, color:"var(--ink-faint)"}}>Editando ao vivo</span>
      </div>

      <Section title="Tema">
        <SegBtns
          value={tweaks.theme}
          options={[{v:"light", label:"Papel"}, {v:"dark", label:"Escuro"}]}
          onChange={v => apply({ theme: v })}
        />
      </Section>

      <Section title="Cor de acento">
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {accents.map(a => {
            const active = tweaks.accentH === a.h;
            return (
              <button key={a.label}
                onClick={() => apply({ accentH: a.h, accentC: a.c })}
                title={a.label}
                style={{
                  width: 30, height: 30, borderRadius: 999,
                  border: active ? "2px solid var(--ink)" : "1px solid var(--rule)",
                  background: `oklch(0.58 ${a.c} ${a.h})`,
                  cursor:"pointer", padding: 0,
                }}
              />
            );
          })}
        </div>
      </Section>

      <Section title="Tipografia">
        <select
          value={tweaks.fontPair}
          onChange={e => apply({ fontPair: e.target.value })}
          style={{
            width:"100%", padding:"10px 12px", borderRadius: 10,
            border:"1px solid var(--rule)", background:"var(--bg)",
            color:"var(--ink)", fontSize: 13,
          }}>
          {fontPairs.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
      </Section>

      <Section title="Densidade">
        <SegBtns
          value={tweaks.density}
          options={[{v:"compact", label:"Compacto"}, {v:"relaxed", label:"Relaxado"}]}
          onChange={v => apply({ density: v })}
        />
      </Section>

      <Section title="Manchete">
        <input
          value={tweaks.heroTagline}
          onChange={e => apply({ heroTagline: e.target.value })}
          placeholder="Tagline do hero"
          style={{fontSize: 13}}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{marginBottom: 14}}>
      <div className="mono" style={{
        fontSize: 10, letterSpacing:"0.1em", textTransform:"uppercase",
        color:"var(--ink-muted)", marginBottom: 8,
      }}>{title}</div>
      {children}
    </div>
  );
}

function SegBtns({ value, options, onChange }) {
  return (
    <div style={{display:"flex", gap: 4, padding: 3, border:"1px solid var(--rule)", borderRadius: 999, background:"var(--bg)"}}>
      {options.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)}
          style={{
            flex:1, padding:"7px 10px", borderRadius:999,
            background: value === o.v ? "var(--ink)" : "transparent",
            color: value === o.v ? "var(--bg)" : "var(--ink-muted)",
            border: "none", cursor:"pointer", fontSize: 12,
            transition:"all .2s",
          }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}


