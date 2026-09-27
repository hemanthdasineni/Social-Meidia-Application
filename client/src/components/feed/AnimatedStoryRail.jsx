import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

const stories = [
  {
    id: 's-self',
    username: 'Your Story',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isSelf: true,
  },
  {
    id: 's-1',
    username: 'sophia.ai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    hasUnread: true,
  },
  {
    id: 's-2',
    username: 'alex_dev',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    hasUnread: true,
  },
  {
    id: 's-3',
    username: 'elena_art',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
    hasUnread: true,
  },
  {
    id: 's-4',
    username: 'marcus_vibe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    hasUnread: true,
  },
  {
    id: 's-5',
    username: 'clara_design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    hasUnread: false,
  },
  {
    id: 's-6',
    username: 'neo_kenta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    hasUnread: false,
  },
];

export const AnimatedStoryRail = ({ onSelectStory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group/rail select-none">
      {/* Scroll Navigation Arrows (Desktop) */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-[#121522] border border-slate-200 dark:border-white/10 shadow-xl items-center justify-center text-slate-700 dark:text-slate-200 opacity-0 group-hover/rail:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-[#121522] border border-slate-200 dark:border-white/10 shadow-xl items-center justify-center text-slate-700 dark:text-slate-200 opacity-0 group-hover/rail:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Stories Track */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x snap-mandatory"
      >
        {stories.map((story, idx) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectStory && onSelectStory(story)}
            className="flex flex-col items-center gap-2 cursor-pointer shrink-0 snap-start group"
          >
            <div className="relative p-1">
              {/* Rotating conic gradient ring */}
              {story.hasUnread && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-amber-400 animate-spin [animation-duration:5s] opacity-90 group-hover:opacity-100 blur-[1px]" />
              )}

              {/* Avatar Container */}
              <div className="relative rounded-full p-0.5 bg-white dark:bg-[#08090d]">
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-transparent group-hover:scale-105 transition-transform"
                />

                {story.isSelf && (
                  <div className="absolute bottom-0 right-0 p-1.5 bg-gradient-to-tr from-brand-600 to-pink-500 rounded-full text-white ring-2 ring-white dark:ring-[#08090d] shadow-lg shadow-brand-500/40">
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            </div>

            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-500 dark:group-hover:text-brand-400 truncate max-w-[72px] text-center transition-colors">
              {story.username}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
