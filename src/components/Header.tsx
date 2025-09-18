import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Car, User, Heart } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "./signin";

type NavItem = { name: string; href: string };

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Buy Cars", href: "/buy" },
  { name: "Rent Cars", href: "/rent" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", onKey);
      const firstFocusable =
        mobileMenuRef.current?.querySelector<HTMLElement>(
          'a,button,[tabindex]:not([tabindex="-1"])'
        );
      firstFocusable?.focus();
    } else {
      document.removeEventListener("keydown", onKey);
    }

    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const handleFavorites = () => {
    toast({
      title: "Favorites",
      description: "View your saved cars and favorites.",
    });
  };

  const handleGetStarted = () => {
    navigate("/rent");
    toast({
      title: "Welcome to Revéra!",
      description: "Start browsing our premium car collection.",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group" aria-label="Revéra home">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#0f0f0f] to-[#0b0510] shadow-[0_0_12px_rgba(124,58,237,0.18)] group-hover:shadow-[0_0_22px_rgba(124,58,237,0.35)] transition-shadow">
              <Car className="h-6 w-6 text-violet-300 group-hover:text-violet-100 transition-colors" />
            </div>
            <span className="text-xl font-bold text-violet-300 tracking-wide">Revéra</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all px-2 py-1 rounded-md ${
                    isActive
                      ? "text-violet-100 border-b-2 border-violet-500 pb-4"
                      : "text-muted-foreground hover:text-violet-200 hover:translate-y-[-2px]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Favorites */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorites}
              aria-label="Favorites"
              className="relative overflow-visible text-violet-200 hover:text-white transition-all hover:bg-violet-900/10 hover:shadow-[0_8px_30px_rgba(124,58,237,0.28)]"
            >
              <Heart className="h-4 w-4 mr-2 text-violet-300" />
              <span className="relative z-10">Favorites</span>
            </Button>

            {/* Sign In - styled same as Favorites */}
            <AuthModal>
              <Button
                variant="ghost"
                size="sm"
                aria-haspopup="dialog"
                className="relative overflow-visible text-violet-200 hover:text-white transition-all hover:bg-violet-900/10 hover:shadow-[0_8px_30px_rgba(124,58,237,0.28)]"
              >
                <User className="h-4 w-4 mr-2 text-violet-300" />
                <span className="relative z-10">Sign In</span>
              </Button>
            </AuthModal>

            {/* Get Started */}
            <Button
              variant="hero"
              size="sm"
              onClick={handleGetStarted}
              className="relative overflow-hidden px-4 py-2 rounded-md bg-gradient-to-r from-[#5b21b6] to-[#8b5cf6] text-white hover:scale-105 transform transition-all shadow-[0_6px_25px_rgba(139,92,246,0.18)] hover:shadow-[0_0_28px_rgba(124,58,237,0.45)]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.0))]" />
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              ref={menuButtonRef}
              className="text-violet-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="md:hidden border-t border-violet-900 bg-gradient-to-b from-black/80 to-[#07060a] backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-violet-900/40 text-violet-200"
                        : "text-muted-foreground hover:text-violet-200 hover:bg-violet-900/10"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="pt-4 space-y-2">
                <AuthModal>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-violet-200 hover:text-white hover:bg-violet-900/10 hover:shadow-[0_8px_30px_rgba(124,58,237,0.28)]"
                  >
                    <User className="h-4 w-4 mr-2 text-violet-300" />
                    <span className="relative z-10">Sign In</span>
                  </Button>
                </AuthModal>

                <Button
                  variant="hero"
                  className="w-full bg-gradient-to-r from-[#5b21b6] to-[#8b5cf6] text-white rounded-md shadow-[0_8px_30px_rgba(124,58,237,0.28)] hover:scale-105 transform transition-all"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleGetStarted();
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;