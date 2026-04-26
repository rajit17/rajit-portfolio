"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Project Type Definition (FIX 2: Proper TypeScript)
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  repo: string | null;
  demo?: string;
  youtube?: string;
  hideRepo?: boolean;
  hideDemo?: boolean;
  hideYoutube?: boolean;
  demoButtonLabel?: string;
  color: string;
  hoverColor: string;
  span: string;
  mediaType: string;
  mediaUrl: string;
  demoUrl: string;
}

// Project Data with Media & Layout Configuration
const projects: Project[] = [
  {
    id: "brahma",
    title: "BRAHMa",
    category: "ML • Astrophysics • Published",
    description: "Fast, end-to-end YOLO framework for galactic bar detection achieving 99% accuracy.",
    longDescription: "BRAHMa uses YOLOv11x OBB for galactic bar detection on Legacy Survey data, achieving 99.26% accuracy. Validated with Pearson r = 0.91, outperforming prior research. Packaged with user-friendly GUI for easy deployment.",
    techStack: ["Python", "YOLO-OBB", "CNN", "Legacy Survey Data", "Web GUI", "React"],
    repo: null,
    demo: "https://brahma-bar-detector.netlify.app/",
    youtube: "https://www.youtube.com/watch?v=PEQBmQQRjxQ",
    hideRepo: true,
    hideYoutube: false,
    color: "from-blue-600/20 to-cyan-500/20",
    hoverColor: "group-hover:from-blue-600/40 group-hover:to-cyan-500/40",
    span: "md:col-span-2 md:row-span-2",
    mediaType: "image",
    mediaUrl: "/projects/Brahma.png",
    demoUrl: "/projects/Brahma.png"
  },
  {
    id: "master-thesis",
    title: "Master's Thesis",
    category: "Research • Machine Learning",
    description: "Developed automatic method for detecting bar structures in galaxies using YOLO-OBB.",
    longDescription: "Automatic bar structure detection using synthetic and real astronomical images. Extracts physical parameters: length, orientation, and shape with high accuracy on Legacy Survey data.",
    techStack: ["Python", "YOLO-OBB", "Synthetic Data", "Data Augmentation", "Statistical Analysis"],
    repo: null,
    demo: "https://arxiv.org/abs/2511.23383",
    hideRepo: true,
    hideYoutube: true,
    demoButtonLabel: "arXiv",
    color: "from-violet-600/20 to-blue-500/20",
    hoverColor: "group-hover:from-violet-600/40 group-hover:to-blue-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl: "/projects/master thesis.png",
    demoUrl: "/projects/master thesis.png"
  },
  {
    id: "rajit-ai",
    title: "Rajit AI",
    category: "AI Assistant • OpenAI API",
    description: "Personalized AI research assistant trained on academic data.",
    longDescription: "Built a custom AI assistant using OpenAI API trained on academic papers and project data. Features context-aware responses and semantic search for research queries.",
    techStack: ["Python", "OpenAI API", "React", "LLMs", "Semantic Search"],
    repo: null,
    demo: "https://rajit-research-assistant.netlify.app/?source",
    hideRepo: true,
    hideYoutube: true,
    color: "from-purple-600/20 to-pink-500/20",
    hoverColor: "group-hover:from-purple-600/40 group-hover:to-pink-500/40",
    span: "md:col-span-1 md:row-span-2",
    mediaType: "image",
    mediaUrl: "/projects/Rajit ai.png",
    demoUrl: "/projects/Rajit ai.png"
  },
  {
    id: "isro-ct",
    title: "ISRO CT Reconstruction",
    category: "Image Processing • ISRO",
    description: "CT reconstruction workflows for rocket phantoms and modernized OSCaR.",
    longDescription: "Modernized legacy OSCaR code for CT reconstruction and phantom imaging at ISRO. Applied FBP/FDK reconstruction methods with various filters. Enhanced GUI with progress tracking and improved computational efficiency.",
    techStack: ["Python", "Image Processing", "CT Algorithms", "GUI Development", "MATLAB"],
    repo: "https://github.com/rajit17/OSCaR-fixed_by_rajit_max-area",
    youtube: "https://youtu.be/HA-GR3qoySI",
    hideRepo: false,
    hideDemo: true,
    hideYoutube: false,
    color: "from-green-600/20 to-teal-500/20",
    hoverColor: "group-hover:from-green-600/40 group-hover:to-teal-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl: "/projects/ISRO.png",
    demoUrl: "/projects/ISRO.png"
  },
  {
    id: "polarization",
    title: "Stellar Polarization",
    category: "Data Analysis • Python",
    description: "Automated pipeline for stellar data processing and polarization analysis.",
    longDescription: "Python pipeline for stellar polarimetry including bias subtraction, aperture photometry, and Stokes parameter computation. Applied instrumental corrections and validated against standard catalogs using Astropy, Photutils, and SciPy.",
    techStack: ["Python", "Astropy", "Photutils", "Data Analysis", "Statistical Methods"],
    repo: null,
    demo: null,
    hideRepo: true,
    hideDemo: true,
    hideYoutube: true,
    color: "from-pink-600/20 to-rose-500/20",
    hoverColor: "group-hover:from-pink-600/40 group-hover:to-rose-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl: "/projects/Stellar polarization.jpg",
    demoUrl: "/projects/Stellar polarization.jpg"
  },
  {
    id: "comsol",
    title: "COMSOL Simulations",
    category: "Computational Physics",
    description: "Multi-physics simulations for electromagnetic and thermal systems.",
    longDescription: "Comprehensive COMSOL Multiphysics simulations covering electromagnetic induction, heating, Helmholtz coils, electrostatic levitation, and magnetic hysteresis analysis.",
    techStack: ["COMSOL", "Physics Modeling", "Visualization", "Data Analysis"],
    repo: null,
    youtube: "https://www.youtube.com/playlist?list=PLyd5XzIFkzUT0k2Ntoa2Sxd2Hzo4Y8rT5",
    hideRepo: true,
    hideDemo: true,
    hideYoutube: false,
    color: "from-orange-500/20 to-red-500/20",
    hoverColor: "group-hover:from-orange-500/40 group-hover:to-red-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl: "/projects/Comsol.png",
    demoUrl: "/projects/Comsol.png"
  },
  {
    id: "selenium-automation",
    title: "Bank Entry Automation",
    category: "Selenium • Automation",
    description: "Automated bank account data entry on government portal.",
    longDescription: "Developed automated data entry solution using Selenium for government bank portals. Handles complex form interactions and data validation.",
    techStack: ["Python", "Selenium", "Web Automation"],
    repo: null,
    youtube: "https://youtu.be/soxZkV6rrfI?si",
    hideRepo: true,
    hideDemo: true,
    hideYoutube: false,
    color: "from-indigo-600/20 to-purple-500/20",
    hoverColor: "group-hover:from-indigo-600/40 group-hover:to-purple-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl: "/projects/Bank automation.jpg",
    demoUrl: "/projects/Bank automation.jpg"
  },
];

const INITIAL_VISIBLE_COUNT = 5;

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const selectedProject = projects.find((p) => p.id === selectedId);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="projects">
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
            Research & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
             A curated selection of research projects and applications in machine learning, 
             astrophysics, and computational physics.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        >
            <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        layoutId={project.id}
                        onClick={() => setSelectedId(project.id)}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md ${project.span}`}
                        whileHover={{ scale: 1.015 }}
                    >
                        {/* Media Background - Always 'mediaUrl' for Grid */}
                        <img 
                            src={project.mediaUrl}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-linear-to-br ${project.color} ${project.hoverColor} transition-all duration-500 opacity-60 group-hover:opacity-80 mix-blend-overlay`} />
                        
                        {/* Darkener */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                        {/* Noise */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                 <span className="inline-block px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-blue-300 backdrop-blur-md">
                                    {project.category}
                                 </span>
                                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                 </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform drop-shadow-lg">{project.title}</h3>
                                <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    {project.techStack.slice(0, 3).map(t => (
                                        <span key={t} className="text-[10px] uppercase tracking-wider text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Pagination Buttons */}
        <motion.div layout className="flex justify-center mt-12">
            {hasMore ? (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
                >
                    View More Projects
                    <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>
            ) : projects.length > INITIAL_VISIBLE_COUNT && (
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const projectsSection = document.getElementById('projects');
                        if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                        setVisibleCount(INITIAL_VISIBLE_COUNT);
                    }}
                    className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
                 >
                    Show Less
                    <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                 </motion.button>
            )}
        </motion.div>

        {/* Enhanced Modal */}
        <AnimatePresence>
            {selectedId && selectedProject && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-60"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-auto p-4 md:p-8">
                        <motion.div
                           layoutId={selectedId}
                           className="bg-[#121212] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-4xl border border-white/10 shadow-2xl relative scrollbar-hide"
                        >
                           <button 
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                           </button>

                           <div className="flex flex-col md:flex-row h-full">
                                { /* Visual Side - Prioritize 'demoUrl', fallback to 'mediaUrl' */ }
                                <div className={`w-full md:w-2/5 min-h-[300px] relative overflow-hidden flex flex-col justify-end p-8`}>
                                    <img 
                                        src={selectedProject.demoUrl || selectedProject.mediaUrl}
                                        alt={selectedProject.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80" 
                                    />
                                   <div className={`absolute inset-0 bg-linear-to-b ${selectedProject.color} mix-blend-overlay opacity-80`} />
                                   <div className="absolute inset-0 bg-black/20" />
                                   
                                   <motion.span 
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.2 }}
                                     className="relative z-10 inline-block px-3 py-1 rounded-full bg-black/40 text-xs font-mono text-white mb-4 w-fit border border-white/10 backdrop-blur-md"
                                   >
                                     {selectedProject.category}
                                   </motion.span>
                                   <motion.h3 
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.3 }}
                                     className="relative z-10 text-4xl font-bold text-white leading-none tracking-tight drop-shadow-xl"
                                   >
                                     {selectedProject.title}
                                   </motion.h3>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#121212]">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">About the project</h4>
                                        <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                            {selectedProject.longDescription}
                                        </p>

                                        <div className="mb-10">
                                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Core Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map((tech, i) => (
                                                    <motion.span 
                                                        key={tech} 
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.5 + (i * 0.05) }}
                                                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-200 border border-white/5 transition-colors cursor-default"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4 border-t border-white/10">
                                            {!selectedProject.hideRepo && selectedProject.repo && (
                                                <a 
                                                    href={selectedProject.repo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex-1 py-4 rounded-xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                                    View Code
                                                </a>
                                            )}
                                            {!selectedProject.hideDemo && selectedProject.demo && (
                                                <a 
                                                    href={selectedProject.demo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className={`flex-1 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors ${
                                                        selectedProject.hideRepo && !selectedProject.repo 
                                                            ? "bg-white text-black hover:bg-gray-200" 
                                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                                    }`}
                                                >
                                                    {selectedProject.demoButtonLabel || "Live Demo"}
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </a>
                                            )}
                                            {!selectedProject?.hideYoutube && selectedProject?.youtube && (
                                                <a 
                                                    href={selectedProject.youtube} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex-1 py-4 rounded-xl bg-red-600 text-white font-bold text-center hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                                    Watch Demo
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                           </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}
