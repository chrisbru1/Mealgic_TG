import React, { useState } from 'react';
import { MealProvider, useMealContext } from './MealContext';
import CurrentWeekView from './CurrentWeekView';
import { fetchGroceryList } from './groceryScraper';

const WeeklyMealPlanner = () => {
  const [groceryList, setGroceryList] = useState({});

  // ✅ Context Hook
  const { meals, loading, error } = useMealContext();

  // ✅ Debugging: Check if context is available
  console.log("🍲 Meals from Context:", meals);
  if (!meals) {
    console.error("❌ Meals is undefined. Context is not wrapping properly.");
  }

  // ✅ Generate the Grocery List
  const generateGroceryList = async () => {
    const list = await fetchGroceryList(meals);
    setGroceryList(list);
  };

  // ✅ Render
  return (
    <MealProvider>
      <div className="bg-gray-800 min-h-screen text-white p-4">
        <h1 className="text-center text-3xl font-bold mb-6">📜 Weekly Meal Spellbook 📜</h1>

        {/* Horizontal Scroll View */}
        <div className="overflow-x-auto whitespace-nowrap pb-6">
          {loading ? (
            <p className="text-yellow-500">Loading meals for the week...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <CurrentWeekView />
          )}
        </div>

        {/* Generate Grocery List */}
        <div className="mt-10 text-center">
          <button
            onClick={generateGroceryList}
            className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-400 transition-all"
          >
            Generate Grocery List
          </button>
        </div>

        {/* Display Grocery List */}
        {Object.keys(groceryList).length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">🛒 Grocery List</h2>

            {Object.entries(groceryList).map(([category, items], index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-yellow-400 capitalize mb-2">
                  {category}
                </h3>
                <ul className="list-disc pl-5">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </MealProvider>
  );
};

export default WeeklyMealPlanner;
