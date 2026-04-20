"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../app/icons";
import { sendEmail } from "../actions/sendEmail";

export default function Contato() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Rate Limit / Anti-spam client side
    const lastSent = localStorage.getItem("gm_last_email_sent");
    if (lastSent && Date.now() - parseInt(lastSent) < 60000) {
      setErrorMsg("Aguarde um minuto antes de enviar outra mensagem.");
      return;
    }

    if (form.name.trim().length < 2) {
      setErrorMsg("Por favor, insira um nome válido.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("O formato do e-mail inserido é inválido.");
      return;
    }

    if (form.message.trim().length < 10) {
      setErrorMsg("A mensagem precisa ter pelo menos 10 caracteres.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const result = await sendEmail(form);
      if (result.success) {
        setSent(true);
        setForm({ name:"", email:"", message:"" });
        localStorage.setItem("gm_last_email_sent", Date.now().toString());
        setTimeout(() => setSent(false), 5000);
      } else {
        setErrorMsg("Falha ao enviar, verifique o email ou tente mais tarde.");
      }
    } catch {
      setErrorMsg("Ocorreu um erro no envio. Tente me contatar diretamente pelo linkedin.");
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { label:"GitHub",   sub:"@gustavomenani", href:"https://github.com/gustavomenani", icon:<Icon.Github size={16}/> },
    { label:"LinkedIn", sub:"in/gustavo-menani", href:"https://www.linkedin.com/in/gustavo-menani-0734003a7/", icon:<Icon.Linkedin size={16}/> },
    { label:"Email",    sub:"menanigustavo@gmail.com", href:"mailto:menanigustavo@gmail.com", icon:<Icon.Mail size={16}/> },
  ];

  return (
    <section id="contato" style={{padding:"140px 0 120px", position:"relative"}}>
      <div className="container">
        <div className="reveal" style={{marginBottom: 56}}>
          <span className="eyebrow">04 — Contato</span>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1fr)",
          gap: 80,
        }} className="contato-grid">

          <div>
            <h2 className="display reveal reveal-d1" style={{
              fontSize:"clamp(40px, 5.2vw, 72px)",
              lineHeight: 1,
              letterSpacing:"-0.028em",
              fontWeight: 400, margin:"0 0 28px",
            }}>
              Vamos construir
              <br/>
              algo <span className="display-italic" style={{ paddingRight: "0.1em" }}>incrível</span>
              <span className="display-italic" style={{color:"var(--accent)", marginLeft: "0.05em"}}>?</span>
            </h2>
            <p className="reveal reveal-d2" style={{
              fontSize: 16, color:"var(--ink-muted)", lineHeight: 1.6,
              margin:"0 0 44px", maxWidth: 440,
            }}>
              Estou sempre aberto a novos projetos e colaborações.
              Me conta sobre a sua ideia — normalmente respondo em menos de 24h.
            </p>

            <motion.div 
              className="reveal reveal-d3" 
              initial="hidden" whileInView="visible" viewport={{ once:true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              style={{display:"flex", flexDirection:"column", gap: 2, borderTop:"1px solid var(--rule)"}}
            >
              {socials.map(s => (
                <motion.a 
                  key={s.label} href={s.href} target={s.href.startsWith('mailto') ? '_self' : '_blank'} rel={s.href.startsWith('mailto') ? '' : 'noopener noreferrer'}
                  variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 15 } }
                  }}
                  style={{
                    position: "relative",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"22px 4px",
                    borderBottom:"1px solid var(--rule)",
                    textDecoration:"none", color:"var(--ink)",
                    transition:"padding .3s",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.paddingLeft="16px"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.paddingLeft="4px"; }}
                >
                  <div style={{position: "relative", zIndex: 1, display:"flex", alignItems:"center", gap:18}}>
                    <span style={{color:"var(--ink-muted)"}}>{s.icon}</span>
                    <div style={{display:"flex", flexDirection:"column"}}>
                      <span style={{fontSize: 16}}>{s.label}</span>
                      <span className="mono" style={{fontSize: 11, color:"var(--ink-faint)", letterSpacing:"0.04em"}}>{s.sub}</span>
                    </div>
                  </div>
                  <span style={{position: "relative", zIndex: 1, color:"var(--ink-muted)"}}><Icon.ArrowUpRight size={15}/></span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <form onSubmit={onSubmit} className="reveal reveal-d2" style={{
            background:"var(--bg-raised)",
            border:"1px solid var(--rule)",
            borderRadius: 20, padding: 32,
            boxShadow:"var(--shadow-soft)",
          }}>
            <div className="mono" style={{
              fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase",
              color:"var(--accent)", marginBottom: 24,
              display:"flex", alignItems:"center", gap:10,
            }}>
              <span style={{width: 24, height:1, background:"var(--accent)"}}/>
              Enviar mensagem
            </div>

            <label style={lbl}>Nome</label>
            <input type="text" required value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="Seu nome" />

            <label style={{...lbl, marginTop: 18}}>Email</label>
            <input type="email" required value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="voce@empresa.com" />

            <label style={{...lbl, marginTop: 18}}>Mensagem</label>
            <textarea required rows={5} value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              placeholder="Sobre o que você gostaria de conversar?"
              style={{resize:"vertical"}} />

            <motion.button 
              type="submit" disabled={loading || sent} className="btn btn-primary" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
              width:"100%", justifyContent:"center", marginTop: 24,
              opacity: loading ? 0.7 : 1, pointerEvents: loading ? "none" : "auto",
              background: sent ? "var(--accent)" : undefined,
              borderColor: sent ? "var(--accent)" : undefined,
              color: sent ? "white" : undefined,
              transition: "background 0.3s, border-color 0.3s, color 0.3s"
            }}>
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} style={{ display: "flex" }}>
                  <Icon.Loader size={15}/>
                </motion.div>
              ) : sent ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>✓ Enviada</motion.span>
              ) : (<>Enviar <Icon.Send size={13}/></>)}
            </motion.button>
            {errorMsg && (
              <p style={{ color: "red", fontSize: 12, textAlign: "center", marginTop: 10 }}>
                {errorMsg}
              </p>
            )}
            <p className="mono" style={{
              fontSize:10, color:"var(--ink-faint)", letterSpacing:"0.08em",
              textAlign:"center", marginTop: 14,
            }}>
              Seus dados não são compartilhados com terceiros.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contato-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

const lbl = {
  display:"block",
  fontFamily:"JetBrains Mono, ui-monospace, monospace",
  fontSize: 11, letterSpacing:"0.12em", textTransform:"uppercase",
  color:"var(--ink-muted)", marginBottom: 8,
};


