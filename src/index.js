import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeeklyMealPlanner from './components/WeeklyMealPlanner';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

// Initialize QueryClient
const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <WeeklyMealPlanner />
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  console.error("❌ No root element found in index.html");
}

reportWebVitals();
