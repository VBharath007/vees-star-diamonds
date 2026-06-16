"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

// Minimized CSS Styles modified to add custom styling
const EMBEDDED_CSS = `
.cascade-slider_container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    z-index: 20; 
    user-select: none;
    -webkit-user-select: none; 
    touch-action: pan-y;
}

.cascade-slider_slides {
    position: relative;
    height: 100%; 
}

.cascade-slider_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(0.3); 
    transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); 
    opacity: 0;
    z-index: 1; 
    cursor: grab; 
}
.cascade-slider_item.now {
    cursor: default;
}
.cascade-slider_item:active {
    cursor: grabbing;
}

/* Slide Positioning Classes (Core 3D Logic) */
.cascade-slider_item.next {
    left: 50%;
    transform: translateY(-50%) translateX(-120%) scale(0.65);
    opacity: 0.65;
    z-index: 4; 
}
.cascade-slider_item.prev {
    left: 50%;
    transform: translateY(-50%) translateX(20%) scale(0.65);
    opacity: 0.65;
    z-index: 4; 
}
.cascade-slider_item.now {
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(1);
    opacity: 1;
    z-index: 5; 
}

/* Arrows */
.cascade-slider_arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    cursor: pointer;
    z-index: 6; 
    transform: translate(0, -50%);
    width: 40px; 
    height: 40px; 
    transition: all 0.3s ease;
}

/* Arrow Positioning Fix (Responsive CSS) */
@media screen and (max-width: 575px) {
    .cascade-slider_arrow-left { 
        left: 5px; 
    }
    .cascade-slider_arrow-right { 
        right: 5px; 
    }
}
@media screen and (min-width: 576px) {
    .cascade-slider_arrow-left { left: -6%; }
    .cascade-slider_arrow-right { right: -6%; }
}

/* Images styling */
.cascade-slider_slides img {
    max-width: 130px;
    height: auto; 
    border-radius: 24px;
    display: block;
    transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    border: 1px solid rgba(201,168,76,0.15);
}

.cascade-slider_item.now img {
    border: 2px solid #C9A84C;
    box-shadow: 0 0 30px rgba(201, 168, 76, 0.35);
}

.cascade-slider_item:not(.now) img {
    filter: grayscale(0.95);
    opacity: 0.6;
}

/* --- Media Queries --- */
@media screen and (min-width: 414px) {
    .cascade-slider_container { height: 260px; }
    .cascade-slider_slides img { max-width: 160px; }
}
@media screen and (min-width: 576px) {
    .cascade-slider_container { height: 350px; }
    .cascade-slider_slides img { max-width: 220px; }
}
@media screen and (min-width: 768px) {
    .cascade-slider_item.next { transform: translateY(-50%) translateX(-125%) scale(0.65); }
    .cascade-slider_item.prev { transform: translateY(-50%) translateX(25%) scale(0.65); }
    .cascade-slider_slides img { max-width: 240px; }
}
@media screen and (min-width: 991px) {
    .cascade-slider_item.next { transform: translateY(-50%) translateX(-115%) scale(0.6); z-index: 4; }
    .cascade-slider_item.prev { transform: translateY(-50%) translateX(15%) scale(0.6); z-index: 4; }
    .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-145%) scale(0.4); z-index: 1; }
    .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(45%) scale(0.4); z-index: 2; }
    .cascade-slider_slides img { max-width: 260px; }
    .cascade-slider_container { height: 360px; }
}
@media screen and (min-width: 1100px) {
    .cascade-slider_item.next { transform: translateY(-50%) translateX(-130%) scale(0.65); }
    .cascade-slider_item.prev { transform: translateY(-50%) translateX(30%) scale(0.65); }
    .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-175%) scale(0.45); }
    .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(75%) scale(0.45); }
    .cascade-slider_slides img { max-width: 280px; }
    .cascade-slider_container { height: 380px; }
}
`;

const getSlideClasses = (index, activeIndex, total, visibleCount) => {
    const diff = index - activeIndex;
    if (diff === 0) return 'now';
    if (diff === 1 || diff === -total + 1) return 'next';
    if (visibleCount === 5 && (diff === 2 || diff === -total + 2)) return 'next2';
    if (diff === -1 || diff === total - 1) return 'prev';
    if (visibleCount === 5 && (diff === -2 || diff === total - 2)) return 'prev2';
    return '';
};

export const ThreeDImageCarousel = ({
    slides,
    itemCount = 5,
    autoplay = false,
    delay = 3,
    pauseOnHover = true,
    className = '',
    activeIndex: parentActiveIndex,
    onActiveChange = () => {},
}) => {
    const [localActiveIndex, setLocalActiveIndex] = useState(0);
    const activeIndex = parentActiveIndex !== undefined ? parentActiveIndex : localActiveIndex;
    const total = slides.length;

    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const swipeThreshold = 50;

    const navigate = useCallback((direction) => {
        const nextIdx = direction === 'next' 
            ? (activeIndex + 1) % total 
            : (activeIndex - 1 + total) % total;
        
        if (parentActiveIndex !== undefined) {
            onActiveChange(nextIdx);
        } else {
            setLocalActiveIndex(nextIdx);
            onActiveChange(nextIdx);
        }
    }, [total, activeIndex, parentActiveIndex, onActiveChange]);

    useEffect(() => {
        if (!autoplay || total <= 1 || (pauseOnHover && isHovered)) return;

        const timer = setTimeout(() => {
            navigate('next');
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [activeIndex, autoplay, delay, navigate, total, pauseOnHover, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleExit = (e) => {
        setIsHovered(false);
        if (isDragging) {
            handleEnd(e.clientX);
        }
    };

    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
    };

    const handleEnd = (clientX) => {
        if (!isDragging) return;
        const distance = clientX - startX;
        if (Math.abs(distance) > swipeThreshold) {
            if (distance < 0) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }
        setIsDragging(false);
        setStartX(0);
    };

    const onMouseDown = (e) => handleStart(e.clientX);
    const onMouseUp = (e) => handleEnd(e.clientX);

    const onTouchStart = (e) => handleStart(e.touches[0].clientX);
    const onTouchEnd = (e) => handleEnd(e.changedTouches[0].clientX);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: EMBEDDED_CSS }} />
            <div
                className={`cascade-slider_container ${className} bg-transparent w-full`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleExit}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className="cascade-slider_slides">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`cascade-slider_item ${getSlideClasses(index, activeIndex, total, itemCount)}`}
                            data-slide-number={index}
                        >
                            <img 
                                src={encodeURI(slide.src)} 
                                alt={`Slide ${index + 1}`}
                                className="select-none pointer-events-none"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {total > 1 && (
                    <>
                        <span
                            className="cascade-slider_arrow cascade-slider_arrow-left rounded-full bg-black/40 text-[#C9A84C] hover:text-[#FAF7F2] p-1.5 hover:bg-[#C9A84C] transition-colors duration-300"
                            onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                            data-action="prev"
                        >
                            <ArrowLeftCircle size={28} />
                        </span>
                        <span
                            className="cascade-slider_arrow cascade-slider_arrow-right rounded-full bg-black/40 text-[#C9A84C] hover:text-[#FAF7F2] p-1.5 hover:bg-[#C9A84C] transition-colors duration-300"
                            onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                            data-action="next"
                        >
                            <ArrowRightCircle size={28} />
                        </span>
                    </>
                )}
            </div>
        </>
    );
};

export default ThreeDImageCarousel;
