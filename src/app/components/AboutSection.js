"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ───────────────────────────────────────────────────────────────────────
const SKILLS = [
    { label: "React / Next.js", pct: 92, color: "#60d9fa" },
    { label: "Node / Express", pct: 88, color: "#a78bfa" },
    { label: "MongoDB", pct: 85, color: "#4ade80" },
    { label: "WordPress", pct: 90, color: "#fb923c" },
    { label: "UI / UX Design", pct: 80, color: "#f472b6" },
];

const TOOLS = [
    "MongoDB", "Express", "React", "Node.js", "Next.js",
    "WordPress", "Tailwind CSS", "Figma", "Git", "Cloudinary", "Socket.io", "REST API", "JWT", "Mongoose",
];

const SERVICES = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: "Full-Stack MERN",
        desc: "End-to-end web apps — REST APIs, auth, dashboards, real-time features.",
        color: "#a78bfa",
        tags: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" />
            </svg>
        ),
        title: "Next.js Apps",
        desc: "SSR, SSG, App Router, performance-first web apps built to scale.",
        color: "#60d9fa",
        tags: ["Next.js", "Tailwind", "Vercel", "SEO"],
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        title: "WordPress / Elementor",
        desc: "Pixel-perfect business sites, custom themes, WooCommerce stores.",
        color: "#4ade80",
        tags: ["WordPress", "Elementor", "WooCommerce", "PHP"],
    },
];

// ── Skill Bar ──────────────────────────────────────────────────────────────────
function SkillBar({ label, pct, color, delay }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setTimeout(() => setWidth(pct), delay); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [pct, delay]);

    return (
        <div ref={ref} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 12, color, fontWeight: 700 }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                    height: "100%", width: `${width}%`,
                    background: `linear-gradient(90deg, ${color}66, ${color})`,
                    borderRadius: 99,
                    transition: "width 1.3s cubic-bezier(0.16,1,0.3,1)",
                    boxShadow: `0 0 12px ${color}44`,
                }} />
            </div>
        </div>
    );
}

// ── Floating Terminal Avatar ───────────────────────────────────────────────────
function DevAvatar() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 3200);
        return () => clearInterval(t);
    }, []);

    const lines = [
        { text: 'const kaif = {', color: '#a78bfa' },
        { text: '  role: "Full-Stack Dev",', color: '#60d9fa' },
        { text: '  stack: "MERN + Next.js",', color: '#4ade80' },
        { text: '  rating: 5.0,', color: '#fb923c' },
        { text: '  available: true,', color: '#f472b6' },
        { text: '  ships: "fast ⚡",', color: '#60d9fa' },
        { text: '};', color: '#a78bfa' },
    ];

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 340, margin: "0 auto" }}>

            {/* Ambient glow */}
            <div style={{
                position: "absolute", inset: -40,
                background: "radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 65%)",
                pointerEvents: "none", animation: "avatarGlow 4s ease-in-out infinite",
            }} />

            {/* Terminal card */}
            <div style={{
                width: "100%",
                background: "linear-gradient(160deg, rgba(18,14,36,0.99) 0%, rgba(10,8,22,0.99) 100%)",
                border: "1px solid rgba(167,139,250,0.22)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 32px 72px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)",
                animation: "float 5s ease-in-out infinite",
            }}>
                {/* Editor chrome */}
                <div style={{
                    padding: "11px 16px",
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", gap: 7,
                }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                        <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.9 }} />
                    ))}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 8, fontFamily: "monospace", letterSpacing: "0.03em" }}>
                        kaif.js
                    </span>
                    <div style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,0.12)", fontFamily: "monospace" }}>
                        UTF-8
                    </div>
                </div>

                {/* Avatar + name */}
                <div style={{
                    padding: "24px 20px 16px",
                    display: "flex", alignItems: "center", gap: 16,
                    borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{
                            width: 68, height: 68, borderRadius: "50%",
                            background: "linear-gradient(135deg,#7c3aed,#3b82f6,#a78bfa)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px",
                            boxShadow: "0 0 28px rgba(124,58,237,0.55), 0 0 56px rgba(124,58,237,0.18)",
                            border: "2px solid rgba(167,139,250,0.4)",
                            fontFamily: "'Geist','Inter',sans-serif",
                        }}>
                            MK
                        </div>
                        <div style={{
                            position: "absolute", bottom: 2, right: 2,
                            width: 14, height: 14, borderRadius: "50%",
                            background: "#22c55e",
                            border: "2.5px solid rgba(10,8,22,0.99)",
                            boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                        }} />
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.4px" }}>Muhammad Kaif</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>Full-Stack Developer</div>
                        <div style={{
                            marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5,
                            background: "rgba(34,197,94,0.08)", border: "0.5px solid rgba(34,197,94,0.2)",
                            borderRadius: 20, padding: "3px 9px",
                        }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", animation: "ping 2s ease-in-out infinite" }} />
                            <span style={{ fontSize: 10, color: "#4ade80", fontWeight: 600 }}>Open to work</span>
                        </div>
                    </div>
                </div>

                {/* Code lines */}
                <div style={{ padding: "16px 20px 20px", fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace" }}>
                    {lines.map((line, i) => (
                        <div key={i} style={{
                            fontSize: 11.5, color: line.color, lineHeight: 1.9,
                            opacity: tick % 2 === 0 || i < 3 ? 1 : 0.65,
                            transition: "opacity 0.8s ease",
                            whiteSpace: "nowrap",
                            letterSpacing: "0.01em",
                        }}>
                            <span style={{ color: "rgba(255,255,255,0.15)", userSelect: "none", marginRight: 12 }}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            {line.text}
                            {i === lines.length - 1 && (
                                <span style={{ animation: "cursorBlink 1.1s step-end infinite", marginLeft: 2, color: "#a78bfa" }}>▌</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating badge — years */}
            <div style={{
                position: "absolute", top: -16, right: -16,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                border: "1px solid rgba(167,139,250,0.4)",
                borderRadius: 14, padding: "8px 14px",
                boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
                animation: "float 4s ease-in-out infinite 0.6s",
                zIndex: 2,
            }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>3+</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", marginTop: 2 }}>YRS EXP</div>
            </div>

            {/* Floating badge — rating */}
            <div style={{
                position: "absolute", bottom: -16, left: -16,
                background: "rgba(14,11,28,0.97)",
                border: "1px solid rgba(251,191,36,0.22)",
                borderRadius: 14, padding: "8px 14px",
                boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
                animation: "float 4.8s ease-in-out infinite 1.1s",
                display: "flex", alignItems: "center", gap: 8, zIndex: 2,
            }}>
                <span style={{ color: "#fbbf24", fontSize: 16 }}>★</span>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>5.0</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Upwork</div>
                </div>
            </div>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AboutSection() {
    const [tab, setTab] = useState("skills");
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
        @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes avatarGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes cursorBlink{ 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ping       { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(2.2);opacity:0} }

        .ab-fade            { opacity:0; }
        .ab-fade.vis        { animation:slideUp 0.65s ease forwards; }

        .tab-btn            { cursor:pointer; outline:none; font-family:inherit; }
        .tab-btn:hover      { color:rgba(255,255,255,0.9) !important; }

        .tool-pill          { transition:all 0.2s ease; cursor:default; }
        .tool-pill:hover    { background:rgba(124,58,237,0.14) !important; border-color:rgba(167,139,250,0.35) !important; color:rgba(255,255,255,0.85) !important; transform:translateY(-2px); }

        .svc-card           { transition:all 0.25s ease; }
        .svc-card:hover     { transform:translateY(-4px); border-color:rgba(167,139,250,0.25) !important; box-shadow:0 16px 48px rgba(0,0,0,0.4) !important; }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .svc-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .about-section { padding: 72px 20px 64px !important; }
          .about-headline { font-size: 32px !important; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="about"
                className="about-section"
                style={{
                    background: "#09090f",
                    padding: "96px 48px 88px",
                    fontFamily: "'Geist','Inter','Helvetica Neue',sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background grid */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
                    backgroundSize: "72px 72px",
                }} />

                {/* Ambient blobs */}
                <div style={{ position: "absolute", top: -160, left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -100, right: "3%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

                {/* ── Container — max-width expanded ── */}
                <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

                    {/* ── Section label ── */}
                    <div className={`ab-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 16, animationDelay: "0s" }}>
                        <span style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
                            color: "#a78bfa", textTransform: "uppercase",
                            display: "inline-flex", alignItems: "center", gap: 10,
                        }}>
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,transparent,#a78bfa)", display: "inline-block" }} />
                            About Me
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,#a78bfa,transparent)", display: "inline-block" }} />
                        </span>
                    </div>

                    {/* ── Headline ── */}
                    <div className={`ab-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 12, animationDelay: "0.1s" }}>
                        <h2 className="about-headline" style={{
                            fontSize: 46, fontWeight: 800, color: "#fff",
                            letterSpacing: "-1.8px", lineHeight: 1.08, margin: 0,
                        }}>
                            The developer behind<br />
                            <span style={{ color: "#a78bfa" }}>the code.</span>
                        </h2>
                    </div>

                    {/* ── Tagline ── */}
                    <div className={`ab-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 64, animationDelay: "0.2s" }}>
                        <p style={{
                            fontSize: 17, color: "rgba(255,255,255,0.36)",
                            margin: "14px auto 0", maxWidth: 520, lineHeight: 1.7, fontWeight: 400,
                        }}>
                            I think like a founder and build like an engineer.
                        </p>
                    </div>

                    {/* ── Main 2-col grid ── */}
                    <div className={`about-grid ab-fade${visible ? " vis" : ""}`} style={{ animationDelay: "0.3s" }}>

                        {/* ── Left col: Terminal avatar ── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                            <DevAvatar />

                            {/* Who I am — brief, no personal overshare */}
                            <div style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "0.5px solid rgba(255,255,255,0.07)",
                                borderRadius: 18, padding: "22px 24px",
                            }}>
                                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", lineHeight: 1.8 }}>
                                    I'm a{" "}
                                    <span style={{ color: "#fff", fontWeight: 600 }}>full-stack developer</span>{" "}
                                    who specialises in building fast, scalable web products with the MERN stack and Next.js.
                                    I've shipped{" "}
                                    <span style={{ color: "#a78bfa", fontWeight: 600 }}>15+ projects</span>{" "}
                                    for clients, from real-estate platforms to e-commerce solutions and custom web applications.
                                </div>
                                <div style={{
                                    marginTop: 18, display: "flex", alignItems: "center", gap: 10,
                                    paddingTop: 18, borderTop: "0.5px solid rgba(255,255,255,0.06)",
                                }}>
                                    <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", position: "absolute", inset: 0 }} />
                                        <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px solid rgba(34,197,94,0.4)", animation: "ping 2s ease-in-out infinite" }} />
                                    </div>
                                    <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 500 }}>
                                        Open to freelance & full-time opportunities
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ── Right col: Tabs ── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

                            {/* Tab bar */}
                            <div style={{
                                display: "inline-flex", gap: 2,
                                background: "rgba(255,255,255,0.04)",
                                border: "0.5px solid rgba(255,255,255,0.07)",
                                borderRadius: 13, padding: 4,
                                marginBottom: 28, alignSelf: "center",
                            }}>
                                {[
                                    { key: "skills", label: "Skills" },
                                    { key: "tools", label: "Stack" },
                                    { key: "services", label: "Services" },
                                ].map(({ key, label }) => (
                                    <button
                                        key={key}
                                        className="tab-btn"
                                        onClick={() => setTab(key)}
                                        style={{
                                            fontSize: 13, fontWeight: 600,
                                            padding: "8px 20px", borderRadius: 10,
                                            color: tab === key ? "#fff" : "rgba(255,255,255,0.35)",
                                            background: tab === key ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "transparent",
                                            boxShadow: tab === key ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
                                            transition: "all 0.22s ease",
                                            border: "none", letterSpacing: "-0.2px",
                                        }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* ── Skills tab ── */}
                            {tab === "skills" && (
                                <div style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "0.5px solid rgba(255,255,255,0.07)",
                                    borderRadius: 18, padding: "28px 28px",
                                    width: "100%",
                                }}>
                                    <div style={{ marginBottom: 24 }}>
                                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 6px" }}>
                                            Technical Proficiency
                                        </h3>
                                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", margin: 0 }}>
                                            Built across 15+ real-world client projects.
                                        </p>
                                    </div>
                                    {SKILLS.map((s, i) => (
                                        <SkillBar key={s.label} {...s} delay={i * 130} />
                                    ))}

                                    {/* Approach callout */}
                                    <div style={{
                                        marginTop: 24, padding: "16px 18px",
                                        background: "rgba(124,58,237,0.07)",
                                        border: "0.5px solid rgba(167,139,250,0.15)",
                                        borderRadius: 13,
                                        display: "flex", gap: 12, alignItems: "flex-start",
                                    }}>
                                        <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
                                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                                            I don't just write code — I take ownership. Every project gets the same care
                                            I'd give my own product.
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Stack tab ── */}
                            {tab === "tools" && (
                                <div style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "0.5px solid rgba(255,255,255,0.07)",
                                    borderRadius: 18, padding: "28px 28px",
                                    width: "100%",
                                }}>
                                    <div style={{ marginBottom: 24 }}>
                                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 6px" }}>
                                            My Tech Stack
                                        </h3>
                                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", margin: 0 }}>
                                            Tools I reach for to build production-grade products.
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                                        {TOOLS.map((t) => (
                                            <span key={t} className="tool-pill" style={{
                                                fontSize: 12, fontWeight: 500,
                                                color: "rgba(255,255,255,0.52)",
                                                background: "rgba(255,255,255,0.04)",
                                                border: "0.5px solid rgba(255,255,255,0.09)",
                                                padding: "8px 16px", borderRadius: 99,
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Primary stack highlight */}
                                    <div style={{
                                        background: "rgba(10,8,22,0.8)",
                                        border: "0.5px solid rgba(255,255,255,0.07)",
                                        borderRadius: 13, padding: "16px 20px",
                                    }}>
                                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                                            Primary Stack
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                                            {[
                                                { label: "MongoDB", color: "#4ade80" },
                                                { label: "Express", color: "rgba(255,255,255,0.45)" },
                                                { label: "React", color: "#60d9fa" },
                                                { label: "Node.js", color: "#86efac" },
                                                { label: "Next.js", color: "#fff" },
                                            ].map((item, i) => (
                                                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    {i > 0 && <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 16 }}>+</span>}
                                                    <span style={{ fontSize: 14, fontWeight: 700, color: item.color, letterSpacing: "-0.3px" }}>
                                                        {item.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Services tab ── */}
                            {tab === "services" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                                    {SERVICES.map((s) => (
                                        <div key={s.title} className="svc-card" style={{
                                            background: "rgba(255,255,255,0.02)",
                                            border: "0.5px solid rgba(255,255,255,0.07)",
                                            borderRadius: 18, padding: "22px 24px",
                                            width: "100%",
                                        }}>
                                            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                                <div style={{
                                                    width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                                                    background: `${s.color}14`,
                                                    border: `0.5px solid ${s.color}33`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    color: s.color,
                                                }}>
                                                    {s.icon}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px", marginBottom: 6 }}>
                                                        {s.title}
                                                    </div>
                                                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, marginBottom: 12 }}>
                                                        {s.desc}
                                                    </div>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                                        {s.tags.map(tag => (
                                                            <span key={tag} style={{
                                                                fontSize: 10, fontWeight: 600,
                                                                color: s.color,
                                                                background: `${s.color}12`,
                                                                border: `0.5px solid ${s.color}30`,
                                                                padding: "3px 10px", borderRadius: 99,
                                                            }}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>



                </div>
            </section>
        </>
    );
}