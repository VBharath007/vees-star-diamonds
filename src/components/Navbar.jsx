"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Home, Info, MapPin, Sparkles, Gem, Diamond, Factory, Image, Mail, Search, ShoppingCart, User } from "lucide-react";
import Dock from "./ui/Dock";
import { GlassButton } from "./ui/glass-button";
import BottomNavbar from "./BottomNavbar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const routes = [
      "/",
      "/about",
      "/custom-build",
      "/solitaires",
      "/gallery",
      "/contact",
      "/rough-diamonds",
      "/manufacturing",
      "/karaikudi",
      "/blog",
      "/lifetime-of-service",
      "/wfh-franchise"
    ];
    routes.forEach(route => {
      try {
        router.prefetch(route);
      } catch (err) {
        console.warn("Failed to prefetch route:", route, err);
      }
    });
  }, [router]);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Info },
    { label: "Karaikudi", href: "/karaikudi", icon: MapPin },
    { label: "Custom Build", href: "/custom-build", icon: Sparkles },
    { label: "Solitaires", href: "/solitaires", icon: Gem },
    { label: "Rough Diamonds", href: "/rough-diamonds", icon: Diamond },
    { label: "Manufacturing", href: "/manufacturing", icon: Factory },
    { label: "Gallery", href: "/gallery", icon: Image },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  const dockItems = navItems.map((item) => {
    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
    const IconComponent = item.icon;
    return {
      label: item.label,
      onClick: () => router.push(item.href),
      isActive,
      icon: <IconComponent className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.7} />,
    };
  });

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex flex-col">
  
  
        {/* ── MAIN NAVBAR ── */}
        <div className={`w-full border-b border-[#C9A84C]/10 py-4 px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled
          ? "bg-[#0E0C0A]/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#0E0C0A]/95 backdrop-blur-md"
          }`}>
  
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group relative z-50 flex-shrink-0" title="Vees Star Diamonds | Best GIA Diamond Showroom Chennai & Karaikudi">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center bg-gradient-to-br from-[#0B3C8F] to-[#041F50] border border-[#C9A84C]/20 rounded-lg overflow-hidden shadow-lg group-hover:border-[#C9A84C]/50 transition-all duration-300">
              <img src="/VEES STAR LOGO 1.png" alt="Vees Star Diamonds Logo" className="w-full h-full object-cover scale-[1.05]" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm sm:text-base lg:text-lg font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase leading-none">
                Vees Star
              </span>
              <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mt-1 leading-none">
                Diamonds
              </span>
            </div>
          </Link>
  
          {/* Desktop Dock - Centered */}
          <div className="hidden lg:flex flex-1 justify-center items-center mx-6">
            <Dock
              items={dockItems}
              className="bg-[#0E0C0A]/85 backdrop-blur-xl border border-[#C9A84C]/20 shadow-lg"
              baseItemSize={46}
              magnification={58}
              distance={140}
              panelHeight={66}
              spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
            />
          </div>
  
          {/* Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 relative z-50 flex-shrink-0">
            <GlassButton size="sm" onClick={() => router.push("/contact")} className="text-xs">
              VIP Desk
            </GlassButton>
          </div>
        </div>
      </header>
  
      {/* Mobile & Tablet Floating Curved Bottom Navbar */}
      <BottomNavbar />
    </>
  );
}
