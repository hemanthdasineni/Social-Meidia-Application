import React from 'react';
import { motion } from 'framer-motion';

export const TextShimmerReveal = ({
  text = 'Where Visual Creators Share Their Daily Vibe',
  className = '',
  gradientWords = ['Daily Vibe', 'Creators'],
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(6px)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.h1
      className={`font-black tracking-tight flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        const isGradient = gradientWords.some((gw) => word.toLowerCase().includes(gw.toLowerCase()));

        return (
          <motion.span
            variants={child}
            key={index}
            className={`inline-block ${
              isGradient
                ? 'bg-gradient-to-r from-brand-600 via-pink-500 to-indigo-600 dark:from-brand-400 dark:via-pink-400 dark:to-cyan-300 bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse-slow font-extrabold'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};
