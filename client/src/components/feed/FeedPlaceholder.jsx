import React from 'react';
import { StoryRailPlaceholder } from './StoryRailPlaceholder';
import { PostCardPlaceholder } from '../post/PostCardPlaceholder';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Image, Video, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const samplePosts = [
  {
    _id: 'post-1',
    author: {
      username: 'elena_designs',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: true,
    },
    caption: 'Sunset vibes over the creative studio terrace. Pure inspiration for tonight’s UI palette! 🎨🌅',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      },
    ],
    tags: ['inspiration', 'sunset', 'design', 'vibe'],
    likesCount: 128,
    commentsCount: 19,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: 'post-2',
    author: {
      username: 'alex_dev',
      fullName: 'Alex River',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      isVerified: false,
    },
    caption: 'Late night desk setup with dual curved displays and warm ambient glow. Shipping Phase 1 clean! ⚡💻',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      },
    ],
    tags: ['coding', 'setup', 'developer', 'nightvibes'],
    likesCount: 84,
    commentsCount: 7,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const FeedPlaceholder = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Story Rail */}
      <Card className="p-4 bg-white/70 dark:bg-[#0f121c]/70 backdrop-blur-md">
        <StoryRailPlaceholder />
      </Card>

      {/* Quick Create Box */}
      <Card className="p-4 bg-white dark:bg-[#10131d] shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar?.url} alt="Profile" size="sm" />
          <div className="flex-1 bg-slate-100 dark:bg-[#181c2a] rounded-full px-4 py-2.5 text-sm text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-[#1f2436] transition">
            Share your visual moment...
          </div>
          <button className="p-2.5 rounded-full text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition">
            <Image className="w-5 h-5" />
          </button>
        </div>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {samplePosts.map((post) => (
          <PostCardPlaceholder key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
