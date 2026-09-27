import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  ArrowLeft,
  Send,
  Sparkles,
} from 'lucide-react';
import { formatTimeAgo } from '../lib/utils';

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);

  const comments = [
    {
      id: 'c1',
      author: {
        username: 'sophia.ai',
        fullName: 'Sophia Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      },
      content: 'This lighting setup is mesmerizing! Love the subtle cyan highlights.',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'c2',
      author: {
        username: 'marcus_vibe',
        fullName: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
      content: 'Phenomenal shot! Which camera lens did you use for this depth of field?',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-white dark:bg-[#10131d] border border-slate-200/80 dark:border-slate-800/80 shadow-lg">
        {/* Left: Media Display */}
        <div className="lg:col-span-7 bg-black flex items-center justify-center min-h-[360px] lg:min-h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200"
            alt="Detail visual"
            className="w-full h-full max-h-[600px] object-cover"
          />
        </div>

        {/* Right: Author, Caption & Comments Section */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800/80 p-5">
          <div className="space-y-4">
            {/* Author Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <Avatar
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                size="md"
              />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Elena Rostova
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
                </div>
                <span className="text-xs text-slate-400">@elena_designs</span>
              </div>
            </div>

            {/* Caption */}
            <p className="text-sm text-slate-800 dark:text-slate-200 text-left leading-relaxed">
              Sunset vibes over the creative studio terrace. Pure inspiration for tonight’s UI palette! 🎨🌅
            </p>

            {/* Comments List */}
            <div className="space-y-3 pt-2 max-h-64 overflow-y-auto pr-1">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5 text-left text-xs">
                  <Avatar src={c.author.avatar} size="xs" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 mr-1.5">
                      {c.author.username}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{c.content}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {formatTimeAgo(c.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions & Input */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setLiked(!liked);
                    setLikeCount((p) => (liked ? p - 1 : p + 1));
                  }}
                  className={`p-2 rounded-xl flex items-center gap-1.5 ${
                    liked ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-rose-500' : ''}`} />
                  <span className="text-xs font-semibold">{likeCount}</span>
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            {/* Add Comment Input */}
            <div className="flex items-center gap-2">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="rounded-full text-xs py-2"
              />
              <Button
                variant="gradient"
                size="sm"
                className="rounded-full px-3"
                onClick={() => setCommentText('')}
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
