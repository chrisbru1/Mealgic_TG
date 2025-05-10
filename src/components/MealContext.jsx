import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDinnerRecipes = async () => {
    setLoading(true);
    try {
      // 🔥 Call GPT for 7 Kid-Friendly Meals
      const response = await axios.post('https://api.openai.com/v1/completions', {
        prompt: `Generate 7 kid-friendly dinner recipes with the following requirements:
        - Diverse proteins: poultry, beef, fish, and vegetarian options
        - No more than two beef dishes
        - Include full ingredient lists and preparation steps`,
        max_tokens: 800,
        model: 'text-davinci-003'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });

      const recipeData = response.data.choices[0].text;
      console.log("🍲 Generated Recipes: ", recipeData);

      const parsedRecipes = JSON.parse(recipeData); // assuming it's valid JSON
      setMeals(parsedRecipes);
    } catch (err) {
      console.error("Failed to generate recipes: ", err.message);
      setError("Failed to generate recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MealContext.Provider value={{ meals, setMeals, loading, error, fetchDinnerRecipes }}>
      {children}
    </MealContext.Provider>
  );
};
