import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '../ui/Avatar';
import { Heart, UserPlus, Sparkles, MessageCircle, X } from 'lucide-react';

const mockLiveEvents = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Elena Rostova',
      username: 'elena_art',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    },
    action: 'liked "Tokyo Neo Gradient"',
    time: 'just now',
  },
  {
    id: 2,
    type: 'follow',
    user: {
      name: 'Marcus Vance',
      username: 'marcus_vibe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    action: 'started following you',
    time: '2s ago',
  },
  {
    id: 3,
    type: 'spark',
    user: {
      name: 'Sophia Chen',
      username: 'sophia.ai',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    },
    action: 'dropped a sparkle vibe ✨',
    time: '5s ago',
  },
];

export const LiveToastStream = () => {
  const [currentToast, setCurrentToast] = useState(null);
  const [queueIndex, setQueueIndex] = useState(0);

  useEffect(() => {
    // Show toast periodically
    const timer = setInterval(() => {
      setCurrentToast(mockLiveEvents[queueIndex % mockLiveEvents.length]);
      setQueueIndex((prev) => prev + 1);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setCurrentToast(null);
      }, 4200);
    }, 9000);

    // Initial trigger after 2s
    const initialTimer = setTimeout(() => {
      setCurrentToast(mockLiveEvents[0]);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, [queueIndex]);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 p-3.5 pr-5 rounded-2xl bg-white/90 dark:bg-[#111422]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl shadow-purple-950/30 max-w-sm"
          >
            <div className="relative shrink-0">
              <Avatar src={currentToast.user.avatar} size="sm" />
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-rose-500 text-white">
                {currentToast.type === 'like' ? (
                  <Heart className="w-2.5 h-2.5 fill-white" />
                ) : currentToast.type === 'follow' ? (
                  <UserPlus className="w-2.5 h-2.5" />
                ) : (
                  <Sparkles className="w-2.5 h-2.5 fill-white" />
                )}
              </div>
            </div>

            <div className="text-left text-xs min-w-0">
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">
                {currentToast.user.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400 truncate">
                {currentToast.action}
              </p>
            </div>

            <button
              onClick={() => setCurrentToast(null)}
              className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
