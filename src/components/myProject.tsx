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
      className="flex flex-col md:flex-row items-start md:items-center justify-between text-left mb-8 gap-3"
    >
      <h2 className={`text-3xl md:text-4xl font-bold transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}>
        <span>My Projects</span>
      </h2>
      
      <div className={`transform transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-1">
          <span className="text-white">Creative</span>
          <RotatingText
            texts={[" solutions ", " projects ", " ideas "]}
            mainClassName="px-2 py-0.5 bg-[#00004d] text-white rounded text-sm md:text-base font-medium"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          <span className="text-white">that inspire</span>
        </h3>
      </div>
    </div>
  );
}

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
      src: "/IE_Portal.png",
    },
    {
      quote:
        "Improved the user interface of Jabil's production tracking dashboard to align with engineering KPI standards. Introduced tabbed navigation and redesigned all charts using Material UI for a cleaner look.",
      name: "EST1C Real-Time Dashboard",
      designation: "Jabil | Frontend Developer | 2025",
      techStack: "React.js, TypeScript, Vite, Material UI (MUI), ChartJs",
      src: "/eSTIC.png",
    },
    {
      quote:
        "Developed a mobile ordering system for a tart and cupcake shop in Gombak, published in AITCS Journal. Enabled real-time order placement with secure login and in-app payments using Firebase and Stripe API.",
      name: "Whiskit.co Mobile Ordering System",
      designation: "Sole Developer | Oct 2024 – Jan 2025",
      techStack: "React Native, Firebase (Auth, Firestore, Storage), Stripe API, Expo",
      src: "/whiskitco.png",
    },
    {
      quote:
        "Created a GPS-based pet tracking system with real-time dashboard display using ESP8266 and Neo-6M GPS. Designed a browser-based dashboard to display coordinates and alerts with fast GPS data transmission.",
      name: "Pet Tracking System Using IoT",
      designation: "Lead Developer – Final Year Project | Jun 2021",
      techStack: "HTML, CSS, JavaScript, PHP, MySQL, Arduino IDE, ESP8266, Neo-6M GPS",
      src: "petTracking.png",
    },
    {
      quote:
        "Built a responsive, mobile-friendly portfolio to showcase skills, projects, and resume. Developed smooth scrolling, dark mode toggle, and animated sections with focus on SEO optimization and accessibility.",
      name: "Personal Portfolio Website",
      designation: "Self-Initiated Project | 2025",
      techStack: "Next.js, TypeScript, Tailwind CSS, ShadCN UI",
      src: "/mac.png",
    },
  ];

  return (
    <section 
      id="projects" 
      className="section-spacing bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark overflow-hidden"
    >
      <div className="section-container">
        <AnimatedProjectHeader />
        <ScrollAnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}