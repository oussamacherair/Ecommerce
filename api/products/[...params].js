import { cache, apiCall, setCorsHeaders } from '../../lib/cache.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { params } = req.query;
  
  if (!params || params.length !== 2) {
    return res.status(400).json({
      success: false,
      error: 'Invalid parameters. Expected /product/category/id'
    });
  }

  const [category, id] = params;

  try {
    // Get product
    const productCacheKey = `product_${id}`;
    let product;
    
    if (cache.has(productCacheKey)) {
      product = cache.get(productCacheKey);
    } else {
      product = await apiCall(`/products/${id}`);
      cache.set(productCacheKey, product, 3600);
    }

    // Get similar products
    const categoryCacheKey = `product_by_category_${category}`;
    let similarProducts;
    
    if (cache.has(categoryCacheKey)) {
      const categoryData = cache.get(categoryCacheKey);
      similarProducts = categoryData.products.filter(p => p.id != id);
    } else {
      const categoryData = await apiCall(`/products/category/${category}`);
      cache.set(categoryCacheKey, categoryData, 3600);
      similarProducts = categoryData.products.filter(p => p.id != id);
    }

    res.json({ data: product, similarProducts });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
      message: error.message
    });
  }
}