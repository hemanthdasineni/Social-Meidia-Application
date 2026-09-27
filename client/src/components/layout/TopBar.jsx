import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Bell, Home, Compass, Plus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';

export const TopBar = ({ onOpenCreateModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Explore', to: '/explore', icon: Compass },
    { label: 'Notifications', to: '/notifications', icon: Bell, hasBadge: true },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 px-4 sm:px-8 flex items-center justify-between gap-4 ${
        isScrolled
          ? 'h-13 py-2 bg-white/85 dark:bg-[#070913]/90 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-md shadow-black/5'
          : 'h-14 py-2 bg-transparent border-b border-transparent'
      }`}
    >
      {/* 1. Left Section: Brand Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 cursor-pointer select-none shrink-0"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-brand-500 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          VibeStream
        </span>
      </motion.div>

      {/* 2. Center Section: Perfectly Centered Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-sm mx-auto">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="topNavActiveTab"
                  className="absolute inset-0 bg-gradient-to-r from-brand-600 to-pink-600 rounded-lg shadow-sm shadow-brand-500/30 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.hasBadge && isAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* 3. Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Compact Create Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpenCreateModal}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 text-white text-xs font-semibold shadow-sm shadow-brand-600/30 border border-white/15"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Post</span>
        </motion.button>

        <ThemeToggle />

        {isAuthenticated && user ? (
          <div
            onClick={() => navigate(`/profile/${user.username}`)}
            className="cursor-pointer hover:scale-105 transition-transform shrink-0"
          >
            <Avatar src={user.avatar?.url} alt={user.username} size="xs" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-500 px-2.5 py-1"
            >
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/register')}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-brand-600 to-pink-600 text-white text-xs font-semibold shadow-sm shadow-brand-600/30"
            >
              Join
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
};
