"use client";
import React from "react";
import { Icon } from "../app/icons";
import { NAV_LINKS } from "../app/data";
import { motion, AnimatePresence } from "framer-motion";
const { useState, useEffect } = React;

export default function Header({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: scrolled ? "12px 0" : "24px 0",
        transition: "padding .35s cubic-bezier(.16,1,.3,1), backdrop-filter .3s",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        background: scrolled ? "color-mix(in oklch, var(--bg) 70%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule-soft)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap: 24}}>
        {/* Logo mark */}
        <a href="#inicio" style={{display:"flex", alignItems:"center", gap:12, textDecoration:"none", color:"var(--ink)"}}>
          <Logomark />
          <span style={{display:"flex", flexDirection:"column", lineHeight:1.1}}>
            <span className="mono" style={{fontSize:11, letterSpacing:"0.12em", color:"var(--ink-muted)"}}>GM · MMXXVI</span>
            <span className="display" style={{fontSize:18}}>Gustavo Menani</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{display:"flex", alignItems:"center", gap:2}}>
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  position:"relative",
                  padding: "8px 14px",
                  fontSize: 13,
                  letterSpacing: "0.01em",
                  color: isActive ? "var(--ink)" : "var(--ink-muted)",
                  textDecoration:"none",
                  transition: "color .3s",
                  display:"flex", alignItems:"center", gap:8,
                }}
              >
                <span className="mono" style={{fontSize:10, opacity: isActive ? 1 : 0.5, color: isActive ? "var(--accent)" : "inherit"}}>
                  {link.index}
                </span>
                {link.label}
                {isActive && (
                  <span style={{
                    position:"absolute", bottom: 2, left: 14, right: 14,
                    height: 1, background:"var(--ink)"
                  }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls */}
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <button
            onClick={onToggleTheme}
            aria-label="Alternar tema"
            style={{
              position:"relative",
              width:40, height:40, borderRadius: 999,
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              background:"transparent", border:"1px solid var(--rule)",
              color:"var(--ink)", cursor:"pointer",
              transition: "all .3s",
              overflow: "hidden"
            }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor = "var(--ink)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor = "var(--rule)"; }}
          >
            {mounted ? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute" }}
                >
                  {theme === "dark" ? <Icon.Sun size={15}/> : <Icon.Moon size={15}/>}
                </motion.div>
              </AnimatePresence>
            ) : <span style={{width: 15, height: 15}}/>}
          </button>
          <a href="#contato" className="btn btn-primary" style={{padding:"10px 18px", fontSize:13}}>
            Fale comigo <Icon.ArrowUpRight size={13}/>
          </a>
          <button
            className="mobile-toggle"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display:"none",
              width:40, height:40, borderRadius:999,
              background:"transparent", border:"1px solid var(--rule)",
              color:"var(--ink)", cursor:"pointer",
              alignItems:"center", justifyContent:"center",
            }}
          >
            {mobileOpen ? <Icon.X/> : <Icon.Menu/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, height: "100vh", zIndex: -1 }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                cursor: "pointer",
              }}
            />
            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", top: 12, left: 24, right: 24,
                borderRadius: 16,
                border: "1px solid var(--rule)",
                background: "var(--bg-raised)",
                padding: 12,
                boxShadow: "var(--shadow-soft)",
              }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "14px 16px", textDecoration: "none", color: "var(--ink)",
                    fontSize: 15, borderRadius: 10,
                  }}
                >
                  <span>{l.label}</span>
                  <span className="mono" style={{ color: "var(--ink-faint)", fontSize: 11 }}>{l.index}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

function Logomark() {
  return (
    <svg width="42" height="24" viewBox="0 0 42 24" fill="none" aria-hidden style={{ fontWeight: 900, fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif' }}>
      <text x="21" y="20" fontSize="24" textAnchor="middle" letterSpacing="-0.5">
        <tspan fill="var(--ink)">G</tspan>
        <tspan fill="var(--accent)" dx="1">M</tspan>
      </text>
    </svg>
  );
}


