"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

export default function ThreeBackgroundWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    // defer Three.js until after first paint — improves LCP significantly
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  return ready ? <ThreeBackground /> : null;
}
