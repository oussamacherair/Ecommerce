import express from 'express';
import axios from "axios";
import NodeCache from "node-cache";

const app = express();

// Initialize cache with TTL (Time To Live) in seconds
const cache = new NodeCache({
    stdTTL: 300, // 5 minutes default
    checkperiod: 60 // Check for expired keys every 60 seconds
});

// Add JSON parsing middleware
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Configure axios with better defaults
const apiClient = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000, // 10 second timeout
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourApp/1.0'
    }
});

// Add axios interceptor for better error handling
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

/** Categories with caching */
async function getCategories() {
    const cacheKey = 'categories';

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('Categories served from cache');
        return cached;
    }

    try {
        const { data } = await apiClient.get('/products/categories');

        // Cache for 1 hour (categories don't change often)
        cache.set(cacheKey, data, 3600);
        console.log('Categories fetched from API and cached');

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw new Error('Failed to fetch categories');
    }
}


/****** product by id with caching */
async function getProductById(id) {
    const cacheKey = `product_${id}`;

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('Product served from cache');
        return cached;
    }

    try {
        const { data } = await apiClient.get(`/products/${id}`);

        // Cache for 1 hour (products don't change often)
        cache.set(cacheKey, data, 3600);
        console.log('Product fetched from API and cached');

        return data;
    } catch (error) {
        console.error('Error fetching product:', error.message);
        throw new Error('Failed to fetch product');
    }
}


/** Products with caching */
async function getProducts(limit = 10, skip = 0) {
    try {
        const cacheKey = `products_${limit}_${skip}`;

        // Check cache first
        const cached = cache.get(cacheKey);
        if (cached) {
            console.log('Products served from cache');
            return cached;
        }

        const { data } = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);

        // Cache for 10 minutes
        cache.set(cacheKey, data, 600);
        console.log('Products fetched from API and cached');

        return data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw new Error('Failed to fetch products');
    }
}

/** Trending Products with caching */
async function getTrendingProducts(category) {
    const cacheKey = `trending_${category}`;

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {

        return cached;
    }

    try {
        const { data } = await apiClient.get(`/products/category/${category}`);

        // Cache for 15 minutes
        cache.set(cacheKey, data, 900);
        console.log(`Trending products for ${category} fetched from API and cached`);

        return data;
    } catch (error) {
        console.error(`Error fetching trending products for ${category}:`, error.message);
        throw new Error(`Failed to fetch trending products for ${category}`);
    }
}

// Routes
app.get("/categories", async (req, res) => {
    try {
        const categories = await getCategories();
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error('Categories endpoint error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories',
            message: error.message
        });
    }
});

app.get("/product/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        res.json({ data: product });
    } catch (error) {
        console.error('Product endpoint error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product',
            message: error.message
        });
    }
});


app.get("/products", async (req, res) => {
    const { limit, skip } = req.query;

    try {
        const products = await getProducts(limit, skip);
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('Products endpoint error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products',
            message: error.message
        });
    }
});

app.get("/trending-products", async (req, res) => {
    const cacheKey = 'trending_all';

    // Check if trending data is cached
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('All trending products served from cache');
        return res.json({ success: true, data: cached });
    }

    try {
        const trendingCategories = ["beauty", "mens-shoes", "mens-watches", "womens-dresses"];

        // Fetch all categories in parallel for better performance
        const trendingData = await Promise.all(
            trendingCategories.map(async (category) => {
                try {
                    const products = await getTrendingProducts(category);
                    return {
                        category: category,
                        categoryName: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        products: products.products || []
                    };
                } catch (error) {
                    console.error(`Error processing category ${category}:, error.message`);
                    return {
                        category: category,
                        categoryName: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        products: []
                    };
                }
            })
        );

        // Cache the combined result for 10 minutes
        cache.set(cacheKey, trendingData, 600);

        res.json({ success: true, data: trendingData });
    } catch (error) {
        console.error('Trending products endpoint error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trending products',
            message: error.message
        });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    const cacheStats = cache.getStats();
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        cache: {
            keys: cacheStats.keys,
            hits: cacheStats.hits,
            misses: cacheStats.misses
        }
    });
});

// Cache management endpoints (useful for development)
app.get("/cache/clear", (req, res) => {
    cache.flushAll();
    res.json({ success: true, message: 'Cache cleared' });
});

app.get("/cache/stats", (req, res) => {
    const stats = cache.getStats();
    const keys = cache.keys();
    res.json({
        stats,
        keys: keys.map(key => ({
            key,
            ttl: cache.getTtl(key)
        }))
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🗂️  Cache stats: http://localhost:${PORT}/cache/stats`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    cache.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    cache.close();
    process.exit(0);
})