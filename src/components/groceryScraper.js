export const fetchGroceryList = async (meals) => {
  try {
    const response = await fetch('/api/fetchGroceryList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meals: meals.map(meal => meal.name)
      })
    });

    if (!response.ok) {
      console.error("❌ API Error:", await response.text());
      return null;
    }

    const data = await response.json();
    console.log("🛒 Grocery List Generated: ", data);
    return data;
  } catch (error) {
    console.error("Failed to generate grocery list:", error.message);
    return null;
  }
};
