"use client";

import { useEffect, useRef, useState } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────
const NAV_LINKS = ["work", "services", "about", "tech-stack"];

const STATS = [
    { n: "15+", l: "Projects Delivered" },
    { n: "3+", l: "Years Experience" },
    { n: "5.0", l: "Upwork Rating" },
];

const TRUST_COUNTRIES = ["United States", "UAE", "UK", "Saudi Arabia"];

const BUILD_STEPS = [
    {
        id: 1,
        label: "Idea",
        tooltip: "Product strategy",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
    },
    {
        id: 2,
        label: "Design",
        tooltip: "UI/UX architecture",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        ),
    },
    {
        id: 3,
        label: "Dev",
        tooltip: "MERN / Next.js coding",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: 4,
        label: "Launch",
        tooltip: "Deployment & scaling",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
        ),
    },
];

// ── Dot Grid ───────────────────────────────────────────────────────────────────
function DotGrid() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let dots = [];

        function initDots() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            dots = [];
            const gap = 32;
            for (let x = gap; x < canvas.width - gap; x += gap)
                for (let y = gap; y < canvas.height - gap; y += gap)
                    dots.push({ x, y, phase: Math.random() * Math.PI * 2, speed: 0.25 + Math.random() * 0.35 });
        }

        function draw(t) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach((d) => {
                const o = 0.05 + 0.13 * (0.5 + 0.5 * Math.sin(t * d.speed + d.phase));
                ctx.beginPath();
                ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${o})`;
                ctx.fill();
            });
            animRef.current = requestAnimationFrame((ts) => draw(ts / 1000));
        }

        initDots();
        draw(0);
        const ro = new ResizeObserver(initDots);
        ro.observe(canvas);
        return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />
    );
}

// ── Build Process Widget ───────────────────────────────────────────────────────
const STEP_META = [
    {
        color: "#a78bfa", glow: "rgba(167,139,250,0.35)", bg: "rgba(124,58,237,0.1)",
        border: "rgba(167,139,250,0.25)", tags: ["Discovery", "Wireframe", "Scope"],
        desc: "Deep-dive into goals, users & scope before a single pixel is drawn.",
        gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)",
    },
    {
        color: "#60d9fa", glow: "rgba(96,217,250,0.3)", bg: "rgba(59,130,246,0.1)",
        border: "rgba(96,217,250,0.22)", tags: ["Figma", "UI Kit", "Prototype"],
        desc: "High-fidelity mockups with component systems & interaction flows.",
        gradient: "linear-gradient(135deg,#0ea5e9,#60d9fa)",
    },
    {
        color: "#4ade80", glow: "rgba(74,222,128,0.3)", bg: "rgba(34,197,94,0.1)",
        border: "rgba(74,222,128,0.22)", tags: ["MERN", "Next.js", "REST API"],
        desc: "Clean, scalable code. Full-stack from DB schema to polished UI.",
        gradient: "linear-gradient(135deg,#16a34a,#4ade80)",
    },
    {
        color: "#fb923c", glow: "rgba(251,146,60,0.3)", bg: "rgba(234,88,12,0.1)",
        border: "rgba(251,146,60,0.22)", tags: ["Vercel", "CI/CD", "Monitor"],
        desc: "Zero-downtime deploy, performance audits & post-launch support.",
        gradient: "linear-gradient(135deg,#ea580c,#fb923c)",
    },
];

function BuildProcess() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);
    const [lineAnim, setLineAnim] = useState(1);
    const [entering, setEntering] = useState(false);

    // Auto-cycle
    useEffect(() => {
        const t = setInterval(() => {
            setEntering(true);
            setTimeout(() => {
                setActive(p => (p + 1) % BUILD_STEPS.length);
                setEntering(false);
            }, 200);
        }, 2800);
        return () => clearInterval(t);
    }, []);

    // Line fill per step change
    useEffect(() => {
        setLineAnim(0);
        let raf, start = null;
        function tick(ts) {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 700, 1);
            setLineAnim(1 - Math.pow(1 - p, 3));
            if (p < 1) raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active]);

    const meta = STEP_META[active];

    function segFill(i) {
        if (active > i + 1) return 1;
        if (active === i + 1) return lineAnim;
        return 0;
    }

    return (
        <div className="build-card" style={{
            background: "linear-gradient(160deg, rgba(14,12,26,0.97) 0%, rgba(10,10,20,0.97) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24,
            overflow: "hidden",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            animation: "float 5s ease-in-out infinite",
            transition: "box-shadow 0.3s",
            boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)`,
            position: "relative",
        }}>

            {/* Ambient glow behind active step */}
            <div style={{
                position: "absolute", top: -60, right: -60, width: 220, height: 220,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${meta.glow} 0%, transparent 70%)`,
                transition: "background 0.6s ease",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div style={{ position: "relative", zIndex: 1, padding: "20px 20px 18px" }}>

                {/* ── Header ── */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 12,
                            background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 16px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1.2 }}>
                                Build Process
                            </div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                                From idea to scalable product
                            </div>
                        </div>
                    </div>
                    {/* Live badge */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: "rgba(34,197,94,0.07)",
                        border: "1px solid rgba(34,197,94,0.18)",
                        borderRadius: 20, padding: "5px 11px",
                    }}>
                        <div style={{ position: "relative", width: 7, height: 7 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", position: "absolute", inset: 0 }} />
                            <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px solid rgba(34,197,94,0.45)", animation: "ping 2s ease-in-out infinite" }} />
                        </div>
                        <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 600, letterSpacing: "0.01em" }}>Live</span>
                    </div>
                </div>

                {/* ── Step nodes ── */}
                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 18, gap: 0 }}>
                    {BUILD_STEPS.map((s, i) => {
                        const isAct = i === active;
                        const isDone = i < active;
                        const isHov = hovered === i;
                        const m = STEP_META[i];
                        const fill = segFill(i);

                        return (
                            <div key={s.id} style={{ display: "flex", alignItems: "flex-start", flex: i < BUILD_STEPS.length - 1 ? "1" : "0 0 auto" }}>

                                {/* Node column */}
                                <div
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", position: "relative", flexShrink: 0 }}
                                >
                                    {/* Tooltip */}
                                    {isHov && (
                                        <div style={{
                                            position: "absolute", bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
                                            background: "rgba(8,8,16,0.97)",
                                            border: `1px solid ${m.border}`,
                                            borderRadius: 10, padding: "8px 14px",
                                            fontSize: 12, color: "rgba(255,255,255,0.85)",
                                            whiteSpace: "nowrap", zIndex: 30, pointerEvents: "none",
                                            boxShadow: `0 12px 32px rgba(0,0,0,0.7), 0 0 20px ${m.glow}`,
                                        }}>
                                            <div style={{ fontWeight: 700, color: m.color, fontSize: 11, marginBottom: 2 }}>{s.label}</div>
                                            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{s.tooltip}</div>
                                            <div style={{
                                                position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                                                borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                                                borderTop: `5px solid ${m.border}`,
                                            }} />
                                        </div>
                                    )}

                                    {/* Outer glow ring for active */}
                                    <div style={{
                                        width: 54, height: 54, borderRadius: "50%",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative",
                                        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                                        transform: isAct ? "scale(1.12)" : isHov ? "scale(1.06)" : "scale(1)",
                                    }}>
                                        {/* Pulse ring */}
                                        {isAct && (
                                            <div style={{
                                                position: "absolute", inset: -5, borderRadius: "50%",
                                                border: `1.5px solid ${m.color}55`,
                                                animation: "stepPulse 2s ease-in-out infinite",
                                                pointerEvents: "none",
                                            }} />
                                        )}
                                        {/* Main circle */}
                                        <div style={{
                                            width: 54, height: 54, borderRadius: "50%",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            transition: "all 0.35s ease",
                                            background: isAct
                                                ? m.gradient
                                                : isDone ? m.bg : "rgba(255,255,255,0.04)",
                                            border: isAct
                                                ? `2px solid ${m.color}`
                                                : isDone ? `1.5px solid ${m.border}` : "1.5px solid rgba(255,255,255,0.08)",
                                            boxShadow: isAct
                                                ? `0 0 28px ${m.glow}, 0 0 56px ${m.glow.replace("0.35", "0.15")}, inset 0 1px 0 rgba(255,255,255,0.25)`
                                                : isDone ? `0 0 14px ${m.glow.replace("0.35", "0.15")}` : "none",
                                            color: isAct ? "#fff" : isDone ? m.color : "rgba(255,255,255,0.2)",
                                        }}>
                                            {isDone ? (
                                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : s.icon}
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{
                                            fontSize: 11, fontWeight: isAct ? 700 : 400,
                                            color: isAct ? m.color : isDone ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                                            letterSpacing: "-0.1px", transition: "color 0.3s",
                                        }}>
                                            {s.label}
                                        </div>
                                        {isAct && (
                                            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>
                                                {i + 1}/{BUILD_STEPS.length}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Connector */}
                                {i < BUILD_STEPS.length - 1 && (
                                    <div style={{
                                        flex: 1, height: 2, margin: "0 3px",
                                        position: "relative", top: 26, borderRadius: 2,
                                        background: "rgba(255,255,255,0.05)", overflow: "visible",
                                    }}>
                                        {/* Fill bar */}
                                        <div style={{
                                            position: "absolute", inset: 0, borderRadius: 2,
                                            background: `linear-gradient(90deg, ${STEP_META[i].color}, ${STEP_META[i + 1].color})`,
                                            transformOrigin: "left center",
                                            transform: `scaleX(${fill})`,
                                            boxShadow: fill > 0 ? `0 0 8px ${STEP_META[i].glow}` : "none",
                                            transition: "transform 0.06s linear",
                                        }} />
                                        {/* Traveling spark */}
                                        {active === i + 1 && lineAnim > 0 && lineAnim < 1 && (
                                            <div style={{
                                                position: "absolute", top: "50%",
                                                left: `calc(${lineAnim * 100}% - 4px)`,
                                                transform: "translateY(-50%)",
                                                width: 8, height: 8, borderRadius: "50%",
                                                background: STEP_META[i].color,
                                                boxShadow: `0 0 12px ${STEP_META[i].color}, 0 0 24px ${STEP_META[i].glow}`,
                                                zIndex: 5,
                                            }} />
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Active step detail panel ── */}
                <div style={{
                    background: meta.bg,
                    border: `1px solid ${meta.border}`,
                    borderRadius: 16,
                    padding: "14px 16px",
                    marginBottom: 14,
                    transition: "all 0.4s ease",
                    opacity: entering ? 0 : 1,
                    transform: entering ? "translateY(4px)" : "translateY(0)",
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        {/* Icon */}
                        <div style={{
                            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                            background: meta.gradient,
                            border: `1px solid ${meta.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff",
                            boxShadow: `0 4px 16px ${meta.glow}`,
                        }}>
                            {BUILD_STEPS[active].icon}
                        </div>

                        {/* Text */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: meta.color, letterSpacing: "-0.4px" }}>
                                    {BUILD_STEPS[active].label}
                                </span>
                                <span style={{
                                    fontSize: 10, fontWeight: 600, letterSpacing: "0.02em",
                                    color: meta.color, background: `${meta.bg}`,
                                    border: `0.5px solid ${meta.border}`,
                                    padding: "2px 8px", borderRadius: 20,
                                }}>
                                    0{active + 1} / 0{BUILD_STEPS.length}
                                </span>
                            </div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: 10 }}>
                                {meta.desc}
                            </div>
                            {/* Tags */}
                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                {meta.tags.map((tag) => (
                                    <span key={tag} style={{
                                        fontSize: 10, fontWeight: 600,
                                        color: meta.color,
                                        background: `${meta.color}16`,
                                        border: `0.5px solid ${meta.border}`,
                                        padding: "3px 10px", borderRadius: 20,
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Vertical progress track */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, paddingTop: 4 }}>
                            {BUILD_STEPS.map((_, i) => (
                                <div key={i} style={{
                                    width: 3,
                                    height: i === active ? 24 : 6,
                                    borderRadius: 2,
                                    background: i === active ? STEP_META[i].color
                                        : i < active ? `${STEP_META[i].color}55`
                                            : "rgba(255,255,255,0.07)",
                                    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                                    boxShadow: i === active ? `0 0 8px ${STEP_META[i].glow}` : "none",
                                }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom: stack pills ── */}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginRight: 2 }}>stack</span>
                    {["MongoDB", "Express", "React", "Node.js", "Next.js", "WP"].map((t) => (
                        <span key={t} style={{
                            fontSize: 10, color: "rgba(255,255,255,0.35)",
                            background: "rgba(255,255,255,0.04)",
                            border: "0.5px solid rgba(255,255,255,0.08)",
                            padding: "3px 10px", borderRadius: 20,
                        }}>{t}</span>
                    ))}
                </div>

            </div>
        </div>
    );
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            <style>{`
        @keyframes ping      { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.9);opacity:0} }
        @keyframes bob       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes stepPulse { 0%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.35);opacity:0.2} 100%{transform:scale(1);opacity:0.7} }
        .hero-fade         { opacity:0; animation:fadeUp 0.6s ease forwards; }
        .nl-link           { transition:color 0.2s; }
        .nl-link:hover     { color:rgba(255,255,255,0.9) !important; }
        .hire-btn          { transition:all 0.2s; }
        .hire-btn:hover    { background:rgba(167,139,250,0.14) !important; border-color:rgba(167,139,250,0.5) !important; }
        .btn-primary       { transition:all 0.22s; }
        .btn-primary:hover { background:#6d28d9 !important; transform:translateY(-2px); }
        .btn-ghost         { transition:all 0.22s; }
        .btn-ghost:hover   { background:rgba(255,255,255,0.1) !important; transform:translateY(-2px); }
        .build-card:hover  { box-shadow:0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07) !important; }
        @media (max-width:768px) {
          .hero-grid  { grid-template-columns:1fr !important; }
          .right-col  { display:block !important; margin-top:32px; }
          .hero-h1    { font-size:38px !important; letter-spacing:-1.5px !important; }
          .hero-h1 br { display:none !important; }
          .hero-inner { width:100% !important; padding-left:20px !important; padding-right:20px !important; }
          .nav-links  { display:none !important; }
          .hire-btn   { font-size:12px !important; padding:6px 16px !important; }
          .logo       { font-size:18px !important; }
        }
      `}</style>

            <section style={{
                background: "#09090f",
                borderRadius: 20,
                overflow: "hidden",
                border: "0.5px solid rgba(255,255,255,0.07)",
                position: "relative",
                fontFamily: "'Geist','Inter','Helvetica Neue',sans-serif",

            }}>
                {mounted && <DotGrid />}

                {/* ── Navbar ── */}
                <nav className="hero-inner" style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "22px 40px",
                    position: "relative", zIndex: 2,
                    borderBottom: "0.5px solid rgba(255,255,255,0.055)",
                    width: "90%",
                    margin: "0 auto"
                }}>
                    <div className="logo" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.8px" }}>
                        kaif<span style={{ color: "#a78bfa" }}>.</span>dev
                    </div>
                    <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                        {NAV_LINKS.map((link) => (
                            <a key={link} href={`#${link}`} className="nl-link"
                                style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", textDecoration: "none", fontWeight: 400 }}>
                                {link}
                            </a>
                        ))}
                    </div>
                    <a href="#contact" className="hire-btn" style={{
                        fontSize: 14, color: "#a78bfa",
                        border: "1px solid rgba(167,139,250,0.32)",
                        padding: "8px 22px", borderRadius: 24,
                        textDecoration: "none", fontWeight: 500,
                    }}>
                        hire me ↗
                    </a>
                </nav>

                {/* ── Hero Body ── */}
                <div className="hero-grid hero-inner" style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: 52, padding: "68px 40px 60px",
                    position: "relative", zIndex: 2, alignItems: "center",
                    width: "90%",
                    margin: "0 auto"
                }}>

                    {/* ── Left Column ── */}
                    <div>
                        {/* Availability badge */}
                        <div className="hero-fade" style={{
                            animationDelay: "0.15s",
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "rgba(34,197,94,0.07)",
                            border: "1px solid rgba(34,197,94,0.18)",
                            borderRadius: 24, padding: "7px 16px", marginBottom: 28,
                        }}>
                            <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", position: "absolute", inset: 0 }} />
                                <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px solid rgba(34,197,94,0.35)", animation: "ping 2s ease-in-out infinite" }} />
                            </div>
                            <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 500 }}>Available for new projects</span>
                        </div>

                        {/* Headline */}
                        <h1 className="hero-h1 hero-fade" style={{
                            fontSize: 52,
                            fontWeight: 700,
                            color: "#fff",
                            lineHeight: 1.1,
                            letterSpacing: "-2px",
                            margin: "0 0 18px",
                            animationDelay: "0.3s",
                        }}>
                            I build fast,<br />
                            {" "}modern web apps{" "} <br />
                            <span style={{ color: "#a78bfa" }}>with AI.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="hero-fade" style={{
                            fontSize: 17,
                            color: "rgba(255,255,255,0.42)",
                            lineHeight: 1.75,
                            margin: "0 0 38px",
                            maxWidth: 400,
                            animationDelay: "0.45s",
                            fontWeight: 400,
                        }}>
                            Building scalable<span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}> SaaS and Web Applications</span>{" "}
                            using modern full-stack technologies.{" "}

                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-fade" style={{
                            display: "flex", gap: 12, flexWrap: "wrap",
                            marginBottom: 52, animationDelay: "0.6s",
                        }}>
                            <a href="#work" className="btn-primary" style={{
                                background: "#7c3aed", color: "#fff",
                                fontSize: 15, fontWeight: 600,
                                padding: "13px 30px", borderRadius: 12,
                                textDecoration: "none", display: "inline-block",
                                letterSpacing: "-0.2px",
                            }}>
                                View my work
                            </a>
                            <a href="#ask-kaif" className="btn-ghost" style={{
                                background: "rgba(255,255,255,0.055)", color: "rgba(255,255,255,0.75)",
                                fontSize: 15, fontWeight: 500,
                                padding: "13px 30px", borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.1)",
                                textDecoration: "none", display: "inline-flex",
                                alignItems: "center", gap: 8, letterSpacing: "-0.2px",
                            }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa" }} />
                                Ask my AI ↗
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="hero-fade" style={{ display: "flex", alignItems: "center", animationDelay: "0.75s" }}>
                            {STATS.map((s, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                    {i > 0 && (
                                        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.1)", margin: "0 28px" }} />
                                    )}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                        <span style={{ fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-1.2px", lineHeight: 1 }}>
                                            {s.n}
                                        </span>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>
                                            {s.l}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right Column ── */}
                    <div className="right-col hero-fade" style={{ animationDelay: "0.9s" }}>
                        <BuildProcess />
                    </div>
                </div>

                {/* ── Trust Strip ── */}


                {/* ── Scroll Hint ── */}
                <div style={{
                    display: "flex", justifyContent: "center",
                    padding: "4px 0 18px",
                    marginTop: "-45px",
                    position: "relative", zIndex: 2,
                    animation: "bob 2.5s ease-in-out infinite",
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em" }}>scroll</span>
                        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)" }} />
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </section>
        </>
    );
}