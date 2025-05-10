import React, { useState } from 'react';
import { MealProvider, useMealContext } from './MealContext'; // ✅ Make sure this path is correct
import CurrentWeekView from './CurrentWeekView';
import { fetchGroceryList } from './groceryScraper';

const WeeklyMealPlanner = () => {
  const [groceryList, setGroceryList] = useState({});
  const { meals } = useMealContext(); // ✅ This is where it's crashing

  const generateGroceryList = async () => {
    const list = await fetchGroceryList(meals);
    setGroceryList(list);
  };

  return (
    <MealProvider> {/* ✅ Wrapping inside MealProvider */}
      <div className="bg-gray-800 min-h-screen text-white p-4">
        <h1 className="text-center text-3xl font-bold mb-6">📜 Weekly Meal Spellbook 📜</h1>
        
        <div className="overflow-x-auto whitespace-nowrap pb-6">
          <CurrentWeekView />
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
