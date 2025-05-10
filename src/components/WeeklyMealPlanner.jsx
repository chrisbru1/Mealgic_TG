const fetchRecipes = async () => {
  const response = await fetch('/api/fetchRecipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: "Generate 7 kid-friendly dinner recipes with diverse proteins."
    })
  });

  if (!response.ok) {
    console.error("❌ API Error:", await response.text());
    return;
  }

  const data = await response.json();
  console.log("🍲 Recipes from GPT:", data);
};

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
