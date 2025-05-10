const fetchRecipes = async () => {
  try {
    const response = await fetch('/api/fetchRecipes', {
      method: 'POST',   // ✅ Must be POST, not GET
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: "Generate 7 kid-friendly dinner recipes with diverse proteins."
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      return;
    }

    const data = await response.json();
    console.log("🍲 Recipes from GPT:", data);
  } catch (err) {
    console.error("❌ Error fetching from serverless function:", err.message);
  }
};
