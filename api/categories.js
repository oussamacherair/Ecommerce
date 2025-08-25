import { cache, apiCall, setCorsHeaders } from '../lib/cashe.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const cacheKey = 'categories';

  try {
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }

    const data = await apiCall('/products/categories');
    cache.set(cacheKey, data, 3600);
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
}