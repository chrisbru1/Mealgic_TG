import axios from 'axios';
import * as cheerio from 'cheerio';

// 🛒 Ingredient Categories
const CATEGORIES = {
  produce: ["lettuce", "tomato", "onion", "garlic", "potato", "carrot", "pepper", "spinach", "broccoli"],
  meat: ["chicken", "beef", "pork", "steak", "turkey", "sausage"],
  seafood: ["salmon", "tuna", "shrimp", "crab", "lobster"],
  dairy: ["milk", "cheese", "butter", "cream", "yogurt"],
  grains: ["rice", "pasta", "bread", "quinoa", "flour"],
  spices: ["salt", "pepper", "cinnamon", "paprika", "oregano", "basil"]
};

// 🕵️ Detect category
const detectCategory = (ingredient) => {
  const lowerItem = ingredient.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((keyword) => lowerItem.includes(keyword))) {
      return category;
    }
  }
  return 'other';
};

// 🔍 Scrape Ingredients from the Recipe URL
const fetchIngredients = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Attempt to detect common ingredient selectors
    const ingredientList = [];
    $('li').each((index, element) => {
      const text = $(element).text();
      if (text.match(/(\d+\s?\w+\s.+)|(.+,\s?\d+\s?\w+)/)) {
        ingredientList.push(text);
      }
    });

    return ingredientList;
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    return [];
  }
};

// 🔄 Aggregate Ingredients by Category
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
    const ingredients = await fetchIngredients(recipe.link);

    ingredients.forEach((item) => {
      const category = detectCategory(item);
      ingredientMap[category].push(item);
    });
  }

  return ingredientMap;
};
