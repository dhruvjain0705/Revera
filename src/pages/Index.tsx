"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import { ArrowRight, Star, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Premium Selection",
    description:
      "Handpicked luxury vehicles from the world's finest manufacturers",
  },
  {
    icon: Shield,
    title: "Guaranteed Quality",
    description:
      "Every vehicle is thoroughly inspected and comes with comprehensive warranty",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service and roadside assistance",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Automotive specialists with decades of luxury car experience",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-900/70 to-black overflow-hidden">
        {/* Animated floating background lights */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-blob"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Revéra?
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We deliver an unparalleled luxury automotive experience with every
            interaction.
          </motion.p>

          {/* Futuristic black square feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group rounded-xl bg-black/70 border border-white/10 shadow-lg backdrop-blur-md transition-all duration-500 hover:shadow-purple-500/20 hover:border-purple-400/30 flex flex-col items-center justify-center text-center aspect-square"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 blur-xl"></div>

                <div className="relative z-10 flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-black border border-white/20 shadow-inner">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-lg font-medium mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm relative z-10 max-w-[90%]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <FeaturedCars />
    </div>
  );
};

export default Index;
