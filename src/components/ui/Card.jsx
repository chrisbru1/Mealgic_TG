import React from 'react';
import './Card.css';

export const Card = ({ children, className }) => {
  return (
    <div className={`mtg-card ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="mtg-content">
      {children}
    </div>
  );
};
