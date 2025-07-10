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
    "Vite.js",
  ];

  // Duplicate the array to create a seamless loop
  const allLogos = logos.concat(logos);

  return (
    <section className="overflow-hidden py-1 bg-backgroundLight dark:bg-backgroundDark">
      <motion.div
        className="flex gap-6"
        style={{
          // Each logo container is 4rem wide (w-16) + 1.5rem gap;
          // duplicating logos.list length gives total width of two sets
          width: `calc(2 * (4rem + 1.5rem) * ${logos.length})`,
        }}
        animate={{ x: ["0%", "-50%"] }}                // slide from start to halfway
        transition={{
          duration: 40,                                 // adjust speed as desired
          ease: "linear",                              // perfectly constant speed
          repeat: Infinity,                            // loop forever
        }}
      >
        {allLogos.map((name, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-xl bg-[#1f1f1f] dark:bg-[#2a2a2a] flex items-center justify-center shadow-md"
          >
            <img
              src={`/logos/${name}.svg`}
              alt={name}
              className="w-8 h-8 object-contain"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
