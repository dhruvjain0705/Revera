"use client";

import { Star } from "lucide-react";
import { FocusCards } from "@/components/ui/focus-cards";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

// Brand images (replace with your own assets if needed)
import bmwCar from "@/assets/bmw.jpg";
import mercedesCar from "@/assets/mercedes.jpg";
import audiCar from "@/assets/audi.jpg";
import porscheCar from "@/assets/porsche.jpg";
import ferrariCar from "@/assets/ferrari.jpg";
import lamborghiniCar from "@/assets/lamborghini.jpg";

const FeaturedCars = () => {
  // 6 Best-selling luxury cars from different brands
  const featuredCars = [
    { name: "BMW 7 Series", image: bmwCar },
    { name: "Mercedes-Benz S-Class", image: mercedesCar },
    { name: "Audi R8", image: audiCar },
    { name: "Porsche 911 Turbo S", image: porscheCar },
    { name: "Ferrari 488 ", image: ferrariCar },
    { name: "Lamborghini Aventador", image: lamborghiniCar },
  ];

  // Prepare data for FocusCards
  const focusCards = featuredCars.map((car) => ({
    title: car.name,
    src:
      typeof car.image === "string"
        ? car.image
        : (car.image as { src: string }).src,
    className: "w-full h-72 object-cover rounded-xl", // ✅ Force same height and crop
  }));

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-zinc-900/80 to-neutral-950 text-white overflow-hidden">
      {/* Subtle glowing background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 rounded-full px-4 py-2 mb-4 border border-purple-500/20">
            <Star className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 font-medium">
              Best-Selling Luxury Collection
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Iconic Luxury Cars
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent block">
              From the World’s Finest Brands
            </span>
          </h2>
        </div>

        {/* Futuristic Focus Cards */}
        <div className="mb-20">
          <FocusCards cards={focusCards} />
        </div>

        {/* Hover Border Gradient Button */}
        <div className="flex justify-center">
          <HoverBorderGradient
            as="button"
            containerClassName="rounded-full"
            className="bg-zinc-950 dark:bg-zinc-950 text-white flex items-center px-8 py-3 text-lg font-bold"
          >
            Explore Featured Cars
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
