"use client";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import LogoMarquee from "@/components/LogoMarquee"
export default function TechStackSection() {
  return (
    <section
      id="techstack"
      className="py-20 bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <h2 className="text-3xl md:text-5xl font-bold text-left">
          Tech Stack & Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Frontend */}
          <CardSpotlight 
            className="h-auto p-6 bg-neutral-900 border-neutral-800"
            color="#22c55e"
            radius={300}
          >
            <div className="relative z-20">
              <h3 className="text-xl font-semibold text-green-400 mb-4">Frontend</h3>
              <div className="space-y-2 text-neutral-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  HTML, CSS, JavaScript, TypeScript
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  React.js, React Native, Next.js, Vite
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Tailwind CSS, MUI
                </div>
              </div>
            </div>
          </CardSpotlight>

          {/* Backend */}
          <CardSpotlight 
            className="h-auto p-6 bg-neutral-900 border-neutral-800"
            color="#3b82f6"
            radius={300}
          >
            <div className="relative z-20">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Backend</h3>
              <div className="space-y-2 text-neutral-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Node.js, Express.js, PHP
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  REST API, JWT, Auth.js
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Firebase Authentication
                </div>
              </div>
            </div>
          </CardSpotlight>

          {/* Database */}
          <CardSpotlight 
            className="h-auto p-6 bg-neutral-900 border-neutral-800"
            color="#f59e0b"
            radius={300}
          >
            <div className="relative z-20">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">Database</h3>
              <div className="space-y-2 text-neutral-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  MySQL, Firebase Realtime DB
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  SQL Server, MongoDB
                </div>
              </div>
            </div>
          </CardSpotlight>

          {/* Tools */}
          <CardSpotlight 
            className="h-auto p-6 bg-neutral-900 border-neutral-800"
            color="#8b5cf6"
            radius={300}
          >
            <div className="relative z-20">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Tools & Platforms</h3>
              <div className="space-y-2 text-neutral-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Git, GitHub, VS Code
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Postman, XAMPP, Expo
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Figma, Chart.js, DataTables
                </div>
              </div>
            </div>
          </CardSpotlight>
        </div>
        <LogoMarquee />
      </div>
    </section>
    
  );
}