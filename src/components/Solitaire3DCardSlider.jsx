"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from "lucide-react";

export default function Solitaire3DCardSlider({ collections, imageType, onInquiry }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Monitor viewport size to adjust overlap translation dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!collections || collections.length === 0) return null;

  const total = collections.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Generate 3D transform attributes based on circular offset distance
  const getCardStyle = (index) => {
    let diff = index - activeIndex;

    // Handle wrapping for circular loop (shortest path)
    if (diff < -total / 2) diff += total;
    if (diff > total / 2) diff -= total;

    const absDiff = Math.abs(diff);

    // Hide cards that are far away
    if (absDiff > 2) {
      return {
        opacity: 0,
        pointerEvents: "none",
        zIndex: 0,
        transform: "translateX(-50%) translateY(-50%) scale(0.5) rotateY(0deg)",
      };
    }

    // Dynamic translation offset for overlap fold
    // On mobile, card is 240px wide. On desktop, 320px wide.
    const baseTranslateX = isMobile ? 130 : 250;
    const translateX = diff * baseTranslateX;
    
    // Rotate folded side cards inward on Y-axis
    const rotateY = diff * -35; 
    
    // Scale down secondary cards
    const scale = 1 - absDiff * 0.12;
    
    // Dim inactive cards
    const opacity = 1 - absDiff * 0.45;
    
    const zIndex = 30 - absDiff;

    return {
      zIndex,
      opacity,
      pointerEvents: absDiff === 0 ? "auto" : "none", // disable clicks on back cards
      transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) scale(${scale}) rotateY(${rotateY}deg)`,
      transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease, z-index 0.65s ease",
    };
  };

  return (
    <div className="w-full relative py-12 flex flex-col items-center justify-center select-none overflow-hidden h-[500px] sm:h-[620px]">
      
      {/* 3D Perspective Wrapper */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl h-[360px] sm:h-[480px]"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {collections.map((ring, idx) => {
          const isActive = idx === activeIndex;
          const currentImg = imageType === "product" ? ring.productImage : ring.modelImage;

          return (
            <div
              key={ring.id}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(idx);
                }
              }}
              style={getCardStyle(idx)}
              className={`absolute top-1/2 left-1/2 w-[240px] h-[330px] sm:w-[320px] sm:h-[440px] rounded-3xl overflow-hidden cursor-pointer origin-center transition-all duration-500`}
            >
              {/* Card Main Body */}
              <div 
                className={`w-full h-full relative border rounded-3xl overflow-hidden bg-[#181410] flex flex-col justify-between p-6 transition-all duration-500 ${
                  isActive 
                    ? "border-[#C9A84C] shadow-[0_15px_50px_rgba(201,168,76,0.25)]" 
                    : "border-[#C9A84C]/10 hover:border-[#C9A84C]/30"
                }`}
              >
                {/* Image Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
                  style={{ backgroundImage: `url('${currentImg}')` }}
                />

                {/* Dark shading overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/20 to-transparent z-1" />
                <div className="absolute inset-0 bg-black/40 opacity-20 z-1" />

                {/* Tag on Top */}
                <div className="relative z-10 self-start">
                  <span className="text-[8px] sm:text-[9.5px] uppercase tracking-widest text-[#C9A84C] font-extrabold px-2.5 py-1 rounded bg-[#0A0806]/85 border border-[#C9A84C]/20 backdrop-blur-sm">
                    {ring.tag.split(" // ")[0]}
                  </span>
                </div>
                
                {/* Bottom Card Content */}
                <div className="relative z-10 text-left space-y-4 pt-12">
                  
                  {/* Text Details */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-xl font-light text-[#FAF7F2] leading-snug tracking-wide line-clamp-1">
                      {ring.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-neutral-300 font-light leading-relaxed line-clamp-2">
                      {ring.desc}
                    </p>
                  </div>

                  {/* Actions & Price Row */}
                  <div className="flex items-center justify-between border-t border-[#C9A84C]/10 pt-3.5 mt-2">
                    <div>
                      <span className="text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#7A6E66] font-bold block">Base Price</span>
                      <span className="text-base sm:text-lg font-bold text-[#E8D5A0]">{ring.price}</span>
                    </div>

                    {isActive && (
                      <div className="flex items-center space-x-2 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInquiry(ring);
                          }}
                          className="px-3.5 py-2 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-[9.5px] tracking-wider uppercase font-bold rounded-lg transition-all cursor-pointer border-0 flex items-center space-x-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Inquire</span>
                        </button>
                        
                        <Link 
                          href={`/custom-build?cut=${ring.cut}&metal=${ring.metal}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg border border-[#C9A84C]/25 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#C9A84C] transition-all bg-[#0E0C0A]/70"
                          title="Configure Live"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Drag Gesture Layer (Triggers page turns on swipe) */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info) => {
                  const threshold = 40;
                  if (info.offset.x < -threshold) {
                    handleNext();
                  } else if (info.offset.x > threshold) {
                    handlePrev();
                  }
                }}
                className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation & Counter Panel */}
      <div className="flex flex-col items-center space-y-4 mt-6 relative z-20">
        
        {/* Sliding Indicator Counter */}
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C9A84C] font-bold uppercase">
          <span>[</span>
          <span className="w-5 text-center text-[#FAF7F2]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-neutral-600">/</span>
          <span>
            {String(total).padStart(2, "0")}
          </span>
          <span>]</span>
          <span className="text-neutral-500 ml-2 font-medium tracking-widest text-[9px]">
            — {collections[activeIndex]?.title}
          </span>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-[#14110F]/60 backdrop-blur-md border border-[#C9A84C]/15 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 text-[#C4BAB0] hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Decorative Dot Bar */}
          <div className="flex items-center space-x-1.5 px-2">
            {collections.map((_, dotIdx) => (
              <div
                key={dotIdx}
                onClick={() => setActiveIndex(dotIdx)}
                className={`h-1 cursor-pointer transition-all duration-300 rounded-full ${
                  dotIdx === activeIndex 
                    ? "w-4 bg-[#C9A84C]" 
                    : "w-1 bg-[#C9A84C]/20 hover:bg-[#C9A84C]/45"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-[#14110F]/60 backdrop-blur-md border border-[#C9A84C]/15 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 text-[#C4BAB0] hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
