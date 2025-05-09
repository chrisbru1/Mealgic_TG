import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import WeeklyMealPlanner from './components/WeeklyMealPlanner';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WeeklyMealPlanner />
  </React.StrictMode>
);

// Optional: Measure performance (can be disabled in production)
reportWebVitals();
