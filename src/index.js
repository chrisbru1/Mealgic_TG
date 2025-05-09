import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeeklyMealPlanner from './components/WeeklyMealPlanner';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <WeeklyMealPlanner />
    </React.StrictMode>
  );
} else {
  console.error("❌ No root element found in index.html");
}

reportWebVitals();
