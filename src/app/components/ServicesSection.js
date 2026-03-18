"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ───────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: "mern",
        num: "01",
        title: "MERN Stack",
        subtitle: "Full-Stack Web Apps",
        color: "#a78bfa",
        glow: "rgba(124,58,237,0.28)",
        border: "rgba(167,139,250,0.3)",
        accent: "rgba(124,58,237,0.1)",
        gradient: "linear-gradient(160deg, rgba(124,58,237,0.14) 0%, rgba(79,70,229,0.06) 100%)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        tagline: "From idea to deployed product.",
        desc: "I build complete, production-ready web applications using MongoDB, Express, React, and Node.js. Whether it's a SaaS dashboard, a marketplace, or a real-time platform — I handle the full stack end-to-end.",
        features: [
            "REST API design & development",
            "JWT / session-based auth",
            "Real-time features with Socket.io",
            "Admin panels & dashboards",
            "Cloudinary media management",
            "Role-based access control",
        ],
        stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "JWT", "Cloudinary"],
        deliverable: "Fully deployed, production-ready web app",
    },
    {
        id: "nextjs",
        num: "02",
        title: "Next.js",
        subtitle: "Modern Web Experiences",
        color: "#60d9fa",
        glow: "rgba(96,217,250,0.22)",
        border: "rgba(96,217,250,0.3)",
        accent: "rgba(59,130,246,0.1)",
        gradient: "linear-gradient(160deg, rgba(96,217,250,0.12) 0%, rgba(59,130,246,0.05) 100%)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        tagline: "Fast, SEO-ready, scales to millions.",
        desc: "I build performance-first web apps with Next.js App Router — server components, SSR, SSG, ISR. Your site loads instantly, ranks on Google, and handles traffic without breaking a sweat.",
        features: [
            "App Router & Server Components",
            "SSR / SSG / ISR strategies",
            "SEO optimisation built-in",
            "API routes & middleware",
            "Vercel / custom deployment",
            "Authentication with NextAuth",
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth", "Vercel"],
        deliverable: "Lightning-fast, SEO-optimised web platform",
    },
    {
        id: "wordpress",
        num: "03",
        title: "WordPress",
        subtitle: "Business Websites & Stores",
        color: "#4ade80",
        glow: "rgba(74,222,128,0.22)",
        border: "rgba(74,222,128,0.3)",
        accent: "rgba(34,197,94,0.1)",
        gradient: "linear-gradient(160deg, rgba(74,222,128,0.12) 0%, rgba(34,197,94,0.05) 100%)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        tagline: "Professional sites, no code headaches.",
        desc: "I build pixel-perfect WordPress websites using Elementor and custom themes. From marketing agency sites to WooCommerce stores — clean, fast, and easy for you to manage after handoff.",
        features: [
            "Custom Elementor design",
            "WooCommerce store setup",
            "Speed & performance tuning",
            "On-page SEO configuration",
            "Mobile-responsive layouts",
            "Plugin setup & configuration",
        ],
        stack: ["WordPress", "Elementor", "WooCommerce", "PHP", "Custom CSS", "cPanel"],
        deliverable: "Polished, client-manageable website",
    },
];

// ── Service Card ───────────────────────────────────────────────────────────────
function ServiceCard({ service: s, isExpanded, onHover, index, totalVisible }) {
    const cardRef = useRef(null);

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => onHover(s.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onHover(s.id)}
            style={{
                flex: isExpanded ? "3.5" : "1",
                minWidth: 0,
                transition: "flex 0.65s cubic-bezier(0.16,1,0.3,1)",
                position: "relative",
                cursor: "default",
            }}
        >
            <div style={{
                height: "100%",
                background: isExpanded
                    ? `linear-gradient(160deg, rgba(16,12,30,0.99) 0%, rgba(10,8,22,0.99) 100%)`
                    : "rgba(11,9,22,0.95)",
                border: `1px solid ${isExpanded ? s.border : "rgba(255,255,255,0.07)"}`,
                borderRadius: 22,
                overflow: "hidden",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                boxShadow: isExpanded
                    ? `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${s.color}15, 0 0 80px ${s.glow}`
                    : "0 4px 24px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}>

                {/* Gradient wash on expand */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: 22,
                    background: s.gradient,
                    opacity: isExpanded ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: "none",
                }} />

                {/* Top ambient glow */}
                <div style={{
                    position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
                    width: 200, height: 200, borderRadius: "50%",
                    background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
                    opacity: isExpanded ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: "none",
                }} />

                {/* ── Collapsed view — always visible ── */}
                <div style={{
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: isExpanded ? "row" : "column",
                    alignItems: isExpanded ? "flex-start" : "flex-start",
                    gap: isExpanded ? 40 : 0,
                    flex: 1,
                    position: "relative", zIndex: 1,
                    transition: "flex-direction 0s",
                    overflow: "hidden",
                }} className="svc-card-inner">

                    {/* ── Left / top identity block ── */}
                    <div style={{
                        flexShrink: 0,
                        width: isExpanded ? 260 : "100%",
                        transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }} className="svc-identity">
                        {/* Number */}
                        <div style={{
                            fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
                            color: "rgba(255,255,255,0.12)", fontFamily: "monospace",
                            marginBottom: 20,
                        }}>
                            {s.num}
                        </div>

                        {/* Icon */}
                        <div style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: `${s.color}14`,
                            border: `1px solid ${s.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: s.color,
                            marginBottom: 24,
                            transition: "all 0.4s ease",
                            boxShadow: isExpanded ? `0 0 24px ${s.glow}` : "none",
                        }}>
                            {s.icon}
                        </div>

                        {/* Title */}
                        <h3 style={{
                            fontSize: isExpanded ? 30 : 22,
                            fontWeight: 800, color: "#fff",
                            letterSpacing: "-0.7px", lineHeight: 1.1,
                            margin: "0 0 6px",
                            transition: "font-size 0.4s ease",
                            whiteSpace: "nowrap",
                        }}>
                            {s.title}
                        </h3>

                        {/* Subtitle */}
                        <div style={{
                            fontSize: 12, fontWeight: 500,
                            color: s.color,
                            letterSpacing: "0.02em",
                            marginBottom: isExpanded ? 16 : 0,
                            opacity: 0.85,
                        }}>
                            {s.subtitle}
                        </div>

                        {/* Tagline — only expanded */}
                        <div
                            className={`svc-tagline${isExpanded ? " active" : ""}`}
                            style={{
                                fontSize: 13, color: "rgba(255,255,255,0.38)",
                                lineHeight: 1.6, marginTop: 10,
                                maxWidth: 220,
                                opacity: isExpanded ? 1 : 0,
                                transform: isExpanded ? "translateY(0)" : "translateY(8px)",
                                transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
                                pointerEvents: isExpanded ? "auto" : "none",
                                height: isExpanded ? "auto" : 0,
                                overflow: "hidden",
                            }}>
                            {s.tagline}
                        </div>

                        {/* Divider + CTA — only expanded */}
                        <div
                            className={`svc-quote-btn${isExpanded ? " active" : ""}`}
                            style={{
                                marginTop: 28,
                                opacity: isExpanded ? 1 : 0,
                                transform: isExpanded ? "translateY(0)" : "translateY(10px)",
                                transition: "opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s",
                                pointerEvents: isExpanded ? "auto" : "none",
                            }}>
                            <a
                                href="#contact"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    background: s.color, color: "#000",
                                    fontSize: 12, fontWeight: 700,
                                    padding: "10px 20px", borderRadius: 10,
                                    textDecoration: "none",
                                    boxShadow: `0 4px 18px ${s.glow}`,
                                    transition: "all 0.25s ease",
                                    whiteSpace: "nowrap",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(1.1)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}
                            >
                                Get a Quote ↗
                            </a>
                        </div>
                    </div>

                    {/* ── Right / expanded content ── */}
                    <div
                        className={`svc-expanded-content${isExpanded ? " active" : ""}`}
                        style={{
                            flex: 1, minWidth: 0,
                            opacity: isExpanded ? 1 : 0,
                            transform: isExpanded ? "translateX(0)" : "translateX(20px)",
                            transition: "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s",
                            pointerEvents: isExpanded ? "auto" : "none",
                            display: "flex", flexDirection: "column", gap: 24,
                            paddingTop: 4,
                        }}>
                        {/* Description */}
                        <p style={{
                            fontSize: 14, color: "rgba(255,255,255,0.48)",
                            lineHeight: 1.8, margin: 0,
                        }}>
                            {s.desc}
                        </p>

                        {/* Features grid */}
                        <div>
                            <div style={{
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                                color: "rgba(255,255,255,0.22)", textTransform: "uppercase",
                                marginBottom: 14,
                            }}>
                                What's included
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                                {s.features.map((f, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                                        <div style={{
                                            width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                                            background: `${s.color}18`, border: `0.5px solid ${s.border}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stack pills */}
                        <div>
                            <div style={{
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                                color: "rgba(255,255,255,0.22)", textTransform: "uppercase",
                                marginBottom: 12,
                            }}>
                                Tech stack
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                {s.stack.map(t => (
                                    <span key={t} style={{
                                        fontSize: 11, fontWeight: 600,
                                        color: s.color, background: s.accent,
                                        border: `0.5px solid ${s.border}`,
                                        padding: "4px 12px", borderRadius: 99,
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Deliverable badge */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 10,
                            background: "rgba(255,255,255,0.03)",
                            border: "0.5px solid rgba(255,255,255,0.08)",
                            borderRadius: 12, padding: "12px 16px",
                            alignSelf: "flex-start",
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                                {s.deliverable}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Collapsed indicator strip at bottom ── */}
                <div style={{
                    height: 2, margin: "0 28px 20px",
                    background: `linear-gradient(90deg, ${s.color}55, transparent)`,
                    borderRadius: 99,
                    opacity: isExpanded ? 0 : 0.6,
                    transition: "opacity 0.3s ease",
                }} />
            </div>
        </div>
    );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function ServicesSection() {
    const [expanded, setExpanded] = useState("nextjs");
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .svc-fade     { opacity:0; }
        .svc-fade.vis { animation:fadeUp 0.65s ease forwards; }

        @media (max-width: 768px) {
          .svc-section { padding: 64px 20px 56px !important; }
          .svc-heading { font-size: 34px !important; letter-spacing: -1px !important; }
          .svc-subtext { font-size: 14px !important; }
          .svc-row { flex-direction: column !important; height: auto !important; gap: 12px !important; }
          .svc-row > div { flex: none !important; width: 100% !important; }
          .svc-card-inner { flex-direction: column !important; gap: 20px !important; }
          .svc-identity { width: 100% !important; }
          .svc-tagline { display: none !important; }
          .svc-tagline.active { display: block !important; }
          .svc-quote-btn { display: none !important; }
          .svc-quote-btn.active { display: block !important; }
          .svc-expanded-content { display: none !important; }
          .svc-expanded-content.active { display: flex !important; opacity: 1 !important; transform: none !important; }
          .svc-cta-strip { flex-direction: column !important; text-align: center !important; padding: 20px !important; }
          .svc-cta-strip a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="services"
                className="svc-section"
                style={{
                    background: "#09090f",
                    padding: "96px 48px 88px",
                    fontFamily: "'Geist','Inter','Helvetica Neue',sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Grid bg */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`,
                    backgroundSize: "72px 72px",
                }} />

                {/* Blobs */}
                <div style={{ position: "absolute", top: -80, left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -60, right: "8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(96,217,250,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

                    {/* ── Header ── */}
                    <div className={`svc-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 14 }}>
                        <span style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#a78bfa",
                            textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10,
                        }}>
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,transparent,#a78bfa)", display: "inline-block" }} />
                            Services
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,#a78bfa,transparent)", display: "inline-block" }} />
                        </span>
                    </div>

                    <div className={`svc-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", animationDelay: "0.1s" }}>
                        <h2 className="svc-heading" style={{ fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: "-1.8px", lineHeight: 1.08, margin: 0 }}>
                            What I <span style={{ color: "#a78bfa" }}>build.</span>
                        </h2>
                    </div>

                    <div className={`svc-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 56, animationDelay: "0.18s" }}>
                        <p className="svc-subtext" style={{ fontSize: 16, color: "rgba(255,255,255,0.32)", margin: "12px auto 0", maxWidth: 460, lineHeight: 1.7 }}>
                            Hover a service to see what's included. Every project ships production-ready.
                        </p>
                    </div>

                    {/* ── Horizontal expand row ── */}
                    <div
                        className={`svc-row svc-fade${visible ? " vis" : ""}`}
                        style={{
                            display: "flex",
                            gap: 14,
                            height: 480,
                            alignItems: "stretch",
                            animationDelay: "0.28s",
                        }}
                    >
                        {SERVICES.map((s, i) => (
                            <ServiceCard
                                key={s.id}
                                service={s}
                                isExpanded={expanded === s.id}
                                onHover={(id) => { if (id) setExpanded(id); }}
                                index={i}
                                totalVisible={SERVICES.length}
                            />
                        ))}
                    </div>

                    {/* ── Bottom CTA strip ── */}
                    <div
                        className={`svc-fade${visible ? " vis" : ""} svc-cta-strip`}
                        // className="svc-cta-strip"
                        style={{
                            marginTop: 56,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 20,
                            padding: "28px 36px",
                            background: "rgba(255,255,255,0.02)",
                            border: "0.5px solid rgba(255,255,255,0.07)",
                            borderRadius: 20,
                            animationDelay: "0.38s",
                        }}
                    >
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: 5 }}>
                                Not sure which service you need?
                            </div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
                                Let's talk about your project and I'll tell you exactly what fits.
                            </div>
                        </div>
                        <a
                            href="#contact"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 9,
                                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                                color: "#fff",
                                fontSize: 14, fontWeight: 700,
                                padding: "13px 28px", borderRadius: 12,
                                textDecoration: "none",
                                boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
                                transition: "all 0.25s ease",
                                whiteSpace: "nowrap",
                                letterSpacing: "-0.2px",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(124,58,237,0.5)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(124,58,237,0.4)"; }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Let's Talk
                        </a>
                    </div>

                </div>
            </section>
        </>
    );
}