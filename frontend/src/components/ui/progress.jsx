import React from 'react';

export const Progress = ({ value, max = 100, className = '' }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={`w-full bg-white/10 rounded-full h-2 ${className}`}>
      <div className="progress-bar h-2 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

