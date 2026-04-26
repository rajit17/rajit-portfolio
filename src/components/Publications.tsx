"use client";

import { motion } from "framer-motion";

const PUBLICATIONS = [
  {
    title: "BRAHMa: Bar Recognition And Hatching using Machine Learning",
    phase: "Manuscript in preparation for submission to MNRAS",
    link: "https://drive.google.com/file/d/10GbffO4pv6mxc53GKWxC-4AyJz3zKeMN/view?usp",
    linkText: "Research Summary",
    color: "from-blue-600/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Identifying bars in galaxies using machine learning",
    phase: "Master's thesis",
    link: "https://arxiv.org/abs/2511.23383",
    linkText: "arXiv:2511.23383",
    color: "from-purple-600/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
];

export default function Publications() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="publications">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Publications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Research contributions and manuscripts in astrophysics and machine learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PUBLICATIONS.map((pub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`p-8 rounded-3xl bg-linear-to-br ${pub.color} border ${pub.borderColor} backdrop-blur-md hover:shadow-2xl transition-all hover:scale-105`}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-gray-300 border border-white/20 mb-4">
                  {pub.phase}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{pub.title}</h3>

              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {pub.linkText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
