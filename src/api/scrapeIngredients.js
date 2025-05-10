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
    const selectors = [
      'li', // Default list items
      '.ingredient', // For classes with 'ingredient'
      '.ingredients-item', // For classes with 'ingredients-item'
      '.recipe-ingredient', // For more specific classes
      '[itemprop="recipeIngredient"]', // For structured data
      '.recipe-ingredients__list__item', // Some sites use nested classes
    ];

    selectors.forEach((selector) => {
      $(selector).each((index, element) => {
        const text = $(element).text().trim();
        if (text && text.length > 0) {
          ingredientList.push(text);
        }
      });
    });

    console.log(`✅ Scraped Ingredients for ${url}:`, ingredientList);

    if (ingredientList.length === 0) {
      console.error(`❌ No ingredients found after trying multiple selectors.`);
    }

    res.status(200).json({ ingredients: ingredientList });
  } catch (error) {
    console.error(`❌ Failed to scrape ${url}:`, error.message);
    res.status(500).json({ error: error.message });
  }
}
