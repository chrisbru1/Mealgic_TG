import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import WeeklyMealPlanner from './components/WeeklyMealPlanner.jsx'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire App with the MealProvider */}
    <WeeklyMealPlanner />
  </React.StrictMode>
);
