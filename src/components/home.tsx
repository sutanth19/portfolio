"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AnimationHome from "./animationHome";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";
import Folder from "@/components/Folder";

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
    <span className="text-green-500 font-bold relative text-lg md:text-xl inline-block min-w-[180px] md:min-w-[200px]">
      {currentText}
      <span className="animate-pulse ml-1 text-green-400">|</span>
    </span>
  );
}

export default function HomePage() {
  const [showFolderModal, setShowFolderModal] = useState(false);

  const toggleFolderModal = () => {
    setShowFolderModal(!showFolderModal);
  };

  // Handle folder item clicks
  const handleFolderItemClick = (index: number) => {
    if (index === 0) {
      // CV
      window.open('/CV SUTANTH AL KUNSURAMAN.pdf', '_blank');
    } else if (index === 1) {
      // Cover Letter
      window.open('/CL SUTANTH AL KUNSURAMAN.pdf', '_blank');
    }
  };

  // Close modal when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFolderModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <main className="relative min-h-screen bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark overflow-hidden">
      {/* Matrix Animation Background */}
      <AnimationHome />

      {/* Main Content */}
      <div className="relative z-10 pt-2 md:pt-16">
        <section className="section-spacing-first">
          <div className="section-container px-4 sm:px-6 lg:px-8">
            {/* Desktop uses original grid, Mobile uses flex */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-screen md:min-h-[80vh]">
              
              {/* LEFT SECTION - Text Content */}
              <article className="space-y-2 md:space-y-4 flex flex-col justify-center md:-mt-16 order-2 md:order-1 pb-4 md:pb-0">
                <p className="text-xs sm:text-sm text-muted-foreground">HI THERE 👋 I'M</p>
                
                <div className="relative">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                    <SplitText
                      text="Sutanth Kunsuraman"
                      className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
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
                  <h2 className="text-lg sm:text-xl font-semibold text-green-500 text-right -mt-2 md:-mt-5 mr-2 md:mr-13.5">
                    Software Engineer
                  </h2>
                </div>

                {/* Skills Text - Mobile optimized, Desktop original */}
                <div className="md:hidden">
                  <p className="text-sm leading-relaxed mb-1">
                    I'm a passionate software engineer skilled in
                  </p>
                  <div className="pl-2">
                    <TypewriterSkills />
                  </div>
                </div>
                
                {/* Original desktop text */}
                <p className="hidden md:block text-base max-w-lg leading-relaxed whitespace-nowrap">
                  I'm a passionate software engineer skilled in <TypewriterSkills />
                </p>

                <p className="text-sm md:text-base max-w-md leading-relaxed md:-mt-5 -mt-2">
                  I enjoy building efficient, real-world solutions and transforming ideas into elegant, functional code.
                </p>

                {/* CV & CL Button */}
                <div className="pt-2 md:pt-6">
                  <button
                    onClick={toggleFolderModal}
                    className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 text-base md:text-lg font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto md:w-auto"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 mr-2 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    View  CV | CN
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                </div>
              </article>

              {/* RIGHT SECTION - Image */}
              <figure className="flex justify-center md:justify-end items-center md:items-start relative md:-mt-6 ml-0 md:ml-60 mb-3 md:mb-0 order-1 md:order-2 flex-1 md:flex-none">
                <Image
                  src="/HomeMyIconS.png"
                  alt="Sutanth Kunsuraman - Software Engineer"
                  width={450}
                  height={450}
                  className="object-contain rounded-lg w-80 h-80 sm:w-96 sm:h-96 md:w-96 md:h-96 md:w-[450px] md:h-[450px] relative z-10 max-w-[90vw] max-h-[40vh] md:max-w-none md:max-h-none"
                  priority
                />
              </figure>
            </div>
          </div>
        </section>
      </div>

      {/* Folder Modal Overlay - Mobile optimized */}
      {showFolderModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={toggleFolderModal}
        >
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
          
          {/* Modal Content */}
          <div 
            className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl w-full max-w-sm sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={toggleFolderModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors duration-200 p-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-8 sm:mb-12 text-center pt-2">My Documents</h3>

            {/* Folder Component */}
            <div className="flex justify-center">
              <Folder
                color="#10b981"
                size={1.2}
                items={[
                  <div key="cv" className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">CV</span>
                  </div>,
                  <div key="cl" className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">CL</span>
                  </div>
                ]}
                onItemClick={handleFolderItemClick}
              />
            </div>

            {/* Instructions */}
            <p className="text-white/80 text-center mt-6 sm:mt-8 text-xs sm:text-sm px-2">
              Click the folder to open, then click on CV or CL to view documents
            </p>
          </div>
        </div>
      )}
    </main>
  );
}