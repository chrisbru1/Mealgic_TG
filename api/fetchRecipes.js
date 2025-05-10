// api/fetchRecipes.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Replace this with your logic
      const sampleRecipes = [
        { name: "Spaghetti Bolognese", description: "Classic Italian dish with a rich tomato sauce." },
        { name: "Chicken Tikka Masala", description: "Creamy and spicy chicken dish from India." },
        { name: "Fish Tacos", description: "Fresh and zesty tacos with grilled fish and lime." }
      ];

      res.status(200).json(sampleRecipes);
    } catch (error) {
      console.error("❌ API Error: ", error.message);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
