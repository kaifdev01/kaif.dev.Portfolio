"use client"

import AboutSection from "./components/AboutSection";
import AskKaifSection from "./components/AskKaifSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import TechStack from "./components/TechStack";

export default function Home() {
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
