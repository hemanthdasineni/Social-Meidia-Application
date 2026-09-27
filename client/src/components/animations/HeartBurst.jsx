import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const HeartBurst = ({
  isLiked,
  likesCount = 0,
  onToggleLike,
  className = '',
}) => {
  const [particles, setParticles] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    const nextState = !isLiked;

    if (nextState) {
      // Trigger mini confetti burst from button location
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      try {
        confetti({
          particleCount: 22,
          spread: 60,
          origin: { x, y },
          colors: ['#F43F5E', '#EC4899', '#A855F7', '#22D3EE'],
          ticks: 120,
          gravity: 1.2,
          scalar: 0.8,
        });
      } catch {
        // Fallback
      }

      // Generate 5 floating mini floating hearts
      const newParticles = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 45,
        y: -30 - Math.random() * 35,
        scale: Math.random() * 0.5 + 0.6,
        rotate: (Math.random() - 0.5) * 40,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 800);
    }

    if (onToggleLike) onToggleLike();
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.12 }}
        onClick={handleClick}
        className={`relative p-2 rounded-2xl transition-all duration-200 flex items-center gap-1.5 select-none focus:outline-none ${
          isLiked
            ? 'text-rose-500 bg-rose-500/15 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
        }`}
      >
        <motion.div
          animate={isLiked ? { scale: [1, 1.45, 1], rotate: [0, -15, 15, 0] } : {}}
          transition={{ duration: 0.35 }}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isLiked ? 'fill-rose-500 stroke-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]' : ''
            }`}
          />
        </motion.div>
        <span className="text-xs font-bold">{likesCount}</span>
      </motion.button>

      {/* Mini Floating Hearts */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: 0,
              x: p.x,
              y: p.y,
              scale: p.scale,
              rotate: p.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-1 left-3 pointer-events-none text-rose-500 z-30"
          >
            <Heart className="w-4 h-4 fill-rose-500 stroke-none" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
