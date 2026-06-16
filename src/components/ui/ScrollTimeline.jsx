"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { Calendar } from "lucide-react";

// Helper function to merge classes without external dependencies
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Standalone Card components to avoid missing import errors
const Card = ({ className, children }) => (
    <div className={cn("crystal-card text-card-foreground shadow-sm", className)}>
        {children}
    </div>
);

const CardContent = ({ className, children }) => (
    <div className={cn("p-6 pt-6", className)}>
        {children}
    </div>
);

const DEFAULT_EVENTS = [
    {
        year: "2023",
        title: "Major Achievement",
        subtitle: "Organization Name",
        description: "Description of the achievement or milestone reached during this time period.",
    },
    {
        year: "2022",
        title: "Important Milestone",
        subtitle: "Organization Name",
        description: "Details about this significant milestone and its impact.",
    },
    {
        year: "2021",
        title: "Key Event",
        subtitle: "Organization Name",
        description: "Information about this key event in the timeline.",
    },
];

export const ScrollTimeline = ({
    events = DEFAULT_EVENTS,
    title = "Timeline",
    subtitle = "Scroll to explore the journey",
    animationOrder = "sequential",
    cardAlignment = "alternating",
    lineColor = "bg-[#C9A84C]/20",
    activeColor = "bg-[#C9A84C]",
    progressIndicator = true,
    cardVariant = "default",
    cardEffect = "none",
    parallaxIntensity = 0.1,
    progressLineWidth = 2,
    progressLineCap = "round",
    dateFormat = "badge",
    revealAnimation = "fade",
    className = "",
    connectorStyle = "line",
    perspective = false,
    darkMode = true,
    smoothScroll = true,
}) => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const timelineRefs = useRef([]);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start center", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            const newIndex = Math.floor(v * events.length);
            if (
                newIndex !== activeIndex &&
                newIndex >= 0 &&
                newIndex < events.length
            ) {
                setActiveIndex(newIndex);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, events.length, activeIndex]);

    const getCardVariants = (index) => {
        const baseDelay =
            animationOrder === "simultaneous"
                ? 0
                : animationOrder === "staggered"
                    ? index * 0.15
                    : index * 0.2;

        const initialStates = {
            fade: { opacity: 0, y: 20 },
            slide: {
                x:
                    cardAlignment === "left"
                        ? -100
                        : cardAlignment === "right"
                            ? 100
                            : index % 2 === 0
                                ? -100
                                : 100,
                opacity: 0,
            },
            scale: { scale: 0.8, opacity: 0 },
            flip: { rotateY: 90, opacity: 0 },
            none: { opacity: 1 },
        };

        return {
            initial: initialStates[revealAnimation] || { opacity: 0, y: 20 },
            whileInView: {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotateY: 0,
                transition: {
                    duration: 0.6,
                    delay: baseDelay,
                    ease: [0.25, 0.1, 0.25, 1.0],
                },
            },
            viewport: { once: true, margin: "-50px" },
        };
    };

    const getConnectorClasses = () => {
        const baseClasses = cn(
            "absolute left-1/2 transform -translate-x-1/2",
            lineColor
        );
        const widthStyle = `w-[${progressLineWidth}px]`;
        switch (connectorStyle) {
            case "dots":
                return cn(baseClasses, "w-1 rounded-full");
            case "dashed":
                return cn(
                    baseClasses,
                    widthStyle,
                    `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`
                );
            case "line":
            default:
                return cn(baseClasses, widthStyle);
        }
    };

    const getCardClasses = (index) => {
        const baseClasses = "relative z-30 rounded-2xl transition-all duration-300";
        const variantClasses = {
            default: "bg-card border shadow-sm",
            elevated: "bg-card border border-border/40 shadow-md",
            outlined: "bg-[#181410] backdrop-blur border border-[#C9A84C]/20",
            filled: "bg-[#C9A84C]/10 border border-[#C9A84C]/30",
        };
        const effectClasses = {
            none: "",
            glow: "hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:border-[#C9A84C]/40",
            shadow: "hover:shadow-lg hover:-translate-y-1",
            bounce: "hover:scale-[1.03] hover:shadow-md active:scale-[0.97]",
        };
        const alignmentClassesDesktop =
            cardAlignment === "alternating"
                ? index % 2 === 0
                    ? "lg:mr-[calc(50%+30px)]"
                    : "lg:ml-[calc(50%+30px)]"
                : cardAlignment === "left"
                    ? "lg:mr-auto lg:ml-0"
                    : "lg:ml-auto lg:mr-0";
        const perspectiveClass = perspective
            ? "transform transition-transform hover:rotate-y-1 hover:rotate-x-1"
            : "";

        return cn(
            baseClasses,
            variantClasses[cardVariant] || "",
            effectClasses[cardEffect] || "",
            alignmentClassesDesktop,
            perspectiveClass,
            "w-full lg:w-[calc(50%-40px)]"
        );
    };

    return (
        <div
            ref={scrollRef}
            className={cn(
                "relative w-full overflow-hidden",
                darkMode ? "bg-transparent text-white" : "",
                className
            )}
        >
            {title && (
                <div className="text-center py-10 px-4">
                    <h2 className="text-3xl md:text-5xl font-light font-serif mb-4 text-[#FAF7F2]">{title}</h2>
                    {subtitle && (
                        <p className="text-sm md:text-base text-[#C4BAB0] max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <div className="relative max-w-6xl mx-auto px-4 pb-20">
                <div className="relative mx-auto h-full">
                    <div
                        className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
                    ></div>

                    {/* Enhanced Progress Indicator with Traveling Glow */}
                    {progressIndicator && (
                        <>
                            {/* The main filled progress line */}
                            <motion.div
                                className="absolute top-0 z-10"
                                style={{
                                    height: progressHeight,
                                    width: progressLineWidth,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    borderRadius:
                                        progressLineCap === "round" ? "9999px" : "0px",
                                    background: `linear-gradient(to bottom, #C9A84C, #E8D5A0, #FAF7F2)`,
                                    // Enhanced shadow for a constant glow effect along the path
                                    boxShadow: `
                    0 0 15px rgba(201,168,76,0.5),
                    0 0 25px rgba(232,213,160,0.3)
                  `,
                                }}
                            />
                            {/* The traveling glow "comet" at the head of the line */}
                            <motion.div
                                className="absolute z-20"
                                style={{
                                    top: progressHeight,
                                    left: "50%",
                                    translateX: "-50%",
                                    translateY: "-50%", // Center the comet on the line's end point
                                }}
                            >
                                <motion.div
                                    className="w-4 h-4 rounded-full" // Size of the comet core
                                    style={{
                                        background:
                                            "radial-gradient(circle, rgba(250,247,242,1) 0%, rgba(201,168,76,0.8) 40%, rgba(250,247,242,0) 70%)",
                                        // Intense, layered glow effect for the comet
                                        boxShadow: `
                      0 0 15px 4px rgba(201, 168, 76, 0.6),
                      0 0 25px 8px rgba(232, 213, 160, 0.4),
                      0 0 40px 15px rgba(250, 247, 242, 0.2)
                    `,
                                    }}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>
                        </>
                    )}

                    <div className="relative z-20 pt-8">
                        {events.map((event, index) => {
                            const yOffset = useTransform(
                                smoothProgress,
                                [0, 1],
                                [parallaxIntensity * 50, -parallaxIntensity * 50]
                            );
                            return (
                                <div
                                    key={event.id || index}
                                    ref={(el) => {
                                        timelineRefs.current[index] = el;
                                    }}
                                    className={cn(
                                        "relative flex items-center mb-12 lg:mb-20 py-4",
                                        "flex-col lg:flex-row",
                                        cardAlignment === "alternating"
                                            ? index % 2 === 0
                                                ? "lg:justify-start"
                                                : "lg:flex-row-reverse lg:justify-start"
                                            : cardAlignment === "left"
                                                ? "lg:justify-start"
                                                : "lg:flex-row-reverse lg:justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "absolute top-1/2 transform -translate-y-1/2 z-30",
                                            "left-1/2 -translate-x-1/2"
                                        )}
                                    >
                                        <motion.div
                                            className={cn(
                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#0E0C0A]",
                                                index <= activeIndex
                                                    ? "border-[#C9A84C]"
                                                    : "border-[#C9A84C]/30"
                                            )}
                                            animate={
                                                index <= activeIndex
                                                    ? {
                                                        scale: [1, 1.2, 1],
                                                        boxShadow: [
                                                            "0 0 0px rgba(201,168,76,0)",
                                                            "0 0 15px rgba(201,168,76,0.5)",
                                                            "0 0 0px rgba(201,168,76,0)",
                                                        ],
                                                    }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </div>
                                    <motion.div
                                        className={cn(
                                            getCardClasses(index),
                                            "mt-8 lg:mt-0"
                                        )}
                                        variants={getCardVariants(index)}
                                        initial="initial"
                                        whileInView="whileInView"
                                        viewport={{ once: true, margin: "-50px" }}
                                        style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                                    >
                                        <Card>
                                            <CardContent className="p-8">
                                                {dateFormat === "badge" ? (
                                                    <div className="flex items-center mb-3">
                                                        {event.icon || (
                                                            <Calendar className="h-4 w-4 mr-2 text-[#C9A84C]" />
                                                        )}
                                                        <span
                                                            className={cn(
                                                                "text-[10px] font-bold uppercase tracking-[0.2em]",
                                                                event.color
                                                                    ? `text-${event.color}`
                                                                    : "text-[#C9A84C]"
                                                            )}
                                                        >
                                                            {event.year || event.step}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-3">
                                                        {event.year || event.step}
                                                    </p>
                                                )}
                                                <h3 className="text-xl md:text-2xl font-light font-serif mb-3 text-[#FAF7F2]">
                                                    {event.title}
                                                </h3>
                                                {event.subtitle && (
                                                    <p className="text-[#E8D5A0] font-medium mb-3 text-[10px] uppercase tracking-wider">
                                                        {event.subtitle}
                                                    </p>
                                                )}
                                                <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                                                    {event.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ScrollTimeline;