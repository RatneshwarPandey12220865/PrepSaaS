import React from 'react';

export const Input = ({ label, type = 'text', value, onChange, placeholder, required, className = '' }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 transition-colors ${className}`}
      />
    </div>
  );
};

