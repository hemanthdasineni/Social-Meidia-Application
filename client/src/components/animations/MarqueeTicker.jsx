import React from 'react';
import { Flame, Sparkles, TrendingUp, Zap, Heart } from 'lucide-react';

const tickerItems = [
  { icon: Flame, text: '#vibebuilding', color: 'text-rose-400' },
  { icon: Sparkles, text: 'Elena posted "Tokyo Midnight Bloom"', color: 'text-brand-400' },
  { icon: Zap, text: '#minimalist_workspace', color: 'text-cyan-400' },
  { icon: Heart, text: '14.2k Vibes Shared Today', color: 'text-pink-400' },
  { icon: TrendingUp, text: '#3Ddesign', color: 'text-emerald-400' },
  { icon: Sparkles, text: 'Alex reached 10k Followers', color: 'text-amber-400' },
  { icon: Flame, text: '#cyberpunk_palette', color: 'text-purple-400' },
];

export const MarqueeTicker = () => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-900/90 dark:bg-[#0b0e18]/90 border-y border-white/10 py-3 select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 dark:from-[#0b0e18] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 dark:from-[#0b0e18] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee gap-8">
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
              <span className="text-slate-600 dark:text-slate-700 ml-4">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
