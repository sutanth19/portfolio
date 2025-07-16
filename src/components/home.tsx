"use client";

import Image from "next/image";
import Link from "next/link";
import AnimationHome from "./animationHome";
import SplitText from "@/components/reactbits/TextAnimations/SplitText";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-backgroundLight dark:bg-backgroundDark text-foregroundLight dark:text-foregroundDark overflow-hidden">
      {/* Matrix Animation Background */}
      <AnimationHome />

      {/* Main Content */}
      <div className="relative z-10 pt-16">
        <section className="section-container grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[85vh]">
          {/* LEFT SECTION */}
          <article className="space-y-4 flex flex-col justify-center -mt-16">
            <p className="text-sm text-muted-foreground">HI THERE 👋 I'M</p>
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
            <h2 className="text-xl font-semibold text-green-500">
              Software Engineer
            </h2>
            <p className="text-base max-w-md">
              I'm a passionate software engineer skilled in frontend, backend, mobile, and full-stack development. I love turning ideas into code
            </p>
          </article>

          {/* RIGHT SECTION */}
          <figure className="flex justify-center md:justify-end items-start relative -mt-6 ml-0 md:ml-60">
            <Image
              src="/HomeMyIconS.png"
              alt="Sutanth Kunsuraman - Software Engineer"
              width={450}
              height={450}
              layout="intrinsic"
              className="object-contain rounded-lg w-96 h-96 md:w-[450px] md:h-[450px] relative z-10"
              priority
            />
          </figure>
        </section>
      </div>
    </main>
  );
}
