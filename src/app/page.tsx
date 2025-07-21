// page.tsx
import Home from "@/components/home"; 
import TechStackSection from "@/components/techStackSection";
import MyProject from "@/components/myProject";
import Contact from "@/components/contact";

export default function HomePage() {
  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark scroll-smooth">
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <TechStackSection />
      </div>
      <div id="projects">
        <MyProject />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
