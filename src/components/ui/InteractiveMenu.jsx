"use client";
import React, { useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const InteractiveMenu = ({ items, accentColor }) => {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );
    return idx >= 0 ? idx : 0;
  }, [pathname, items]);

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemEl = itemRefs.current[activeIndex];
      const activeTextEl = textRefs.current[activeIndex];
      if (activeItemEl && activeTextEl) {
        activeItemEl.style.setProperty("--lineWidth", `${activeTextEl.offsetWidth}px`);
      }
    };
    setLineWidth();
    window.addEventListener("resize", setLineWidth);
    return () => window.removeEventListener("resize", setLineWidth);
  }, [activeIndex, items]);

  const navStyle = useMemo(
    () => ({ "--component-active-color": accentColor || "var(--component-active-color-default)" }),
    [accentColor]
  );

  return (
    <nav className="menu" role="navigation" style={navStyle}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={item.label}
            className={`menu__item ${isActive ? "active" : ""}`}
            onClick={() => router.push(item.href)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ "--lineWidth": "0px" }}
            aria-label={item.label}
          >
            <div className="menu__icon">
              <IconComponent className="icon" />
            </div>
            <strong
              className={`menu__text ${isActive ? "active" : ""}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              {item.label}
            </strong>
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
