import React from 'react';

export const TiltCard = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
