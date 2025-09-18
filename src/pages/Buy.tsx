"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CarCard from "@/components/CarCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ✅ Import six distinct car images (replace filenames if yours differ)
import car1 from "@/assets/porsche2.jpg";
import car2 from "@/assets/Aston.jpg";
import car3 from "@/assets/ferrari.jpg";
import car4 from "@/assets/lemborgini2.png";
import car5 from "@/assets/bmw2.jpg";
import car6 from "@/assets/merc2.jpg";

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const { toast } = useToast();

  const handleMoreFilters = () => {
    toast({
      title: "Advanced Filters",
      description: "More filtering options coming soon!",
    });
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    toast({
      title: "Sorting Applied",
      description: "Cars have been sorted according to your preference.",
    });
  };

  // ✅ Each car now uses a unique image import
  const carsForSale = [
    {
      id: "1",
      name: "911 Turbo S",
      brand: "Porsche",
      price: 350000,
      image: car1,
      year: 2024,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "2.6s 0-60mph",
      type: "buy" as const,
      featured: true,
      status: "available" as const,
    },
    {
      id: "2",
      name: "DB11",
      brand: "Aston Martin",
      price: 285000,
      image: car2,
      year: 2024,
      fuel: "Gasoline",
      seats: 4,
      acceleration: "3.1s 0-60mph",
      type: "buy" as const,
      status: "available" as const,
    },
    {
      id: "3",
      name: "488 GTB",
      brand: "Ferrari",
      price: 425000,
      image: car3,
      year: 2023,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "3.0s 0-60mph",
      type: "buy" as const,
      featured: true,
      status: "available" as const,
    },
    {
      id: "4",
      name: "Huracan EVO",
      brand: "Lamborghini",
      price: 475000,
      image: car4,
      year: 2024,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "2.9s 0-60mph",
      type: "buy" as const,
      status: "available" as const,
    },
    {
      id: "5",
      name: "M8 Competition",
      brand: "BMW",
      price: 185000,
      image: car5,
      year: 2023,
      fuel: "Gasoline",
      seats: 4,
      acceleration: "3.1s 0-60mph",
      type: "buy" as const,
      status: "sold" as const,
    },
    {
      id: "6",
      name: "AMG GT R",
      brand: "Mercedes",
      price: 295000,
      image: car6,
      year: 2024,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "3.5s 0-60mph",
      type: "buy" as const,
      status: "available" as const,
    },
  ];

  const brands = [
    "all",
    "Porsche",
    "Ferrari",
    "Lamborghini",
    "Aston Martin",
    "BMW",
    "Mercedes",
  ];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-200000", label: "Under $200k" },
    { value: "200000-400000", label: "$200k - $400k" },
    { value: "400000+", label: "Over $400k" },
  ];

  return (
    <div className="min-h-screen bg-[#07060a] text-white">
      {/* Local styles for animations & glows */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .neon-glow {
          box-shadow: 0 6px 30px rgba(124,58,237,0.18), 0 0 18px rgba(77,163,255,0.06);
        }
        .card-hover-glow {
          transition: transform .28s cubic-bezier(.2,.9,.2,1), box-shadow .28s;
        }
        .card-hover-glow:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 18px 50px rgba(124,58,237,0.16), 0 6px 18px rgba(77,163,255,0.06);
        }
        .shimmer-line {
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.02) 100%);
          background-size: 300% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        .glass-panel {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
        }
      `}</style>

      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#efeefe]">
              Buy Your Dream Car
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-[rgba(255,255,255,0.72)]">
              Own a premium vehicle from the world’s top manufacturers. Futuristic
              browsing, no nonsense.
            </p>
            <div className="mt-8 inline-flex items-center space-x-3">
              <div className="h-1 w-28 rounded-full shimmer-line" />
              <div className="h-1 w-10 rounded-full bg-[rgba(124,58,237,0.7)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl p-6 border border-[rgba(124,58,237,0.06)] neon-glow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.6)]" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[rgba(10,10,12,0.6)] text-white placeholder:text-[rgba(255,255,255,0.45)] border border-[rgba(255,255,255,0.04)] focus:ring-2 focus:ring-[rgba(124,58,237,0.22)]"
                />
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="h-10 w-full rounded-md bg-[rgba(10,10,12,0.6)] px-3 py-2 text-sm text-white border border-[rgba(255,255,255,0.04)] focus-visible:ring-2 focus-visible:ring-[rgba(124,58,237,0.22)]"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand === "all" ? "All Brands" : brand}
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-10 w-full rounded-md bg-[rgba(10,10,12,0.6)] px-3 py-2 text-sm text-white border border-[rgba(255,255,255,0.04)] focus-visible:ring-2 focus-visible:ring-[rgba(124,58,237,0.22)]"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Advanced Filters (Fixed styling) */}
              <Button
                size="sm"
                className="justify-center w-full 
                           bg-[rgba(10,10,12,0.6)] 
                           border border-[rgba(124,58,237,0.12)] 
                           text-violet-200 
                           hover:text-white 
                           hover:bg-violet-900/20 
                           hover:shadow-[0_8px_30px_rgba(124,58,237,0.16)] 
                           transition-all"
                onClick={handleMoreFilters}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2 text-violet-300" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[rgba(255,255,255,0.95)]">
              Available Cars ({carsForSale.length})
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[rgba(255,255,255,0.6)]">Sort by:</span>
              <select
                className="text-sm rounded-md px-3 py-1 bg-[rgba(10,10,12,0.6)] border border-[rgba(255,255,255,0.04)]"
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year">Year: Newest First</option>
                <option value="brand">Brand: A to Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsForSale.map((car) => (
              <div
                key={car.id}
                className="relative rounded-2xl overflow-hidden card-hover-glow"
              >
                {/* Neon glow layer */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow:
                      "inset 0 0 60px rgba(8,6,12,0.75), 0 12px 40px rgba(124,58,237,0.09)",
                    zIndex: 0,
                  }}
                />

                {/* Featured/Sold badge */}
                {car.featured && (
                  <div className="absolute right-3 top-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(124,58,237,0.18)] border border-[rgba(124,58,237,0.12)] text-white">
                    Featured
                  </div>
                )}
                {car.status === "sold" && (
                  <div className="absolute left-3 top-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(255,20,80,0.08)] text-[rgba(255,100,120,0.9)] border border-[rgba(255,100,120,0.05)]">
                    Sold
                  </div>
                )}

                <div style={{ position: "relative", zIndex: 10 }}>
                  <CarCard car={car} mode="buy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buy;
