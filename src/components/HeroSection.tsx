"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import "../styles/globals.css"; // ensure Necosmic font is imported

const HeroSection = () => {
  const headingText = "Revéra";
  const letters = headingText.split("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white text-center overflow-hidden px-4">
      {/* Heading with letter-by-letter animation */}
      <motion.h1
        className="md:text-5xl text-3xl lg:text-6xl font-medium text-center text-white relative z-20 tracking-tight font-necosmic flex justify-center"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              x: Math.random() > 0.5 ? 50 : -50, // from left or right
              y: Math.random() > 0.5 ? 50 : -50, // from top or bottom
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Sparkles Effect */}
      <div className="w-[40rem] h-40 relative mt-6">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core Sparkles */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient Mask */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
