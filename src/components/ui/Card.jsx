import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg border-4 border-yellow-500 mtg-frame ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-2">
      {children}
    </div>
  );
};
