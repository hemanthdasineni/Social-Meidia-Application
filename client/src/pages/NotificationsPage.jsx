import React from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Bell, Heart, MessageCircle, UserPlus, CheckCheck } from 'lucide-react';
import { formatTimeAgo } from '../lib/utils';

const mockNotifications = [
  {
    id: 'n1',
    type: 'like',
    sender: {
      username: 'marcus_vibe',
      fullName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    message: 'liked your vibe "Sunset vibes over the creative studio"',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false,
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
  },
  {
    id: 'n2',
    type: 'follow',
    sender: {
      username: 'sophia.ai',
      fullName: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    },
    message: 'started following you',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isRead: false,
  },
  {
    id: 'n3',
    type: 'comment',
    sender: {
      username: 'alex_dev',
      fullName: 'Alex River',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    },
    message: 'commented: "That glow setup looks unreal! 🔥"',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150',
  },
];

export const NotificationsPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-500" />
            Notifications
          </h1>
          <p className="text-sm text-slate-400">Activity and interactions from your audience</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          leftIcon={<CheckCheck className="w-4 h-4" />}
        >
          Mark all read
        </Button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((n) => {
          const icons = {
            like: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />,
            follow: <UserPlus className="w-4 h-4 text-brand-500" />,
            comment: <MessageCircle className="w-4 h-4 text-cyan-500 fill-cyan-500" />,
          };

          return (
            <Card
              key={n.id}
              className={`p-4 flex items-center justify-between gap-4 transition ${
                !n.isRead
                  ? 'border-brand-500/30 bg-brand-50/20 dark:bg-brand-950/20'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar src={n.sender.avatar} size="md" />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-[#121520] rounded-full shadow">
                    {icons[n.type]}
                  </div>
                </div>

                <div className="text-left text-sm">
                  <p className="text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {n.sender.fullName}
                    </span>{' '}
                    {n.message}
                  </p>
                  <span className="text-xs text-slate-400">
                    {formatTimeAgo(n.createdAt)}
                  </span>
                </div>
              </div>

              {n.previewImage && (
                <img
                  src={n.previewImage}
                  alt="Post preview"
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
