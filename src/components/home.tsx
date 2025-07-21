"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AnimationHome from "./animationHome";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";

// Typewriter component for skills animation
function TypewriterSkills() {
  const skills = [
    "Frontend development",
    "Backend development", 
    "Mobile development",
    "Full-stack development"
  ];
  
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentSkill.substring(0, currentText.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
        }
      } else {
        setCurrentText(currentSkill.substring(0, currentText.length + 1));
        
        if (currentText === currentSkill) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? 50 : isPaused ? 1500 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentSkillIndex, skills]);

  return (
    <span className="text-green-500 font-bold relative text-xl inline-block min-w-[200px]">
      {currentText}
      <span className="animate-pulse ml-1 text-green-400">|</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark overflow-hidden">
      {/* Matrix Animation Background */}
      <AnimationHome />

      {/* Main Content */}
      <div className="relative z-10 pt-16">
        <section className="section-spacing-first">
          <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[80vh]">
            {/* LEFT SECTION */}
            <article className="space-y-4 flex flex-col justify-center -mt-16">
              <p className="text-sm text-muted-foreground">HI THERE 👋 I'M</p>
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  <SplitText
                    text="Sutanth Kunsuraman"
                    className="text-4xl md:text-5xl font-extrabold leading-tight"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                  />
                </h1>
                <h2 className="text-xl font-semibold text-green-500 text-right -mt-5 mr-13.5">
                  Software Engineer
                </h2>
              </div>
              <p className="text-base max-w-lg leading-relaxed whitespace-nowrap">
                I'm a passionate software engineer skilled in <TypewriterSkills />
              </p>
              <p className="text-base max-w-md -mt-5">
                I enjoy building efficient, real-world solutions and transforming ideas into elegant, functional code.
              </p>
            </article>

            {/* RIGHT SECTION */}
            <figure className="flex justify-center md:justify-end items-start relative -mt-6 ml-0 md:ml-60">
                <Image
                  src="/HomeMyIconS.png"
                  alt="Sutanth Kunsuraman - Software Engineer"
                  width={450}
                  height={450}
                  className="object-contain rounded-lg w-96 h-96 md:w-[450px] md:h-[450px] relative z-10"
                  priority
                />
            </figure>
          </div>
        </section>
      </div>
    </main>
  );
}