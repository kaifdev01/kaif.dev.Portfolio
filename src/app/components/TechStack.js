"use client";

import { useEffect, useRef, useState } from "react";

// ── Devicons CDN — cdn.jsdelivr.net/gh/devicons/devicon ───────────────────────
// invert: true  = white icon (for dark backgrounds like Express, GitHub, Next.js, Vercel)
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const TOOLS_DATA = {
    // Frontend
    "HTML5": { src: `${CDN}/html5/html5-original.svg` },
    "CSS3": { src: `${CDN}/css3/css3-original.svg` },
    "JavaScript": { src: `${CDN}/javascript/javascript-original.svg` },
    "React.js": { src: `${CDN}/react/react-original.svg` },
    "Next.js": { src: `${CDN}/nextjs/nextjs-original.svg`, invert: true },
    "Redux": { src: `${CDN}/redux/redux-original.svg` },
    "Bootstrap": { src: `${CDN}/bootstrap/bootstrap-original.svg` },
    "Tailwind CSS": { src: `${CDN}/tailwindcss/tailwindcss-original.svg` },
    // Backend
    "Node.js": { src: `${CDN}/nodejs/nodejs-original.svg` },
    "Express.js": { src: `${CDN}/express/express-original.svg`, invert: true },
    "MongoDB": { src: `${CDN}/mongodb/mongodb-original.svg` },
    "Mongoose": { src: `${CDN}/mongoose/mongoose-original.svg`, invert: true },
    "Socket.io": { src: `${CDN}/socketio/socketio-original.svg`, invert: true },
    "JWT Auth": { src: `${CDN}/javascript/javascript-original.svg`, label: "JWT" },
    "Multer": { src: `${CDN}/nodejs/nodejs-original.svg`, label: "Multer" },
    "REST APIs": { src: `${CDN}/postman/postman-original.svg` },
    // CMS
    "WordPress": { src: `${CDN}/wordpress/wordpress-original.svg` },
    "Elementor": { src: `${CDN}/wordpress/wordpress-original.svg` },
    "WooCommerce": { src: `${CDN}/woocommerce/woocommerce-original.svg` },
    "PHP": { src: `${CDN}/php/php-original.svg` },
    // Tools
    "Git": { src: `${CDN}/git/git-original.svg` },
    "GitHub": { src: `${CDN}/github/github-original.svg`, invert: true },
    "Vercel": { src: `${CDN}/vercel/vercel-original.svg`, invert: true },
    "Netlify": { src: `${CDN}/netlify/netlify-original.svg` },
    "Cloudinary": { src: `${CDN}/cloudinary/cloudinary-original.svg` },
    "Postman": { src: `${CDN}/postman/postman-original.svg` },
    "XAMPP": { src: `${CDN}/xampp/xampp-original.svg` },
    "VS Code": { src: `${CDN}/vscode/vscode-original.svg` },
    "Figma": { src: `${CDN}/figma/figma-original.svg` },
    "Photoshop": { src: `${CDN}/photoshop/photoshop-original.svg` },
    // Skills
    "SEO Basics": { src: `${CDN}/google/google-original.svg` },
    "UI/UX Design": { src: `${CDN}/figma/figma-original.svg` },
    "Debugging": { src: `${CDN}/chrome/chrome-original.svg` },
    "Performance": { src: `${CDN}/linux/linux-original.svg` },
    "Problem Solving": { src: `${CDN}/python/python-original.svg` },
    "Responsive Design": { src: `${CDN}/css3/css3-original.svg` },
    "API Testing": { src: `${CDN}/postman/postman-original.svg` },
    "API Integration": { src: `${CDN}/nodejs/nodejs-original.svg` },
};

const CATEGORIES = [
    {
        id: "frontend", label: "Frontend",
        color: "#60d9fa", accent: "rgba(96,217,250,0.12)", border: "rgba(96,217,250,0.25)",
        tools: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Redux", "Bootstrap", "Tailwind CSS"],
    },
    {
        id: "backend", label: "Backend",
        color: "#a78bfa", accent: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)",
        tools: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.io", "REST APIs", "JWT Auth", "Multer", "API Integration"],
    },
    {
        id: "cms", label: "CMS & Web",
        color: "#4ade80", accent: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.25)",
        tools: ["WordPress", "Elementor", "WooCommerce", "PHP"],
    },
    {
        id: "tools", label: "Tools & Deploy",
        color: "#fb923c", accent: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.25)",
        tools: ["Git", "GitHub", "Vercel", "Netlify", "Cloudinary", "Postman", "XAMPP", "VS Code", , "Photoshop"],
    },
    {
        id: "skills", label: "Other Skills",
        color: "#f472b6", accent: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.25)",
        tools: ["SEO Basics", "Debugging", "Performance", "Problem Solving", "Responsive Design", "API Testing"],
    },
];

const ALL_TOOLS = CATEGORIES.flatMap(c =>
    c.tools.map(name => ({ name, ...TOOLS_DATA[name], color: c.color, accent: c.accent, border: c.border }))
);

// ── Tool icon component ────────────────────────────────────────────────────────
function ToolIcon({ src, name, invert, size = 28 }) {
    const [errored, setErrored] = useState(false);

    if (errored) {
        // Fallback: colored initials box
        return (
            <div style={{
                width: size, height: size, borderRadius: 6,
                background: "rgba(167,139,250,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: "#a78bfa", letterSpacing: "-0.5px",
            }}>
                {name.slice(0, 2).toUpperCase()}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            width={size}
            height={size}
            onError={() => setErrored(true)}
            style={{
                display: "block",
                filter: invert ? "invert(1)" : "none",
                objectFit: "contain",
            }}
        />
    );
}

// ── Marquee ────────────────────────────────────────────────────────────────────
function MarqueeRow({ items, reverse = false, speed = 45 }) {
    const doubled = [...items, ...items];
    return (
        <div style={{
            overflow: "hidden",
            maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)",
            WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)",
        }}>
            <div style={{
                display: "flex", gap: 10,
                animation: `${reverse ? "marqueeRev" : "marquee"} ${speed}s linear infinite`,
                width: "max-content",
            }}>
                {doubled.map((t, i) => (
                    <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 9,
                        background: "rgba(255,255,255,0.03)",
                        border: "0.5px solid rgba(255,255,255,0.07)",
                        borderRadius: 99, padding: "9px 18px",
                        whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                        <ToolIcon src={t.src} name={t.name} invert={t.invert} size={16} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>
                            {t.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Tool Card ──────────────────────────────────────────────────────────────────
function ToolCard({ name, src, invert, accent, border, visible, delay }) {
    const [hov, setHov] = useState(false);

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov
                    ? "linear-gradient(160deg,rgba(18,14,34,0.99) 0%,rgba(10,8,22,0.99) 100%)"
                    : "rgba(11,9,21,0.95)",
                border: `1px solid ${hov ? border : "rgba(255,255,255,0.07)"}`,
                borderRadius: 18,
                padding: "26px 14px 20px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 12,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(22px) scale(0.96)",
                transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, border-color 0.3s, box-shadow 0.3s`,
                boxShadow: hov ? `0 10px 36px rgba(0,0,0,0.4), 0 0 0 1px ${border}` : "0 2px 12px rgba(0,0,0,0.2)",
                cursor: "default", position: "relative", overflow: "hidden", textAlign: "center",
            }}
        >
            {/* Hover glow */}
            <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at 50% 20%, ${accent} 0%, transparent 65%)`,
                opacity: hov ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none",
            }} />

            {/* Icon box */}
            <div style={{
                width: 56, height: 56, borderRadius: 15, flexShrink: 0,
                background: hov ? accent : "rgba(255,255,255,0.05)",
                border: `1px solid ${hov ? border : "rgba(255,255,255,0.08)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: hov ? `0 0 20px ${accent}` : "none",
                position: "relative", zIndex: 1,
            }}>
                <ToolIcon src={src} name={name} invert={invert} size={30} />
            </div>

            {/* Name */}
            <span style={{
                fontSize: 11, fontWeight: 700,
                color: hov ? "#fff" : "rgba(255,255,255,0.5)",
                letterSpacing: "-0.1px", lineHeight: 1.3,
                transition: "color 0.3s", position: "relative", zIndex: 1,
            }}>
                {name}
            </span>
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function TechStack() {
    const [activeTab, setActiveTab] = useState("frontend");
    const [visible, setVisible] = useState(false);
    const [cardsVis, setCardsVis] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); setTimeout(() => setCardsVis(true), 300); } },
            { threshold: 0.1 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const handleTab = (id) => {
        setCardsVis(false);
        setActiveTab(id);
        setTimeout(() => setCardsVis(true), 80);
    };

    const active = CATEGORIES.find(c => c.id === activeTab);
    const half = Math.ceil(ALL_TOOLS.length / 2);

    return (
        <>
            <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes marqueeRev{ from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .ts-fade      { opacity:0; }
        .ts-fade.vis  { animation:fadeUp 0.65s ease forwards; }
        .tab-btn      { cursor:pointer; border:none; font-family:inherit; outline:none; transition:all 0.25s ease; }
        .tab-btn:hover{ color:rgba(255,255,255,0.9) !important; }
        @media(max-width:1100px){ .tgrid{ grid-template-columns:repeat(4,1fr) !important; } }
        @media(max-width:700px) { .tgrid{ grid-template-columns:repeat(3,1fr) !important; } .sgrid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:480px) { .tgrid{ grid-template-columns:repeat(2,1fr) !important; } }
      `}</style>

            <section
                ref={sectionRef}
                id="stack"
                style={{
                    background: "#09090f", padding: "40px 0 0",
                    fontFamily: "'Geist','Inter','Helvetica Neue',sans-serif",
                    position: "relative", overflow: "hidden",
                }}
            >
                <div id="tech-stack" style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />
                <div style={{ position: "absolute", top: -80, right: "10%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 200, left: "8%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(96,217,250,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>

                    {/* Header */}
                    <div className={`ts-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 14 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#a78bfa", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,transparent,#a78bfa)", display: "inline-block" }} />
                            Tech Stack
                            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,#a78bfa,transparent)", display: "inline-block" }} />
                        </span>
                    </div>
                    <div className={`ts-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", animationDelay: "0.1s" }}>
                        <h2 style={{ fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: "-1.8px", lineHeight: 1.08, margin: 0 }}>
                            Tools I <span style={{ color: "#a78bfa" }}>master.</span>
                        </h2>
                    </div>
                    <div className={`ts-fade${visible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 48, animationDelay: "0.18s" }}>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.32)", margin: "12px auto 0", maxWidth: 440, lineHeight: 1.7 }}>
                            Every tool battle-tested across real client projects.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className={`ts-fade${visible ? " vis" : ""}`} style={{ display: "flex", justifyContent: "center", marginBottom: 36, animationDelay: "0.24s" }}>
                        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 4, flexWrap: "wrap", justifyContent: "center" }}>
                            {CATEGORIES.map(cat => (
                                <button key={cat.id} className="tab-btn" onClick={() => handleTab(cat.id)} style={{
                                    fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 11,
                                    color: activeTab === cat.id ? "#fff" : "rgba(255,255,255,0.35)",
                                    background: activeTab === cat.id ? `linear-gradient(135deg,${cat.color}28,${cat.color}14)` : "transparent",
                                    boxShadow: activeTab === cat.id ? `0 0 0 1px ${cat.color}40` : "none",
                                    letterSpacing: "-0.2px", whiteSpace: "nowrap",
                                }}>
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className={`ts-fade${visible ? " vis" : ""}`} style={{ animationDelay: "0.3s" }}>
                        <div className="tgrid" style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${Math.min(active.tools.length, 8)}, 1fr)`,
                            gap: 12,
                        }}>
                            {active.tools.map((name, i) => {
                                const toolData = TOOLS_DATA[name] || { src: "", invert: false };
                                return (
                                    <ToolCard
                                        key={`${activeTab}-${name}`}
                                        name={name}
                                        src={toolData.src}
                                        invert={toolData.invert}
                                        color={active.color}
                                        accent={active.accent}
                                        border={active.border}
                                        visible={cardsVis}
                                        delay={i * 55}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={`ts-fade sgrid${visible ? " vis" : ""}`} style={{
                        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                        gap: 1, marginTop: 48, marginBottom: 64,
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 16, overflow: "hidden",
                        border: "0.5px solid rgba(255,255,255,0.07)",
                        animationDelay: "0.4s",
                    }}>
                        {[
                            { n: "35+", l: "Technologies", c: "#a78bfa" },
                            { n: "3+", l: "Years of use", c: "#60d9fa" },
                            { n: "15+", l: "Projects built", c: "#4ade80" },
                            { n: "5★", l: "Upwork Rating", c: "#fbbf24" },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: "22px 0", textAlign: "center", background: "rgba(10,8,20,0.6)",
                                borderRight: i < 3 ? "0.5px solid rgba(255,255,255,0.05)" : "none",
                            }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: s.c, letterSpacing: "-1px", lineHeight: 1 }}>{s.n}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", marginTop: 6 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Marquee */}
                <div className={`ts-fade${visible ? " vis" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 88, animationDelay: "0.45s" }}>
                    <MarqueeRow items={ALL_TOOLS.slice(0, half)} reverse={false} speed={50} />
                    <MarqueeRow items={ALL_TOOLS.slice(half)} reverse={true} speed={42} />
                </div>

            </section>
        </>
    );
}