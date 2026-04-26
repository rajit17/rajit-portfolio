"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);

  // Detect if mobile on mount
  useEffect(() => {
    isMobileRef.current = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Adaptive spring based on device type
  const springScroll = useSpring(scrollYProgress, isMobileRef.current ? {
    damping: 80,
    stiffness: 300,
    mass: 0.8,
    velocity: 0,
  } : {
    damping: 100,
    stiffness: 500,
    mass: 0.5,
    velocity: 0,
  });

  // Update video time based on scroll with device-optimized throttling
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (!videoRef.current || !videoRef.current.duration) return;

    // Cancel previous frame request to prevent queue buildup
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const targetTime = latest * videoRef.current.duration;
        
        // Adaptive throttling: mobile needs larger threshold to prevent frame skipping
        const threshold = isMobileRef.current ? 0.15 : 0.05;
        
        if (Math.abs(targetTime - lastTimeRef.current) > threshold) {
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
          style={{ 
            willChange: "opacity",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            WebkitBackfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
          }}
        />
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}
