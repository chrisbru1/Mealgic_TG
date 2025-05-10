import React, { useEffect, useState } from 'react';
import CurrentWeekView from './CurrentWeekView';
import { fetchGroceryList } from './groceryScraper';

const WeeklyMealPlanner = () => {
  // ✅ State Management
  const [groceryList, setGroceryList] = useState({});
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch recipes on component mount
  const fetchRecipes = async () => {
    try {
      console.log("🔄 Fetching recipes from API...");
      const response = await fetch('/api/fetchRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Generate 7 kid-friendly dinner recipes with diverse proteins."
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error:", errorText);
        setError(`Failed to fetch recipes: ${errorText}`);
        return null;
      }

      const data = await response.json();
      console.log("🍲 Recipes fetched:", data);

      if (Array.isArray(data)) {
        setMeals(data);
      } else {
        console.error("❌ Unexpected response format:", data);
        setError("Unexpected response format from API");
      }
    } catch (err) {
      console.error("❌ Error fetching recipes:", err.message);
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // ✅ Generate the Grocery List
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

  // ✅ Render the UI
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
          <CurrentWeekView meals={meals} />
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
