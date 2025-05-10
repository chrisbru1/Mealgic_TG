import axios from 'axios';

const CATEGORIES = {
  produce: ["lettuce", "tomato", "onion", "garlic", "potato", "carrot", "pepper", "spinach", "broccoli"],
  meat: ["chicken", "beef", "pork", "steak", "turkey", "sausage"],
  seafood: ["salmon", "tuna", "shrimp", "crab", "lobster"],
  dairy: ["milk", "cheese", "butter", "cream", "yogurt"],
  grains: ["rice", "pasta", "bread", "quinoa", "flour"],
  spices: ["salt", "pepper", "cinnamon", "paprika", "oregano", "basil"]
};

const detectCategory = (ingredient) => {
  const lowerItem = ingredient.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((keyword) => lowerItem.includes(keyword))) {
      return category;
    }
  }
  return 'other';
};

// 🔄 Call the Serverless Function
export const fetchGroceryList = async (recipes) => {
  const ingredientMap = {
    produce: [],
    meat: [],
    seafood: [],
    dairy: [],
    grains: [],
    spices: [],
    other: [],
  };

  for (const recipe of recipes) {
    console.log(`🔄 Fetching ingredients for: ${recipe.name}`);
    
    try {
      const response = await axios.get(`/api/scrapeIngredients?url=${encodeURIComponent(recipe.link)}`);
      const ingredients = response.data.ingredients;

      ingredients.forEach((item) => {
        const category = detectCategory(item);
        ingredientMap[category].push(item);
      });
    } catch (error) {
      console.error(`Failed to fetch ingredients for ${recipe.name}:`, error.message);
    }
  }

  return ingredientMap;
};
