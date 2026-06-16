"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowDown, ChevronDown, Gem } from "lucide-react";
import { GlassButton } from "./ui/glass-button";

export default function CinematicScroll() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnIndexRef = useRef(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const drawingRef = useRef(false);
  const nextFrameToDrawRef = useRef(-1);

  const totalFrames = 194;
  const pass1Threshold = isMobile ? 8 : Math.ceil(totalFrames / 8);

  // Object-fit: cover logic for drawing image centered on canvas
  const drawImage = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find the closest loaded frame
      let found = false;
      // Look backward
      for (let i = index - 1; i >= 0; i--) {
        const prevImg = imagesRef.current[i];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          img = prevImg;
          found = true;
          break;
        }
      }
      // If not found backward, look forward
      if (!found) {
        for (let i = index + 1; i < totalFrames; i++) {
          const nextImg = imagesRef.current[i];
          if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
            img = nextImg;
            found = true;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "low";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    const imgRatio = imgW / imgH;
    const canvasRatio = canvas.width / canvas.height;
    let sx, sy, sw, sh;

    if (canvasRatio > imgRatio) {
      sw = imgW;
      sh = imgW / canvasRatio;
      sx = 0;
      sy = (imgH - sh) / 2;
    } else {
      sw = imgH * canvasRatio;
      sh = imgH;
      sx = (imgW - sw) / 2;
      sy = 0;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };

  // 1. Preload Images
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    const mobile = checkMobile();
    setIsMobile(mobile);

    const abortController = new AbortController();
    const tempImages = new Array(totalFrames).fill(null);
    imagesRef.current = tempImages;

    // Generate progressive load order:
    const loadOrder = [];
    const added = new Set();

    if (mobile) {
      // Mobile: only load every 8th frame (total ~25 frames) to avoid background downloads during scroll
      for (let i = 1; i <= totalFrames; i += 8) {
        loadOrder.push(i);
      }
      if (loadOrder[loadOrder.length - 1] !== totalFrames) {
        loadOrder.push(totalFrames);
      }
    } else {
      // Desktop: progressive passes
      // Pass 1: Every 8th frame
      for (let i = 1; i <= totalFrames; i += 8) {
        loadOrder.push(i);
        added.add(i);
      }
      if (!added.has(totalFrames)) {
        loadOrder.push(totalFrames);
        added.add(totalFrames);
      }

      // Pass 2: Every 4th frame
      for (let i = 1; i <= totalFrames; i += 4) {
        if (!added.has(i)) {
          loadOrder.push(i);
          added.add(i);
        }
      }

      // Pass 3: Every 2nd frame
      for (let i = 1; i <= totalFrames; i += 2) {
        if (!added.has(i)) {
          loadOrder.push(i);
          added.add(i);
        }
      }

      // Pass 4: All remaining frames
      for (let i = 1; i <= totalFrames; i++) {
        if (!added.has(i)) {
          loadOrder.push(i);
          added.add(i);
        }
      }
    }

    const pass1Threshold = mobile ? loadOrder.length : Math.ceil(totalFrames / 8);

    let loadedCountLocal = 0;
    let indexInOrder = 0;
    const maxConcurrency = mobile ? 2 : 6;
    let activeDownloads = 0;

    const startNextDownload = () => {
      if (abortController.signal.aborted || indexInOrder >= loadOrder.length) return;

      const frameNum = loadOrder[indexInOrder++];
      activeDownloads++;

      const numStr = String(frameNum).padStart(3, "0");
      const url = `/Home/frame_${numStr}.webp`;

      fetch(url, { signal: abortController.signal })
        .then(res => {
          if (!res.ok) throw new Error("Fetch failed");
          return res.blob();
        })
        .then(blob => {
          if (abortController.signal.aborted) return;
          const img = new Image();
          img.onload = () => {
            if (abortController.signal.aborted) return;
            tempImages[frameNum - 1] = img;
            loadedCountLocal++;
            setLoadedCount(loadedCountLocal);
            activeDownloads--;

            // Draw initial frame
            if (loadedCountLocal === 1) {
              setTimeout(() => {
                if (abortController.signal.aborted) return;
                const currentFrameIndex = Math.round(frameIndex.get());
                lastDrawnIndexRef.current = currentFrameIndex;
                drawImage(currentFrameIndex);
              }, 50);
            } else {
              const currentFrameIndex = Math.round(frameIndex.get());
              if (currentFrameIndex === frameNum - 1) {
                lastDrawnIndexRef.current = currentFrameIndex;
                drawImage(currentFrameIndex);
              }
            }

            if (loadedCountLocal >= pass1Threshold) {
              setIsLoading(false);
            }

            startNextDownload();
          };
          img.onerror = () => {
            handleError();
          };
          img.src = URL.createObjectURL(blob);
        })
        .catch(err => {
          if (abortController.signal.aborted) return;
          handleError();
        });

      const handleError = () => {
        loadedCountLocal++;
        setLoadedCount(loadedCountLocal);
        activeDownloads--;

        if (loadedCountLocal >= pass1Threshold) {
          setIsLoading(false);
        }

        startNextDownload();
      };
    };

    for (let i = 0; i < maxConcurrency; i++) {
      startNextDownload();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  // 2. Scroll Progress Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  const requestDraw = (index) => {
    nextFrameToDrawRef.current = index;
    if (!drawingRef.current) {
      drawingRef.current = true;
      requestAnimationFrame(() => {
        if (nextFrameToDrawRef.current !== -1) {
          drawImage(nextFrameToDrawRef.current);
        }
        drawingRef.current = false;
      });
    }
  };

  // Redraw when the frame index updates and handle slide state transitions safely after mount
  useEffect(() => {
    const unsubFrame = frameIndex.on("change", (latest) => {
      const roundedIndex = Math.round(latest);
      if (roundedIndex !== lastDrawnIndexRef.current) {
        lastDrawnIndexRef.current = roundedIndex;
        requestDraw(roundedIndex);
      }
    });

    const unsubScroll = scrollYProgress.on("change", (latest) => {
      if (latest < 0.28) {
        setActiveSlide(0);
      } else if (latest >= 0.28 && latest < 0.64) {
        setActiveSlide(1);
      } else {
        setActiveSlide(2);
      }
    });

    return () => {
      unsubFrame();
      unsubScroll();
    };
  }, [frameIndex, scrollYProgress]);

  // Handle Canvas sizing and initial rendering on load/resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const navH = window.innerWidth >= 640 ? 118 : 80;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight - navH;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      const currentFrameIndex = Math.round(frameIndex.get());
      lastDrawnIndexRef.current = currentFrameIndex;
      drawImage(currentFrameIndex);
    };

    if (!isLoading) {
      const timer = setTimeout(handleResize, 100);
      const vv = window.visualViewport;
      window.addEventListener("resize", handleResize);
      if (vv) vv.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
        if (vv) vv.removeEventListener("resize", handleResize);
      };
    }
  }, [isLoading]);

  // 3. Cinematic Text Overlay Animations
  // Overlay 1: Welcome & Branding (Visible initially on load, fades out on scroll)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.18, 0.26], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0.0, 0.18, 0.26], [0, 0, -40], { clamp: true });

  // Overlay 2: Heritage & South Indian Symmetries (0.34 to 0.62)
  const opacity2 = useTransform(scrollYProgress, [0.34, 0.40, 0.56, 0.62], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.34, 0.40, 0.56, 0.62], [40, 0, 0, -40], { clamp: true });

  // Overlay 3: Solitaire Diamonds / Final Call to Action (0.68 to 0.94)
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.74, 0.88, 0.94], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.68, 0.74, 0.88, 0.94], [40, 0, 0, -40], { clamp: true });

  // Scroll indicator fade out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.0, 0.08], [1, 0], { clamp: true });

  return (
    <>
      {/* 1. LUXURY LOADING SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0C0A] text-[#FAF7F2] transition-opacity duration-700">
          {/* Subtle background glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C9A84C]/10 to-transparent blur-[120px] pointer-events-none" />
          
          <div className="glass-panel-gold p-12 rounded-3xl max-w-md w-[90%] text-center space-y-8 relative z-10 border border-[#C9A84C]/20 gold-border-glow">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Gem className="w-8 h-8 text-[#C9A84C] animate-pulse-slow absolute" />
              <div className="w-16 h-16 border-t border-b border-[#C9A84C] rounded-full animate-spin-slow" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold block">
                Vees Star Diamonds
              </span>
              <h2 className="text-3xl font-light text-white tracking-wide">
                Crafting Light
              </h2>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="font-display italic text-[#C9A84C] text-6xl font-light tracking-tighter">
                {Math.min(Math.round((loadedCount / pass1Threshold) * 100), 100)}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">
                Preloading Cinematic Frames
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN SCROLL CONTAINER */}
      <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
        {/* Sticky viewport frame */}
        <div className="sticky top-[80px] sm:top-[118px] left-0 w-full overflow-hidden flex items-center justify-center h-[calc(100dvh-80px)] sm:h-[calc(100dvh-118px)]">
          {/* Canvas Rendering Area */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

          {/* Edge vignette — only darkens corners/edges, image centre stays clean */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.72) 100%)" }} />
          {/* Bottom fade for the corner text card */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }} />

          {/* Interactive Screen Details / Watermark */}
          <div className="absolute top-8 left-8 hidden md:flex items-center space-x-2.5 text-[9px] tracking-[0.25em] text-[#C9A84C]/50 uppercase font-bold z-20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Showroom Sequence</span>
          </div>

          {/* Dynamic Progress Indicator Bar (Left Side) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-4 z-20">
            <span className="text-[8px] text-[#C9A84C]/50 font-bold tracking-widest rotate-270 uppercase mb-4 origin-center">
              Sequence
            </span>
            <div className="w-[1px] h-32 bg-white/10 relative">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-[#C9A84C]" 
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
            <span className="font-display text-[10px] text-[#C9A84C] font-semibold">
              {String(Math.round(frameIndex.get() + 1)).padStart(2, "0")}
            </span>
          </div>

          {/* CORNER TEXT CARDS — alternating left / right / left */}
          <AnimatePresence mode="wait">
            {activeSlide === 0 && (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-10 left-6 md:left-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-[#C9A84C] shrink-0" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold">Vees Star Diamonds</span>
                </div>
                <h2 className="font-display font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Not Just Jewellery.<br />
                  <span className="italic text-[#C9A84C]">A Legacy Cut In Light.</span>
                </h2>
                <p className="text-white/70 font-light text-xs leading-relaxed">
                  Crafting GIA-certified diamonds with the geometrical ratios of South Indian temple artisans.
                </p>
              </motion.div>
            )}

            {activeSlide === 1 && (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-10 right-6 md:right-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold block">The Heritage Cut</span>
                <h2 className="font-display font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  South Indian <span className="italic text-[#C9A84C]">Symmetries</span>
                </h2>
                <p className="text-white/70 font-light text-xs leading-relaxed">
                  Multi-generational workshop casting mounts based on architectural ratios.
                </p>
              </motion.div>
            )}

            {activeSlide === 2 && (
              <motion.div
                key="slide-2"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-10 left-6 md:left-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold block">Bespoke Configurator</span>
                <h2 className="font-display font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Expose Your <span className="italic text-[#C9A84C]">Hidden Brilliance</span>
                </h2>
                <p className="text-white/70 font-light text-xs leading-relaxed">
                  Configure metal settings, carat weights, and cut geometry.
                </p>
                <div className="flex gap-3 pt-1">
                  <GlassButton size="sm" onClick={() => window.location.href = "#showroom"}>
                    Showroom
                  </GlassButton>
                  <GlassButton size="sm" onClick={() => window.location.href = "/custom-build"}>
                    Configure
                  </GlassButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}
