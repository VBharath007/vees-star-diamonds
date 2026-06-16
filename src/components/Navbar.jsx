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
  
        {/* ── TOP UTILITY BAR — hidden on mobile ── */}
        <div className="hidden sm:flex w-full bg-[#0A0806] border-b border-[#C9A84C]/8 py-2.5 px-6 md:px-12 flex-row items-center justify-between text-[11px] font-semibold tracking-wider uppercase">
          <div className="hidden md:flex flex-wrap items-center gap-5">
            <Link href="/about" className="text-[#C4BAB0] hover:text-[#C9A84C] transition-colors">Learn and Explore</Link>
            <Link href="/about#7cs" className="text-[#C4BAB0] hover:text-[#C9A84C] transition-colors">7C Diamonds</Link>
            <Link href="/about#faq" className="text-[#C4BAB0] hover:text-[#C9A84C] transition-colors">FAQ</Link>
            <Link href="/#testimonials" className="text-[#C4BAB0] hover:text-[#C9A84C] transition-colors">Testimonials</Link>
            <Link href="/contact" className="text-[#C4BAB0] hover:text-[#C9A84C] transition-colors">Book Appointment</Link>
          </div>
          <div className="flex items-center space-x-5 ml-auto">
            <a href="tel:+919383007477" className="flex items-center space-x-1.5 text-[#C4BAB0] hover:text-[#C9A84C] transition-colors normal-case text-[11px]">
              <Phone className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>+91 93830 07477</span>
            </a>
            <div className="flex items-center space-x-3 border-l border-[#C9A84C]/10 pl-4">
              <a href="https://facebook.com" target="_blank" className="text-[#7A6E66] hover:text-[#C4BAB0] transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" className="text-[#7A6E66] hover:text-[#C4BAB0] transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
  
        {/* ── MAIN NAVBAR ── */}
        <div className={`w-full border-b border-[#C9A84C]/10 py-4 px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled
          ? "bg-[#0E0C0A]/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#0E0C0A]/95 backdrop-blur-md"
          }`}>
  
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group relative z-50 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center bg-gradient-to-br from-[#0B3C8F] to-[#041F50] border border-[#C9A84C]/20 rounded-lg p-1 sm:p-1.5 shadow-lg group-hover:border-[#C9A84C]/50 transition-all duration-300">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,5 64,36 98,38 72,59 80,93 50,73 20,93 28,59 2,38 36,36"
                  stroke="rgba(255,255,255,0.7)" strokeWidth="4.5"
                  className="group-hover:stroke-[#C9A84C] transition-colors duration-300" />
                <polygon points="50,28 65,43 50,70 35,43" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeWidth="3.5" />
                <line x1="50" y1="28" x2="50" y2="70" stroke="#C9A84C" strokeWidth="2.5" />
                <line x1="35" y1="43" x2="65" y2="43" stroke="#C9A84C" strokeWidth="2.5" />
              </svg>
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
