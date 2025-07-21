"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Github, Linkedin, MessageCircle, Copy, Check } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"; // Adjust path if needed


const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  
  // Refs for scroll animation
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contactMethodsRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText("sutanthkunsuraman@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email");
    }
  };

  const handleCopyPhone = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText("+60 017 4018938");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone");
    }
  };

  // Intersection Observer for bidirectional scroll animations
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.2,
      rootMargin: '0px 0px -10px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        
        // Keep header visible once animated in (one-time animation)
        if (element === headerRef.current) {
          if (entry.isIntersecting && element.style.opacity === '0') {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0px)';
          }
        } else {
          // Bidirectional animation for other elements
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0px)';
          } else {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
          }
        }
      });
    }, observerOptions);

    const refs = [headerRef, imageRef, contactMethodsRef, socialLinksRef, tagsRef];
    refs.forEach((ref, index) => {
      if (ref.current) {
        // Set initial state
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(30px)';
        ref.current.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "sutanthkunsuraman@gmail.com",
      action: handleCopyEmail,
      copied: copiedEmail,
      color: "hover:border-blue-400/50 hover:bg-blue-500/10"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      value: "+60 017 4018938",
      action: handleCopyPhone,
      copied: copiedPhone,
      color: "hover:border-green-400/50 hover:bg-green-500/10"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/sutanth-kunsuraman-367254306",
      color: "hover:bg-blue-600/20 hover:border-blue-400/50"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      url: "https://github.com/sutanth19",
      color: "hover:bg-gray-600/20 hover:border-gray-400/50"
    }
  ];

  return (
  <BackgroundBeamsWithCollision className="section-spacing min-h-screen">
    <section className="section-container relative z-10">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Let's Connect
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left - Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="w-full max-w-md">
              <Image
                src="/hye.png"
                alt="Sutanth Kunsuraman"
                width={300}
                height={300}
                className="rounded-xl mx-auto"
              />
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-8 flex flex-col">
            {/* Contact Methods */}
            <div ref={contactMethodsRef}>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Get In Touch
              </h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm transition-all duration-300 cursor-pointer group ${method.color}`}
                    onClick={method.action}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gray-800/50 text-gray-300">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{method.label}</p>
                        <p className="text-gray-400 text-sm">{method.value}</p>
                      </div>
                    </div>
                    <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                      {method.copied ? (
                        <div className="flex items-center space-x-2 text-green-400">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Copied!</span>
                        </div>
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div ref={socialLinksRef}>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Find Me Online
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 transition-all duration-300 group ${social.color}`}
                  >
                    <div className="p-2 rounded-lg bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/50 transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <span className="font-medium text-white block">{social.label}</span>
                      <span className="text-gray-400 text-sm">View Profile</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div ref={tagsRef} className="pt-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">
                  Open to opportunities
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs text-purple-200">
                  Quick response
                </span>
                <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-xs text-green-200">
                  Always learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BackgroundBeamsWithCollision>


  );
};

export default Contact;