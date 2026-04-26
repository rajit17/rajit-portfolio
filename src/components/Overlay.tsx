"use client";

import { motion } from "framer-motion";

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
