import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, PlusCircle, Bell, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const BottomNav = ({ onOpenCreateModal }) => {
  const { user, isAuthenticated } = useAuth();

  const navTabs = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '/notifications', icon: Bell, label: 'Alerts', hasBadge: true },
    {
      to: isAuthenticated && user ? `/profile/${user.username}` : '/login',
      icon: User,
      label: 'Profile',
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-white/90 dark:bg-[#070913]/90 backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/10 px-4 flex items-center justify-around">
      {navTabs.slice(0, 2).map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `relative p-2.5 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                isActive
                  ? 'text-brand-500 dark:text-brand-400'
                  : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDot"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(139,92,246,1)]"
                  />
                )}
              </>
            )}
          </NavLink>
        );
      })}

      {/* Floating Center Radial Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenCreateModal}
        className="p-2.5 -mt-6 rounded-2xl bg-gradient-to-tr from-brand-600 via-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-white/20 select-none"
        title="Create Vibe"
      >
        <PlusCircle className="w-7 h-7" />
      </motion.button>

      {navTabs.slice(2).map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `relative p-2.5 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                isActive
                  ? 'text-brand-500 dark:text-brand-400'
                  : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                {tab.hasBadge && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
                )}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDot"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(139,92,246,1)]"
                  />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
