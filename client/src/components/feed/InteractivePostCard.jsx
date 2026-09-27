import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { TiltCard } from '../animations/TiltCard';
import { HeartBurst } from '../animations/HeartBurst';
import { formatTimeAgo } from '../../lib/utils';

export const InteractivePostCard = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likesCount || 42);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post?.commentsCount || 12);
  const [copied, setCopied] = useState(false);

  const author = post?.author || {
    username: 'creative_aura',
    fullName: 'Aura Studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isVerified: true,
  };

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      setLikesCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/posts/${post?._id || 'demo'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TiltCard
      maxTilt={6}
      className="bg-white/80 dark:bg-[#0e111d]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-purple-950/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div
          onClick={() => navigate(`/profile/${author.username}`)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Avatar
            src={author.avatar?.url || author.avatar}
            alt={author.username}
            size="md"
            hasStory
          />
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition">
                {author.fullName}
              </span>
              {author.isVerified && (
                <Sparkles className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>@{author.username}</span>
              <span>•</span>
              <span>{formatTimeAgo(post?.createdAt || new Date())}</span>
              {post?.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Media with Hover Zoom */}
      {post?.media?.[0]?.url && (
        <div
          onClick={() => navigate(`/posts/${post?._id || 'demo'}`)}
          className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer group"
        >
          {post.media[0].mediaType === 'video' ||
          post.media[0].url.startsWith('data:video') ||
          /\.(mp4|webm|mov|ogg)$/i.test(post.media[0].url) ? (
            <video
              src={post.media[0].url}
              controls
              playsInline
              className="w-full h-full object-cover"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={post.media[0].url}
              alt="Post visual vibe"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          )}
          {/* Subtle bottom gradient shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Actions and Content */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Interaction Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Interactive Heart Burst */}
            <HeartBurst
              isLiked={isLiked}
              likesCount={likesCount}
              onToggleLike={handleToggleLike}
            />

            {/* Comment Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate(`/posts/${post?._id || 'demo'}`)}
              className="p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex items-center gap-1.5 focus:outline-none"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-bold">{commentsCount}</span>
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleShare}
              className="p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition relative"
              title="Share / Copy Link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Bookmark Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-2xl transition focus:outline-none ${
              isBookmarked
                ? 'text-brand-500 bg-brand-500/15 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            <Bookmark
              className={`w-5 h-5 ${isBookmarked ? 'fill-brand-500 stroke-brand-500' : ''}`}
            />
          </motion.button>
        </div>

        {/* Caption & Content */}
        <div className="space-y-2 text-left">
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            <span
              onClick={() => navigate(`/profile/${author.username}`)}
              className="font-bold mr-2 text-slate-900 dark:text-white cursor-pointer hover:underline"
            >
              {author.username}
            </span>
            {post?.caption ||
              'Exploring ambient neon setups and high-contrast color palettes for tonight’s creative session.'}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(post?.tags || ['vibebuilding', 'visualart', 'design']).map((tag) => (
              <span
                key={tag}
                onClick={() => navigate(`/explore?q=${tag}`)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};
