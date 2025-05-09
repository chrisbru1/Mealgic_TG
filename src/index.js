import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import WeeklyMealPlanner from './components/WeeklyMealPlanner.jsx'; 
import CurrentWeekView from './components/CurrentWeekView.jsx';
import MealContext from './components/MealContext.jsx';
import CommunityRecipes from './components/CommunityRecipes.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeeklyMealPlanner />  {/* <--  Render your main component here */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a
// function to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
