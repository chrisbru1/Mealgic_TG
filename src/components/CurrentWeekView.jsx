import React from 'react';
import { useMealContext } from './MealContext';
import { Card, CardContent } from './ui/Card';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const API_URL = `https://api.spoonacular.com/recipes/random?number=1&tags=dinner&apiKey=${API_KEY}`;

// Mana icons for different meal types
const manaIcons = {
  beef: '🥩',
  poultry: '🍗',
  fish: '🐟',
  vegetarian: '🥦'
};

const CurrentWeekView = () => {
  const { meals, setMeals, loading, error } = useMealContext();

  if (loading) return <p className="text-yellow-500">Loading meals for the week...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // 🗑️ Discard and replace with a new meal
  const discardAndReplace = async (index) => {
    try {
      console.log("🔄 Discarding meal at index:", index);
      const response = await axios.get(API_URL);
      console.log("🔍 Response from Spoonacular:", response.data);

      if (response.data.recipes.length > 0) {
        const newMeal = response.data.recipes[0];
        const newRecipe = {
          name: newMeal.title,
          description: newMeal.summary.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
          link: newMeal.sourceUrl,
          image: newMeal.image,
          type: detectMealType(newMeal.title)
        };
        
        const updatedMeals = [...meals];
        updatedMeals[index] = newRecipe;
        setMeals(updatedMeals);
      }
    } catch (err) {
      console.error("Failed to replace the meal", err);
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

  return (
    <div className="grid grid-cols-1 gap-4">
      {meals.map((meal, index) => (
        <Card key={index} className="relative">
          <CardContent>
            <div className='flex justify-between items-center mb-2'>
              <h2 className='mtg-title'>{meal.name}</h2>
              <span className="text-2xl">{manaIcons[meal.type]}</span>
            </div>
            {meal.image && (
              <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover rounded-md mb-2" />
            )}
            <p className='mtg-description mb-2'>{meal.description}</p>
            {meal.link && (
              <a href={meal.link} target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline">
                View Recipe
              </a>
            )}
            <button
              onClick={() => discardAndReplace(index)}
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400 transition-all"
            >
              Discard for New Meal
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CurrentWeekView;
