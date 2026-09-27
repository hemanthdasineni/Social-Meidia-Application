import { create } from 'zustand';

const initialSamplePosts = [
  {
    _id: 'post-1',
    author: {
      username: 'elena_art',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: true,
    },
    caption: 'Tokyo Midnight Bloom 🌸 Neon reflections on rainy asphalt after a late studio rendering session. Pure tranquility.',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
        mediaType: 'image',
      },
    ],
    tags: ['cyberpunk', 'tokyovibes', '3Drender', 'digitalart'],
    location: 'Shibuya, Tokyo',
    likesCount: 342,
    commentsCount: 28,
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
    caption: 'Dual curved 4K setup bathed in deep violet and cyan ambilight. Shipping real-time web applications with pure focus ⚡💻',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
        mediaType: 'image',
      },
    ],
    tags: ['workspaces', 'reactjs', 'ambientlighting', 'setupgoals'],
    location: 'San Francisco, CA',
    likesCount: 512,
    commentsCount: 49,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    _id: 'post-3',
    author: {
      username: 'sophia.ai',
      fullName: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      isVerified: true,
    },
    caption: 'Morning architecture walk exploring parametric glass facades and organic natural lighting patterns. ✨🏛️',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
        mediaType: 'image',
      },
    ],
    tags: ['architecture', 'glassmorphism', 'minimalism'],
    location: 'Singapore',
    likesCount: 219,
    commentsCount: 15,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

const loadSavedPosts = () => {
  try {
    const saved = localStorage.getItem('vibestream_posts');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to parse saved posts:', e);
  }
  return initialSamplePosts;
};

export const usePostStore = create((set, get) => ({
  posts: loadSavedPosts(),

  addPost: (newPost) => {
    const updated = [newPost, ...get().posts];
    try {
      localStorage.setItem('vibestream_posts', JSON.stringify(updated));
    } catch {}
    set({ posts: updated });
  },

  deletePost: (id) => {
    const updated = get().posts.filter((p) => p._id !== id);
    try {
      localStorage.setItem('vibestream_posts', JSON.stringify(updated));
    } catch {}
    set({ posts: updated });
  },
}));
