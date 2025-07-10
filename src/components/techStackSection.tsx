"use client";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import LogoMarquee from "@/components/LogoMarquee";
import RotatingText from "@/components/reactbits/TextAnimations/RotatingText";


// Dot component with category-based dot color
function Dot({ category }: { category: 'frontend' | 'backend' | 'database' | 'tools' }) {
  const colorMap = {
    frontend: 'bg-green-400',
    backend: 'bg-blue-400',
    database: 'bg-amber-400',
    tools: 'bg-purple-400',
  };
  return <span className={`w-2 h-2 rounded-full mr-3 ${colorMap[category]}`} />;
}

// Reusable card component for each tech section
type TechCardProps = {
  title: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  items: string[];
  titleColor: string;
};

function TechCard({ title, category, items, titleColor }: TechCardProps) {
  return (
    <CardSpotlight className="h-auto p-6 bg-neutral-900 border-neutral-800">
      <div className="relative z-20">
        <h3 className={`text-xl font-semibold ${titleColor} mb-4`}>{title}</h3>
        <div className="space-y-2 text-neutral-300">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <Dot category={category} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </CardSpotlight>
  );
}

// Main section component
export default function TechStackSection() {
  return (
    <section
      id="techstack"
      className="py-20 bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-6">
                    
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                <h2 className="text-3xl md:text-5xl font-bold text-left">
                  Tech Stack & Skills
                </h2>
                <div className="mt-2 md:mt-0">
                  <h2 className="text-sm md:text-lg font-semibold text-white flex items-center gap-1">
                    <span className="text-zinc-300">Creative</span>
                    <RotatingText
                      texts={["coding", "designs", "UI/UX"]}
                      mainClassName="px-2 py-0.5 bg-[#00004d] text-white rounded text-sm md:text-lg font-medium"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                    />
                  </h2>
                </div>
              </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TechCard
            title="Frontend"
            category="frontend"
            titleColor="text-green-400"
            items={[
              "HTML, CSS, JavaScript, TypeScript",
              "React.js, React Native, Next.js, Vite",
              "Tailwind CSS, MUI"
            ]}
          />
          <TechCard
            title="Backend"
            category="backend"
            titleColor="text-blue-400"
            items={[
              "Node.js, Express.js, PHP",
              "REST API, JWT, Auth.js",
              "Firebase Authentication"
            ]}
          />
          <TechCard
            title="Database"
            category="database"
            titleColor="text-amber-400"
            items={[
              "MySQL, Firebase Realtime DB",
              "SQL Server, MongoDB"
            ]}
          />
          <TechCard
            title="Tools & Platforms"
            category="tools"
            titleColor="text-purple-400"
            items={[
              "Git, GitHub, VS Code",
              "Postman, XAMPP, Expo",
              "Figma, Chart.js, DataTables"
            ]}
          />
        </div>
       

        <LogoMarquee />


      </div>
    </section>
  );
}
