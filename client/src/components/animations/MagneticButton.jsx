import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MagneticButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  size = 'lg',
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    smoothX.set(middleX * 0.35);
    smoothY.set(middleY * 0.35);
  };

  const handleMouseLeave = () => {
    smoothX.set(0);
    smoothY.set(0);
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] border border-white/20',
    secondary:
      'bg-white/10 dark:bg-[#121522]/80 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 shadow-lg hover:border-cyan-400/40',
    cyan:
      'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-cyan-300/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-xl',
    md: 'px-6 py-3 text-sm rounded-2xl',
    lg: 'px-8 py-4 text-base rounded-2xl font-bold',
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2.5 transition-all select-none overflow-hidden group ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Light sheen ripple effect on hover */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
