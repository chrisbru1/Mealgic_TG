import React from 'react';
import ReactDOM from 'react-dom';
import { MealProvider } from './MealContext';
import WeeklyMealPlanner from './WeeklyMealPlanner';

ReactDOM.render(
  <React.StrictMode>
    <MealProvider>
      <WeeklyMealPlanner />
    </MealProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
