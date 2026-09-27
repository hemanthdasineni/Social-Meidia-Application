import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { ScrollProgressBar } from './ScrollProgressBar';
import { LiveToastStream } from '../animations';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import {
  Image as ImageIcon,
  Sparkles,
  Video as VideoIcon,
  Radio,
  UploadCloud,
  X,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { usePostStore } from '../../store/usePostStore';
import { useAuthStore } from '../../store/useAuthStore';

export const AppShell = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeCreationType, setActiveCreationType] = useState('photo');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const addPost = usePostStore((state) => state.addPost);
  const user = useAuthStore((state) => state.user);

  const handleOpenCreate = (type = 'photo') => {
    setActiveCreationType(type);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
    setCaption('');
    setLocation('');
    setMediaPreview(null);
    setMediaType('image');
    setIsDragging(false);
    setIsSubmitting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFile = (file) => {
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isImage && !isVideo) {
      alert('Please upload a valid image (PNG, JPG, WEBP, GIF) or video (MP4, WEBM) file.');
      return;
    }

    const detectedType = isVideo ? 'video' : 'image';
    setMediaType(detectedType);

    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaType('image');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePublish = () => {
    if (!caption.trim() && !mediaPreview) {
      alert('Please write a caption or select an image/video for your post.');
      return;
    }

    setIsSubmitting(true);

    // Extract hashtags from caption
    const extractedTags = (caption.match(/#(\w+)/g) || []).map((t) => t.slice(1));
    const fallbackTags = ['vibebuilding', 'creativestory', 'vibestream'];
    const finalTags = extractedTags.length > 0 ? extractedTags : fallbackTags;

    // Build the new post object
    const newPost = {
      _id: `post-${Date.now()}`,
      author: user
        ? {
            username: user.username,
            fullName: user.fullName || user.username,
            avatar:
              user.avatar?.url ||
              user.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            isVerified: true,
          }
        : {
            username: 'you_creator',
            fullName: 'You (Creator)',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            isVerified: true,
          },
      caption: caption.trim() || 'Sharing my latest visual vibe ✨',
      media: mediaPreview
        ? [
            {
              url: mediaPreview,
              mediaType: mediaType,
            },
          ]
        : [],
      tags: finalTags,
      location: location.trim() || undefined,
      likesCount: 1,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };

    // Add to global post store (persisted to localStorage)
    addPost(newPost);

    // Reset and close
    handleCloseCreate();

    // Smooth scroll down to feed if on home page
    const feedElement = document.getElementById('home-feed-section');
    if (feedElement) {
      setTimeout(() => {
        feedElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300 relative w-full overflow-x-hidden">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Real-time live activity notifications */}
      <LiveToastStream />

      {/* Full-width Glassmorphic Navbar */}
      <TopBar onOpenCreateModal={() => handleOpenCreate('photo')} />

      {/* Centered Main Content Area */}
      <main className="flex-1 w-full pb-20 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav onOpenCreateModal={() => handleOpenCreate('photo')} />

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreate}
        title={`Create New ${
          activeCreationType === 'video'
            ? 'Video Clip'
            : activeCreationType === 'story'
            ? 'Visual Story'
            : activeCreationType === 'live'
            ? 'Live Stream'
            : 'Visual Vibe'
        }`}
      >
        <div className="space-y-4 text-left">
          {/* Caption Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Caption & Thoughts
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your creative story, setup details, or thoughts... #vibebuilding #design"
              className="w-full rounded-2xl bg-slate-50 dark:bg-[#121522] border border-slate-200 dark:border-white/10 p-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 resize-none transition"
            />
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Drag & Drop Zone or Media Preview */}
          {!mediaPreview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 select-none ${
                isDragging
                  ? 'border-brand-500 bg-brand-500/10 scale-[0.99]'
                  : 'border-slate-300 dark:border-white/15 hover:border-brand-500/60 dark:hover:border-brand-500/60 hover:bg-brand-500/5'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                {activeCreationType === 'video' ? (
                  <VideoIcon className="w-6 h-6" />
                ) : activeCreationType === 'live' ? (
                  <Radio className="w-6 h-6 text-rose-500 animate-pulse" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Drag and drop image/video or <span className="text-brand-500 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP, GIF or MP4 up to 50MB</p>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-black/40">
              {mediaType === 'video' ? (
                <video
                  src={mediaPreview}
                  controls
                  className="w-full max-h-60 object-contain rounded-2xl bg-black"
                />
              ) : (
                <img
                  src={mediaPreview}
                  alt="Selected Preview"
                  className="w-full max-h-60 object-contain rounded-2xl bg-black/20"
                />
              )}
              <button
                onClick={handleRemoveMedia}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white backdrop-blur transition shadow-md"
                title="Remove Media"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Location Input (Optional) */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#121522] border border-slate-200 dark:border-white/10">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location (e.g., Tokyo, San Francisco, Creative Studio)"
              className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={handleCloseCreate}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handlePublish}
              disabled={isSubmitting || (!caption.trim() && !mediaPreview)}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Vibe'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
