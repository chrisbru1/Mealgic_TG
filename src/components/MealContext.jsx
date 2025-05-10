import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const API_URL = `https://api.spoonacular.com/recipes/random?number=1&tags=dinner&apiKey=${API_KEY}`;

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch 7 meals
  const fetchDinnerRecipes = async () => {
    setLoading(true);
    try {
      const promises = Array.from({ length: 7 }).map(() =>
        axios.get(API_URL)
      );
      const results = await Promise.all(promises);

      const recipes = results.map((response) => {
        const recipe = response.data.recipes[0];
        return {
          name: recipe.title,
          description: recipe.summary.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
          link: recipe.sourceUrl,
          image: recipe.image,
        };
      });

      setMeals(recipes);
    } catch (err) {
      console.error("Failed to fetch recipes: ", err);
      setError("Failed to load recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDinnerRecipes();
  }, []);

  return (
    <MealContext.Provider value={{ meals, setMeals, loading, error }}>
      {children}
    </MealContext.Provider>
  );
};
