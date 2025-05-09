import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

// API Endpoint for random recipes
const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch 7 random meals
  const fetchRandomMeals = async () => {
    setLoading(true);
    try {
      const promises = Array(7).fill().map(() => axios.get(API_URL));
      const responses = await Promise.all(promises);
      const randomMeals = responses.map(res => ({
        name: res.data.meals[0].strMeal,
        description: res.data.meals[0].strInstructions.slice(0, 100) + '...',
        link: res.data.meals[0].strSource || res.data.meals[0].strYoutube,
      }));
      setMeals(randomMeals);
    } catch (err) {
      console.error("Failed to fetch recipes: ", err);
      setError("Failed to load recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Load recipes on first render
  useEffect(() => {
    fetchRandomMeals();
  }, []);

  return (
    <MealContext.Provider value={{ meals, loading, error }}>
      {children}
    </MealContext.Provider>
  );
};
