import React, { createContext, useContext, useState, useEffect } from 'react';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  // ✅ State management
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      try {
        console.log("🔄 Fetching recipes from API...");
        
        // 🔗 API call to the serverless function
        const response = await fetch('/api/fetchRecipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: "Generate 7 kid-friendly dinner recipes with diverse proteins."
          })
        });

        // 🚨 Handle non-200 responses
        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ API Error:", errorText);
          setError(`Failed to fetch recipes: ${response.statusText}`);
          return;
        }

        // ✅ Parse the JSON
        const data = await response.json();
        console.log("🍲 Recipes fetched:", data);

        // 📝 Ensure it's an array
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

    // 🚀 Trigger the API fetch
    fetchRecipes();
  }, []);

  // ✅ Context value
  return (
    <MealContext.Provider value={{ meals, loading, error }}>
      {children}
    </MealContext.Provider>
  );
};
