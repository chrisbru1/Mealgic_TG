import axios from 'axios';
import * as cheerio from 'cheerio';

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

export const fetchGroceryList = async (recipes) => {
  const ingredientMap = {};

  for (const recipe of recipes) {
    console.log(`🔄 Fetching ingredients for: ${recipe.name}`);
    const ingredients = await fetchIngredients(recipe.link);

    ingredients.forEach((item) => {
      const formattedItem = item.toLowerCase();
      if (ingredientMap[formattedItem]) {
        ingredientMap[formattedItem]++;
      } else {
        ingredientMap[formattedItem] = 1;
      }
    });
  }

  // Convert to a list
  return Object.keys(ingredientMap).map((item) => ({
    name: item,
    quantity: ingredientMap[item],
  }));
};
