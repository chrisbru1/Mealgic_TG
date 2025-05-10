import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    console.error('❌ Missing URL parameter');
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  console.log(`🔎 Fetching page data for: ${url}`);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const ingredientList = [];
    
    // Try multiple common selectors
    $('li').each((index, element) => {
      const text = $(element).text();
      if (text.match(/(\d+\s?\w+\s.+)|(.+,\s?\d+\s?\w+)/)) {
        ingredientList.push(text);
      }
    });

    // 🛡️ Fallback if nothing is found
    if (ingredientList.length === 0) {
      console.warn(`⚠️ No ingredients found for ${url}. Trying secondary selectors...`);
      $('.ingredient, .ingredients-item').each((index, element) => {
        const text = $(element).text();
        if (text) ingredientList.push(text.trim());
      });
    }

    console.log(`✅ Scraped Ingredients for ${url}:`, ingredientList);

    if (ingredientList.length === 0) {
      console.error(`❌ No ingredients found after secondary attempt.`);
    }

    res.status(200).json({ ingredients: ingredientList });
  } catch (error) {
    console.error(`❌ Failed to scrape ${url}:`, error.message);
    res.status(500).json({ error: error.message });
  }
}
