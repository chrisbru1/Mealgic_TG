import React, { useState } from 'react';
import CurrentWeekView from './CurrentWeekView';
import { fetchGroceryList } from './groceryScraper';

const WeeklyMealPlanner = () => {
  const [groceryList, setGroceryList] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fetchRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: "Generate 7 kid-friendly dinner recipes with diverse proteins."
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error:", errorText);
        setError("Failed to fetch recipes");
        return;
      }

      const data = await response.json();
      console.log("🍲 Recipes from GPT:", data);
      setMeals(data);
    } catch (err) {
      console.error("❌ Error fetching from serverless function:", err.message);
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate the Grocery List
  const generateGroceryList = async () => {
    const list = await fetchGroceryList(meals);
    setGroceryList(list);
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <h1 className="text-center text-3xl font-bold mb-6">📜 Weekly Meal Spellbook 📜</h1>

      <button
        onClick={fetchRecipes}
        className="bg-blue-500 text-white py-2 px-5 mb-5 rounded-lg hover:bg-blue-400 transition-all"
      >
        Generate Weekly Meals
      </button>

      {loading ? (
        <p className="text-yellow-500">Loading meals for the week...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <CurrentWeekView meals={meals} />
      )}

      <div className="mt-10 text-center">
        <button
          onClick={generateGroceryList}
          className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-400 transition-all"
        >
          Generate Grocery List
        </button>
      </div>
    </div>
  );
};

export default WeeklyMealPlanner;
