"use client";

import { motion } from "framer-motion";

const RESUME_URL =
  "https://drive.google.com/file/d/1avB5ffpVwjMC4BIlT7uo6VVUOqvmGmNK/view?usp=sharing";

export default function Overlay() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-24 text-white md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight drop-shadow-[0_0_22px_rgba(0,0,0,0.85)] sm:text-6xl md:text-8xl">
            Rajit Shrivastava.
          </h1>
          <p className="mt-5 text-xl font-light text-white/78 drop-shadow-md md:text-2xl">
            ML Researcher in Astrophysics.
          </p>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-bold text-black shadow-[0_0_28px_rgba(255,255,255,0.18)] transition-all hover:-translate-y-1 hover:bg-gray-200 sm:text-base"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        <div className="grid gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="border-l border-white/20 pl-5"
        >
            <h2 className="text-3xl font-bold leading-tight drop-shadow-[0_0_18px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl">
              Applying ML to <span className="text-sky-300">astronomical data</span> & galaxy research.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="border-l border-white/20 pl-5"
        >
            <h2 className="text-3xl font-bold leading-tight drop-shadow-[0_0_18px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl">
              Expertise in Python, <span className="text-fuchsia-300">YOLO & CNNs</span> for astronomy.
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
