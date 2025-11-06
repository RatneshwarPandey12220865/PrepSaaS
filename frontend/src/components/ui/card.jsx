import React from 'react';

export const Card = ({ children, className = '', hover = false }) => {
  const baseClasses = 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300';
  const hoverClasses = hover ? 'hover:bg-white/8 hover:border-purple-500/30 hover:shadow-purple-500/20 hover:scale-[1.02] hover:-translate-y-1' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

