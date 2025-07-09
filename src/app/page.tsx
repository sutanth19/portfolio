// page.tsx
import Home from "@/components/home"; 
import TechStackSection from "@/components/techStackSection";

export default function HomePage() {
  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark px-4">
      <Home />
      <TechStackSection />
    </main>
  );
}