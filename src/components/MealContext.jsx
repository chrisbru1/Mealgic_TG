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

  // 🔄 Fetch one meal, check for duplicates, and push to list
  const fetchUniqueMeal = async (existingMeals) => {
    try {
      let isUnique = false;
      let newRecipe = null;

      while (!isUnique) {
        const response = await axios.get(API_URL);
        const recipe = response.data.recipes[0];

        // Check if the recipe title already exists
        if (!existingMeals.some((meal) => meal.name === recipe.title)) {
          newRecipe = {
            name: recipe.title,
            description: recipe.summary.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
            link: recipe.sourceUrl,
            image: recipe.image,
            type: detectMealType(recipe.title),
          };
          isUnique = true;
        }
      }

      return newRecipe;
    } catch (err) {
      console.error("Failed to fetch a unique meal", err);
      return null;
    }
  };

  // 🔄 Fetch 7 unique meals
  const fetchDinnerRecipes = async () => {
    setLoading(true);
    try {
      const promises = Array.from({ length: 7 }).map(() => fetchUniqueMeal(meals));
      const results = await Promise.all(promises);

      // Filter out any nulls
      setMeals(results.filter(Boolean));
    } catch (err) {
      console.error("Failed to fetch recipes: ", err);
      setError("Failed to load recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔎 Detect the type based on keywords
  const detectMealType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('beef') || lowerTitle.includes('steak')) return 'beef';
    if (lowerTitle.includes('chicken') || lowerTitle.includes('poultry')) return 'poultry';
    if (lowerTitle.includes('fish') || lowerTitle.includes('salmon') || lowerTitle.includes('tuna')) return 'fish';
    return 'vegetarian';
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
