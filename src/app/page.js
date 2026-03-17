"use client"

import AboutSection from "./components/AboutSection";
import AskKaifSection from "./components/AskKaifSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";

export default function Home() {
  return (
    <main style={{ background: "#09090f", padding: "0" }}>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <AskKaifSection />
    </main>
  );
}
