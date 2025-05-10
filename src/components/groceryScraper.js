import axios from 'axios';

export const fetchGroceryList = async (meals) => {
  try {
    const prompt = `Here are some recipes: ${JSON.stringify(meals)}. 
    Generate a grocery list categorized into:
    - Produce
    - Meat
    - Seafood
    - Dairy
    - Grains
    - Spices
    - Other
    Include quantities where possible.`;

    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt,
      max_tokens: 500,
      model: 'text-davinci-003'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      }
    });

    console.log("🛒 Grocery List Generated: ", response.data.choices[0].text);
    return JSON.parse(response.data.choices[0].text);

  } catch (error) {
    console.error("Failed to generate grocery list:", error.message);
    return null;
  }
};
