"use client";

import { Button } from "@/components/ui/button";
import { Award, Users, Star, Shield, Clock, Heart } from "lucide-react";
import featuredCarsImage from "@/assets/featured-cars.jpg";

const About = () => {
  const stats = [
    { number: "500+", label: "Luxury Vehicles", icon: Star },
    { number: "50+", label: "Premium Brands", icon: Award },
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "15+", label: "Years Experience", icon: Clock },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Every vehicle is thoroughly inspected and insured. Your safety and peace of mind are our top priorities.",
    },
    {
      icon: Star,
      title: "Luxury Experience",
      description:
        "We curate only the finest vehicles and provide white-glove service to ensure an exceptional experience.",
    },
    {
      icon: Heart,
      title: "Passion for Cars",
      description:
        "Our team consists of automotive enthusiasts who understand the thrill and emotion of luxury vehicles.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction drives everything we do. We build lasting relationships, not just transactions.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07060a] text-white">
      <style>{`
        .card-hover-glow {
          transition: transform .28s cubic-bezier(.2,.9,.2,1), box-shadow .28s;
        }
        .card-hover-glow:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 18px 50px rgba(124,58,237,0.16), 0 6px 18px rgba(77,163,255,0.06);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#efeefe]">
                Redefining Luxury
                <span className="block text-[rgba(124,58,237,0.95)]">
                  Automotive Experience
                </span>
              </h1>
              <p className="mt-4 text-lg text-[rgba(255,255,255,0.72)] max-w-xl">
                For over 15 years, Revéra has been the premier destination for
                luxury vehicle enthusiasts. We don't just sell or rent cars —
                we deliver dreams with integrity and ceremony.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button className="bg-[rgba(124,58,237,0.9)] text-white hover:brightness-95 shadow-[0_10px_40px_rgba(124,58,237,0.12)]">
                  Our Story
                </Button>
                <Button
                  variant="ghost"
                  className="border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.86)] hover:bg-[rgba(255,255,255,0.02)]"
                >
                  Browse Cars
                </Button>
              </div>
            </div>

            <div className="relative card-hover-glow rounded-2xl overflow-hidden">
              <img
                src={featuredCarsImage}
                alt="Luxury car showroom"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 60px rgba(8,6,12,0.75)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="bg-[rgba(124,58,237,0.08)] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <s.icon className="h-6 w-6 text-[rgba(124,58,237,0.95)]" />
                </div>
                <div className="text-2xl font-bold text-[#efeefe]">
                  {s.number}
                </div>
                <div className="text-[rgba(255,255,255,0.6)] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Rating in SAME card */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl p-8 md:p-12 card-hover-glow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#efeefe] mb-4">
                  Our Mission
                </h2>
                <p className="text-[rgba(255,255,255,0.72)] mb-6">
                  To make luxury automotive experiences accessible, enjoyable,
                  and unforgettable. Whether you're buying your dream car or
                  renting for a special occasion, we're here to exceed your
                  expectations at every turn.
                </p>
                <ul className="space-y-3 text-[rgba(255,255,255,0.66)]">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 bg-[rgba(124,58,237,0.95)] rounded-full" />
                    <span>Handpicked luxury vehicles from premium brands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 bg-[rgba(124,58,237,0.95)] rounded-full" />
                    <span>Comprehensive insurance and warranty coverage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 bg-[rgba(124,58,237,0.95)] rounded-full" />
                    <span>24/7 concierge support and roadside assistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 bg-[rgba(124,58,237,0.95)] rounded-full" />
                    <span>Flexible financing and rental options</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[rgba(255,255,255,0.02)] rounded-xl p-6 border border-[rgba(255,255,255,0.03)] text-center">
                <div className="text-4xl font-bold text-[rgba(124,58,237,0.95)] mb-2">
                  4.9
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-[rgba(124,58,237,0.95)] fill-current"
                    />
                  ))}
                </div>
                <div className="text-[rgba(255,255,255,0.66)] text-sm">
                  Average customer rating from 10,000+ reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#efeefe] mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-[rgba(255,255,255,0.02)] rounded-xl p-5 border border-[rgba(255,255,255,0.03)] card-hover-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[rgba(124,58,237,0.08)] p-3 rounded-lg">
                    <v.icon className="h-5 w-5 text-[rgba(124,58,237,0.95)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#efeefe] mb-1">
                      {v.title}
                    </h4>
                    <p className="text-[rgba(255,255,255,0.66)]">
                      {v.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-[rgba(124,58,237,0.06)]">
            <div>
              <h4 className="text-xl font-bold text-[#efeefe]">
                Ready to Experience Luxury?
              </h4>
              <p className="text-[rgba(255,255,255,0.66)]">
                Join thousands of satisfied customers who trust Revéra with
                their automotive needs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-[rgba(124,58,237,0.94)] text-white hover:brightness-95">
                Browse Cars
              </Button>
              <Button
                variant="ghost"
                className="border border-[rgba(255,255,255,0.04)]"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
