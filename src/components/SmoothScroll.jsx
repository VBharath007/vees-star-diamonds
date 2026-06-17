"use client";
import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}
