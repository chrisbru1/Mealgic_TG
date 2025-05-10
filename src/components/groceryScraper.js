import axios from 'axios';

const CATEGORIES = {
  produce: ["lettuce", "tomato", "onion", "garlic", "potato", "carrot", "pepper", "spinach", "broccoli", "avocado"],
  meat: ["chicken", "beef", "pork", "steak", "turkey", "sausage", "bacon", "ham"],
  seafood: ["salmon", "tuna", "shrimp", "crab", "lobster", "cod"],
  dairy: ["milk", "cheese", "butter", "cream", "yogurt", "eggs"],
  grains: ["rice", "pasta", "bread", "quinoa", "flour", "cereal"],
  spices: ["salt", "pepper", "cinnamon", "paprika", "oregano", "basil", "garlic powder"]
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
      
      // 📝 DEBUG: Log the raw response
      console.log(`✅ Raw response from API:`, response.data);

      const ingredients = response.data.ingredients ?? [];
      
      if (!Array.isArray(ingredients) || ingredients.length === 0) {
        console.warn(`⚠️ No ingredients found for ${recipe.name}`);
        continue;
      }

      ingredients.forEach((item) => {
        const category = detectCategory(item);
        ingredientMap[category].push(item);
      });

    } catch (error) {
      console.error(`Failed to fetch ingredients for ${recipe.name}:`, error.message);
    }
  }

  console.log("🛒 Final Grocery List:", ingredientMap);
  return ingredientMap;
};
