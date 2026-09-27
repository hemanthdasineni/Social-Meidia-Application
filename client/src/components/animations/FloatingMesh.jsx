import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, MessageSquare, Camera, Sparkles, Flame, Eye } from 'lucide-react';

export const FloatingMesh = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax offsets at different depths
  const orb1X = useTransform(smoothX, [-500, 500], [-35, 35]);
  const orb1Y = useTransform(smoothY, [-500, 500], [-35, 35]);

  const orb2X = useTransform(smoothX, [-500, 500], [50, -50]);
  const orb2Y = useTransform(smoothY, [-500, 500], [50, -50]);

  const card1X = useTransform(smoothX, [-500, 500], [-25, 25]);
  const card1Y = useTransform(smoothY, [-500, 500], [-25, 25]);

  const card2X = useTransform(smoothX, [-500, 500], [30, -30]);
  const card2Y = useTransform(smoothY, [-500, 500], [30, -30]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-gradient-to-b from-transparent via-[#070913]/30 to-slate-50/80 dark:to-[#08090d]/80 text-white py-12 lg:py-20"
    >
      {/* Animated Gradient Mesh Blobs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.35, 0.55, 0.4, 0.35],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 sm:w-[520px] h-96 sm:h-[520px] bg-gradient-to-tr from-brand-600 via-purple-600 to-pink-500 rounded-full blur-[110px] pointer-events-none opacity-40"
      />

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/4 -right-36 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-gradient-to-bl from-cyan-500 via-indigo-600 to-purple-800 rounded-full blur-[120px] pointer-events-none opacity-35"
      />

      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 left-1/3 w-80 sm:w-[400px] h-80 sm:h-[400px] bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 rounded-full blur-[130px] pointer-events-none opacity-25"
      />

      {/* Floating 3D Parallax Badges (Desktop/Tablet) */}
      <motion.div
        style={{ x: card1X, y: card1Y }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute top-20 left-12 xl:left-24 items-center gap-3 p-3.5 rounded-2xl bg-white/10 dark:bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-900/30 select-none z-10"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/40">
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <div className="text-left text-xs">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white">Live Reaction</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-pink-300 font-medium">+2.4k Likes today</p>
        </div>
      </motion.div>

      <motion.div
        style={{ x: card2X, y: card2Y }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:flex absolute top-28 right-12 xl:right-28 items-center gap-3 p-3.5 rounded-2xl bg-white/10 dark:bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-2xl shadow-cyan-900/30 select-none z-10"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/40">
          <Camera className="w-5 h-5" />
        </div>
        <div className="text-left text-xs">
          <p className="font-bold text-white">Ultra 4K Vibes</p>
          <p className="text-cyan-300 font-medium">Auto HDR Enhanced</p>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 4, -4, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="hidden xl:flex absolute bottom-20 right-20 items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-pink-500/30 shadow-lg text-xs font-bold text-pink-200 select-none z-10"
      >
        <Flame className="w-4 h-4 text-pink-400 fill-pink-400" />
        <span>Trending: #neo_cyberpunk</span>
      </motion.div>

      {/* Hero Children Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
