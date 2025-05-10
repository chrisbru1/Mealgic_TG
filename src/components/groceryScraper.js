import axios from 'axios';

export const fetchGroceryList = async (meals) => {
  try {
    const response = await axios.post('/api/fetchRecipes', {
      prompt: `Generate a grocery list for the following meals: ${JSON.stringify(meals)}. 
      Categorize them by Produce, Meat, Seafood, Dairy, Grains, Spices, and Other.`
    });

    console.log("🛒 Grocery List Generated: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to generate grocery list:", error.message);
    return null;
  }
};
