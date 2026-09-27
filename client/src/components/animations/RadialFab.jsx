import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image, Video, Sparkles, Radio, X } from 'lucide-react';

export const RadialFab = ({ onSelectAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 'photo',
      label: 'Photo Vibe',
      icon: Image,
      color: 'from-pink-500 to-rose-600',
      x: -60,
      y: -75,
    },
    {
      id: 'story',
      label: 'New Story',
      icon: Sparkles,
      color: 'from-amber-400 to-orange-500',
      x: 0,
      y: -95,
    },
    {
      id: 'video',
      label: 'Video Clip',
      icon: Video,
      color: 'from-cyan-400 to-blue-600',
      x: 60,
      y: -75,
    },
    {
      id: 'live',
      label: 'Go Live',
      icon: Radio,
      color: 'from-purple-500 to-indigo-600',
      x: 90,
      y: -15,
    },
  ];

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-40">
      {/* Backdrop overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Radial Sub-action Buttons */}
      <AnimatePresence>
        {isOpen &&
          actions.map((act, index) => {
            const Icon = act.icon;
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: act.x,
                  y: act.y,
                }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                  delay: index * 0.04,
                }}
                className="absolute bottom-0 right-0 z-40 flex items-center gap-2"
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onSelectAction) onSelectAction(act.id);
                  }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${act.color} text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group relative`}
                  title={act.label}
                >
                  <Icon className="w-5 h-5" />
                  {/* Tooltip badge */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/90 text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                    {act.label}
                  </span>
                </button>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-40 w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-purple-600 to-pink-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.5)] flex items-center justify-center select-none"
        aria-label="Create Vibe Menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </motion.div>
      </motion.button>
    </div>
  );
};
