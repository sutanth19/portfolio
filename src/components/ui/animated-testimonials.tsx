"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  techStack: string;
  src: string;
};

// Enhanced intersection observer hook
function useIntersectionObserver(threshold = 0.1, rootMargin = "0px") {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isIntersecting, intersectionRatio };
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const { ref: containerRef, isIntersecting } = useIntersectionObserver(0.3);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay && isIntersecting) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isIntersecting]);

  return (
    <>
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 py-6 font-sans antialiased">
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Section with Fixed Size */}
          <div className="order-2 lg:order-1">
            <div className="relative h-96 w-full">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={testimonials[active].src}
                  alt={testimonials[active].name}
                  width={500}
                  height={400}
                  draggable={false}
                  className="h-96 w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Content Section with Staggered Animations */}
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              {/* Project Title with Slide Animation */}
              <div className={`space-y-1 transform transition-all duration-1000 ease-out ${
                isIntersecting 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '200ms' }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-white leading-tight relative group">
                  <span className="relative z-10">{testimonials[active].name}</span>
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
                </h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-neutral-400 font-medium">
                  {testimonials[active].designation}
                </p>
              </div>
              
              {/* Tech Stack Section with Bounce Animation */}
              <div className={`space-y-2 transform transition-all duration-1000 ease-out ${
                isIntersecting 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '400ms' }}>
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Tech Stack
                </h4>
                <div className="h-20 overflow-hidden">
                  <div className="flex flex-wrap gap-2">
                    {testimonials[active].techStack.split(', ').map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-xs lg:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200/50 dark:border-blue-700/50 font-medium"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animation: isIntersecting ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Description with Typewriter Effect */}
              <div className={`space-y-3 transform transition-all duration-1000 ease-out ${
                isIntersecting 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '600ms' }}>
                <p className="text-base lg:text-lg text-gray-700 dark:text-neutral-300 leading-relaxed">
                  {testimonials[active].quote}
                </p>
              </div>
            </div>

            {/* Navigation Controls with Pulse Animation */}
            <div className={`flex items-center justify-between pt-2 transform transition-all duration-1000 ease-out ${
              isIntersecting 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '800ms' }}>
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-gray-200 dark:border-neutral-700"
                >
                  <IconArrowLeft className="h-5 w-5 text-gray-700 dark:text-neutral-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-gray-200 dark:border-neutral-700"
                >
                  <IconArrowRight className="h-5 w-5 text-gray-700 dark:text-neutral-300" />
                </button>
              </div>
              
              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full ${
                      index === active 
                        ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'w-2 bg-gray-300 dark:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};