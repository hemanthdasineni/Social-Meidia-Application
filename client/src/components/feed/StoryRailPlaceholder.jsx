import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Plus } from 'lucide-react';

const mockStories = [
  { id: '1', username: 'you', isSelf: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: '2', username: 'sophia.ai', isSelf: false, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: '3', username: 'alex_dev', isSelf: false, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
  { id: '4', username: 'elena_art', isSelf: false, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' },
  { id: '5', username: 'marcus_vibe', isSelf: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: '6', username: 'clara_design', isSelf: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
];

export const StoryRailPlaceholder = () => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none select-none">
      {mockStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
        >
          <div className="relative">
            <Avatar
              src={story.avatar}
              alt={story.username}
              size="lg"
              hasStory={!story.isSelf}
              className="group-hover:scale-105 transition-transform duration-200"
            />
            {story.isSelf && (
              <div className="absolute bottom-0 right-0 p-1 bg-brand-600 rounded-full text-white ring-2 ring-white dark:ring-[#08090d]">
                <Plus className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 truncate max-w-[68px] text-center">
            {story.isSelf ? 'Your Story' : story.username}
          </span>
        </div>
      ))}
    </div>
  );
};
