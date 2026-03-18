"use client";
import { useEffect, useRef, useState } from "react";

const CALENDAR_LINK = "https://calendar.app.google/u8wtUHhWYvgfm4kd7";

const SERVICES = [
    "MERN Stack Development", "Next.js Development", "WordPress / Elementor",
    "Full-Stack Web App", "API Development", "UI/UX Implementation", "Other",
];

const SOCIAL_LINKS = [
    {
        label: "GitHub", href: "https://github.com/kaifdev01", color: "#fff",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
    },
    {
        label: "Upwork", href: "https://upwork.com/freelancers/muhammadk64", color: "#14a800",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" /></svg>
    },
    {
        label: "Email", href: "mailto:kaifm9096@gmail.com", color: "#a78bfa",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    },
];

const inputStyle = (focused) => ({
    background: focused ? "rgba(167,139,250,0.06)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.09)"}`,
    borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff",
    outline: "none", width: "100%", fontFamily: "inherit",
    transition: "all 0.25s ease", boxSizing: "border-box",
});

function Field({ label, children }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</label>
            {children}
        </div>
    );
}

export default function ContactSection() {
    const [visible, setVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("message");
    const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
    const [focused, setFocused] = useState("");
    const [status, setStatus] = useState("idle");
    const [serviceOpen, setServiceOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const sectionRef = useRef(null);
    const dropRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setServiceOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    const handleChange = (field, val) => setForm(f => ({ ...f, [field]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus("sending"); setErrorMsg("");
        try {
            const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            const data = await res.json();
            if (res.ok && data.success) {
                setStatus("success");
                setForm({ name: "", email: "", service: "", message: "" });
                setTimeout(() => setStatus("idle"), 6000);
            } else throw new Error(data.error || "Something went wrong");
        } catch (err) {
            setStatus("error"); setErrorMsg(err.message || "Failed to send. Please email me directly.");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const isValid = form.name.trim() && form.email.trim() && form.message.trim();

    return (
        <>
            <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.96) translateY(-8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .ct-fade{opacity:0}.ct-fade.vis{animation:fadeUp 0.65s ease forwards}
        .soc-btn{transition:all 0.25s ease;text-decoration:none;cursor:pointer}
        .soc-btn:hover{transform:translateY(-3px)!important}
        .tab-btn{cursor:pointer;border:none;font-family:inherit;outline:none;transition:all 0.25s ease}
        .submit-btn{transition:all 0.25s ease;cursor:pointer;border:none;font-family:inherit;outline:none}
        .submit-btn:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-2px)}
        .submit-btn:disabled{opacity:0.45;cursor:default}
        .drop-item{cursor:pointer;border:none;font-family:inherit;text-align:left;width:100%;transition:background 0.18s}
        .drop-item:hover{background:rgba(167,139,250,0.1)!important;color:#fff!important}
        textarea{resize:vertical}
        @media(max-width:768px){
          .ct-two-col{grid-template-columns:1fr!important}
          .cal-grid{grid-template-columns:1fr!important}
          .ct-section{padding:64px 16px 56px!important}
          .ct-card{padding:28px 20px!important;width:99%!important;box-sizing:border-box!important}
          .ct-submit-row{flex-direction:column!important;align-items:stretch!important}
          .ct-submit-row button{width:100%!important;justify-content:center!important}
        }
      `}</style>

            <section ref={sectionRef} id="contact" className="ct-section" style={{ background: "#09090f", padding: "96px 48px 88px", fontFamily: "'Geist','Inter','Helvetica Neue',sans-serif", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />
                <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -60, right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(96,217,250,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>

                    {/* Header */}
                    <div className={`ct-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 14 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#a78bfa", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,transparent,#a78bfa)", display: "inline-block" }} />Contact<span style={{ width: 28, height: 1, background: "linear-gradient(90deg,#a78bfa,transparent)", display: "inline-block" }} />
                        </span>
                    </div>
                    <div className={`ct-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", animationDelay: "0.1s" }}>
                        <h2 style={{ fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: "-1.8px", lineHeight: 1.08, margin: 0 }}>Let's <span style={{ color: "#a78bfa" }}>work together.</span></h2>
                    </div>
                    <div className={`ct-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 48, animationDelay: "0.18s" }}>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.32)", margin: "12px auto 0", maxWidth: 460, lineHeight: 1.7 }}>Send a message or book a free meeting — I reply within 24 hours.</p>
                    </div>

                    {/* Social links */}
                    <div className={`ct-fade${visible ? " vis" : ""}`} style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40, flexWrap: "wrap", animationDelay: "0.22s" }}>
                        {SOCIAL_LINKS.map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="soc-btn" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "11px 20px", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>
                                <span style={{ color: s.color, display: "flex" }}>{s.icon}</span>{s.label}
                            </a>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className={`ct-fade${visible ? " vis" : ""}`} style={{ display: "flex", justifyContent: "center", marginBottom: 28, animationDelay: "0.28s" }}>
                        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 13, padding: 4 }}>
                            {[
                                { id: "message", label: "Send a Message" },
                                { id: "meeting", label: "Schedule a Meeting" },
                            ].map(tab => (
                                <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)} style={{ fontSize: 13, fontWeight: 600, padding: "9px 22px", borderRadius: 10, color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.35)", background: activeTab === tab.id ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "transparent", boxShadow: activeTab === tab.id ? "0 4px 14px rgba(124,58,237,0.35)" : "none", letterSpacing: "-0.2px", whiteSpace: "nowrap" }}>{tab.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Card */}
                    <div className={`ct-card ct-fade${visible ? " vis" : ""}`} style={{ animationDelay: "0.34s", background: "linear-gradient(160deg,rgba(16,12,30,0.99) 0%,rgba(9,7,20,0.99) 100%)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 24, padding: "44px 48px", boxShadow: "0 32px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(124,58,237,0.08)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 400, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

                        {/* MESSAGE TAB */}
                        {activeTab === "message" && (
                            <>
                                {status === "success" ? (
                                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                                        <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        </div>
                                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 10px" }}>Message sent!</h3>
                                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 360, margin: "0 auto" }}>I'll reply to <span style={{ color: "#a78bfa" }}>your email</span> within 24 hours.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
                                        <div className="ct-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                                            <Field label="Your Name">
                                                <input type="text" placeholder="John Smith" value={form.name} onChange={e => handleChange("name", e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} style={inputStyle(focused === "name")} />
                                            </Field>
                                            <Field label="Your Email">
                                                <input type="email" placeholder="john@company.com" value={form.email} onChange={e => handleChange("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} style={inputStyle(focused === "email")} />
                                            </Field>
                                        </div>

                                        <div style={{ marginBottom: 20 }} ref={dropRef}>
                                            <Field label="Service Needed">
                                                <div style={{ position: "relative" }}>
                                                    <button type="button" onClick={() => setServiceOpen(o => !o)} style={{ ...inputStyle(serviceOpen), display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                                                        <span style={{ color: form.service ? "#fff" : "rgba(255,255,255,0.28)" }}>{form.service || "Select a service…"}</span>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" style={{ transform: serviceOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                                                    </button>
                                                    {serviceOpen && (
                                                        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "linear-gradient(160deg,rgba(18,14,34,0.99),rgba(10,8,22,0.99))", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 12, overflow: "hidden", zIndex: 100, animation: "scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards", boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}>
                                                            {SERVICES.map((s, i) => (
                                                                <button key={i} type="button" className="drop-item" onClick={() => { handleChange("service", s); setServiceOpen(false); }} style={{ display: "block", padding: "12px 16px", fontSize: 13, fontWeight: 500, color: form.service === s ? "#a78bfa" : "rgba(255,255,255,0.55)", background: form.service === s ? "rgba(167,139,250,0.08)" : "transparent", borderBottom: i < SERVICES.length - 1 ? "0.5px solid rgba(255,255,255,0.05)" : "none" }}>{s}</button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </Field>
                                        </div>

                                        <div style={{ marginBottom: 28 }}>
                                            <Field label="Your Message">
                                                <textarea placeholder="Tell me about your project — what you need, timeline, budget…" rows={5} value={form.message} onChange={e => handleChange("message", e.target.value)} onFocus={() => setFocused("message")} onBlur={() => setFocused("")} style={{ ...inputStyle(focused === "message"), minHeight: 130 }} />
                                            </Field>
                                        </div>

                                        {status === "error" && (
                                            <div style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "0.5px solid rgba(239,68,68,0.2)", borderRadius: 10, fontSize: 13, color: "rgba(239,68,68,0.9)" }}>{errorMsg}</div>
                                        )}

                                        <div className="ct-submit-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", margin: 0 }}>Replies within 24 hours · kaifm9096@gmail.com</p>
                                            <button type="submit" disabled={!isValid || status === "sending"} className="submit-btn" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: isValid ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "rgba(255,255,255,0.06)", color: isValid ? "#fff" : "rgba(255,255,255,0.25)", fontSize: 14, fontWeight: 700, padding: "13px 32px", borderRadius: 12, boxShadow: isValid ? "0 8px 28px rgba(124,58,237,0.4)" : "none", letterSpacing: "-0.2px" }}>
                                                {status === "sending" ? (<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Sending…</>) : (<>Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></>)}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}

                        {/* MEETING TAB */}
                        {activeTab === "meeting" && (
                            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "16px 0 24px" }}>
                                <div style={{ width: 72, height: 72, borderRadius: 20, margin: "0 auto 20px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(167,139,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>
                                </div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 10px" }}>Book a Free Meeting</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, maxWidth: 420, margin: "0 auto 32px" }}>Schedule a free 30-minute discovery call. We'll talk about your project, timeline, and how I can help.</p>

                                <div className="cal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 36, textAlign: "left" }}>
                                    {[
                                        {
                                            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                                            color: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)",
                                            title: "30 minutes", desc: "Free discovery call"
                                        },
                                        {
                                            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="13" y2="14" /></svg>,
                                            color: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.25)",
                                            title: "No pressure", desc: "Just a friendly chat"
                                        },
                                        {
                                            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60d9fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                                            color: "rgba(96,217,250,0.12)", border: "rgba(96,217,250,0.25)",
                                            title: "Fast start", desc: "Begin same week"
                                        },
                                    ].map((item, i) => (
                                        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 16px" }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color, border: `0.5px solid ${item.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>{item.icon}</div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.title}</div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
                                        </div>
                                    ))}
                                </div>

                                <a href={CALENDAR_LINK} target="_blank" rel="noreferrer" className="submit-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 28px rgba(124,58,237,0.45)", letterSpacing: "-0.2px" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                    Pick a Time on Google Calendar
                                </a>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 14 }}>Free · No account needed · Powered by Google Calendar</p>
                            </div>
                        )}
                    </div>

                    <div className={`ct-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginTop: 36, animationDelay: "0.45s" }}>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", lineHeight: 1.7 }}>Based in Lahore, Pakistan · Available for remote work worldwide</p>
                    </div>
                </div>
            </section>
        </>
    );
}