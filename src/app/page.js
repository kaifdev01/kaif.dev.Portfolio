"use client"

import { useEffect } from "react";
import AboutSection from "./components/AboutSection";
import AskKaifSection from "./components/AskKaifSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import TechStack from "./components/TechStack";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return (
    <main style={{ background: "#09090f", padding: "0" }}>
      {/* ── Static SEO layer — server-rendered, visually hidden, crawlable ── */}
      <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }} aria-hidden="true">
        <h1>Muhammad Kaif — Freelance Full-Stack Developer | MERN, Next.js &amp; WordPress</h1>
        <p>Freelance full-stack developer from Lahore, Pakistan. 3+ years experience building SaaS platforms, web apps and WordPress sites for clients in USA, UAE, UK and Saudi Arabia. Available for hire.</p>
        <h2>Services</h2>
        <ul>
          <li>MERN Stack Development — full-stack web apps, REST APIs, real-time features, admin dashboards</li>
          <li>Next.js Development — SSR, SSG, App Router, SEO-optimised, Vercel deployment</li>
          <li>WordPress &amp; Elementor — business websites, WooCommerce stores, custom themes</li>
        </ul>
        <h2>Projects</h2>
        <ul>
          <li>QR Code Menu Generator SaaS — Next.js, MongoDB, Express</li>
          <li>Investment Platform — multi-level referral, wallet system, ROI tracking</li>
          <li>Movie Rating Web App — React, MongoDB, Cloudinary</li>
          <li>Kanban Board — drag-and-drop, multi-workspace, React, DnD Kit</li>
          <li>Tax Services Website — client onboarding, document upload, Next.js</li>
          <li>Movie Reservation System — real-time seat selection, MERN, Socket.io</li>
          <li>Bike Rental Website — WordPress, Elementor</li>
          <li>Real Estate Website — property listings, WordPress, Elementor</li>
        </ul>
        <h2>Tech Stack</h2>
        <p>MongoDB, Express, React, Node.js, Next.js, Tailwind CSS, Socket.io, JWT, Cloudinary, WordPress, Elementor, WooCommerce, TypeScript, Supabase, Firebase, Clerk, NextAuth, AWS, Linux, Render</p>
        <h2>Contact</h2>
        <p>Email: kaifm9096@gmail.com — Available for freelance projects and full-time remote positions. Responds within 24 hours.</p>
      </div>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <AskKaifSection />
      <TechStack />
      <ContactSection />
    </main>
  );
}
