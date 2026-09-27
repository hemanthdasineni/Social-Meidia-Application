import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FuturisticHero } from '../components/hero/FuturisticHero';
import { AnimatedStoryRail } from '../components/feed/AnimatedStoryRail';
import { InteractivePostCard } from '../components/feed/InteractivePostCard';
import { Card } from '../components/ui/Card';
import { Sparkles, Flame, Zap, Filter } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';

export const HomePage = () => {
  const posts = usePostStore((state) => state.posts);
  const [activeFeedTab, setActiveFeedTab] = useState('for-you');

  const feedTabs = [
    { id: 'for-you', label: 'For You', icon: Sparkles },
    { id: 'following', label: 'Following', icon: Zap },
    { id: 'trending', label: 'Trending', icon: Flame },
  ];

  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. Hero Section with 3D Vanta Birds */}
      <FuturisticHero />

      {/* 2. Centered Main Feed Container */}
      <div
        id="home-feed-section"
        className="max-w-2xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 space-y-8 pt-4"
      >
        {/* Story Rail Container (Clean & Centered) */}
        <Card className="p-4 sm:p-5 bg-white/80 dark:bg-[#0e111d]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl rounded-3xl">
          <AnimatedStoryRail />
        </Card>

        {/* Centered Feed Filter Pill Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-2">
            {feedTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFeedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeedTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="feedTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 rounded-xl shadow-md shadow-brand-500/30 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Latest First</span>
          </div>
        </div>

        {/* Centered Post Cards Stream */}
        <div className="space-y-8">
          <AnimatePresence initial={false}>
            {posts.map((post, idx) => (
              <motion.div
                key={post._id || idx}
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <InteractivePostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
