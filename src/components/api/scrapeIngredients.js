import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Attempt to detect common ingredient selectors
    const ingredientList = [];
    $('li').each((index, element) => {
      const text = $(element).text();
      if (text.match(/(\d+\s?\w+\s.+)|(.+,\s?\d+\s?\w+)/)) {
        ingredientList.push(text);
      }
    });

    res.status(200).json({ ingredients: ingredientList });
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    res.status(500).json({ error: error.message });
  }
}
