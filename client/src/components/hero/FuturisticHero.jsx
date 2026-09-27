import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Heart,
  Camera,
} from 'lucide-react';
import {
  TextShimmerReveal,
  VantaBirdsBackground,
} from '../animations';

export const FuturisticHero = () => {
  const navigate = useNavigate();

  return (
    <VantaBirdsBackground className="min-h-[80vh] flex items-center justify-center">
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 text-center py-14 lg:py-20 z-10">
        {/* Floating 3D Badges (Adaptive contrast) */}
        <div className="hidden lg:flex absolute top-8 left-6 xl:left-12 items-center gap-3 p-3 rounded-2xl bg-white/85 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl select-none z-20 animate-pulse-slow">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div className="text-left text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-900 dark:text-white">Live Reaction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-pink-600 dark:text-pink-300 font-bold">+2.4k Likes</p>
          </div>
        </div>

        <div className="hidden lg:flex absolute top-10 right-6 xl:right-12 items-center gap-3 p-3 rounded-2xl bg-white/85 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl select-none z-20 animate-pulse-slow">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <Camera className="w-4 h-4" />
          </div>
          <div className="text-left text-xs">
            <p className="font-bold text-slate-900 dark:text-white">Ultra 4K Vibes</p>
            <p className="text-cyan-600 dark:text-cyan-300 font-bold">Auto HDR</p>
          </div>
        </div>

        {/* Live Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-md mb-6 select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-brand-600 via-pink-500 to-indigo-600 dark:from-cyan-300 dark:via-pink-300 dark:to-amber-300 bg-clip-text text-transparent">
            VibeStream 2.0 Live
          </span>
          <span className="text-slate-300 dark:text-white/40">|</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Join 85,000+ Creators</span>
        </div>

        {/* Headline with Staggered Shimmer */}
        <TextShimmerReveal
          text="Where Visual Creators Share Their Daily Vibe"
          className="text-3xl sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[1.15]"
          gradientWords={['Daily Vibe', 'Creators']}
        />

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
          An immersive 3D canvas for micro-stories, visual aesthetics, and creative workflows.
        </p>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 border border-white/20"
          >
            <span>Join the Community</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const feedEl = document.getElementById('home-feed-section');
              if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
              else navigate('/explore');
            }}
            className="px-6 py-3 rounded-xl bg-white/90 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 text-slate-900 dark:text-white font-bold text-sm backdrop-blur-md border border-slate-300 dark:border-white/20 shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-brand-600 dark:text-cyan-400" />
            <span>Explore Feed</span>
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-700 dark:text-slate-300 select-none">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
              alt="Creator"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-purple-600 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80"
              alt="Creator"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-pink-600 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80"
              alt="Creator"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-cyan-500 object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">4.9/5 ★★★★★</span>
            <span className="text-slate-500 dark:text-slate-400 ml-1.5 font-medium">Loved by 10k+ creators</span>
          </div>
        </div>
      </div>
    </VantaBirdsBackground>
  );
};
