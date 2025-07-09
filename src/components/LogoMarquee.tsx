"use client";

import { motion } from "framer-motion";

export default function LogoMarquee() {
  const logos = [
    "html-5",
    "css",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "jwt",
    "express",
    "php",
    "mysql",
    "mongodb",
    "firebase",
    "tailwindcss",
    "mui",
    "python",
    "java",
    "c",
    "cplusplus",
    "git",
    "github",
    "postman",
    "figma",
    "expo",
    "django",
    "xampp",
    "vitejs", 
  ];

  return (
    <section className="overflow-hidden py-10 bg-backgroundLight dark:bg-backgroundDark">
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {logos.map((name, i) => (
          <img
            key={i}
            src={`/logos/${name}.svg`}
            alt={name}
            className="h-12 w-auto"
          />
        ))}
        {/* Repeat for seamless looping */}
        {logos.map((name, i) => (
          <img
            key={`repeat-${i}`}
            src={`/logos/${name}.svg`}
            alt={name}
            className="h-12 w-auto"
          />
        ))}
      </motion.div>
    </section>
  );
}
