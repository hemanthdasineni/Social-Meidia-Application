import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-[#10131d] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-200',
        hover && 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
