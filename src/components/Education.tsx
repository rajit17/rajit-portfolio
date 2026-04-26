"use client";

import { motion } from "framer-motion";

const EDUCATION_DATA = {
  conferences: [
    {
      title: "BRAHMa: Bar Recognition and Hatching using ML",
      event: "NSSS-2026, NESAC (ISRO), Shillong",
      role: "Poster & Oral Presenter",
      date: "Feb 2026",
    },
    {
      title: "ML and AI Applied to Astronomy",
      event: "Royal Astronomical Society, London",
      role: "Attendee",
      date: "Jan 2026",
    },
    {
      title: "Dark Matter from Home",
      event: "Online Event",
      role: "Attendee",
      date: "Apr 2026",
    },
  ],
  achievements: [
    { title: "99 Percentile in JEE Mains Physics 2020", value: "99%" },
    { title: "AIR 1500 in BHU UET 2020", value: "AIR 1500" },
    { title: "AIR 1640 in JAM 2023", value: "AIR 1640" },
    { title: "Quora Reach", value: "317K+ views" },
  ],
  summerSchools: [
    {
      title: "IIST Astronomy & Astrophysics School",
      institution: "Indian Institute of Space Science and Technology",
      date: "July 2024",
      highlights: ["Stellar Evolution & Galaxies", "Astrophysical Data Analysis", "VIREO, Aladin, DS9"],
    },
    {
      title: "Gravitational-Wave Astronomy",
      institution: "ICTS-TIFR, Bengaluru",
      date: "July 2024",
      highlights: ["Gravitational Wave Detection", "Neutron Star Physics", "Black Hole Dynamics"],
    },
    {
      title: "X-Ray Astronomy Data Analysis",
      institution: "IISER, Berhampur",
      date: "July 2024",
      highlights: ["X-ray Imaging & Spectroscopy", "High-Energy Astrophysics", "Timing Analysis"],
    },
    {
      title: "Indian Institute of Astrophysics Summer School",
      institution: "IIA, Bengaluru",
      date: "June 2024",
      highlights: ["Galaxy Morphology", "Radio Astronomy & Black Holes", "Photometry & Spectroscopy"],
    },
    {
      title: "Semiconductor Technology & Microfabrication",
      institution: "Indian Institute of Science (IISc)",
      date: "June 2024",
      highlights: ["COMSOL, TCAD, ANSYS", "Nanotechnology", "Semiconductor Devices"],
    },
    {
      title: "Quantum Information & Technology",
      institution: "IISER, Kolkata",
      date: "May 2022",
      highlights: ["Quantum Optics", "Quantum Communication", "Quantum Sensing"],
    },
  ],
  certifications: [
    {
      title: "Scientific Computing using Python",
      institution: "IIT Kanpur (NPTEL)",
      date: "Nov 2024",
      highlights: ["Numerical Methods", "ODE/PDE Solvers", "Monte Carlo"],
    },
    {
      title: "Philosophy and Critical Thinking",
      institution: "IIT Dhanbad (NPTEL)",
      date: "May 2025",
      highlights: ["Western & Eastern Philosophy", "Critical Analysis", "Vedas & Upanishads"],
    },
    {
      title: "People Management for Entrepreneurs",
      institution: "IIM Bangalore (NPTEL)",
      date: "June 2025",
      highlights: ["Founder Mindset", "Team Structuring", "Succession Planning"],
    },
  ],
};

export default function Education() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="education">
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
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Learning <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Summer schools, certifications, achievements, and research participation in astrophysics and computational science.
          </p>
        </motion.div>

        {/* Conference Participation */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-10 flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-orange-400 rounded-full" />
            Conference Participation
          </motion.h3>
          <div className="space-y-4">
            {EDUCATION_DATA.conferences.map((conf, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">{conf.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{conf.event}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      {conf.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 md:text-right">{conf.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-10 flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Awards & Achievements
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EDUCATION_DATA.achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-linear-to-br from-green-500/20 to-green-500/5 border border-green-500/30 hover:border-green-500/60 transition-all text-center"
              >
                <p className="text-sm text-gray-400 mb-2">{achievement.title}</p>
                <p className="text-3xl font-bold text-green-400">{achievement.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summer Schools & Workshops */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-10 flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full" />
            Summer Schools & Workshops
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EDUCATION_DATA.summerSchools.map((school, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all hover:border-blue-500/30"
              >
                <p className="text-xs text-blue-400 font-mono mb-2">{school.date}</p>
                <h4 className="text-lg font-bold text-white mb-2">{school.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{school.institution}</p>
                <div className="flex flex-wrap gap-2">
                  {school.highlights.map((h, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-10 flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full" />
            Certifications
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EDUCATION_DATA.certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all hover:border-purple-500/30"
              >
                <p className="text-xs text-purple-400 font-mono mb-2">{cert.date}</p>
                <h4 className="text-lg font-bold text-white mb-2">{cert.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{cert.institution}</p>
                <div className="flex flex-wrap gap-2">
                  {cert.highlights.map((h, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
