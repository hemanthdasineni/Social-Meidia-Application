import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Sparkles, TrendingUp, Compass, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const exploreMedia = [
  {
    id: 'e1',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    likes: 342,
    comments: 28,
    category: 'Design',
  },
  {
    id: 'e2',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    likes: 512,
    comments: 49,
    category: 'Dev',
  },
  {
    id: 'e3',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800',
    likes: 219,
    comments: 14,
    category: 'Vibes',
  },
  {
    id: 'e4',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    likes: 780,
    comments: 65,
    category: 'Tech',
  },
  {
    id: 'e5',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    likes: 420,
    comments: 31,
    category: 'Art',
  },
  {
    id: 'e6',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    likes: 910,
    comments: 88,
    category: 'Nature',
  },
];

const trendingTags = ['vibebuilding', 'uiux', 'reactjs', 'tailwindcss', 'digitalart', 'solopreneur'];

export const ExplorePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-500" />
            Explore Vibes
          </h1>
          <p className="text-sm text-slate-400">Discover trending stories and top visual creators</p>
        </div>

        {/* Trending Tags Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <TrendingUp className="w-4 h-4 text-brand-500 shrink-0" />
          {trendingTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-brand-500 hover:text-white transition whitespace-nowrap"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Grid of visual items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {exploreMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/posts/${item.id}`)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 cursor-pointer"
          >
            <img
              src={item.url}
              alt="Explore visual"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 text-white font-bold text-sm">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 fill-white" /> {item.likes}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 fill-white" /> {item.comments}
              </span>
            </div>
            {/* Category tag */}
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
