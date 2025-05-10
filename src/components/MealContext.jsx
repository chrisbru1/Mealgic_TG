import React, { createContext, useContext, useState, useEffect } from 'react';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
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
          setError("Failed to fetch recipes");
          return;
        }

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        console.error("❌ Error fetching recipes:", err.message);
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <MealContext.Provider value={{ meals, loading, error }}>
      {children}
    </MealContext.Provider>
  );
};
