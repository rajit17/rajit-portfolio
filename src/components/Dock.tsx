"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// Icons (Using simple SVGs or lucid-react if available, but I'll use SVG here for zero-deps)
const Icons = {
  Home: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Code: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  Zap: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Compass: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
  Star: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  BookOpen: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  Book: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  ),
  Mail: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  FileText: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
  ),
};

const DOCK_ITEMS = [
  { id: "home", icon: Icons.Home, label: "Home", href: "#home" },
  { id: "projects", icon: Icons.Code, label: "Projects", href: "#projects" },
  { id: "publications", icon: Icons.Book, label: "Publications", href: "#publications" },
  { id: "testimonials", icon: Icons.Star, label: "Kind Words", href: "#testimonials" },
  { id: "education", icon: Icons.BookOpen, label: "Learning Journey", href: "#education" },
  { id: "skills", icon: Icons.Zap, label: "Skills", href: "#skills" },
  { id: "journey", icon: Icons.Compass, label: "Journey", href: "#journey" },
  { id: "contact", icon: Icons.Mail, label: "Contact", href: "#contact" },
  { id: "resume", icon: Icons.FileText, label: "Resume", href: "https://drive.google.com/file/d/1avB5ffpVwjMC4BIlT7uo6VVUOqvmGmNK/view?usp=sharing", external: true },
];

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      {/* Spacer to prevent clipping of tooltips - larger on mobile */}
      <div className="h-28 md:h-0" />
      
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-12 md:h-16 items-center gap-2 md:gap-4 rounded-full border border-white/10 bg-white/5 px-2 md:px-5 backdrop-blur-md max-w-[calc(100vw-1.5rem)] overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        {DOCK_ITEMS.map((item) => (
          <DockIcon key={item.id} mouseX={mouseX} item={item} />
        ))}
      </motion.div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue;
  item: (typeof DOCK_ITEMS)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLabel, setShowLabel] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [36, 72, 36]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={item.href} target={item.external ? "_blank" : undefined}>
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        className="aspect-square w-9 md:w-11 rounded-full bg-gray-700/50 hover:bg-gray-600/80 border border-white/10 hover:border-white/20 flex items-center justify-center transition-colors group relative flex-shrink-0 cursor-pointer"
      >
        <item.icon className="w-1/2 h-1/2 text-gray-200 group-hover:text-white transition-colors" />
        
        {/* Desktop Tooltip - Above */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showLabel ? 1 : 0, y: showLabel ? -5 : 10 }}
          transition={{ duration: 0.2 }}
          className="hidden md:block absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 pointer-events-none font-medium shadow-lg z-50"
        >
          {item.label}
        </motion.span>

        {/* Mobile Label - Below with subtle background */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: showLabel ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none font-medium border border-white/20 z-50"
        >
          {item.label}
        </motion.span>
      </motion.div>
    </Link>
  );
}
