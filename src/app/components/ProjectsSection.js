"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// ── Data ───────────────────────────────────────────────────────────────────────
const PROJECTS = [
    {
        id: 1, num: "01",
        title: "QR Code Menu Generator SaaS",
        desc: "A full-stack SaaS platform that allows restaurants to create digital menus and generate QR codes for instant customer access without printing physical menus.",
        stack: ["Next.js", "MongoDB", "Node.js", "JWT", "Tailwind CSS", "Express Js"],
        tags: ["QR Code Generation", "Menu Customization"],
        color: "#4ade80", glow: "rgba(74,222,128,0.2)", border: "rgba(74,222,128,0.35)", accent: "rgba(34,197,94,0.1)",
        live: "https://qr-menu-frontend-teal.vercel.app/", github: "https://github.com/kaifdev01/QR-menu-Frontend",
        image: "/1.1.png",
    },
    {
        id: 2, num: "02",
        title: "Investment Platform",
        desc: "A full-stack investment website with multi-level referral logic, wallet system, ROI tracking dashboard, and admin panel for managing users and payouts.",
        stack: ["Next.js", "MongoDB", "Node.js", "JWT", "Tailwind CSS"],
        tags: ["Referral System", "Admin Panel", "Auth", "Stats"],
        color: "#a78bfa", glow: "rgba(124,58,237,0.25)", border: "rgba(167,139,250,0.35)", accent: "rgba(124,58,237,0.12)",
        live: "https://hprfarm.com", github: "https://github.com/kaifdev01/investment-platform-frontend",
        image: "/2.1.png",
    },
    {
        id: 3, num: "03",
        title: "Movie Rating Web App",
        desc: "A full-stack movie platform where users can browse movies, view ratings, explore detailed information, and watch official trailers in a clean interface.",
        stack: ["React.js", "MongoDB", "Rest Api", "Cloudinary", "Tailwind CSS"],
        tags: ["Movie Search & Details", "Trailers", "Last Updates"],
        color: "#4ade80", glow: "rgba(74,222,128,0.2)", border: "rgba(74,222,128,0.35)", accent: "rgba(34,197,94,0.1)",
        live: "https://movie-rating-app-frontend.vercel.app/", github: "https://github.com/kaif001/movie-rating-app-frontend",
        image: "/3.png",
    },
    {
        id: 4, num: "04",
        title: "Kanban Board",
        desc: "Drag-and-drop project management board with multi-workspace support, task cards, priority labels, due dates, and team collaboration.",
        stack: ["React", "Tailwind CSS", "DnD Kit", "Node.js", "MongoDB"],
        tags: ["Drag & Drop", "Workspaces", "Teams"],
        color: "#a78bfa", glow: "rgba(124,58,237,0.25)", border: "rgba(167,139,250,0.35)", accent: "rgba(124,58,237,0.1)",
        live: "https://kaifdev-kanban.netlify.app/", github: "https://github.com/kaif001/kanban-board",
        image: "/4.png"
    },
    {
        id: 5, num: "05",
        title: "Covid 19",
        desc: "A responsive informational landing page providing essential details about COVID-19, safety guidelines, and prevention tips in a clear and accessible layout",
        stack: ["React", "Tailwind Css", "Api"],
        tags: ["Covid Stats", "Prevention Guidelines",],
        color: "#fbbf24", glow: "rgba(251,191,36,0.2)", border: "rgba(251,191,36,0.35)", accent: "rgba(245,158,11,0.1)",
        live: "https://kaifdev-covid-app.netlify.app/", github: "https://github.com/kaifdev01",
        image: "/5.png"
    },
    {
        id: 6, num: "06",
        title: "Tax Services Website",
        desc: "Professional tax services platform with client onboarding, secure document upload, tax calculation tools, and a full case tracking dashboard.",
        stack: ["Next.js", "MongoDB", "Node.js", "Tailwind CSS", "JWT"],
        tags: ["Dashboard", "Documents", "Client Portal"],
        color: "#fb923c", glow: "rgba(251,146,60,0.2)", border: "rgba(251,146,60,0.35)", accent: "rgba(234,88,12,0.1)",
        live: "https://www.eliaselitaxservices.com/", github: "https://github.com/kaifdev01/TaxFrontend",
        image: "/6.png"
    },
    {
        id: 7, num: "07",
        title: "Movie Reservation",
        desc: "Cinema seat reservation system with real-time seat selection, booking management, payment flow, and a complete theatre admin panel.",
        stack: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
        tags: ["Real-time", "Booking", "Payments"],
        color: "#f472b6", glow: "rgba(244,114,182,0.22)", border: "rgba(244,114,182,0.35)", accent: "rgba(244,114,182,0.1)",
        live: "https://blknws-frontend.vercel.app/", github: "https://github.com/kaifdev01",
        image: "/7.png"
    },
    {
        id: 8, num: "08",
        title: "To Do List",
        desc: "I developed a to-do list project using React.js, where users can create, update, and delete tasks effortlessly. The app features a clean  interface, allowing users to organize their tasks efficiently.",
        stack: ["React.js", "React Redux", "Tailwind css"],
        tags: ["Task Management", "Progress Tracking",],
        color: "#4ade80", glow: "rgba(74,222,128,0.2)", border: "rgba(74,222,128,0.35)", accent: "rgba(34,197,94,0.1)",
        live: "https://kaifdevtodo.netlify.app/", github: "https://github.com/kaifdev01/todo",
        image: "/8.png"
    },
    {
        id: 9, num: "09",
        title: "Ecommerce App with Admin Panel + Stats",
        desc: "I developed an e-commerce app where users can browse and purchase items, while admins have the access to add, update, and delete products.",
        stack: ["React", "Node.js", "MongoDB", "React Redux", "Express"],
        tags: ["Admin Panel", "Stats", "Graphs"],
        color: "#60d9fa", glow: "rgba(96,217,250,0.2)", border: "rgba(96,217,250,0.35)", accent: "rgba(59,130,246,0.1)",
        live: "https://drive.google.com/file/d/1zi-x5A8RLT-PmK1S7Y92HYdAxkMwfPlR/view?usp=sharing", github: "https://github.com/kaifdev01",
        image: "/15.png"
    },

    {
        id: 10, num: "10",
        title: "Bike Rental",
        desc: "A WordPress-based website for a bike rental service where users can explore available bikes, view pricing, and easily book rentals online.",
        stack: ["WordPress", "Php", "Elementor", "Custom Code"],
        tags: ["Online Booking", "Bike Listings"],
        color: "#fbbf24", glow: "rgba(251,191,36,0.2)", border: "rgba(251,191,36,0.35)", accent: "rgba(245,158,11,0.1)",
        live: "https://motoheist.co", github: "https://github.com/kaifdev0",
        image: "/12.png"

    },
    {
        id: 11, num: "011",
        title: "Real Estate",
        desc: "A WordPress-based website for a real estate service where users can search properties, view details, and contact agents easily.",
        stack: ["WordPress", "Elementor", "Php", "CSS"],
        tags: ["Property Listings   ", "Agent Contact Forms ", "Advanced Search & Filters"],
        color: "#a78bfa", glow: "rgba(124,58,237,0.25)", border: "rgba(167,139,250,0.35)", accent: "rgba(124,58,237,0.1)",
        live: "https://kfhomebuyers.com", github: "https://github.com/kaifdev0",
        image: "/13.png"
    },

];

// ── Image Placeholder ──────────────────────────────────────────────────────────
function ImagePlaceholder({ color, title }) {
    return (
        <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(135deg, ${color}0e 0%, rgba(8,6,18,0.9) 70%)`,
            borderRadius: 14, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `linear-gradient(${color}0d 1px, transparent 1px), linear-gradient(90deg, ${color}0d 1px, transparent 1px)`,
                backgroundSize: "28px 28px", borderRadius: 14,
            }} />
            {/* Browser chrome */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 30,
                background: "rgba(255,255,255,0.025)",
                borderBottom: `0.5px solid ${color}15`,
                borderRadius: "14px 14px 0 0",
                display: "flex", alignItems: "center", padding: "0 12px", gap: 5,
            }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.55 }} />
                ))}
                <div style={{
                    flex: 1, margin: "0 10px", height: 12, borderRadius: 99,
                    background: "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
                        kaif.dev/{title.toLowerCase().replace(/ /g, "-")}
                    </span>
                </div>
            </div>
            {/* Icon */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{
                    width: 60, height: 60, borderRadius: 16, margin: "0 auto 14px",
                    background: `${color}14`, border: `1px solid ${color}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.65">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                </div>
                <div style={{ fontSize: 11, color: `${color}70`, fontWeight: 600, letterSpacing: "0.07em" }}>
                    PROJECT SCREENSHOT
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 5 }}>
                    Replace with your image
                </div>
            </div>
            {/* Corner brackets */}
            {[
                { top: 38, left: 12, borderTop: `1.5px solid ${color}44`, borderLeft: `1.5px solid ${color}44` },
                { top: 38, right: 12, borderTop: `1.5px solid ${color}44`, borderRight: `1.5px solid ${color}44` },
                { bottom: 12, left: 12, borderBottom: `1.5px solid ${color}44`, borderLeft: `1.5px solid ${color}44` },
                { bottom: 12, right: 12, borderBottom: `1.5px solid ${color}44`, borderRight: `1.5px solid ${color}44` },
            ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
            ))}
        </div>
    );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function ProjectsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState(1);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [sectionEntered, setSectionEntered] = useState(false);
    // Stable card class — never resets back to card-initial after first navigation
    const [cardClass, setCardClass] = useState("card-initial");

    const sectionRef = useRef(null);
    const lockRef = useRef(false);
    const activeRef = useRef(0);
    const animRef = useRef(false);
    const touchStartY = useRef(0);
    const total = PROJECTS.length;

    // ── Scroll-position guard: lock only when section top is within 20px of viewport top ──
    useEffect(() => {
        const checkPosition = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const nearTop = rect.top >= -20 && rect.top <= 20;
            if (nearTop) {
                lockRef.current = true;
                setHeaderVisible(true);
                setSectionEntered(true);
            } else {
                lockRef.current = false;
            }
        };
        window.addEventListener("scroll", checkPosition, { passive: true });
        checkPosition();
        return () => window.removeEventListener("scroll", checkPosition);
    }, []);

    // ── Navigate ──────────────────────────────────────────────────────────────
    const navigate = useCallback((dir) => {
        if (animRef.current) return;

        const next = activeRef.current + dir;

        if (next < 0 || next >= total) {
            // At boundary — release lock so page can scroll past the section
            lockRef.current = false;
            return;
        }

        animRef.current = true;
        setDirection(dir);
        setCardClass(dir > 0 ? "card-in-fwd" : "card-in-bwd");
        setPrevIndex(activeRef.current);
        activeRef.current = next;
        setActiveIndex(next);

        setTimeout(() => {
            animRef.current = false;
            setPrevIndex(null);
        }, 800);
    }, [total]);

    // ── Wheel (desktop) ───────────────────────────────────────────────────────
    useEffect(() => {
        const onWheel = (e) => {
            if (!lockRef.current) return;
            e.preventDefault();
            navigate(e.deltaY > 0 ? 1 : -1);
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [navigate]);

    // ── Touch (mobile) ────────────────────────────────────────────────────────
    // All listeners are { passive: false } so we can call preventDefault()
    // and stop the browser from scrolling the page while the section is locked.
    useEffect(() => {
        const onStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onMove = (e) => {
            // While locked, block native scroll entirely so the page stays put
            if (lockRef.current) e.preventDefault();
        };

        const onEnd = (e) => {
            if (!lockRef.current) return;
            const dy = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(dy) > 30) navigate(dy > 0 ? 1 : -1);
        };

        window.addEventListener("touchstart", onStart, { passive: false });
        window.addEventListener("touchmove", onMove, { passive: false });
        window.addEventListener("touchend", onEnd, { passive: false });

        return () => {
            window.removeEventListener("touchstart", onStart);
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("touchend", onEnd);
        };
    }, [navigate]);

    // ── Keyboard ──────────────────────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e) => {
            if (!lockRef.current) return;
            if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); navigate(1); }
            if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); navigate(-1); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [navigate]);

    const proj = PROJECTS[activeIndex];
    const prev = prevIndex !== null ? PROJECTS[prevIndex] : null;

    return (
        <>
            <style>{`
        /* ── Header fade-up ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hdr-fade     { opacity:0; }
        .hdr-fade.vis { animation:fadeUp 0.6s ease forwards; }

        /* ── Card fade-in on first load ── */
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .card-initial { animation: cardFadeIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s both; }

        /* ── Forward: new card slides up from bottom ── */
        @keyframes slideInUp {
          from { transform: translateY(100%) scale(0.94); opacity: 0; }
          to   { transform: translateY(0)    scale(1);    opacity: 1; }
        }
        /* ── Forward: old card shrinks up and fades ── */
        @keyframes shrinkUp {
          from { transform: translateY(0)    scale(1);    opacity: 1; }
          to   { transform: translateY(-8%)  scale(0.94); opacity: 0; }
        }

        /* ── Backward: new card slides down from top ── */
        @keyframes slideInDown {
          from { transform: translateY(-100%) scale(0.94); opacity: 0; }
          to   { transform: translateY(0)     scale(1);    opacity: 1; }
        }
        /* ── Backward: old card drops down and fades ── */
        @keyframes dropDown {
          from { transform: translateY(0)   scale(1);    opacity: 1; }
          to   { transform: translateY(12%) scale(0.96); opacity: 0; }
        }

        .card-in-fwd  { animation: slideInUp   0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .card-out-fwd { animation: shrinkUp    0.5s cubic-bezier(0.4,0,0.6,1)  forwards; }
        .card-in-bwd  { animation: slideInDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .card-out-bwd { animation: dropDown    0.5s cubic-bezier(0.4,0,0.6,1)  forwards; }

        /* ── Buttons ── */
        .live-btn:hover { filter:brightness(1.12); transform:translateY(-2px) !important; }
        .gh-btn:hover   { background:rgba(255,255,255,0.1) !important; color:#fff !important; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .card-layout { flex-direction: column !important; }
          .card-img-col { display: none !important; }
          .card-txt-col { width: 100% !important; padding: 32px 24px !important; border-right: none !important; }
          .stack-pills { width: 98% !important; }
          .sec-width{width:98% !important}
        }
      `}</style>

            <section
                ref={sectionRef}
                id="work"
                style={{
                    position: "relative",
                    height: "100vh",
                    overflow: "hidden",
                    background: "#09090f",
                    fontFamily: "'Geist','Inter','Helvetica Neue',sans-serif",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* ── Backgrounds ── */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`,
                    backgroundSize: "72px 72px",
                }} />
                <div style={{ position: "absolute", top: -80, right: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: "5%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

                {/* ── Inner layout ── */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 1280,
                    width: "90%",
                    margin: "0 auto",
                    padding: "0 48px",
                    position: "relative",
                    zIndex: 1,
                    boxSizing: "border-box",
                    height: "100%",
                }}>

                    {/* ── Header ── */}
                    <div style={{ paddingTop: 48, flexShrink: 0 }}>
                        <div className={`hdr-fade${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 10 }}>
                            <span style={{
                                fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#a78bfa",
                                textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10,
                            }}>
                                <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,transparent,#a78bfa)", display: "inline-block" }} />
                                Projects
                                <span style={{ width: 28, height: 1, background: "linear-gradient(90deg,#a78bfa,transparent)", display: "inline-block" }} />
                            </span>
                        </div>

                        <div className={`hdr-fade${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", animationDelay: "0.1s" }}>
                            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-1.8px", lineHeight: 1.1, margin: 0 }}>
                                Things I've <span style={{ color: "#a78bfa" }}>built.</span>
                            </h2>
                        </div>

                        <div className={`hdr-fade${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 20, animationDelay: "0.18s" }}>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.32)", margin: "8px auto 0", maxWidth: 420, lineHeight: 1.65 }}>
                                Real products shipped for real clients — full-stack, production-ready.
                            </p>
                        </div>

                        {/* Counter + hint */}
                        <div className={`hdr-fade${headerVisible ? " vis" : ""}`} style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            marginBottom: 20, animationDelay: "0.22s",
                        }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                                <span style={{
                                    fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-2px",
                                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                }}>
                                    {String(activeIndex + 1).padStart(2, "0")}
                                </span>
                                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)" }}>
                                    / {String(total).padStart(2, "0")}
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)" }}>scroll to explore</span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeLinecap="round">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <polyline points="19 12 12 19 5 12" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* ── Card stage ── */}
                    <div style={{
                        flex: 1,
                        position: "relative",
                        minHeight: 0,
                    }}>
                        {/* Previous card (animating out) */}
                        {prev && (
                            <div
                                key={`prev-${prevIndex}`}
                                className={direction > 0 ? "card-out-fwd" : "card-out-bwd"}
                                style={{
                                    position: "absolute",
                                    top: 0, left: 0, right: 0, bottom: 20,
                                    zIndex: 1,
                                    borderRadius: 22,
                                }}
                            >
                                <CardInner project={prev} isActive={false} />
                            </div>
                        )}

                        {/* Active card */}
                        <div
                            key={`active-${activeIndex}`}
                            className={cardClass}
                            style={{
                                position: "absolute",
                                top: 0, left: 0, right: 0, bottom: 20,
                                zIndex: 2,
                                borderRadius: 22,
                            }}
                        >
                            <CardInner project={proj} isActive={true} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// ── Card Inner (pure presentational) ──────────────────────────────────────────
function CardInner({ project: p, isActive }) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(160deg, rgba(16,12,30,0.99) 0%, rgba(9,7,20,0.99) 100%)",
            border: `1px solid ${isActive ? p.border : "rgba(255,255,255,0.08)"}`,
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: isActive
                ? `0 28px 72px rgba(0,0,0,0.65), 0 0 0 1px ${p.color}15, 0 0 80px ${p.glow}`
                : "0 8px 32px rgba(0,0,0,0.4)",
            display: "flex",
            position: "relative",
        }}>

            {/* Glow wash */}
            {isActive && (
                <div style={{
                    position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none",
                    background: `radial-gradient(ellipse at 75% 50%, ${p.glow} 0%, transparent 55%)`,
                }} />
            )}

            {/* ── Text col ── */}
            <div className="card-txt-col" style={{
                width: "50%",
                padding: "40px 44px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                zIndex: 1,
                flexShrink: 0,
            }}>
                {/* Num + badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.12)", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                        {p.num}
                    </span>
                    <div style={{ width: 1, height: 11, background: "rgba(255,255,255,0.1)" }} />
                    <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.09em",
                        color: p.color, background: p.accent,
                        border: `0.5px solid ${p.border}`,
                        padding: "3px 10px", borderRadius: 99, textTransform: "uppercase",
                    }}>
                        Web Apps
                    </span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: 28, fontWeight: 800, color: "#fff",
                    letterSpacing: "-0.7px", lineHeight: 1.15, margin: "0 0 12px",
                }}>
                    {p.title}
                </h3>

                {/* Desc */}
                <p style={{
                    fontSize: 13.5, color: "rgba(255,255,255,0.43)",
                    lineHeight: 1.78, margin: "0 0 18px", maxWidth: 400,
                }}>
                    {p.desc}
                </p>

                {/* Feature tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {p.tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: 11, fontWeight: 600,
                            color: "rgba(255,255,255,0.38)",
                            background: "rgba(255,255,255,0.05)",
                            border: "0.5px solid rgba(255,255,255,0.09)",
                            padding: "4px 11px", borderRadius: 99,
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Stack pills */}
                <div className="stack-pills" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
                    {p.stack.map(t => (
                        <span key={t} style={{
                            fontSize: 11, fontWeight: 600,
                            color: p.color, background: p.accent,
                            border: `0.5px solid ${p.border}`,
                            padding: "3px 11px", borderRadius: 99,
                        }}>
                            {t}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                    <a href={p.live} className="live-btn" style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: p.color, color: "#000",
                        fontSize: 12, fontWeight: 700,
                        padding: "10px 20px", borderRadius: 10,
                        textDecoration: "none",
                        boxShadow: `0 4px 18px ${p.glow}`,
                        transition: "all 0.25s ease",
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                    </a>
                    <a href={p.github} className="gh-btn" style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 12, fontWeight: 600,
                        padding: "10px 18px", borderRadius: 10,
                        textDecoration: "none",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        transition: "all 0.25s ease",
                    }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            {/* ── Image col ── */}
            <div className="card-img-col" style={{
                flex: 1,
                padding: "24px 24px 24px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
            }}>
                <div style={{ width: "100%", height: "100%" }}>
                    {p.image ? (
                        <div style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 14,
                            overflow: "hidden",
                            position: "relative",
                        }}>
                            <Image
                                src={p.image}
                                alt={p.title}
                                width={800}
                                height={800}
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                        </div>
                    ) : (
                        <ImagePlaceholder color={p.color} title={p.title} />
                    )}
                </div>
            </div>
        </div>
    );
}