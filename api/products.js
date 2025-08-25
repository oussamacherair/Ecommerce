import { cache, apiCall, setCorsHeaders } from '../lib/cashe.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { limit = 10, skip = 0 } = req.query;
  const cacheKey = `products_${limit}_${skip}`;

  try {
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }

    const data = await apiCall(`/products?limit=${limit}&skip=${skip}&sortBy=title&order=asc`);
    cache.set(cacheKey, data, 600);
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
}