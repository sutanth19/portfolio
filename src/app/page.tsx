// page.tsx
import Home from "@/components/home"; 
import TechStackSection from "@/components/techStackSection";
import MyProject from "@/components/myProject";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark">
      <Home />
      <TechStackSection />
      <MyProject />
      <Contact />
    </main>
  );
}