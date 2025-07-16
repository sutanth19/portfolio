"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import RotatingText from "@/components/reactbits/TextAnimations/RotatingText";
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

function AnimatedProjectHeader() {
  const { ref, isIntersecting } = useIntersectionObserver(0.3);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-start justify-start text-left mb-8"
    >
      <h2 className={`text-3xl md:text-5xl font-bold transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}>
        My Projects
      </h2>
      <div className={`transform transition-all duration-1000 ease-out -mt-2 ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        <h3 className="text-sm md:text-lg font-semibold text-white flex items-center gap-1">
          <span className="text-zinc-300">Creative</span>
          <RotatingText
            texts={[" solutions ", " projects ", " ideas "]}
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
          <span className="text-zinc-300">that inspire</span>
        </h3>
      </div>
    </div>
  );
}

// New component for scroll-triggered testimonials container
function ScrollAnimatedTestimonials({ testimonials }: { testimonials: any[] }) {
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  return (
    <div 
      ref={ref}
      className={`max-w-6xl mx-auto transform transition-all duration-1200 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-16 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: '200ms' }}
    >
      <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
    </div>
  );
}

export default function MyProjectSection() {
  const testimonials = [
    {
      quote:
        "Built and deployed a centralized portal for Jabil's Industrial Engineering team to manage project tracking, training, and internal communication. Created interactive Gantt charts and KPI dashboards for shopfloor visibility.",
      name: "Jabil IE Portal System",
      designation: "Full Stack Developer | Feb 2025 – Aug 2025",
      techStack: "React.js, TypeScript, Vite, Material UI (MUI), Express.js, ASP.NET, SQL Server, JWT, Axios",
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Developed a mobile ordering system for a tart and cupcake shop in Gombak, published in AITCS Journal. Enabled real-time order placement with secure login and in-app payments using Firebase and Stripe API.",
      name: "Whiskit.co Mobile Ordering System",
      designation: "Sole Developer | Oct 2024 – Jan 2025",
      techStack: "React Native, Firebase (Auth, Firestore, Storage), Stripe API, Expo",
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Improved the user interface of Jabil's production tracking dashboard to align with engineering KPI standards. Introduced tabbed navigation and redesigned all charts using Material UI for a cleaner look.",
      name: "EST1C Real-Time Dashboard",
      designation: "Frontend Developer | 2025",
      techStack: "React.js, TypeScript, Vite, Material UI (MUI), ChartJs",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Created a GPS-based pet tracking system with real-time dashboard display using ESP8266 and Neo-6M GPS. Designed a browser-based dashboard to display coordinates and alerts with fast GPS data transmission.",
      name: "Pet Tracking System Using IoT",
      designation: "Lead Developer – Final Year Project | Jun 2021",
      techStack: "HTML, CSS, JavaScript, PHP, MySQL, Arduino IDE, ESP8266, Neo-6M GPS",
      src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Built a responsive, mobile-friendly portfolio to showcase skills, projects, and resume. Developed smooth scrolling, dark mode toggle, and animated sections with focus on SEO optimization and accessibility.",
      name: "Personal Portfolio Website",
      designation: "Self-Initiated Project | 2025",
      techStack: "Next.js, TypeScript, Tailwind CSS, ShadCN UI",
      src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section 
      id="projects" 
      className="bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark overflow-hidden py-16"
    >
      <div className="section-container">
        <AnimatedProjectHeader />
        <ScrollAnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}