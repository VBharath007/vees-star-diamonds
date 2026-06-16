"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, ChevronDown } from "lucide-react";
import { GlassButton } from "./ui/glass-button";

export default function CustomBuildHero() {
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

  const totalFrames = 244;
  const pass1Threshold = isMobile ? 8 : Math.ceil(totalFrames / 8);

  // Render a specific frame onto the canvas using object-fit cover logic
  const drawImage = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

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

    // Cover positioning logic
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
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
      // Mobile: only load every 8th frame (total ~31 frames) to avoid background downloads during scroll
      for (let i = 1; i <= totalFrames; i += 8) {
        loadOrder.push(i);
      }
      if (loadOrder[loadOrder.length - 1] !== totalFrames) {
        loadOrder.push(totalFrames);
      }
    } else {
      // Desktop progressive loading passes
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

      const frameStr = String(frameNum).padStart(3, "0");
      const url = `/custom%20build/frame_${frameStr}.webp`;

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

  // 2. Set up Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
      } else if (latest >= 0.28 && latest < 0.65) {
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
      const currentIdx = Math.round(frameIndex.get());
      lastDrawnIndexRef.current = currentIdx;
      drawImage(currentIdx);
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

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.0, 0.08], [1, 0], { clamp: true });

  const loadingPercentage = Math.min(Math.round((loadedCount / pass1Threshold) * 100), 100);

  return (
    <>
      {/* 1. Loading Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#09090b] z-50 flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Outer Golden Spinner */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#C9A84C] border-b-2 border-l-2 border-transparent"
              />
              <Compass className="w-10 h-10 text-[#C9A84C] animate-pulse" />
            </div>

            <div className="text-center space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-bold block">
                Loading Blueprint Renders
              </span>
              <span className="font-display font-light text-2xl text-white">
                {loadingPercentage}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Scroll Animation Area */}
      <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
        {/* Sticky Canvas Wrap — top offset matches navbar height so diamond is fully visible */}
        <div className="sticky top-[80px] sm:top-[118px] left-0 w-full overflow-hidden flex items-center justify-center h-[calc(100dvh-80px)] sm:h-[calc(100dvh-118px)]">
          
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Edge vignette only — ring frame stays fully visible */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.70) 100%)" }} />
          {/* Bottom fade for corner card */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }} />

          {/* Technical HUD Overlay Borders & Corner Marks */}
          <div className="absolute inset-8 border border-white/5 pointer-events-none z-10 flex flex-col justify-between p-4">
            <div className="flex justify-between text-[8px] font-mono tracking-widest text-[#C9A84C]/50 uppercase">
              <span>[ CAD_SYSTEM_V3.8 ]</span>
              <span>[ SCALE_1.0 ]</span>
            </div>
            <div className="flex justify-between text-[8px] font-mono tracking-widest text-[#C9A84C]/50 uppercase">
              <span>[ EST_D_FLAWLESS ]</span>
              <span>[ GRID_LOCK_ON ]</span>
            </div>
          </div>

          {/* Left HUD: Step progress ticks */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center space-y-6 pointer-events-none">
            <div className="w-[1px] h-20 bg-white/10 relative">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-[#C9A84C]" 
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
            <span className="font-mono text-[9px] text-[#C9A84C] font-semibold">
              PHASE {String(activeSlide + 1).padStart(2, "0")}
            </span>
          </div>

          {/* CORNER TEXT CARDS — alternating left / right / left */}
          <AnimatePresence mode="wait">
            {activeSlide === 0 && (
              <motion.div
                key="custom-slide-0"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-10 left-6 md:left-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <div className="flex items-center space-x-2">
                  <Compass className="w-3 h-3 text-[#C9A84C] shrink-0" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold">Phase 01 · Geometry</span>
                </div>
                <h2 className="font-display font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Mathematical <span className="italic text-[#C9A84C]">Precision</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  GIA-certified diamonds mapped to South Indian temple ratio configurations.
                </p>
              </motion.div>
            )}

            {activeSlide === 1 && (
              <motion.div
                key="custom-slide-1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-10 right-6 md:right-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-[#C9A84C] shrink-0" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold">Phase 02 · Prong Architecture</span>
                </div>
                <h2 className="font-display font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Micro-Burnished <span className="italic text-[#C9A84C]">Settings</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  Hand-burnished prongs at precise optical angles for maximum light entry.
                </p>
              </motion.div>
            )}

            {activeSlide === 2 && (
              <motion.div
                key="custom-slide-2"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-10 left-6 md:left-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3 h-3 text-[#C9A84C] shrink-0" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold">Phase 03 · Studio</span>
                </div>
                <h2 className="font-display font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Bespoke <span className="italic text-[#C9A84C]">Configurator</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  Customize metals, diamond shapes, and carat weights in real time.
                </p>
                <GlassButton size="sm" className="mt-1" onClick={() => document.getElementById("configurator-start")?.scrollIntoView({ behavior: "smooth" })}>
                  Open Configurator
                </GlassButton>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}
