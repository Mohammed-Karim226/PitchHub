// Ultra‑modern, professional, cinematic HeroSection with smooth lighting, depth layers & subtle motion VFX

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SearchForm from "./SearchForm";
import { ChevronDownIcon } from "lucide-react";

const HeroSection = ({ query }: {query?: string}) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Soft parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => setMounted(true), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.35, 1] },
    },
  };

  const glowVariants = {
    visible: {
      textShadow: [
        "0 0 8px rgba(125,211,252,0.4)",
        "0 0 14px rgba(6,182,212,0.6)",
        "0 0 10px rgba(125,211,252,0.4)",
      ],
      transition: { duration: 4, repeat: Infinity, repeatType: "reverse" as const},
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0a0f1f] via-[#0f1226] to-[#05070d] py-20 px-6 text-white"
    >
      {/* Soft floating light layers */}
      <motion.div
        className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_60%)]"
        style={{ y }}
      />

      <motion.div
        className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_65%)]"
        style={{ y }}
      />

      {/* Subtle animated noise layer */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAnIGhlaWdodD0nMzAnIHhtbG5zPScgaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPSczMCcgaGVpZ2h0PSczMCcgZmlsbD0nI2ZmZicgLz48cGF0aCBkPSdtMCAwaDMwdjNIMHoiIGZpbGw9JyMwMDAwMDAnIGZpbGwtb3BhY2l0eT0nMC4wNScvPjwvc3ZnPg==')] animate-pulse pointer-events-none" />

      {/* Frosted glass overlay */}
      <div className="absolute inset-0 backdrop-blur-[70px] bg-white/5" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full text-center space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Clean modern badge */}
        <motion.div
          className="inline-flex items-center px-8 py-3 bg-white/10 rounded-full border border-white/15 backdrop-blur-xl text-xs tracking-widest font-medium text-cyan-200 shadow-lg shadow-cyan-500/10"
          variants={itemVariants}
          whileHover={{ scale: 1.04 }}
        >
          <span>Future‑Ready Startup Arena</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
          {/* Headline */}
          <motion.div className="text-left max-w-2xl" variants={itemVariants}>
            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.9] bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-xl"
              variants={glowVariants}
              animate="visible"
            >
              Launch
              <br />
              <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Your Vision
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-md"
              variants={itemVariants}
            >
              A modern platform where bold founders pitch, compete, and
              rise—powered by community‑driven innovation.
            </motion.p>
          </motion.div>

          {/* Elegant floating elements */}
          <motion.div className="relative flex-1" variants={itemVariants}>
            <div className="relative w-64 h-64 mx-auto">
              {/* Thin orbit circle */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-b from-teal-300 to-cyan-500 text-black shadow-2xl shadow-cyan-500/30"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 3.6, repeat: Infinity }}
              >
                🚀
              </motion.div>
            </div>

            {/* CTA stack */}
            <div className="mt-10 space-y-6">
              <SearchForm query={query} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <ChevronDownIcon className="w-8 h-8 text-cyan-300" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
