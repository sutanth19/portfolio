"use client";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import LogoMarquee from "@/components/LogoMarquee";
import RotatingText from "@/components/reactbits/TextAnimations/RotatingText";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useIntersectionObserver(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isIntersecting };
}

function Dot({ category }: { category: 'frontend' | 'backend' | 'database' | 'tools' }) {
  const colorMap = {
    frontend: 'bg-green-400',
    backend: 'bg-blue-400',
    database: 'bg-amber-400',
    tools: 'bg-purple-400',
  };
  return <span className={`w-2 h-2 rounded-full mr-3 ${colorMap[category]}`} />;
}

type TechCardProps = {
  title: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  items: string[];
  titleColor: string;
  delay?: number;
};

function TechCard({ title, category, items, titleColor, delay = 0 }: TechCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  return (
    <div 
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardSpotlight className="h-full w-full max-w-sm p-6 bg-neutral-900 border-neutral-800 rounded-2xl shadow-lg shadow-neutral-800/50 hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="relative z-20">
          <h3 className={`text-lg font-bold ${titleColor} mb-4 transform transition-all duration-700 ${
            isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}>
            {title}
          </h3>
          <div className="space-y-2 text-neutral-300">
            {items.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center transform transition-all duration-700 ease-out ${
                  isIntersecting 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: `${delay + 100 + (index * 100)}ms` }}
              >
                <Dot category={category} />
                <span className="text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardSpotlight>
    </div>
  );
}

function AnimatedAvatar() {
  const { ref, isIntersecting } = useIntersectionObserver(0.3);

  return (
    <div 
      ref={ref}
      className="flex justify-center items-center"
    >
      <div className={`relative w-64 h-64 lg:w-72 lg:h-72 transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'scale-100 opacity-100 rotate-0' 
          : 'scale-75 opacity-0 rotate-12'
      }`}>
        <Image
          src="/Tech.png"
          alt="3D Tech Avatar"
          fill
          className="object-contain"
          priority
        />
        {/* Animated background rings */}
        <div className={`absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse transition-all duration-1000 ${
          isIntersecting ? 'scale-110 opacity-100' : 'scale-90 opacity-0'
        }`} style={{ animationDelay: '0ms' }} />
        <div className={`absolute inset-0 rounded-full border-2 border-green-400/20 animate-pulse transition-all duration-1000 ${
          isIntersecting ? 'scale-125 opacity-100' : 'scale-95 opacity-0'
        }`} style={{ animationDelay: '500ms' }} />
        <div className={`absolute inset-0 rounded-full border-2 border-purple-400/10 animate-pulse transition-all duration-1000 ${
          isIntersecting ? 'scale-140 opacity-100' : 'scale-100 opacity-0'
        }`} style={{ animationDelay: '1000ms' }} />
      </div>
    </div>
  );
}

function AnimatedHeader() {
  const { ref, isIntersecting } = useIntersectionObserver(0.5);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-center justify-center text-center mb-12"
    >
      <h2 className={`text-3xl md:text-5xl font-bold transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}>
        Tech Stack & Skills
      </h2>
    </div>
  );
}

function AnimatedMarquee() {
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  return (
    <div 
      ref={ref}
      className={`mt-12 transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
    >
      <LogoMarquee />
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section
      id="techstack"
      className="section-spacing bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark overflow-hidden"
    >
      <div className="section-container">
        <AnimatedHeader />

        {/* Main Layout with Avatar in Center */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-center">
          
          {/* Left Column - Frontend & Backend Cards */}
          <div className="space-y-4">
            <TechCard
              title="Frontend"
              category="frontend"
              titleColor="text-green-400"
              items={[
                "HTML, CSS, JavaScript, TypeScript",
                "React.js, React Native, Next.js, Vite",
                "Tailwind CSS, MUI"
              ]}
              delay={0}
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
              delay={200}
            />
          </div>

          {/* Center Column - 3D Avatar */}
          <AnimatedAvatar />

          {/* Right Column - Database & Tools Cards */}
          <div className="space-y-4">
            <TechCard
              title="Database"
              category="database"
              titleColor="text-amber-400"
              items={[
                "MySQL, Firebase Realtime DB",
                "SQL Server, MongoDB",
                "SQLite"
              ]}
              delay={400}
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
              delay={600}
            />
          </div>
        </div>

        {/* Mobile Layout - Stacked Cards */}
        <div className="lg:hidden space-y-4">
          {/* Avatar centered on mobile */}
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48">
              <AnimatedAvatar />
            </div>
          </div>
          
          {/* Cards in 2-column grid on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TechCard
              title="Frontend"
              category="frontend"
              titleColor="text-green-400"
              items={[
                "HTML, CSS, JavaScript, TypeScript",
                "React.js, React Native, Next.js, Vite",
                "Tailwind CSS, MUI"
              ]}
              delay={0}
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
              delay={200}
            />
            <TechCard
              title="Database"
              category="database"
              titleColor="text-amber-400"
              items={[
                "MySQL, Firebase",
                "SQL Server, MongoDB",
                "SQLite"
              ]}
              delay={400}
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
              delay={600}
            />
          </div>
        </div>

        <AnimatedMarquee />
      </div>
    </section>
  );
}