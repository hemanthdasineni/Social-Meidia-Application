import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, UserPlus, Flame } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';

const creatorsList = [
  {
    id: 'u1',
    username: 'sophia.ai',
    fullName: 'Sophia Chen',
    bio: 'Generative AI & Visual Narratives',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
    followers: '45.2K',
    isVerified: true,
  },
  {
    id: 'u2',
    username: 'alex_dev',
    fullName: 'Alex River',
    bio: 'Frontend Architecture & Motion Systems',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120',
    followers: '28.9K',
    isVerified: false,
  },
  {
    id: 'u3',
    username: 'elena_art',
    fullName: 'Elena Rostova',
    bio: '3D Renderings & Cyber Aesthetic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    followers: '19.4K',
    isVerified: true,
  },
  {
    id: 'u4',
    username: 'marcus_vibe',
    fullName: 'Marcus Vance',
    bio: 'Cinematic colorist & sound designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    followers: '12.1K',
    isVerified: false,
  },
];

export const SuggestedCreators = () => {
  const navigate = useNavigate();
  const [followingMap, setFollowingMap] = useState({});

  const handleToggleFollow = (id, e) => {
    e.stopPropagation();
    setFollowingMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Card className="p-5 bg-white/70 dark:bg-[#0e111d]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Top Creators
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 cursor-pointer hover:underline">
          See All
        </span>
      </div>

      <div className="space-y-3.5">
        {creatorsList.map((creator) => {
          const isFollowing = !!followingMap[creator.id];

          return (
            <div
              key={creator.id}
              onClick={() => navigate(`/profile/${creator.username}`)}
              className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/[0.04] transition cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar
                  src={creator.avatar}
                  alt={creator.username}
                  size="sm"
                  hasStory
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-500 transition">
                      {creator.fullName}
                    </p>
                    {creator.isVerified && (
                      <Sparkles className="w-3 h-3 text-brand-500 fill-brand-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    @{creator.username} • {creator.followers}
                  </p>
                </div>
              </div>

              {/* Morphing Follow Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => handleToggleFollow(creator.id, e)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all select-none focus:outline-none ${
                  isFollowing
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isFollowing ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Following</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="plus"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
