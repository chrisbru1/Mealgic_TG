import React, { useState } from 'react';
import CurrentWeekView from './CurrentWeekView';
import { fetchGroceryList } from './groceryScraper';
import { useMealContext } from './MealContext';

const WeeklyMealPlanner = () => {
  const [groceryList, setGroceryList] = useState({});
  const { meals, loading, error } = useMealContext();

  const generateGroceryList = async () => {
    if (meals.length === 0) {
      console.error("❌ No meals available to generate a grocery list.");
      return;
    }

    try {
      const list = await fetchGroceryList(meals);
      setGroceryList(list);
      console.log("🛒 Grocery List Generated:", list);
    } catch (err) {
      console.error("❌ Failed to generate grocery list:", err.message);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <h1 className="text-center text-3xl font-bold mb-6">📜 Weekly Meal Spellbook 📜</h1>

      {/* Meal List */}
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
  );
};

export default WeeklyMealPlanner;
