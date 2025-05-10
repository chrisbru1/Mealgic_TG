import React from 'react';
import ReactDOM from 'react-dom/client';
import { MealProvider } from './components/MealContext';
import WeeklyMealPlanner from './components/WeeklyMealPlanner';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MealProvider>
      <WeeklyMealPlanner />
    </MealProvider>
  </React.StrictMode>
);
