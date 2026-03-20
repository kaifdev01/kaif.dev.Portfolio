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
