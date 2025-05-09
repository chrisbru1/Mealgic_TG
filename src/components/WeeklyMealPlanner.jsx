import React from 'react';
import { MealProvider } from './MealContext';
import CurrentWeekView from './CurrentWeekView';
import CommunityRecipes from './CommunityRecipes';
import { Card, CardContent } from './ui/Card';

const WeeklyMealPlanner = () => {
  return (
    <MealProvider>
      <div className="bg-gray-800 min-h-screen text-white p-4">
        <h1 className="text-center text-3xl font-bold mb-6">📜 Weekly Meal Spellbook 📜</h1>
        
        {/* Horizontal Scroll View */}
        <div className="overflow-x-auto whitespace-nowrap pb-6">
          <CurrentWeekView />
        </div>

        {/* Saved Meal Plans at the Bottom */}
        <div className="mt-10">
          <Card className="bg-gray-700 rounded-lg shadow-lg border border-yellow-500">
            <CardContent>
              <h2 className="text-xl font-bold text-yellow-400">📦 Saved Meal Plans (Coming Soon)</h2>
              <p className="italic text-sm">Manage your saved plans and swipe through them easily.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MealProvider>
  );
};

export default WeeklyMealPlanner;
