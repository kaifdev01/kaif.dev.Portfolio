"use client"

import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main style={{ background: "#09090f", padding: "0" }}>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </main>
  );
}
