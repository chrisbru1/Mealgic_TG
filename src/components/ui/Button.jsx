// components/ui/Button.jsx
import React from 'react';

export const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
