import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Bell,
  User,
  Settings,
  PlusSquare,
  Sparkles,
  LogOut,
  LogIn,
  Flame,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Sidebar = ({ onOpenCreateModal }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, to: '/' },
    { label: 'Explore', icon: Compass, to: '/explore' },
    { label: 'Notifications', icon: Bell, to: '/notifications', badge: 3 },
    {
      label: 'Profile',
      icon: User,
      to: user ? `/profile/${user.username}` : '/login',
    },
    { label: 'Settings', icon: Settings, to: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 h-screen sticky top-0 border-r border-slate-200/80 dark:border-white/10 p-5 bg-white/70 dark:bg-[#070913]/80 backdrop-blur-2xl z-20 select-none">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-2 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:rotate-6 transition-transform duration-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-brand-500 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              VibeStream
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
              Visual Canvas <span className="text-pink-500">✦</span>
            </span>
          </div>
        </motion.div>

        {/* Navigation Links with Sliding Active Indicator */}
        <nav className="space-y-1.5 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.label}
                to={item.to}
                className="relative flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-colors group z-10"
              >
                {/* Framer motion active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-500/15 via-purple-500/10 to-transparent border border-brand-500/30 rounded-2xl -z-10 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? 'text-brand-500 dark:text-brand-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                    }`}
                  />
                  <span
                    className={
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                    }
                  >
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm shadow-pink-500/40 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Create Post Action Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenCreateModal}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(244,114,182,0.6)] flex items-center justify-center gap-2 border border-white/20 transition-all"
        >
          <PlusSquare className="w-5 h-5" />
          <span>Post New Vibe</span>
        </motion.button>
      </div>

      {/* Bottom User Section */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
        {isAuthenticated && user ? (
          <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/[0.04] transition group">
            <div
              onClick={() => navigate(`/profile/${user.username}`)}
              className="flex items-center gap-3 cursor-pointer overflow-hidden text-left"
            >
              <Avatar src={user.avatar?.url} alt={user.username} size="sm" />
              <div className="truncate">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {user.fullName || user.username}
                </p>
                <p className="text-xs text-slate-400 truncate">@{user.username}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="md"
            className="w-full justify-center"
            leftIcon={<LogIn className="w-4 h-4" />}
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        )}
      </div>
    </aside>
  );
};
