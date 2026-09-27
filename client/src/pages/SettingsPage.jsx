import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { User, Bell, Lock, Palette, Shield, Save } from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || 'Aura Studio');
  const [bio, setBio] = useState(
    user?.bio || 'Digital creator crafting neon aesthetics, responsive interfaces, and sharing creative visual vibes.'
  );
  const [website, setWebsite] = useState(user?.website || 'https://vibestream.art');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-brand-500" />
          Account & Preferences
        </h1>
        <p className="text-sm text-slate-400">Manage your profile details, privacy, and display settings</p>
      </div>

      {/* Edit Profile Card */}
      <Card className="p-6 space-y-5 text-left">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-500" /> Profile Information
        </h2>

        <div className="flex items-center gap-4">
          <Avatar
            src={user?.avatar?.url}
            alt="Profile Avatar"
            size="xl"
            className="ring-2 ring-brand-500/40"
          />
          <div className="space-y-1.5">
            <Button variant="secondary" size="sm">
              Change Photo
            </Button>
            <p className="text-[11px] text-slate-400">JPG, PNG or WEBP. Max size 5MB.</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-xl bg-slate-50 dark:bg-[#161a26] border border-slate-200 dark:border-slate-800 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none transition"
            />
          </div>

          <Input
            label="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="gradient"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={() => alert('Profile update will be fully wired in Phase 2!')}
          >
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Preferences & Appearance Card */}
      <Card className="p-6 space-y-4 text-left">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-500" /> Appearance & Theme
        </h2>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#161a26] border border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Theme Mode
            </p>
            <p className="text-xs text-slate-400">Toggle between dark obsidian and clean light modes</p>
          </div>
          <ThemeToggle />
        </div>
      </Card>
    </div>
  );
};
