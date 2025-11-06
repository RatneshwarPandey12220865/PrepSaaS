import React from 'react';

export const Button = ({ children, onClick, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    default: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform',
    outline: 'border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-white backdrop-blur-sm hover:scale-105 transform',
    ghost: 'text-purple-300 hover:bg-purple-500/20 hover:text-white backdrop-blur-sm hover:scale-105 transform'
  };
  
  const sizes = {
    default: 'px-6 py-3 text-sm',
    sm: 'px-4 py-2 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

