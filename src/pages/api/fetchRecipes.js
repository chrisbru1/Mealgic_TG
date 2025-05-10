// src/pages/api/fetchRecipes.js
console.log("🔍 OpenAI API Key from ENV:", process.env.OPENAI_API_KEY);

import axios from 'axios';

console.log("✅ API Route /api/fetchRecipes Loaded Successfully");

export default async function handler(req, res) {
  console.log("🌐 Request received on /api/fetchRecipes");

  if (req.method !== 'POST') {
    console.log("❌ Method Not Allowed:", req.method);
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    console.log("❌ Missing prompt in request body");
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    console.log("🔄 Sending request to OpenAI API...");
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

    console.log("✅ OpenAI API Response received", response.data);

    const data = JSON.parse(response.data.choices[0].message.content);

    if (typeof data === 'object') {
      console.log("✅ Sending back JSON response");
      res.status(200).json(data);
    } else {
      console.log("❌ Invalid JSON format received");
      res.status(500).json({ error: "Invalid JSON response from OpenAI" });
    }
  } catch (error) {
    console.error("❌ Error in fetchRecipes:", error.message);
    res.status(500).json({ error: error.message });
  }
}
