import axios from 'axios';

export default async function handler(req, res) {
  // ✅ Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant that generates dinner recipes." },
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
    console.error("❌ Error fetching recipes:", error.message);
    res.status(500).json({ error: error.message });
  }
}
