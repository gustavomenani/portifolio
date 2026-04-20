"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Sobre = dynamic(() => import("../components/Sobre"), { ssr: true });
const Skills = dynamic(() => import("../components/Skills"), { ssr: true });
const Projetos = dynamic(() => import("../components/Projetos"), { ssr: true });
const Contato = dynamic(() => import("../components/Contato"), { ssr: true });
const Footer = dynamic(() => import("../components/Footer"), { ssr: true });
const Tweaks = dynamic(() => import("../components/Tweaks"), { ssr: false });

/* App — ties everything together + applies Tweaks to CSS vars */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accentH": 32,
  "accentC": 0.11,
  "fontPair": "fraunces-inter",
  "density": "relaxed",
  "heroTagline": "Transformo processos manuais e ineficientes em sistemas fluidos e lucrativos."
}/*EDITMODE-END*/;

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("gm-tweaks");
        if (saved) setTweaks({ ...TWEAK_DEFAULTS, ...JSON.parse(saved) });
      } catch {}
    }
    setMounted(true);
  }, []);

  // Apply theme
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    document.documentElement.style.setProperty("--accent-h", tweaks.accentH.toString());
    document.documentElement.style.setProperty("--accent-c", tweaks.accentC.toString());
    document.body.style.fontFamily =
      tweaks.fontPair === "sans-only" ? "var(--font-inter), system-ui, sans-serif" : "var(--font-inter), system-ui, sans-serif";
    document.documentElement.style.setProperty(
      "--display-font",
      tweaks.fontPair === "sans-only" ? "var(--font-inter), system-ui, sans-serif" : "var(--font-fraunces), Georgia, serif"
    );
    document.documentElement.style.setProperty(
      "--section-pad",
      tweaks.density === "compact" ? "100px" : "160px"
    );
    // density: push via style override
    const styleTag = document.getElementById("density-style") || (() => {
      const s = document.createElement("style"); s.id = "density-style"; document.head.appendChild(s); return s;
    })();
    styleTag.textContent = tweaks.density === "compact"
      ? `section { padding-top: 96px !important; padding-bottom: 96px !important; } .container { max-width: 1100px; }`
      : ``;

    // display font swap for .display class
    const dispTag = document.getElementById("disp-style") || (() => {
      const s = document.createElement("style"); s.id="disp-style"; document.head.appendChild(s); return s;
    })();
    dispTag.textContent = `.display { font-family: var(--display-font, 'Fraunces', Georgia, serif) !important; }`;

    try { localStorage.setItem("gm-tweaks", JSON.stringify(tweaks)); } catch {}
  }, [tweaks]);

  // Reveal animation observer
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = tweaks.theme === "dark" ? "light" : "dark";
    setTweaks({ ...tweaks, theme: next });
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { theme: next } }, "*");
  };

  return (
    <React.Fragment>
      <Header theme={tweaks.theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero tagline={tweaks.heroTagline} />
        <Divider/>
        <Sobre />
        <Divider/>
        <Skills />
        <Divider/>
        <Projetos />
        <Divider/>
        <Contato />
      </main>
      <Footer />
      <Tweaks tweaks={tweaks} setTweaks={setTweaks} />
    </React.Fragment>
  );
}

function Divider() {
  return (
    <div className="container" style={{position:"relative", zIndex:2}}>
      <hr className="hr"/>
    </div>
  );
}
