import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { formatTimeAgo } from '../../lib/utils';

export const PostCardPlaceholder = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likesCount || 42);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const author = post?.author || {
    username: 'creative_aura',
    fullName: 'Aura Studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isVerified: true,
  };

  return (
    <Card className="overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div
          onClick={() => navigate(`/profile/${author.username}`)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Avatar src={author.avatar?.url || author.avatar} size="md" hasStory />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-brand-500 transition">
                {author.fullName}
              </span>
              {author.isVerified && (
                <Sparkles className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              )}
            </div>
            <p className="text-xs text-slate-400">
              @{author.username} • {formatTimeAgo(post?.createdAt || new Date())}
            </p>
          </div>
        </div>

        <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Media Image */}
      {post?.media?.[0]?.url ? (
        <div
          onClick={() => navigate(`/posts/${post._id || 'demo'}`)}
          className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer"
        >
          <img
            src={post.media[0].url}
            alt="Post content"
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      ) : null}

      {/* Interactive Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`p-2 rounded-xl transition-all duration-150 flex items-center gap-1.5 ${
                liked
                  ? 'text-rose-500 bg-rose-500/10 scale-105'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${liked ? 'fill-rose-500 stroke-rose-500' : ''}`}
              />
              <span className="text-xs font-semibold">{likeCount}</span>
            </button>

            <button
              onClick={() => navigate(`/posts/${post?._id || 'demo'}`)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-semibold">
                {post?.commentsCount || 12}
              </span>
            </button>

            <button className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-xl transition ${
              bookmarked
                ? 'text-brand-500 bg-brand-500/10'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark
              className={`w-5 h-5 ${bookmarked ? 'fill-brand-500' : ''}`}
            />
          </button>
        </div>

        {/* Caption and Tags */}
        <div className="space-y-1.5 text-left">
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            <span
              onClick={() => navigate(`/profile/${author.username}`)}
              className="font-bold mr-2 text-slate-900 dark:text-white cursor-pointer hover:underline"
            >
              {author.username}
            </span>
            {post?.caption ||
              'Building the visual frontend experience with modern Tailwind design tokens and glassmorphic micro-interactions ✨🚀'}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(post?.tags || ['vibebuilding', 'creativity', 'webdev', 'design']).map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
                >
                  #{tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
