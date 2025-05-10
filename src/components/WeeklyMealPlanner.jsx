import React from 'react';
import { MealProvider, useMealContext } from './MealContext';
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

        {/* Save & Export Button */}
        <div className="mt-10 text-center">
          <SaveExport />
        </div>
      </div>
    </MealProvider>
  );
};

const SaveExport = () => {
  const { meals } = useMealContext();

  const exportLinks = () => {
    const links = meals.map((meal) => `${meal.name}: ${meal.link}`).join('\n');
    const element = document.createElement("a");
    const file = new Blob([links], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "WeeklyMealPlan.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button
      onClick={exportLinks}
      className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-400 transition-all"
    >
      Save & Export Links
    </button>
  );
};

export default WeeklyMealPlanner;
