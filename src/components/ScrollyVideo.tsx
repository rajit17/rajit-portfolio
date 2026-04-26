"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const pendingUpdateRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Optimized spring for ultra-smooth video playback
  const springScroll = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 500,
    mass: 0.5,
    velocity: 0,
  });

  // Update video time based on scroll with optimized throttling
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (isMobile) return;
    if (!videoRef.current || !videoRef.current.duration) return;

    // Use requestAnimationFrame for better sync with browser rendering
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const targetTime = latest * videoRef.current.duration;
        
        // Ultra-fine throttling: only update if difference > 0.05 seconds
        // This allows smooth playback while preventing excessive seeking
        if (Math.abs(targetTime - lastTimeRef.current) > 0.05) {
          videoRef.current.currentTime = targetTime;
          lastTimeRef.current = targetTime;
        }
      }
    });
  });

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Ensure video is properly loaded and optimized on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      // Preload the first frame
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
          controls={false}
          autoPlay={isMobile}
          loop={isMobile}
          style={{ 
            willChange: "opacity",
            backfaceVisibility: "hidden",
            perspective: "1000px",
          }}
        />
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}
