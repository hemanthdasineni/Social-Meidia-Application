import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Sparkles, MapPin, Link2, Calendar, Settings, UserPlus } from 'lucide-react';
import { formatNumber } from '../../lib/utils';

export const ProfileHeaderPlaceholder = ({ profile, isSelf = false }) => {
  const user = profile || {
    username: 'creative_aura',
    fullName: 'Aura Studio',
    bio: 'Visual artist & digital creator. Exploring neo-cyberpunk aesthetics and minimalist design spaces.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
    location: 'San Francisco, CA',
    website: 'https://aurastudio.design',
    followersCount: 14200,
    followingCount: 389,
    postsCount: 56,
    isVerified: true,
  };

  return (
    <Card className="overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      {/* Banner / Cover */}
      <div className="h-44 sm:h-56 bg-gradient-to-r from-brand-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        )}
      </div>

      {/* Profile Info Bar */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
          <Avatar
            src={user.avatar?.url || user.avatar}
            alt={user.username}
            size="2xl"
            className="ring-4 ring-white dark:ring-[#10131d] shadow-xl"
          />

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isSelf ? (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Settings className="w-4 h-4" />}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="gradient"
                  size="sm"
                  leftIcon={<UserPlus className="w-4 h-4" />}
                >
                  Follow
                </Button>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Names & Bio */}
        <div className="space-y-3 text-left">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {user.fullName}
              </h2>
              {user.isVerified && (
                <Sparkles className="w-4 h-4 text-brand-500 fill-brand-500" />
              )}
            </div>
            <p className="text-sm text-slate-400">@{user.username}</p>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
            {user.bio}
          </p>

          {/* Links & Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{user.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Joined September 2026</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                {formatNumber(user.postsCount)}
              </span>{' '}
              <span className="text-xs text-slate-400">Posts</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                {formatNumber(user.followersCount)}
              </span>{' '}
              <span className="text-xs text-slate-400">Followers</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                {formatNumber(user.followingCount)}
              </span>{' '}
              <span className="text-xs text-slate-400">Following</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
