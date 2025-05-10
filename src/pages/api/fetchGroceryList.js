import axios from 'axios';

export default async function handler(req, res) {
  // ✅ Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const { meals } = req.body;

  if (!meals || meals.length === 0) {
    res.status(400).json({ error: "Meals are required to generate a grocery list" });
    return;
  }

  try {
    const prompt = `Generate a categorized grocery list for the following meals: ${meals.join(', ')}. 
                    Organize by Produce, Meat, Seafood, Dairy, Grains, Spices, and Other.`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant that generates grocery lists." },
        { "role": "user", "content": prompt }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    res.status(200).json(JSON.parse(response.data.choices[0].message.content));
  } catch (error) {
    console.error("❌ Error fetching grocery list:", error.message);
    res.status(500).json({ error: error.message });
  }
}
