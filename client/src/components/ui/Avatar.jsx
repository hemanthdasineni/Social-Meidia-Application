import React from 'react';
import { cn } from '../../lib/utils';

export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className,
  status,
  hasStory = false,
  ...props
}) => {
  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
    '2xl': 'w-28 h-28 text-2xl',
  };

  const defaultAvatar =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  return (
    <div
      className={cn(
        'relative inline-block shrink-0 rounded-full select-none',
        hasStory && 'p-0.5 bg-gradient-to-tr from-amber-500 via-pink-500 to-brand-500',
        className
      )}
      {...props}
    >
      <img
        src={src || defaultAvatar}
        alt={alt}
        className={cn(
          'rounded-full object-cover bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-[#10131d]',
          sizes[size]
        )}
        onError={(e) => {
          e.target.src = defaultAvatar;
        }}
      />
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-[#10131d]',
            status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
          )}
        />
      )}
    </div>
  );
};
