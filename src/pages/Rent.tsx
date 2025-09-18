"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CarCard from "@/components/CarCard";
import { Search, Calendar, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Images (your imports)
import car1 from "@/assets/carrera.jpeg";
import car2 from "@/assets/vantage.jpg";
import car3 from "@/assets/spider.jpg";
import car4 from "@/assets/lembo1.jpg";
import car5 from "@/assets/bmw3.jpg";
import car6 from "@/assets/merc22.jpg";

const Rent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [rentalDuration, setRentalDuration] = useState("daily");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!pickupDate || !returnDate) {
      toast({
        title: "Missing Information",
        description: "Please select pickup and return dates.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Searching Cars",
      description: `Found available cars in ${
        selectedLocation === "all" ? "all locations" : selectedLocation
      }.`,
    });
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    toast({
      title: "Sorting Applied",
      description: "Cars have been sorted according to your preference.",
    });
  };

  const carsForRent = [
    {
      id: "1",
      name: "911 Carrera",
      brand: "Porsche",
      price: 320000,
      rentPrice: 850,
      image: car1,
      year: 2024,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "3.2s 0-60mph",
      type: "rent" as const,
      featured: true,
      status: "available" as const,
    },
    {
      id: "2",
      name: "V8 Vantage",
      brand: "Aston Martin",
      price: 265000,
      rentPrice: 750,
      image: car2,
      year: 2024,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "3.6s 0-60mph",
      type: "rent" as const,
      status: "available" as const,
    },
    {
      id: "3",
      name: "F8 Spider",
      brand: "Ferrari",
      price: 385000,
      rentPrice: 1200,
      image: car3,
      year: 2023,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "2.9s 0-60mph",
      type: "rent" as const,
      featured: true,
      status: "rented" as const,
    },
    {
      id: "4",
      name: "Gallardo",
      brand: "Lamborghini",
      price: 415000,
      rentPrice: 1100,
      image: car4,
      year: 2024,
      fuel: "Gasoline",
      seats: 2,
      acceleration: "3.1s 0-60mph",
      type: "rent" as const,
      status: "available" as const,
    },
    {
      id: "5",
      name: "M4 Convertible",
      brand: "BMW",
      price: 145000,
      rentPrice: 450,
      image: car5,
      year: 2023,
      fuel: "Gasoline",
      seats: 4,
      acceleration: "3.8s 0-60mph",
      type: "rent" as const,
      status: "available" as const,
    },
    {
      id: "6",
      name: "AMG C63 S",
      brand: "Mercedes",
      price: 195000,
      rentPrice: 550,
      image: car6,
      year: 2024,
      fuel: "Gasoline",
      seats: 4,
      acceleration: "3.7s 0-60mph",
      type: "rent" as const,
      status: "available" as const,
    },
  ];

  const locations = [
    "all",
    "New York",
    "Los Angeles",
    "Miami",
    "Las Vegas",
    "San Francisco",
  ];
  const durations = [
    { value: "daily", label: "   Daily Rental" },
    { value: "weekly", label: "Weekly Rental" },
    { value: "monthly", label: "Monthly Rental" },
    { value: "weekend", label: "Weekend Special" },
  ];

  return (
    <div className="min-h-screen bg-[#07060a] text-white">
      {/* Local styles for the Buy-like theme (glass, neon, shimmer) */}
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

      {/* Hero - mirrored from Buy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#efeefe]">
            Rent Luxury Cars
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[rgba(255,255,255,0.72)]">
            Short-term thrills, long-lasting memories. Browse premium rentals with transparent pricing.
          </p>
          <div className="mt-8 inline-flex items-center space-x-3">
            <div className="h-1 w-28 rounded-full shimmer-line" />
            <div className="h-1 w-10 rounded-full bg-[rgba(124,58,237,0.7)]" />
          </div>
        </div>
      </section>

      {/* Quick Booking - glass panel like Buy filters */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl p-6 border border-[rgba(124,58,237,0.06)] neon-glow">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.6)]" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="h-10 w-full rounded-md bg-[rgba(10,10,12,0.6)] px-3 py-2 text-sm text-white border border-[rgba(255,255,255,0.04)] focus-visible:ring-2 focus-visible:ring-[rgba(124,58,237,0.22)]"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pick-up Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.6)]" />
                <Input
                  type="date"
                  placeholder="Pick-up date"
                  className="pl-10 bg-[rgba(10,10,12,0.6)] text-white placeholder:text-[rgba(255,255,255,0.45)] border border-[rgba(255,255,255,0.04)] focus:ring-2 focus:ring-[rgba(124,58,237,0.22)]"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              {/* Return Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.6)]" />
                <Input
                  type="date"
                  placeholder="Return date"
                  className="pl-10 bg-[rgba(10,10,12,0.6)] text-white placeholder:text-[rgba(255,255,255,0.45)] border border-[rgba(255,255,255,0.04)] focus:ring-2 focus:ring-[rgba(124,58,237,0.22)]"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>

              {/* Duration */}
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.6)]" />
                <select
                  value={rentalDuration}
                  onChange={(e) => setRentalDuration(e.target.value)}
                  className="h-10 w-full rounded-md bg-[rgba(10,10,12,0.6)] px-3 py-2 text-sm text-white border border-[rgba(255,255,255,0.04)] focus-visible:ring-2 focus-visible:ring-[rgba(124,58,237,0.22)]"
                >
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button - same styling as Buy 'More Filters' button but action primary */}
              <Button
                className="justify-center w-full 
                           bg-[rgba(10,10,12,0.6)] 
                           border border-[rgba(124,58,237,0.12)] 
                           text-violet-200 
                           hover:text-white 
                           hover:bg-violet-900/20 
                           hover:shadow-[0_8px_30px_rgba(124,58,237,0.16)] 
                           transition-all h-10"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2 text-violet-300" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features - small, dark version */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-[rgba(124,58,237,0.06)] p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="font-semibold text-[rgba(255,255,255,0.92)]">Flexible Booking</h4>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">Book for hours, days, or weeks</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[rgba(124,58,237,0.06)] p-3 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="font-semibold text-[rgba(255,255,255,0.92)]">Multiple Locations</h4>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">Pick up from convenient locations</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[rgba(124,58,237,0.06)] p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="font-semibold text-[rgba(255,255,255,0.92)]">24/7 Support</h4>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">Always here to help you</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[rgba(124,58,237,0.06)] p-3 rounded-full mb-3">
                <Search className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="font-semibold text-[rgba(255,255,255,0.92)]">Easy Process</h4>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">Simple booking in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Cars - mirrored card styling */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[rgba(255,255,255,0.95)]">
              Available for Rent ({carsForRent.length})
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
                <option value="popular">Most Popular</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsForRent.map((car) => (
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

                {/* Badges */}
                {car.featured && (
                  <div className="absolute right-3 top-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(124,58,237,0.18)] border border-[rgba(124,58,237,0.12)] text-white">
                    Featured
                  </div>
                )}
                {car.status === "rented" && (
                  <div className="absolute left-3 top-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(255,20,80,0.04)] text-[rgba(255,100,120,0.9)] border border-[rgba(255,100,120,0.05)]">
                    Rented
                  </div>
                )}

                <div style={{ position: "relative", zIndex: 10 }}>
                  <CarCard car={car} mode="rent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rent;
