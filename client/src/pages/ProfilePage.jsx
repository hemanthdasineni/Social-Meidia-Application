import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeaderPlaceholder } from '../components/profile/ProfileHeaderPlaceholder';
import { PostCardPlaceholder } from '../components/post/PostCardPlaceholder';
import { Grid, Bookmark, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  const isSelf = user?.username === username || username === 'demo';

  const userProfile = {
    username: username || 'creative_aura',
    fullName: isSelf ? (user?.fullName || 'Aura Studio') : 'Aura Studio',
    bio: 'Digital creator crafting neon aesthetics, responsive interfaces, and sharing creative visual vibes.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
    location: 'Tokyo / Remote',
    website: 'https://vibestream.art',
    followersCount: 18400,
    followingCount: 290,
    postsCount: 42,
    isVerified: true,
  };

  const tabs = [
    { id: 'posts', label: 'Vibes', icon: Grid },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'liked', label: 'Liked', icon: Heart },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <ProfileHeaderPlaceholder profile={userProfile} isSelf={isSelf} />

      {/* Tabs */}
      <div className="flex border-b border-slate-200/80 dark:border-slate-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold border-b-2 transition ${
                isActive
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        <PostCardPlaceholder
          post={{
            _id: 'p-profile-1',
            author: userProfile,
            caption: 'Working from the balcony garden with fresh coffee and ambient lofi beats. 🌿☕',
            media: [
              {
                url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
              },
            ],
            likesCount: 254,
            commentsCount: 31,
            tags: ['workspaces', 'digitalnomad', 'vibes'],
          }}
        />
      </div>
    </div>
  );
};
