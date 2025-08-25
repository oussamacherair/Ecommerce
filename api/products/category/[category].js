import { cache, apiCall, setCorsHeaders } from '../../../lib/cashe.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category } = req.query;
  const cacheKey = `products_by_category_${category}`;

  try {
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey), category });
    }

    const data = await apiCall(`/products/category/${category}`);
    cache.set(cacheKey, data, 360);
    
    res.json({ data, category });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch products',
      message: error.message
    });
  }
}