# VibeStream 🚀✨
> **A modern MERN social media platform where creators, developers, and visual storytellers share daily vibes, creative workflows, and bite-sized visual stories.**

---

## 🏗️ Architecture & Monorepo Structure

```
vibebuilding/
├── package.json                   # Root orchestrator with concurrently scripts
├── .gitignore
├── README.md                      # Comprehensive guide and architecture documentation
│
├── server/                        # Backend REST API (Node.js + Express ES Modules)
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/                # DB connection, environment parsing, Cloudinary config
│       ├── models/                # Complete Mongoose schemas with compound indexes
│       │   ├── User.js            # User profile, credentials & counters
│       │   ├── Post.js            # Post content, media array & tag indexes
│       │   ├── Comment.js         # Threaded comments with parent/post references
│       │   ├── Like.js            # Polymorphic like records with unique compound index
│       │   ├── Follow.js          # Social graph follower/following relations
│       │   ├── Notification.js    # Activity notifications inbox
│       │   └── Bookmark.js        # Private saved posts
│       ├── controllers/           # Auth, User, Post, Comment, Notification, Search, Health
│       ├── routes/                # Express router endpoints
│       ├── middleware/            # JWT auth, Zod validation, Rate limiter, Multer upload, Error handler
│       ├── validators/            # Zod validation schemas
│       ├── utils/                 # ApiError, ApiResponse, asyncHandler
│       ├── app.js                 # Express app configuration & middleware pipeline
│       └── server.js              # Server listener & Socket.IO initialization
│
└── client/                        # Frontend Web App (React 18 + Vite + Tailwind CSS)
    ├── package.json
    ├── vite.config.js             # Path aliases (@/*) & backend proxy
    ├── tailwind.config.js         # Curated color tokens, dark obsidian theme, typography
    ├── postcss.config.js
    ├── .env.example
    └── src/
        ├── components/
        │   ├── ui/                # Button, Card, Avatar, Input, Modal, Badge, Skeleton
        │   ├── layout/            # AppShell, Sidebar, TopBar, BottomNav, ThemeToggle
        │   ├── feed/              # StoryRail, FeedPlaceholder
        │   ├── post/              # PostCard with actions and tags
        │   └── profile/           # ProfileHeader with stats and banner
        ├── pages/                 # Home, Explore, Profile, PostDetail, Notifications, Settings, Login, Register, NotFound
        ├── hooks/                 # useTheme, useAuth
        ├── services/              # Axios instance with credentials and response interceptors
        ├── store/                 # Zustand stores (useAuthStore, useThemeStore)
        ├── lib/                   # Utility helpers (cn, formatTimeAgo, formatNumber)
        ├── routes/                # AppRoutes with ProtectedRoute wrapper
        ├── App.jsx                # QueryClient & Router provider
        ├── index.css              # Custom scrollbars, glassmorphism & typography
        └── main.jsx               # React DOM entry point
```

---

## 📐 Data Modeling: Embedding vs. Referencing Rationale

| Model | Schema Pattern | Rationale |
| :--- | :--- | :--- |
| **User** | Standalone Collection + Embedded Profile Cache | Contains core auth and profile fields. Embedded counter caches (`followersCount`, `postsCount`) avoid costly join counts on high-traffic profile loads. |
| **Post** | Standalone Collection + Embedded Media Array | Media objects (`url`, `publicId`, `aspectRatio`) are embedded because they are immutable parts of the post and always queried together. Author is referenced to prevent data duplication. |
| **Comment** | Standalone Collection with Parent Reference | Uses `{ post: ObjectId, author: ObjectId, parentComment: ObjectId }`. Referencing prevents viral posts with thousands of comments from hitting the 16MB document limit. |
| **Like** | Standalone Collection with Compound Unique Index | Uses `{ user: 1, post: 1 }` or `{ user: 1, comment: 1 }`. Eliminates write locks on posts during viral likes and enables instant O(1) `hasLiked` lookups. |
| **Follow** | Standalone Collection (Social Graph Edges) | Uses `{ follower: 1, following: 1 }`. Prevents array growth issues inside User documents and scales to millions of followers per account. |
| **Notification** | Standalone Collection | Activity logs with indexes on `recipient + createdAt` for efficient pagination and batch mark-as-read updates. |
| **Bookmark** | Standalone Collection with Compound Unique Index | Uses `{ user: 1, post: 1 }` to isolate private saved collections cleanly from public post documents. |

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (ES Modules), MongoDB, Mongoose, JWT (httpOnly Cookies), bcryptjs, Zod, Multer, Cloudinary, Socket.IO.
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, TanStack Query v5, Zustand, Axios, React Router 6.

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
Run the installation command from the repository root:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Copy `.env.example` files in both `/server` and `/client`:
```bash
# Server environment
cp server/.env.example server/.env

# Client environment
cp client/.env.example client/.env
```

### 3. Run Development Servers Concurrently
Start both backend API (`http://localhost:5000`) and frontend client (`http://localhost:5173`) in one command:
```bash
npm run dev
```

Alternatively, run each service independently:
```bash
# Run server only (port 5000)
npm run dev:server

# Run client only (port 5173)
npm run dev:client
```

---

## 📡 API Endpoint Plan

### System & Health
- `GET /api/health` — Service status, uptime, database connectivity

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new account & set httpOnly JWT cookie
- `POST /api/auth/login` — Login user & set httpOnly JWT cookie
- `POST /api/auth/logout` — Clear JWT session cookie
- `GET /api/auth/me` — Retrieve authenticated user profile

### Users & Profiles (`/api/users`)
- `GET /api/users/:username` — Public profile details and follow status
- `PATCH /api/users/profile` — Update bio, avatar, links, and display details
- `POST /api/users/follow/:targetUserId` — Follow or unfollow a creator

### Posts & Interactions (`/api/posts`)
- `GET /api/posts/feed` — Chronological feed of followed creators with cursor pagination
- `GET /api/posts/:id` — Single post details with author and like status
- `POST /api/posts` — Create post with text caption and up to 5 Cloudinary images
- `DELETE /api/posts/:id` — Delete authored post
- `POST /api/posts/:id/like` — Toggle like on post
- `POST /api/posts/:id/bookmark` — Toggle bookmark on post

### Comments (`/api/comments`)
- `GET /api/comments/:postId` — Get threaded comments for a post
- `POST /api/comments/:postId` — Add comment or reply
- `DELETE /api/comments/:commentId` — Delete comment

### Notifications (`/api/notifications`)
- `GET /api/notifications` — Fetch user's notifications inbox
- `PATCH /api/notifications/mark-read` — Mark all unread notifications as read

### Search & Explore (`/api/search`)
- `GET /api/search` — Global search across usernames, full names, captions & tags
- `GET /api/search/explore` — Top trending posts feed ranked by engagement

---

## ✨ Futuristic Motion & Animation Design Guide

All animation components are located in [`client/src/components/animations/`](file:///c:/Users/USER/OneDrive/Projects/vibebuilding/client/src/components/animations/):

| Component | Description | Customization / Tweaks |
| :--- | :--- | :--- |
| **`ParticleCanvas`** | 60fps canvas starfield constellation with mouse repulsion | Edit `particleCount`, `colors`, and connection distance in `ParticleCanvas.jsx` |
| **`FloatingMesh`** | Shifting gradient mesh blobs + 3D floating parallax badges | Tweak `duration`, `scale`, and spring damping/stiffness in `FloatingMesh.jsx` |
| **`TextShimmerReveal`** | Staggered spring word reveal with gradient pulse | Adjust `staggerChildren` delay and gradient color keywords in `TextShimmerReveal.jsx` |
| **`MagneticButton`** | Magnetic cursor pull with light ripple and neon glow | Adjust magnetic pull strength (`middleX * 0.35`) and spring damping in `MagneticButton.jsx` |
| **`TiltCard`** | 3D perspective tilt reacting to cursor coordinates with specular glare | Adjust `maxTilt` (default: 6-12 degrees) and spring stiffness in `TiltCard.jsx` |
| **`HeartBurst`** | Explosive confetti burst + floating mini hearts on like | Customize `particleCount`, `colors`, and gravity in `HeartBurst.jsx` |
| **`RadialFab`** | Floating button expanding into 4 radial creative actions | Customize radial coordinates `(x, y)` and spring stiffness in `RadialFab.jsx` |
| **`MarqueeTicker`** | Continuous infinite auto-scrolling ticker | Adjust `duration` in `MarqueeTicker.jsx` to speed up or slow down scroll |
| **`LiveToastStream`** | Realistic real-time activity toasts with spring bounce | Adjust interval timer (default 9000ms) in `LiveToastStream.jsx` |
| **`CustomCursor`** | Desktop glowing trailing neon cursor with spring physics | Adjust spring config and blur halo in `CustomCursor.jsx` |

### 🎨 Color Customization
The primary neon palette can be customized in [`tailwind.config.js`](file:///c:/Users/USER/OneDrive/Projects/vibebuilding/client/tailwind.config.js):
- `brand` (Electric Violet): `#7C3AED` / `#8B5CF6`
- `accent.pink` (Hot Pink): `#F472B6` / `#F43F5E`
- `accent.cyan` (Hyper Cyan): `#22D3EE` / `#06B6D4`
- `dark.bg` (Deep Obsidian Canvas): `#070913` / `#0B0F1A`

---

## 🗺️ Roadmap

- [x] **PHASE 1: Foundation & Project Structure** (Monorepo, Schemas, Base UI System, Routing, Layout, Health Check)
- [x] **Futuristic Glassmorphic Home Page Redesign** (Framer Motion, 3D Tilt, Particle Canvas, Story Rings, Radial FAB, Live Toasts)
- [ ] **PHASE 2: Core Features** (Full Auth flow, Image upload to Cloudinary, Infinite Scroll Feed, Profiles, Interactions & Validations)
- [ ] **PHASE 3: Real-Time & Polish** (Socket.io live notifications, optimistic UI updates, responsive animations, and final polish)

