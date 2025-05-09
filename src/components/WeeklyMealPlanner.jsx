import React from 'react';
import { MealProvider } from './MealContext';
import CurrentWeekView from './CurrentWeekView';
import CommunityRecipes from './CommunityRecipes';
import { Card, CardContent } from '@/components/ui/card';

const WeeklyMealPlanner = () => {
  return (
    <MealProvider>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-800 min-h-screen text-white'>
        <h1 className='text-center text-2xl font-bold mb-4 lg:col-span-3'>📜 Weekly Meal Spellbook 📜</h1>

        <div className="lg:col-span-1">
          <Card className="bg-gray-700 rounded-lg shadow-lg border border-yellow-500 mb-2">
            <CardContent>
              <h2 className='text-xl font-bold text-yellow-400'>Saved Meal Plans (Coming Soon)</h2>
              <p className='italic text-sm'>Manage your saved plans and swipe through them easily.</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CurrentWeekView />
        </div>

        <div className="lg:col-span-1">
          <CommunityRecipes />
        </div>
      </div>
    </MealProvider>
  );
};

export default WeeklyMealPlanner;
