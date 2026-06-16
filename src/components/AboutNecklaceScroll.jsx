"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Sparkles, ChevronDown, Gem } from "lucide-react";

export default function AboutNecklaceScroll() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnIndexRef = useRef(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioned, setIsTransitioned] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const drawingRef = useRef(false);
  const nextFrameToDrawRef = useRef(-1);

  const totalFrames = 225;
  const pass1Threshold = isMobile ? 8 : Math.ceil(totalFrames / 8);

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

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    const mobile = checkMobile();
    setIsMobile(mobile);

    const abortController = new AbortController();
    imagesRef.current = new Array(totalFrames).fill(null);

    const essentialFrames = [];
    const added = new Set();
    const step = mobile ? 8 : 8;

    for (let i = 1; i <= totalFrames; i += step) {
      essentialFrames.push(i);
      added.add(i);
    }
    if (!added.has(totalFrames)) {
      essentialFrames.push(totalFrames);
      added.add(totalFrames);
    }

    const pass1Threshold = mobile ? essentialFrames.length : Math.ceil(essentialFrames.length);

    let loadedEssential = 0;
    let indexInOrder = 0;
    const maxConcurrency = mobile ? 2 : 6;
    let activeDownloads = 0;

    const startNextDownload = () => {
      if (abortController.signal.aborted || indexInOrder >= essentialFrames.length) return;

      const frameNum = essentialFrames[indexInOrder++];
      activeDownloads++;

      const url = `/neckless/frame_${String(frameNum).padStart(3, "0")}.webp`;

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
            imagesRef.current[frameNum - 1] = img;
            loadedEssential++;
            setLoadedCount(loadedEssential);
            activeDownloads--;

            if (loadedEssential === 1) {
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

            if (loadedEssential >= pass1Threshold) {
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
        loadedEssential++;
        setLoadedCount(loadedEssential);
        activeDownloads--;

        if (loadedEssential >= pass1Threshold) {
          setIsLoading(false);
        }

        startNextDownload();
      };
    };

    for (let i = 0; i < Math.min(maxConcurrency, essentialFrames.length); i++) {
      startNextDownload();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isMobile || !hasScrolled) return;

    const abortController = new AbortController();

    const added = new Set();
    for (let i = 1; i <= totalFrames; i += 8) {
      added.add(i);
    }
    added.add(totalFrames);

    const remainingFrames = [];
    for (let i = 1; i <= totalFrames; i += 4) {
      if (!added.has(i)) {
        remainingFrames.push(i);
        added.add(i);
      }
    }
    for (let i = 1; i <= totalFrames; i += 2) {
      if (!added.has(i)) {
        remainingFrames.push(i);
        added.add(i);
      }
    }
    for (let i = 1; i <= totalFrames; i++) {
      if (!added.has(i)) {
        remainingFrames.push(i);
        added.add(i);
      }
    }

    let indexInOrder = 0;
    const maxConcurrency = 6;
    let activeDownloads = 0;

    const startNextDownload = () => {
      if (abortController.signal.aborted || indexInOrder >= remainingFrames.length) return;

      const frameNum = remainingFrames[indexInOrder++];
      activeDownloads++;

      const url = `/neckless/frame_${String(frameNum).padStart(3, "0")}.webp`;

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
            imagesRef.current[frameNum - 1] = img;
            activeDownloads--;

            const currentFrameIndex = Math.round(frameIndex.get());
            if (currentFrameIndex === frameNum - 1) {
              lastDrawnIndexRef.current = currentFrameIndex;
              drawImage(currentFrameIndex);
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
        activeDownloads--;
        startNextDownload();
      };
    };

    for (let i = 0; i < Math.min(maxConcurrency, remainingFrames.length); i++) {
      startNextDownload();
    }

    return () => {
      abortController.abort();
    };
  }, [hasScrolled]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1], { clamp: true });

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

  useEffect(() => {
    const unsubFrame = frameIndex.on("change", (latest) => {
      const rounded = Math.round(latest);
      if (rounded !== lastDrawnIndexRef.current) {
        lastDrawnIndexRef.current = rounded;
        requestDraw(rounded);
      }
    });

    const unsubScroll = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) setActiveSlide(0);
      else if (latest < 0.66) setActiveSlide(1);
      else setActiveSlide(2);

      setIsTransitioned(latest > 0.95);
      setHasScrolled(latest > 0.01);
    });

    return () => {
      unsubFrame();
      unsubScroll();
    };
  }, [frameIndex, scrollYProgress]);

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
      const t = setTimeout(handleResize, 100);
      const vv = window.visualViewport;
      window.addEventListener("resize", handleResize);
      if (vv) vv.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", handleResize);
        if (vv) vv.removeEventListener("resize", handleResize);
      };
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0C0A] text-[#FAF7F2]">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C9A84C]/10 to-transparent blur-[120px] pointer-events-none" />
          <div className="glass-panel p-12 rounded-3xl max-w-md w-[90%] text-center space-y-8 relative z-10 border border-[#C9A84C]/15 gold-border-glow">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Gem className="w-8 h-8 text-[#C9A84C] absolute" />
              <div className="w-16 h-16 border-t border-b border-[#C9A84C] rounded-full animate-spin-slow" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#7A6E66] font-bold block">
                Vees Star Diamonds
              </span>
              <h2 className="text-3xl font-light text-white tracking-wide">Crafting Light</h2>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="font-display italic text-[#C9A84C] text-6xl font-light tracking-tighter">
                {Math.min(100, Math.round((loadedCount / pass1Threshold) * 100))}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#7A6E66] font-medium">
                Preloading Necklace Details
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CRITICAL FIX: No overflow hidden here. Just a simple tall container for the scroll track */}
      <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0E0C0A]">

        {/* CRITICAL FIX: h-[100dvh] ensures it fits mobile screens perfectly without jumping */}
        <div className="sticky top-[80px] sm:top-[118px] w-full h-[calc(100dvh-80px)] sm:h-[calc(100dvh-118px)] flex items-center justify-center z-0 left-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover block"
          />

          {/* Edge vignette only — keeps image centre fully clear */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.70) 100%)" }} />
          {/* Bottom fade for corner text card */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }} />

          {/* Desktop Indicators */}
          <div className={`absolute top-6 left-6 hidden md:flex items-center space-x-2.5 text-[9px] tracking-[0.25em] text-[#C9A84C]/50 uppercase font-bold z-20 transition-all duration-500 ${isTransitioned ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Necklace Craft Sequence</span>
          </div>

          <div className={`absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-4 z-20 transition-all duration-500 ${isTransitioned ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="w-[1px] h-32 bg-[#C9A84C]/10 relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#C9A84C]"
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
          </div>

          {/* CORNER TEXT CARDS — alternating left / right / left */}
          <AnimatePresence mode="wait">
            {activeSlide === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-10 left-6 md:left-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-[#C9A84C] shrink-0" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] font-bold">Vees Star Heritage</span>
                </div>
                <h2 className="font-serif font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  The Pure Architecture<br />
                  <span className="italic text-[#C9A84C]">Of Optical Royalty</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  Where ancestral South Indian geometry meets modern GIA gemmological standards.
                </p>
              </motion.div>
            )}

            {activeSlide === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-10 right-6 md:right-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold block">Craftsmanship Redefined</span>
                <h2 className="font-serif font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Ancestral <span className="italic text-[#C9A84C]">Symmetries</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  Our master artisans hand-cut raw minerals to expose their hidden prism.
                </p>
              </motion.div>
            )}

            {activeSlide === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-10 left-6 md:left-10 z-20 space-y-3 px-5 py-5 rounded-xl"
                style={{ maxWidth: 300, background: "rgba(4,3,2,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold block">The Pinnacle of Luxury</span>
                <h2 className="font-serif font-light text-xl text-white leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                  Sculpted <span className="italic text-[#C9A84C]">In Fire</span>
                </h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  Scroll down to explore the 7 C's of Vees Star Diamonds.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}