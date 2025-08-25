import { cache, apiCall, setCorsHeaders } from '../lib/cashe.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const cacheKey = 'trending_all';

  try {
    if (cache.has(cacheKey)) {
      return res.json({ success: true, data: cache.get(cacheKey) });
    }

    const trendingCategories = ["beauty", "mens-shoes", "mens-watches", "womens-dresses"];

    const trendingData = await Promise.all(
      trendingCategories.map(async (category) => {
        try {
          const categoryCache = `trending_${category}`;
          
          let products;
          if (cache.has(categoryCache)) {
            products = cache.get(categoryCache);
          } else {
            products = await apiCall(`/products/category/${category}`);
            cache.set(categoryCache, products, 900);
          }

          return {
            category,
            categoryName: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            products: products.products || []
          };
        } catch (error) {
          return {
            category,
            categoryName: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            products: []
          };
        }
      })
    );

    cache.set(cacheKey, trendingData, 600);
    res.json({ success: true, data: trendingData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending products',
      message: error.message
    });
  }
}